
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

const CONSENT_KEY = 'eu_cookie_consent_v1';

export const CookiePolicy: React.FC = () => {
  const { t } = useTranslation();
  const [currentConsent, setCurrentConsent] = useState<boolean | null>(null);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(CONSENT_KEY);
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        setCurrentConsent(!!parsed.personalized);
      } catch (e) {
        setCurrentConsent(null);
      }
    }
  }, []);

  const updateConsent = (personalized: boolean) => {
    const consent = { personalized, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setCurrentConsent(personalized);
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': personalized ? 'granted' : 'denied',
        'analytics_storage': personalized ? 'granted' : 'denied',
        'ad_user_data': personalized ? 'granted' : 'denied',
        'ad_personalization': personalized ? 'granted' : 'denied'
      });
    }

    // Trigger a window resize or simple storage event to notify other components in same tab
    window.dispatchEvent(new Event('storage'));

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 page-fade relative">
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[500] transition-all duration-500 ${showSaved ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-green-500 text-black font-black uppercase text-[10px] tracking-widest px-8 py-3 rounded-full shadow-2xl">
          Settings Saved Successfully
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
            <span className="text-blue-500 italic">01</span> What are cookies?
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            Cookies are small text files stored on your device by your browser. They help websites remember you and your preferences.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">02</span> Types we use
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
              <p className="text-sm md:text-base">
                <strong className="text-white">Essential Cookies:</strong> Used for site stability and to remember your privacy choices. These do not track personal data.
              </p>
            </li>
            <li className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
              <p className="text-sm md:text-base">
                <strong className="text-white">Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.
              </p>
            </li>
            <li className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
              <p className="text-sm md:text-base">
                <strong className="text-white">Advertising Cookies:</strong> Set through our site by our advertising partners (like Google). They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
              </p>
            </li>
          </ul>
        </section>

        <section className="space-y-8 bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">03</span> Your choices
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed">
              We respect your right to privacy. You can choose not to allow certain types of cookies.
            </p>
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Current Status:</p>
              <span className={`text-[10px] font-black uppercase tracking-widest ${currentConsent === true ? 'text-green-500' : 'text-blue-400'}`}>
                {currentConsent === true ? 'All Allowed' : currentConsent === false ? 'Essential Only' : 'Not Set'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => updateConsent(true)}
              className={`px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 shadow-lg ${currentConsent === true ? 'bg-green-500 text-black shadow-green-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Accept All
            </button>
            <button 
              onClick={() => updateConsent(false)}
              className={`px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 border border-white/10 ${currentConsent === false ? 'bg-gray-200 text-black' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              Use Essential Only
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">04</span> Advertising Partners
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            We use <strong className="text-white">Google AdSense</strong> to show advertisements. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">Google Ad Settings</a> or by using our "Essential Only" toggle above.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest flex items-baseline gap-3">
            <span className="text-blue-500 italic">05</span> More Information
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            For more information on Google's privacy practices, please visit the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">Google Privacy & Terms page</a>.
          </p>
        </section>
      </main>
    </div>
  );
};
