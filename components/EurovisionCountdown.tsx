import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';
import { EUROVISION_SCHEDULE, EurovisionShow } from '../config/eurovisionSchedule.ts';

export const EurovisionCountdown: React.FC = () => {
  const { t } = useTranslation();
  
  const getNextShow = (): { show: EurovisionShow | null; status: 'upcoming' | 'live' | 'finished' } => {
    const now = new Date();
    
    // Check if any show is currently live
    const liveShow = EUROVISION_SCHEDULE.find(show => {
      const startTime = new Date(show.startTime);
      const endTime = new Date(show.endTime);
      return now >= startTime && now <= endTime;
    });
    
    if (liveShow) return { show: liveShow, status: 'live' };
    
    // Find the next upcoming show
    const nextShow = EUROVISION_SCHEDULE.find(show => new Date(show.startTime) > now);
    if (nextShow) return { show: nextShow, status: 'upcoming' };
    
    return { show: null, status: 'finished' };
  };

  const [showInfo, setShowInfo] = useState(getNextShow());

  useEffect(() => {
    const timer = setInterval(() => {
      setShowInfo(getNextShow());
    }, 10000); // Check every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const timeLeft = useMemo(() => {
    if (showInfo.status !== 'upcoming' || !showInfo.show) return null;
    
    const now = new Date();
    const startTime = new Date(showInfo.show.startTime);
    const diff = startTime.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return { days, hours, minutes, seconds };
  }, [showInfo]);

  if (showInfo.status === 'finished') {
    return (
      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest opacity-60">
        {t('bingo.countdown.allShowsFinished')}
      </div>
    );
  }

  if (showInfo.status === 'live' && showInfo.show) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full animate-pulse">
        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
          {t('bingo.countdown.isLive').replace('{showName}', showInfo.show.name)}
        </span>
      </div>
    );
  }

  if (showInfo.status === 'upcoming' && showInfo.show && timeLeft) {
    const { days, hours, minutes, seconds } = timeLeft;
    const timeStr = days > 0 
      ? `${days}${t('bingo.countdown.days')} ${hours}${t('bingo.countdown.hours')} ${minutes}${t('bingo.countdown.minutes')}`
      : `${hours}${t('bingo.countdown.hours')} ${minutes}${t('bingo.countdown.minutes')} ${seconds}${t('bingo.countdown.seconds')}`;

    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">
          {t('bingo.countdown.toShow').replace('{showName}', showInfo.show.name)}
        </span>
        <div className="font-mono text-xs md:text-sm font-black text-white tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          {timeStr}
        </div>
      </div>
    );
  }

  return null;
};
