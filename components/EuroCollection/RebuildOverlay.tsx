import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CardRarity } from '../../data/types';
import { soundManager } from '../../utils/sounds';
import { LocalParticle } from './TearOverlay';

export interface RebuildPiece {
  id: number;
  row: number;
  col: number;
  startX: number;
  startY: number;
  startRotate: number;
  startScale: number;
  duration: number;
  delay: number;
  color: string;
}

const cardColorMap: Record<CardRarity, string> = {
  [CardRarity.COMMON]: '#cbd5e1',
  [CardRarity.UNCOMMON]: '#10b981',
  [CardRarity.RARE]: '#3b82f6',
  [CardRarity.LEGENDARY]: '#f59e0b',
};

const generalColors = [
  '#db2777', '#ec4899', '#f43f5e', '#6366f1', '#8b5cf6', '#a78bfa',
  '#eab308', '#f59e0b', '#facc15', '#10b981', '#14b8a6', '#34d399',
  '#3b82f6', '#0ea5e9', '#60a5fa', '#cbd5e1', '#f8fafc', '#94a3b8'
];

interface useRebuildAnimationProps {
  actualRarity: CardRarity;
}

export const useRebuildAnimation = ({
  actualRarity,
}: useRebuildAnimationProps) => {
  const [isRebuilding, setIsRebuilding] = useState(false);
  const [isCovered, setIsCovered] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [gridPieces, setGridPieces] = useState<RebuildPiece[]>([]);
  const [localParticles, setLocalParticles] = useState<LocalParticle[]>([]);

  const triggerRebuild = (onCovered: () => void) => {
    soundManager.play('craft');
    setIsRebuilding(true);
    setIsCovered(false);
    setIsFadeOut(false);

    const cardPrimaryColor = cardColorMap[actualRarity] || '#cbd5e1';
    const cols = 7;
    const rows = 7;
    const pieces: RebuildPiece[] = [];

    // Generate grid pieces scattered outwards (reverse wave of destruction)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        const dirX = (c - (cols - 1) / 2) / ((cols - 1) / 2 || 1);
        const waveDelay = ((rows - 1 - r) * 0.03) + (Math.abs(c - (cols - 1) / 2) * 0.015);
        const color = Math.random() < 0.5 ? cardPrimaryColor : generalColors[Math.floor(Math.random() * generalColors.length)];

        pieces.push({
          id,
          row: r,
          col: c,
          startX: dirX * 110 + (Math.random() - 0.5) * 40,
          startY: 130 + r * 18 + Math.random() * 60,
          startRotate: (Math.random() - 0.5) * 360,
          startScale: 0.2 + Math.random() * 0.3,
          duration: 0.60 + Math.random() * 0.15,
          delay: waveDelay + Math.random() * 0.04,
          color,
        });
      }
    }
    setGridPieces(pieces);

    // Burst sparkles flying inwards as pieces assemble
    const particles = Array.from({ length: 60 }).map((_, idx) => {
      const color = Math.random() < 0.5 ? cardPrimaryColor : generalColors[Math.floor(Math.random() * generalColors.length)];
      return {
        id: idx,
        size: 3 + Math.random() * 6,
        color,
        angle: Math.random() * Math.PI * 2,
        speed: 80 + Math.random() * 180,
        delay: Math.random() * 0.3,
        rotation: (Math.random() - 0.5) * 360,
        duration: 0.8 + Math.random() * 0.4,
      };
    });
    setLocalParticles(particles);

    // When ALL pieces reach destination (at 1.0s):
    // 1. Trigger container fade-out for pieces
    // 2. Remove lock overlay instantly at the same time
    setTimeout(() => {
      setIsFadeOut(true);
      setIsCovered(true);
      onCovered();
    }, 1000);

    // Finish rebuilding animation after fade-out finishes
    setTimeout(() => {
      setIsRebuilding(false);
      setIsCovered(false);
      setIsFadeOut(false);
      setGridPieces([]);
      setLocalParticles([]);
    }, 1450);
  };

  return { isRebuilding, isCovered, isFadeOut, gridPieces, localParticles, triggerRebuild };
};

interface RebuildParticlesProps {
  isRebuilding: boolean;
  isFadeOut?: boolean;
  gridPieces: RebuildPiece[];
  localParticles: LocalParticle[];
}

export const RebuildParticles: React.FC<RebuildParticlesProps> = ({
  isRebuilding,
  isFadeOut = false,
  gridPieces,
  localParticles,
}) => {
  if (!isRebuilding) return null;

  return (
    <div className="absolute inset-0 overflow-visible rounded-xl pointer-events-none z-[80]">
      <motion.div 
        className="absolute inset-0"
        animate={{ opacity: isFadeOut ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {gridPieces.map((p) => {
          const cols = 7;
          const rows = 7;
          const left = p.col * (100 / cols);
          const top = p.row * (100 / rows);
          const width = 100 / cols;
          const height = 100 / rows;

          return (
            <motion.div
              key={`piece-${p.id}`}
              className="absolute rounded-sm border border-white/20 shadow-md"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
                backgroundColor: p.color,
              }}
              initial={{
                x: p.startX,
                y: p.startY,
                rotate: p.startRotate,
                scale: p.startScale,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.15, 1],
              }}
            />
          );
        })}
      </motion.div>

      {localParticles.map((p) => {
        const startX = Math.cos(p.angle) * p.speed;
        const startY = Math.sin(p.angle) * p.speed;
        return (
          <motion.div
            key={`p-${p.id}`}
            className="absolute shadow-sm"
            style={{
              left: '50%',
              top: '50%',
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: p.id % 2 === 0 ? '50%' : '2px',
              marginLeft: `-${p.size / 2}px`,
              marginTop: `-${p.size / 2}px`,
            }}
            initial={{
              x: startX,
              y: startY,
              opacity: 0,
              scale: 0.2,
              rotate: p.rotation,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: [0, 1, 0],
              scale: [0.2, 1, 0],
              rotate: 0,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};
