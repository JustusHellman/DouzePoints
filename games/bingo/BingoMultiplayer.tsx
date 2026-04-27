import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Users, Link, Trophy, Activity, X, Crown, Eye, AlertCircle, Info, RefreshCw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from '../../context/LanguageContext';
import { db, auth } from '../../firebase';
import { REDDIT_URL, DISCORD_URL } from '../../data/constants.tsx';
import { doc, updateDoc, onSnapshot, collection, query, orderBy, limit, serverTimestamp, addDoc, runTransaction, Timestamp, deleteDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo?: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
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
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Player {
  id: string;
  name: string;
  score: number;
  color: string;
  squares: boolean[];
  boardIds?: string[];
  lastActive: Timestamp | null;
}

interface BingoEvent {
  id: string;
  playerName: string;
  playerColor: string;
  eventId: string;
  timestamp: Timestamp | null;
}

interface BingoMultiplayerProps {
  onClose: () => void;
  mySquares: { id: string; marked: boolean; isFree: boolean }[];
  onSquareClick: (index: number) => void;
  onSquareLongPress?: (index: number) => void;
  onJoinStateChange?: (isJoined: boolean) => void;
  onNewBoard?: () => void;
  onShareBoard?: () => void;
}

const COLORS = [
  'bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500', 
  'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-red-500',
  'bg-indigo-500', 'bg-teal-500', 'bg-lime-500', 'bg-fuchsia-500'
];

const COLOR_STYLES: Record<string, string> = {
  'bg-purple-500': 'bg-purple-600 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
  'bg-blue-500': 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]',
  'bg-emerald-500': 'bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
  'bg-orange-500': 'bg-orange-600 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]',
  'bg-pink-500': 'bg-pink-600 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)]',
  'bg-cyan-500': 'bg-cyan-600 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]',
  'bg-yellow-500': 'bg-yellow-600 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]',
  'bg-red-500': 'bg-red-600 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]',
  'bg-indigo-500': 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]',
  'bg-teal-500': 'bg-teal-600 border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]',
  'bg-lime-500': 'bg-lime-600 border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.4)]',
  'bg-fuchsia-500': 'bg-fuchsia-600 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.4)]',
};

const ONE_AWAY_STYLES: Record<string, string> = {
  'bg-purple-500': 'bg-white/10 border-purple-500/50 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)] hover:border-purple-400',
  'bg-blue-500': 'bg-white/10 border-blue-500/50 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] hover:border-blue-400',
  'bg-emerald-500': 'bg-white/10 border-emerald-500/50 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-400',
  'bg-orange-500': 'bg-white/10 border-orange-500/50 shadow-[inset_0_0_15px_rgba(249,115,22,0.2)] hover:border-orange-400',
  'bg-pink-500': 'bg-white/10 border-pink-500/50 shadow-[inset_0_0_15px_rgba(236,72,153,0.2)] hover:border-pink-400',
  'bg-cyan-500': 'bg-white/10 border-cyan-500/50 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-400',
  'bg-yellow-500': 'bg-white/10 border-yellow-500/50 shadow-[inset_0_0_15px_rgba(234,179,8,0.2)] hover:border-yellow-400',
  'bg-red-500': 'bg-white/10 border-red-500/50 shadow-[inset_0_0_15px_rgba(239,68,68,0.2)] hover:border-red-400',
  'bg-indigo-500': 'bg-white/10 border-indigo-500/50 shadow-[inset_0_0_15px_rgba(99,102,241,0.2)] hover:border-indigo-400',
  'bg-teal-500': 'bg-white/10 border-teal-500/50 shadow-[inset_0_0_15px_rgba(20,184,166,0.2)] hover:border-teal-400',
  'bg-lime-500': 'bg-white/10 border-lime-500/50 shadow-[inset_0_0_15px_rgba(132,204,22,0.2)] hover:border-lime-400',
  'bg-fuchsia-500': 'bg-white/10 border-fuchsia-500/50 shadow-[inset_0_0_15px_rgba(217,70,239,0.2)] hover:border-fuchsia-400',
};

const PULSE_STYLES: Record<string, string> = {
  'bg-purple-500': 'bg-purple-500/20',
  'bg-blue-500': 'bg-blue-500/20',
  'bg-emerald-500': 'bg-emerald-500/20',
  'bg-orange-500': 'bg-orange-500/20',
  'bg-pink-500': 'bg-pink-500/20',
  'bg-cyan-500': 'bg-cyan-500/20',
  'bg-yellow-500': 'bg-yellow-500/20',
  'bg-red-500': 'bg-red-500/20',
  'bg-indigo-500': 'bg-indigo-500/20',
  'bg-teal-500': 'bg-teal-500/20',
  'bg-lime-500': 'bg-lime-500/20',
  'bg-fuchsia-500': 'bg-fuchsia-500/20',
};

const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const BingoMultiplayer: React.FC<BingoMultiplayerProps> = ({ onClose, mySquares, onSquareClick, onSquareLongPress, onJoinStateChange, onNewBoard, onShareBoard }) => {
  const { t, language } = useTranslation();
  
  const [roomId, setRoomId] = useState<string>(() => localStorage.getItem('bingo_room_id') || '');
  const [isJoined, setIsJoined] = useState(() => !!(localStorage.getItem('bingo_player_name') && localStorage.getItem('bingo_room_id')));
  const [isJoining, setIsJoining] = useState(false);
  const isJoiningRef = useRef(false);

  useEffect(() => {
    if (onJoinStateChange) {
      onJoinStateChange(isJoined);
    }
    return () => {
      if (onJoinStateChange) {
        onJoinStateChange(false);
      }
    };
  }, [isJoined, onJoinStateChange]);
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('bingo_player_name') || '');
  const [error, setError] = useState<string | null>(null);
  const [errorScreen, setErrorScreen] = useState<'room_full' | 'quota_exceeded' | null>(null);
  const [mode, setMode] = useState<'select' | 'join'>('select');
  
  const [opponents, setOpponents] = useState<Player[]>([]);
  const [events, setEvents] = useState<BingoEvent[]>([]);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);
  const [copied, setCopied] = useState(false);
  const [myColor, setMyColor] = useState(() => localStorage.getItem('bingo_my_color') || COLORS[0]);
  const [opponentNotifications, setOpponentNotifications] = useState<{ id: string, name: string, type: 'bingo' | 'fullhouse' }[]>([]);
  const previousOpponentsRef = useRef<Record<string, { hasBingo: boolean, hasFullHouse: boolean }>>({});
  const myPreviousStateRef = useRef({ hasBingo: false, hasFullHouse: false });
  const boardSignatureRef = useRef(mySquares.map(s => s.id).join(','));

  const myScore = useMemo(() => mySquares.filter(s => s.marked).length, [mySquares]);
  const maxScore = useMemo(() => {
    const allScores = [myScore, ...opponents.map(p => p.score)];
    return Math.max(...allScores);
  }, [myScore, opponents]);

  const countBingosForArray = useCallback((sqs: boolean[]) => {
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
  }, []);

  const checkBingoForArray = useCallback((sqs: boolean[]) => countBingosForArray(sqs) > 0, [countBingosForArray]);

  const oneAwaySquares = useMemo(() => {
    const oneAway = new Set<number>();
    if (!mySquares || mySquares.length !== 25) return oneAway;
    
    const boolArray = mySquares.map(s => s.marked);
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
  }, [mySquares, countBingosForArray]);

  const handleLeaveRoom = async () => {
    if (auth.currentUser && roomId) {
      const uid = auth.currentUser.uid;
      try {
        await deleteDoc(doc(db, `rooms/${roomId.toUpperCase()}/players`, uid));
        await updateDoc(doc(db, 'rooms', roomId.toUpperCase()), {
          // You could decrement playerCount here if we were strictly tracking it inside a transaction,
          // but deleting the doc is enough to remove them from the list.
        });
      } catch (err) {
        console.error("Error leaving room:", err);
      }
    }
    localStorage.removeItem('bingo_room_id');
    setIsJoined(false);
    onClose();
  };

  const joinRoomWithCode = useCallback(async (code: string, isCreating: boolean, nameToUse?: string) => {
    const finalName = nameToUse || playerName;
    if (!code.trim() || !finalName.trim() || isJoiningRef.current) return;
    
    isJoiningRef.current = true;
    setIsJoining(true);
    setError(null);
    setErrorScreen(null);
    
    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      
      const uid = auth.currentUser!.uid;
      const roomRef = doc(db, 'rooms', code.toUpperCase());
      const playerRef = doc(db, `rooms/${code.toUpperCase()}/players`, uid);
      
      const assignedColor = await runTransaction(db, async (transaction) => {
        const roomDoc = await transaction.get(roomRef);
        const playerDoc = await transaction.get(playerRef);
        
        let colorToAssign = '';

        if (isCreating) {
          if (roomDoc.exists()) {
            throw new Error("ROOM_EXISTS");
          }
          colorToAssign = COLORS[Math.floor(Math.random() * COLORS.length)];
          transaction.set(roomRef, {
            createdAt: serverTimestamp(),
            createdBy: uid,
            status: 'active',
            playerCount: 1,
            takenColors: [colorToAssign],
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
          });
        } else {
          if (!roomDoc.exists()) {
            throw new Error("ROOM_NOT_FOUND");
          }
          
          if (playerDoc.exists() && playerDoc.data().color) {
            colorToAssign = playerDoc.data().color;
          } else {
            const count = roomDoc.data().playerCount || 0;
            if (count >= 10) {
              throw new Error("ROOM_FULL");
            }
            
            const takenColors = roomDoc.data().takenColors || [];
            const availableColors = COLORS.filter(c => !takenColors.includes(c));
            colorToAssign = availableColors.length > 0 
              ? availableColors[Math.floor(Math.random() * availableColors.length)]
              : COLORS[Math.floor(Math.random() * COLORS.length)];
            
            transaction.update(roomRef, { 
              playerCount: count + 1,
              takenColors: [...takenColors, colorToAssign]
            });
          }
        }
        
        if (playerDoc.exists()) {
          transaction.update(playerRef, {
            name: finalName,
            color: colorToAssign,
            score: mySquares.filter(s => s.marked).length,
            squares: mySquares.map(s => s.marked),
            boardIds: mySquares.map(s => s.id),
            lastActive: serverTimestamp()
          });
        } else {
          transaction.set(playerRef, {
            name: finalName,
            color: colorToAssign,
            score: mySquares.filter(s => s.marked).length,
            squares: mySquares.map(s => s.marked),
            boardIds: mySquares.map(s => s.id),
            joinedAt: serverTimestamp(),
            lastActive: serverTimestamp()
          });
        }
        
        return colorToAssign;
      });
      
      setMyColor(assignedColor);
      setRoomId(code.toUpperCase());
      setIsJoined(true);
      localStorage.setItem('bingo_player_name', finalName);
      localStorage.setItem('bingo_room_id', code.toUpperCase());
      localStorage.setItem('bingo_my_color', assignedColor);
      
    } catch (err: unknown) {
      console.error("Error joining room:", err);
      setIsJoined(false);
      if (err instanceof Error) {
        if (err.message === "ROOM_EXISTS") {
          // Retry with a new code
          const newCode = generateRoomCode();
          joinRoomWithCode(newCode, true, finalName);
        } else if (err.message === "ROOM_NOT_FOUND") {
          setError(t('bingo.multiplayer.roomNotFound'));
        } else if (err.message === "ROOM_FULL") {
          setErrorScreen('room_full');
          try {
            await addDoc(collection(db, 'system_logs'), {
              event: 'room_full',
              roomId: code.toUpperCase(),
              timestamp: serverTimestamp()
            });
          } catch { /* ignore log error */ }
        } else if (err.message.includes("Quota exceeded")) {
          setErrorScreen('quota_exceeded');
          try {
            await addDoc(collection(db, 'system_logs'), {
              event: 'quota_exceeded',
              roomId: code.toUpperCase(),
              timestamp: serverTimestamp()
            });
          } catch { /* ignore log error */ }
        } else {
          setError(t('bingo.multiplayer.joinFailed'));
        }
      } else {
        setError(t('bingo.multiplayer.joinFailed'));
      }
    } finally {
      isJoiningRef.current = false;
      setIsJoining(false);
    }
  }, [playerName, mySquares, t]);

  const hasAttemptedInitialSync = useRef(false);

  useEffect(() => {
    const savedName = localStorage.getItem('bingo_player_name');
    const savedRoom = localStorage.getItem('bingo_room_id');
    
    if (savedName && savedRoom && !hasAttemptedInitialSync.current) {
      hasAttemptedInitialSync.current = true;
      // Sync with the server in the background
      joinRoomWithCode(savedRoom, false, savedName).catch(err => {
        console.error("Failed to sync room on load:", err);
        // If it fails (e.g., room deleted), we should probably kick them out
        setIsJoined(false);
        localStorage.removeItem('bingo_room_id');
      });
    }
  }, [joinRoomWithCode]);

  const handleCreateRoom = useCallback(async () => {
    if (!playerName.trim()) {
      setError(t('bingo.multiplayer.enterNameFirst'));
      return;
    }
    const code = generateRoomCode();
    await joinRoomWithCode(code, true);
  }, [playerName, joinRoomWithCode, t]);

  const handleJoinRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim()) {
      setError(t('bingo.multiplayer.enterRoomCode'));
      return;
    }
    await joinRoomWithCode(roomId, false);
  };

  // Handle mid-game quota errors
  const handleMidGameError = useCallback((err: unknown, operationType: OperationType = OperationType.GET, path: string | null = null) => {
    console.error("Firebase sync error:", err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    const errorCode = (err as { code?: string })?.code;
    
    if (errorMsg.includes("Quota exceeded") || errorCode === 'resource-exhausted') {
      setTimeout(() => {
        setIsJoined(false);
        setErrorScreen('quota_exceeded');
      }, 0);
    } else if (errorMsg.includes("Missing or insufficient permissions")) {
      setTimeout(() => {
        handleFirestoreError(err, operationType, path || `rooms/${roomId.toUpperCase()}`);
      }, 0);
    }
  }, [roomId]);

  // Sync my board changes to Firebase
  useEffect(() => {
    if (!isJoined || !auth.currentUser) return;
    
    const uid = auth.currentUser.uid;
    const playerRef = doc(db, `rooms/${roomId.toUpperCase()}/players`, uid);
    
    const boolArray = mySquares.map(s => s.marked);
    const hasBingo = checkBingoForArray(boolArray);
    const hasFullHouse = boolArray.every(s => s);
    
    updateDoc(playerRef, {
      score: mySquares.filter(s => s.marked).length,
      squares: boolArray,
      boardIds: mySquares.map(s => s.id),
      lastActive: serverTimestamp()
    }).catch(err => handleMidGameError(err, OperationType.UPDATE, playerRef.path));
    
    const currentSignature = mySquares.map(s => s.id).join(',');
    if (boardSignatureRef.current && currentSignature !== boardSignatureRef.current) {
      addDoc(collection(db, `rooms/${roomId.toUpperCase()}/events`), {
        playerName: playerName,
        playerColor: myColor,
        eventId: 'NEW_BOARD',
        timestamp: serverTimestamp()
      }).catch(err => handleMidGameError(err));
      boardSignatureRef.current = currentSignature;
      myPreviousStateRef.current = { hasBingo: false, hasFullHouse: false };
    } else {
      const prev = myPreviousStateRef.current;
      if (hasFullHouse && !prev.hasFullHouse) {
        addDoc(collection(db, `rooms/${roomId.toUpperCase()}/events`), {
          playerName: playerName,
          playerColor: myColor,
          eventId: 'FULLHOUSE',
          timestamp: serverTimestamp()
        }).catch(err => handleMidGameError(err));
      } else if (hasBingo && !prev.hasBingo) {
        addDoc(collection(db, `rooms/${roomId.toUpperCase()}/events`), {
          playerName: playerName,
          playerColor: myColor,
          eventId: 'BINGO',
          timestamp: serverTimestamp()
        }).catch(err => handleMidGameError(err));
      }
      myPreviousStateRef.current = { hasBingo, hasFullHouse };
    }
    
  }, [mySquares, isJoined, roomId, playerName, myColor, handleMidGameError, checkBingoForArray]);

  // Listen to opponents and events
  useEffect(() => {
    if (!isJoined) return;
    
    const playersRef = collection(db, `rooms/${roomId.toUpperCase()}/players`);
    let isInitialSnapshot = true;

    const unsubscribePlayers = onSnapshot(playersRef, (snapshot) => {
      const currentUid = auth.currentUser?.uid;
      const newOpponents: Player[] = [];
      const newNotifications: { id: string, name: string, type: 'bingo' | 'fullhouse' }[] = [];
      
      snapshot.forEach(doc => {
        if (doc.id !== currentUid) {
          const data = doc.data();
          newOpponents.push({ id: doc.id, ...data } as Player);
          
          if (data.squares && Array.isArray(data.squares) && data.squares.length === 25) {
            const hasBingo = checkBingoForArray(data.squares);
            const hasFullHouse = data.squares.every((s: boolean) => s);
            
            const prev = previousOpponentsRef.current[doc.id] || { hasBingo: false, hasFullHouse: false };
            
            if (!isInitialSnapshot) {
              if (hasFullHouse && !prev.hasFullHouse) {
                newNotifications.push({ id: Date.now().toString() + Math.random(), name: data.name, type: 'fullhouse' });
              } else if (hasBingo && !prev.hasBingo) {
                newNotifications.push({ id: Date.now().toString() + Math.random(), name: data.name, type: 'bingo' });
              }
            }
            
            // Always update the ref so we track their current state
            previousOpponentsRef.current[doc.id] = { 
              hasBingo: hasBingo || prev.hasBingo, 
              hasFullHouse: hasFullHouse || prev.hasFullHouse 
            };
          }
        }
      });
      
      isInitialSnapshot = false;
      
      if (newNotifications.length > 0) {
        setOpponentNotifications(prev => [...prev, ...newNotifications]);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.2 },
          colors: ['#ec4899', '#8b5cf6', '#3b82f6']
        });
        
        setTimeout(() => {
          setOpponentNotifications(prev => prev.filter(n => !newNotifications.find(nn => nn.id === n.id)));
        }, 5000);
      }
      
      setOpponents(newOpponents.sort((a, b) => b.score - a.score));
    }, (err) => handleMidGameError(err, OperationType.GET, playersRef.path));
    
    const eventsRef = query(collection(db, `rooms/${roomId.toUpperCase()}/events`), orderBy('timestamp', 'desc'), limit(10));
    const unsubscribeEvents = onSnapshot(eventsRef, (snapshot) => {
      const newEvents: BingoEvent[] = [];
      snapshot.forEach(doc => {
        newEvents.push({ id: doc.id, ...doc.data() } as BingoEvent);
      });
      setEvents(newEvents);
    }, (err) => handleMidGameError(err, OperationType.GET, `rooms/${roomId.toUpperCase()}/events`));
    
    return () => {
      unsubscribePlayers();
      unsubscribeEvents();
    };
  }, [isJoined, roomId, handleMidGameError, checkBingoForArray]);

  // Handle stamping a square and logging event
  const handleStamp = useCallback(async (index: number) => {
    const square = mySquares[index];
    const wasMarked = square.marked; // Save the value BEFORE onSquareClick mutates it
    
    onSquareClick(index); // Update local state
    
    if (!isJoined || !auth.currentUser || square.isFree || wasMarked) return; // Only log when marking, not unmarking
    
    try {
      await addDoc(collection(db, `rooms/${roomId.toUpperCase()}/events`), {
        playerName: playerName,
        playerColor: myColor,
        eventId: square.id,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      handleMidGameError(err);
    }
  }, [mySquares, onSquareClick, isJoined, roomId, playerName, myColor, handleMidGameError]);

  if (!isJoined) {
    return createPortal(
      <div className="fixed inset-x-0 bottom-0 top-12 md:top-16 bg-black/90 backdrop-blur-sm z-[90] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden max-h-[90vh]">
          <div className="p-4 flex items-center justify-between bg-white/5 border-b border-white/10 shrink-0">
            <h3 className="font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-500" />
              {t('bingo.multiplayer.liveMultiplayer')}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto">
            {isJoining ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white/70 font-bold uppercase tracking-widest text-sm animate-pulse">{t('bingo.multiplayer.joiningRoom')}</p>
              </div>
            ) : errorScreen ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h4 className="font-black text-xl text-white uppercase">
                  {errorScreen === 'room_full' ? t('bingo.multiplayer.roomFull') : t('bingo.multiplayer.quotaExceeded')}
                </h4>
                <p className="text-white/80 text-sm">
                  {errorScreen === 'room_full' 
                    ? t('bingo.multiplayer.roomFullDesc') 
                    : t('bingo.multiplayer.quotaExceededDesc')}
                </p>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                  <p className="text-white/80 text-sm mb-3">
                    {errorScreen === 'room_full'
                      ? t('bingo.multiplayer.roomFullSocial')
                      : t('bingo.multiplayer.quotaExceededSocial')}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <a 
                      href={REDDIT_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#FF4500] text-white font-bold py-2 px-4 rounded-full hover:bg-[#FF4500]/90 transition-colors flex-1"
                    >
                      Reddit
                    </a>
                    <a 
                      href={DISCORD_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#5865F2] text-white font-bold py-2 px-4 rounded-full hover:bg-[#5865F2]/90 transition-colors flex-1"
                    >
                      Discord
                    </a>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-full mt-4 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  {t('bingo.multiplayer.playLocally')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t('bingo.multiplayer.yourName')}</label>
                  <input 
                    type="text" 
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={15}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500 transition-colors"
                    placeholder={t('bingo.multiplayer.enterYourName')}
                  />
                </div>
                
                {mode === 'select' ? (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={handleCreateRoom}
                        className="w-full bg-pink-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-pink-700 transition-colors shadow-[0_0_20px_rgba(219,39,119,0.4)]"
                      >
                        {t('bingo.multiplayer.hostRoom')}
                      </button>
                      <button 
                        onClick={() => {
                          if (!playerName.trim()) {
                            setError(t('bingo.multiplayer.enterNameFirst'));
                            return;
                          }
                          setError(null);
                          setMode('join');
                        }}
                        className="w-full bg-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/20 transition-colors"
                      >
                        {t('bingo.multiplayer.joinRoom')}
                      </button>
                    </div>

                    <p className="text-center text-white/40 text-xs font-medium">
                      {t('bingo.multiplayer.roomSupport')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleJoinRoomSubmit} className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-2">
                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t('bingo.multiplayer.roomCode')}</label>
                      <input 
                        type="text" 
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                        maxLength={10}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500 transition-colors uppercase"
                        placeholder={t('bingo.multiplayer.enterRoomCodePlaceholder')}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setMode('select')}
                        className="w-full bg-white/5 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                      >
                        {t('bingo.multiplayer.back')}
                      </button>
                      <button 
                        type="submit"
                        className="w-full bg-pink-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-pink-700 transition-colors shadow-[0_0_20px_rgba(219,39,119,0.4)]"
                      >
                        {t('bingo.multiplayer.join')}
                      </button>
                    </div>
                  </form>
                )}
                {error && <p className="text-red-400 text-sm font-bold text-center">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div className="w-full text-white flex flex-col font-sans bg-black/40 min-h-screen">
      {/* Opponent Notifications */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 pointer-events-none">
        {opponentNotifications.map(notif => (
          <div key={notif.id} className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300">
            <span className="font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {notif.name}
            </span>
            <span className="font-bold ml-2">
              {notif.type === 'fullhouse' ? t('bingo.multiplayer.gotAFullHouse') : t('bingo.multiplayer.gotABingo')}
            </span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/5 border border-white/10 p-3 sm:p-4 flex items-center justify-between rounded-2xl mb-2">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
              <h2 className="font-black text-lg sm:text-2xl tracking-tight flex items-center gap-1 sm:gap-2">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-pink-500" />
                {t('bingo.multiplayer.room')}: <span className="text-pink-500">{roomId}</span>
              </h2>
            </div>
            <p className="text-[8px] sm:text-xs text-white/50 font-bold tracking-widest uppercase flex items-center gap-1.5 mt-0.5 sm:mt-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></span>
              {t('bingo.multiplayer.playersLive', { count: opponents.length + 1 })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`Join my EuroBingo room: ${roomId}\nhttps://www.douzepoints.net\n\n#EuroBingo #DouzePoints`);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors"
          >
            <Link className="w-4 h-4" />
            <span className="hidden sm:inline">{copied ? t('bingo.multiplayer.copied') : t('bingo.multiplayer.inviteFriends')}</span>
            <span className="sm:hidden">{copied ? t('bingo.multiplayer.copied') : t('bingo.multiplayer.inviteFriends')}</span>
          </button>
          <button 
            onClick={handleLeaveRoom} 
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors border border-red-500/30"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t('bingo.multiplayer.leaveRoom')}</span>
            <span className="sm:hidden">{t('bingo.multiplayer.leave')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-2 sm:p-6 2xl:px-12 max-w-[1920px] mx-auto w-full flex flex-col gap-6">
        
        {/* Top Section: My Board & Feed */}
        <div className="flex flex-col gap-6 items-start w-full justify-center">
          
          {/* Left: Your Board */}
          <div className="w-full max-w-[900px] mx-auto flex flex-col gap-3">
            <div className="w-full flex items-center justify-between px-2 sm:px-4">
              <div className="flex items-center gap-2">
                <span className="font-black text-white/50 uppercase tracking-widest text-xs sm:text-sm">{t('bingo.multiplayer.myBoard', { defaultValue: 'Your Board' })}</span>
                {myScore === maxScore && maxScore > 0 && <Crown className="w-4 h-4 text-yellow-500" />}
              </div>
              <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-2 sm:px-3 py-1 rounded-full border-2 border-white/10">
                <span className="font-black text-xs sm:text-sm text-white">{myScore}</span>
                <span className="font-bold text-[10px] sm:text-xs text-white/40">/ 25</span>
              </div>
            </div>
            <div className="aspect-square w-full bg-[#1a1a1a] border-2 border-white/10 rounded-3xl p-2 sm:p-4 grid grid-cols-5 gap-1.5 sm:gap-2.5 shadow-2xl">
              {mySquares.map((square, i) => {
                const text = square.isFree ? "12" : t(`bingo.events.${square.id}`);
                const words = text.split(/[\s-]+/);
                const maxWordLen = words.reduce((max: number, w: string) => Math.max(max, w.length), 0);
                const effectiveLength = Math.max(text.length, maxWordLen * 2.5);
                
                return (
                  <button 
                    key={i} 
                    onClick={() => handleStamp(i)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (onSquareLongPress) onSquareLongPress(i);
                    }}
                    style={{ containerType: 'inline-size' }}
                    className={`
                      rounded-xl border-2 flex items-center justify-center p-1 sm:p-2 text-center transition-all relative overflow-hidden select-none aspect-square
                      ${square.marked 
                        ? `${COLOR_STYLES[myColor] || COLOR_STYLES['bg-pink-500']} scale-[0.98]` 
                        : oneAwaySquares.has(i)
                          ? ONE_AWAY_STYLES[myColor] || ONE_AWAY_STYLES['bg-pink-500']
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }
                      ${square.isFree ? 'bg-yellow-500/20 border-yellow-500/50 cursor-default' : 'active:scale-95'}
                      ${square.isFree && square.marked ? 'bg-yellow-500 border-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : ''}
                    `}
                  >
                    {square.isFree ? <span style={{ fontSize: '40cqi' }} className={`font-black italic uppercase tracking-tighter leading-[0.9] ${square.marked ? 'text-white drop-shadow-md' : 'text-white/30 drop-shadow-sm'}`}>12</span> : (
                      <span 
                        lang={language}
                        className={`
                          font-black uppercase tracking-tighter leading-[1.1] break-words hyphens-auto w-full
                          line-clamp-4 ${square.marked ? 'text-white' : 'text-white/80'}
                        `}
                        style={{
                          fontSize: maxWordLen > 14 ? '11cqi' : effectiveLength > 40 ? '12cqi' : effectiveLength > 30 ? '13cqi' : effectiveLength > 20 ? '16cqi' : effectiveLength > 15 ? '19cqi' : '23cqi'
                        }}
                      >
                        {text}
                      </span>
                    )}
                    {square.marked && !square.isFree && (
                      <div className={`absolute inset-0 ${PULSE_STYLES[myColor] || PULSE_STYLES['bg-pink-500']} animate-pulse pointer-events-none`}></div>
                    )}
                    
                    {/* Info icon for both mobile and PC */}
                    <div 
                      className="absolute bottom-0 sm:bottom-1 right-0 sm:right-1 p-0.5 sm:p-1 text-white/40 hover:text-white/80 transition-colors z-10 hidden sm:block"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSquareLongPress) onSquareLongPress(i);
                      }}
                    >
                      <Info className="w-3 h-3 opacity-50" />
                    </div>
                    {/* Mobile hint logic */}
                    <div 
                      className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-white/20 rounded-full sm:hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSquareLongPress) onSquareLongPress(i);
                      }}
                    ></div>
                  </button>
                );
              })}
            </div>
            
            {/* Action Buttons */}
            <div className="flex w-full max-w-[800px] mx-auto gap-4 mt-6">
              {onNewBoard && (
                <button
                  onClick={onNewBoard}
                  className="flex-1 h-14 bg-[#1a1a1a] border-2 border-white/10 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-tighter hover:bg-white/10 transition-all active:scale-95 group shadow-xl text-white"
                >
                  <RefreshCw className="w-5 h-5 text-white/40 group-hover:rotate-180 transition-transform duration-500" />
                  <span>{t('bingo.newBoard')}</span>
                </button>
              )}
              {onShareBoard && (
                <button
                  onClick={onShareBoard} 
                  className="flex-1 h-14 bg-[#1a1a1a] border-2 border-white/10 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-tighter hover:bg-white/10 transition-all active:scale-95 group shadow-xl text-white"
                >
                  <Share2 className="w-5 h-5 text-indigo-400" />
                  <span>{t('bingo.share.title')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Activity Feed */}
          <div className="w-full max-w-[900px] mx-auto bg-white/10 border-2 border-white/10 rounded-3xl p-6 shadow-xl h-fit max-h-[400px] overflow-y-auto">
            <h4 className="font-black uppercase tracking-widest text-sm text-white/50 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {t('bingo.multiplayer.liveActivity')}
            </h4>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/10">
              {events.length === 0 && (
                <p className="text-white/40 text-sm italic pl-8">{t('bingo.multiplayer.noActivity')}</p>
              )}
              {events.map((ev) => (
                <div key={ev.id} className="relative pl-8 animate-in slide-in-from-left-4 fade-in">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${ev.playerColor} flex items-center justify-center text-[10px] font-black shadow-[0_0_10px_rgba(255,255,255,0.2)] z-10`}>
                    {ev.playerName.charAt(0).toUpperCase()}
                  </div>
                  {ev.eventId === 'BINGO' ? (
                    <>
                      <p className="text-sm text-white/80"><span className="font-bold text-white">{ev.playerName}</span> {t('bingo.multiplayer.got')}</p>
                      <p className="text-xs font-black text-yellow-400 bg-yellow-400/10 inline-block px-2 py-1 rounded mt-1 uppercase tracking-widest">{t('bingo.multiplayer.bingoEvent')}</p>
                    </>
                  ) : ev.eventId === 'FULLHOUSE' ? (
                    <>
                      <p className="text-sm text-white/80"><span className="font-bold text-white">{ev.playerName}</span> {t('bingo.multiplayer.gotA')}</p>
                      <p className="text-xs font-black text-pink-400 bg-pink-400/10 inline-block px-2 py-1 rounded mt-1 uppercase tracking-widest">{t('bingo.multiplayer.fullHouseEvent')}</p>
                    </>
                  ) : ev.eventId === 'NEW_BOARD' ? (
                    <>
                      <p className="text-sm text-white/80"><span className="font-bold text-white">{ev.playerName}</span> {t('bingo.multiplayer.startedA')}</p>
                      <p className="text-xs font-black text-blue-400 bg-blue-400/10 inline-block px-2 py-1 rounded mt-1 uppercase tracking-widest">{t('bingo.multiplayer.newBoardEvent')}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white/80"><span className="font-bold text-white">{ev.playerName}</span> {t('bingo.multiplayer.stamped')}</p>
                      <p className="text-xs font-bold text-white bg-white/10 inline-block px-2 py-1 rounded mt-1">"{t(`bingo.events.${ev.eventId}`)}"</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Opponents */}
        <div>
          <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-500" />
            {t('bingo.multiplayer.liveStandings')}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {opponents.filter(p => !auth.currentUser || p.id !== auth.currentUser.uid).length === 0 && (
              <div className="col-span-full text-center py-8 text-white/40 font-bold uppercase tracking-widest">
                {t('bingo.multiplayer.waitingForPlayers')}
              </div>
            )}
            {opponents.filter(p => !auth.currentUser || p.id !== auth.currentUser.uid).map((player) => (
              <div 
                key={player.id} 
                className="bg-[#1a1a1a] border-2 border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-3 relative transition-all hover:bg-[#222] hover:border-white/20 group cursor-pointer shadow-lg active:scale-[0.98]"
                onClick={() => setViewingPlayer(player)}
              >
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-[10px] sm:text-xs shadow-lg ${player.color} text-white border border-white/20`}>
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-sm sm:text-lg text-white truncate leading-tight group-hover:text-pink-400 transition-colors">{player.name}</span>
                    </div>
                    {player.score === maxScore && maxScore > 0 && <Crown className="w-4 h-4 text-yellow-500 shrink-0" />}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-2">
                  <div className="flex flex-col">
                    <span className="font-black text-base sm:text-lg text-white">{player.score}<span className="text-[10px] sm:text-xs text-white/30 ml-0.5">/25</span></span>
                  </div>
                  <div 
                    className="p-1.5 sm:p-2 bg-white/5 group-hover:bg-pink-500/10 rounded-xl transition-all flex items-center gap-2 border border-white/5 group-hover:border-pink-500/30 shadow-inner"
                  >
                    <Eye className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{t('bingo.multiplayer.view')}</span>
                  </div>
                </div>
                
                {/* Mini Board Visualization */}
                <div className="bg-black/40 rounded-lg p-1.5 transition-all group-hover:bg-black/60 shadow-inner">
                  <div className="grid grid-cols-5 gap-0.5 sm:gap-1 w-full">
                    {player.squares.map((stamped, i) => (
                      <div 
                        key={i} 
                        className={`
                          aspect-square rounded-[1px] sm:rounded-[2px] transition-all duration-500
                          ${stamped ? player.color + ' shadow-[0_0_5px_currentColor]' : 'bg-white/10'}
                          ${i === 12 ? (stamped ? 'bg-yellow-500' : 'bg-yellow-500/20') : ''}
                        `} 
                      />
                    ))}
                  </div>
                </div>
                
                {player.score >= 18 && (
                   <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest animate-pulse flex items-center justify-center gap-1 bg-yellow-400/10 py-1.5 rounded-lg">
                     {t('bingo.multiplayer.closeToBingo')}
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Viewing Player Modal */}
      <AnimatePresence>
        {viewingPlayer && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setViewingPlayer(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] border-2 border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-0 max-w-lg w-full relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-4 flex items-center justify-between ${viewingPlayer.color} bg-opacity-20 border-b border-white/10`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg ${viewingPlayer.color}`}>
                    {viewingPlayer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-white uppercase tracking-tight">
                      {t('bingo.multiplayer.playerBoard', { name: viewingPlayer.name })}
                    </h3>
                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
                      {t('bingo.multiplayer.playerStamped', { count: viewingPlayer.score })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingPlayer(null)} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="p-4 sm:p-8">
                <div className="aspect-square w-full max-w-[500px] mx-auto bg-white/5 border border-white/10 rounded-2xl p-2 grid grid-cols-5 gap-1 shadow-inner">
                  {viewingPlayer.squares.map((stamped, i) => {
                    const isFree = i === 12;
                    const eventId = viewingPlayer.boardIds ? viewingPlayer.boardIds[i] : null;
                    const text = eventId && eventId !== 'FREE_SPACE' ? t(`bingo.events.${eventId}`) : null;
                    
                    return (
                      <div 
                        key={i} 
                        style={{ containerType: 'inline-size' }}
                        className={`
                          rounded-lg border flex items-center justify-center p-1 text-center 
                          ${stamped 
                            ? `${viewingPlayer.color} border-white/30 shadow-lg` 
                            : 'bg-white/5 border-white/10'
                          }
                          ${isFree ? 'bg-yellow-500/20 border-yellow-500/50' : ''}
                          ${isFree && stamped ? 'bg-yellow-500 border-yellow-300 text-white' : ''}
                        `}
                      >
                        {isFree && <span className="font-black text-xl sm:text-3xl italic text-white leading-none drop-shadow-sm">12</span>}
                        {!isFree && text && (
                          <span 
                              lang={language}
                              className={`
                                font-black uppercase tracking-tighter leading-[1.1] break-words hyphens-auto w-full
                                line-clamp-4 ${stamped ? 'text-white' : 'text-white/80'}
                              `}
                              style={{
                                fontSize: text.length > 35 ? '11cqi' : text.length > 28 ? '13cqi' : text.length > 20 ? '16cqi' : text.length > 15 ? '18cqi' : '22cqi'
                              }}
                          >
                              {text}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
