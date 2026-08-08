import { getActiveMasterData, SEARCH_WEIGHT_THRESHOLD } from '../data/activeData.ts';
import { MasterSong, ConnectionsGroup } from '../data/types.ts';
import { FEATURE_FLAGS } from '../config/featureFlags.ts';
import { PUZZLES as LEGACY_PUZZLES } from '../data/linksgameData.ts';
import { getDailyIndex, getDayString } from './daily.ts';

// Simple seedable random number generator
export class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export interface CategoryDefinition {
  family: 'country' | 'placing' | 'act' | 'genre' | 'era' | 'title';
  name: string;
  filter: (s: MasterSong) => boolean;
  score: number; // 1 to 100 difficulty rating for smart tiering
}

const COUNTRY_DIFFICULTY_SCORES: Record<string, number> = {
  Sweden: 15,
  'United Kingdom': 15,
  Ireland: 18,
  Italy: 18,
  Norway: 20,
  Finland: 20,
  France: 20,
  Ukraine: 22,
  Germany: 22,
  Spain: 25,
  Greece: 35,
  Netherlands: 35,
  Denmark: 40,
  Belgium: 40,
  Iceland: 40,
  Switzerland: 40,
  Australia: 42,
  Israel: 45,
  Austria: 45,
  Portugal: 45,
  Russia: 35,
  Turkey: 40,
  Croatia: 60,
  Serbia: 60,
  Cyprus: 60,
  Poland: 62,
  Estonia: 65,
  Latvia: 65,
  Lithuania: 65,
  Malta: 65,
  Moldova: 68,
  Romania: 70,
  Bulgaria: 70,
  Hungary: 72,
  Slovenia: 75,
  Azerbaijan: 60,
  Armenia: 62,
  Luxembourg: 80,
  'San Marino': 85,
  Andorra: 90,
  Monaco: 90,
  Montenegro: 88,
  'North Macedonia': 88,
  Slovakia: 90,
  Belarus: 85,
  'Bosnia & Herzegovina': 80,
  Georgia: 85,
  Albania: 78,
  Czechia: 80
};

export const getCategoryDefinitions = (songs: MasterSong[]): CategoryDefinition[] => {
  const definitions: CategoryDefinition[] = [];

  // Pre-calculate the last place (maximum placing < 100) for each Grand Final year
  const maxPlacingPerYear = new Map<number, number>();
  songs.forEach(s => {
    if (s.placing && s.placing < 100) {
      const currentMax = maxPlacingPerYear.get(s.year) || 0;
      if (s.placing > currentMax) {
        maxPlacingPerYear.set(s.year, s.placing);
      }
    }
  });

  // Pre-calculate country's first winning year
  const firstWinYearPerCountry = new Map<string, number>();
  songs.forEach(s => {
    if (s.placing === 1 && s.country) {
      const c = s.country.toLowerCase();
      const current = firstWinYearPerCountry.get(c);
      if (current === undefined || s.year < current) {
        firstWinYearPerCountry.set(c, s.year);
      }
    }
  });

  // Eurovision host countries by year
  const HOST_COUNTRIES_BY_YEAR: Record<number, string> = {
    1956: 'Switzerland',
    1957: 'Germany',
    1958: 'Netherlands',
    1959: 'France',
    1960: 'United Kingdom',
    1961: 'France',
    1962: 'Luxembourg',
    1963: 'United Kingdom',
    1964: 'Denmark',
    1965: 'Italy',
    1966: 'Luxembourg',
    1967: 'Austria',
    1968: 'United Kingdom',
    1969: 'Spain',
    1970: 'Netherlands',
    1971: 'Ireland',
    1972: 'United Kingdom',
    1973: 'Luxembourg',
    1974: 'United Kingdom',
    1975: 'Sweden',
    1976: 'Netherlands',
    1977: 'United Kingdom',
    1978: 'France',
    1979: 'Israel',
    1980: 'Netherlands',
    1981: 'Ireland',
    1982: 'United Kingdom',
    1983: 'Germany',
    1984: 'Luxembourg',
    1985: 'Sweden',
    1986: 'Norway',
    1987: 'Belgium',
    1988: 'Ireland',
    1989: 'Switzerland',
    1990: 'Yugoslavia',
    1991: 'Italy',
    1992: 'Sweden',
    1993: 'Ireland',
    1994: 'Ireland',
    1995: 'Ireland',
    1996: 'Norway',
    1997: 'Ireland',
    1998: 'United Kingdom',
    1999: 'Israel',
    2000: 'Sweden',
    2001: 'Denmark',
    2002: 'Estonia',
    2003: 'Latvia',
    2004: 'Turkey',
    2005: 'Ukraine',
    2006: 'Greece',
    2007: 'Finland',
    2008: 'Serbia',
    2009: 'Russia',
    2010: 'Norway',
    2011: 'Germany',
    2012: 'Azerbaijan',
    2013: 'Sweden',
    2014: 'Denmark',
    2015: 'Austria',
    2016: 'Sweden',
    2017: 'Ukraine',
    2018: 'Portugal',
    2019: 'Israel',
    2021: 'Netherlands',
    2022: 'Italy',
    2023: 'United Kingdom',
    2024: 'Sweden',
    2025: 'Switzerland'
  };

  // 1. Country Categories
  const countryCounts = new Map<string, number>();
  songs.forEach(s => {
    if (s.country) {
      countryCounts.set(s.country, (countryCounts.get(s.country) || 0) + 1);
    }
  });

  countryCounts.forEach((count, country) => {
    if (count >= 4) {
      const score = COUNTRY_DIFFICULTY_SCORES[country] || 50;
      definitions.push({
        family: 'country',
        name: `Represented ${country}`,
        filter: (s: MasterSong) => s.country?.toLowerCase() === country.toLowerCase(),
        score
      });
    }
  });

  // 2. Placing / Result Categories (Distinct non-overlapping result buckets)
  definitions.push(
    {
      family: 'placing',
      name: 'Eurovision Winners',
      filter: (s: MasterSong) => s.placing === 1,
      score: 15
    },
    {
      family: 'placing',
      name: "Country's First Win",
      filter: (s: MasterSong) =>
        s.placing === 1 &&
        Boolean(s.country) &&
        s.year === firstWinYearPerCountry.get(s.country.toLowerCase()),
      score: 45 // Medium tier
    },
    {
      family: 'placing',
      name: 'Grand Final Runners-Up (2nd Place)',
      filter: (s: MasterSong) => s.placing === 2,
      score: 65 // Hard tier
    },
    {
      family: 'placing',
      name: '3rd Place in Grand Final',
      filter: (s: MasterSong) => s.placing === 3,
      score: 70 // Hard tier
    },
    {
      family: 'placing',
      name: 'Last Place in Grand Final',
      filter: (s: MasterSong) =>
        s.placing !== undefined &&
        s.placing < 100 &&
        s.placing === maxPlacingPerYear.get(s.year),
      score: 80 // Expert tier
    },
    {
      family: 'placing',
      name: 'Host Country Entries',
      filter: (s: MasterSong) => {
        const host = HOST_COUNTRIES_BY_YEAR[s.year];
        if (!host || !s.country) return false;
        const c = s.country.toLowerCase();
        const h = host.toLowerCase();
        return (
          c === h ||
          (h === 'netherlands' && c === 'the netherlands') ||
          (h === 'germany' && c === 'west germany')
        );
      },
      score: 85 // Expert tier
    },
    {
      family: 'placing',
      name: 'Non-Qualifiers (Eliminated in Semi)',
      filter: (s: MasterSong) => s.placing >= 100,
      score: 90 // Expert tier
    }
  );

  // 3. Act Structure / Performer Type Categories
  definitions.push(
    {
      family: 'act',
      name: 'Solo Female Performers',
      filter: (s: MasterSong) => s.sex === 'Female' && s.members === 1,
      score: 40
    },
    {
      family: 'act',
      name: 'Solo Male Performers',
      filter: (s: MasterSong) => s.sex === 'Male' && s.members === 1,
      score: 40
    },
    {
      family: 'act',
      name: 'Duos',
      filter: (s: MasterSong) => s.members === 2,
      score: 40
    },
    {
      family: 'act',
      name: 'Bands & Groups (3+ Members)',
      filter: (s: MasterSong) => s.members >= 3,
      score: 45
    },
    {
      family: 'act',
      name: 'Mixed-Gender Acts',
      filter: (s: MasterSong) => s.sex === 'Mixed',
      score: 60
    },
    {
      family: 'act',
      name: 'Collaborations & Featuring Acts',
      filter: (s: MasterSong) =>
        s.artist.includes(' feat.') ||
        s.artist.includes(' ft.') ||
        /\bAND\b/i.test(s.artist) ||
        /\bX\b/i.test(s.artist) ||
        /\bWITH\b/i.test(s.artist),
      score: 75
    }
  );

  // 4. Genre Categories
  definitions.push(
    {
      family: 'genre',
      name: 'Pop Songs',
      filter: (s: MasterSong) =>
        Boolean(s.genre?.toLowerCase().includes('pop')) &&
        !s.genre?.toLowerCase().includes('rock') &&
        !s.genre?.toLowerCase().includes('dance'),
      score: 20
    },
    {
      family: 'genre',
      name: 'Dance & Electronic Songs',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('dance') ||
            s.genre?.toLowerCase().includes('electronic') ||
            s.genre?.toLowerCase().includes('edm') ||
            s.genre?.toLowerCase().includes('synth') ||
            s.genre?.toLowerCase().includes('eurodance')
        ),
      score: 35
    },
    {
      family: 'genre',
      name: 'Rock & Heavy Metal Songs',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('rock') ||
            s.genre?.toLowerCase().includes('metal')
        ),
      score: 30
    },
    {
      family: 'genre',
      name: 'Folk & Ethno Songs',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('folk') ||
            s.genre?.toLowerCase().includes('ethno') ||
            s.genre?.toLowerCase().includes('traditional')
        ),
      score: 50
    },
    {
      family: 'genre',
      name: 'Power Ballads & Chansons',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('power ballad') ||
            s.genre?.toLowerCase().includes('chanson')
        ),
      score: 60
    },
    {
      family: 'genre',
      name: 'Acoustic & Soft Ballads',
      filter: (s: MasterSong) =>
        Boolean(s.genre?.toLowerCase().includes('acoustic')),
      score: 65
    },
    {
      family: 'genre',
      name: 'Schlager Songs',
      filter: (s: MasterSong) =>
        Boolean(s.genre?.toLowerCase().includes('schlager')),
      score: 45
    },
    {
      family: 'genre',
      name: 'Jazz, Soul & Funk Songs',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('jazz') ||
            s.genre?.toLowerCase().includes('soul') ||
            s.genre?.toLowerCase().includes('funk') ||
            s.genre?.toLowerCase().includes('blues')
        ),
      score: 80
    },
    {
      family: 'genre',
      name: 'Opera & Classical Crossover',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('opera') ||
            s.genre?.toLowerCase().includes('classical')
        ),
      score: 85
    },
    {
      family: 'genre',
      name: 'Hip-Hop, Rap & R&B',
      filter: (s: MasterSong) =>
        Boolean(
          s.genre?.toLowerCase().includes('hip hop') ||
            s.genre?.toLowerCase().includes('rap') ||
            s.genre?.toLowerCase().includes('r&b')
        ),
      score: 75
    },
    {
      family: 'genre',
      name: 'Comedy & Novelty Entries',
      filter: (s: MasterSong) =>
        Boolean(s.genre?.toLowerCase().includes('comedy')),
      score: 90
    }
  );

  // 5. Era / Decade Categories
  const currentYear = new Date().getFullYear();
  const latestCompetitionYear = songs.some(s => s.year === currentYear) ? currentYear : Math.max(...songs.map(s => s.year));

  definitions.push(
    {
      family: 'era',
      name: `Latest Contest Songs (${latestCompetitionYear})`,
      filter: (s: MasterSong) => s.year === latestCompetitionYear,
      score: 20 // Easy / Medium tier
    },
    {
      family: 'era',
      name: '2020s Eurovision Songs',
      filter: (s: MasterSong) => s.year >= 2020,
      score: 35 // Medium tier
    },
    {
      family: 'era',
      name: '2010s Eurovision Songs',
      filter: (s: MasterSong) => s.year >= 2010 && s.year <= 2019,
      score: 55 // Hard tier
    },
    {
      family: 'era',
      name: '2000s Eurovision Songs',
      filter: (s: MasterSong) => s.year >= 2000 && s.year <= 2009,
      score: 70
    },
    {
      family: 'era',
      name: '1990s Eurovision Songs',
      filter: (s: MasterSong) => s.year >= 1990 && s.year <= 1999,
      score: 70 // Hard tier
    },
    {
      family: 'era',
      name: '1980s Eurovision Songs',
      filter: (s: MasterSong) => s.year >= 1980 && s.year <= 1989,
      score: 85 // Expert tier
    },
    {
      family: 'era',
      name: '1970s Eurovision Songs',
      filter: (s: MasterSong) => s.year >= 1970 && s.year <= 1979,
      score: 90 // Expert tier
    },
    {
      family: 'era',
      name: 'Early Eurovision Era (1956–1969)',
      filter: (s: MasterSong) => s.year >= 1956 && s.year <= 1969,
      score: 95 // Expert tier
    }
  );

  // 6. Title Structure Categories
  definitions.push(
    {
      family: 'title',
      name: 'One-Word Song Titles',
      filter: (s: MasterSong) => s.title.trim().split(/\s+/).length === 1,
      score: 80
    },
    {
      family: 'title',
      name: "Titles Starting with 'The'",
      filter: (s: MasterSong) => /^the\s/i.test(s.title.trim()),
      score: 20
    },
    {
      family: 'title',
      name: "Titles Containing 'Love'",
      filter: (s: MasterSong) => /\blove\b/i.test(s.title),
      score: 15
    },
    {
      family: 'title',
      name: 'Titles with 4+ Words',
      filter: (s: MasterSong) => s.title.trim().split(/\s+/).length >= 4,
      score: 80
    },
    {
      family: 'title',
      name: 'Repeated Words in Song Titles',
      filter: (s: MasterSong) => {
        const norm = s.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return /\b([a-z0-9]+)\b[^\w]+\b\1\b/i.test(norm);
      },
      score: 55
    },
    {
      family: 'title',
      name: 'Question Marks in Song Titles',
      filter: (s: MasterSong) => /\?/.test(s.title),
      score: 65
    },
    {
      family: 'title',
      name: 'Exclamation Marks in Song Titles',
      filter: (s: MasterSong) => /!/.test(s.title),
      score: 75
    },
    {
      family: 'title',
      name: 'Names in Song Titles',
      filter: (s: MasterSong) =>
        /\b(stefania|cleopatra|mata hari|jan jan|anabel|romeo|juliet|juliette|angelina|marija|kristina|valentina|pedro|carolina|carola|eva|maria|lucia|sanja|linda|sheila|nora|leila|maro|veronica|natasha|sandra|diva|celine)\b/i.test(
          s.title
        ) && !/waterloo/i.test(s.title),
      score: 40
    },
    {
      family: 'title',
      name: 'Color Words in Song Titles',
      filter: (s: MasterSong) =>
        /\b(black|blue|red|white|gold|golden|green|yellow|pink|purple|silver|bleu|rouge|noir|blanc|blanco|negro|verde|azul|rosa|rosso)\b/i.test(
          s.title
        ),
      score: 35
    },
    {
      family: 'title',
      name: 'Animals in Song Titles',
      filter: (s: MasterSong) =>
        /\b(wolf|wolves|lion|lions|bird|birds|blackbird|butterfly|butterflies|chameleon|cat|cats|dog|dogs|chicken|chickens|parrot|perroquet|phoenix|tiger|bull|horse|snake)\b/i.test(
          s.title
        ),
      score: 40
    },
    {
      family: 'title',
      name: 'Greetings and Goodbyes in Song Titles',
      filter: (s: MasterSong) =>
        /\b(hello|hallo|goodbye|bye|ciao|adieu|welcome|bonjour|aloha|tschüss|servus)\b/i.test(
          s.title
        ) && !/say na na na/i.test(s.title),
      score: 50
    },
    {
      family: 'title',
      name: 'Digits in Song Titles',
      filter: (s: MasterSong) => /\d/.test(s.title),
      score: 35
    },
    {
      family: 'title',
      name: 'Number Words in Song Titles',
      filter: (s: MasterSong) =>
        !/\d/.test(s.title) &&
        /\b(one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|uno|dos|tres|deux|trois|eins|zwei|drei|due|tre)\b/i.test(
          s.title
        ),
      score: 40
    }
  );

  return definitions;
};

export const generateEuroLinksPuzzleFromData = (
  rng: SeededRandom,
  isLegacyFallback: boolean = true
): ConnectionsGroup[] => {
  const masterData = getActiveMasterData();
  const overThresholdSongs = masterData.filter(s => (s.weight ?? 0) >= SEARCH_WEIGHT_THRESHOLD);
  const categories = getCategoryDefinitions(masterData);

  // Remove 'genre' from active generation pool as requested while keeping definitions intact
  const families: ('country' | 'placing' | 'act' | 'era' | 'title')[] = [
    'country',
    'placing',
    'act',
    'era',
    'title'
  ];

  let bestFallback: ConnectionsGroup[] | null = null;

  for (let attempt = 0; attempt < 200; attempt++) {
    const selectedFamilies = rng.shuffle(families).slice(0, 4);

    // Pick candidate categories for these 4 families attempting difficulty tier distribution
    const pool = categories.filter(c => (selectedFamilies as string[]).includes(c.family));
    const b0 = rng.shuffle(pool.filter(d => d.score <= 30));
    const b1 = rng.shuffle(pool.filter(d => d.score > 30 && d.score <= 55));
    const b2 = rng.shuffle(pool.filter(d => d.score > 55 && d.score <= 75));
    const b3 = rng.shuffle(pool.filter(d => d.score > 75));

    const activeCatDefs: CategoryDefinition[] = [];
    const usedFamilies = new Set<string>();

    const tryPickFrom = (list: CategoryDefinition[]) => {
      const avail = list.filter(d => !usedFamilies.has(d.family));
      if (avail.length > 0) {
        activeCatDefs.push(avail[0]);
        usedFamilies.add(avail[0].family);
      }
    };

    tryPickFrom(b0);
    tryPickFrom(b1);
    tryPickFrom(b2);
    tryPickFrom(b3);

    for (const fam of selectedFamilies) {
      if (!usedFamilies.has(fam)) {
        const famCats = rng.shuffle(categories.filter(c => c.family === fam));
        if (famCats.length > 0) {
          activeCatDefs.push(famCats[0]);
          usedFamilies.add(fam);
        }
      }
    }

    if (activeCatDefs.length < 4) continue;

    // Sort the chosen 4 categories by difficulty score ascending
    activeCatDefs.sort((a, b) => a.score - b.score);

    const difficulties: ('easy' | 'medium' | 'hard' | 'expert')[] = [
      'easy',
      'medium',
      'hard',
      'expert'
    ];
    const usedSongIds = new Set<string>();
    const usedTitles = new Set<string>();
    const selectedGroups: ConnectionsGroup[] = [];
    const allChosenSongs: MasterSong[] = [];

    let validCombination = true;

    // Pre-calculate title frequencies to exclude songs whose title entered Eurovision more than once
    const titleCounts = new Map<string, number>();
    masterData.forEach(s => {
      const norm = s.title.trim().toUpperCase();
      titleCounts.set(norm, (titleCounts.get(norm) || 0) + 1);
    });

    for (let i = 0; i < activeCatDefs.length; i++) {
      const catDef = activeCatDefs[i];
      const otherCatDefs = activeCatDefs.filter((_, idx) => idx !== i);

      // Strict mutual exclusivity & duplicate title exclusion:
      // Candidate song MUST match catDef, MUST NOT match any other selected category,
      // and MUST NOT be a song title that has entered Eurovision more than once.
      const isExclusiveCandidate = (s: MasterSong) => {
        const normTitle = s.title.trim().toUpperCase();

        // Do not use any songs that have a title that has entered the competition more than once
        if ((titleCounts.get(normTitle) || 0) > 1) return false;

        if (!catDef.filter(s)) return false;

        for (const other of otherCatDefs) {
          if (other.filter(s)) return false;
        }

        if (usedSongIds.has(s.id) || usedTitles.has(normTitle)) return false;
        return true;
      };

      const allCandidates = masterData.filter(isExclusiveCandidate);
      const popularPool = allCandidates.filter(s => (s.weight ?? 0) >= SEARCH_WEIGHT_THRESHOLD);
      const obscurePool = allCandidates.filter(s => (s.weight ?? 0) < SEARCH_WEIGHT_THRESHOLD);

      // Anchor Strategy:
      // i=0 (easy): 4 popular
      // i=1 (medium): 4 popular
      // i=2 (hard): 3 popular, 1 obscure
      // i=3 (expert): 2 popular, 2 obscure
      let numPopularDesired = [4, 4, 3, 2][i];
      let numObscureDesired = 4 - numPopularDesired;

      const weightedLotteryPick = (candidates: MasterSong[], count: number): MasterSong[] => {
        if (candidates.length <= count) return [...candidates];
        const result: MasterSong[] = [];
        const pool = [...candidates];
        for (let k = 0; k < count; k++) {
          let totalWeight = 0;
          const weights = pool.map(c => {
            const w = Math.max(1, c.weight ?? 1);
            // Year multiplier: boost modern songs (2000+) so recent fan favorites are picked more often
            const yearMultiplier = c.year >= 2015 ? 1.8 : c.year >= 2000 ? 1.4 : c.year >= 1990 ? 1.0 : 0.7;
            const adjusted = Math.pow(w * yearMultiplier, 1.8);
            totalWeight += adjusted;
            return adjusted;
          });
          
          let randomValue = rng.next() * totalWeight;
          let selectedIdx = pool.length - 1;
          for (let j = 0; j < pool.length; j++) {
            randomValue -= weights[j];
            if (randomValue <= 0) {
              selectedIdx = j;
              break;
            }
          }
          result.push(pool[selectedIdx]);
          pool.splice(selectedIdx, 1);
        }
        return result;
      };

      const chosenPopular = weightedLotteryPick(popularPool, numPopularDesired);
      
      if (chosenPopular.length < numPopularDesired) {
        numObscureDesired += (numPopularDesired - chosenPopular.length);
      }
      
      const chosenObscure = weightedLotteryPick(obscurePool, numObscureDesired);
      
      if (chosenObscure.length < numObscureDesired) {
        const remainingPopular = popularPool.filter(p => !chosenPopular.some(c => c.id === p.id));
        const extraPopular = weightedLotteryPick(remainingPopular, numObscureDesired - chosenObscure.length);
        chosenPopular.push(...extraPopular);
      }

      const candidateSongs = rng.shuffle([...chosenPopular, ...chosenObscure]);

      if (candidateSongs.length >= 4) {
        const chosenSongs = candidateSongs.slice(0, 4);
        chosenSongs.forEach(s => {
          usedSongIds.add(s.id);
          usedTitles.add(s.title.toUpperCase());
        });
        allChosenSongs.push(...chosenSongs);

        selectedGroups.push({
          category: catDef.name,
          items: chosenSongs.map(s => s.title.toUpperCase()),
          difficulty: difficulties[i]
        });
      } else {
        validCombination = false;
        break;
      }
    }

    if (validCombination && selectedGroups.length === 4) {
      bestFallback = selectedGroups; // Store as fallback in case we don't find a perfect one
      const selectedCategoryNames = new Set(selectedGroups.map(g => g.category));
      let hasUnintendedGroupOfFour = false;

      for (const cat of categories) {
        if (selectedCategoryNames.has(cat.name)) continue;

        const matches = allChosenSongs.filter(s => cat.filter(s));
        if (matches.length === 4) {
          // Check if these 4 songs exactly equal any of the chosen groups
          const matchTitles = new Set(matches.map(m => m.title.toUpperCase()));
          let isExactGroup = false;
          for (const group of selectedGroups) {
            if (group.items.every(title => matchTitles.has(title))) {
              isExactGroup = true;
              break;
            }
          }

          if (!isExactGroup) {
            hasUnintendedGroupOfFour = true;
            break;
          }
        }
      }

      if (!hasUnintendedGroupOfFour) {
        return selectedGroups;
      }
    }
  }

  if (bestFallback) {
    return bestFallback;
  }

  if (isLegacyFallback) {
    const idx = rng.nextInt(0, LEGACY_PUZZLES.length - 1);
    return LEGACY_PUZZLES[idx];
  }

  return [];
};

export const getEuroLinksPuzzle = (dateStr?: string): ConnectionsGroup[] => {
  const currentDayStr = dateStr || getDayString();
  const now = new Date().getTime();

  // Check feature flag
  if (now < FEATURE_FLAGS.NEW_LINKS_DATA_SWAP_TIMESTAMP) {
    const idx = getDailyIndex(LEGACY_PUZZLES, 'eurolinks', currentDayStr);
    return LEGACY_PUZZLES[idx];
  }

  const seed = hashCode(currentDayStr + 'eurolinks-v3');
  const rng = new SeededRandom(seed);
  return generateEuroLinksPuzzleFromData(rng, true);
};

export const generateRandomEuroLinksPuzzle = (): ConnectionsGroup[] => {
  const seed = Math.floor(Math.random() * 1000000);
  const rng = new SeededRandom(seed);
  return generateEuroLinksPuzzleFromData(rng, false);
};
