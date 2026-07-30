import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';

interface DataImportPanelProps {
  onImportComplete?: () => void;
}

export const DataImportPanel: React.FC<DataImportPanelProps> = ({ onImportComplete }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [targetCollection, setTargetCollection] = useState<string>('auto');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number; status: string } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const exportSnippet = `// Run this in the DevTools console of your OLD site/app to download all stats as JSON:
(async () => {
  const { getDocs, collection } = await import('firebase/firestore');
  const cols = ['game_stats', 'support_clicks', 'share_clicks', 'language_stats', 'completion_stats', 'discoveries', 'infinite_daily_stats', 'playtime_stats'];
  const data = {};
  for (const c of cols) {
    try {
      const snap = await getDocs(collection(window.db || db, c));
      data[c] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { console.warn('Could not export ' + c, e); }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = \`firestore_export_\${new Date().toISOString().split('T')[0]}.json\`;
  a.click();
  console.log('Export complete!', data);
})();`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) setJsonInput(text);
    };
    reader.readAsText(file);
  };

  const getDocId = (colName: string, item: any, index: number): string => {
    if (item.id) return String(item.id);
    if (item._id) return String(item._id);
    if (item.docId) return String(item.docId);

    // Known structured collections ID formats
    if (item.date && item.gameType && item.difficulty) return `${item.date}_${item.gameType}_${item.difficulty}`;
    if (item.date && item.gameType) return `${item.date}_${item.gameType}`;
    if (item.date) return `${item.date}`;

    return `${colName}_item_${index}_${Date.now()}`;
  };

  const cleanItemData = (item: any) => {
    const data = { ...item };
    delete data.id;
    delete data._id;
    delete data.docId;
    return data;
  };

  const handleImport = async () => {
    if (!jsonInput.trim()) {
      alert('Please select a JSON file or paste JSON data into the text area.');
      return;
    }

    let parsed: any;
    try {
      parsed = JSON.parse(jsonInput);
    } catch (err: any) {
      alert(`Invalid JSON format: ${err.message}`);
      return;
    }

    setImporting(true);
    setLogs([]);
    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    try {
      let tasks: { col: string; id: string; data: any }[] = [];

      // Check if top-level structure is an object map of collections: { "game_stats": [...], ... }
      if (typeof parsed === 'object' && !Array.isArray(parsed) && targetCollection === 'auto') {
        for (const [colName, colContent] of Object.entries(parsed)) {
          if (Array.isArray(colContent)) {
            colContent.forEach((item, idx) => {
              const docId = getDocId(colName, item, idx);
              tasks.push({ col: colName, id: docId, data: cleanItemData(item) });
            });
          } else if (typeof colContent === 'object' && colContent !== null) {
            Object.entries(colContent as Record<string, any>).forEach(([docId, item]) => {
              tasks.push({ col: colName, id: docId, data: cleanItemData(item) });
            });
          }
        }
      } else {
        // Targeted single collection
        const colName = targetCollection === 'auto' ? 'game_stats' : targetCollection;
        const items = Array.isArray(parsed) ? parsed : [parsed];
        items.forEach((item, idx) => {
          const docId = getDocId(colName, item, idx);
          tasks.push({ col: colName, id: docId, data: cleanItemData(item) });
        });
      }

      if (tasks.length === 0) {
        addLog('⚠️ No documents found in JSON input.');
        setImporting(false);
        return;
      }

      addLog(`🚀 Starting import of ${tasks.length} documents across ${new Set(tasks.map(t => t.col)).size} collection(s)...`);
      setProgress({ current: 0, total: tasks.length, status: 'Importing...' });

      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        try {
          const docRef = doc(db, task.col, task.id);
          await setDoc(docRef, task.data, { merge: true });
          successCount++;
        } catch (e: any) {
          console.error(`Failed to import doc ${task.col}/${task.id}:`, e);
          failCount++;
          addLog(`❌ Failed ${task.col}/${task.id}: ${e.message}`);
        }

        setProgress({
          current: i + 1,
          total: tasks.length,
          status: `Imported ${i + 1} / ${tasks.length}`
        });
      }

      addLog(`✅ Complete! ${successCount} documents updated/imported, ${failCount} errors.`);
      if (onImportComplete) onImportComplete();
    } catch (err: any) {
      addLog(`❌ Fatal import error: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const copySnippetToClipboard = () => {
    navigator.clipboard.writeText(exportSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Exporter Snippet Guide */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
              <span>📥</span> How to Export Data from Your Old Database
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Run this snippet in your old site's browser developer console (F12 -&gt; Console) to automatically download all stats as a JSON file.
            </p>
          </div>
          <button
            onClick={copySnippetToClipboard}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap"
          >
            {copiedSnippet ? '✓ Copied to Clipboard!' : 'Copy Browser Exporter Script'}
          </button>
        </div>
        <pre className="bg-[#0a0a16] border border-white/10 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-40">
          {exportSnippet}
        </pre>
      </div>

      {/* JSON Upload & Import Controls */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
          <span>📤</span> Import JSON Data into Firestore
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Select JSON File from Computer
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="w-full text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:bg-pink-500/20 file:text-pink-300 hover:file:bg-pink-500/30 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Target Collection
            </label>
            <select
              value={targetCollection}
              onChange={(e) => setTargetCollection(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-white/20 rounded-xl px-4 py-2.5 text-white text-xs font-bold outline-none focus:border-pink-500"
            >
              <option value="auto">Auto-Detect Multi-Collection Object</option>
              <option value="game_stats">game_stats</option>
              <option value="support_clicks">support_clicks</option>
              <option value="share_clicks">share_clicks</option>
              <option value="language_stats">language_stats</option>
              <option value="completion_stats">completion_stats</option>
              <option value="discoveries">discoveries</option>
              <option value="infinite_daily_stats">infinite_daily_stats</option>
              <option value="playtime_stats">playtime_stats</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Or Paste Raw JSON Content
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"game_stats": [{"date": "2026-05-10", "gameType": "WORD_GAME", "totalPlayed": 20}]}'
            rows={8}
            className="w-full bg-[#0a0a16] border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-200 outline-none focus:border-pink-500/50 resize-y"
          />
        </div>

        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-300">
              <span>{progress.status}</span>
              <span>{Math.round((progress.current / progress.total) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-200"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {logs.length > 0 && (
          <div className="bg-[#0a0a16] border border-white/10 rounded-xl p-4 text-xs font-mono space-y-1 max-h-48 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className={log.startsWith('❌') ? 'text-red-400' : log.startsWith('✅') ? 'text-emerald-400 font-bold' : 'text-gray-300'}>
                {log}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => { setJsonInput(''); setLogs([]); setProgress(null); }}
            disabled={importing}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
          >
            Clear
          </button>
          <button
            onClick={handleImport}
            disabled={importing || !jsonInput.trim()}
            className={`px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-black uppercase tracking-widest text-xs text-white shadow-lg shadow-pink-500/20 transition-all ${
              importing || !jsonInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
          >
            {importing ? 'Importing Data...' : 'Import JSON Data'}
          </button>
        </div>
      </div>
    </div>
  );
};
