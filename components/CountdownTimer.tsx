import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC<{ label?: string }> = ({ label }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    const diff = tomorrow.getTime() - now.getTime();

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      {label && <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.3em]">{label}</span>}
      <div className="font-mono text-xl md:text-2xl font-black text-white tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
        {timeLeft}
      </div>
    </div>
  );
};
