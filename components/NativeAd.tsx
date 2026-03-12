import React, { useEffect, useState } from 'react';
import { AD_KEYS } from '../data/adConstants.ts';

interface NativeAdProps {
  className?: string;
}

export const NativeAd: React.FC<NativeAdProps> = ({ className }) => {
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
    const key = Object.keys(AD_KEYS).find(k => (AD_KEYS as Record<string, string>)[k] === AD_KEYS.NATIVE_BANNER);
    return key ? key.replace(/_/g, ' ') : 'Native Banner';
  };

  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      {isDev ? (
        <div className="w-full max-w-4xl aspect-[4/1] bg-white/5 border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center gap-2 opacity-40">
          <span className="text-xs font-black uppercase tracking-[0.3em]">{getAdLabel()}</span>
          <span className="text-[10px] font-mono italic">Responsive Broadcast Slot</span>
        </div>
      ) : hasConsent ? (
        <iframe
          src={`/native-ad.html?key=${AD_KEYS.NATIVE_BANNER}`}
          className="w-full max-w-4xl aspect-[4/1]"
          style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
          scrolling="no"
          title="Native Ad"
        />
      ) : null}
    </div>
  );
};