import React, { useEffect, useRef } from 'react';
import { AD_KEYS } from '../data/adConstants.ts';

interface NativeAdProps {
  className?: string;
}

export const NativeAd: React.FC<NativeAdProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    const checkConsentAndLoad = () => {
      if (isDev) return;

      const consentStr = localStorage.getItem('eu_cookie_consent_v1');
      let personalized = false;

      if (consentStr) {
        try {
          const consent = JSON.parse(consentStr);
          personalized = !!consent.personalized;
        } catch (e) {
          console.error('Error parsing cookie consent', e);
        }
      }

      if (!personalized) {
        if (containerRef.current) containerRef.current.innerHTML = '';
        return;
      }

      if (containerRef.current) {
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
    window.addEventListener('storage', checkConsentAndLoad);
    return () => window.removeEventListener('storage', checkConsentAndLoad);
  }, [isDev]);

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