import React, { useEffect, useState } from 'react';
import { AD_KEYS } from '../data/adConstants.ts';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ adKey, width, height, className }) => {
  const isDev = import.meta.env.DEV;
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consentStr = localStorage.getItem('eu_cookie_consent_v1');
      if (consentStr) {
        try {
          const consent = JSON.parse(consentStr);
          setHasConsent(!!consent.personalized);
        } catch (e) {
          console.error('Error parsing cookie consent', e);
        }
      } else {
        setHasConsent(false);
      }
    };

    checkConsent();
    window.addEventListener('storage', checkConsent);
    return () => window.removeEventListener('storage', checkConsent);
  }, []);

  const getAdLabel = () => {
    const key = Object.keys(AD_KEYS).find(k => (AD_KEYS as Record<string, string>)[k] === adKey);
    return key ? key.replace(/_/g, ' ') : 'Sponsor Slot';
  };

  if (!isDev && !hasConsent) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center overflow-hidden ${className} ${isDev ? 'bg-white/5 border-2 border-dashed border-white/20 rounded-xl' : ''}`}
      style={{ minWidth: isDev ? `${width}px` : 'auto', minHeight: isDev ? `${height}px` : 'auto' }}
    >
      {isDev ? (
        <div className="flex flex-col items-center gap-1 opacity-40 text-center px-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{getAdLabel()}</span>
          <span className="text-[8px] sm:text-[10px] font-mono">{width}x{height}</span>
        </div>
      ) : (
        <iframe
          src={`/ad.html?key=${adKey}&width=${width}&height=${height}`}
          width={width}
          height={height}
          style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
          scrolling="no"
          title={`Ad ${width}x${height}`}
        />
      )}
    </div>
  );
};