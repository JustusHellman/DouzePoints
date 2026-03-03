import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 page-fade">
      <header className="mb-16">
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">
          {t('contact.title')}
        </h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-pink-500 to-purple-600 mt-6 rounded-full"></div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
          Get in touch with the Greenroom
        </p>
      </header>

      <main className="space-y-16 leading-relaxed text-sm md:text-base text-gray-300 font-medium">
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">01</span> {t('contact.methods.title')}
          </h2>
          <div className="pl-12 space-y-6">
            <p>{t('contact.methods.p1')}</p>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-black uppercase text-xs tracking-widest mb-1">Email Support</h3>
                <a href="mailto:douzepointsgame@gmail.com" className="text-xl md:text-2xl font-black text-pink-500 hover:text-pink-400 transition-colors">
                  douzepointsgame@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">02</span> {t('contact.faq.title')}
          </h2>
          <div className="pl-12 space-y-8">
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-sm tracking-tight">{t('contact.faq.q1')}</h3>
              <p className="opacity-80">{t('contact.faq.a1')}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-sm tracking-tight">{t('contact.faq.q2')}</h3>
              <p className="opacity-80">{t('contact.faq.a2')}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-sm tracking-tight">{t('contact.faq.q3')}</h3>
              <p className="opacity-80">{t('contact.faq.a3')}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-sm tracking-tight">{t('contact.faq.q4')}</h3>
              <p className="opacity-80">{t('contact.faq.a4')}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-sm tracking-tight">{t('contact.faq.q5')}</h3>
              <p className="opacity-80">{t('contact.faq.a5')}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">03</span> {t('contact.feedback.title')}
          </h2>
          <div className="pl-12 space-y-4">
            <p className="opacity-80">{t('contact.feedback.p1')}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
