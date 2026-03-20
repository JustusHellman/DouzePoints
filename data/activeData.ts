import { MASTER_DATA as NEW_MASTER_DATA } from './fullMasterData';
import { MasterSong } from './types';

export const SEARCH_WEIGHT_THRESHOLD = 70;

export const getActiveMasterData = (): MasterSong[] => {
  return NEW_MASTER_DATA;
};
