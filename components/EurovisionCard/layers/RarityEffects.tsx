import { CardRarity } from '../../../data/types';
import React, { useState } from 'react';

const SparkleIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 1.5C12 1.5 13.5 10.5 22.5 12C13.5 13.5 12 22.5 12 22.5C12 22.5 10.5 13.5 1.5 12C10.5 10.5 12 1.5 12 1.5Z" />
  </svg>
);

const AnimatedSparkle = ({ id, delay, duration }: { id: number, delay: number, duration: number }) => {
  const [pos, setPos] = useState(() => ({
    top: 10 + Math.random() * 70,
    left: 10 + Math.random() * 70,
    size: 1 + Math.random() * 1.5,
    rotation: -30 + Math.random() * 60,
  }));

  const color = id % 2 === 0 ? 'text-blue-300' : 'text-indigo-200';
  const shadowColor = id % 2 === 0 ? 'rgba(59,130,246,1)' : 'rgba(99,102,241,1)';

  return (
    <div 
      className={`absolute ${color} mix-blend-screen pointer-events-none z-20`}
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        width: `${pos.size}rem`,
        height: `${pos.size}rem`,
        transform: `rotate(${pos.rotation}deg)`,
        animation: `sparkle-pulse-random ${duration}s ease-in-out ${delay}s infinite`
      }}
      onAnimationIteration={() => {
        setPos({
          top: 10 + Math.random() * 70,
          left: 10 + Math.random() * 70,
          size: 1 + Math.random() * 1.5,
          rotation: -30 + Math.random() * 60,
        });
      }}
    >
      <SparkleIcon className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${pos.size * 3}px ${shadowColor})` }} />
    </div>
  );
};

export function RarityEffects({ rarity, isMini, isUnowned = false }: { rarity: CardRarity, isMini?: boolean, isUnowned?: boolean }) {
  switch (rarity) {
    case 'Legendary':
      if (isUnowned) {
        return (
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-amber-400/50 pointer-events-none shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]" />
        );
      }
      if (isMini) {
        return (
          <>
            <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-amber-400 pointer-events-none shadow-[inset_0_0_30px_rgba(245,158,11,0.4)]" />
            <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem] bg-gradient-to-tr from-amber-500/10 via-transparent to-amber-300/10" />
          </>
        );
      }
      return (
        <>
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-amber-400 pointer-events-none shadow-[inset_0_0_50px_rgba(245,158,11,0.6),0_0_20px_rgba(245,158,11,0.4)]" />
          <div className="absolute inset-0 z-20 rounded-[1.5rem] pointer-events-none foil-overlay opacity-100 mix-blend-color-dodge" />
          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-70 animate-pulse" />
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem] overflow-hidden">
             <div className="w-full h-full legendary-shimmer" />
          </div>
        </>
      );
    case 'Rare':
      if (isUnowned) {
        return (
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-blue-500/50 pointer-events-none shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]" />
        );
      }
      if (isMini) {
        return (
          <>
            <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-blue-500 pointer-events-none shadow-[inset_0_0_20px_rgba(59,130,246,0.3)]" />
            <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem] bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-700/10" />
          </>
        );
      }
      return (
        <>
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-blue-500 pointer-events-none shadow-[inset_0_0_30px_rgba(59,130,246,0.4),0_0_15px_rgba(59,130,246,0.3)]" />
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem] overflow-hidden mix-blend-screen opacity-35 bg-gradient-to-tr from-blue-500 via-transparent to-indigo-700" />
          
          <AnimatedSparkle id={0} delay={0} duration={2.5} />
          <AnimatedSparkle id={1} delay={0.8} duration={3} />
          <AnimatedSparkle id={2} delay={1.6} duration={2.2} />

          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-color-dodge bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 animate-[pulse_4s_ease-in-out_infinite]" />
        </>
      );
    case 'Uncommon':
      if (isUnowned) {
        return (
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-emerald-400/50 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)] pointer-events-none" />
        );
      }
      return (
        <>
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[2px] border-emerald-400 shadow-[inset_0_0_30px_rgba(16,185,129,0.4),0_0_10px_rgba(16,185,129,0.2)] pointer-events-none" />
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem] overflow-hidden mix-blend-screen opacity-40 bg-gradient-to-t from-emerald-500/30 to-transparent" />
          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.1]" />
        </>
      );
    case 'Common':
    default:
      if (isUnowned) {
        return (
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[1.5px] border-slate-300/30 shadow-[inset_0_0_10px_rgba(148,163,184,0.05)] pointer-events-none" />
        );
      }
      return (
        <>
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border-[1.5px] border-slate-300 shadow-[inset_0_0_15px_rgba(148,163,184,0.15)] pointer-events-none" />
          <div className="absolute inset-0 z-45 rounded-[1.5rem] border border-white/5 pointer-events-none grayscale opacity-50" />
        </>
      );
  }
}
