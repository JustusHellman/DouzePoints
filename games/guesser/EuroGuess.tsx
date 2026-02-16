
import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, MasterSong } from '../../data/types.ts';
import { getFuzzyScore } from '../../utils/fuzzy.ts';
import { getMemberLabel } from '../../data/constants.tsx';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';

interface EuroGuessProps {
  onReturn: () => void;
  data: MasterSong[];
}

const MAX_ATTEMPTS = 6;

interface HintBoxProps {
  hint: { label: string; value: string | number };
  attempt?: string;
  idx: number;
  isActive?: boolean;
  songTitle: string;
}

const HintBox: React.FC<HintBoxProps> = ({ hint, attempt, idx, isActive, songTitle }) => {
  const isCorrect = attempt?.toLowerCase() === songTitle.toLowerCase();
  
  return (
    <div 
      className={`rounded-2xl bg-gray-900/50 border-l-[6px] p-3 sm:p-4 shadow-xl relative overflow-hidden transition-all duration-[1500ms] ${
        isActive 
          ? 'border-cyan-500 animate-in fade-in slide-in-from-top-12' 
          : 'border-white/10 animate-in fade-in slide-in-from-top-8'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-0.5 relative z-10">
        <span className="text-white/30 font-black uppercase text-[7px] tracking-[0.3em] block">
          {hint.label}
        </span>
        {attempt ? (
          <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full border border-white/5">
            <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest truncate max-w-[80px] sm:max-w-[120px]">
              {attempt}
            </span>
            <div className={`shrink-0 w-3 h-3 rounded-full flex items-center justify-center text-[6px] font-black text-white ${
              isCorrect ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {isCorrect ? '✓' : '✕'}
            </div>
          </div>
        ) : (
          <span className="text-[7px] font-black text-cyan-500/40 uppercase tracking-widest">
            Hint {idx + 1}
          </span>
        )}
      </div>

      <span className="text-base sm:text-lg font-black tracking-tight text-white/90 break-words relative z-10 leading-tight block">
        {hint.value}
      </span>
    </div>
  );
};

const EuroGuess: React.FC<EuroGuessProps> = ({ onReturn, data }) => {
  const { t } = useTranslation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Automated scroll nudge (Instant scroll)
  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, 60);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const song = useMemo(() => {
    const idx = getDailyIndex(data, "guesser");
    return data[idx];
  }, [data]);

  const [query, setQuery] = useState("");
  const [attempts, setAttempts] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [revealedHints, setRevealedHints] = useState(1);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seenKey = 'hasSeenRules-guesser';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setShowHowToPlay(true);
      localStorage.setItem(seenKey, 'true');
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`guesser-${getDayString()}`);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setAttempts(d.attempts || []);
        setIsGameOver(!!d.isGameOver);
        setRevealedHints(d.revealedHints || 1);
        setWon(!!d.won);
        if (!!d.isGameOver) setShowModal(true);
      } catch (e) {
        console.error("Failed to load saved guesser state", e);
      }
    }
  }, []);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[attempts.length - 1] || 2;
    
    if (pts === 12) return { points: 12, label: t('common.douzePoints'), color: "text-yellow-500" };
    
    const colorMap: Record<number, string> = {
      10: "text-pink-400",
      8: "text-purple-400",
      6: "text-blue-400",
      4: "text-cyan-400",
      2: "text-indigo-400"
    };

    return { 
      points: pts, 
      label: `${pts} ${t('common.points').toUpperCase()}!`, 
      color: colorMap[pts] || "text-gray-400" 
    };
  }, [won, attempts, t]);

  useEffect(() => {
    if (attempts.length === 0 && !isGameOver) return;
    localStorage.setItem(`guesser-${getDayString()}`, JSON.stringify({ attempts, isGameOver, revealedHints, won }));
    if (isGameOver) {
      updateGameStats(GameType.GUESSER, won, { attempts: attempts.length });
      if (won) {
        const pts = getPointsInfo.points;
        confetti({
          particleCount: pts === 12 ? 300 : 150,
          spread: pts === 12 ? 100 : 70,
          origin: { y: 0.6 },
          colors: pts === 12 ? ['#fbbf24', '#f59e0b', '#fff'] : ['#ec4899', '#a855f7', '#3b82f6']
        });
      }
    }
  }, [attempts, isGameOver, revealedHints, won, getPointsInfo]);

  const filteredSongs = useMemo(() => {
    if (!query || query.length < 1) return [];
    return data.map(s => {
        const titleScore = getFuzzyScore(query, s.title);
        const artistScore = getFuzzyScore(query, s.artist);
        const countryScore = getFuzzyScore(query, s.country);
        return { song: s, score: Math.max(titleScore, artistScore, countryScore) };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.song);
  }, [query, data]);

  const handleSelectSong = (selected: MasterSong) => {
    setQuery(selected.title);
    setShowResults(false);
    submitGuess(selected.title);
  };

  const submitGuess = (selectedTitle: string) => {
    const isCorrect = selectedTitle.toLowerCase() === song.title.toLowerCase();
    if (isCorrect) {
      setWon(true); 
      setIsGameOver(true); 
      setAttempts([...attempts, selectedTitle]); 
      setRevealedHints(6); 
      setTimeout(() => setShowModal(true), 1500);
    } else {
      const newAttempts = [...attempts, selectedTitle];
      setAttempts(newAttempts); 
      setRevealedHints(Math.min(newAttempts.length + 1, 6));
      if (newAttempts.length >= 6) { 
        setIsGameOver(true); 
        setTimeout(() => setShowModal(true), 1500);
      }
      setQuery("");
    }
  };

  const handleShare = () => {
    const historyEmojiStr = attempts.map((a) => (
      a.toLowerCase() === song.title.toLowerCase() ? '🟩' : '⬛'
    )).join('');
    const shareText = `${won ? '🏆' : '❌'} EuroGuess • ${getDayString()}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')} • ${attempts.length}/6 ${t('common.steps')}\n\n${historyEmojiStr}\n\n#DouzePoints #Eurovision`;
    navigator.clipboard.writeText(shareText);
  };

  const hints = useMemo(() => [
    { label: t('guesser.hintLabels.year'), value: song.year },
    { label: t('guesser.hintLabels.country'), value: t(`metadata.countries.${song.country}`) },
    { label: t('guesser.hintLabels.genre'), value: song.genre.split(' / ').map(g => t(`metadata.genres.${g}`) || g).join(' / ') },
    { label: t('guesser.hintLabels.placing'), value: song.placing },
    { label: t('guesser.hintLabels.artist'), value: getMemberLabel(song.members) },
    { label: t('guesser.hintLabels.fact'), value: song.fact }
  ], [t, song]);

  const activeHintIndex = Math.min(attempts.length, 5);

  const historyEmoji = useMemo(() => {
    return attempts.map((a) => (
      a.toLowerCase() === song.title.toLowerCase() ? '🟩' : '⬛'
    )).join(' ');
  }, [attempts, song]);

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-4 w-full max-w-xl mx-auto">
      {(!isGameOver || !showModal) && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroGuess</h2>
            <button 
              onClick={() => setShowHowToPlay(true)}
              className="w-6 h-6 rounded-full border border-white/20 text-[10px] flex items-center justify-center font-bold text-gray-500 hover:text-white hover:border-white transition-all active:scale-90"
              aria-label="How to play"
            >
              ?
            </button>
          </div>

          <HowToPlayModal 
            isOpen={showHowToPlay} 
            onClose={() => setShowHowToPlay(false)} 
            title="EuroGuess" 
            rules={t('games.euroguess.rules')} 
          />
          
          {!isGameOver && (
            <div className="w-full flex flex-col gap-6 relative mb-8 z-[150]" ref={searchRef}>
              <input 
                type="text" value={query}
                onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
                placeholder={t('guesser.searchPlaceholder')}
                className="w-full bg-gray-950 border-2 border-white/5 rounded-2xl px-6 py-4 font-bold focus:border-cyan-500 outline-none text-center text-lg shadow-inner text-white transition-all duration-300"
              />
              {showResults && query.length >= 1 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-[#111122] border border-white/10 rounded-2xl shadow-3xl overflow-hidden z-[160] backdrop-blur-xl max-h-60 overflow-y-auto">
                  {filteredSongs.length > 0 ? filteredSongs.map((s) => (
                    <button key={s.id} onClick={() => handleSelectSong(s)} className="w-full text-left px-6 py-4 transition-colors flex justify-between items-center border-b border-white/5 last:border-0 hover:bg-cyan-500/20">
                      <div className="flex flex-col">
                        <span className="font-black text-xs uppercase tracking-tight text-white">{s.title}</span>
                        <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest text-gray-400">{s.artist} • {t(`metadata.countries.${s.country}`)}</span>
                      </div>
                    </button>
                  )) : <div className="px-6 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest text-center italic">{t('guesser.noResults')}</div>}
                </div>
              )}
            </div>
          )}

          <div className="w-full space-y-3">
            {!isGameOver && (
              <HintBox key={`active-${activeHintIndex}`} hint={hints[activeHintIndex]} idx={activeHintIndex} isActive={true} songTitle={song.title} />
            )}
            {attempts.map((attempt, idx) => (
              <HintBox key={idx} hint={hints[idx]} attempt={attempt} idx={idx} songTitle={song.title} />
            )).reverse()}
          </div>
          
          {isGameOver && !showModal && (
            <div className="w-full flex justify-center mt-12">
               <button 
                 onClick={() => setShowModal(true)}
                 className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl"
               >
                 {t('scorecard.viewScorecard')}
               </button>
            </div>
          )}
        </>
      )}

      {isGameOver && showModal && (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle="EuroGuess" song={song} attempts={attempts.length} maxAttempts={6}
          onClose={() => setShowModal(false)} onReturn={onReturn}
        />
      )}

      <style>{`
        .animate-in.fade-in { animation: fade-in 1500ms cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slide-in-from-top-12 { 0% { transform: translateY(-4rem); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-top-8 { 0% { transform: translateY(-2rem); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .slide-in-from-top-12 { animation: slide-in-from-top-12 1500ms cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .slide-in-from-top-8 { animation: slide-in-from-top-8 1500ms cubic-bezier(0.19, 1, 0.22, 1) forwards; }
      `}</style>
    </div>
  );
};

export default EuroGuess;
