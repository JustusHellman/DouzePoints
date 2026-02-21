import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext.tsx';
import { getDayString } from '../utils/daily.ts';
import { getCurrentRank } from '../utils/stats.ts';

interface DailyShareModalProps {
  games: any[];
  onClose: () => void;
  totalPoints?: number;
}

export const DailyShareModal: React.FC<DailyShareModalProps> = ({ games, onClose, totalPoints = 0 }) => {
  const { t } = useTranslation();
  const [showCopied, setShowCopied] = useState(false);
  const [showImageCopied, setShowImageCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const today = getDayString();
  const currentRank = getCurrentRank(totalPoints);

  const completedCount = games.filter(g => g.done).length;
  const totalCount = games.length;
  const totalDailyPoints = games.reduce((acc, g) => acc + g.points, 0);

  const shareText = useMemo(() => {
    let text = `✨ DOUZE POINTS ✨\nDaily Progress • ${today}\n\n`;
    
    games.forEach(game => {
      const status = game.done ? '🟩' : '⬛';
      const points = game.done ? ` (+${game.points}pts)` : '';
      text += `${status} ${game.title}${points}\n`;
    });

    text += `\nDaily Score: ${totalDailyPoints} pts\n`;
    text += `Progress: ${completedCount}/${totalCount}\n`;
    if (completedCount === totalCount) {
      text += `✨ Grand Final Qualified ✨\n`;
    }
    
    text += `\ndouzepoints.net`;
    return text;
  }, [games, today, completedCount, totalCount, totalDailyPoints]);

  const generateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions
    canvas.width = 1080;
    canvas.height = 1350;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Vibrant Party Background (Gradient Mesh style)
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0f0c29');
    bgGrad.addColorStop(0.5, '#302b63');
    bgGrad.addColorStop(1, '#24243e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Colorful Stage Lights / Glows
    const drawGlow = (x: number, y: number, radius: number, color: string) => {
      ctx.save();
      ctx.globalAlpha = 0.4;
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    drawGlow(0, 0, 800, '#ec4899'); // Pink top-left
    drawGlow(canvas.width, canvas.height, 800, '#3b82f6'); // Blue bottom-right
    drawGlow(canvas.width / 2, canvas.height / 2, 600, '#8b5cf6'); // Purple center

    // 3. Confetti / Sparkles
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = ['#ec4899', '#3b82f6', '#8b5cf6', '#eab308', '#ffffff'][Math.floor(Math.random() * 5)];
      ctx.globalAlpha = Math.random() * 0.5;
      const size = Math.random() * 10 + 2;
      ctx.beginPath();
      if (Math.random() > 0.5) {
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, size, 0, Math.PI * 2);
      } else {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, size, size);
      }
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 4. Header Section
    ctx.shadowColor = 'rgba(236, 72, 153, 0.5)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 110px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DOUZE POINTS', canvas.width / 2, 220);
    ctx.shadowBlur = 0;

    // Date Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    roundRect(ctx, canvas.width / 2 - 200, 260, 400, 60, 30, true, false);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px Montserrat, sans-serif';
    ctx.fillText(today.toUpperCase(), canvas.width / 2, 300);

    // 5. Main Stats Card (Glassmorphism)
    const cardX = 80;
    const cardY = 380;
    const cardW = canvas.width - 160;
    const cardH = 820;
    
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 3;
    roundRect(ctx, cardX, cardY, cardW, cardH, 80, true, true);
    ctx.restore();

    // Large Stats
    ctx.textAlign = 'center';
    // Left Stat: Progress
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 140px Montserrat, sans-serif';
    ctx.fillText(`${completedCount}/${totalCount}`, cardX + cardW * 0.25 + 30, cardY + 180);
    ctx.font = '700 30px Montserrat, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('QUALIFIED', cardX + cardW * 0.25 + 30, cardY + 230);

    // Right Stat: Score
    ctx.fillStyle = '#eab308';
    ctx.font = 'italic 900 140px Montserrat, sans-serif';
    ctx.fillText(totalDailyPoints.toString(), cardX + cardW * 0.75 - 30, cardY + 180);
    ctx.font = '700 30px Montserrat, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('DAILY POINTS', cardX + cardW * 0.75 - 30, cardY + 230);

    // Rank Section (Moved to central edge between score and games)
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(236, 72, 153, 0.2)';
    roundRect(ctx, canvas.width / 2 - 250, cardY + 300, 500, 60, 30, true, false);
    ctx.fillStyle = '#ec4899';
    ctx.font = '900 28px Montserrat, sans-serif';
    ctx.fillText(`🏆 ${currentRank.title.toUpperCase()}`, canvas.width / 2, cardY + 340);

    // 6. Game List (Tighter Layout)
    const startY = cardY + 420;
    const rowH = 65;
    
    games.forEach((game, i) => {
      const y = startY + (i * rowH);
      
      // Row Background (Subtle)
      ctx.fillStyle = game.done ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)';
      roundRect(ctx, cardX + 40, y - 25, cardW - 80, 50, 15, true, false);

      // Status Dot
      ctx.fillStyle = game.done ? '#22c55e' : 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(cardX + 80, y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Game Title
      ctx.textAlign = 'left';
      ctx.fillStyle = game.done ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
      ctx.font = '900 26px Montserrat, sans-serif';
      ctx.fillText(game.title.toUpperCase(), cardX + 110, y + 10);

      // Game Points
      if (game.done) {
        ctx.textAlign = 'right';
        ctx.fillStyle = '#eab308';
        ctx.font = '900 26px Montserrat, sans-serif';
        ctx.fillText(`+${game.points} PTS`, cardX + cardW - 80, y + 10);
      }
    });

    // 7. Trophy / Celebration Icon
    if (completedCount === totalCount) {
       ctx.save();
       ctx.translate(canvas.width / 2, 1050);
       ctx.shadowColor = '#eab308';
       ctx.shadowBlur = 40;
       ctx.fillStyle = '#eab308';
       
       // Simple Trophy Shape
       ctx.beginPath();
       ctx.fillRect(-50, 60, 100, 15); // Base
       ctx.fillRect(-20, 40, 40, 20); // Stem
       ctx.arc(0, 0, 50, 0, Math.PI, false); // Bowl
       ctx.fill();
       ctx.fillRect(-50, -40, 100, 40); // Top
       
       // Handles
       ctx.strokeStyle = '#eab308';
       ctx.lineWidth = 8;
       ctx.beginPath();
       ctx.arc(-50, -10, 25, Math.PI * 0.5, Math.PI * 1.5);
       ctx.stroke();
       ctx.beginPath();
       ctx.arc(50, -10, 25, Math.PI * 1.5, Math.PI * 0.5);
       ctx.stroke();
       ctx.restore();
    }

    // 8. Footer
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '900 35px Montserrat, sans-serif';
    ctx.fillText('DOUZEPOINTS.NET', canvas.width / 2, 1280);
    ctx.restore();
  };

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, fill: boolean, stroke: boolean) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  useEffect(() => {
    const timer = setTimeout(generateCanvas, 150);
    return () => clearTimeout(timer);
  }, [games]);

  const handleShareText = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleShareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setShowImageCopied(true);
        setTimeout(() => setShowImageCopied(false), 2000);
      });
    } catch (err) {
      console.error('Failed to copy image:', err);
      const link = document.createElement('a');
      link.download = `douze-points-${today}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="max-w-md w-full relative flex flex-col gap-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-3 z-[100] hover:bg-white/10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* The Scorecard Hero */}
        <div className="relative aspect-[4/5] w-full bg-[#0b0b18] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.2)]">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
            style={{ display: 'block' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 px-2">
          <button 
            onClick={handleShareImage}
            className={`w-full py-5 rounded-3xl font-black uppercase text-[12px] tracking-[0.2em] transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 ${
              showImageCopied 
                ? 'bg-green-500 text-black' 
                : 'bg-white text-black hover:bg-pink-500 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {showImageCopied ? t('scorecard.resultsCopied') : 'Copy Party Scorecard'}
          </button>

          <button 
            onClick={handleShareText}
            className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 ${
              showCopied 
                ? 'bg-green-500 text-black' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {showCopied ? t('scorecard.resultsCopied') : 'Copy Text Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};
