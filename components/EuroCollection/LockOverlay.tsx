import React from 'react';
import { motion } from 'motion/react';
import { PartyPopper } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface LockOverlayProps {
  isUnowned: boolean;

  isCovered?: boolean;
  canCraft: boolean;
  craftCost?: number;
  onCraft?: () => void;
  craftingInitiated?: boolean;
}

export const LockOverlay: React.FC<LockOverlayProps> = ({
  isUnowned,

  isCovered,
  canCraft,
  craftCost,
  onCraft,
  craftingInitiated,
}) => {
  const { t } = useTranslation();
  
  if (!isUnowned || isCovered || !onCraft || !craftCost) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 bg-black/30 rounded-2xl"
    >
      <div className="bg-[#0b0b18]/95 border-2 border-white/20 p-6 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col items-center text-center max-w-[240px] select-none">
        <span className="text-3xl mb-2.5 block">🔒</span>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">{t('eurocollection.lockedCard')}</h3>
        <p className="text-[9px] text-slate-400 font-bold mt-1.5 uppercase leading-normal mb-5">
          {canCraft ? t('eurocollection.readyToCraft') : t('eurocollection.insufficientConfetti')}
        </p>
        
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onCraft(); 
          }}
          disabled={!canCraft || craftingInitiated}
          className={`w-full py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            canCraft && !craftingInitiated
              ? 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-500/25 cursor-pointer' 
              : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
          }`}
        >
          <span>{t('eurocollection.craftCard')}</span>
          <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[9px] ${canCraft ? 'bg-black/25 text-white' : 'bg-black/10 text-slate-500'}`}>
            <PartyPopper className="w-3 h-3 text-pink-400" /> {craftCost}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
