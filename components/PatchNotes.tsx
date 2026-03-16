import React from 'react';
import { PATCH_NOTES } from '../data/patchNotes.ts';
import { useTranslation } from '../context/LanguageContext.tsx';

const PatchNotes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4 pr-[0.1em]">
          Patch Notes
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
          Stay up to date with the latest additions, fixes, and improvements to Douze Points.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {[...PATCH_NOTES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((note, index) => (
          <div key={note.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0b0b18] bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
                  {note.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {note.version && (
                    <span className="px-2 py-1 bg-white/10 text-white/70 rounded-md text-[10px] font-black uppercase tracking-widest">
                      v{note.version}
                    </span>
                  )}
                  <time className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {new Date(note.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                {note.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatchNotes;
