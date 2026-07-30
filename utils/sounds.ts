// Sound effects system using Web Audio API synthesis for zero external assets,
// 100% royalty-free, copyright-safe, and lag-free sound generation.

let isMuted = false;
let globalAudioCtx: AudioContext | null = null;

// Load mute setting from localStorage
if (typeof window !== 'undefined') {
  isMuted = localStorage.getItem('douze_points_muted') === 'true';
}

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  // If the context is suspended (often due to autoplay policies), try to resume it
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
};

export const soundManager = {
  getIsMuted: () => isMuted,
  
  setMuted: (muted: boolean) => {
    isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('douze_points_muted', String(muted));
    }
  },

  play: (soundType: 'flip' | 'buzz' | 'success' | 'packOpen' | 'victory' | 'fail' | 'click' | 'craft' | 'confetti' | 'celebration') => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      switch (soundType) {
        case 'craft': {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc1.type = 'square';
          osc2.type = 'triangle';
          
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
          
          osc2.frequency.setValueAtTime(554, ctx.currentTime); // C#
          osc2.frequency.exponentialRampToValueAtTime(1108, ctx.currentTime + 0.3);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          
          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 0.5);
          osc2.stop(ctx.currentTime + 0.5);
          break;
        }
        case 'confetti': {
          const duration = 0.2;
          const bufferSize = ctx.sampleRate * duration;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          
          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = 'highpass';
          noiseFilter.frequency.setValueAtTime(5000, ctx.currentTime);
          
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          
          noise.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          
          noise.start(ctx.currentTime);
          noise.stop(ctx.currentTime + duration);

          // Add a little pop
          const osc = ctx.createOscillator();
          const popGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
          popGain.gain.setValueAtTime(0.06, ctx.currentTime);
          popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          osc.connect(popGain);
          popGain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
          break;
        }
        case 'celebration': {
          // Arpeggio leading to a major chord
          const notes = [
            { f: 523.25, d: 0.1, t: 0 },    // C5
            { f: 659.25, d: 0.1, t: 0.1 },  // E5
            { f: 783.99, d: 0.1, t: 0.2 },  // G5
            { f: 1046.50, d: 0.6, t: 0.3 }, // C6
            { f: 523.25, d: 0.6, t: 0.3 },  // C5 (chord)
            { f: 659.25, d: 0.6, t: 0.3 },  // E5 (chord)
          ];
          
          notes.forEach((note) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);
            
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, ctx.currentTime + note.t);
            filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + note.t + note.d);

            gain.gain.setValueAtTime(0, ctx.currentTime + note.t);
            gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + note.t + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.t + note.d);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(ctx.currentTime + note.t);
            osc.stop(ctx.currentTime + note.t + note.d);
          });
          break;
        }
        case 'click': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
          
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
          break;
        }
        case 'flip': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(150, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
          
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.12);
          break;
        }
        case 'buzz': {
          const playBeep = (delay: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, ctx.currentTime + delay);
            osc.frequency.setValueAtTime(105, ctx.currentTime + delay + 0.1);
            
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, ctx.currentTime + delay);

            gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.18);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.18);
          };
          
          playBeep(0);
          playBeep(0.12);
          break;
        }
        case 'success': {
          const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
            
            gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.06);
            osc.stop(ctx.currentTime + idx * 0.06 + 0.2);
          });
          break;
        }
        case 'packOpen': {
          const swooshDuration = 0.5;
          const originalDuration = 0.9;
          const sweepDelay = 0.45;
          
          // 1. Tearing / Swoosh effect (filtered noise)
          const bufferSize = ctx.sampleRate * swooshDuration;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          
          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.setValueAtTime(600, ctx.currentTime);
          noiseFilter.frequency.exponentialRampToValueAtTime(4500, ctx.currentTime + swooshDuration * 0.8);
          
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, ctx.currentTime);
          noiseGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + swooshDuration);
          
          noise.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          
          noise.start(ctx.currentTime);
          noise.stop(ctx.currentTime + swooshDuration);

          // 2. Original sweeping synth effect
          const oscCount = 3;
          for (let i = 0; i < oscCount; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            
            const startFreq = 200 + i * 150;
            const endFreq = 1200 + i * 300;
            
            osc.frequency.setValueAtTime(startFreq, ctx.currentTime + sweepDelay);
            osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + sweepDelay + originalDuration);
            
            gain.gain.setValueAtTime(0, ctx.currentTime + sweepDelay);
            gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + sweepDelay + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + sweepDelay + originalDuration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + sweepDelay);
            osc.stop(ctx.currentTime + sweepDelay + originalDuration);
          }
          break;
        }
        case 'victory': {
          const melody = [
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.24 }, // C5
            { f: 415.30, d: 0.24 }, // Ab4
            { f: 466.16, d: 0.24 }, // Bb4
            { f: 523.25, d: 0.48 }  // C5
          ];
          
          let timeOffset = 0;
          melody.forEach((note) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, ctx.currentTime + timeOffset);
            
            gain.gain.setValueAtTime(0.08, ctx.currentTime + timeOffset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + note.d);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + timeOffset);
            osc.stop(ctx.currentTime + timeOffset + note.d);
            
            timeOffset += note.d - 0.02; // slight legato overlap
          });
          break;
        }
        case 'fail': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(300, ctx.currentTime);
          
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
          
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.6);
          break;
        }
      }
    } catch (e) {
      console.warn("Failed to generate sound effect:", e);
    }
  }
};
