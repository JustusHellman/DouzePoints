import { MASTER_DATA as MASTER_DATA_BASE } from '../data/fullMasterData';
import { MASTER_DATA as MASTER_DATA_2026 } from '../data/fullMasterData-2026';
import { MasterSong } from '../data/types';

export interface DataVersion {
  timestamp: number; // The UTC timestamp in milliseconds when this data should become active
  data: MasterSong[];
}

// How to add a new database:
// 1. Add your new file to the data folder (e.g., fullMasterData-2026.ts).
// 2. Import it at the top of this file: 
//    import { MASTER_DATA as MASTER_DATA_2026 } from '../data/fullMasterData-2026';
// 3. Add an entry to the MASTER_DATA_VERSIONS array below.
// 4. Ensure the array is sorted chronologically, but the getter handles it anyway.

export const MASTER_DATA_VERSIONS: DataVersion[] = [
  {
    timestamp: 0, // Fallback database, always active if no other matches
    data: MASTER_DATA_BASE,
  },
  {
    timestamp: Date.UTC(2026, 6, 4, 0, 0, 0), // July 4, 2026 at 00:00:00 GMT
    data: MASTER_DATA_2026
  }
];
