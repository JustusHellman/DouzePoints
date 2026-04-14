import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { createPortal } from 'react-dom';
import * as htmlToImage from 'html-to-image';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase.ts';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { BINGO_EVENTS } from '../../data/bingoEvents.ts';
import { EuroBingoPrint } from './EuroBingoPrint.tsx';
import { BingoMultiplayer } from './BingoMultiplayer.tsx';
import { EUROVISION_SCHEDULE } from '../../config/eurovisionSchedule.ts';
import { Users } from 'lucide-react';
import { REDDIT_URL, DISCORD_URL, BUY_ME_A_COFFEE_URL } from '../../data/constants.tsx';

import { logAnalyticsEvent } from '../../utils/analytics.ts';

interface BingoSquare {
  id: string;
  marked: boolean;
  isFree: boolean;
}

const STORAGE_KEY = 'eurobingo-state';
const START_LOGGED_KEY = 'eurobingo-start-logged';

export const EuroBingo: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const { t } = useTranslation();
  const boardRef = useRef<HTMLDivElement>(null);
  const hasLoggedStartRef = useRef<boolean>(localStorage.getItem(START_LOGGED_KEY) === 'true');
  
  const [squares, setSquares] = useState<BingoSquare[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && Array.isArray(data) && data.length === 25) {
          return data;
        }
      } catch (e) {
        console.error("Failed to load bingo state", e);
      }
    }
    
    // Initial generation
    const shuffled = [...BINGO_EVENTS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 24);
    const newSquares: BingoSquare[] = [];
    let eventIdx = 0;
    for (let i = 0; i < 25; i++) {
      if (i === 12) {
        newSquares.push({ id: 'free', marked: true, isFree: true });
      } else {
        newSquares.push({ id: selected[eventIdx].id, marked: false, isFree: false });
        eventIdx++;
      }
    }
    return newSquares;
  });

  const [showBingoModal, setShowBingoModal] = useState(false);
  const [showFullHouseModal, setShowFullHouseModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [showPrintView, setShowPrintView] = useState(false);
  const [showMultiplayerPrototype, setShowMultiplayerPrototype] = useState(() => !!localStorage.getItem('bingo_room_id'));
  const [isMultiplayerJoined, setIsMultiplayerJoined] = useState(() => !!(localStorage.getItem('bingo_player_name') && localStorage.getItem('bingo_room_id')));
  const [showPrintConfigModal, setShowPrintConfigModal] = useState(false);
  const [printConfig, setPrintConfig] = useState<{ totalCards: number | '', cardsPerPage: number }>({ totalCards: 4, cardsPerPage: 4 });
  const [copied, setCopied] = useState(false);
  const [isEventLive, setIsEventLive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [thankYouScreen, setThankYouScreen] = useState<{ active: boolean, showName: string | null, timestamp?: number }>({ active: false, showName: null });
  const [dismissedThankYou, setDismissedThankYou] = useState<string | null>(() => localStorage.getItem('dismissedThankYou'));

  useEffect(() => {
    const docRef = doc(db, 'global_state', 'bingo');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.thankYouScreen) {
          setThankYouScreen(data.thankYouScreen);
        }
      }
    }, (error) => {
      console.error("Error listening to global_state/bingo:", error);
      if (error?.message?.includes("Missing or insufficient permissions")) {
        setTimeout(() => {
          // We need to construct the error info manually since handleFirestoreError is not imported
          const errInfo = {
            error: error instanceof Error ? error.message : String(error),
            authInfo: {
              userId: auth.currentUser?.uid,
              email: auth.currentUser?.email,
              emailVerified: auth.currentUser?.emailVerified,
              isAnonymous: auth.currentUser?.isAnonymous,
              tenantId: auth.currentUser?.tenantId,
              providerInfo: auth.currentUser?.providerData.map(provider => ({
                providerId: provider.providerId,
                displayName: provider.displayName,
                email: provider.email,
                photoUrl: provider.photoURL
              })) || []
            },
            operationType: 'get',
            path: 'global_state/bingo'
          };
          console.error('Firestore Error: ', JSON.stringify(errInfo));
          throw new Error(JSON.stringify(errInfo));
        }, 0);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkLive = () => {
      const now = new Date();
      const live = EUROVISION_SCHEDULE.some(show => {
        const startTime = new Date(show.startTime);
        const endTime = new Date(show.endTime);
        return now >= startTime && now <= endTime;
      });
      setIsEventLive(live);
    };
    checkLive();
    const timer = setInterval(checkLive, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleShareEmoji = async () => {
    let grid = '';
    for (let i = 0; i < 5; i++) {
      let row = '';
      for (let j = 0; j < 5; j++) {
        const sq = squares[i * 5 + j];
        if (sq.isFree) row += '🟨';
        else if (sq.marked) row += '🟪';
        else row += '⬛';
      }
      grid += row + '\n';
    }
    
    const text = t('bingo.share.emojiText').replace('{grid}', grid).replace('{url}', 'https://www.douzepoints.net');
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadImage = async () => {
    if (!boardRef.current) return;
    setIsCapturing(true);
    
    // Wait for React to render the watermark
    await new Promise(resolve => setTimeout(resolve, 150));
    
    try {
      const dataUrl = await htmlToImage.toPng(boardRef.current, {
        backgroundColor: '#0b0b18',
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const link = document.createElement('a');
      link.download = 'eurobingo-board.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image: ', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handlePrint = () => {
    setShowPrintConfigModal(true);
    setShowShareModal(false);
  };

  const performGenerate = useCallback(() => {
    // Pick 24 random events
    const shuffled = [...BINGO_EVENTS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 24);
    
    const newSquares: BingoSquare[] = [];
    let eventIdx = 0;
    
    for (let i = 0; i < 25; i++) {
      if (i === 12) {
        newSquares.push({ id: 'free', marked: true, isFree: true });
      } else {
        newSquares.push({ id: selected[eventIdx].id, marked: false, isFree: false });
        eventIdx++;
      }
    }
    
    setSquares(newSquares);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSquares));
    
    // Reset start tracking for the new board
    hasLoggedStartRef.current = false;
    localStorage.removeItem(START_LOGGED_KEY);
    
    setShowConfirmModal(false);
    setShowBingoModal(false);
    setShowFullHouseModal(false);
  }, []);

  const generateNewBoard = useCallback((confirm = true) => {
    if (confirm) {
      setShowConfirmModal(true);
    } else {
      performGenerate();
    }
  }, [performGenerate]);

  // Sync initial state to localStorage if it was just generated
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved && squares.length === 25) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(squares));
    }
  }, [squares]);

  const checkBingo = (index: number, currentSquares: BingoSquare[]) => {
    const row = Math.floor(index / 5);
    const col = index % 5;

    // Check row
    const rowComplete = [0, 1, 2, 3, 4].every(i => currentSquares[row * 5 + i].marked);
    if (rowComplete) return true;

    // Check column
    const colComplete = [0, 1, 2, 3, 4].every(i => currentSquares[i * 5 + col].marked);
    if (colComplete) return true;

    // Check diagonals if applicable
    if (index % 6 === 0) { // Main diagonal
      const diag1Complete = [0, 6, 12, 18, 24].every(i => currentSquares[i].marked);
      if (diag1Complete) return true;
    }
    if (index % 4 === 0 && index > 0 && index < 24) { // Anti-diagonal
      const diag2Complete = [4, 8, 12, 16, 20].every(i => currentSquares[i].marked);
      if (diag2Complete) return true;
    }

    return false;
  };

  const oneAwaySquares = useMemo(() => {
    const oneAway = new Set<number>();
    if (squares.length !== 25) return oneAway;
    
    // We only want to show "one away" if they don't already have a bingo
    // Actually, it's fine to show it even if they have a bingo elsewhere, 
    // but let's just calculate it.
    const boolArray = squares.map(s => s.marked);
    const countBingosForArray = (sqs: boolean[]) => {
      if (!sqs || sqs.length !== 25) return 0;
      let count = 0;
      for (let i = 0; i < 5; i++) {
        if ([0, 1, 2, 3, 4].every(j => sqs[i * 5 + j])) count++;
      }
      for (let i = 0; i < 5; i++) {
        if ([0, 1, 2, 3, 4].every(j => sqs[j * 5 + i])) count++;
      }
      if ([0, 6, 12, 18, 24].every(i => sqs[i])) count++;
      if ([4, 8, 12, 16, 20].every(i => sqs[i])) count++;
      return count;
    };
    
    const currentBingoCount = countBingosForArray(boolArray);

    for (let i = 0; i < 25; i++) {
      if (!boolArray[i]) {
        boolArray[i] = true;
        if (countBingosForArray(boolArray) > currentBingoCount) {
          oneAway.add(i);
        }
        boolArray[i] = false;
      }
    }
    return oneAway;
  }, [squares]);

  const toggleSquare = (index: number) => {
    if (squares[index].isFree) return;

    if (!hasLoggedStartRef.current) {
      hasLoggedStartRef.current = true;
      localStorage.setItem(START_LOGGED_KEY, 'true');
      logAnalyticsEvent('bingo_board_started', {
        is_multiplayer: isMultiplayerJoined
      });
    }

    const newSquares = [...squares];
    const wasMarked = newSquares[index].marked;
    newSquares[index].marked = !wasMarked;
    
    setSquares(newSquares);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSquares));

    // Only check for bingo if we just marked it
    if (!wasMarked) {
      const isBingo = checkBingo(index, newSquares);
      const isFullHouse = newSquares.every(s => s.marked);

      if (isFullHouse) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981']
        });
        setShowFullHouseModal(true);
      } else if (isBingo) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#8b5cf6', '#3b82f6']
        });
        setShowBingoModal(true);
      }
    }
  };

  const handleDismissThankYou = () => {
    if (thankYouScreen.showName) {
      localStorage.setItem('dismissedThankYou', thankYouScreen.showName);
      setDismissedThankYou(thankYouScreen.showName);
    }
  };

  const isWithinTimeWindow = thankYouScreen.timestamp 
    ? (Date.now() - thankYouScreen.timestamp) < 10 * 60 * 1000 // 10 minutes
    : true; // Fallback if no timestamp exists

  const shouldShowThankYou = thankYouScreen.active && 
                             thankYouScreen.showName !== dismissedThankYou && 
                             isWithinTimeWindow;

  return (
    <>
      {shouldShowThankYou && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-lg w-full relative shadow-3xl border-t-pink-500/30 max-h-[90vh] overflow-y-auto text-center">
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent italic uppercase tracking-tighter mb-2">
              {t('bingo.thankYouForPlaying')}
            </h1>
            <p className="text-xl text-white/90 mb-6 font-bold">
              {t('bingo.hasConcluded', { showName: thankYouScreen.showName })}
            </p>
            
            <p className="text-white/70 mb-8 text-sm font-medium leading-relaxed whitespace-pre-line">
              {t('bingo.thanksForPlaying')}
            </p>
            
            <div className="flex gap-3 mb-10 justify-center">
              <a
                href={REDDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/20 hover:bg-[#FF4500]/20 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FF4500]">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.427.06.646 0 2.834-3.334 5.132-7.447 5.132-4.113 0-7.447-2.298-7.447-5.132 0-.215.021-.435.06-.646-.621-.264-1.056-.881-1.056-1.597 0-.968.786-1.754 1.754-1.754.463 0 .89.182 1.207.491 1.207-.856 2.843-1.427 4.674-1.488l.8-3.747 2.597.547c-.012.068-.02.137-.02.208 0 .688.562 1.25 1.25 1.25zM8.507 11.2c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm6.986 0c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm-1.145 4.852a5.412 5.412 0 0 1-2.348.513 5.412 5.412 0 0 1-2.348-.513.437.437 0 0 1-.223-.574.437.437 0 0 1 .574-.223c.651.285 1.326.429 1.997.429s1.346-.144 1.997-.429a.437.437 0 0 1 .574.223.437.437 0 0 1-.223.574z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-100/70 group-hover:text-white transition-colors">Reddit</span>
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#5865F2]">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-100/70 group-hover:text-white transition-colors">Discord</span>
              </a>
            </div>

            <div className="mb-8">
              <h3 className="text-white font-black uppercase tracking-widest text-xs mb-3">{t('bingo.enjoyedExperience')}</h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                {t('bingo.supportDouzePoints')}
              </p>
              <a
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => import('../../utils/firebaseService.ts').then(m => m.reportSupportClick('Bingo_ThankYou'))}
                className="group flex items-center justify-between px-5 py-4 rounded-xl transition-colors duration-300 bg-white/5 hover:bg-white/10 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#FFDD00] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
                  </svg>
                  <span className="text-sm font-bold text-gray-300">
                    {t('support.button')}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest bg-[#FFDD00]/20 text-white px-4 py-1.5 rounded-full">
                  Support
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDismissThankYou}
                className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-pink-500 hover:text-white transition-all active:scale-95 uppercase text-xs tracking-widest"
              >
                {t('bingo.closeAndKeepPlaying')}
              </button>
              <button 
                onClick={() => {
                  handleDismissThankYou();
                  onReturn();
                }}
                className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] py-2"
              >
                {t('bingo.returnToMenu')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    <div className="flex flex-col items-center pt-2 sm:pt-6 pb-24 md:pb-32 px-1 sm:px-4 w-full max-w-3xl mx-auto relative animate-in fade-in duration-500">
      {showMultiplayerPrototype && (
        <BingoMultiplayer 
          onClose={() => setShowMultiplayerPrototype(false)} 
          mySquares={squares}
          onSquareClick={toggleSquare}
          onSquareLongPress={setSelectedSquare}
          onJoinStateChange={setIsMultiplayerJoined}
          onNewBoard={() => generateNewBoard(true)}
          onShareBoard={() => setShowShareModal(true)}
        />
      )}

      {!isMultiplayerJoined && (
        <>
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 flex-wrap justify-center">
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter leading-none">
              {t('bingo.title')}
            </h1>
            <button 
              onClick={() => setShowHowToPlay(true)} 
              className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-white/20 text-[9px] md:text-xs flex items-center justify-center font-bold text-gray-500 hover:text-white hover:border-white transition-all active:scale-90"
            >
              ?
            </button>
            <button 
              onClick={() => setShowMultiplayerPrototype(true)}
              className="ml-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest transition-all shadow-[0_0_20px_rgba(219,39,119,0.5)] hover:shadow-[0_0_25px_rgba(219,39,119,0.7)] hover:scale-105 flex items-center gap-2 animate-pulse-slow"
            >
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              {t('bingo.playLiveWithFriends')}
            </button>
          </div>

          {/* Bingo Grid */}
          <div ref={boardRef} className="w-full mb-8 bg-[#0b0b18] p-2 sm:p-4 rounded-xl sm:rounded-3xl flex flex-col gap-2 sm:gap-3">
        <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full aspect-square">
          {squares.map((square, i) => {
          const text = square.isFree ? "12" : t(`bingo.events.${square.id}`);
          const maxWordLength = Math.max(...text.split(/\s+/).map(w => w.length));
          
          return (
            <button
              key={`${square.id}-${i}`}
              onClick={() => toggleSquare(i)}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedSquare(i);
              }}
              className={`
                relative flex items-center justify-center p-0.5 sm:p-1 rounded-lg sm:rounded-2xl border-2 transition-all duration-300 aspect-square overflow-hidden select-none
                ${square.marked 
                  ? square.isFree
                    ? 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 border-yellow-300/50 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                    : 'bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.4)]' 
                  : oneAwaySquares.has(i)
                    ? 'bg-white/10 border-pink-500/50 shadow-[inset_0_0_15px_rgba(236,72,153,0.3)] hover:border-pink-400'
                    : 'bg-white/10 border-white/5 hover:border-white/20'
                }
                ${square.isFree ? 'cursor-default' : 'active:scale-95'}
              `}
            >
              <div className={`
                text-center w-full h-full flex items-center justify-center transition-all text-white
                ${square.isFree ? 'text-2xl sm:text-4xl italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-black uppercase tracking-tighter' : 
                  (text.length > 25 || maxWordLength > 10) ? 'text-[7px] sm:text-[9px]' :
                  (text.length > 18 || maxWordLength > 8) ? 'text-[8px] sm:text-[10px]' :
                  (text.length > 14 || maxWordLength > 7) ? 'text-[9px] sm:text-[11px]' :
                  (text.length > 10 || maxWordLength > 6) ? 'text-[10px] sm:text-[12px]' : 
                  'text-[11px] sm:text-[14px]'
                }
              `}>
                {square.isFree ? text : (
                  <span className="line-clamp-4 leading-[1.1] font-black uppercase tracking-tighter break-words w-full">
                    {text}
                  </span>
                )}
              </div>
              
              {/* Long press hint for mobile */}
              <div 
                className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-white/20 rounded-full sm:hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSquare(i);
                }}
              ></div>
            </button>
          );
        })}
        </div>
        {isCapturing && (
          <div className="flex items-center justify-between px-1 sm:px-2 opacity-50">
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white">DOUZE POINTS</span>
            <span className="text-[8px] sm:text-[10px] font-bold text-white">douzepoints.net</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
        {!isEventLive && (
          <button 
            onClick={handlePrint}
            className="w-full bg-white/10 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/10"
          >
            <span>{t('bingo.share.print')}</span>
            <span className="text-lg">🖨️</span>
          </button>
        )}

        <div className="flex w-full gap-2">
          <button
            onClick={() => generateNewBoard(true)}
            className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          >
            {t('bingo.newBoard')}
          </button>
          <button 
            onClick={() => setShowShareModal(true)} 
            className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
            title={t('bingo.share.title')}
          >
            <span>{t('bingo.share.title')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {isEventLive && (
          <button 
            onClick={handlePrint}
            className="w-full bg-white/5 text-gray-400 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
          >
            <span>{t('bingo.share.print')}</span>
            <span className="text-sm">🖨️</span>
          </button>
        )}
      </div>
      </>
      )}

      {/* Modals */}
      {showShareModal && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border-t-purple-500/30 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">{t('bingo.share.title')}</h2>
            
            <div className="flex flex-col gap-3 mb-8">
              <button 
                onClick={handleShareEmoji}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>{copied ? t('bingo.share.copied') : t('bingo.share.emoji')}</span>
                {!copied && <span className="text-lg">📱</span>}
              </button>
              
              <button 
                onClick={handleDownloadImage}
                className="w-full bg-white/10 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
              >
                <span>{t('bingo.share.image')}</span>
                <span className="text-lg">📸</span>
              </button>
            </div>

            <button onClick={() => setShowShareModal(false)} className="w-full bg-white text-black py-4 rounded-full font-black uppercase text-[10px] tracking-widest">{t('common.close')}</button>
          </div>
        </div>,
        document.body
      )}

      {showHowToPlay && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border-t-pink-500/30">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">{t('bingo.title')}</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">{t('bingo.howToPlay')}</p>
            <button onClick={() => setShowHowToPlay(false)} className="w-full bg-white text-black py-4 rounded-full font-black uppercase text-[10px] tracking-widest">{t('common.close')}</button>
          </div>
        </div>,
        document.body
      )}

      {showConfirmModal && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border-t-red-500/30 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">{t('bingo.newBoard')}?</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">{t('bingo.confirmNewBoard')}</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="bg-white/5 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest">{t('common.close')}</button>
              <button onClick={() => performGenerate()} className="bg-red-500 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest">{t('bingo.generateNew')}</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showBingoModal && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border-t-yellow-500/30 text-center max-h-[90vh] overflow-y-auto">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
              <span className="text-4xl">🏆</span>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">{t('bingo.bingoTitle')}</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">{t('bingo.bingoMessage')}</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => setShowBingoModal(false)} className="w-full bg-white text-black py-4 rounded-full font-black uppercase text-[10px] tracking-widest">{t('bingo.continuePlaying')}</button>
              <button onClick={() => performGenerate()} className="w-full bg-white/5 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest">{t('bingo.generateNew')}</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showFullHouseModal && createPortal(
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[70] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0b0b18] border border-yellow-500/50 rounded-[3rem] p-10 max-w-md w-full relative shadow-[0_0_100px_rgba(234,179,8,0.3)] text-center overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4 leading-none">
                {t('bingo.fullHouseTitle')}
              </h2>
              
              <p className="text-gray-300 text-base font-medium leading-relaxed mb-10">
                {t('bingo.fullHouseMessage')}
              </p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => performGenerate()} 
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {t('bingo.startNewBoard')}
                </button>
                <button 
                  onClick={() => setShowFullHouseModal(false)} 
                  className="w-full bg-white/5 text-gray-400 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
                >
                  {t('bingo.justAdmire')}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {selectedSquare !== null && createPortal(
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedSquare(null)}
        >
          <div 
            className="bg-[#1a1a2e] border-2 border-white/10 rounded-[2rem] p-8 max-w-xs w-full shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                squares[selectedSquare].marked 
                  ? squares[selectedSquare].isFree 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]' 
                    : isMultiplayerJoined
                      ? `${localStorage.getItem('bingo_my_color') || 'bg-pink-500'} shadow-[0_0_20px_rgba(255,255,255,0.2)]`
                      : 'bg-gradient-to-br from-pink-500 to-blue-600 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                  : 'bg-white/10'
              }`}>
                {squares[selectedSquare].isFree ? (
                  <span className="text-2xl font-black italic text-white">12</span>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </div>
              
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">
                {squares[selectedSquare].isFree ? t('bingo.douzePointsSquare') : t('bingo.eventDetails')}
              </h3>
              
              <p className="text-gray-300 text-lg font-bold uppercase tracking-tight leading-snug mb-8">
                {squares[selectedSquare].isFree 
                  ? t('bingo.douzePointsDesc') 
                  : t(`bingo.events.${squares[selectedSquare].id}`)}
              </p>
              
              <button 
                onClick={() => setSelectedSquare(null)}
                className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest"
              >
                {t('bingo.gotIt')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showPrintConfigModal && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border-t-pink-500/30 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">{t('bingo.share.printTitle')}</h2>
            
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{t('bingo.share.totalCards')}</label>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  value={printConfig.totalCards}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setPrintConfig(prev => ({ ...prev, totalCards: '' }));
                    } else {
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setPrintConfig(prev => ({ ...prev, totalCards: Math.min(100, num) }));
                      }
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{t('bingo.share.cardsPerPage')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => setPrintConfig(prev => ({ ...prev, cardsPerPage: num }))}
                      className={`py-3 rounded-xl font-black text-sm transition-all ${
                        printConfig.cardsPerPage === num 
                          ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.5)]' 
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowPrintConfigModal(false)} 
                className="flex-1 bg-white/10 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-colors"
              >
                {t('common.close')}
              </button>
              <button 
                onClick={() => {
                  setShowPrintConfigModal(false);
                  setShowPrintView(true);
                }} 
                disabled={printConfig.totalCards === '' || printConfig.totalCards < 1}
                className="flex-1 bg-pink-600 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-pink-700 transition-colors shadow-[0_0_20px_rgba(219,39,119,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {t('bingo.share.generate')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showPrintView && createPortal(
        <div className="fixed inset-0 bg-white z-[9999] overflow-auto">
          <EuroBingoPrint 
            onClose={() => setShowPrintView(false)} 
            totalCards={typeof printConfig.totalCards === 'number' ? Math.max(1, printConfig.totalCards) : 4}
            cardsPerPage={printConfig.cardsPerPage}
          />
        </div>,
        document.body
      )}
    </div>
    </>
  );
};
