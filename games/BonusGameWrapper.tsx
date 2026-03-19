import React, { useState } from 'react';
import { GameType } from '../data/types';
import { getActiveMasterData } from '../data/activeData';
import EuroWordGame from './wordGame/EuroWordGame';
import EuroGuess from './guesser/EuroGuess';
import EuroArena from './arena/EuroArena';

interface BonusGameWrapperProps {
  gameType: 'euro-song' | 'euro-artist' | 'euro-guess' | 'euro-arena';
  onReturn: () => void;
}

const BONUS_CUTOFF = 50;

const BonusGameWrapper: React.FC<BonusGameWrapperProps> = ({ gameType, onReturn }) => {
  const activeData = getActiveMasterData();
  const [randomSong] = useState(() => {
    const bonusPool = activeData.filter(s => (s.weight || 0) < BONUS_CUTOFF);
    if (bonusPool.length === 0) return activeData[Math.floor(Math.random() * activeData.length)];
    return bonusPool[Math.floor(Math.random() * bonusPool.length)];
  });

  if (gameType === 'euro-song') {
    return (
      <EuroWordGame 
        onReturn={onReturn} 
        data={activeData} 
        gameType={GameType.WORD_GAME} 
        gameId="bonus" 
        title="EuroSong" 
        bonusSong={randomSong}
      />
    );
  }

  if (gameType === 'euro-artist') {
    return (
      <EuroWordGame 
        onReturn={onReturn} 
        data={activeData} 
        gameType={GameType.ARTIST_WORD_GAME} 
        gameId="bonus" 
        title="EuroArtist" 
        bonusSong={randomSong}
      />
    );
  }

  if (gameType === 'euro-guess') {
    return (
      <EuroGuess 
        onReturn={onReturn} 
        data={activeData} 
        bonusSong={randomSong}
      />
    );
  }

  if (gameType === 'euro-arena') {
    return (
      <EuroArena 
        onReturn={onReturn} 
        data={activeData} 
        bonusSong={randomSong}
      />
    );
  }

  return null;
};

export default BonusGameWrapper;
