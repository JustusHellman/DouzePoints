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
        } else {
          updateGoogleConsent(false);
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

    // If non-personalized is selected, we let adsbygoogle know
    if (!granted) {
      window.adsbygoogle = window.adsbygoogle || [];
      (window.adsbygoogle as any).requestNonPersonalizedAds = 1;
    }
  };

  const handleAcceptAll = () => {
    const consent = { personalized: true, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setHasConsented(true);
    updateGoogleConsent(true);
  };

  const handleDecline = () => {
    const consent = { personalized: false, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setHasConsented(true);
    updateGoogleConsent(false);
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

      {/* The main banner - Larger for PC */}
      {isVisible && (
        <div id="cookie-banner" className="fixed bottom-0 left-0 right-0 bg-[#0a0a15]/98 backdrop-blur-3xl text-white p-6 md:p-12 z-[9999] shadow-[0_-20px_100px_rgba(0,0,0,0.8)] border-t border-white/20 animate-in slide-in-from-bottom-full duration-700 ease-out fill-mode-forwards">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <div id="cookie-banner-text" className="flex-1 text-[12px] md:text-base leading-relaxed text-gray-400">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></div>
                <span className="font-black text-white uppercase tracking-[0.4em] text-[10px] md:text-xs block">{t('cookies.cookiePolicy')}</span>
              </div>
              <p>
                {t('cookies.bannerText')}{' '}
                <Link to="/cookies" className="text-pink-500 underline decoration-pink-500/30 underline-offset-8 hover:text-pink-400 transition-colors font-black uppercase text-[10px] md:text-sm tracking-widest ml-1">
                  {t('cookies.learnMore')}
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 shrink-0 w-full md:w-auto">
              <button
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none bg-white text-black px-10 py-4 md:px-12 md:py-5 rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] transition-all active:scale-95 shadow-2xl hover:scale-105"
              >
                {t('cookies.acceptAll')}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] transition-all active:scale-95 border border-white/10"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={handleManage}
                className="bg-transparent text-gray-500 px-4 py-4 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest hover:text-white transition-all"
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