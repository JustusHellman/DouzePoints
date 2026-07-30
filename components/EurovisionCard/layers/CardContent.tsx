import { Star, Mic, Music, Users, VenetianMask } from 'lucide-react';
import { CardData } from '../../../data/types';
import { AutoText } from '../../AutoText';

export function CardContent({ data, isMini = false }: { data: CardData, isMini?: boolean }) {
  const rarityStyles = {
    Legendary: { color: 'text-amber-950', bg: 'bg-amber-400', icon: 'fill-amber-950 text-amber-950' },
    Rare: { color: 'text-blue-950', bg: 'bg-blue-400', icon: 'fill-blue-950 text-blue-950' },
    Uncommon: { color: 'text-emerald-950', bg: 'bg-emerald-400', icon: 'fill-emerald-950 text-emerald-950' },
    Common: { color: 'text-slate-900', bg: 'bg-slate-300', icon: 'fill-slate-900 text-slate-900' }
  };

  const getFlagUrl = (emoji: string) => {
    if (!emoji) return null;
    const chars = [...emoji];
    if (chars.length >= 2) {
      const cp1 = chars[0].codePointAt(0);
      const cp2 = chars[1].codePointAt(0);
      if (cp1 && cp2 && cp1 >= 0x1F1E6 && cp1 <= 0x1F1FF && cp2 >= 0x1F1E6 && cp2 <= 0x1F1FF) {
        const iso = String.fromCharCode(cp1 - 0x1F1E6 + 97) + String.fromCharCode(cp2 - 0x1F1E6 + 97);
        return `https://flagcdn.com/w160/${iso}.png`;
      }
    }
    return null;
  };

  const rStyle = rarityStyles[data.rarity] || rarityStyles.Common;
  
  return (
    <div className="absolute inset-0 w-full h-full flex flex-col justify-between z-30 text-white font-sans pointer-events-none">
      
      {/* TOP SECTION: Rarity integrated into a top banner/trapezoid */}
      <div className="w-full flex justify-center pointer-events-auto absolute top-0 left-0 right-0 z-40">
        <div className={`relative flex items-center justify-center ${isMini ? 'h-[28px] min-w-[140px] px-6' : 'h-[28px] @sm:h-[32px] @md:h-[36px] min-w-[140px] @sm:min-w-[160px] @md:min-w-[180px] px-6 @sm:px-8'}`}>
          <div 
            className={`absolute inset-0 w-full h-full ${rStyle.bg} opacity-100 shadow-md`}
            style={{ clipPath: 'polygon(0 0, 15% 100%, 85% 100%, 100% 0)' }}
          />
          <div className="relative z-10 flex items-center gap-1.5 pb-0.5">
            <Star className={`w-3 h-3 ${isMini ? '' : '@sm:w-3.5 @sm:h-3.5 @md:w-4 @md:h-4'} ${rStyle.icon}`} />
            <span className={`font-bold tracking-[0.2em] uppercase ${isMini ? 'text-[0.6rem]' : 'text-[0.6rem] @sm:text-[0.68rem] @md:text-xs'} ${rStyle.color}`}>
              {data.rarity}
            </span>
          </div>
        </div>
      </div>

      {/* SOVEREIGN HEADER BAR */}
      <div className={`w-full ${isMini ? 'h-[82px] px-6 pb-3' : 'h-[82px] @sm:h-[96px] @md:h-[110px] @lg:h-[120px] px-6 @sm:px-8 pb-3 @sm:pb-4 @md:pb-5'} bg-slate-950/45 ${isMini ? '' : 'backdrop-blur-md'} border-b border-white/10 flex items-end justify-between pointer-events-auto relative z-35 shadow-[0_4px_25px_rgba(0,0,0,0.4)]`}>
        {/* Left: Country & Year */}
        <div className="flex flex-col justify-end">
          <span className={`font-sans font-black tracking-wider text-slate-100 uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isMini ? 'text-[0.85rem]' : 'text-[0.85rem] @sm:text-base @md:text-xl @lg:text-2xl'}`}>
            {data.country}
          </span>
          <span className={`text-amber-400 font-extrabold tracking-[0.25em] uppercase font-sans leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${isMini ? 'text-[0.55rem] mt-1.5' : 'text-[0.55rem] @sm:text-[0.65rem] @md:text-xs @lg:text-sm mt-1.5 @sm:mt-2'}`}>
            {data.year}
          </span>
        </div>

        {/* Right: Flag Slot */}
        <div className={`relative ${isMini ? 'w-12 h-12 rounded-lg' : 'w-12 h-12 @sm:w-15 @sm:h-15 @md:w-18 @md:h-18 @lg:w-20 @lg:h-20 rounded-lg @sm:rounded-xl'} overflow-hidden border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_2px_8px_rgba(0,0,0,0.3)] shrink-0 flex items-center justify-center bg-black/40 group`}>
          {/* Embedded holographic/metallic blend overlays to remove "sticker" look */}
          {!isMini && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/20 to-transparent pointer-events-none z-20 mix-blend-overlay" />}
          {!isMini && <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none z-20 mix-blend-color-dodge" />}
          {getFlagUrl(data.countryCode) ? (
            <img 
              src={getFlagUrl(data.countryCode)!} 
              loading={isMini ? 'lazy' : undefined}
              decoding={isMini ? 'async' : undefined}
              className={`w-full h-full object-cover ${isMini ? 'opacity-[0.95]' : 'opacity-[0.88] scale-[1.05] transition-transform duration-500 group-hover:scale-110'}`} 
              alt={data.country} 
            />
          ) : (
            <span className="text-2xl font-bold leading-none flex items-center justify-center translate-y-px opacity-[0.88]">{data.countryCode}</span>
          )}
        </div>
      </div>

      {/* SONG NAME & ARTIST & PILLS */}
      <div className={`flex flex-col drop-shadow-xl z-10 w-full pt-1.5 pointer-events-auto ${isMini ? 'px-6 max-w-[320px]' : 'px-6 @sm:px-8 max-w-[320px] @sm:max-w-[400px] @md:max-w-[480px] @lg:max-w-[540px]'}`}>
        <div className={`w-full mb-0 flex flex-col justify-start ${isMini ? 'h-[3.2rem]' : 'h-[3.2rem] @sm:h-[4rem] @md:h-[4.8rem] @lg:h-[5.5rem]'}`}>
          <AutoText 
             text={data.song} 
             maxSize={isMini ? 32 : 44} 
             minSize={12} 
             lines={2}
            className="font-sans tracking-tight font-black text-white leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" 
           />
        </div>
        <div className={`w-full mb-1.5 opacity-85 ${isMini ? 'h-[1.5rem]' : 'h-[1.5rem] @sm:h-[1.8rem] @md:h-[2.2rem]'}`}>
          <AutoText 
             text={data.artist} 
             maxSize={isMini ? 13 : 20} 
             minSize={9} 
             lines={1}
            className="font-sans tracking-tight text-indigo-50 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
           />
        </div>
        <div className="mt-0.5 flex flex-wrap gap-1.5 @sm:gap-2">
          <span className={`flex items-center gap-1 @sm:gap-1.5 text-indigo-100 border border-indigo-400/30 bg-indigo-950/60 rounded-full shadow-md ${isMini ? 'px-2 py-0.5 text-[0.5rem]' : 'px-2 @sm:px-3 py-0.5 @sm:py-1 text-[0.5rem] @sm:text-[0.6rem] @md:text-xs'} ${isMini ? '' : 'backdrop-blur-md'} uppercase font-sans font-bold tracking-[0.2em]`}>
            <Music className={`text-indigo-300 ${isMini ? 'w-2.5 h-2.5' : 'w-2.5 h-2.5 @sm:w-3 @sm:h-3 @md:w-3.5 @md:h-3.5'}`} />
            {data.genre}
          </span>
          <span className={`flex items-center gap-1 @sm:gap-1.5 text-indigo-100 border border-indigo-400/30 bg-indigo-950/60 rounded-full shadow-md ${isMini ? 'px-2 py-0.5 text-[0.5rem]' : 'px-2 @sm:px-3 py-0.5 @sm:py-1 text-[0.5rem] @sm:text-[0.6rem] @md:text-xs'} ${isMini ? '' : 'backdrop-blur-md'} uppercase font-sans font-bold tracking-[0.2em]`}>
            <Users className={`text-indigo-300 ${isMini ? 'w-2.5 h-2.5' : 'w-2.5 h-2.5 @sm:w-3 @sm:h-3 @md:w-3.5 @md:h-3.5'}`} />
            {data.members}
          </span>
          <span className={`flex items-center gap-1 @sm:gap-1.5 text-indigo-100 border border-indigo-400/30 bg-indigo-950/60 rounded-full shadow-md ${isMini ? 'px-2 py-0.5 text-[0.5rem]' : 'px-2 @sm:px-3 py-0.5 @sm:py-1 text-[0.5rem] @sm:text-[0.6rem] @md:text-xs'} ${isMini ? '' : 'backdrop-blur-md'} uppercase font-sans font-bold tracking-[0.2em]`}>
            <VenetianMask className={`text-indigo-300 ${isMini ? 'w-2.5 h-2.5' : 'w-2.5 h-2.5 @sm:w-3 @sm:h-3 @md:w-3.5 @md:h-3.5'}`} />
            {data.gender}
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {/* BOTTOM SECTION */}
      <div className={`flex flex-col pointer-events-auto w-full ${isMini ? 'px-6 pb-6' : 'px-6 @sm:px-8 pb-6 @sm:pb-8'}`}>
        <div className="flex justify-end w-full mb-2 @sm:mb-3">
          {/* Placement Badge Top Right but positioned lower */}
          <div className={`flex flex-col items-center justify-center rounded-full border border-amber-400/50 bg-gradient-to-br from-slate-900/90 to-amber-950/70 shadow-[0_4px_20px_rgba(245,158,11,0.4)] relative shrink-0 z-40 ${isMini ? 'w-[4.5rem] h-[4.5rem]' : 'w-[4.5rem] h-[4.5rem] @sm:w-[5.5rem] @sm:h-[5.5rem] @md:w-[6.5rem] @md:h-[6.5rem] @lg:w-[7.2rem] @lg:h-[7.2rem]'}`}>
            <div className="absolute inset-0 rounded-full border border-amber-300/20 m-[3px] @sm:m-[4px]" />
            <div className={`w-full mt-1 px-1.5 flex justify-center ${isMini ? 'h-[1.75rem]' : 'h-[1.75rem] @sm:h-[2.2rem] @md:h-[2.6rem] @lg:h-[3rem]'}`}>
              <AutoText 
                text={String(data.placement)}
                maxSize={isMini ? 28 : 42}
                minSize={12}
                lines={1}
                className="font-sans font-black text-amber-300 leading-none drop-shadow-sm text-center"
              />
            </div>
            <span className={`tracking-[0.2em] text-amber-200/70 uppercase font-bold mt-0.5 font-sans ${isMini ? 'text-[0.55rem]' : 'text-[0.55rem] @sm:text-[0.65rem] @md:text-xs'}`}>Place</span>
          </div>
        </div>

        {/* Fun Fact Box */}
        <div className={`relative border border-white/10 bg-black/30 rounded-2xl ${isMini ? 'p-3 pt-1.5 h-[6.5rem]' : 'p-3 @sm:p-4 pt-1.5 @sm:pt-2 h-[6.5rem] @sm:h-[8rem] @md:h-[9.5rem] @lg:h-[10.5rem]'} ${isMini ? '' : 'backdrop-blur-md'} overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.3)]`}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-1.5 mb-1 relative z-10">
            <Star className={`text-amber-400/80 fill-amber-400/80 ${isMini ? 'w-2.5 h-2.5' : 'w-2.5 h-2.5 @sm:w-3 @sm:h-3 @md:w-3.5 @md:h-3.5'}`} />
            <span className={`font-bold tracking-[0.2em] text-amber-300/90 uppercase ${isMini ? 'text-[0.5rem]' : 'text-[0.5rem] @sm:text-[0.6rem] @md:text-xs'}`}>Fun Fact</span>
          </div>
          <div className={`w-full relative z-10 pr-2 flex flex-col justify-start ${isMini ? 'h-[4.5rem]' : 'h-[4.5rem] @sm:h-[5.8rem] @md:h-[7rem] @lg:h-[8rem]'}`}>
            <AutoText 
               text={`"${data.funFact}"`} 
               maxSize={isMini ? 13 : 18} 
               minSize={9} 
               lines={4}
              className="text-indigo-50/80 italic font-medium drop-shadow-sm leading-snug" 
             />
          </div>
          <Mic className={`absolute -right-3 -bottom-5 text-indigo-400/5 rotate-[15deg] transition-transform duration-700 group-hover:rotate-0 ${isMini ? 'w-20 h-20' : 'w-20 h-20 @sm:w-28 @sm:h-28 @md:w-36 @md:h-36'}`} strokeWidth={1} />
        </div>

        {/* Footer Elements (minimal equalizers) */}
        <div className={`flex items-center justify-between text-indigo-300/40 px-2 opacity-70 ${isMini ? 'mt-4' : 'mt-4 @sm:mt-6'}`}>
          <div className={`flex gap-1.5 items-end ${isMini ? 'h-4' : 'h-4 @sm:h-5 @md:h-6'}`}>
            {[2,3,4,3,2].map((h, i) => (
              <div key={i} className="flex flex-col gap-[2px] justify-end">
                {Array.from({length: h}).map((_, j) => (
                  <div key={j} className="w-[3px] @sm:w-[4px] h-[3px] @sm:h-[4px] bg-current rounded-full" />
                ))}
              </div>
            ))}
          </div>
          <div className="w-20 @sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent" />
          <div className={`flex gap-1.5 items-end ${isMini ? 'h-4' : 'h-4 @sm:h-5 @md:h-6'}`}>
            {[2,3,4,3,2].map((h, i) => (
              <div key={i} className="flex flex-col gap-[2px] justify-end">
                {Array.from({length: h}).map((_, j) => (
                  <div key={j} className="w-[3px] @sm:w-[4px] h-[3px] @sm:h-[4px] bg-current rounded-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
