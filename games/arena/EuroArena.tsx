import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, MasterSong, InfiniteDifficulty, InfiniteGameState, InfinitePlacement, InfiniteYear } from '../../data/types.ts';
import { REGION_MAP, getMemberLabel, getGenreParent, getPlacingLabel } from '../../data/constants.tsx';
import { getFuzzyScore } from '../../utils/fuzzy.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';
import { CategoryMasteredScreen } from '../../components/CategoryMasteredScreen.tsx';
import { reportSupportClick, reportInfiniteRun } from '../../utils/firebaseService.ts';

import { 
  getInfiniteGameState, 
  saveInfiniteGameState, 
  getInfiniteDifficultyPool,
  startNewInfiniteGame,
  advanceInfiniteGame,
  saveInfiniteRecord,
  clearInfiniteGameState,
  serializeDifficulty
} from '../../utils/infinite.ts';

interface EuroArenaProps {
  onReturn: () => void;
  data: MasterSong[];
  bonusSong?: MasterSong;
  mode?: 'daily' | 'infinite';
  gameId?: string;
}

const MAX_GUESSES = 7;

const ComparisonBox = ({ label, value, status, arrow, delay }: { label: string, value: string | number, status: 'green' | 'yellow' | 'gray', arrow?: 'up' | 'down', delay: number }) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const colorClasses = {
    green: 'bg-green-600 border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.3)]',
    yellow: 'bg-yellow-600 border-yellow-500 shadow-[0_0_15px_rgba(202,138,4,0.3)]',
    gray: 'bg-gray-800 border-gray-700 opacity-60'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center py-1.5 md:py-3 px-1 rounded-lg md:rounded-xl border-2 transition-all duration-700 w-full text-center transform-gpu ${revealed ? `${colorClasses[status]} scale-100 rotate-0 opacity-100` : 'bg-gray-900 border-white/5 scale-75 opacity-0'}`}>
      <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5 leading-none italic">{label}</span>
      <div className={`flex items-center gap-0.5 font-black leading-tight w-full justify-center`}>
        <span className="text-white drop-shadow-md break-words line-clamp-2 text-[10px] sm:text-[12px] md:text-[15px] lg:text-[18px] leading-tight hyphens-auto">{value}</span>
        {revealed && arrow === 'up' && <svg className="w-2.5 h-2.5 md:w-4 md:h-4 text-white animate-bounce shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"/></svg>}
        {revealed && arrow === 'down' && <svg className="w-2.5 h-2.5 md:w-4 md:h-4 text-white animate-bounce shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z"/></svg>}
      </div>
    </div>
  );
};

import { SEARCH_WEIGHT_THRESHOLD } from '../../data/activeData.ts';

const EuroArena: React.FC<EuroArenaProps> = ({ onReturn, data, bonusSong, mode = 'daily', gameId = 'euroarena' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const difficulty = useMemo(() => {
    return (location.state?.difficulty as InfiniteDifficulty) || { placement: InfinitePlacement.TOP10, year: InfiniteYear.Y2000 };
  }, [location.state]);

  const [infiniteState, setInfiniteState] = useState(() => {
    if (mode === 'infinite') {
      return getInfiniteGameState(gameId, difficulty) || startNewInfiniteGame(gameId, difficulty);
    }
    return null;
  });

  const target = useMemo(() => {
    if (bonusSong) return bonusSong;
    if (mode === 'infinite' && infiniteState) {
      const currentSongId = infiniteState.shuffledIds[infiniteState.currentIndex];
      const pool = getInfiniteDifficultyPool(difficulty);
      return pool.find(s => s.id === currentSongId) || pool[0];
    }
    const validPool = data.filter(s => (s.weight || 0) >= SEARCH_WEIGHT_THRESHOLD);
    const poolToUse = validPool.length > 0 ? validPool : data;
    const idx = getDailyIndex(poolToUse, "euroarena");
    return poolToUse[idx];
  }, [data, bonusSong, mode, infiniteState, difficulty]);

  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<MasterSong[]>(() => {
    if (mode === 'infinite' && infiniteState) {
      return (infiniteState.guesses || []).map(id => data.find(s => String(s.id) === String(id))).filter(Boolean) as MasterSong[];
    }
    return [];
  });
  const [isGameOver, setIsGameOver] = useState(() => {
    if (mode === 'infinite' && infiniteState && infiniteState.isGameOver) {
      return true;
    }
    return false;
  });
  const [won, setWon] = useState(() => {
    if (mode === 'infinite' && infiniteState && infiniteState.isGameOver) {
      return infiniteState.lastResult?.won || false;
    }
    return false;
  });
  const [showModal, setShowModal] = useState(() => {
    if (mode === 'infinite' && infiniteState && infiniteState.isGameOver) {
      return true;
    }
    return false;
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getStatus = useCallback((key: keyof MasterSong, val: string | number | undefined, guessSong: MasterSong) => {
    if (val === target[key]) return 'green';
    if (key === 'year' && typeof val === 'number' && Math.abs(val - target.year) <= 3) return 'yellow';
    if (key === 'placing' && typeof val === 'number' && Math.abs(val - target.placing) <= 5) return 'yellow';
    if (key === 'members' && typeof val === 'number' && Math.abs(val - target.members) === 1) return 'yellow';
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
    if (isGameOver && !showModal) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showModal, isGameOver]);

  useEffect(() => {
    const isPC = window.matchMedia('(pointer: fine)').matches;
    if (!isGameOver && inputRef.current && isPC) {
      inputRef.current.focus();
    }
  }, [isGameOver, guesses.length]);

  useEffect(() => {
    const seenKey = 'hasSeenRules-euroarena';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setTimeout(() => setShowHowToPlay(true), 0);
      localStorage.setItem(seenKey, 'true');
    }
  }, [setShowHowToPlay]);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    
    // Logic: 1st/2nd Guess = 12pts, 3rd = 10pts, 4th = 8pts, 5th = 6pts, 6th = 4pts, 7th = 2pts
    const pointsMap = [12, 12, 10, 8, 6, 4, 2];
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
    if (mode === 'infinite') return;
    const saved = localStorage.getItem(`euroarena-${getDayString()}`);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        const savedGuesses = (d.guesses || []).map((id: string) => data.find(s => String(s.id) === String(id))).filter(Boolean) as MasterSong[];
        setTimeout(() => {
          setGuesses(savedGuesses);
          setIsGameOver(Boolean(d.isGameOver));
          setWon(Boolean(d.won));
          if (d.isGameOver) setShowModal(true);
        }, 0);
      } catch (e) { console.error("Arena load failed", e); }
    }
  }, [mode, data, setGuesses, setIsGameOver, setWon, setShowModal]);

  useEffect(() => {
    if (guesses.length === 0 && !isGameOver) return;
    
    if (mode === 'infinite') {
      if (infiniteState) {
        let lastResult = infiniteState.lastResult;
        if (isGameOver && !lastResult) {
          const pointsMap = [12, 12, 10, 8, 6, 4, 2];
          const pts = won ? (pointsMap[guesses.length - 1] || 2) : 0;
          lastResult = { won, points: pts };
        }
        const newState: InfiniteGameState = { 
          ...infiniteState, 
          guesses: guesses.map(g => String(g.id)), 
          isGameOver,
          lastResult
        };
        if (isGameOver && !won) {
          clearInfiniteGameState(gameId, difficulty);
        } else {
          saveInfiniteGameState(gameId, difficulty, newState);
        }
      }
    } else {
      localStorage.setItem(`euroarena-${getDayString()}`, JSON.stringify({ guesses: guesses.map(g => String(g.id)), isGameOver, won }));
    }

    if (isGameOver && won) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [guesses, isGameOver, won, mode, infiniteState, difficulty, gameId]);

  const handleSelect = useCallback((selected: MasterSong) => {
    if (isGameOver || guesses.some(g => String(g.id) === String(selected.id))) return;
    const isWin = String(selected.id) === String(target.id);
    const newGuesses = [selected, ...guesses];
    setGuesses(newGuesses); setQuery(""); setShowResults(false);
    if (isWin) { 
      setWon(true); 
      setIsGameOver(true); 
      if (mode === 'infinite' && infiniteState) {
        const pointsMap = [12, 12, 10, 8, 6, 4, 2];
        const pts = pointsMap[newGuesses.length - 1] || 2;
        const nextState = { ...infiniteState, guesses: newGuesses.map(g => String(g.id)), isGameOver: true, lastResult: { won: true, points: pts } };
        saveInfiniteGameState(gameId, difficulty, nextState);
        saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore + pts, infiniteState.currentStreak + 1);
        setInfiniteState(nextState);
        reportInfiniteRun(gameId, serializeDifficulty(difficulty), infiniteState.currentScore + pts, infiniteState.currentStreak + 1, true);
      } else if (!bonusSong) {
        updateGameStats(GameType.ARENA, true, { attempts: newGuesses.length });
      }
      setTimeout(() => setShowModal(true), 1500); 
    }
    else if (newGuesses.length >= MAX_GUESSES) { 
      setIsGameOver(true); 
      setWon(false);
      if (mode === 'infinite' && infiniteState) {
        saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore, infiniteState.currentStreak);
        const nextState = { ...infiniteState, guesses: newGuesses.map(g => String(g.id)), isGameOver: true, lastResult: { won: false, points: 0 } };
        clearInfiniteGameState(gameId, difficulty);
        setInfiniteState(nextState);
        reportInfiniteRun(gameId, serializeDifficulty(difficulty), infiniteState.currentScore, infiniteState.currentStreak, false);
      } else if (!bonusSong) {
        updateGameStats(GameType.ARENA, false, { attempts: newGuesses.length });
      }
      setTimeout(() => setShowModal(true), 1500); 
    }
  }, [isGameOver, guesses, target.id, mode, infiniteState, gameId, difficulty, bonusSong]);

  const validPoolIds = useMemo(() => {
    if (mode !== 'infinite') return null;
    return new Set(getInfiniteDifficultyPool(difficulty).map(s => s.id));
  }, [mode, difficulty]);

  const filteredData = useMemo(() => {
    if (!query || query.length < 1) return [];

    return data
      .filter(s => mode === 'infinite' ? true : ((s.weight || 0) >= SEARCH_WEIGHT_THRESHOLD || s.id === target.id))
      .map(s => {
        const titleScore = getFuzzyScore(query, s.title);
        const artistScore = getFuzzyScore(query, s.artist);
        const countryScore = getFuzzyScore(query, s.country);
        const inPool = mode === 'infinite' ? validPoolIds!.has(s.id) : true;
        return { song: s, score: Math.max(titleScore, artistScore, countryScore), inPool };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => {
        if (a.inPool !== b.inPool) return a.inPool ? -1 : 1;
        return b.score - a.score;
      })
      .slice(0, 100);
  }, [query, data, target, mode, validPoolIds]);

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
  }, [guesses, getStatus]);

  const translateGenre = (genre: string) => {
    if (genre.includes(' / ')) {
      return genre.split(' / ').map(g => t(`metadata.genres.${g}`) || g).join(' / ');
    }
    return t(`metadata.genres.${genre}`) || genre;
  };

  const handleShare = useCallback(() => {
    const placementStr = t(`infinite.placements.${difficulty.placement}`);
    const yearStr = t(`infinite.years.${difficulty.year}`);
    const modeStr = mode === 'infinite' ? `[${placementStr} • ${yearStr}] ` : '';
    const dateStr = mode === 'infinite' ? `${t('infinite.streak')}: ${infiniteState?.currentStreak || 0}` : getDayString();
    const shareText = `${won ? '🏆' : '❌'} ${modeStr}EuroArena • ${dateStr}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')} • ${guesses.length}/${MAX_GUESSES} ${t('common.attempts')}\n\n${historyEmoji}\n\n${window.location.origin}/euro-arena`;
    navigator.clipboard.writeText(shareText);
  }, [mode, t, difficulty, infiniteState, won, getPointsInfo.points, guesses.length, historyEmoji]);

  const handleContinue = useCallback(() => {
    if (mode === 'infinite' && won && infiniteState) {
      const pts = getPointsInfo.points;
      const nextState = advanceInfiniteGame(gameId, difficulty, infiniteState, pts, true);
      setInfiniteState(nextState);
      saveInfiniteGameState(gameId, difficulty, nextState);
      saveInfiniteRecord(gameId, difficulty, nextState.currentScore, nextState.currentStreak);
      
      setGuesses([]);
      setQuery("");
      setIsGameOver(false);
      setWon(false);
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onReturn();
    }
  }, [mode, won, infiniteState, onReturn, difficulty, gameId, getPointsInfo.points]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isGameOver && showModal && e.key === 'Enter' && won && mode === 'infinite') {
        handleContinue();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isGameOver, showModal, won, mode, handleContinue]);

  const handleTryAgain = useCallback(() => {
    if (mode === 'infinite') {
      if (infiniteState) {
        saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore, infiniteState.currentStreak);
      }
      const newState = startNewInfiniteGame(gameId, difficulty);
      setInfiniteState(newState);
      saveInfiniteGameState(gameId, difficulty, newState);
      setGuesses([]);
      setQuery("");
      setIsGameOver(false);
      setWon(false);
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onReturn();
    }
  }, [mode, gameId, difficulty, infiniteState, onReturn]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredData.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filteredData.length) {
        handleSelect(filteredData[selectedIndex].song);
      } else if (filteredData.length > 0) {
        handleSelect(filteredData[0].song);
      }
    }
  };

  const isPoolExhausted = mode === 'infinite' && infiniteState ? infiniteState.currentIndex >= infiniteState.shuffledIds.length : false;

  if (isPoolExhausted) {
    return (
      <CategoryMasteredScreen 
        styles={{
          bg: "bg-emerald-600/20",
          text: "text-emerald-200",
          glow: "bg-emerald-500"
        }}
        onPlayAgain={handleTryAgain}
        onReturn={onReturn}
      />
    );
  }

  return (
    <div className="flex flex-col items-center pt-2 sm:pt-6 pb-24 md:pb-32 px-1 sm:px-4 w-full max-w-2xl mx-auto">
      {isGameOver && showModal ? (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle={t('games.euroarena.title')} song={target} attempts={guesses.length} maxAttempts={MAX_GUESSES}
          onClose={() => setShowModal(false)} onReturn={onReturn} gameType={GameType.ARENA}
          onShare={handleShare}
          mode={mode}
          streak={infiniteState?.currentStreak}
          runScore={infiniteState ? (infiniteState.currentScore + (won ? getPointsInfo.points : 0)) : undefined}
          runStreak={infiniteState ? (infiniteState.currentStreak + (won ? 1 : 0)) : undefined}
          onContinue={handleContinue}
          onTryAgain={handleTryAgain}
        />
      ) : (
        <>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroArena</h1>
            <button 
              onClick={() => setShowHowToPlay(true)}
              className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-white/20 text-[9px] md:text-xs flex items-center justify-center font-bold text-gray-500 hover:text-white hover:border-white transition-all active:scale-90"
              aria-label="How to play"
            >
              ?
            </button>
          </div>
          <p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-6 pr-[0.2em] italic">{t('arena.analyze')}</p>

          <HowToPlayModal 
            isOpen={showHowToPlay} 
            onClose={() => setShowHowToPlay(false)} 
            title="EuroArena" 
            rules={t('games.euroarena.rulesShort')} 
          />

          {!isGameOver && (
            <div className="w-full relative mb-8 z-[150]" ref={searchRef}>
               <input 
                  ref={inputRef}
                  type="text" value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowResults(true); setSelectedIndex(-1); }}
                  onKeyDown={handleKeyDown}
                  placeholder={t('guesser.searchPlaceholder')}
                  className="w-full bg-gray-950 border-2 border-white/5 rounded-xl px-4 py-3 md:py-4 font-bold focus:border-emerald-500 outline-none text-center text-base md:text-xl shadow-inner text-white transition-all duration-300"
                />
                {showResults && query.length >= 1 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-950 border border-white/10 rounded-xl shadow-3xl overflow-hidden backdrop-blur-xl max-h-48 md:max-h-64 overflow-y-auto z-[160]">
                    {filteredData.length > 0 ? filteredData.map(({ song: s, inPool }, idx) => (
                        <button 
                          key={s.id} 
                          onClick={() => handleSelect(s)} 
                          className={`w-full text-left px-4 py-3 md:py-4 transition-colors flex justify-between items-center border-b border-white/5 last:border-0 ${idx === selectedIndex ? 'bg-emerald-500/40' : 'hover:bg-emerald-500/10'} ${!inPool ? 'opacity-50 grayscale' : ''}`}
                        >
                          <div className="flex flex-col">
                             <div className="flex items-center gap-2 mb-1">
                               <span className="font-black text-[10px] md:text-xs uppercase text-white leading-none">{s.title}</span>
                               {!inPool && <span className="text-[7px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 uppercase tracking-widest font-bold">Outside Pool</span>}
                             </div>
                             <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase">{s.artist} • {t(`metadata.countries.${s.country}`)}</span>
                          </div>
                        </button>
                    )) : <div className="px-4 py-4 text-[9px] font-black text-gray-600 uppercase text-center italic">{t('guesser.noResults')}</div>}
                  </div>
                )}
            </div>
          )}

          <div className="w-full space-y-3 md:space-y-4">
            {guesses.map((g, idx) => (
              <div key={idx} className="bg-white/5 p-2.5 md:p-4 rounded-xl md:rounded-[1.5rem] border border-white/5 animate-in slide-in-from-top-6 duration-700 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 md:w-1.5 h-full bg-emerald-500"></div>
                 <div className="flex justify-between items-center mb-2 md:mb-3 px-1">
                    <div className="flex flex-col">
                       <span className="text-[11px] md:text-lg font-black text-white uppercase tracking-tighter leading-tight break-words">{g.title}</span>
                       <span className="text-[7px] md:text-[10px] font-bold text-gray-500 uppercase break-words">{g.artist}</span>
                    </div>
                    <div className="text-[8px] md:text-[10px] font-black text-emerald-500 px-2.5 py-1 md:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                      {guesses.length - idx} / 7
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3">
                    <ComparisonBox label={t('arena.labels.year')} value={g.year} status={getStatus('year', g.year, g)} arrow={g.year < target.year ? 'up' : g.year > target.year ? 'down' : undefined} delay={idx === 0 ? 100 : 0} />
                    <ComparisonBox label={t('arena.labels.rank')} value={getPlacingLabel(g.placing, t)} status={getStatus('placing', g.placing, g)} arrow={g.placing > target.placing ? 'up' : g.placing < target.placing ? 'down' : undefined} delay={idx === 0 ? 250 : 0} />
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
                 className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
               >
                 {t('scorecard.viewScorecard')}
               </button>
            </div>
          )}

          {/* How to Play Section */}
          <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-6 text-center">
              {t('common.howToPlay')}
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 md:p-8">
              <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                {t('games.euroarena.rulesLong')}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EuroArena;