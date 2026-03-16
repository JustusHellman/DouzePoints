import React, { useState } from 'react';
import { GameType } from '../data/types';
import { MASTER_DATA } from '../data/masterData';
import EuroWordGame from './wordGame/EuroWordGame';
import EuroGuess from './guesser/EuroGuess';
import EuroArena from './arena/EuroArena';

interface BonusGameWrapperProps {
  gameType: 'euro-song' | 'euro-artist' | 'euro-guess' | 'euro-arena';
  onReturn: () => void;
}

const BONUS_CUTOFF = 50;

const BonusGameWrapper: React.FC<BonusGameWrapperProps> = ({ gameType, onReturn }) => {
  const [randomSong] = useState(() => {
    const bonusPool = MASTER_DATA.filter(s => (s.weight || 0) < BONUS_CUTOFF);
    if (bonusPool.length === 0) return MASTER_DATA[Math.floor(Math.random() * MASTER_DATA.length)];
    return bonusPool[Math.floor(Math.random() * bonusPool.length)];
  });

  if (gameType === 'euro-song') {
    return (
      <EuroWordGame 
        onReturn={onReturn} 
        data={MASTER_DATA} 
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
        data={MASTER_DATA} 
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
        data={MASTER_DATA} 
        bonusSong={randomSong}
      />
    );
  }

  if (gameType === 'euro-arena') {
    return (
      <EuroArena 
        onReturn={onReturn} 
        data={MASTER_DATA} 
        bonusSong={randomSong}
      />
    );
  }

  return null;
};

export default BonusGameWrapper;
