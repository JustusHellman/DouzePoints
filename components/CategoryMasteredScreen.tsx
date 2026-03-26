import React, { useRef, useLayoutEffect } from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

interface CategoryMasteredScreenProps {
  onPlayAgain: () => void;
  onReturn: () => void;
  onShare?: () => void;
  styles?: {
    bg: string;
    text: string;
    glow: string;
  };
}

export const CategoryMasteredScreen: React.FC<CategoryMasteredScreenProps> = ({
  onPlayAgain,
  onReturn,
  onShare,
  styles
}) => {
  const { t } = useTranslation();
  const [showCopied, setShowCopied] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Extract base color name from glow class (e.g., "bg-emerald-500" -> "emerald")
  const colorName = styles?.glow.replace('bg-', '').split('-')[0] || 'amber';

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const updateScale = () => {
      requestAnimationFrame(() => {
        if (!container || !text) return;
        
        // Reset scale to measure natural size
        text.style.transform = 'scale(1)';
        
        // Use offsetWidth for more reliable measurement
        const containerWidth = container.offsetWidth - 24; // 12px safety margin each side
        const textWidth = text.offsetWidth;

        if (textWidth > containerWidth && containerWidth > 0) {
          // Scale down to fit exactly within the container width
          const scale = containerWidth / textWidth;
          text.style.transform = `scale(${scale})`;
          text.style.transformOrigin = 'center center';
        } else {
          text.style.transform = 'scale(1)';
        }
      });
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    window.addEventListener('resize', updateScale);
    updateScale();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 w-full max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-700">
      <div className="relative w-full p-0 rounded-3xl overflow-hidden mb-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        {/* Smooth animated border - perfectly overlapping the card area */}
        <div className="absolute inset-[-4px] rounded-3xl overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square animate-[spin_10s_linear_infinite] opacity-60 blur-2xl"
            style={{
              background: `conic-gradient(from 0deg, 
                var(--color-${colorName}-400), 
                var(--color-amber-400), 
                var(--color-${colorName}-600), 
                var(--color-pink-500), 
                var(--color-${colorName}-500), 
                var(--color-blue-500), 
                var(--color-${colorName}-400))`
            }}
          ></div>
        </div>
        
        <div className={`relative z-10 ${styles?.bg || 'bg-black/90'} backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-6 h-full w-full border-2 border-white/10`}>
          <div className={`absolute -top-24 -right-24 w-48 h-48 ${styles?.glow || 'bg-amber-500'} rounded-full blur-[80px] opacity-20`}></div>
          <div className={`absolute -bottom-24 -left-24 w-48 h-48 ${styles?.glow || 'bg-amber-500'} rounded-full blur-[80px] opacity-20`}></div>

          <div ref={containerRef} className="w-full flex justify-center overflow-hidden min-w-0">
            <h2 
              ref={textRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white uppercase tracking-tighter italic drop-shadow-lg whitespace-nowrap relative z-10 px-4 text-center flex-shrink-0 block w-max"
            >
              {t('infinite.congratulations')}
            </h2>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-[0.2em] leading-relaxed max-w-md mx-auto relative z-10 opacity-90">
            {t('infinite.allSongsFinished')}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {onShare && (
          <button 
            onClick={() => {
              onShare();
              setShowCopied(true);
              setTimeout(() => setShowCopied(false), 2000);
            }}
            className="w-full bg-white text-black hover:bg-gray-200 py-4 px-6 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            {showCopied ? t('scorecard.resultsCopied') : t('scorecard.shareResult')}
          </button>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button 
            onClick={onPlayAgain}
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-4 px-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            {t('infinite.playAgain')}
          </button>
          
          <button 
            onClick={onReturn}
            className="flex-1 bg-white/10 text-white border border-white/20 py-4 px-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {t('infinite.exitToEncore')}
          </button>
        </div>
      </div>
    </div>
  );
};
