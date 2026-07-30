import React from 'react';
import { CardRarity, MasterSong } from '../../data/types';
import { getCountryFlag, getCountryFlagUrl } from '../../utils/flags';

interface FolderCardProps {
  folder: { key: string; collected: number; total: number };
  groupBy: 'rarity' | 'year' | 'country' | 'placing';
  masterData: MasterSong[];
  onSelectFolder: (key: string) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  groupBy,
  masterData,
  onSelectFolder,
}) => {
  const percent = folder.total > 0 ? (folder.collected / folder.total) * 100 : 0;
  let flagUrl: string | null = null;
  let flagEmoji = '';

  if (groupBy === 'country') {
    flagUrl = getCountryFlagUrl(folder.key);
    flagEmoji = getCountryFlag(folder.key);
  } else if (groupBy === 'year') {
    let countryName = '';
    if (folder.key === '1956') {
      countryName = 'Switzerland';
    } else {
      let targetYear = parseInt(folder.key) - 1;
      if (targetYear === 2020) targetYear = 2019;
      const prevWinner = masterData.find(s => s.year === targetYear && s.placing === 1);
      if (prevWinner) {
        countryName = prevWinner.country;
      }
    }
    if (countryName) {
      flagUrl = getCountryFlagUrl(countryName);
      flagEmoji = getCountryFlag(countryName);
    }
  }

  const getRarityClass = (opacityClass: string) => {
    if (groupBy !== 'rarity') return 'bg-transparent';
    switch (folder.key) {
      case CardRarity.LEGENDARY:
        return `bg-yellow-500/${opacityClass} ${opacityClass === '80' ? 'shadow-[0_0_30px_rgba(234,179,8,0.5)]' : ''}`;
      case CardRarity.RARE:
        return `bg-blue-500/${opacityClass} ${opacityClass === '80' ? 'shadow-[0_0_30px_rgba(59,130,246,0.5)]' : ''}`;
      case CardRarity.UNCOMMON:
        return `bg-green-500/${opacityClass} ${opacityClass === '80' ? 'shadow-[0_0_30px_rgba(34,197,94,0.5)]' : ''}`;
      default:
        return `bg-slate-500/${opacityClass} ${opacityClass === '80' ? 'shadow-[0_0_30px_rgba(100,116,139,0.5)]' : ''}`;
    }
  };

  const getTitleStyle = () => {
    const text = folder.key;
    if (groupBy === 'year') {
      return 'text-2xl sm:text-3xl md:text-4xl font-black';
    }

    const words = text.split(' ');
    const maxWordLen = Math.max(...words.map(w => w.length));
    const totalLen = text.length;

    if (maxWordLen >= 11 || totalLen >= 18) {
      return 'text-[11px] sm:text-xs md:text-sm lg:text-base font-black leading-tight uppercase tracking-tight';
    }
    if (maxWordLen >= 10 || totalLen >= 13) {
      return 'text-xs sm:text-sm md:text-sm lg:text-base font-black leading-tight uppercase tracking-tight';
    }
    if (maxWordLen >= 8 || totalLen >= 9) {
      return 'text-xs sm:text-sm md:text-base lg:text-lg font-black leading-tight uppercase tracking-tight';
    }
    if (totalLen >= 6) {
      return 'text-sm sm:text-base md:text-lg lg:text-xl font-black leading-tight uppercase tracking-tight';
    }
    return 'text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight';
  };

  return (
    <button 
      onClick={() => onSelectFolder(folder.key)}
      className="relative overflow-hidden rounded-2xl bg-slate-800 border border-white/10 hover:border-indigo-500/50 hover:scale-[1.03] transition-all text-left group aspect-[4/3] w-full cursor-pointer"
    >
      {/* Procedural Texture Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay z-20 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 grayscale-[0.5] brightness-90">
        {flagUrl ? (
          <img src={flagUrl} alt="" className="w-28 sm:w-36 h-auto max-h-24 object-contain drop-shadow-xl rounded" />
        ) : flagEmoji ? (
          <span className="text-[100px] sm:text-[120px] leading-none">{flagEmoji}</span>
        ) : (
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center ${getRarityClass('50')}`}>
            <img src="/favicon.svg" alt="" className="w-20 h-20 sm:w-24 sm:h-24 opacity-50 grayscale" />
          </div>
        )}
      </div>
      
      {/* Active Progress Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 transition-all bg-gradient-to-r from-fuchsia-500/30 via-purple-500/30 to-indigo-500/30"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        {flagUrl ? (
          <img src={flagUrl} alt="" className="w-28 sm:w-36 h-auto max-h-24 object-contain drop-shadow-xl rounded saturate-150" />
        ) : flagEmoji ? (
          <span className="text-[100px] sm:text-[120px] leading-none">{flagEmoji}</span>
        ) : (
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center ${getRarityClass('80')}`}>
            <img src="/favicon.svg" alt="" className={`w-20 h-20 sm:w-24 sm:h-24 ${groupBy === 'rarity' ? 'brightness-200' : ''}`} />
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 pointer-events-none" />
      <div className="relative p-3 sm:p-4 z-10 flex flex-col items-center justify-center text-center gap-1.5 h-full bg-black/30 max-w-full overflow-hidden">
        <span className={`text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-full break-normal [word-break:keep-all] text-center px-1 ${getTitleStyle()}`}>
          {folder.key}
        </span>
        <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md px-3 py-1 rounded-xl text-indigo-300 border border-white/5 shrink-0">
          {folder.collected} / {folder.total}
        </span>
      </div>
    </button>
  );
};
