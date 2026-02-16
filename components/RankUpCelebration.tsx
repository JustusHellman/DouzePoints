
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useTranslation } from '../context/LanguageContext.tsx';

interface RankUpCelebrationProps {
  newRank: { title: string; threshold: number };
  onClose: () => void;
}

export const RankUpCelebration: React.FC<RankUpCelebrationProps> = ({ newRank, onClose }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const end = Date.now() + 3000;
    const colors = ['#ec4899', '#a855f7', '#3b82f6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    /* Lowered z-index slightly to z-[250] so StickyAd (z-[300]) stays on top as requested, and added bottom margin */
    <div className={`fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} role="dialog" aria-modal="true">
      <div className="max-w-md w-full text-center animate-in zoom-in-95 duration-500 overflow-y-auto max-h-[calc(100vh-80px)] pt-12 pb-40 scrollbar-hide">
        <div className="mb-6 inline-block p-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-bounce shadow-[0_0_50px_rgba(236,72,153,0.5)]">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none">Rank Up!</h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500 mb-8">You've gained more influence</p>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] mb-10">
          <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest block mb-1">New Status</span>
          <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">{t(`ranks.${newRank.title}`)}</h3>
        </div>

        {/* The pb-40 above ensures this button is pushed up and away from the StickyAd area */}
        <button 
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 500);
          }}
          className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl relative z-10"
        >
          {t('common.returnToGreenroom')}
        </button>
      </div>
    </div>
  );
};
