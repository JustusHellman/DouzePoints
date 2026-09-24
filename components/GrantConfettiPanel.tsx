import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../firebase.ts';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds.ts';

interface UserDataSnapshot {
  uid: string;
  totalPoints?: number;
  totalDouzePoints?: number;
  collection?: {
    confetti?: number;
    availablePacks?: number;
    packsOpened?: number;
    cards?: Record<string, unknown>;
  };
  lastUpdated?: { toDate: () => Date } | Date | null;
  createdAt?: { toDate: () => Date } | Date | null;
}

export const GrantConfettiPanel: React.FC = () => {
  const [targetUserId, setTargetUserId] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [playerData, setPlayerData] = useState<UserDataSnapshot | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [amountInput, setAmountInput] = useState<string>('100');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [granting, setGranting] = useState(false);
  const [grantSuccess, setGrantSuccess] = useState<string | null>(null);

  const parsedAmount = parseInt(amountInput, 10);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;

  const handleLookup = async (idToSearch?: string) => {
    const uid = (idToSearch || targetUserId).trim();
    if (!uid) {
      setLookupError('Please enter a valid User ID.');
      setPlayerData(null);
      return;
    }

    setLookupLoading(true);
    setLookupError(null);
    setGrantSuccess(null);

    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setPlayerData({
          uid,
          totalPoints: data.totalPoints || 0,
          totalDouzePoints: data.totalDouzePoints || 0,
          collection: data.collection || { confetti: 0, availablePacks: 0, packsOpened: 0 },
          lastUpdated: data.lastUpdated,
          createdAt: data.createdAt,
        });
      } else {
        setPlayerData(null);
        setLookupError(`No user found with ID "${uid}". Please verify the ID.`);
      }
    } catch (err: unknown) {
      console.error('Error fetching user:', err);
      setPlayerData(null);
      const message = err instanceof Error ? err.message : String(err);
      setLookupError(`Failed to fetch user data: ${message}`);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleConfirmGrant = async () => {
    if (!playerData || !isValidAmount) return;

    setGranting(true);
    setLookupError(null);

    try {
      const userRef = doc(db, 'users', playerData.uid);
      await updateDoc(userRef, {
        'collection.confetti': increment(parsedAmount),
        lastUpdated: serverTimestamp(),
      });

      // Trigger confetti & sound effect
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        soundManager.play('celebration');
      } catch (e) {
        console.warn('Effect error:', e);
      }

      const currentConfetti = playerData.collection?.confetti || 0;
      const newTotal = currentConfetti + parsedAmount;

      setGrantSuccess(
        `Successfully granted 🎉 ${parsedAmount.toLocaleString()} confetti to user ${playerData.uid}! New balance: ${newTotal.toLocaleString()}`
      );

      // Re-fetch user data to reflect latest balance
      await handleLookup(playerData.uid);
      setShowConfirmModal(false);
    } catch (err: unknown) {
      console.error('Failed to grant confetti:', err);
      const message = err instanceof Error ? err.message : String(err);
      setLookupError(`Failed to grant confetti: ${message}`);
    } finally {
      setGranting(false);
    }
  };

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showConfirmModal) {
        setShowConfirmModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmModal]);

  const currentConfetti = playerData?.collection?.confetti || 0;
  const newConfettiTotal = currentConfetti + (isValidAmount ? parsedAmount : 0);

  return (
    <div className="space-y-8">
      {/* Main Panel */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <h2 className="text-xl font-black uppercase tracking-widest text-white">
                Grant Player Confetti
              </h2>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Look up a player by User ID and award them confetti points directly in Firestore.
            </p>
          </div>
        </div>

        {/* Step 1: User Lookup */}
        <div className="space-y-4">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-300">
            Step 1: Player User ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => {
                  setTargetUserId(e.target.value);
                  setLookupError(null);
                  setGrantSuccess(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLookup();
                }}
                placeholder="Paste User ID (e.g. i4Kym6cEnhZdWsqA4cRqfIOQK5m2)"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-all"
              />
              {targetUserId && (
                <button
                  onClick={() => {
                    setTargetUserId('');
                    setPlayerData(null);
                    setLookupError(null);
                    setGrantSuccess(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => handleLookup()}
              disabled={lookupLoading || !targetUserId.trim()}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-pink-600/20 shrink-0 flex items-center justify-center gap-2"
            >
              {lookupLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Checking...
                </>
              ) : (
                'Find Player'
              )}
            </button>
          </div>
        </div>

        {/* Lookup Error Banner */}
        {lookupError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl text-xs flex items-center gap-3 animate-in fade-in">
            <span className="text-base">⚠️</span>
            <span>{lookupError}</span>
          </div>
        )}

        {/* Grant Success Banner */}
        {grantSuccess && (
          <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 p-4 rounded-xl text-xs flex items-center gap-3 animate-in fade-in">
            <span className="text-base">✅</span>
            <span className="font-medium">{grantSuccess}</span>
          </div>
        )}

        {/* Player Information Card */}
        {playerData && (
          <div className="bg-white/5 border border-pink-500/30 rounded-xl p-5 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-black uppercase tracking-widest text-pink-400">
                Found Player Profile
              </span>
              <span className="text-[10px] font-mono text-gray-400 bg-black/40 px-2 py-1 rounded">
                ID: {playerData.uid}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Current Confetti
                </span>
                <span className="text-lg font-black text-amber-400 flex items-center gap-1">
                  🎉 {(playerData.collection?.confetti || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Total Points
                </span>
                <span className="text-lg font-black text-pink-400">
                  🏆 {(playerData.totalPoints || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Douze Points
                </span>
                <span className="text-lg font-black text-purple-400">
                  ⭐ {(playerData.totalDouzePoints || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Packs Opened
                </span>
                <span className="text-lg font-black text-cyan-400">
                  📦 {(playerData.collection?.packsOpened || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Step 2: Confetti Amount Selection */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-300">
                Step 2: Confetti Amount to Add
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full sm:w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-base font-bold placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-all"
                />

                {/* Quick preset buttons */}
                <div className="flex flex-wrap gap-2">
                  {[100, 250, 500, 1000, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmountInput(String(preset))}
                      className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                        amountInput === String(preset)
                          ? 'bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/30'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      +{preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount summary preview */}
              {isValidAmount && (
                <div className="bg-black/40 p-3 rounded-lg border border-amber-500/20 text-xs text-amber-200/90 flex items-center justify-between">
                  <span>New Balance Preview:</span>
                  <span className="font-bold text-amber-400 font-mono">
                    {currentConfetti.toLocaleString()} + {parsedAmount.toLocaleString()} ={' '}
                    <span className="text-white underline">{newConfettiTotal.toLocaleString()} 🎉</span>
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={!isValidAmount}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-pink-600/20"
              >
                Review & Grant Confetti
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && playerData && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConfirmModal(false);
          }}
          className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="bg-[#0b0b18] border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(245,158,11,0.2)] space-y-6">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
                🎉
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-wider">
                  Confirm Confetti Grant
                </h3>
                <p className="text-xs text-gray-400">
                  Please verify the recipient ID and amount carefully.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">Target Player ID:</span>
                <span className="text-pink-400 font-bold break-all max-w-[200px] text-right">
                  {playerData.uid}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">Current Balance:</span>
                <span className="text-gray-300 font-bold">
                  {currentConfetti.toLocaleString()} 🎉
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5 text-amber-400">
                <span className="font-bold">Confetti to Add:</span>
                <span className="font-black text-sm">
                  +{parsedAmount.toLocaleString()} 🎉
                </span>
              </div>

              <div className="flex justify-between items-center py-1 text-emerald-400 font-bold pt-1">
                <span>New Total Balance:</span>
                <span className="text-base font-black">
                  {newConfettiTotal.toLocaleString()} 🎉
                </span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-[11px] text-amber-200/80 flex items-center gap-2">
              <span>⚠️</span>
              <span>Double-check to ensure no accidental zeros were added.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={granting}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmGrant}
                disabled={granting}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2"
              >
                {granting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Granting...
                  </>
                ) : (
                  'Confirm & Grant 🎉'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
