import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../context/LanguageContext.tsx';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  rules: string;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose, title, rules }) => {
  const { t } = useTranslation();

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto overflow-x-hidden overscroll-contain animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 max-w-sm w-full relative shadow-3xl border-t-cyan-500/30 overflow-y-auto overflow-x-hidden max-h-[85vh] scrollbar-hide my-auto animate-in zoom-in-95 duration-200">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors p-2 z-10 hover:bg-white/5 rounded-full cursor-pointer"
          aria-label={t('common.close')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="mb-5 pr-8">
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-1.5 block">How to play</span>
          <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white leading-tight break-words">
            {title}
          </h2>
        </div>

        <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/5 mb-6 overflow-hidden">
          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed whitespace-pre-wrap break-words tracking-tight">
            {rules}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-white text-black py-3.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          {t('common.close')}
        </button>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
