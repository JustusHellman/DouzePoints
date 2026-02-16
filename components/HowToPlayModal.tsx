import React from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  rules: string;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose, title, rules }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[500] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border-t-cyan-500/30 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 z-10 hover:bg-white/5 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-1.5 block">How to play</span>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">
            {title}
          </h2>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/5 mb-8">
          <p className="text-sm text-gray-300 font-medium leading-relaxed whitespace-pre-wrap tracking-tight">
            {rules}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-white text-black py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {t('common.close')}
        </button>
      </div>
    </div>
  );
};