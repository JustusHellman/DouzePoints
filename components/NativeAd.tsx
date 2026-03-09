import React, { useEffect, useRef } from 'react';
import { AD_KEYS } from '../data/adConstants.ts';

interface NativeAdProps {
  className?: string;
}

export const NativeAd: React.FC<NativeAdProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDev = import.meta.env.DEV;
  const [hasPersonalizedConsent, setHasPersonalizedConsent] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    const consentStr = localStorage.getItem('eu_cookie_consent_v1');
    if (!consentStr) return false;
    try {
      const consent = JSON.parse(consentStr);
      return !!consent.personalized;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      const consentStr = localStorage.getItem('eu_cookie_consent_v1');
      if (!consentStr) {
        setHasPersonalizedConsent(false);
        return;
      }
      try {
        const consent = JSON.parse(consentStr);
        setHasPersonalizedConsent(!!consent.personalized);
      } catch {
        setHasPersonalizedConsent(false);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const checkConsentAndLoad = () => {
      if (isDev) return;
      if (!hasPersonalizedConsent) {
        if (containerRef.current) containerRef.current.innerHTML = '';
        return;
      }

      if (containerRef.current) {
        // Clear previous content
        containerRef.current.innerHTML = '';
        
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `//pl28874471.effectivegatecpm.com/${AD_KEYS.NATIVE_BANNER}/invoke.js`;
        
        const adContainer = document.createElement('div');
        adContainer.id = `container-${AD_KEYS.NATIVE_BANNER}`;
        
        containerRef.current.appendChild(script);
        containerRef.current.appendChild(adContainer);
      }
    };

    checkConsentAndLoad();
  }, [isDev, hasPersonalizedConsent]);

  if (!hasPersonalizedConsent) return null;

  return (
    <div className={`w-full flex justify-center py-4 ${className}`} ref={containerRef}>
      {isDev && (
        <div className="w-full max-w-4xl aspect-[4/1] bg-white/5 border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center gap-2 opacity-40">
          <span className="text-xs font-black uppercase tracking-[0.3em]">Native Broadcast Sponsor</span>
          <span className="text-[10px] font-mono italic">Responsive 4:1 Slot</span>
        </div>
      )}
    </div>
  );
};
