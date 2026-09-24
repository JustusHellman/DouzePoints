import React, { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { BINGO_EVENTS } from '../../data/bingoEvents.ts';

export const EuroBingoPrint: React.FC<{ onClose: () => void, totalCards: number, cardsPerPage: number }> = ({ onClose, totalCards, cardsPerPage }) => {
  const { t } = useTranslation();

  // Generate unique boards
  const boards = useMemo(() => {
    return Array.from({ length: totalCards }).map(() => {
      const shuffled = [...BINGO_EVENTS].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 24);
      const squares = [];
      let eventIdx = 0;
      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          squares.push({ id: 'free', isFree: true });
        } else {
          squares.push({ id: selected[eventIdx].id, isFree: false });
          eventIdx++;
        }
      }
      return squares;
    });
  }, [totalCards]);

  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < boards.length; i += cardsPerPage) {
      result.push(boards.slice(i, i + cardsPerPage));
    }
    return result;
  }, [boards, cardsPerPage]);

  const appUrl = 'https://www.douzepoints.net';

  return (
    <div className="print-container bg-gray-200 min-h-screen text-black p-4 sm:p-8 font-sans min-w-[210mm] flex flex-col items-center gap-8">
      <style>
        {`
          @media print {
            @page { margin: 0; size: ${cardsPerPage === 2 ? 'landscape' : 'portrait'}; }
            body * { visibility: hidden; }
            #root { display: none !important; }
            body, html { height: auto !important; min-height: auto !important; background: white !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .print-container, .print-container * { visibility: visible; }
            .print-container { display: block !important; padding: 0 !important; background: white !important; margin: 0 !important; }
            .no-print, .no-print * { display: none !important; visibility: hidden !important; }
            .print-page { margin: 0 !important; box-shadow: none !important; break-after: page; page-break-after: always; }
            .print-page:last-child { break-after: auto; page-break-after: auto; }
          }
        `}
      </style>
      
      <div className="no-print fixed top-4 right-4 flex gap-2 z-50">
        <button 
          onClick={() => window.print()}
          className="bg-pink-600 text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest shadow-lg hover:bg-pink-700 transition-colors"
        >
          {t('bingo.share.printNow')}
        </button>
        <button 
          onClick={onClose}
          className="bg-gray-800 text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest shadow-lg hover:bg-gray-900 transition-colors"
        >
          {t('common.close')}
        </button>
      </div>

      {pages.map((pageBoards, pageIdx) => (
        <div key={pageIdx} className={`print-page bg-white p-8 shadow-2xl mx-auto flex flex-col relative ${
          cardsPerPage === 2 ? 'w-[297mm] h-[210mm]' : 'w-[210mm] h-[297mm]'
        }`}>
          <div className={`grid gap-4 sm:gap-8 flex-1 ${
            cardsPerPage === 1 ? 'grid-cols-1 grid-rows-1' :
            cardsPerPage === 2 ? 'grid-cols-2 grid-rows-1' :
            'grid-cols-2 grid-rows-2'
          }`}>
            {pageBoards.map((board, boardIdx) => {
              const isLarge = cardsPerPage === 1;
              const isMedium = cardsPerPage === 2;
              return (
                <div key={boardIdx} className="flex flex-col border-2 border-gray-800 rounded-2xl p-4 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className={`${isLarge ? 'text-5xl' : isMedium ? 'text-4xl' : 'text-2xl'} font-black italic uppercase tracking-tighter text-pink-600 leading-none`}>
                        {t('bingo.title')}
                      </h1>
                      <p className={`${isLarge ? 'text-sm' : 'text-[10px]'} font-bold uppercase tracking-widest text-gray-500 mt-1`}>
                        Eurovision 2026
                      </p>
                    </div>
                    <div className={`flex flex-col items-center gap-1 text-center ${isLarge ? 'max-w-[140px]' : isMedium ? 'max-w-[110px]' : 'max-w-[80px]'}`}>
                      <QRCodeSVG value={appUrl} size={isLarge ? 80 : isMedium ? 60 : 40} level="L" includeMargin={false} />
                      <span className={`${isLarge ? 'text-[9px]' : isMedium ? 'text-[7px]' : 'text-[5px]'} font-bold uppercase tracking-widest text-gray-500 leading-tight`}>
                        {t('bingo.share.playLiveAt')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1 flex-1">
                    {board.map((square, i) => {
                      const text = square.isFree ? "12" : t(`bingo.events.${square.id}`);
                      
                      // Calculate effective length to handle languages with very long words
                      const words = text.split(/[\s-]+/);
                      const maxWordLen = words.reduce((max: number, w: string) => Math.max(max, w.length), 0);
                      const effectiveLength = Math.max(text.length, maxWordLen * 2.2);

                      return (
                        <div
                          key={i}
                          className={`
                            flex items-center justify-center p-1 border-2 border-gray-300 rounded-lg text-center overflow-hidden
                            ${square.isFree ? 'bg-yellow-100 border-yellow-400' : 'bg-white'}
                          `}
                        >
                          <span className={`
                            w-full flex items-center justify-center break-words hyphens-auto
                            leading-[1.1] font-black uppercase tracking-tighter
                            ${square.isFree ? (isLarge ? 'text-5xl' : isMedium ? 'text-4xl' : 'text-xl') + ' italic text-yellow-600' : 
                              effectiveLength > 28 ? (isLarge ? 'text-[11px]' : isMedium ? 'text-[8.5px]' : 'text-[5px]') :
                              effectiveLength > 22 ? (isLarge ? 'text-xs' : isMedium ? 'text-[10px]' : 'text-[6px]') :
                              effectiveLength > 18 ? (isLarge ? 'text-sm' : isMedium ? 'text-xs' : 'text-[7px]') :
                              effectiveLength > 14 ? (isLarge ? 'text-base' : isMedium ? 'text-sm' : 'text-[8px]') :
                              effectiveLength > 10 ? (isLarge ? 'text-lg' : isMedium ? 'text-base' : 'text-[9px]') : 
                              effectiveLength > 7 ? (isLarge ? 'text-xl' : isMedium ? 'text-lg' : 'text-[10px]') :
                              (isLarge ? 'text-2xl' : isMedium ? 'text-xl' : 'text-[11px]')
                            }
                          `}>
                            {text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className={`mt-4 text-center ${isLarge ? 'text-sm' : 'text-[8px]'} font-bold uppercase tracking-widest text-gray-400`}>
                    {t('bingo.howToPlay')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
