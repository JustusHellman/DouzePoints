import React, { useState, useEffect } from 'react';
import { X, Layers, Trophy, Smartphone, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { soundManager } from '../utils/sounds';
import { useTranslation } from '../context/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { signInWithGoogle, authError, setAuthError } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAuthError(null);
      setLoading(false);
    }
  }, [isOpen, setAuthError]);

  // Lock body scroll when modal is open so the background page cannot scroll behind it
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    soundManager.play('click');
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        soundManager.play('click');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto overflow-x-hidden overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="bg-[#0c0c1b] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full relative shadow-[0_0_60px_rgba(0,0,0,0.7)] border-t-pink-500/40 overflow-y-auto overflow-x-hidden max-h-[85vh] scrollbar-hide my-auto overscroll-contain animate-in zoom-in-95 duration-200">
        {/* Ambient background glows wrapped to prevent horizontal overflow */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-500/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-500/15 rounded-full blur-3xl"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => { soundManager.play('click'); onClose(); }}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-2 z-10 hover:bg-white/5 rounded-full cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-black tracking-widest uppercase mb-3">
            <span>{t('auth.pill')}</span>
          </div>
          <h2 id="login-modal-title" className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">
            {t('auth.title')}
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1.5 leading-relaxed">
            {t('auth.subtitle')}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">{t('auth.backupTitle')}</h3>
              <p className="text-[11px] text-gray-400 leading-snug">{t('auth.backupDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">{t('auth.statsTitle')}</h3>
              <p className="text-[11px] text-gray-400 leading-snug">{t('auth.statsDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">{t('auth.crossDeviceTitle')}</h3>
              <p className="text-[11px] text-gray-400 leading-snug">{t('auth.crossDeviceDesc')}</p>
            </div>
          </div>
        </div>

        {/* Error notification */}
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2 text-rose-300 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span className="leading-snug">{authError}</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 text-black font-black uppercase tracking-wider text-xs shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>{t('auth.connecting')}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{t('auth.continueWithGoogle')}</span>
              </>
            )}
          </button>

          <button
            onClick={() => { soundManager.play('click'); onClose(); }}
            className="w-full py-2.5 px-4 rounded-xl text-center text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t('auth.continueAsGuest')}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-[10px] text-gray-500 text-center mt-4 leading-normal">
          {t('auth.privacyNote')}
        </p>
      </div>
    </div>
  );
};
