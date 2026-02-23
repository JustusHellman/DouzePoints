import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050510] text-white p-6 text-center">
          <div className="text-8xl font-black italic text-pink-500/20 mb-4 select-none">ERR</div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
            Signal Lost
          </h2>
          <p className="text-gray-400 max-w-md mb-8 font-medium">
            Something went wrong with the broadcast. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-xl"
          >
            Refresh Broadcast
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
