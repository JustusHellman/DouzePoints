
import React, { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, MasterSong } from '../../data/types.ts';
import { REGION_MAP, getMemberLabel, getGenreParent } from '../../data/constants.tsx';
import { getFuzzyScore } from '../../utils/fuzzy.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';

interface EuroArenaProps {
  onReturn: () => void;
  data: MasterSong[];
}

const MAX_GUESSES = 6;

const ComparisonBox = ({ label, value, status, arrow, delay }: { label: string, value: string | number, status: 'green' | 'yellow' | 'gray', arrow?: 'up' | 'down', delay: number }) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const colorClasses = {
    green: 'bg-green-600 border-green-500 shadow-[0_0_20px_rgba(22,163,74,0.3)]',
    yellow: 'bg-yellow-600 border-yellow-500 shadow-[0_0_20px_rgba(202,138,4,0.3)]',
    gray: 'bg-gray-800 border-gray-700 opacity-60'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl border-2 transition-all duration-700 w-full aspect-square text-center transform-gpu ${revealed ? `${colorClasses[status]} scale-100 rotate-0 opacity-100` : 'bg-gray-900 border-white/5 scale-75 opacity-0'}`}>
      <span className="text-[7px] font-black uppercase tracking-widest text-white/50 mb-0.5 leading-none italic">{label}</span>
      <div className={`flex items-center gap-0.5 font-black leading-tight w-full justify-center px-0.5`}>
        <span className="text-white drop-shadow-md break-words line-clamp-2 text-[9px] sm:text-[10px] leading-tight hyphens-auto">{value}</span>
        {revealed && arrow === 'up' && <svg className="w-2.5 h-2.5 text-white animate-bounce shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"/></svg>}
        {revealed && arrow === 'down' && <svg className="w-2.5 h-2.5 text-white animate-bounce shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z"/></svg>}
      </div>
    </div>
  );
};

const EuroArena: React.FC<EuroArenaProps> = ({ onReturn, data }) => {
  const { t } = useTranslation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Automated scroll nudge (Instant scroll)
  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, 60);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const target = useMemo(() => {
    const idx = getDailyIndex(data, "arena");
    return data[idx];
  }, [data]);

  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<MasterSong[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const getStatus = useCallback((key: keyof MasterSong, val: any, guessSong: MasterSong) => {
    if (val === target[key]) return 'green';
    if (key === 'year' && Math.abs((val as number) - target.year) <= 3) return 'yellow';
    if (key === 'placing' && Math.abs((val as number) - target.placing) <= 5) return 'yellow';
    if (key === 'members' && Math.abs((val as number) - target.members) === 1) return 'yellow';
    if (key === 'genre') {
      const guessParent = getGenreParent(String(val));
      const targetParent = getGenreParent(target.genre);
      if (guessParent !== "Other" && guessParent === targetParent) return 'yellow';
    }
    if (key === 'country') {
      const guessRegion = REGION_MAP[guessSong.country] || "Unknown";
      const targetRegion = REGION_MAP[target.country] || "Unknown";
      if (guessRegion !== "Unknown" && guessRegion === targetRegion) return 'yellow';
    }
    return 'gray';
  }, [target]);

  useEffect(() => {
    const seenKey = 'hasSeenRules-arena';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setShowHowToPlay(true);
      localStorage.setItem(seenKey, 'true');
    }
  }, []);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[guesses.length - 1] || 2;
    
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
      color: colorMap[pts] || "text-emerald-500" 
    };
  }, [won, guesses, t]);

  useEffect(() => {
    const saved = localStorage.getItem(`arena-${getDayString()}`);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setGuesses(d.guesses || []); setIsGameOver(!!d.isGameOver); setWon(!!d.won);
        if (!!d.isGameOver) setShowModal(true);
      } catch (e) { console.error("Arena load failed", e); }
    }
  }, []);

  useEffect(() => {
    if (guesses.length === 0 && !isGameOver) return;
    localStorage.setItem(`arena-${getDayString()}`, JSON.stringify({ guesses, isGameOver, won }));
    if (isGameOver) {
      updateGameStats(GameType.ARENA, won, { attempts: guesses.length });
      if (won) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [guesses, isGameOver, won, getPointsInfo]);

  const handleSelect = (selected: MasterSong) => {
    if (isGameOver || guesses.some(g => String(g.id) === String(selected.id))) return;
    const isWin = String(selected.id) === String(target.id);
    const newGuesses = [selected, ...guesses];
    setGuesses(newGuesses); setQuery(""); setShowResults(false);
    if (isWin) { setWon(true); setIsGameOver(true); setTimeout(() => setShowModal(true), 1500); }
    else if (newGuesses.length >= MAX_GUESSES) { setIsGameOver(true); setTimeout(() => setShowModal(true), 1500); }
  };

  const filteredData = useMemo(() => {
    if (!query || query.length < 1) return [];
    return data.map(s => {
        const titleScore = getFuzzyScore(query, s.title);
        const artistScore = getFuzzyScore(query, s.artist);
        const countryScore = getFuzzyScore(query, s.country);
        return { song: s, score: Math.max(titleScore, artistScore, countryScore) };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8).map(item => item.song);
  }, [query, data]);

  const historyEmoji = useMemo(() => {
    const statusToEmoji = (status: string) => {
        if (status === 'green') return '🟩';
        if (status === 'yellow') return '🟨';
        return '⬛';
    };

    return [...guesses].reverse().map(g => {
        const row = [
            statusToEmoji(getStatus('year', g.year, g)),
            statusToEmoji(getStatus('placing', g.placing, g)),
            statusToEmoji(getStatus('country', g.country, g)),
            statusToEmoji(getStatus('genre', g.genre, g)),
            statusToEmoji(getStatus('members', g.members, g)),
            statusToEmoji(getStatus('sex', g.sex, g))
        ];
        return row.join('');
    }).join('\n');
  }, [guesses, target, getStatus]);

  const translateGenre = (genre: string) => {
    if (genre.includes(' / ')) {
      return genre.split(' / ').map(g => t(`metadata.genres.${g}`) || g).join(' / ');
    }
    return t(`metadata.genres.${genre}`) || genre;
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-4 w-full max-w-2xl mx-auto">
      {(!isGameOver || !showModal) && (
        <>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroArena</h2>
            <button 
              onClick={() => setShowHowToPlay(true)}
              className="w-6 h-6 rounded-full border border-white/20 text-[10px] flex items-center justify-center font-bold text-gray-500 hover:text-white hover:border-white transition-all active:scale-90"
              aria-label="How to play"
            >
              ?
            </button>
          </div>
          <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em] mb-8 pr-[0.2em] italic">{t('arena.analyze')}</p>

          <HowToPlayModal 
            isOpen={showHowToPlay} 
            onClose={() => setShowHowToPlay(false)} 
            title="EuroArena" 
            rules={t('games.euroarena.rules')} 
          />

          {!isGameOver && (
            <div className="w-full relative mb-10 z-[150]" ref={searchRef}>
               <input 
                  type="text" value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
                  placeholder={t('guesser.searchPlaceholder')}
                  className="w-full bg-gray-950 border-2 border-white/5 rounded-2xl px-6 py-5 font-bold focus:border-emerald-500 outline-none text-center text-lg shadow-inner text-white"
                />
                {showResults && query.length >= 1 && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-gray-950 border border-white/10 rounded-2xl shadow-3xl overflow-hidden backdrop-blur-xl max-h-60 overflow-y-auto z-[160]">
                    {filteredData.length > 0 ? filteredData.map((s) => (
                        <button key={s.id} onClick={() => handleSelect(s)} className="w-full text-left px-6 py-4 transition-colors flex justify-between items-center border-b border-white/5 last:border-0 hover:bg-emerald-500/10">
                          <div className="flex flex-col">
                             <span className="font-black text-xs uppercase text-white leading-none mb-1">{s.title}</span>
                             <span className="text-[10px] font-bold text-gray-500 uppercase">{s.artist} • {t(`metadata.countries.${s.country}`)}</span>
                          </div>
                        </button>
                    )) : <div className="px-6 py-6 text-[10px] font-black text-gray-600 uppercase text-center italic">{t('guesser.noResults')}</div>}
                  </div>
                )}
            </div>
          )}

          <div className="w-full space-y-6">
            {guesses.map((g, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-3xl border border-white/5 animate-in slide-in-from-top-6 duration-700 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                 <div className="flex justify-between items-center mb-4 px-2">
                    <div className="flex flex-col">
                       <span className="text-[14px] font-black text-white uppercase tracking-tighter leading-tight break-words">{g.title}</span>
                       <span className="text-[9px] font-bold text-gray-500 uppercase break-words">{g.artist}</span>
                    </div>
                    <div className="text-[10px] font-black text-emerald-500 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">#{guesses.length - idx}</div>
                 </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <ComparisonBox label={t('arena.labels.year')} value={g.year} status={getStatus('year', g.year, g)} arrow={g.year < target.year ? 'up' : g.year > target.year ? 'down' : undefined} delay={idx === 0 ? 100 : 0} />
                    <ComparisonBox label={t('arena.labels.rank')} value={`#${g.placing}`} status={getStatus('placing', g.placing, g)} arrow={g.placing > target.placing ? 'up' : g.placing < target.placing ? 'down' : undefined} delay={idx === 0 ? 250 : 0} />
                    <ComparisonBox label={t('arena.labels.country')} value={t(`metadata.countries.${g.country}`)} status={getStatus('country', g.country, g)} delay={idx === 0 ? 400 : 0} />
                    <ComparisonBox label={t('arena.labels.genre')} value={translateGenre(g.genre)} status={getStatus('genre', g.genre, g)} delay={idx === 0 ? 550 : 0} />
                    <ComparisonBox label={t('arena.labels.size')} value={getMemberLabel(g.members)} status={getStatus('members', g.members, g)} delay={idx === 0 ? 700 : 0} />
                    <ComparisonBox label={t('arena.labels.sex')} value={t(`metadata.sex.${g.sex}`)} status={getStatus('sex', g.sex, g)} delay={idx === 0 ? 850 : 0} />
                 </div>
              </div>
            ))}
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
          historyEmoji={historyEmoji} gameTitle={t('games.euroarena.title')} song={target} attempts={guesses.length} maxAttempts={MAX_GUESSES}
          onClose={() => setShowModal(false)} onReturn={onReturn}
        />
      )}
    </div>
  );
};

export default EuroArena;
