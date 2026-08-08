import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { ArrowLeft, Package, Search, X } from 'lucide-react';
import { UserCollection, EuroCard, MasterSong, CardRarity } from '../../data/types';
import { FolderCard } from './FolderCard';
import { VirtualCardWrapper } from './VirtualCardWrapper';

type GroupOption = 'all' | 'rarity' | 'year' | 'country' | 'placing';
type SortOption = 'rarity' | 'song' | 'artist' | 'country' | 'placement' | 'year';

interface CollectionGalleryProps {
  collection: UserCollection;
  groupBy: GroupOption;
  sortBy: SortOption;
  sortAsc: boolean;
  selectedFolder: string | null;
  showUnowned: boolean;
  activeExpandedCardId: string | null;
  renderedCards: { card: EuroCard | null; song: MasterSong; isUnowned: boolean }[];
  masterData: MasterSong[];
  folderData: { key: string; total: number; collected: number }[] | null;
  visibleSortOptions: SortOption[];
  groupLabels: Record<Exclude<GroupOption, 'all'>, string>;
  sortLabels: Record<SortOption, string>;
  handleGoBack: () => void;
  handleSelectFolder: (key: string) => void;
  handleGroupChange: (opt: Exclude<GroupOption, 'all'>) => void;
  handleSortChange: (opt: SortOption) => void;
  setShowUnowned: (u: boolean) => void;
  handleCraft: (songId: string, cost: number) => void;
  setActiveExpandedCardId: (id: string | null) => void;
  t: (key: string) => string;
  craftValues: Record<string, number>;
}

export const CollectionGallery: React.FC<CollectionGalleryProps> = ({
  collection,
  groupBy,
  sortBy,
  sortAsc,
  selectedFolder,
  showUnowned,
  activeExpandedCardId,
  renderedCards,
  masterData,
  folderData,
  visibleSortOptions,
  groupLabels,
  sortLabels,
  handleGoBack,
  handleSelectFolder,
  handleGroupChange,
  handleSortChange,
  setShowUnowned,
  handleCraft,
  setActiveExpandedCardId,
  t,
  craftValues,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevSearchTopRef = useRef<number | null>(null);

  const captureSearchPosition = () => {
    if (searchContainerRef.current) {
      prevSearchTopRef.current = searchContainerRef.current.getBoundingClientRect().top;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    captureSearchPosition();
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    captureSearchPosition();
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus({ preventScroll: true });
    }
  };

  useLayoutEffect(() => {
    if (prevSearchTopRef.current !== null && searchContainerRef.current) {
      const currentTop = searchContainerRef.current.getBoundingClientRect().top;
      const delta = currentTop - prevSearchTopRef.current;
      if (Math.abs(delta) > 0.5) {
        window.scrollBy({ top: delta, behavior: 'instant' });
      }
      prevSearchTopRef.current = null;
    }
  });

  const searchMatchedCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const sourceSongs = selectedFolder 
      ? masterData.filter(song => {
          if (groupBy === 'rarity') return (song.rarity || CardRarity.COMMON) === selectedFolder;
          if (groupBy === 'year') return String(song.year) === selectedFolder;
          if (groupBy === 'country') return String(song.country) === selectedFolder;
          if (groupBy === 'placing') {
            const pl = song.placing >= 100 ? "SF" : String(song.placing);
            return pl === selectedFolder;
          }
          return true;
        })
      : masterData;

    const matches: { card: EuroCard | null; song: MasterSong; isUnowned: boolean }[] = [];

    sourceSongs.forEach(song => {
      const isMatch = 
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.country.toLowerCase().includes(q) ||
        String(song.year).includes(q) ||
        (song.genre && song.genre.toLowerCase().includes(q)) ||
        (song.rarity && song.rarity.toLowerCase().includes(q)) ||
        (song.fact && song.fact.toLowerCase().includes(q)) ||
        String(song.placing).includes(q);

      if (isMatch) {
        const card = collection.cards[song.id];
        if (card) {
          matches.push({ card, song, isUnowned: false });
        } else if (showUnowned) {
          matches.push({ card: { obtainedAt: 0 }, song, isUnowned: true });
        }
      }
    });

    matches.sort((a, b) => {
      if (a.isUnowned !== b.isUnowned) return a.isUnowned ? 1 : -1;
      if (sortBy === 'rarity') {
        const rarityWeight = { [CardRarity.LEGENDARY]: 4, [CardRarity.RARE]: 3, [CardRarity.UNCOMMON]: 2, [CardRarity.COMMON]: 1 };
        const rwA = rarityWeight[a.song.rarity || CardRarity.COMMON];
        const rwB = rarityWeight[b.song.rarity || CardRarity.COMMON];
        if (rwA !== rwB) return sortAsc ? rwA - rwB : rwB - rwA;
      } else if (sortBy === 'placement') {
        if (a.song.placing !== b.song.placing) return sortAsc ? a.song.placing - b.song.placing : b.song.placing - a.song.placing;
      } else if (sortBy === 'country') {
        const comp = a.song.country.localeCompare(b.song.country);
        if (comp !== 0) return sortAsc ? comp : -comp;
      } else if (sortBy === 'year') {
        if (b.song.year !== a.song.year) return sortAsc ? a.song.year - b.song.year : b.song.year - a.song.year;
      } else if (sortBy === 'song') {
        const comp = a.song.title.localeCompare(b.song.title);
        if (comp !== 0) return sortAsc ? comp : -comp;
      } else if (sortBy === 'artist') {
        const comp = a.song.artist.localeCompare(b.song.artist);
        if (comp !== 0) return sortAsc ? comp : -comp;
      }
      return a.song.title.localeCompare(b.song.title);
    });

    return matches;
  }, [searchQuery, masterData, selectedFolder, groupBy, collection.cards, showUnowned, sortBy, sortAsc]);

  const cardsToRender = searchMatchedCards !== null ? searchMatchedCards : renderedCards;

  return (
    <div className="w-full flex flex-col animate-fade-in min-h-[85vh] px-2 sm:px-0">
      <div className="flex flex-col mb-8 gap-5 border-b border-white/10 pb-6 min-w-0 max-w-full">
        <div className="flex flex-col gap-3 min-w-0 w-full">
          {selectedFolder ? (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 min-w-0 w-full">
              <button 
                onClick={handleGoBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all select-none shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('common.back')}</span>
              </button>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-white uppercase break-words max-w-full">
                  {selectedFolder}
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col min-w-0 w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white">
                {t('eurocollection.yourCollection')}
              </h2>
            </div>
          )}
          {!selectedFolder && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 font-medium mt-1">
              <span className="bg-black/40 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-xl text-indigo-300 font-black tracking-wider text-xs uppercase flex items-center gap-1.5">
                <span className="text-white text-sm font-black">{Object.keys(collection.cards).length} / {masterData.length}</span> {t('eurocollection.cards')}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-start gap-3 w-full pt-2 border-t border-white/5">
          {/* Search bar */}
          <div ref={searchContainerRef} className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input 
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t('eurocollection.searchPlaceholder') || "Search by song, artist, country, year..."}
              className="w-full bg-[#121222] border border-white/10 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 max-w-full">
            {!selectedFolder && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-[#121222] p-1.5 rounded-xl border border-white/5 max-w-full">
                <span className="text-[10px] font-bold text-slate-500 uppercase px-2 shrink-0">{t('eurocollection.group')}</span>
                <div className="flex items-center flex-wrap gap-1 max-w-full">
                  {(['rarity', 'year', 'country', 'placing'] as Exclude<GroupOption, 'all'>[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleGroupChange(opt)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                        groupBy === opt 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {groupLabels[opt]}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {(groupBy === 'all' || selectedFolder || searchQuery.trim() !== '') && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-[#121222] p-1.5 rounded-xl border border-white/5 max-w-full">
                <span className="text-[10px] font-bold text-slate-500 uppercase px-2 shrink-0">{t('eurocollection.sort')}</span>
                <div className="flex items-center flex-wrap gap-1 max-w-full">
                  {visibleSortOptions.map((opt) => {
                    const isActive = sortBy === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSortChange(opt)}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-0.5 cursor-pointer ${
                          isActive 
                            ? 'bg-pink-600 text-white shadow-lg' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{sortLabels[opt]}</span>
                        <span 
                          className={`text-[11px] font-black w-3 text-center select-none inline-block transition-all ${
                            isActive ? 'text-white opacity-100 scale-100' : 'text-transparent opacity-0 scale-75'
                          }`}
                        >
                          {isActive ? (sortAsc ? '↑' : '↓') : '↑'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {(selectedFolder || groupBy === 'all' || searchQuery.trim() !== '') && (
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 transition-all select-none">
                <input 
                  type="checkbox" 
                  checked={showUnowned}
                  onChange={(e) => setShowUnowned(e.target.checked)}
                  className="form-checkbox bg-transparent border-slate-500 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('eurocollection.showUnowned')}</span>
              </label>
            </div>
          )}
        </div>
      </div>
      
      {/* Gallery / Search Results view */}
      {searchQuery.trim() !== '' ? (
        cardsToRender && cardsToRender.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-3xl">
            <Search className="w-12 h-12 mb-4 opacity-40 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">{t('eurocollection.noSearchResults') || 'No cards found matching your search.'}</h3>
            <p className="text-xs text-slate-500 mb-4">"{searchQuery}"</p>
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              {t('eurocollection.clearSearch') || 'Clear Search'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
            {cardsToRender!.map((item) => {
              const cost = craftValues[item.song.rarity || CardRarity.COMMON] || 5;
              const canCraft = collection.confetti >= cost;
              const isExpanded = activeExpandedCardId === item.song.id;
              return (
                <VirtualCardWrapper 
                  key={item.song.id} 
                  item={item}
                  layoutIdPrefix="search" 
                  onCraft={handleCraft}
                  craftCost={cost}
                  canCraft={canCraft}
                  isExpanded={isExpanded}
                  onExpandedChange={(expanded) => {
                    if (expanded) {
                      setActiveExpandedCardId(item.song.id);
                    } else {
                      setActiveExpandedCardId(null);
                    }
                  }}
                />
              );
            })}
          </div>
        )
      ) : groupBy !== 'all' && !selectedFolder && folderData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
          {folderData.map((folder) => (
            <FolderCard 
              key={folder.key}
              folder={folder}
              groupBy={groupBy as 'rarity' | 'year' | 'country' | 'placing'}
              masterData={masterData}
              onSelectFolder={handleSelectFolder}
            />
          ))}
        </div>
      ) : (
        renderedCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500 border-2 border-dashed border-white/5 rounded-3xl">
            <Package className="w-16 h-16 mb-6 opacity-40" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">{t('eurocollection.noCardsFound')}</h3>
            {selectedFolder ? (
              <p className="mt-4 text-center px-6">{t('eurocollection.noCardsInCategory')}</p>
            ) : (
              <p className="mt-4 text-center px-6">{t('eurocollection.goOpenPacks')}</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
            {renderedCards.map((item) => {
              const cost = craftValues[item.song.rarity || CardRarity.COMMON] || 5;
              const canCraft = collection.confetti >= cost;
              const isExpanded = activeExpandedCardId === item.song.id;
              return (
                <VirtualCardWrapper 
                  key={item.song.id} 
                  item={item}
                  layoutIdPrefix="grid" 
                  onCraft={handleCraft}
                  craftCost={cost}
                  canCraft={canCraft}
                  isExpanded={isExpanded}
                  onExpandedChange={(expanded) => {
                    if (expanded) {
                      setActiveExpandedCardId(item.song.id);
                    } else {
                      setActiveExpandedCardId(null);
                    }
                  }}
                />
              );
            })}
          </div>
        )
      )}
    </div>
  );
};
export default CollectionGallery;
