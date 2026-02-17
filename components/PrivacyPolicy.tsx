
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
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Last Updated: February 2026</p>
      </header>

      <main className="space-y-16 leading-relaxed text-sm md:text-base text-gray-300 font-medium">
        
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">01</span> Introduction
          </h2>
          <div className="pl-12 space-y-4">
            <p>Welcome to Douze Points (<a href="https://www.douzepoints.net" className="text-pink-500 hover:text-pink-400 underline decoration-pink-500/20 underline-offset-8">www.douzepoints.net</a>).</p>
            <p>This website is operated by Justus Hellman, based in Sweden (the “Data Controller”).</p>
            <p>If you have any questions regarding this Privacy Policy or your personal data, you may contact: <a href="mailto:douzepointsgame@gmail.com" className="text-blue-400 hover:text-blue-300">douzepointsgame@gmail.com</a></p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">02</span> What Data We Collect
          </h2>
          <div className="pl-12 space-y-8">
            <div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-3">a) Automatically Collected Data</h3>
              <p className="mb-4 opacity-80">When you visit the website, certain information may be automatically collected, including:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-xs md:text-sm font-bold uppercase tracking-tight text-gray-400">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> IP address</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> Browser type and version</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> Device information</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> Operating system</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> Pages visited</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> Date and time of access</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500 rounded-full"></div> Referring website</li>
              </ul>
              <p className="mt-4 opacity-60 italic text-xs">This information may be processed by our advertising and analytics providers.</p>
            </div>

            <div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-3">b) Cookies and Similar Technologies</h3>
              <p className="mb-4 opacity-80">We use cookies and similar technologies for Advertising, Measuring ad performance, and Website functionality.</p>
              <p>Consent for cookies is collected and managed through Google Funding Choices, which provides our consent management platform (CMP). Users in applicable regions (such as the EU/EEA and UK) are asked to provide consent before non-essential cookies are used.</p>
              <p className="mt-4">You can change your consent preferences at any time via the consent options available on the website.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">03</span> Advertising
          </h2>
          <div className="pl-12 space-y-4">
            <p>We use Google AdSense to display advertisements. Google and its partners may use cookies and similar technologies to serve personalized ads, measure ad performance, and limit the number of times you see an ad.</p>
            <p>You can manage your advertising preferences via: <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 underline decoration-pink-500/20 underline-offset-8">adssettings.google.com</a></p>
            <p>More information about how Google processes personal data is available in Google’s Privacy Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">04</span> Legal Basis (GDPR)
          </h2>
          <div className="pl-12 space-y-4">
            <p>If you are located in the EU/EEA, we process personal data on the following legal bases:</p>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <strong className="text-white shrink-0 w-24 uppercase text-[10px] pt-1 tracking-widest">Consent:</strong>
                <span>for personalized advertising and non-essential cookies.</span>
              </li>
              <li className="flex gap-4">
                <strong className="text-white shrink-0 w-24 uppercase text-[10px] pt-1 tracking-widest">Legitimacy:</strong>
                <span>for basic website functionality, security, and fraud prevention.</span>
              </li>
              <li className="flex gap-4">
                <strong className="text-white shrink-0 w-24 uppercase text-[10px] pt-1 tracking-widest">Legal:</strong>
                <span>where required by applicable law.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">05</span> Local Storage
          </h2>
          <div className="pl-12 space-y-4 bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-inner">
            <p>We use your browser’s local storage to save game progress, scores, and statistics. This information:</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80 italic text-sm">
              <li>Is stored only on your device</li>
              <li>Is not transmitted to our servers</li>
              <li>Can be deleted by clearing your browser data</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">06</span> Data Sharing
          </h2>
          <div className="pl-12 space-y-4">
            <p>We do not sell personal data. However, data may be processed by third-party service providers, including:</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80">
              <li>Google (advertising and consent management)</li>
              <li>Hosting providers</li>
              <li>Technical service providers necessary for website operation</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">07</span> International Transfers
          </h2>
          <div className="pl-12 space-y-4">
            <p>Some third-party providers, including Google, may process data outside the EU or EEA. Where such transfers occur, appropriate safeguards such as Standard Contractual Clauses are used.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">08</span> Data Retention
          </h2>
          <div className="pl-12 space-y-4">
            <p>We do not maintain a user database. Advertising data is retained according to Google’s policies, technical logs for security purposes, and local storage remains until you delete it.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">09</span> Your Rights (EU/EEA)
          </h2>
          <div className="pl-12 space-y-4">
            <p>If you are located in the EU/EEA, you have the right to access, correct, or delete your data, and to restrict or object to processing. In Sweden, the supervisory authority is <strong className="text-white">Integritetsskyddsmyndigheten</strong>.</p>
            <p>Contact us at <a href="mailto:douzepointsgame@gmail.com" className="text-blue-400">douzepointsgame@gmail.com</a> to exercise your rights.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">10</span> Data Security
          </h2>
          <div className="pl-12 space-y-4">
            <p>We take reasonable technical and organizational measures to protect personal data. However, no method of transmission over the Internet is completely secure.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">11</span> Links to Third-Party Websites
          </h2>
          <div className="pl-12 space-y-4">
            <p>This website may contain links to third-party websites, including YouTube. We are not responsible for the privacy practices or content of external websites.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest flex items-baseline gap-4">
            <span className="text-pink-500 italic">12</span> Changes to This Policy
          </h2>
          <div className="pl-12 space-y-4">
            <p>We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised “Last Updated” date.</p>
          </div>
        </section>

      </main>
    </div>
  );
};
