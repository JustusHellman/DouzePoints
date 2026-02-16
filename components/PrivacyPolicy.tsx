
import React from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-6 page-fade">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white glow-text">
          {t('cookies.privacyPolicy')}
        </h1>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Last Updated: February 2026</p>
      </header>

      <main className="space-y-12 leading-relaxed text-sm md:text-base text-gray-300">
        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest">Third-Party Advertising</h2>
          <p>
            We use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-white">Google AdSense:</strong> Google, as a third-party vendor, uses cookies to serve ads on this site.
            </li>
            <li>
              <strong className="text-white">DART Cookies:</strong> Google's use of the DART cookie enables it to serve ads to users based on their visit to this site and other sites on the Internet.
            </li>
            <li>
              <strong className="text-white">Opting Out:</strong> Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline underline-offset-4 hover:text-pink-400">Google Ad and Content Network Privacy Policy</a>.
            </li>
          </ul>
          <p className="mt-4">
            You can also manage your advertising preferences directly via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline underline-offset-4 hover:text-pink-400">Google's Ad Settings</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest">Data Collection</h2>
          <p>We collect minimal data: cookies, aggregated analytics, and ad impressions. We do not sell personal data to any third party.</p>
          <p>
            We use local storage to save your game progress and statistics. This data stays on your device and is not uploaded to our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white tracking-widest">Contact Information</h2>
          <p>
            If you have any questions or would like to request data deletion, please contact us at: 
            <a href="mailto:your@email.example" className="text-blue-400 hover:text-blue-300 transition-colors ml-1 underline underline-offset-4">
              your@email.example
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};
