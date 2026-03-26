import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { reportPlaytime } from '../utils/firebaseService';

const getCounterKey = (pathname: string): string | null => {
  if (pathname === '/' || pathname === '/index.html') return 'home';
  if (pathname.startsWith('/infinite/euro-song')) return 'eurosong_infinite';
  if (pathname.startsWith('/infinite/euro-artist')) return 'euroartist_infinite';
  if (pathname.startsWith('/infinite/euro-guess')) return 'euroguess_infinite';
  if (pathname.startsWith('/infinite/euro-arena')) return 'euroarena_infinite';
  if (pathname === '/infinite') return 'infinite_menu';
  
  if (pathname.startsWith('/euro-song')) return 'eurosong_daily';
  if (pathname.startsWith('/euro-artist')) return 'euroartist_daily';
  if (pathname.startsWith('/euro-refrain')) return 'eurorefrain_daily';
  if (pathname.startsWith('/euro-links')) return 'eurolinks_daily';
  if (pathname.startsWith('/euro-guess')) return 'euroguess_daily';
  if (pathname.startsWith('/euro-arena')) return 'euroarena_daily';

  if (pathname === '/privacy') return 'privacy';
  if (pathname === '/terms') return 'terms';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/patch-notes') return 'patch_notes';
  if (pathname === '/admin') return null;

  return 'other';
};

export const usePlaytimeTracker = () => {
  const location = useLocation();
  const countersRef = useRef<Record<string, number>>({});
  const lastTickRef = useRef<number>(Date.now());
  const currentKeyRef = useRef<string | null>(getCounterKey(location.pathname));

  useEffect(() => {
    currentKeyRef.current = getCounterKey(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const flush = () => {
      const counters = { ...countersRef.current };
      const hasData = Object.values(counters).some(v => v > 0);
      
      if (hasData) {
        reportPlaytime(counters);
        countersRef.current = {};
      }
    };

    const tick = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const deltaSeconds = Math.floor((now - lastTickRef.current) / 1000);
        
        if (deltaSeconds > 0) {
          const key = currentKeyRef.current;
          if (key) {
            countersRef.current[key] = (countersRef.current[key] || 0) + deltaSeconds;
          }
          lastTickRef.current += deltaSeconds * 1000;
        }

        // Flush every 60 seconds of accumulated time across all counters
        const totalAccumulated = Object.values(countersRef.current).reduce((a, b) => a + b, 0);
        if (totalAccumulated >= 60) {
          flush();
        }
      } else {
        lastTickRef.current = Date.now(); // Reset last tick when hidden so we don't count background time
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        tick(); // Catch up any remaining seconds
        flush();
      } else {
        lastTickRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    interval = setInterval(tick, 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
      flush();
    };
  }, []);
};
