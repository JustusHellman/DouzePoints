import { MASTER_DATA_VERSIONS } from '../config/masterDataConfig';
import { MasterSong, LyricSnippet } from './types';
import { REFRAIN_POOL as OLD_REFRAIN_POOL } from './refrainData';
import { REFRAIN_DATA_V2 } from './refrainData-v2';
import { FEATURE_FLAGS } from '../config/featureFlags';

export const SEARCH_WEIGHT_THRESHOLD = 70;

export const getActiveMasterData = (): MasterSong[] => {
  const currentTimestamp = Date.now();
  
  // Sort versions by timestamp descending so the most recent valid timeline is checked first
  const sortedVersions = [...MASTER_DATA_VERSIONS].sort((a, b) => b.timestamp - a.timestamp);
  
  // Find the first version whose timestamp has passed
  for (const version of sortedVersions) {
    if (currentTimestamp >= version.timestamp) {
      return version.data;
    }
  }
  
  // Fallback to the first version (which has timestamp 0) if somehow nothing matches
  return MASTER_DATA_VERSIONS[0].data;
};

export const getActiveRefrainData = (): LyricSnippet[] => {
  const isNewDataEnabled = Date.now() >= FEATURE_FLAGS.NEW_REFRAIN_DATA_SWAP_TIMESTAMP;
  return isNewDataEnabled ? REFRAIN_DATA_V2 : OLD_REFRAIN_POOL;
};
