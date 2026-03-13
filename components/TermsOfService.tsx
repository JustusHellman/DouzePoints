import React from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 page-fade">
      <header className="mb-16">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">
          {t('terms.title')}
        </h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-pink-500 to-purple-600 mt-6 rounded-full"></div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
          {t('terms.lastUpdated')}
        </p>
      </header>

      <main className="space-y-16 leading-relaxed text-sm md:text-base text-gray-300 font-medium">
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">01</span> {t('terms.acceptance.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.acceptance.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">02</span> {t('terms.description.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.description.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">03</span> {t('terms.ip.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.ip.p1')}</p>
            <p>{t('terms.ip.p2')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">04</span> {t('terms.conduct.title')}
          </h2>
          <div className="pl-12 space-y-6">
            <p>{t('terms.conduct.p1')}</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80 italic text-sm">
              {(t('terms.conduct.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">05</span> {t('terms.disclaimer.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.disclaimer.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">06</span> {t('terms.limitation.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.limitation.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">07</span> {t('terms.governingLaw.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.governingLaw.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">08</span> {t('terms.changes.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.changes.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">09</span> {t('terms.contact.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('terms.contact.p1')}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsOfService;
