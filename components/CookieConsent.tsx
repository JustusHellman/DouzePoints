import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const CONSENT_KEY = 'eu_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(CONSENT_KEY);
  });

  useEffect(() => {
    // Listen for storage events to sync across tabs
    const handleStorage = () => {
      if (localStorage.getItem(CONSENT_KEY)) {
        setShow(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleConsent = (personalized: boolean) => {
    const consent = { personalized, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    
    // Notify other components
    window.dispatchEvent(new Event('storage'));
    setShow(false);
  };

  // Don't show on the policy page itself to allow reading
  if (location.pathname === '/cookie-policy') return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] backdrop-blur-xl bg-black/40 pointer-events-none"
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-[9999]"
          >
            <div className="bg-[#151619] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl overflow-hidden relative">
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <h3 className="text-lg font-black uppercase tracking-widest text-white">
                    {t('cookies.privacySettings')}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {t('cookies.bannerText')}
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => handleConsent(true)}
                    className="px-8 py-3 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-blue-400 transition-colors active:scale-95"
                  >
                    {t('cookies.acceptAll')}
                  </button>
                  <button
                    onClick={() => handleConsent(false)}
                    className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-colors active:scale-95"
                  >
                    {t('cookies.decline')}
                  </button>
                  <Link
                    to="/cookie-policy"
                    className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white text-center transition-colors"
                  >
                    {t('cookies.learnMore')}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
