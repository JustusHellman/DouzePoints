import { useRef, useLayoutEffect } from 'react';

export function AutoText({ 
  text, 
  className = "", 
  minSize = 10, 
  maxSize = 32,
  lines = 2
}: { 
  text: string, 
  className?: string, 
  minSize?: number, 
  maxSize?: number,
  lines?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const adjustSize = () => {
      if (container.clientWidth === 0 || container.clientHeight === 0) return;
      
      // Reset for accurate measurement
      textEl.style.fontSize = `${maxSize}px`;
      
      let size = maxSize;
      
      while (
        (textEl.scrollWidth > container.clientWidth || textEl.scrollHeight > container.clientHeight) && 
        size > minSize
      ) {
        size -= 1;
        textEl.style.fontSize = `${size}px`;
      }
    };

    const observer = new ResizeObserver(() => adjustSize());
    observer.observe(container);
    adjustSize();

    return () => observer.disconnect();
  }, [text, maxSize, minSize, lines]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-center">
      <div 
        ref={textRef} 
        className={className}
      >
        {text}
      </div>
    </div>
  );
}
