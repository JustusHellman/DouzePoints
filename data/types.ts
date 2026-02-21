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
  tier: 'golden' | 'cult';
}

export type ArenaSong = MasterSong;
export type GuesserSong = MasterSong;
export type WordleSong = MasterSong;