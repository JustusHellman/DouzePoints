import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  hideLabel?: boolean;
}

const PUBLISHER_ID = 'ca-pub-4733458613669560';

export const AdSlot: React.FC<AdSlotProps> = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  className = "",
  style = { display: 'block' } as React.CSSProperties,
  hideLabel = false
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    pushed.current = false;
    if (!adRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !pushed.current && adRef.current && adRef.current.offsetWidth > 0) {
          const status = adRef.current.getAttribute('data-adsbygoogle-status');
          
          if (!status || status === '') {
            try {
              window.adsbygoogle = window.adsbygoogle || [];
              const currentStatus = adRef.current.getAttribute('data-adsbygoogle-status');
              if (!currentStatus) {
                pushed.current = true;
                (window.adsbygoogle as any).push({});
                observer.unobserve(adRef.current);
              }
            } catch (e: any) {
              if (e && e.message && !e.message.includes("already have ads")) {
                console.warn(`AdSense error for slot ${adSlot}:`, e.message);
              }
              pushed.current = true;
            }
          } else if (status === 'done') {
            pushed.current = true;
            observer.unobserve(adRef.current);
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '100px' 
    });

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [adSlot]);

  return (
    <div className={`ad-container ${hideLabel ? 'my-0 p-0' : 'my-4 md:my-8'} text-center overflow-hidden flex flex-col items-stretch animate-in fade-in duration-1000 w-full ${className}`}>
      {!hideLabel && (
        <span className="block text-[7px] font-black text-white/10 uppercase tracking-[0.4em] mb-3 select-none text-center">Advertisement</span>
      )}
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          ...style, 
          width: '100%', 
          minWidth: adFormat === 'fluid' ? '250px' : (style.width || 'auto'), 
          minHeight: '90px',
          background: 'transparent'
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      ></ins>
    </div>
  );
};