import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';

export const BingoAdminPanel: React.FC = () => {
  const [activeShow, setActiveShow] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const docRef = doc(db, 'global_state', 'bingo');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.thankYouScreen?.active) {
            setActiveShow(data.thankYouScreen.showName);
          } else {
            setActiveShow(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch bingo global state:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchState();
  }, []);

  const pushThankYouScreen = async (showName: string | null) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'global_state', 'bingo');
      await setDoc(docRef, {
        thankYouScreen: {
          active: showName !== null,
          showName: showName,
          timestamp: Date.now()
        }
      }, { merge: true });
      setActiveShow(showName);
    } catch (err) {
      console.error("Failed to update bingo global state:", err);
      alert("Failed to update global state. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading Bingo Admin...</div>;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest text-white">Bingo "Thank You" Screen</h2>
        <p className="text-gray-400 text-sm mt-1">
          Push a "Thank You for Playing" screen to ALL players currently playing EuroBingo. 
          This will interrupt their game and show the social links.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => pushThankYouScreen('Semi-Final 1')}
          className={`py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${activeShow === 'Semi-Final 1' ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          Push Semi-Final 1
        </button>
        <button
          onClick={() => pushThankYouScreen('Semi-Final 2')}
          className={`py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${activeShow === 'Semi-Final 2' ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          Push Semi-Final 2
        </button>
        <button
          onClick={() => pushThankYouScreen('Grand Final')}
          className={`py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${activeShow === 'Grand Final' ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          Push Grand Final
        </button>
      </div>

      {activeShow && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center">
          <p className="text-red-400 font-bold">
            ⚠️ The "Thank You" screen for {activeShow} is currently ACTIVE for all players.
          </p>
          <button
            onClick={() => pushThankYouScreen(null)}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
          >
            Turn Off Screen
          </button>
        </div>
      )}
    </div>
  );
};
