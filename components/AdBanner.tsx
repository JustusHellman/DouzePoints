import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ adKey, width, height, className }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
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
        if (bannerRef.current) bannerRef.current.innerHTML = '';
        return;
      }

      if (bannerRef.current) {
        // Clear previous content
        bannerRef.current.innerHTML = '';
        
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
      }
    };

    checkConsentAndLoad();
  }, [adKey, width, height, isDev, hasPersonalizedConsent]);

  if (!hasPersonalizedConsent) return null;

  return (
    <div 
      ref={bannerRef} 
      className={`flex justify-center items-center overflow-hidden ${className} ${isDev ? 'bg-white/5 border-2 border-dashed border-white/20 rounded-xl' : ''}`}
      style={{ minWidth: isDev ? `${width}px` : 'auto', minHeight: isDev ? `${height}px` : 'auto' }}
    >
      {isDev && (
        <div className="flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] font-black uppercase tracking-widest">Sponsor Slot</span>
          <span className="text-[8px] font-mono">{width}x{height}</span>
        </div>
      )}
    </div>
  );
};
