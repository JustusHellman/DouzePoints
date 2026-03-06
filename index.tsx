import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Global error handler to catch early initialization errors
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message, source, lineno, colno, error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="background: #050510; color: white; padding: 40px; font-family: sans-serif; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <h1 style="color: #ec4899;">Broadcast Interrupted</h1>
        <p>A technical error occurred during initialization.</p>
        <p style="font-size: 12px; color: #666;">${message}</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: white; color: black; border: none; border-radius: 8px; cursor: pointer;">Retry Connection</button>
      </div>
    `;
  }
};

console.log("Douze Points: Initializing Greenroom...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
