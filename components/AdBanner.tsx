import React, { useEffect, useRef } from 'react';
import { AD_KEYS } from '../data/adConstants.ts';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

let adLoadIndex = 0;

export const AdBanner: React.FC<AdBannerProps> = ({ adKey, width, height, className }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    let isMounted = true;
    const currentIndex = adLoadIndex++;
    
    const checkConsentAndLoad = () => {
      if (isDev || !isMounted) return;

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
        if (bannerRef.current) bannerRef.current.innerHTML = '';
        return;
      }

      if (bannerRef.current) {
        bannerRef.current.innerHTML = '';

        // Stagger the loading slightly to ensure atOptions isn't overwritten 
        // before the previous invoke.js has a chance to read it
        setTimeout(() => {
          if (!isMounted || !bannerRef.current) return;

          const configScript = document.createElement('script');
          configScript.type = 'text/javascript';
          configScript.innerHTML = `
            atOptions = {
              'key' : '${adKey}',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          `;

          const invokeScript = document.createElement('script');
          invokeScript.type = 'text/javascript';
          invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;

          bannerRef.current.appendChild(configScript);
          bannerRef.current.appendChild(invokeScript);
        }, currentIndex * 150); // 150ms stagger
      }
    };

    checkConsentAndLoad();
    window.addEventListener('storage', checkConsentAndLoad);
    
    return () => {
      isMounted = false;
      window.removeEventListener('storage', checkConsentAndLoad);
      // We don't decrement the index to keep the stagger consistent for new mounts
      // but we could reset it if it gets too high
      if (adLoadIndex > 50) adLoadIndex = 0;
    };
  }, [adKey, width, height, isDev]);

  const getAdLabel = () => {
    const key = Object.keys(AD_KEYS).find(k => (AD_KEYS as Record<string, string>)[k] === adKey);
    return key ? key.replace(/_/g, ' ') : 'Sponsor Slot';
  };

  return (
    <div
      ref={bannerRef}
      className={`flex justify-center items-center overflow-hidden ${className} ${isDev ? 'bg-white/5 border-2 border-dashed border-white/20 rounded-xl' : ''}`}
      style={{ minWidth: isDev ? `${width}px` : 'auto', minHeight: isDev ? `${height}px` : 'auto' }}
    >
      {isDev && (
        <div className="flex flex-col items-center gap-1 opacity-40 text-center px-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{getAdLabel()}</span>
          <span className="text-[8px] sm:text-[10px] font-mono">{width}x{height}</span>
        </div>
      )}
    </div>
  );
};