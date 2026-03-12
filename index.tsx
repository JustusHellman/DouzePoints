import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

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

declare const __BUILD_DATE__: string;

if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    // Track if the page was already controlled by a service worker at load time
    const wasControlled = !!navigator.serviceWorker.controller;

    window.addEventListener('load', () => {
      const swUrl = `/sw.js?v=${encodeURIComponent(__BUILD_DATE__)}`;
      navigator.serviceWorker.register(swUrl)
        .then(() => {
          console.log('SW registered with version:', __BUILD_DATE__);
        })
        .catch(err => {
          console.log('SW registration failed: ', err);
        });
    });

    // Reload the page when a new Service Worker takes over, 
    // but only if we were already controlled by one (meaning this is an update)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      if (wasControlled) {
        refreshing = true;
        window.location.reload();
      }
    });
  } else {
    // In development, unregister any existing service workers to prevent caching issues
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister();
        console.log('Unregistered development service worker');
      }
    });
  }
}