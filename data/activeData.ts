import { FEATURE_FLAGS } from '../config/featureFlags';
import { MASTER_DATA as OLD_MASTER_DATA } from './masterData';
import { MASTER_DATA as NEW_MASTER_DATA } from './fullMasterData';
import { MasterSong } from './types';

export const SEARCH_WEIGHT_THRESHOLD = 70;

export const isNewDatabaseActive = (dateStr?: string) => {
  if (dateStr) {
    // If a specific date string is provided (e.g. '2027-03-24'), parse it as UTC
    const date = new Date(`${dateStr}T00:00:00Z`);
    return date.getTime() >= FEATURE_FLAGS.NEW_DATABASE_SWAP_TIMESTAMP;
  }
  return Date.now() >= FEATURE_FLAGS.NEW_DATABASE_SWAP_TIMESTAMP;
};

export const getActiveMasterData = (dateStr?: string): MasterSong[] => {
  if (isNewDatabaseActive(dateStr)) {
    return NEW_MASTER_DATA;
  }
  return OLD_MASTER_DATA;
};
