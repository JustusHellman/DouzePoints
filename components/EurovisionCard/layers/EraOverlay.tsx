import { Era } from '../../../data/types';

export function EraOverlay({ era }: { era: Era; isMini?: boolean }) {
  switch (era) {
    case '50s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-color opacity-80">
           <div className="absolute inset-0 bg-[#8b6b45] opacity-50" />
           <div className="absolute inset-4 border-[2px] border-[#d4c3b3] opacity-60 rounded-[1rem] mix-blend-normal" />
           {/* Vintage corners */}
           <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#d4c3b3] opacity-80 mix-blend-normal" />
           <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#d4c3b3] opacity-80 mix-blend-normal" />
           <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#d4c3b3] opacity-80 mix-blend-normal" />
           <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#d4c3b3] opacity-80 mix-blend-normal" />
        </div>
      );
    case '60s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-80 mix-blend-hard-light">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,0,0.3),rgba(255,50,0,0.4),rgba(100,0,150,0.5))]" />
           <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full border-[12px] border-yellow-400/40 mix-blend-screen" />
           <div className="absolute bottom-10 -right-20 w-64 h-64 rounded-full border-[20px] border-orange-500/30 mix-blend-screen" />
           <div className="absolute inset-4 border-2 border-white/40 rounded-[2rem] mix-blend-overlay" />
        </div>
      );
    case '70s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-70">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,140,0,0.6),transparent_60%)]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,0,200,0.5),transparent_60%)]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
        </div>
      );
    case '80s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-90">
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(255,0,255,0.4)_50%,transparent_55%)] bg-[length:100%_6px]" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.4),transparent_60%)]" />
           <div className="absolute inset-0 border-[4px] border-fuchsia-500 rounded-[1.5rem] opacity-40 shadow-[inset_0_0_20px_rgba(255,0,255,0.5)]" />
        </div>
      );
    case '90s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-60 mix-blend-color-dodge">
           <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,255,0.4),rgba(255,0,255,0.4))]" />
           <svg width="100%" height="100%" className="absolute inset-0 opacity-40">
             <circle cx="20%" cy="30%" r="40%" fill="url(#grad1)" />
             <defs>
               <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                 <stop offset="0%" stopColor="cyan" stopOpacity="0.5"/>
                 <stop offset="100%" stopColor="blue" stopOpacity="0"/>
               </radialGradient>
             </defs>
           </svg>
           <div className="absolute inset-0 border-[8px] border-white/20 rounded-[1.5rem] mix-blend-overlay" />
        </div>
      );
    case '00s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-80">
           <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[60%] bg-gradient-to-b from-white to-transparent rounded-[100%] opacity-20" />
           <div className="absolute inset-0 border-[2px] border-slate-300 rounded-[1.5rem] shadow-[inset_0_0_15px_rgba(255,255,255,0.6)] opacity-70" />
        </div>
      );
    case '10s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-50">
           <div className="absolute inset-0 border-[6px] border-white rounded-[1.5rem] mix-blend-overlay" />
           <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
             <polygon points="0,0 100,0 100,20 0,80" fill="white" />
           </svg>
        </div>
      );
    case '20s':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-80">
           <div className="absolute -top-10 -left-10 w-48 h-48 bg-fuchsia-500 rounded-full blur-[60px] mix-blend-screen opacity-60" />
           <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500 rounded-full blur-[60px] mix-blend-screen opacity-60" />
           <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
           <div className="absolute inset-0 border border-white/20 rounded-[1.5rem] mix-blend-overlay" />
        </div>
      );
    default:
      return null;
  }
}
