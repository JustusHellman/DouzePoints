import React, { useRef } from 'react';
import { useInView } from 'motion/react';
import { EuroCard, MasterSong } from '../../data/types';
import { EuroCollectionCard } from '../EuroCollectionCard';

interface VirtualCardWrapperProps {
  item: { card: EuroCard | null; song: MasterSong; isUnowned: boolean };
  layoutIdPrefix?: string;
  onCraft: (id: string, cost: number) => void;
  craftCost: number;
  canCraft: boolean;
  onExpandedChange: (expanded: boolean) => void;
  isExpanded: boolean;
}

export const VirtualCardWrapper: React.FC<VirtualCardWrapperProps> = ({
  item,
  layoutIdPrefix,
  onCraft,
  craftCost,
  canCraft,
  onExpandedChange,
  isExpanded,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Pre-load cards 1500px before they enter viewport and dynamically unmount them when they scroll far out
  // of the viewport to release device memory, prevent DOM bloat, and stop rendering-lag.
  const isInView = useInView(ref, { margin: "1500px 0px" });
  
  return (
    <div ref={ref} className="w-full h-full aspect-[3/4]">
      {isInView || isExpanded ? (
        <EuroCollectionCard 
          layoutIdPrefix={layoutIdPrefix} 
          card={item.card || { obtainedAt: 0,   }} 
          song={item.song} 
          isUnowned={item.isUnowned}
          onCraft={() => onCraft(item.song.id, craftCost)}
          craftCost={craftCost}
          canCraft={canCraft}
          onExpandedChange={onExpandedChange}
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-white/5 shadow-inner aspect-[3/4]" />
      )}
    </div>
  );
};
