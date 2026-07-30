import React, { useState, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEuroCards, SCRAP_VALUES, CRAFT_VALUES } from '../hooks/useEuroCards';
import { OpenedCard, CardRarity, MasterSong, EuroCard } from '../data/types';
import { setFrozenConfetti } from '../utils/confettiState';
import { openMultiplePacks } from '../utils/cards';
import { getActiveMasterData } from '../data/activeData';
import { useTranslation } from "../context/LanguageContext";
import { soundManager } from '../utils/sounds';

import { PackOpener } from './EuroCollection/PackOpener';
import { HowToPlayModal } from './HowToPlayModal';
import { CollectionGallery } from './EuroCollection/CollectionGallery';

type GroupOption = 'all' | 'rarity' | 'year' | 'country' | 'placing';
type SortOption = 'rarity' | 'song' | 'artist' | 'country' | 'placement' | 'year';

const groupLabels: Record<Exclude<GroupOption, 'all'>, string> = {
  rarity: "Rarity",
  year: "Year",
  country: "Country",
  placing: "Placing"
};

const sortLabels: Record<SortOption, string> = {
  rarity: "Rarity",
  song: "Song",
  artist: "Artist",
  country: "Country",
  placement: "Placement",
  year: "Year"
};

const getPlacingFolder = (placing: number): string => {
  if (placing >= 100) return "SF";
  return placing.toString();
};

export const EuroCollectionGame: React.FC<{ onReturn: () => void }> = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { collection, addCardsToCollection, craftCard } = useEuroCards();
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [currentPack, setCurrentPack] = useState<OpenedCard[]>([]);
  const [pendingPack, setPendingPack] = useState<OpenedCard[] | null>(null);
  const [baselineConfetti, setBaselineConfetti] = useState<number | null>(null);

  useEffect(() => {
    if (opening && baselineConfetti !== null) {
      let earnedSoFar = 0;
      revealedIndices.forEach(idx => {
        if (currentPack[idx]?.isDuplicate && currentPack[idx]?.confettiValue) {
          earnedSoFar += currentPack[idx].confettiValue!;
        }
      });
      setFrozenConfetti(baselineConfetti + earnedSoFar);
    }
  }, [revealedIndices, opening, baselineConfetti, currentPack]);

  const targetTab = (location.state as { tab?: string } | null)?.tab;

  const [showGallery, setShowGallery] = useState(() => {
    if (targetTab === 'gallery') return true;
    if (targetTab === 'packs') return false;
    return collection.availablePacks === 0;
  });

  useEffect(() => {
    if (targetTab === 'gallery') {
      setShowGallery(true);
    } else if (targetTab === 'packs') {
      setShowGallery(false);
    }
  }, [targetTab]);
  const [groupBy, setGroupBy] = useState<GroupOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rarity');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showUnowned, setShowUnowned] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('douze_points_show_unowned');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return true; // Default to true
  });

  useEffect(() => {
    localStorage.setItem('douze_points_show_unowned', showUnowned.toString());
  }, [showUnowned]);
  const [activeExpandedCardId, setActiveExpandedCardId] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [stableCardsList, setStableCardsList] = useState<{ card: EuroCard | null, song: MasterSong, isUnowned: boolean }[]>([]);
  
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem('hasSeenEuroCollectionHelp');
    if (!hasSeenHelp) {
      setShowHelp(true);
      localStorage.setItem('hasSeenEuroCollectionHelp', 'true');
    }
  }, []);
  
  const masterData = getActiveMasterData();
  const songMap = useMemo(() => {
    const map = new Map<string, MasterSong>();
    masterData.forEach(s => map.set(s.id, s));
    return map;
  }, [masterData]);

  const handleOpenPack = async (packCount: number = 1) => {
    if (collection.availablePacks < packCount || opening) return;
    
    setOpening(true);
    setErrorMsg(null);
    soundManager.play('packOpen');

    try {
      const cards = openMultiplePacks(packCount);
      let earnedConfetti = 0;
      const tempOwned = new Set(Object.keys(collection.cards || {}));
      
      cards.forEach(c => {
        if (!tempOwned.has(c.songId)) {
          tempOwned.add(c.songId);
          c.isDuplicate = false;
        } else {
          c.isDuplicate = true;
          const rarity = songMap.get(c.songId)?.rarity || CardRarity.COMMON;
          const confettiValue = SCRAP_VALUES[rarity] || 1;
          c.confettiValue = confettiValue;
          earnedConfetti += confettiValue;
        }
      });

      const initialConfetti = collection.confetti || 0;
      setBaselineConfetti(initialConfetti);
      setFrozenConfetti(initialConfetti);
      setPendingPack(cards);
      
      let duration = packCount >= 6 ? 2500 : 1000;
      if (cards.some(c => songMap.get(c.songId)?.rarity === CardRarity.LEGENDARY)) {
        duration = packCount >= 6 ? 3000 : 2000;
      } else if (cards.some(c => songMap.get(c.songId)?.rarity === CardRarity.RARE)) {
        duration = packCount >= 6 ? 2800 : 1500;
      } else if (cards.some(c => songMap.get(c.songId)?.rarity === CardRarity.UNCOMMON)) {
        duration = packCount >= 6 ? 2600 : 1200;
      }
      
      const startTime = Date.now();
      try {
        await addCardsToCollection(cards, earnedConfetti, packCount);
      } catch (err) {
        console.error("Failed to open pack:", err);
        setOpening(false);
        setPendingPack(null);
        setErrorMsg(t('error.overworked') || "Our apologies, but our servers are overworked. Please try again tomorrow. Your pack has not been used.");
        return;
      }

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(50, duration - elapsed);

      setTimeout(() => {
        setCurrentPack(cards);
        setPendingPack(null);
        setRevealedIndices([]);
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      }, remainingTime);

    } catch (err) {
      console.error("Failed to open pack:", err);
      setOpening(false);
      setErrorMsg(t('error.overworked') || "Our apologies, but our servers are overworked. Please try again tomorrow. Your pack has not been used.");
    }
  };

  const handleClosePack = () => {
    setCurrentPack([]);
    setOpening(false);
    setBaselineConfetti(null);
    setFrozenConfetti(null);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  };

  const galleryScrollRef = useRef(0);

  const handleToggleGallery = () => {
    soundManager.play('click');
    if (showGallery) {
      galleryScrollRef.current = window.scrollY;
      flushSync(() => {
        setShowGallery(false);
      });
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      flushSync(() => {
        setShowGallery(true);
      });
      window.scrollTo({ top: galleryScrollRef.current, behavior: 'instant' });
    }
  };

  const scrollPositionRef = useRef(0);

  const handleSelectFolder = (folderKey: string) => {
    soundManager.play('click');
    scrollPositionRef.current = window.scrollY;
    flushSync(() => {
      setSelectedFolder(folderKey);
      if ((sortBy as string) === (groupBy as string)) {
        setSortBy('song');
        setSortAsc(true);
      }
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleGoBack = () => {
    soundManager.play('click');
    flushSync(() => {
      setSelectedFolder(null);
    });
    window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
  };

  const getGlowColor = () => {
    if (!pendingPack) return '#E2E8F0';
    if (pendingPack.some(c => songMap.get(c.songId)?.rarity === CardRarity.LEGENDARY)) return '#FFB800';
    if (pendingPack.some(c => songMap.get(c.songId)?.rarity === CardRarity.RARE)) return '#0033FF';
    if (pendingPack.some(c => songMap.get(c.songId)?.rarity === CardRarity.UNCOMMON)) return '#00FF44';
    return '#CBD5E1';
  };

  const getAnimationDuration = () => {
    if (!pendingPack) return 1.0;
    if (pendingPack.some(c => songMap.get(c.songId)?.rarity === CardRarity.LEGENDARY)) return 2.0;
    if (pendingPack.some(c => songMap.get(c.songId)?.rarity === CardRarity.RARE)) return 1.5;
    if (pendingPack.some(c => songMap.get(c.songId)?.rarity === CardRarity.UNCOMMON)) return 1.2;
    return 1.0;
  };

  const folderData = useMemo(() => {
    if (groupBy === 'all') return null;
    const folders = new Map<string, { total: number, collected: number }>();
    
    masterData.forEach(song => {
      let key = '';
      if (groupBy === 'rarity') key = String(song.rarity || CardRarity.COMMON);
      else if (groupBy === 'year') key = String(song.year);
      else if (groupBy === 'country') key = String(song.country);
      else if (groupBy === 'placing') key = getPlacingFolder(song.placing);
      
      if (!folders.has(key)) folders.set(key, { total: 0, collected: 0 });
      folders.get(key)!.total++;
    });

    Object.keys(collection.cards).forEach((songId) => {
      const song = songMap.get(songId);
      if (song) {
        let key = '';
        if (groupBy === 'rarity') key = String(song.rarity || CardRarity.COMMON);
        else if (groupBy === 'year') key = String(song.year);
        else if (groupBy === 'country') key = String(song.country);
        else if (groupBy === 'placing') key = getPlacingFolder(song.placing);
        
        if (folders.has(key)) folders.get(key)!.collected++;
      }
    });

    return Array.from(folders.entries())
      .sort((a, b) => {
        if (groupBy === 'year') return Number(b[0]) - Number(a[0]);
        if (groupBy === 'rarity') {
          const w = { [CardRarity.LEGENDARY]: 4, [CardRarity.RARE]: 3, [CardRarity.UNCOMMON]: 2, [CardRarity.COMMON]: 1 };
          return (w[b[0] as CardRarity] || 0) - (w[a[0] as CardRarity] || 0);
        }
        if (groupBy === 'placing') {
          if (a[0] === "SF" && b[0] === "SF") return 0;
          if (a[0] === "SF") return 1;
          if (b[0] === "SF") return -1;
          return parseInt(a[0]) - parseInt(b[0]);
        }
        return a[0].localeCompare(b[0]);
      })
      .map(([key, counts]) => ({ key, ...counts }));
  }, [groupBy, masterData, collection.cards, songMap]);

  const visibleSortOptions = useMemo(() => {
    const allOpts: SortOption[] = ['rarity', 'song', 'artist', 'country', 'placement', 'year'];
    if (selectedFolder) {
      return allOpts.filter(opt => (opt as string) !== (groupBy as string));
    }
    return allOpts;
  }, [selectedFolder, groupBy]);

  const handleCraft = async (songId: string, cost: number) => {
    try {
      await craftCard(songId, cost);
    } catch {
      setErrorMsg("Failed to craft card");
    }
  };

  // Regenerate sorted cards list only when grouping, sorting, filtering, folder, or view mode changes.
  // We explicitly omit collection.cards here so that unlocking/crafting a card does not trigger immediate re-sorting,
  // which prevents the scroll state and card position from shifting unexpectedly.
  useLayoutEffect(() => {
    const freshList: { card: EuroCard | null, song: MasterSong, isUnowned: boolean }[] = [];
    
    if (groupBy === 'all' && !selectedFolder) {
      masterData.forEach(song => {
        const card = collection.cards[song.id];
        if (card) {
          freshList.push({ card, song, isUnowned: false });
        } else if (showUnowned) {
          freshList.push({ card: { obtainedAt: 0,   }, song, isUnowned: true });
        }
      });
    } else if (selectedFolder) {
      masterData.forEach(song => {
        let match = false;
        if (groupBy === 'rarity') match = (song.rarity || CardRarity.COMMON) === selectedFolder;
        else if (groupBy === 'year') match = String(song.year) === selectedFolder;
        else if (groupBy === 'country') match = String(song.country) === selectedFolder;
        else if (groupBy === 'placing') match = getPlacingFolder(song.placing) === selectedFolder;
        
        if (match) {
           const card = collection.cards[song.id];
           if (card) {
             freshList.push({ card, song, isUnowned: false });
           } else if (showUnowned) {
             freshList.push({ card: { obtainedAt: 0,   }, song, isUnowned: true });
           }
        }
      });
    }

    freshList.sort((a, b) => {
      if (a.isUnowned !== b.isUnowned) return a.isUnowned ? 1 : -1;
      
      if (sortBy === 'rarity') {
        const rarityWeight = { [CardRarity.LEGENDARY]: 4, [CardRarity.RARE]: 3, [CardRarity.UNCOMMON]: 2, [CardRarity.COMMON]: 1 };
        const rwA = rarityWeight[a.song.rarity || CardRarity.COMMON];
        const rwB = rarityWeight[b.song.rarity || CardRarity.COMMON];
        if (rwA !== rwB) return sortAsc ? rwA - rwB : rwB - rwA;
      } else if (sortBy === 'placement') {
        if (a.song.placing !== b.song.placing) {
          return sortAsc ? a.song.placing - b.song.placing : b.song.placing - a.song.placing;
        }
      } else if (sortBy === 'country') {
        const comp = a.song.country.localeCompare(b.song.country);
        if (comp !== 0) return sortAsc ? comp : -comp;
      } else if (sortBy === 'year') {
        if (b.song.year !== a.song.year) {
          return sortAsc ? a.song.year - b.song.year : b.song.year - a.song.year;
        }
      } else if (sortBy === 'song') {
        const comp = a.song.title.localeCompare(b.song.title);
        if (comp !== 0) return sortAsc ? comp : -comp;
      } else if (sortBy === 'artist') {
        const comp = a.song.artist.localeCompare(b.song.artist);
        if (comp !== 0) return sortAsc ? comp : -comp;
      }
      return a.song.title.localeCompare(b.song.title);
    });

    setStableCardsList(freshList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupBy, sortBy, sortAsc, selectedFolder, showUnowned, showGallery, masterData]);

  // Keep ownership status of items in stable list updated in place when cards are added or crafted
  useEffect(() => {
    setStableCardsList(prevList => {
      let changed = false;
      const updated = prevList.map(item => {
        const latestCard = collection.cards[item.song.id];
        if (latestCard && (item.isUnowned || item.card?.obtainedAt !== latestCard.obtainedAt)) {
          changed = true;
          return {
            ...item,
            card: latestCard,
            isUnowned: false
          };
        }
        return item;
      });
      return changed ? updated : prevList;
    });
  }, [collection.cards]);

  const handleGroupChange = (opt: Exclude<GroupOption, 'all'>) => {
    soundManager.play('click');
    const prevScroll = window.scrollY;
    flushSync(() => {
      if (groupBy === opt) {
        setGroupBy('all');
      } else {
        setGroupBy(opt);
      }
      setSelectedFolder(null);
    });
    window.scrollTo({ top: prevScroll, behavior: 'instant' });
  };

  const handleSortChange = (opt: SortOption) => {
    soundManager.play('click');
    const prevScroll = window.scrollY;
    flushSync(() => {
      if (sortBy === opt) {
        setSortAsc(prev => !prev);
      } else {
        setSortBy(opt);
        if (opt === 'rarity' || opt === 'year') {
          setSortAsc(false);
        } else {
          setSortAsc(true);
        }
      }
    });
    window.scrollTo({ top: prevScroll, behavior: 'instant' });
  };

  const handleSetShowUnowned = (val: boolean | ((prev: boolean) => boolean)) => {
    soundManager.play('click');
    const prevScroll = window.scrollY;
    flushSync(() => {
      setShowUnowned(val);
    });
    window.scrollTo({ top: prevScroll, behavior: "instant" });
  };

  return (
    <div className="flex flex-col items-center pt-2 sm:pt-6 pb-24 md:pb-32 px-1 sm:px-4 w-full max-w-6xl mx-auto overflow-x-hidden relative">
      {/* Background Watermark */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.015]">
        <img src="/favicon.svg" alt="" className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] -rotate-12 blur-sm grayscale" />
      </div>
      <div className="w-full flex flex-col items-center justify-center mb-4 relative z-10">
        <div className="flex items-center gap-2 mb-4 justify-center relative">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter text-center m-0">
            {t('eurocollection.title')}
          </h1>
          <button 
            onClick={() => setShowHelp(true)}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <span className="font-black text-sm md:text-base">?</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleToggleGallery} 
            className="px-6 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-black uppercase tracking-widest transition-colors relative cursor-pointer"
          >
            {showGallery ? t('eurocollection.openPacks') : t('eurocollection.viewGallery')}
            {showGallery && collection.availablePacks > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-pink-500 text-white text-[8px] font-black">{collection.availablePacks}</span>
            )}
          </button>
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col relative z-10">
        {!showGallery ? (
          <PackOpener 
            collection={collection}
            opening={opening}
            currentPack={currentPack}
            revealedIndices={revealedIndices}
            songMap={songMap}
            getGlowColor={getGlowColor}
            getAnimationDuration={getAnimationDuration}
            handleOpenPack={handleOpenPack}
            handleClosePack={handleClosePack}
            setRevealedIndices={setRevealedIndices}
            t={t}
          />
        ) : (
          <CollectionGallery 
            collection={collection}
            groupBy={groupBy}
            sortBy={sortBy}
            sortAsc={sortAsc}
            selectedFolder={selectedFolder}
            showUnowned={showUnowned}
            activeExpandedCardId={activeExpandedCardId}
            renderedCards={stableCardsList}
            masterData={masterData}
            folderData={folderData}
            visibleSortOptions={visibleSortOptions}
            groupLabels={groupLabels}
            sortLabels={sortLabels}
            handleGoBack={handleGoBack}
            handleSelectFolder={handleSelectFolder}
            handleGroupChange={handleGroupChange}
            handleSortChange={handleSortChange}
            setShowUnowned={handleSetShowUnowned}
            handleCraft={handleCraft}
            setActiveExpandedCardId={setActiveExpandedCardId}
            t={t}
            craftValues={CRAFT_VALUES}
          />
        )}
      </main>

      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setErrorMsg(null); }}
            className="fixed inset-0 top-12 md:top-16 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500" />
              <div className="w-16 h-16 rounded-full bg-red-500/20 mx-auto flex items-center justify-center mb-6">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Oops!</h3>
              <p className="text-red-200/80 font-medium mb-4 leading-relaxed">
                {errorMsg}
              </p>
              <button
                onClick={() => setErrorMsg(null)}
                className="px-8 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-100 font-black tracking-widest uppercase rounded-full transition-all cursor-pointer"
              >
                Understood
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <HowToPlayModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
        title={t("eurocollection.title")} 
        rules={t("eurocollection.howToPlay")} 
      />
    </div>
  );
};

export default EuroCollectionGame;
