import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PartyPopper } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { CardRarity } from '../../data/types';
import { soundManager } from '../../utils/sounds';

export interface GridPiece {
  id: number;
  row: number;
  col: number;
  targetX: number;
  targetY: number;
  targetRotate: number;
  duration: number;
  targetScale?: number;
  delay: number;
  color?: string;
}

export interface LocalParticle {
  id: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  delay: number;
  rotation: number;
  duration: number;
  targetScale?: number;
}

const cardColorMap = {
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

interface useTearAnimationProps {
  flipped: boolean;
  isDuplicate?: boolean;
  actualRarity: CardRarity;
}

export const useTearAnimation = ({
  flipped,
  isDuplicate,
  actualRarity,
}: useTearAnimationProps) => {
  const [isTorn, setIsTorn] = useState(false);
  const [isTearing, setIsTearing] = useState(false);
  const [localParticles, setLocalParticles] = useState<LocalParticle[]>([]);
  const [gridPieces, setGridPieces] = useState<GridPiece[]>([]);

  useEffect(() => {
    if (!flipped && isDuplicate) {
      const timer1 = setTimeout(() => {
        setIsTearing(true);
        soundManager.play('confetti');
        
        const cardPrimaryColor = cardColorMap[actualRarity] || '#cbd5e1';
        const cols = 7;
        const rows = 7;
        const pieces: GridPiece[] = [];
        
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const id = r * cols + c;
            const dirX = (c - (cols - 1) / 2) / ((cols - 1) / 2 || 1);
            const waveDelay = (r * 0.05) + (Math.abs(c - (cols - 1) / 2) * 0.02);
            const color = Math.random() < 0.5 ? cardPrimaryColor : generalColors[Math.floor(Math.random() * generalColors.length)];
            
            pieces.push({
              id,
              row: r,
              col: c,
              targetX: dirX * 60 + (Math.random() - 0.5) * 30,
              targetY: 80 + r * 20 + Math.random() * 80,
              targetRotate: (Math.random() - 0.5) * 360,
              duration: 1.8 + Math.random() * 0.6,
              delay: waveDelay + Math.random() * 0.1,
              color,
            });
          }
        }
        setGridPieces(pieces);

        const newParticles = Array.from({ length: 85 }).map((_, idx) => {
          const color = Math.random() < 0.5 ? cardPrimaryColor : generalColors[Math.floor(Math.random() * generalColors.length)];
          return {
            id: idx,
            size: 4 + Math.random() * 8,
            color,
            angle: Math.PI / 2 + (Math.random() - 0.5) * Math.PI,
            speed: 30 + Math.random() * 120,
            delay: Math.random() * 0.5,
            rotation: (Math.random() - 0.5) * 720,
            duration: 1.5 + Math.random() * 1.0,
          };
        });
        setLocalParticles(newParticles);
      }, 200);

      const timer2 = setTimeout(() => {
        setIsTorn(true);
        setIsTearing(false);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [flipped, isDuplicate, actualRarity]);

  return { isTorn, isTearing, localParticles, gridPieces };
};

interface TearOverlayProps {
  isTorn: boolean;
  isTearing: boolean;
  confettiValue?: number;
}

export const TearOverlay: React.FC<TearOverlayProps> = ({
  isTorn,
  isTearing,
  confettiValue = 10,
}) => {
  const { t } = useTranslation();
  if (isTorn) {
    return (
      <div className="w-full h-full rounded-[10px] p-3 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1b1b36] to-[#0c0c1a] border-2 border-dashed border-pink-500/40 text-center overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-indigo-500/5 to-transparent animate-pulse animate-[pulse_3s_infinite]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-2">
            <PartyPopper className="w-8 h-8 text-pink-500 animate-bounce drop-shadow-[0_2px_8px_rgba(219,39,119,0.5)]" />
          </div>
          <h5 className="text-[8px] font-black tracking-[0.2em] text-pink-500 uppercase mb-0.5">
            {t("eurocollection.duplicate")}
          </h5>
          <div className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 tracking-tighter mb-0.5 filter drop-shadow-md">
            +{confettiValue}  {t("eurocollection.confetti")}
          </div>
          <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest leading-normal max-w-[100px] mx-auto">
            {t("eurocollection.converted")}
          </p>
        </div>
      </div>
    );
  }

  if (isTearing) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full rounded-[10px] p-3 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1b1b36] to-[#0c0c1a] border-2 border-dashed border-pink-500/40 text-center overflow-hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-indigo-500/5 to-transparent animate-pulse animate-[pulse_3s_infinite]" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-2">
              <PartyPopper className="w-8 h-8 text-pink-500 animate-bounce drop-shadow-[0_2px_8px_rgba(219,39,119,0.5)]" />
            </div>
            <h5 className="text-[8px] font-black tracking-[0.2em] text-pink-500 uppercase mb-0.5">
              {t("eurocollection.duplicate")}
            </h5>
            <div className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 tracking-tighter mb-0.5 filter drop-shadow-md">
              +{confettiValue}  {t("eurocollection.confetti")}
            </div>
            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest leading-normal max-w-[100px] mx-auto">
              {t("eurocollection.converted")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

interface TearingParticlesProps {
  isTearing: boolean;
  gridPieces: GridPiece[];
  localParticles: LocalParticle[];
}

export const TearingParticles: React.FC<TearingParticlesProps> = ({
  isTearing,
  gridPieces,
  localParticles,
}) => {
  if (!isTearing) return null;

  return (
    <div className="absolute inset-0 overflow-visible rounded-xl pointer-events-none z-20">
      {gridPieces.map((p) => {
        const cols = 7;
        const rows = 7;
        const left = p.col * (100 / cols);
        const top = p.row * (100 / rows);
        const width = 100 / cols;
        const height = 100 / rows;
        
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-sm border border-white/10"
            style={{ 
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
              backgroundColor: p.color 
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              x: p.targetX, 
              y: p.targetY, 
              rotate: p.targetRotate,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 0.8, 0.2]
            }}
            transition={{ 
              duration: p.duration, 
              ease: "easeOut",
              delay: p.delay,
              times: [0, 0.1, 0.8, 1]
            }}
          />
        );
      })}
      
      {localParticles.map((p) => {
        const targetX = Math.cos(p.angle) * p.speed;
        const targetY = Math.sin(p.angle) * p.speed + 100;
        return (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-sm"
            style={{
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              rotate: p.rotation,
              opacity: 0,
              scale: 0.2
            }}
            transition={{ 
              duration: p.duration, 
              ease: "easeOut",
              delay: p.delay
            }}
          />
        );
      })}
    </div>
  );
};
