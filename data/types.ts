export enum GameType {
  WORD_GAME = 'WORD_GAME',
  ARTIST_WORD_GAME = 'ARTIST_WORD_GAME',
  LINKS_GAME = 'LINKS_GAME',
  GUESSER = 'GUESSER',
  ARENA = 'ARENA',
  REFRAIN_GAME = 'REFRAIN_GAME'
}

export interface DetailedStats {
  played: number;
  wins: number;
  perfectGames: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
  lastPlayed: string;
}

export interface GlobalStats {
  word_game: DetailedStats;
  artists: DetailedStats;
  links: DetailedStats;
  guesser: DetailedStats;
  arena: DetailedStats;
  refrain: DetailedStats;
  totalPoints: number;
  totalDouzePoints: number; 
}

export interface ConnectionsGroup {
  category: string;
  items: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface LyricSnippet {
  id: string;
  title: string;
  artist: string;
  words: string[]; // Exactly 4 words
  tier: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface MasterSong {
  id: string;
  title: string;
  artist: string;
  year: number;
  placing: number;
  country: string;
  sex: 'Male' | 'Female' | 'Mixed' | 'Other';
  genre: string;
  members: number;
  fact: string;
  youtubeId?: string;
  tier?: 'golden' | 'cult';
  weight?: number;
  weightModifiers?: string[];
}

export type ArenaSong = MasterSong;
export type GuesserSong = MasterSong;
export type WordleSong = MasterSong;

export enum InfinitePlacement {
  ALL = 'all',
  WINNERS = 'winners',
  TOP3 = 'top3',
  TOP5 = 'top5',
  TOP10 = 'top10',
  TOP15 = 'top15',
  FINALISTS = 'finalists'
}

export enum InfiniteYear {
  ALL = 'all',
  Y2021 = '2021',
  Y2010 = '2010',
  Y2000 = '2000',
  Y1956 = '1956'
}

export interface InfiniteDifficulty {
  placement: InfinitePlacement;
  year: InfiniteYear;
}

export interface InfiniteGameState {
  currentScore: number;
  currentStreak: number;
  shuffledIds: string[];
  currentIndex: number;
  isGameOver: boolean;
  guesses?: string[];
  lastResult?: {
    points: number;
    won: boolean;
  };
}

export interface InfiniteRecord {
  bestScore: number;
  bestStreak: number;
  mastered?: boolean;
}

export type InfiniteRecords = Record<string, InfiniteRecord>; // key: `${gameId}_${difficulty}`
