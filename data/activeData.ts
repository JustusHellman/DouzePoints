import { MASTER_DATA as NEW_MASTER_DATA } from './fullMasterData';
import { MasterSong, LyricSnippet } from './types';
import { REFRAIN_POOL as OLD_REFRAIN_POOL } from './refrainData';
import { REFRAIN_DATA_V2 } from './refrainData-v2';
import { FEATURE_FLAGS } from '../config/featureFlags';

export const SEARCH_WEIGHT_THRESHOLD = 70;

export const getActiveMasterData = (): MasterSong[] => {
  return NEW_MASTER_DATA;
};

export const getActiveRefrainData = (): LyricSnippet[] => {
  const isNewDataEnabled = Date.now() >= FEATURE_FLAGS.NEW_REFRAIN_DATA_SWAP_TIMESTAMP;
  return isNewDataEnabled ? REFRAIN_DATA_V2 : OLD_REFRAIN_POOL;
};
