
import { TranslationSchema } from './types.ts';

export const en: TranslationSchema = {
  common: {
    back: "Back",
    play: "Play",
    submit: "Submit",
    loading: "Loading...",
    share: "Share Entry Card",
    shareDaily: "Share Daily Score",
    shareCareer: "Share Stats",
    shareHallOfFame: "Share Hall of Fame",
    copied: "Copiated to clipboard!",
    returnToGreenroom: "Return to Greenroom",
    perfect: "Perfect",
    finished: "Finished",
    douzePoints: "DOUZE POINTS!",
    nulPoints: "NUL POINTS",
    points: "Points",
    pointsShort: "pts",
    attempts: "attempts",
    steps: "steps",
    mistakesLeft: "Mistakes Left",
    howToPlay: "How to play",
    close: "Close",
    selectLanguage: "Select Language"
  },
  greenroom: {
    greenroom: "The Greenroom",
    description: "Welcome to the Greenroom. Prove your knowledge of the Eurovision Song Contest with five daily challenges designed for the ultimate superfan.",
    dailyProgress: "Daily Progress",
    qualified: "✨ Grand Final Qualified ✨",
    finishedToday: "Finished Today",
    statsButton: "Stats",
    careerStats: "Stats",
    todayScore: "Today's Score"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Daily Eurovision song title challenge.",
      rules: "Guess the hidden Eurovision song title in 6 tries. You can enter any combination of letters - it doesn't even have to be a real word! The color of the tiles will change to show how close your guess was to the answer.\n\n🟩: Correct letter & position\n🟨: Correct letter, wrong position\n⬛: Wrong letter"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Daily Eurovision artist guessing game.",
      rules: "Guess the hidden Eurovision artist in 6 tries. You can enter any combination of letters - it doesn't even have to be a real word! The color of the tiles will change to show how close your guess was to the answer.\n\n🟩: Correct letter & position\n🟨: Correct letter, wrong position\n⬛: Wrong letter"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Connect four related Eurovision items.",
      rules: "Find groups of four items that share a common song contest theme. Select four items and tap 'Submit' to check your guess. You have 6 mistakes allowed to find all 4 categories!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identify a mystery Eurovision entry.",
      rules: "Identify the mystery contest entry using up to 6 hints. Each incorrect guess reveals a new, more specific clue (Year, Country, Genre, etc.). Guessing correctly early yields more points!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Compare stats to find the target entry.",
      rules: "Compare your guesses against a mystery Eurovision target entry. Use the attribute markers (Year, Rank, Country, Genre, Size, Sex) to narrow your search.\n\n🟩: Perfect Match\n🟨: Close Match (near year/rank, same region or genre group)\n⬛: No Match"
    }
  },
  wordGame: {
    enter: "Enter",
    board: "Game board",
    keyboard: "Virtual keyboard"
  },
  links: {
    mistakesRemaining: "Mistakes Remaining",
    oneAway: "One away...",
    notALink: "Not a link",
    shuffle: "Shuffle Grid",
    deselectAll: "Deselect All",
    categoriesDiscovered: "Categories Discovered"
  },
  guesser: {
    searchPlaceholder: "Search Eurovision entries...",
    noResults: "No matching entries found",
    hintLabels: {
      year: "Year",
      country: "Country",
      genre: "Genre",
      placing: "Placing",
      fact: "Fun Fact",
      artist: "Members"
    }
  },
  arena: {
    analyze: "Analyze the Eurovision field",
    verdict: "View Arena Verdict",
    labels: {
      year: "Year",
      rank: "Rank",
      country: "Country",
      genre: "Genre",
      size: "Size",
      sex: "Sex"
    }
  },
  stats: {
    totalRecord: "The Eurovision Record",
    voterBreakdown: "Voter Breakdown",
    howToWin: "How to Win",
    earnPoints: "Earn Rank Points",
    earnPointsDesc: "Accumulate points to climb the leaderboard. Flawless victories give higher scores.",
    claimDouze: "Claim Douze Points 🏆",
    claimDouzeDesc: "Awarded for perfect games (no mistakes or first-try wins).",
    gotIt: "Got it, Let's Play",
    played: "Played",
    wins: "Wins",
    winRate: "Win Rate",
    streak: "Streak",
    scoreHistory: "Score History",
    pointsNeeded: "pts to",
    toRank: "Next Tier"
  },
  scorecard: {
    performanceVerdict: "Performance Verdict",
    dailyResult: "Daily Result",
    revealedEntry: "Revealed Entry",
    origin: "Origin",
    year: "Year",
    placing: "Placing",
    greenroomGossip: "Greenroom Gossip",
    performanceLog: "Performance Log",
    watch: "WATCH",
    reviewBoard: "Review Board",
    shareResult: "Share Result",
    resultsCopied: "Results Copied!",
    breakthrough: "Breakthrough on Hint",
    signalLost: "Signal Lost...",
    score: "Score",
    viewScorecard: "View Scorecard",
    headlines: {
      nulPoints: "❌ NUL POINTS... 🗳️",
      douzePoints: "🏆 DOUZE POINTS! ✨",
      greatPerformance: "🌟 GREAT PERFORMANCE! 🎤",
      qualified: "🗳️ QUALIFIED! 🎤"
    }
  },
  cookies: {
    bannerText: "We use cookies to personalise content and ads, to provide social media features, and to analyse our traffic.",
    learnMore: "Learn more",
    acceptAll: "Accept all",
    decline: "Use essential only",
    manage: "Manage",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    privacySettings: "Privacy"
  },
  ranks: {
    "First-Time Voter": "First-Time Voter",
    "Backing Vocalist": "Backing Vocalist",
    "National Finalist": "National Finalist",
    "Semi-Final Qualifier": "Semi-Final Qualifier",
    "Grand Finalist": "Grand Finalist",
    "Top 10 Contender": "Top 10 Contender",
    "Podium Finish": "Podium Finish",
    "Winner": "Winner",
    "Multi-Winner": "Multi-Winner",
    "Hall of Famer": "Hall of Famer",
    "Eurovision Legend": "Eurovision Legend"
  },
  metadata: {
    countries: {
      "Switzerland": "Switzerland", "Sweden": "Sweden", "Finland": "Finland", "Netherlands": "Netherlands",
      "Italy": "Italy", "Croatia": "Croatia", "United Kingdom": "United Kingdom", "Ukraine": "Ukraine",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Denmark", "Norway": "Norway", "Spain": "Spain",
      "Austria": "Austria", "Cyprus": "Cyprus", "Iceland": "Iceland", "Germany": "Germany", "Azerbaijan": "Azerbaijan",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Greece", "Moldova": "Moldova", "Belgium": "Belgium",
      "Poland": "Poland", "Slovenia": "Slovenia", "Ireland": "Ireland", "Luxembourg": "Luxembourg", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Russia", "Turkey": "Turkey", "Bosnia & Herzegovina": "Bosnia & Herzegovina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Latvia", "Hungary": "Hungary", "San Marino": "San Marino"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Opera", "Drum and Bass / Opera": "Drum and Bass / Opera",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballad": "Ballad", "Rock": "Rock", "Industrial Rock": "Industrial Rock", 
      "Glam Rock": "Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Comedy Pop", "Latin Pop": "Latin Pop",
      "R&B": "R&B", "Orchestral Pop": "Pop Orquestal", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Indie Pop", "Ethno-Pop": "Ethno-Pop", "Soul": "Soul", "Other": "Other", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternative", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Pop Ballad", "Electronic": "Electronic", "Industrial Techno": "Industrial Techno",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Neoclassical", "Folk Ballad": "Folk Ballad", "Pop Rock": "Pop Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Celtic Folk", "Balkan Ballad": "Balkan Ballad", "Disco": "Disco", "Art Pop / Rock": "Art Pop / Rock", "Chanson / Pop Ballad": "Chanson / Pop Ballad"
    },
    sex: {
      "Male": "Male", "Female": "Female", "Mixed": "Mixed", "Other": "Other"
    },
    sizes: {
      solo: "Solo",
      duo: "Duo"
    }
  }
};
