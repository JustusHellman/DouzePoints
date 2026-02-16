import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext.tsx';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    _adsense_loaded?: boolean;
    adsbygoogle: any[];
  }
}

const CONSENT_KEY = 'eu_cookie_consent_v1';
const PUBLISHER_ID = 'ca-pub-4733458613669560';

export const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  // Check if current page is a policy page where we want to avoid blurring content
  const isPolicyPage = useMemo(() => {
    return location.pathname === '/privacy' || location.pathname === '/cookies';
  }, [location.pathname]);

  const checkConsent = useCallback(() => {
    const existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) {
      setIsVisible(true);
    } else {
      try {
        const consent = JSON.parse(existing);
        setHasConsented(true);
        setIsVisible(false);
        if (consent && consent.personalized === true) {
          updateGoogleConsent(true);
          loadAdSense(true);
        } else {
          updateGoogleConsent(false);
          loadAdSense(false);
        }
      } catch (e) {
        setIsVisible(true);
        setHasConsented(false);
      }
    }
  }, []);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
    }
    
    window.gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });

    checkConsent();

    // Listen for storage changes in case user updates preferences on another tab or via internal trigger
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) checkConsent();
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Custom check for within-tab updates (e.g. from CookiePolicy.tsx)
    const interval = setInterval(() => {
        const existing = localStorage.getItem(CONSENT_KEY);
        if (existing && isVisible) {
            checkConsent();
        }
    }, 1000);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
    };
  }, [checkConsent, isVisible]);

  const updateGoogleConsent = (granted: boolean) => {
    if (!window.gtag) return;
    const value = granted ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      'ad_storage': value,
      'analytics_storage': value,
      'ad_user_data': value,
      'ad_personalization': value
    });
  };

  const loadAdSense = (personalized: boolean) => {
    if (window._adsense_loaded) return;
    
    window.adsbygoogle = window.adsbygoogle || [];
    if (!personalized) {
      (window.adsbygoogle as any).requestNonPersonalizedAds = 1;
    }

    const s = document.createElement('script');
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.setAttribute('data-ad-client', PUBLISHER_ID);
    
    s.onload = () => {
      window._adsense_loaded = true;
    };
    
    document.head.appendChild(s);
  };

  const handleAcceptAll = () => {
    const consent = { personalized: true, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setHasConsented(true);
    updateGoogleConsent(true);
    loadAdSense(true);
  };

  const handleDecline = () => {
    const consent = { personalized: false, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setHasConsented(true);
    updateGoogleConsent(false);
    loadAdSense(false);
  };

  const handleManage = () => {
    navigate('/cookies');
  };

  return (
    <>
      {/* Page Blur Overlay - Only show if not on a policy page */}
      {isVisible && !isPolicyPage && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xl animate-in fade-in duration-1000"
          aria-hidden="true"
        />
      )}

      {/* The main banner - Compact Size Restored */}
      {isVisible && (
        <div id="cookie-banner" className="fixed bottom-0 left-0 right-0 bg-[#0a0a15]/95 backdrop-blur-xl text-white p-4 md:p-5 z-[9999] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10 animate-in slide-in-from-bottom-full duration-700 ease-out fill-mode-forwards">
          <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <div id="cookie-banner-text" className="flex-1 text-[11px] md:text-xs leading-relaxed text-gray-400">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></div>
                <span className="font-black text-white uppercase tracking-widest text-[9px] block">{t('cookies.cookiePolicy')}</span>
              </div>
              <p>
                {t('cookies.bannerText')}{' '}
                <Link to="/cookies" className="text-pink-500 underline decoration-pink-500/30 underline-offset-4 hover:text-pink-400 transition-colors font-bold">
                  {t('cookies.learnMore')}
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none bg-pink-600 hover:bg-pink-500 text-white px-5 py-2.5 rounded-full font-black uppercase text-[9px] tracking-widest transition-all active:scale-95 shadow-lg shadow-pink-600/20"
              >
                {t('cookies.acceptAll')}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-full font-black uppercase text-[9px] tracking-widest transition-all active:scale-95 border border-white/10"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={handleManage}
                className="bg-transparent text-gray-500 px-3 py-2.5 rounded-full font-black uppercase text-[9px] tracking-widest hover:text-white transition-all"
              >
                {t('cookies.manage')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};