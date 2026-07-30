import { WatermarkSymbol } from '../../../data/types';

export function Watermark({ symbol, isMini = false }: { symbol: WatermarkSymbol; isMini?: boolean }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isMini ? 'opacity-[0.05]' : 'opacity-[0.08] mix-blend-screen'} overflow-hidden z-10`}>
      <span className="text-[28rem] font-black tracking-tighter text-white -rotate-[15deg] leading-none select-none font-display">{symbol}</span>
    </div>
  );
}
