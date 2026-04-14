import { TranslationSchema } from '../types.ts';
import common from './common.ts';
import home from './home.ts';
import games from './games.ts';
import howToPlay from './howToPlay.ts';
import stats from './stats.ts';
import metadata from './metadata.ts';
import pages from './pages.ts';
import bingo from './bingo.ts';

export const fi: TranslationSchema = {
  ...common,
  ...home,
  ...games,
  ...howToPlay,
  ...stats,
  ...metadata,
  ...pages,
  ...bingo
};
