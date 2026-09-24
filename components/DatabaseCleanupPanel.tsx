import React, { useState } from 'react';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface UserAudit {
  id: string;
  isAnonymous: boolean;
  email: string | null;
  totalPoints: number;
  lastUpdated?: any;
}

export const DatabaseCleanupPanel: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [auditResults, setAuditResults] = useState<{
    total: number;
    anonymous: UserAudit[];
    authenticated: UserAudit[];
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const scanDatabase = async () => {
    setScanning(true);
    setStatusMessage(null);
    setProgress(null);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const anonymous: UserAudit[] = [];
      const authenticated: UserAudit[] = [];

      snap.docs.forEach(docSnap => {
        const data = docSnap.data();
        const hasEmail = typeof data.email === 'string' && data.email.includes('@');
        const isAnon = !hasEmail || data.authType === 'anonymous';

        const record: UserAudit = {
          id: docSnap.id,
          isAnonymous: isAnon,
          email: hasEmail ? data.email : null,
          totalPoints: Number(data.totalPoints) || 0,
          lastUpdated: data.lastUpdated
        };

        if (isAnon) {
          anonymous.push(record);
        } else {
          authenticated.push(record);
        }
      });

      setAuditResults({
        total: snap.size,
        anonymous,
        authenticated
      });
      setStatusMessage(`Scan complete: Found ${anonymous.length} anonymous ghost documents and ${authenticated.length} Google-linked user accounts.`);
    } catch (e: any) {
      console.error('Scan failed:', e);
      setStatusMessage(`Error scanning database: ${e?.message || String(e)}`);
    } finally {
      setScanning(false);
    }
  };

  const deleteAnonymousProfiles = async () => {
    if (!auditResults || auditResults.anonymous.length === 0) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete ${auditResults.anonymous.length} anonymous ghost profiles?\n\nThis will NOT affect any Google-authenticated users or active guest local progress.`
    );
    if (!confirmDelete) return;

    setDeleting(true);
    setStatusMessage(null);
    setProgress('Starting batch deletion...');

    try {
      const targets = auditResults.anonymous;
      const batchSize = 400; // safe under 500 limit
      let deletedCount = 0;

      for (let i = 0; i < targets.length; i += batchSize) {
        const batch = writeBatch(db);
        const chunk = targets.slice(i, i + batchSize);
        chunk.forEach(item => {
          batch.delete(doc(db, 'users', item.id));
        });
        await batch.commit();
        deletedCount += chunk.length;
        setProgress(`Deleted ${deletedCount} / ${targets.length} profiles...`);
      }

      setStatusMessage(`Successfully removed ${deletedCount} anonymous ghost profiles! Your database is now clean.`);
      setProgress(null);
      // Re-scan to update view
      await scanDatabase();
    } catch (e: any) {
      console.error('Delete failed:', e);
      setStatusMessage(`Error during deletion: ${e?.message || String(e)}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-white">Database Optimization & Ghost Cleanup</h2>
          <p className="text-gray-400 text-xs mt-1">
            Scan and clean up orphaned anonymous profiles created prior to guest decoupling. Google accounts are strictly protected.
          </p>
        </div>
        <button
          onClick={scanDatabase}
          disabled={scanning || deleting}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Scan Database'}
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-200 text-sm font-semibold">
          {statusMessage}
        </div>
      )}

      {progress && (
        <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 text-xs font-mono">
          {progress}
        </div>
      )}

      {auditResults && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <span className="text-xs uppercase font-bold text-gray-400">Total User Documents</span>
              <p className="text-3xl font-black text-white mt-1">{auditResults.total}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl">
              <span className="text-xs uppercase font-bold text-green-400">Google Linked Accounts (Safe)</span>
              <p className="text-3xl font-black text-green-300 mt-1">{auditResults.authenticated.length}</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl">
              <span className="text-xs uppercase font-bold text-amber-400">Anonymous Ghost Documents</span>
              <p className="text-3xl font-black text-amber-300 mt-1">{auditResults.anonymous.length}</p>
            </div>
          </div>

          {auditResults.anonymous.length > 0 ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div>
                <p className="text-sm font-bold text-red-200">
                  Ready to clean up {auditResults.anonymous.length} anonymous ghost documents.
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Guest players will continue to play uninterrupted using local browser storage.
                </p>
              </div>
              <button
                onClick={deleteAnonymousProfiles}
                disabled={deleting}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {deleting ? 'Deleting Profiles...' : `Delete ${auditResults.anonymous.length} Ghost Profiles`}
              </button>
            </div>
          ) : (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 text-sm font-bold text-center">
              🎉 No anonymous ghost documents found! Your database is completely clean and optimized.
            </div>
          )}

          {auditResults.authenticated.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
                Protected Google Accounts ({auditResults.authenticated.length})
              </h3>
              <div className="bg-black/20 border border-white/5 rounded-xl divide-y divide-white/5 max-h-60 overflow-y-auto">
                {auditResults.authenticated.map(u => (
                  <div key={u.id} className="p-3 text-xs flex justify-between items-center text-gray-300 font-mono">
                    <span className="text-white font-bold">{u.email || u.id}</span>
                    <span className="text-gray-500">{u.totalPoints} points</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
