
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

const CONSENT_KEY = 'eu_cookie_consent_v1';

export const CookiePolicy: React.FC = () => {
  const { t } = useTranslation();
  const [currentConsent, setCurrentConsent] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') return null;
    const existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) return null;
    try {
      const parsed = JSON.parse(existing);
      return !!parsed.personalized;
    } catch {
      return null;
    }
  });
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    // No longer need to load from localStorage here as it's done in initializer
  }, []);

  const updateConsent = (personalized: boolean) => {
    const consent = { personalized, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setCurrentConsent(personalized);
    
    // Trigger a window resize or simple storage event to notify other components in same tab
    window.dispatchEvent(new Event('storage'));

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{part}</a>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 page-fade relative">
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[500] transition-all duration-500 ${showSaved ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-green-500 text-black font-black uppercase text-[10px] tracking-widest px-8 py-3 rounded-full shadow-2xl">
          {t('cookies.settingsSaved')}
        </div>
      </div>

      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white glow-text">
          {t('cookies.cookiePolicy')}
        </h1>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Transparency & Choice</p>
      </header>

      <main className="space-y-12 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">01</span> {t('cookies.whatAreCookies')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            {t('cookies.whatAreCookiesDesc')}
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">02</span> {t('cookies.typesWeUse')}
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
              <p className="text-sm md:text-base">
                <strong className="text-white">{t('cookies.essential')}:</strong> {t('cookies.essentialDesc')}
              </p>
            </li>
            <li className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
              <p className="text-sm md:text-base">
                <strong className="text-white">{t('cookies.advertising')}:</strong> {t('cookies.advertisingDesc')}
              </p>
            </li>
          </ul>
        </section>

        <section className="space-y-8 bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">03</span> {t('cookies.yourChoices')}
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed">
              {t('cookies.yourChoicesDesc')}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t('cookies.status')}:</p>
              <span className={`text-[10px] font-black uppercase tracking-widest ${currentConsent === true ? 'text-green-500' : 'text-blue-400'}`}>
                {currentConsent === true ? t('cookies.allAllowed') : currentConsent === false ? t('cookies.essentialOnly') : t('cookies.notSet')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => updateConsent(true)}
              className={`px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 shadow-lg ${currentConsent === true ? 'bg-green-500 text-black shadow-green-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {t('cookies.acceptAll')}
            </button>
            <button 
              onClick={() => updateConsent(false)}
              className={`px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 border border-white/10 ${currentConsent === false ? 'bg-gray-200 text-black' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {t('cookies.decline')}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">04</span> {t('cookies.partners')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            {renderTextWithLinks(t('cookies.partnersDesc'))}
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            {renderTextWithLinks(t('cookies.partnersOptOut'))}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">05</span> {t('cookies.moreInfo')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            {renderTextWithLinks(t('cookies.moreInfoDesc'))}
          </p>
        </section>
      </main>
    </div>
  );
};
