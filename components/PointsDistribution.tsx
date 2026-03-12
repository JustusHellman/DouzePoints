import React from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

interface PointsDistributionProps {
  distribution: number[];
}

export const PointsDistribution: React.FC<PointsDistributionProps> = ({ distribution }) => {
  const { t } = useTranslation();
  const max = Math.max(...distribution, 1);
  const labels = ["12 pts", "10 pts", "8 pts", "6 pts", "4 pts", "2 pts"];
  
  const colors = [
    "bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]", 
    "bg-gradient-to-r from-pink-600 to-pink-400 shadow-[0_0_15px_rgba(219,39,119,0.2)]",   
    "bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.2)]", 
    "bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]",   
    "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.2)]",   
    "bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
  ];

  const textColors = [
    "text-yellow-500",
    "text-pink-400",
    "text-purple-400",
    "text-blue-400",
    "text-cyan-400",
    "text-indigo-400"
  ];
  
  return (
    <div className="mt-4 pt-4 border-t border-white/5 w-full">
      <p className="text-[10px] sm:text-xs font-black uppercase text-gray-500 tracking-[0.3em] mb-4 text-center">{t('stats.scoreHistory')}</p>
      <div className="space-y-2">
        {distribution.map((count, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <span className={`text-[8px] sm:text-[10px] font-black w-10 sm:w-12 text-right transition-colors ${textColors[i]}`}>
              {labels[i]}
            </span>
            <div className="flex-1 bg-white/5 h-5 sm:h-6 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className={`h-full transition-all duration-1000 ease-out flex items-center justify-end px-2 rounded-full ${colors[i]}`}
                style={{ width: `${Math.max((count / max) * 100, count > 0 ? 8 : 0)}%` }}
              >
                {count > 0 && <span className="text-[9px] sm:text-xs font-black text-white">{count}</span>}
              </div>
              {count === 0 && <div className="absolute inset-0 flex items-center justify-center opacity-10"><span className="text-[7px] sm:text-[9px] font-bold">0</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
