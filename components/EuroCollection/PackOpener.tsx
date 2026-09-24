import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PartyPopper } from 'lucide-react';
import { UserCollection, OpenedCard, MasterSong } from '../../data/types';
import { EuroCollectionCard } from '../EuroCollectionCard';
import { soundManager } from '../../utils/sounds';

interface PackOpenerProps {
  collection: UserCollection;
  opening: boolean;
  currentPack: OpenedCard[];
  revealedIndices: number[];
  songMap: Map<string, MasterSong>;
  getGlowColor: () => string;
  getAnimationDuration: () => number;
  handleOpenPack: (packCount?: number) => void;
  handleClosePack: () => void;
  setRevealedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, params?: Record<string, any>) => string;
}

export const PackOpener: React.FC<PackOpenerProps> = ({
  collection,
  opening,
  currentPack,
  revealedIndices,
  songMap,
  getGlowColor,
  getAnimationDuration,
  handleOpenPack,
  handleClosePack,
  setRevealedIndices,
  t,
}) => {
  const multiPackCount = Math.min(collection.availablePacks, 10);
  const canOpenMulti = collection.availablePacks > 1;

  useEffect(() => {
    if (currentPack.length > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentPack]);

  return (
    <div className={`flex flex-col items-center flex-1 space-y-4 py-2 w-full ${currentPack.length === 0 ? 'justify-center' : 'justify-start'}`}>
      <AnimatePresence mode="wait">
        {currentPack.length === 0 ? (
          <motion.div 
            key="open-pack-view"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full"
          >
          <div className="text-center space-y-3 max-w-md px-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{t('eurocollection.yourPacks')}</h2>
            <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed">
              {t('eurocollection.packsDescription1')} <strong className="text-indigo-400">10 {t('eurocollection.packsDescription2')}</strong>. {t('eurocollection.packsDescription3')}
            </p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.15em] bg-black/40 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md text-amber-400 border border-amber-500/20 px-4 py-2 rounded-xl flex items-center gap-1.5">
              {collection.dailyPacksEarned || 0} / 10 {t('eurocollection.packsEarnedToday')}
            </span>
          </div>

          <div className="relative group cursor-pointer" onClick={() => handleOpenPack(canOpenMulti ? multiPackCount : 1)}>
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full transition-all group-hover:bg-indigo-500/40" />
            <motion.div 
              animate={opening && currentPack.length === 0 ? { 
                scale: [1, 1.05, 1.1, 1.15, 1.5],
                opacity: [1, 1, 1, 1, 0],
                rotate: [0, -2, 2, -4, 4, -6, 6, -8, 8, -4, 4, 0],
              } : {}}
              transition={{ 
                duration: getAnimationDuration(),
                ease: "easeInOut",
              }}
              className={`relative w-56 h-80 md:w-64 md:h-96 rounded-2xl p-1 shadow-2xl ${!opening && collection.availablePacks === 0 ? 'grayscale opacity-50' : ''} transition-all duration-500`}
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
                animate={{ opacity: opening && currentPack.length === 0 ? 0 : 1 }}
                transition={{ duration: getAnimationDuration() * 0.8 }}
              />
              <motion.div 
                className="absolute inset-0 rounded-2xl"
                style={{ backgroundColor: getGlowColor() }}
                animate={{ opacity: opening && currentPack.length === 0 ? 1 : 0 }}
                transition={{ duration: getAnimationDuration() * 0.8 }}
              />
              <div className="w-full h-full bg-[#0b0b18] rounded-[14px] flex flex-col items-center justify-center p-6 relative z-10 overflow-hidden group-hover:bg-[#111122] transition-colors">
                <div className="absolute inset-0 overflow-hidden rounded-[14px] z-10 mix-blend-color-dodge pointer-events-none">
                  <motion.div 
                    className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500 bg-[length:300%_100%]"
                    style={{ 
                      backgroundImage: 'linear-gradient(105deg, transparent 10%, rgba(255,255,255,0.4) 15%, transparent 30%, rgba(129,140,248,0.5) 50%, transparent 70%, rgba(236,72,153,0.5) 85%, transparent 90%)'
                    }}
                    animate={{ backgroundPosition: ['150% 0%', '-50% 0%'] }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(129,140,248,0.15),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -ml-10 -mb-10" />
                
                <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay z-20 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
                
                <div className="relative z-30 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mb-6 rounded-[21px] bg-gradient-to-br from-indigo-950 to-[#0b0b18] border border-white/10 shadow-[0_0_20px_rgba(129,140,248,0.4)]">
                  <span className="text-6xl md:text-[80px] font-sans font-black italic text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-400 -rotate-12 drop-shadow-lg">
                    12
                  </span>
                </div>
                
                <div className="text-sm font-black text-indigo-300 uppercase tracking-[0.3em] mb-2">{t('eurocollection.available')}</div>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 drop-shadow-sm">
                  {collection.availablePacks}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mt-8 w-full max-w-sm px-4">
            {canOpenMulti && (
              <button 
                onClick={() => handleOpenPack(multiPackCount)}
                disabled={opening}
                className={`
                  w-full relative overflow-hidden px-8 py-4 rounded-full font-black text-base md:text-lg uppercase tracking-widest transition-all flex items-center justify-center text-white
                  ${!opening 
                    ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:scale-[1.05] active:scale-95 border-2 border-amber-300 ring-4 ring-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_45px_rgba(245,158,11,0.8)] hover:border-amber-200 cursor-pointer' 
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'}
                `}
              >
                <span>{opening && currentPack.length === 0 ? t('eurocollection.opening') : (t('eurocollection.openXPacks', { count: multiPackCount }) || `Open ${multiPackCount} Packs`)}</span>
              </button>
            )}

            <button 
              onClick={() => handleOpenPack(1)}
              disabled={collection.availablePacks <= 0 || opening}
              className={`
                w-full relative overflow-hidden px-8 py-3.5 rounded-full font-black text-sm md:text-base uppercase tracking-widest transition-all shadow-xl cursor-pointer
                ${collection.availablePacks > 0 && !opening 
                  ? canOpenMulti
                    ? 'bg-gradient-to-r from-indigo-700/80 to-purple-700/80 hover:from-indigo-600 hover:to-purple-600 text-indigo-50 hover:text-white border border-indigo-400/50 hover:border-indigo-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                    : 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:scale-105 hover:shadow-pink-500/30 text-white border border-pink-400/30 py-4 text-base md:text-lg' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'}
              `}
            >
              {opening && currentPack.length === 0 ? t('eurocollection.opening') : t('eurocollection.openPack')}
            </button>
          </div>

          <div className="flex flex-col items-center mt-6 gap-2">
            <span className="text-xs md:text-sm font-semibold text-indigo-200/80 text-center max-w-sm px-4">
              {t('eurocollection.playMoreGames')}
            </span>
          </div>
        </motion.div>
        ) : (
          <motion.div 
            key="opened-cards-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col items-center justify-start py-8 px-2"
          >
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="w-8 h-8 text-pink-500" />
              <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
                {t('eurocollection.newCards')}
              </h3>
              <PartyPopper className="w-8 h-8 text-pink-500" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl perspective-[1000px]">
              {currentPack.map((card, i) => {
                const song = songMap.get(card.songId);
                if (!song) return null;
                const isRevealed = revealedIndices.includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: Math.min(i * 0.02, 0.8), 
                      type: "spring", 
                      stiffness: 150, 
                      damping: 20 
                    }}
                  >
                    <EuroCollectionCard 
                      layoutIdPrefix={`pack-${i}`} 
                      card={card} 
                      song={song} 
                      isNew={false}
                      hideDuplicate={true}
                      flipped={!isRevealed}
                      onClick={!isRevealed ? () => {
                        soundManager.play('flip');
                        setRevealedIndices(prev => [...prev, i]);
                      } : undefined}
                    />
                  </motion.div>
                );
              })}
            </div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(currentPack.length * 0.03 + 0.3, 1.5) }}
              onClick={() => {
                if (revealedIndices.length < currentPack.length) {
                  const allIndices = currentPack.map((_, idx) => idx);
                  soundManager.play('flip');
                  setRevealedIndices(allIndices);
                } else {
                  soundManager.play('success');
                  handleClosePack();
                }
              }}
              className="mt-12 px-12 py-4 bg-white text-[#0b0b18] font-black text-lg uppercase tracking-widest rounded-full hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              {revealedIndices.length < currentPack.length ? t('eurocollection.flipAll') : t('eurocollection.collectAll')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default PackOpener;
