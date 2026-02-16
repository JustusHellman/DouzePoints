
import React, { useState, useEffect } from 'react';
import { AdSlot } from './AdSlot.tsx';

/**
 * StickyAd component that intelligently hides itself when the mobile keyboard is visible.
 * This prevents the ad from obscuring search dropdowns or input fields in tight layouts.
 */
export const StickyAd: React.FC = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // 1. Direct Focus/Blur detection
    // Hides the ad as soon as any input is focused on mobile/tablet
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
        if (window.innerWidth < 768) {
          setIsKeyboardVisible(true);
        }
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardVisible(false);
    };

    // 2. Visual Viewport API detection
    // Acts as a fallback/secondary check for devices that don't trigger focus as expected
    // or for physical keyboard attachments that might still trigger a layout change.
    const handleViewportChange = () => {
      if (!window.visualViewport) return;
      
      // If the viewport height is significantly less than the window's total height,
      // the keyboard is almost certainly open.
      const isShrunk = window.visualViewport.height < window.innerHeight * 0.85;
      
      // Only hide if we are on a smaller screen and an input is actually focused
      const activeEl = document.activeElement;
      const isInputActive = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
      
      if (isShrunk && isInputActive && window.innerWidth < 768) {
        setIsKeyboardVisible(true);
      } else if (!isInputActive) {
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      handleViewportChange();
    }

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[1000] bg-black/80 backdrop-blur-md border-t border-white/10 safe-area-bottom md:hidden transition-all duration-300 ease-in-out pointer-events-none ${
        isKeyboardVisible ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center pb-[env(safe-area-inset-bottom)] pointer-events-auto">
        <div className="w-[320px] h-[50px] flex items-center justify-center overflow-hidden">
          <AdSlot 
            adSlot="5555555555" 
            adFormat="horizontal"
            fullWidthResponsive={false}
            hideLabel={true}
          />
        </div>
      </div>
    </div>
  );
};
