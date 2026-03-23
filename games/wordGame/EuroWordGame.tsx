import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, MasterSong, InfiniteDifficulty, InfinitePlacement, InfiniteYear } from '../../data/types.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';
import { CategoryMasteredScreen } from '../../components/CategoryMasteredScreen.tsx';
import { reportSupportClick, reportInfiniteRun } from '../../utils/firebaseService.ts';
import { 
  getInfiniteGameState, 
  saveInfiniteGameState, 
  saveInfiniteRecord,
  getInfiniteDifficultyPool,
  startNewInfiniteGame,
  advanceInfiniteGame,
  clearInfiniteGameState,
  serializeDifficulty
} from '../../utils/infinite.ts';

const MAX_ATTEMPTS = 6;

type LetterStatus = 'green' | 'yellow' | 'gray' | 'unused' | 'space' | 'fixed';

interface EuroWordGameProps {
  onReturn: () => void;
  data?: MasterSong[];
  gameType: GameType;
  gameId: string;
  title: string;
  bonusSong?: MasterSong;
  mode?: 'daily' | 'infinite';
}

const normalize = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
};

const isLetter = (char: string) => {
  const normalized = normalize(char);
  return /^[A-Z]$/.test(normalized);
};

import { SEARCH_WEIGHT_THRESHOLD } from '../../data/activeData.ts';

const EuroWordGame: React.FC<EuroWordGameProps> = ({ onReturn, data = [], gameType, gameId, title, bonusSong, mode = 'daily' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  const difficulty = useMemo(() => {
    return (location.state?.difficulty as InfiniteDifficulty) || { placement: InfinitePlacement.TOP10, year: InfiniteYear.Y2000 };
  }, [location.state]);

  const [message, setMessage] = useState<string | null>(null);

  const validPool = useMemo(() => {
    const sourceData = mode === 'infinite' ? getInfiniteDifficultyPool(difficulty) : data;
    const pool = sourceData.filter(song => {
      const targetText = (gameType === GameType.WORD_GAME) ? song.title : song.artist;
      return normalize(targetText).split('').some(char => isLetter(char));
    });
    if (mode === 'infinite') return pool;
    const weightedPool = pool.filter(s => (s.weight || 0) >= SEARCH_WEIGHT_THRESHOLD);
    return weightedPool.length > 0 ? weightedPool : pool;
  }, [data, gameType, mode, difficulty]);

  const [infiniteState, setInfiniteState] = useState(() => {
    if (mode === 'infinite') {
      const saved = getInfiniteGameState(gameId, difficulty);
      if (saved) return saved;
      
      const sourceData = getInfiniteDifficultyPool(difficulty);
      const pool = sourceData.filter(song => {
        const targetText = (gameType === GameType.WORD_GAME) ? song.title : song.artist;
        return normalize(targetText).split('').some(char => isLetter(char));
      });
      return startNewInfiniteGame(gameId, difficulty, pool);
    }
    return null;
  });

  const song = useMemo(() => {
    if (bonusSong) return bonusSong;
    if (mode === 'infinite' && infiniteState) {
      const currentSongId = infiniteState.shuffledIds[infiniteState.currentIndex];
      const found = validPool.find(s => s.id === currentSongId);
      return found || validPool[0];
    }
    const salt = `DAILY-V3-${gameType}-${gameId}-SALT-VERIFIED`;
    const idx = getDailyIndex(validPool, salt);
    return validPool[idx];
  }, [validPool, gameId, gameType, bonusSong, mode, infiniteState]);

  const targetText = useMemo(() => {
    return (gameType === GameType.WORD_GAME) ? song.title : song.artist;
  }, [gameType, song]);

  const target = useMemo(() => targetText.toUpperCase(), [targetText]);
  const normalizedTarget = useMemo(() => normalize(target), [target]);
  
  const inputLength = useMemo(() => {
    return normalizedTarget.split('').filter(char => isLetter(char)).length;
  }, [normalizedTarget]);
  
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize with a sensible guess to avoid zero-start
  const [containerWidth, setContainerWidth] = useState(() => Math.min(672, window.innerWidth - 16));
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set initial width immediately
    setContainerWidth(containerRef.current.offsetWidth);
    
    const obs = new ResizeObserver(entries => {
      if (entries[0]) {
        const width = entries[0].contentRect.width;
        if (width > 0) {
          setContainerWidth(width);
          setIsReady(true);
        }
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [target]);

  useEffect(() => {
    if (isGameOver && !showModal) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showModal, isGameOver]);

  const { tileStyle, spaceStyle, keyboardStyle, fallbackClass } = useMemo(() => {
    const chars = target.split('');
    const len = chars.length;

    if (containerWidth === 0) {
      return { 
        tileStyle: {}, 
        spaceStyle: {}, 
        keyboardStyle: { keyStyle: {}, actionKeyStyle: {} }, 
        fallbackClass: 'w-10 h-10 sm:w-14 sm:h-14 text-xl sm:text-3xl' 
      };
    }
    
    const isMobile = window.innerWidth < 640;
    const gap = isMobile ? 1 : 8; 
    const rowGap = isMobile ? 4 : 8; 
    const spaceWidth = isMobile ? 4 : 16;
    
    let maxTileSize = isMobile ? 90 : 120;

    const stickyFooterHeight = 0;
    
    // Accurately calculate reserved height (header + title + margins + keyboard)
    // Reduced baseReservedHeight for mobile to allow larger tiles
    const baseReservedHeight = isMobile ? 220 : 430;
    const reservedHeight = baseReservedHeight + stickyFooterHeight; 
    const availableBoardHeight = viewportHeight - reservedHeight;
    const heightBasedSize = Math.floor((availableBoardHeight - (5 * rowGap)) / 6);
    
    maxTileSize = Math.min(maxTileSize, Math.max(isMobile ? 20 : 28, heightBasedSize));
    
    const numSpaces = chars.filter(c => c === ' ').length;
    const numLetters = len - numSpaces;
    
    const availableWidth = containerWidth - (numSpaces * spaceWidth) - ((len - 1) * gap) - 2;
    const widthBasedSize = Math.floor(availableWidth / numLetters);
    
    const finalSize = Math.max(12, Math.min(maxTileSize, widthBasedSize));
    const fontSize = Math.floor(finalSize * 0.65);
    const borderRadius = Math.max(4, Math.floor(finalSize * 0.25));

    // Keyboard Scaling
    const kGap = isMobile ? 1 : 4;
    // Decouple keyboard width from board width so it stays large and easy to tap
    // Use more width on mobile (containerWidth - 2)
    const targetKWidth = Math.min(containerWidth - 2, isMobile ? 500 : 800);
    const kKeyWidth = Math.floor((targetKWidth - (9 * kGap)) / 10);
    const kActionWidth = Math.floor((3 * kKeyWidth + kGap) / 2);
    
    let kKeyHeight = Math.floor(kKeyWidth * 1.3);
    // Extra compression for very short screens
    if (viewportHeight < 600) {
      kKeyHeight = Math.min(kKeyHeight, isMobile ? 36 : 44);
    }
    
    const kFontSize = Math.max(10, Math.floor(kKeyWidth * 0.45));

    return {
      tileStyle: {
        width: `${finalSize}px`,
        height: `${finalSize}px`,
        fontSize: `${fontSize}px`,
        borderRadius: `${borderRadius}px`,
        borderWidth: finalSize < 24 ? '1px' : '2px'
      },
      spaceStyle: {
        width: `${spaceWidth}px`
      },
      keyboardStyle: {
        keyStyle: {
          width: `${kKeyWidth}px`,
          height: `${kKeyHeight}px`,
          fontSize: `${kFontSize}px`
        },
        actionKeyStyle: {
          width: `${kActionWidth}px`,
          height: `${kKeyHeight}px`,
          fontSize: `${Math.max(8, kFontSize * 0.75)}px`,
        }
      },
      fallbackClass: ""
    };
  }, [containerWidth, viewportHeight, target]);

  /* 
  useLayoutEffect(() => {
    if (isGameOver) return;
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, 60);
    });
    return () => cancelAnimationFrame(timer);
  }, [isGameOver]);
  */

  const animationDelay = useMemo(() => {
    const totalRevealTargetTime = 1200; 
    return Math.min(250, totalRevealTargetTime / target.length);
  }, [target]);

  useEffect(() => {
    const seenKey = `hasSeenRules-${gameId}`;
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setTimeout(() => setShowHowToPlay(true), 0);
      localStorage.setItem(seenKey, 'true');
    }
  }, [gameId, setShowHowToPlay]);

  useEffect(() => {
    if (mode === 'infinite') {
      if (infiniteState) {
        setTimeout(() => {
          if (infiniteState.guesses) setGuesses(infiniteState.guesses);
          if (infiniteState.isGameOver) {
            setIsGameOver(true);
            setWon(infiniteState.lastResult?.won || false);
            setShowModal(true);
          } else {
            setIsGameOver(false);
            setWon(false);
            setShowModal(false);
          }
        }, 0);
      }
      return;
    }
    const saved = localStorage.getItem(`${gameId}-${getDayString()}`);
    if (saved) {
      try {
        const { guesses: sG, isGameOver: sGO, won: sW } = JSON.parse(saved);
        setTimeout(() => {
          if (sG) setGuesses(sG);
          if (sGO !== undefined) setIsGameOver(Boolean(sGO));
          if (sW !== undefined) setWon(Boolean(sW));
          if (sGO) setShowModal(true);
        }, 0);
      } catch (e) {
        console.error("Load failed", e);
      }
    }
  }, [gameId, mode, infiniteState, setIsGameOver, setWon, setGuesses, setShowModal]);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[Math.min(guesses.length - 1, pointsMap.length - 1)];
    
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
  }, [won, guesses, t]);

  useEffect(() => {
    if (guesses.length === 0 && !isGameOver) return;
    
    if (mode === 'infinite') {
      if (infiniteState) {
        const newState = {
          ...infiniteState,
          guesses,
          isGameOver,
          ...(isGameOver ? { lastResult: { won, points: won ? getPointsInfo.points : 0 } } : {})
        };
        if (isGameOver && !won) {
          clearInfiniteGameState(gameId, difficulty);
        } else {
          saveInfiniteGameState(gameId, difficulty, newState);
        }
      }
    } else {
      localStorage.setItem(`${gameId}-${getDayString()}`, JSON.stringify({ guesses, isGameOver, won }));
    }

    if (isGameOver) {
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
  }, [guesses, isGameOver, won, gameId, getPointsInfo, mode, infiniteState, difficulty]);

  const getGuessStatuses = useCallback((guess: string, targetWord: string): LetterStatus[] => {
    const targetArr = targetWord.split('');
    const normTargetArr = normalize(targetWord).split('');
    const guessArr = guess.split('');
    const remainingTargetChars: (string | null)[] = [...normTargetArr];
    const letterStatuses: LetterStatus[] = Array(targetArr.length).fill('unused');

    targetArr.forEach((char, i) => {
      if (char === ' ') {
        letterStatuses[i] = 'space';
        remainingTargetChars[i] = null;
      } else if (!isLetter(char)) {
        letterStatuses[i] = 'fixed';
        remainingTargetChars[i] = null;
      }
    });

    let guessPointer = 0;
    targetArr.forEach((char, i) => {
      if (isLetter(char)) {
        const guessChar = guessArr[guessPointer];
        if (guessChar === normTargetArr[i]) {
          letterStatuses[i] = 'green';
          remainingTargetChars[i] = null;
        }
        guessPointer++;
      }
    });

    guessPointer = 0;
    targetArr.forEach((char, i) => {
      if (isLetter(char)) {
        const guessChar = guessArr[guessPointer];
        if (letterStatuses[i] !== 'green') {
          const targetIdx = remainingTargetChars.indexOf(guessChar);
          if (targetIdx !== -1) {
            letterStatuses[i] = 'yellow';
            remainingTargetChars[targetIdx] = null;
          } else {
            letterStatuses[i] = 'gray';
          }
        }
        guessPointer++;
      }
    });

    return letterStatuses;
  }, []);

  const keyStatuses = useMemo(() => {
    const stats: Record<string, LetterStatus> = {};
    guesses.forEach(guess => {
      const statuses = getGuessStatuses(guess, target);
      let guessIdx = 0;
      target.split('').forEach((char, i) => {
        if (isLetter(char)) {
          const s = statuses[i];
          const guessChar = guess[guessIdx];
          const current = stats[guessChar];
          if (s === 'green') stats[guessChar] = 'green';
          else if (s === 'yellow' && current !== 'green') stats[guessChar] = 'yellow';
          else if (s === 'gray' && !current) stats[guessChar] = 'gray';
          guessIdx++;
        }
      });
    });
    return stats;
  }, [guesses, target, getGuessStatuses]);

  const handleContinue = useCallback(() => {
    console.log("handleContinue called, mode:", mode, "won:", won, "infiniteState:", infiniteState);
    if (mode === 'infinite' && won && infiniteState) {
      const pts = getPointsInfo.points;
      console.log("Advancing game, pts:", pts);
      const nextState = advanceInfiniteGame(gameId, difficulty, infiniteState, pts, true);
      console.log("Next state:", nextState);
      setInfiniteState(nextState);
      saveInfiniteGameState(gameId, difficulty, nextState);
      saveInfiniteRecord(gameId, difficulty, nextState.currentScore, nextState.currentStreak);
      
      // Reset local game state for the next round
      setGuesses([]);
      setCurrentGuess("");
      setIsGameOver(false);
      setWon(false);
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onReturn();
    }
  }, [mode, won, infiniteState, getPointsInfo.points, gameId, difficulty, onReturn]);

  const handleTryAgain = useCallback(() => {
    if (mode === 'infinite') {
      if (infiniteState) {
        saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore, infiniteState.currentStreak);
      }
      const newState = startNewInfiniteGame(gameId, difficulty, validPool);
      setInfiniteState(newState);
      saveInfiniteGameState(gameId, difficulty, newState);
      setGuesses([]);
      setCurrentGuess("");
      setIsGameOver(false);
      setWon(false);
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [mode, infiniteState, gameId, difficulty, validPool]);

  const onKeyPress = useCallback((e: KeyboardEvent | { key: string }) => {
    if (isGameOver) {
      if (e.key === 'Enter' && won && mode === 'infinite') {
        handleContinue();
      }
      return;
    }

    if (e.key === 'Enter') {
      if (currentGuess.length === inputLength) {
        const newGuess = currentGuess.toUpperCase();
        const newGuesses = [...guesses, newGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");
        
        const finalCheckTarget = normalize(target).split('').filter(isLetter).join('');
        if (newGuess === finalCheckTarget) {
          setTimeout(() => {
            setIsGameOver(true);
            setWon(true);
            if (mode === 'infinite' && infiniteState) {
              const pointsMap = [12, 10, 8, 6, 4, 2];
              const pts = pointsMap[newGuesses.length - 1] || 2;
              const nextState = { ...infiniteState, guesses: newGuesses, isGameOver: true, won: true, lastResult: { won: true, points: pts } };
              saveInfiniteGameState(gameId, difficulty, nextState);
              saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore + pts, infiniteState.currentStreak + 1);
              setInfiniteState(nextState);
              reportInfiniteRun(gameId, serializeDifficulty(difficulty), infiniteState.currentScore + pts, infiniteState.currentStreak + 1, true);
            } else if (!bonusSong) {
              updateGameStats(gameType, true, { attempts: newGuesses.length });
            }
            setShowModal(true);
          }, target.length * animationDelay + 500);
        } else if (newGuesses.length >= MAX_ATTEMPTS) {
          setTimeout(() => {
            setIsGameOver(true);
            if (mode === 'infinite' && infiniteState) {
              // On loss, the run is over. We can save the record now.
              const nextState = { ...infiniteState, guesses: newGuesses, isGameOver: true, won: false, lastResult: { won: false, points: 0 } };
              saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore, infiniteState.currentStreak);
              clearInfiniteGameState(gameId, difficulty);
              setInfiniteState(nextState);
              reportInfiniteRun(gameId, serializeDifficulty(difficulty), infiniteState.currentScore, infiniteState.currentStreak, false);
            } else if (!bonusSong) {
              updateGameStats(gameType, false, { attempts: newGuesses.length });
            }
            setShowModal(true);
          }, target.length * animationDelay + 500);
        }
      } else {
        setMessage(t('wordGame.notEnoughLetters'));
        setTimeout(() => setMessage(null), 1500);
      }
    } else if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
      if (currentGuess.length < inputLength) {
        setCurrentGuess(prev => (prev + e.key).toUpperCase());
      }
    }
  }, [isGameOver, currentGuess, inputLength, guesses, target, animationDelay, mode, infiniteState, gameId, difficulty, bonusSong, gameType, t, won, handleContinue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => onKeyPress(e);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  const historyEmoji = useMemo(() => {
    return guesses.map((g) => {
      const statuses = getGuessStatuses(g, target);
      return statuses.map(s => {
        if (s === 'green') return '🟩';
        if (s === 'yellow') return '🟨';
        if (s === 'space' || s === 'fixed') return ' ';
        return '⬛';
      }).join('');
    }).join('\n');
  }, [guesses, target, getGuessStatuses]);

  const handleShare = useCallback(() => {
    const gamePath = gameId === 'eurosong' ? '/euro-song' : '/euro-artist';
    const placementStr = t(`infinite.placements.${difficulty.placement}`);
    const yearStr = t(`infinite.years.${difficulty.year}`);
    const modeStr = mode === 'infinite' ? `[${placementStr} • ${yearStr}] ` : '';
    const dateStr = mode === 'infinite' ? `${t('infinite.streak')}: ${infiniteState?.currentStreak || 0}` : getDayString();
    const shareText = `${won ? '🏆' : '❌'} ${modeStr}${title} • ${dateStr}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')} • ${guesses.length}/${MAX_ATTEMPTS} ${t('common.attempts')}\n\n${historyEmoji}\n\n${window.location.origin}${gamePath}`;
    navigator.clipboard.writeText(shareText);
  }, [won, getPointsInfo, guesses, historyEmoji, t, mode, difficulty, infiniteState, gameId, title]);

  const getTileClass = (status: LetterStatus) => {
    switch (status) {
      case 'green': return 'bg-green-500 border-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]';
      case 'yellow': return 'bg-yellow-500 border-yellow-600 text-white shadow-[0_0_15px_rgba(234,179,8,0.4)]';
      case 'gray': return 'bg-gray-800 border-gray-900 text-gray-500 opacity-60';
      case 'fixed': return 'bg-white/5 border-white/10 text-white/40 italic';
      case 'space': return 'bg-transparent border-transparent opacity-0 pointer-events-none';
      default: return 'bg-transparent border-white/10 text-white';
    }
  };

  const getKeyClass = (char: string) => {
    const status = keyStatuses[char];
    switch (status) {
      case 'green': return 'bg-green-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      case 'gray': return 'bg-gray-900 text-gray-700 opacity-40';
      default: return 'bg-gray-800 text-gray-300 hover:bg-gray-700';
    }
  };

  const gameRuleKey = gameType === GameType.WORD_GAME ? 'eurosong' : 'euroartist';

  const isPoolExhausted = mode === 'infinite' && infiniteState ? infiniteState.currentIndex >= infiniteState.shuffledIds.length : false;

  if (isPoolExhausted) {
    return (
      <CategoryMasteredScreen 
        styles={gameId === 'eurosong' ? {
          bg: "bg-purple-600/20",
          text: "text-purple-200",
          glow: "bg-purple-500"
        } : {
          bg: "bg-pink-600/20",
          text: "text-pink-200",
          glow: "bg-pink-500"
        }}
        onPlayAgain={handleTryAgain}
        onReturn={onReturn}
      />
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center pt-1 sm:pt-4 pb-24 md:pb-32 w-full max-w-2xl mx-auto px-0.5">
      {message && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[600] p-4">
          <div className="bg-white/80 backdrop-blur-xl text-black font-black uppercase text-[14px] md:text-[18px] tracking-[0.2em] px-6 py-3 rounded-2xl shadow-3xl border-[3px] border-white/40 animate-fade-in-out text-center">
            {message}
          </div>
        </div>
      )}

      {isGameOver && showModal ? (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle={title} song={song} attempts={guesses.length} maxAttempts={MAX_ATTEMPTS}
          onClose={() => setShowModal(false)} onReturn={onReturn} onShare={handleShare} gameType={gameType}
          mode={mode}
          streak={infiniteState?.currentStreak}
          runScore={infiniteState ? (infiniteState.currentScore + (won ? getPointsInfo.points : 0)) : undefined}
          runStreak={infiniteState ? (infiniteState.currentStreak + (won ? 1 : 0)) : undefined}
          onContinue={handleContinue}
          onTryAgain={handleTryAgain}
        />
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2 sm:mb-6">
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">{title}</h1>
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
            title={title} 
            rules={t(`games.${gameRuleKey}.rulesShort`)} 
          />
          
          <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-8 items-center px-0.5 sm:px-2 w-full" aria-label={t('wordGame.board')}>
            {[...Array(MAX_ATTEMPTS)].map((_, i) => {
              const guess = guesses[i] || (i === guesses.length ? currentGuess : "");
              const isSubmitted = i < guesses.length;
              const guessStatuses = isSubmitted ? getGuessStatuses(guess, target) : [];
              let letterIdx = 0;
              return (
                <div key={i} className="flex justify-center gap-0.5 sm:gap-2" aria-label={`Row ${i + 1}`}>
                  {target.split('').map((targetChar, j) => {
                    if (targetChar === ' ') return <div key={j} style={spaceStyle} />;
                    
                    const isFix = !isLetter(targetChar);
                    let char = "";
                    let status: LetterStatus = 'unused';
                    
                    if (isFix) {
                       char = targetChar;
                       status = 'fixed';
                    } else {
                       char = guess[letterIdx] || "";
                       status = isSubmitted ? guessStatuses[j] : 'unused';
                       letterIdx++;
                    }

                    const displayChar = isSubmitted && status === 'green' ? targetChar : char;
                    const tileClass = getTileClass(status);
                    
                    return (
                      <div 
                        key={j} 
                        style={{ 
                          ...tileStyle,
                          transitionDelay: isSubmitted && !isFix ? `${(letterIdx-1) * animationDelay}ms` : '0ms' 
                        }}
                        className={`
                          flex items-center justify-center font-black border-2
                          transform-gpu
                          ${isReady ? 'transition-all duration-700' : ''}
                          ${tileClass} 
                          ${fallbackClass}
                          ${!isSubmitted && char && !isFix ? 'border-white/40 scale-110' : ''}
                          ${isSubmitted && !isFix ? 'flip-animation' : ''}
                        `}
                        aria-label={isSubmitted ? `${displayChar}, status: ${status}` : char || 'empty'}
                      >
                        {displayChar}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {isGameOver && (
             <div className="flex justify-center mt-4">
                <button onClick={() => setShowModal(true)} className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all">
                  {t('scorecard.viewScorecard')}
                </button>
             </div>
          )}

          {!isGameOver && (
            <div className="w-full px-0.5 sm:px-2 space-y-1 mt-auto" aria-label={t('wordGame.keyboard')}>
              {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, i) => (
                <div key={i} className="flex justify-center gap-0.5 sm:gap-1">
                  {i === 2 && (
                    <button 
                      onClick={() => onKeyPress({ key: 'Enter' })} 
                      style={keyboardStyle.actionKeyStyle}
                      className="bg-purple-700 rounded-lg font-black uppercase border border-purple-400/20 active:scale-95 outline-none focus:ring-2 focus:ring-purple-400 flex items-center justify-center"
                    >
                      {t('wordGame.enter')}
                    </button>
                  )}
                  {row.split('').map(key => {
                    const canInput = currentGuess.length < inputLength;
                    return (
                      <button 
                        key={key} onClick={() => onKeyPress({ key })} 
                        style={keyboardStyle.keyStyle}
                        className={`rounded-lg font-black transition-all flex items-center justify-center border border-white/5 outline-none ${canInput ? 'active:scale-95 focus:ring-2 focus:ring-pink-500' : ''} ${getKeyClass(key)}`}
                      >
                        {key}
                      </button>
                    );
                  })}
                  {i === 2 && (
                    <button 
                      onClick={() => onKeyPress({ key: 'Backspace' })} 
                      style={keyboardStyle.actionKeyStyle}
                      className="bg-gray-700 rounded-lg flex items-center justify-center border border-white/5 active:scale-95 outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414A2 2 0 0010.828 19H20a2 2 0 002-2V7a2 2 0 00-2-2h-9.172a2 2 0 00-1.414.586L3 12z"/></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* How to Play Section */}
          <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-6 text-center">
              {t('common.howToPlay')}
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 md:p-8">
              <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                {gameRuleKey === 'eurosong' ? t('games.eurosong.rulesLong') : t('games.euroartist.rulesLong')}
              </p>
            </div>
          </div>
        </>
      )}

      <style>{`
        .flip-animation { animation: flip 0.6s ease-in-out forwards; }
        @keyframes flip { 0% { transform: rotateX(0); } 50% { transform: rotateX(90deg); opacity: 0.5; } 100% { transform: rotateX(0); } }
        .animate-fade-in-out { animation: fade-in-out 1.2s ease-in-out forwards; }
        @keyframes fade-in-out { 0% { opacity: 0; transform: translateY(10px); } 15% { opacity: 1; transform: translateY(0); } 85% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
      `}</style>
    </div>
  );
};

export default EuroWordGame;
