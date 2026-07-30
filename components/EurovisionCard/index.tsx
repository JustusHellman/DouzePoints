import { CardData } from '../../data/types';
import { CountryArtwork } from './layers/CountryArtwork';
import { GradientOverlay } from './layers/GradientOverlay';
import { EraOverlay } from './layers/EraOverlay';
import { Watermark } from './layers/Watermark';
import { RarityEffects } from './layers/RarityEffects';
import { CardContent } from './layers/CardContent';
import { useState, useRef, useLayoutEffect } from 'react';

export function EurovisionCard({ 
  data, 
  isMini = false, 
  isUnowned = false, 
  disableHoverScale = false,
  className = "w-full max-w-[400px] rounded-[1.5rem]" 
}: { 
  data: CardData; 
  isMini?: boolean; 
  isUnowned?: boolean; 
  disableHoverScale?: boolean;
  className?: string; 
}) {
  return (
    <div className={`@container relative aspect-[5/7] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] isolate bg-[#050514] select-none transition-transform duration-200 ease-out group ${!isMini && !disableHoverScale ? 'hover:scale-[1.02]' : ''} ${className}`}>
      <CountryArtwork src={data.imageUrl} />
      <GradientOverlay />
      <EraOverlay era={data.era} isMini={isMini} />
      <Watermark symbol={data.watermark} isMini={isMini} />
      <RarityEffects rarity={data.rarity} isMini={isMini} isUnowned={isUnowned} />
      <CardContent data={data} isMini={isMini} />
    </div>
  );
}

export function ExpandedEurovisionCard({ data, isUnowned = false }: { data: CardData; isUnowned?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  useLayoutEffect(() => {
    let animationFrameId: number;
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || containerRef.current.getBoundingClientRect().width;
      if (width > 0) {
        // We use a virtual size of 512x716 to trigger the @lg container queries perfectly.
        const newScale = width / 512;
        setScale((prev) => (Math.abs(prev - newScale) > 0.001 ? newScale : prev));
      }
    };
    
    updateScale();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScale);
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full rounded-[1.5rem] overflow-hidden relative shadow-2xl bg-[#050514] isolate">
      <div 
        className="absolute top-0 left-0 origin-top-left w-[512px] h-[716px] will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <EurovisionCard 
          data={data} 
          isMini={false} 
          isUnowned={isUnowned} 
          disableHoverScale={true} 
          className="w-[512px] h-[716px] !rounded-none" 
        />
      </div>
    </div>
  );
}

export function MiniEurovisionCard({ data, isUnowned = false }: { data: CardData; isUnowned?: boolean; key?: string | number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.375);

  useLayoutEffect(() => {
    let animationFrameId: number;
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || containerRef.current.getBoundingClientRect().width;
      if (width > 0) {
        const newScale = width / 400;
        setScale((prev) => (Math.abs(prev - newScale) > 0.001 ? newScale : prev));
      }
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScale);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-[5/7] rounded-[1rem] overflow-hidden relative shadow-xl bg-[#050514] isolate pointer-events-none">
      <div 
        className="absolute top-0 left-0 origin-top-left w-[400px] h-[560px] will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <EurovisionCard data={data} isMini={true} isUnowned={isUnowned} disableHoverScale={true} className="w-[400px] h-[560px] !rounded-none" />
      </div>
    </div>
  );
}
