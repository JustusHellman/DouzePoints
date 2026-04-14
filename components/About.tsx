import React from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';
import { reportSupportClick } from '../utils/firebaseService.ts';
import { BUY_ME_A_COFFEE_URL } from '../data/constants.tsx';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 page-fade">
      <header className="mb-16">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">
          {t('about.title')}
        </h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-pink-500 to-purple-600 mt-6 rounded-full"></div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
          {t('about.subtitle')}
        </p>
      </header>

      <main className="space-y-16 leading-relaxed text-sm md:text-base text-gray-300 font-medium">
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">01</span> {t('about.mission.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('about.mission.p1')}</p>
            <p>{t('about.mission.p2')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">02</span> {t('about.story.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('about.story.p1')}</p>
            <p>{t('about.story.p2')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">03</span> {t('about.history.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('about.history.p1')}</p>
            <p>{t('about.history.p2')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">04</span> {t('about.games.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('about.games.p1')}</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80 italic text-sm">
              {t('about.games.gameList').map((game: { name: string, desc: string }, i: number) => (
                <li key={i}><strong>{game.name}:</strong> {game.desc}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">05</span> {t('about.community.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('about.community.p1')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">06</span> {t('about.data.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p>{t('about.data.p1')}</p>
          </div>
        </section>

        <section className="space-y-6 mt-12">
          <div className="pl-12">
            <a
              href={BUY_ME_A_COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reportSupportClick('About_Page')}
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#FFDD00] text-black rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,221,0,0.3)]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
              </svg>
              {t('support.button')}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;