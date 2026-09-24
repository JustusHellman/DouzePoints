export function GradientOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,20,0.3) 0%, transparent 20%, transparent 60%, rgba(0,0,30,0.6) 85%, rgba(0,0,40,0.9) 100%)'
      }}
    />
  );
}
