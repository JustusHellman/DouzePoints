import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getCountryFlag } from '../utils/flags';
import { MasterSong, CardRarity, CardData, Era, WatermarkSymbol } from '../data/types';
import { X } from 'lucide-react';
import { EurovisionCard, MiniEurovisionCard, ExpandedEurovisionCard } from './EurovisionCard';
import { createPortal } from 'react-dom';
import { soundManager } from '../utils/sounds';

import { LockOverlay } from './EuroCollection/LockOverlay';
import { useTearAnimation, TearOverlay, TearingParticles } from './EuroCollection/TearOverlay';
import { useRebuildAnimation, RebuildParticles } from './EuroCollection/RebuildOverlay';

interface EuroCollectionCardProps {
  layoutIdPrefix?: string;
  card: { obtainedAt: number; confettiValue?: number; isDuplicate?: boolean; };
  song: MasterSong;
  isNew?: boolean;
  isUnowned?: boolean;
  onCraft?: () => void;
  craftCost?: number;
  canCraft?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

const rarityColors = {
  [CardRarity.COMMON]: 'from-slate-300 to-slate-500 border-slate-300',
  [CardRarity.UNCOMMON]: 'from-emerald-400 to-teal-600 border-emerald-400',
  [CardRarity.RARE]: 'from-blue-500 to-indigo-700 border-blue-500',
  [CardRarity.LEGENDARY]: 'from-yellow-300 via-amber-400 to-orange-500 border-amber-400 bg-[length:200%_200%] animate-border-spin',
};

const mapSongToCardData = (song: MasterSong): CardData => ({
  id: song.id,
  country: song.country,
  countryCode: getCountryFlag(song.country),
  year: song.year,
  artist: song.artist,
  song: song.title,
  placement: song.placing === 100 ? 'SF' : song.placing > 100 ? `#SF${song.placing - 100}` : `#${song.placing}`,
  genre: song.genre,
  members: song.members.toString(),
  gender: song.sex,
  funFact: song.fact,
  rarity: song.rarity || CardRarity.COMMON,
  era: `${Math.floor((song.year % 100) / 10) * 10}`.padStart(2, '0') + 's' as Era,
  imageUrl: `/backgrounds/${song.country.replace(/ & /g, 'And').replace(/\s+/g, '')}-1.webp`,
  watermark: '12' as WatermarkSymbol
});

export const EuroCollectionCard: React.FC<EuroCollectionCardProps & { flipped?: boolean, onClick?: (e?: React.MouseEvent) => void, hideDuplicate?: boolean }> = ({
  layoutIdPrefix = "card",
  card,
  song,
  isNew = false,
  isUnowned: propsIsUnowned = false,
  flipped = false,
  onClick,
  onCraft,
  craftCost,
  canCraft = false,
  onExpandedChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedContainerRef = useRef<HTMLDivElement>(null);
  
  const isUnowned = propsIsUnowned || !card.obtainedAt;
  const actualRarity = song.rarity || CardRarity.COMMON;
  const isDuplicate = false; // (!isUnowned && false && !hideDuplicate) || card.isDuplicate;

  const { isTorn, isTearing, localParticles, gridPieces } = useTearAnimation({
    flipped,
    isDuplicate: card.isDuplicate,
    actualRarity
  });

  const { isRebuilding, isCovered, isFadeOut, gridPieces: rebuildGridPieces, localParticles: rebuildParticles, triggerRebuild } = useRebuildAnimation({
    actualRarity
  });

  const [craftingInitiated, setCraftingInitiated] = useState(false);

  useEffect(() => {
    if (isUnowned) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCraftingInitiated(false);
    }
  }, [isUnowned]);

  const handleCraftClick = () => {
    if (craftingInitiated || !onCraft || !canCraft) return;
    setCraftingInitiated(true);
    triggerRebuild(() => {
      onCraft();
    });
  };

  useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  useEffect(() => {
    if (isExpanded) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        if (expandedContainerRef.current) {
          expandedContainerRef.current.scrollTop = 0;
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsExpanded(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = originalStyle;
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isExpanded]);

  const renderCardContent = (expanded: boolean, forceUnowned?: boolean) => {
    const cardData = mapSongToCardData(song);
    const unownedStatus = forceUnowned !== undefined ? forceUnowned : isUnowned;
    
    if (expanded) {
      return (
        <ExpandedEurovisionCard 
          data={cardData} 
          isUnowned={unownedStatus}
        />
      );
    } else {
      return (
        <div className="w-full h-full relative rounded-xl overflow-hidden">
          <MiniEurovisionCard data={cardData} isUnowned={unownedStatus} />
        </div>
      );
    }
  };

  return (
    <div 
      className="relative aspect-[3/4] group cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          return;
        }
        if (!flipped) {
          soundManager.play('flip');
          setIsExpanded(true);
        }
      }}
    >
      <motion.div
        layoutId={`${layoutIdPrefix}-wrapper-${song.id}`}
        className="w-full h-full relative"
        transition={{ layout: { duration: 0.45, type: "spring", bounce: 0.15 } }}
        style={{ 
          opacity: isExpanded ? 0 : 1,
          pointerEvents: isExpanded ? 'none' : 'auto'
        }}
      >
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
          style={{ 
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {isDuplicate && !flipped && (
            <div className={`absolute inset-0 backface-hidden rounded-xl p-[2px] bg-gradient-to-br ${rarityColors[actualRarity]} shadow-xl rotate-6 translate-x-2 translate-y-1 brightness-75`} style={{ zIndex: -1 }}>
              <div className="w-full h-full rounded-xl bg-[#0f172a] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay z-20 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
              </div>
            </div>
          )}

          {/* Back of the small card (visible before reveal) */}
          <div 
            className={`absolute inset-0 backface-hidden rounded-xl p-[2px] bg-gradient-to-br ${rarityColors[actualRarity]} shadow-xl`}
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: flipped && (actualRarity === CardRarity.UNCOMMON || actualRarity === CardRarity.RARE || actualRarity === CardRarity.LEGENDARY)
                ? `0 0 20px 4px ${
                    actualRarity === CardRarity.LEGENDARY ? 'rgba(245,158,11,0.65)' :
                    actualRarity === CardRarity.RARE ? 'rgba(37,99,235,0.7)' :
                    'rgba(16,185,129,0.6)'
                  }`
                : '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="w-full h-full rounded-xl bg-slate-900 relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay z-20 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
               <span className="text-4xl font-sans font-black italic text-transparent bg-clip-text bg-gradient-to-br from-indigo-500/30 to-pink-500/30 -rotate-12 drop-shadow-lg">12</span>
            </div>
          </div>

          {/* Front */}
          <div 
            className={`absolute inset-0 backface-hidden rounded-xl shadow-xl overflow-hidden transition-all duration-200 ease-out group-hover:scale-[1.025] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_20px_rgba(99,102,241,0.22)] group-hover:ring-1 group-hover:ring-indigo-400/60 ${isUnowned ? 'grayscale opacity-70 shadow-black/50' : ''}`}
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              boxShadow: isNew && (actualRarity === CardRarity.UNCOMMON || actualRarity === CardRarity.RARE || actualRarity === CardRarity.LEGENDARY)
                ? `0 0 20px 4px ${
                    actualRarity === CardRarity.LEGENDARY ? 'rgba(245,158,11,0.65)' :
                    actualRarity === CardRarity.RARE ? 'rgba(37,99,235,0.7)' :
                    'rgba(16,185,129,0.6)'
                  }`
                : undefined
            }}
          >
            {/* Subtle light shimmer overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/0 via-indigo-500/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />
            {isNew && (
              <div className="absolute -top-3 -right-3 z-50 transform rotate-12 drop-shadow-xl">
                <span className="bg-red-500 text-white text-[10px] md:text-xs font-black px-2 py-0.5 md:py-1 rounded-md uppercase tracking-widest border border-red-300 shadow-lg shadow-red-500/50">
                  NEW!
                </span>
              </div>
            )}
            
            <TearOverlay 
              isTorn={isTorn}
              isTearing={isTearing}
              confettiValue={card.confettiValue}
            />

            {!isTorn && (
              <>
                {/* Base Card Content */}
                
                  <motion.div 
                    className="absolute inset-0 z-10"
                    animate={{ opacity: isTearing ? 0 : 1, scale: isTearing ? 0.9 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderCardContent(false)}
                  </motion.div>

                <TearingParticles 
                  isTearing={isTearing}
                  gridPieces={gridPieces}
                  localParticles={localParticles}
                />

                
              </>
            )}
          </div>

          <RebuildParticles 
            isRebuilding={isRebuilding}
            isFadeOut={isFadeOut}
            gridPieces={rebuildGridPieces}
            localParticles={rebuildParticles}
          />
        </motion.div>
      </motion.div>
      
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <div className="fixed inset-0 z-[999]">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/92 backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              />

              {/* Card Container - Click outside closes modal */}
              <div 
                ref={expandedContainerRef}
                className="fixed inset-0 p-4 md:p-8 flex items-center justify-center overflow-y-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.play('click');
                  setIsExpanded(false);
                }}
              >
                <motion.div 
                  className="w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-[640px] xl:max-w-[700px] flex flex-col items-center gap-6 cursor-default" 
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Center stage container */}
                  <div 
                    className="relative w-full"
                    style={{ aspectRatio: '5/7', maxHeight: '85vh', maxWidth: 'calc(85vh * 5 / 7)' }}
                  >
                    <motion.div
                      layoutId={`${layoutIdPrefix}-wrapper-${song.id}`}
                      className="w-full h-full relative"
                      style={{ willChange: 'transform' }}
                      transition={{ layout: { duration: 0.35, type: "spring", bounce: 0.1 } }}
                    >
                      <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden bg-slate-950">
                        <div className="absolute inset-0">
                          {renderCardContent(true)}
                        </div>

                        <LockOverlay 
                          isUnowned={isUnowned}
                          isCovered={isCovered}
                          canCraft={canCraft}
                          craftCost={craftCost}
                          onCraft={handleCraftClick}
                          craftingInitiated={craftingInitiated}
                        />
                      </div>

                      <RebuildParticles 
                        isRebuilding={isRebuilding}
                        isFadeOut={isFadeOut}
                        gridPieces={rebuildGridPieces}
                        localParticles={rebuildParticles}
                      />
                    </motion.div>

                    {/* Close Button */}
                    <motion.button 
                      onClick={(e) => { e.stopPropagation(); soundManager.play('click'); setIsExpanded(false); }}
                      className="absolute -top-4 -right-4 z-[120] w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                      style={{ transform: 'translate3d(0, 0, 110px)' }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
