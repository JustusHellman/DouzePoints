import React, { useState, useMemo } from 'react';
import { MASTER_DATA as FULL_MASTER_DATA } from '../data/fullMasterData.ts';
import { MasterSong } from '../data/types.ts';
import { getPlacingLabel } from '../data/constants.tsx';
import { useTranslation } from '../context/LanguageContext.tsx';

interface WeightParams {
  basePoints: number;
  winnerBonus: number;
  secondBonus: number;
  thirdBonus: number;
  top5Bonus: number;
  top10Bonus: number;
  top15Bonus: number;
  below15Bonus: number;
  globalHitBonus: number;
  viralPhenomenonBonus: number;
  cultClassicBonus: number;
  firstWinBonus: number;
  debutEntryBonus: number;
  nulPointsBonus: number;
  noveltyActBonus: number;
  scandalBonus: number;
  
  useDecayFormula: boolean;
  decayBase: number;
  decayScale: number;
  decayRate: number;
  
  recency2021: number;
  recency2010: number;
  recency2000: number;
  recency1990: number;
  recencyPre1990: number;
  cutoff: number;
}

const ControlRow: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  color?: string;
}> = ({ label, value, min, max, step = 1, onChange, color = 'pink' }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">{label}</label>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 bg-white/10 border border-white/20 rounded px-2 py-0.5 text-xs text-right outline-none focus:border-pink-500"
        />
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className={`w-full accent-${color}-500`} 
      />
    </div>
  );
};

const WeightSimulator: React.FC = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<WeightParams>({
    basePoints: 50,
    winnerBonus: 150,
    secondBonus: 100,
    thirdBonus: 75,
    top5Bonus: 50,
    top10Bonus: 30,
    top15Bonus: 10,
    below15Bonus: 0,
    globalHitBonus: 150,
    viralPhenomenonBonus: 100,
    cultClassicBonus: 100,
    firstWinBonus: 50,
    debutEntryBonus: 30,
    nulPointsBonus: 30,
    noveltyActBonus: 50,
    scandalBonus: 40,
    
    useDecayFormula: true,
    decayBase: 0.3,
    decayScale: 0.7,
    decayRate: 0.04,
    
    recency2021: 1.0,
    recency2010: 0.85,
    recency2000: 0.70,
    recency1990: 0.50,
    recencyPre1990: 0.30,
    cutoff: 200
  });

  const [searchTerm, setSearchTerm] = useState('');

  const calculatedData = useMemo(() => {
    return FULL_MASTER_DATA.map((song: MasterSong) => {
      let score = params.basePoints;

      // Placement Bonus (Mutually Exclusive)
      if (song.placing === 1) score += params.winnerBonus;
      else if (song.placing === 2) score += params.secondBonus;
      else if (song.placing === 3) score += params.thirdBonus;
      else if (song.placing <= 5) score += params.top5Bonus;
      else if (song.placing <= 10) score += params.top10Bonus;
      else if (song.placing <= 15) score += params.top15Bonus;
      else score += params.below15Bonus;

      // Legacy Cult/Manual Bonus (if still present in tier)
      if (song.tier === 'cult') score += params.cultClassicBonus;

      if (song.weightModifiers) {
        if (song.weightModifiers.includes('Global hit')) score += params.globalHitBonus;
        if (song.weightModifiers.includes('Viral phenomenon')) score += params.viralPhenomenonBonus;
        if (song.weightModifiers.includes('Cult classic')) score += params.cultClassicBonus;
        if (song.weightModifiers.includes('First win')) score += params.firstWinBonus;
        if (song.weightModifiers.includes('Debut entry')) score += params.debutEntryBonus;
        if (song.weightModifiers.includes('Nul points')) score += params.nulPointsBonus;
        if (song.weightModifiers.includes('Novelty act')) score += params.noveltyActBonus;
        if (song.weightModifiers.includes('Scandal')) score += params.scandalBonus;
      }

      // Recency Multiplier
      let multiplier = 1.0;
      if (params.useDecayFormula) {
        multiplier = params.decayBase + params.decayScale * Math.exp(-params.decayRate * (2025 - song.year));
      } else {
        multiplier = params.recencyPre1990;
        if (song.year >= 2021) multiplier = params.recency2021;
        else if (song.year >= 2010) multiplier = params.recency2010;
        else if (song.year >= 2000) multiplier = params.recency2000;
        else if (song.year >= 1990) multiplier = params.recency1990;
      }

      const finalWeight = Math.round(score * multiplier);
      return { ...song, weight: finalWeight };
    }).sort((a: MasterSong, b: MasterSong) => (b.weight || 0) - (a.weight || 0));
  }, [params]);

  const dailyPool = calculatedData.filter((s: MasterSong) => (s.weight || 0) >= params.cutoff);
  const bonusPool = calculatedData.filter((s: MasterSong) => (s.weight || 0) < params.cutoff);

  const filteredData = calculatedData.filter((s: MasterSong) => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateCode = () => {
    const lines = FULL_MASTER_DATA.map((originalSong: MasterSong) => {
      const calculatedSong = calculatedData.find((s: MasterSong) => s.id === originalSong.id);
      const weight = calculatedSong ? calculatedSong.weight : 0;
      
      const parts = [];
      parts.push(`id: ${JSON.stringify(originalSong.id)}`);
      parts.push(`year: ${originalSong.year}`);
      parts.push(`country: ${JSON.stringify(originalSong.country)}`);
      parts.push(`artist: ${JSON.stringify(originalSong.artist)}`);
      parts.push(`title: ${JSON.stringify(originalSong.title)}`);
      parts.push(`placing: ${originalSong.placing}`);
      parts.push(`sex: ${JSON.stringify(originalSong.sex)}`);
      parts.push(`genre: ${JSON.stringify(originalSong.genre)}`);
      parts.push(`members: ${originalSong.members}`);
      if (originalSong.fact) parts.push(`fact: ${JSON.stringify(originalSong.fact)}`);
      if (originalSong.youtubeId) parts.push(`youtubeId: ${JSON.stringify(originalSong.youtubeId)}`);
      if (originalSong.tier) parts.push(`tier: ${JSON.stringify(originalSong.tier)}`);
      if (originalSong.weightModifiers) parts.push(`weightModifiers: ${JSON.stringify(originalSong.weightModifiers)}`);
      parts.push(`weight: ${weight}`);
      return `  {${parts.join(',')}}`;
    });
    const code = `import { MasterSong } from './types.ts';\n\n/**\n * Full Eurovision dataset including TidyTuesday historical data.\n */\nexport const MASTER_DATA: MasterSong[] = [\n${lines.join(',\n')}\n];\n`;
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fullMasterData.ts';
    link.click();
  };

  return (
    <div className="space-y-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Algorithm Sliders</h3>
          
          <div className="space-y-6">
            <div>
              <ControlRow label="Base Points" value={params.basePoints} min={0} max={200} onChange={v => setParams({...params, basePoints: v})} />
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase mb-4 text-pink-400">Placements (Mutually Exclusive)</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <ControlRow label="Winner" value={params.winnerBonus} min={0} max={300} onChange={v => setParams({...params, winnerBonus: v})} />
                <ControlRow label="Second" value={params.secondBonus} min={0} max={300} onChange={v => setParams({...params, secondBonus: v})} />
                <ControlRow label="Third" value={params.thirdBonus} min={0} max={300} onChange={v => setParams({...params, thirdBonus: v})} />
                <ControlRow label="Top 5" value={params.top5Bonus} min={0} max={300} onChange={v => setParams({...params, top5Bonus: v})} />
                <ControlRow label="Top 10" value={params.top10Bonus} min={0} max={300} onChange={v => setParams({...params, top10Bonus: v})} />
                <ControlRow label="Top 15" value={params.top15Bonus} min={0} max={300} onChange={v => setParams({...params, top15Bonus: v})} />
                <ControlRow label="16 or below" value={params.below15Bonus} min={-100} max={100} onChange={v => setParams({...params, below15Bonus: v})} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase mb-4 text-blue-400">Modifiers</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <ControlRow label="Global Hit" value={params.globalHitBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, globalHitBonus: v})} />
                <ControlRow label="Viral" value={params.viralPhenomenonBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, viralPhenomenonBonus: v})} />
                <ControlRow label="Cult Classic" value={params.cultClassicBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, cultClassicBonus: v})} />
                <ControlRow label="First Win" value={params.firstWinBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, firstWinBonus: v})} />
                <ControlRow label="Debut Entry" value={params.debutEntryBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, debutEntryBonus: v})} />
                <ControlRow label="Nul Points" value={params.nulPointsBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, nulPointsBonus: v})} />
                <ControlRow label="Novelty Act" value={params.noveltyActBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, noveltyActBonus: v})} />
                <ControlRow label="Scandal" value={params.scandalBonus} min={-100} max={300} color="blue" onChange={v => setParams({...params, scandalBonus: v})} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase text-purple-400">Recency Multipliers</h4>
                <button 
                  onClick={() => setParams({...params, useDecayFormula: !params.useDecayFormula})}
                  className="text-[10px] font-bold uppercase bg-white/10 hover:bg-white/20 px-2 py-1 rounded"
                >
                  {params.useDecayFormula ? 'Using Decay Formula' : 'Using Decades'}
                </button>
              </div>

              {params.useDecayFormula ? (
                <div className="space-y-4 bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
                  <p className="text-[10px] text-purple-300 font-mono mb-2">
                    Base + Scale * e^(-Rate * (2025 - Year))
                  </p>
                  <ControlRow label="Base (Min)" value={params.decayBase} min={0} max={1} step={0.05} color="purple" onChange={v => setParams({...params, decayBase: v})} />
                  <ControlRow label="Scale (Max Add)" value={params.decayScale} min={0} max={2} step={0.05} color="purple" onChange={v => setParams({...params, decayScale: v})} />
                  <ControlRow label="Rate (Decay)" value={params.decayRate} min={0.01} max={0.2} step={0.01} color="purple" onChange={v => setParams({...params, decayRate: v})} />
                  
                  <div className="flex justify-between text-[10px] text-gray-400 pt-2 border-t border-purple-500/20">
                    <span>1956: {(params.decayBase + params.decayScale * Math.exp(-params.decayRate * (2025 - 1956))).toFixed(2)}x</span>
                    <span>2000: {(params.decayBase + params.decayScale * Math.exp(-params.decayRate * (2025 - 2000))).toFixed(2)}x</span>
                    <span>2025: {(params.decayBase + params.decayScale).toFixed(2)}x</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <ControlRow label="2021+" value={params.recency2021} min={0} max={2} step={0.05} color="purple" onChange={v => setParams({...params, recency2021: v})} />
                  <ControlRow label="2010s" value={params.recency2010} min={0} max={2} step={0.05} color="purple" onChange={v => setParams({...params, recency2010: v})} />
                  <ControlRow label="2000s" value={params.recency2000} min={0} max={2} step={0.05} color="purple" onChange={v => setParams({...params, recency2000: v})} />
                  <ControlRow label="90s" value={params.recency1990} min={0} max={2} step={0.05} color="purple" onChange={v => setParams({...params, recency1990: v})} />
                  <ControlRow label="Pre-90s" value={params.recencyPre1990} min={0} max={2} step={0.05} color="purple" onChange={v => setParams({...params, recencyPre1990: v})} />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <ControlRow label="Daily Cutoff" value={params.cutoff} min={0} max={500} color="pink" onChange={v => setParams({...params, cutoff: v})} />
            </div>
          </div>

          <button 
            onClick={generateCode}
            className="w-full mt-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-pink-500/20"
          >
            Download Updated TS
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-white">{calculatedData.length}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">Total Entries</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-green-400">{dailyPool.length}</div>
              <div className="text-[10px] font-bold text-green-500/60 uppercase">Daily Pool</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-gray-400">{bonusPool.length}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">Bonus Pool</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-widest">Entry Preview</h3>
              <input 
                type="text" 
                placeholder="Search entries..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm outline-none focus:border-pink-500"
              />
            </div>

            <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredData.map((song: MasterSong) => (
                <div 
                  key={song.id} 
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    (song.weight || 0) >= params.cutoff 
                      ? 'bg-green-500/5 border-green-500/20' 
                      : 'bg-white/5 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center font-black text-lg">
                      {song.weight}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{song.title}</div>
                      <div className="text-xs text-gray-400">{song.artist} • {song.country} {song.year}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                      (song.weight || 0) >= params.cutoff ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {(song.weight || 0) >= params.cutoff ? 'Daily' : 'Bonus'}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">Place: {getPlacingLabel(song.placing, t)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSimulator;
