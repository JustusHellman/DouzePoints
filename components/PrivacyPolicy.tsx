
import React from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 page-fade">
      <header className="mb-16">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">
          {t('cookies.privacyPolicy')}
        </h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-pink-500 to-purple-600 mt-6 rounded-full"></div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">{t('cookies.lastUpdated')}: {t('privacy.lastUpdated')}</p>
      </header>

      <main className="space-y-16 leading-relaxed text-sm md:text-base text-gray-300 font-medium">
        
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">00</span> About Douze Points
          </h2>
          <div className="pl-12 space-y-4">
            <p>
              Douze Points is a passion project created for the Eurovision Song Contest community. 
              Our goal is to provide a fun, daily interactive experience for fans to test their knowledge 
              and celebrate the rich history of the contest.
            </p>
            <p>
              The game is completely free to play and is maintained as a tribute to the world's 
              greatest music competition.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">01</span> {t('privacy.introduction.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.introduction.p1')}</p>
            <p>{t('privacy.introduction.p2')}</p>
            <p>{t('privacy.introduction.p3')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">02</span> {t('privacy.dataCollection.title')}
          </h2>
          <div className="pl-12 space-y-8">
            <div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-3">{t('privacy.dataCollection.autoTitle')}</h3>
              <p className="mb-4 opacity-80">{t('privacy.dataCollection.autoDesc')}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-xs md:text-sm font-bold uppercase tracking-tight text-gray-400">
                {t('privacy.dataCollection.autoItems').map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> {item}</li>
                ))}
              </ul>
              <p className="mt-4 opacity-60 italic text-xs">{t('privacy.dataCollection.autoFootnote')}</p>
            </div>

            <div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-3">{t('privacy.dataCollection.cookiesTitle')}</h3>
              <p className="mb-4 opacity-80">{t('privacy.dataCollection.cookiesDesc1')}</p>
              <p>{t('privacy.dataCollection.cookiesDesc2')}</p>
              <p className="mt-4">{t('privacy.dataCollection.cookiesDesc3')}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">03</span> {t('privacy.advertising.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.advertising.p1')}</p>
            <p>{t('privacy.advertising.p2')}</p>
            <p>{t('privacy.advertising.p3')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">04</span> {t('privacy.legalBasis.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.legalBasis.p1')}</p>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <strong className="text-white shrink-0 w-24 uppercase text-[10px] pt-1 tracking-widest">{t('privacy.legalBasis.consentLabel')}:</strong>
                <span>{t('privacy.legalBasis.consent')}</span>
              </li>
              <li className="flex gap-4">
                <strong className="text-white shrink-0 w-24 uppercase text-[10px] pt-1 tracking-widest">{t('privacy.legalBasis.legitimacyLabel')}:</strong>
                <span>{t('privacy.legalBasis.legitimacy')}</span>
              </li>
              <li className="flex gap-4">
                <strong className="text-white shrink-0 w-24 uppercase text-[10px] pt-1 tracking-widest">{t('privacy.legalBasis.legalLabel')}:</strong>
                <span>{t('privacy.legalBasis.legal')}</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">05</span> {t('privacy.localStorage.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.localStorage.p1')}</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80 italic text-sm">
              {t('privacy.localStorage.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">06</span> {t('privacy.dataSharing.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.dataSharing.p1')}</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80">
              {t('privacy.dataSharing.items').map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">07</span> {t('privacy.internationalTransfers.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.internationalTransfers.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">08</span> {t('privacy.dataRetention.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.dataRetention.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">09</span> {t('privacy.yourRights.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.yourRights.p1')}</p>
            <p>{t('privacy.yourRights.p2')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">10</span> {t('privacy.dataSecurity.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.dataSecurity.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">11</span> {t('privacy.thirdPartyLinks.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.thirdPartyLinks.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">12</span> {t('privacy.changes.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('privacy.changes.p1')}</p>
          </div>
        </section>

      </main>
    </div>
  );
};
