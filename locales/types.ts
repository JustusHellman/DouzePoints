export interface TranslationSchema {
  common: {
    back: string;
    play: string;
    submit: string;
    loading: string;
    share: string;
    shareDaily: string;
    shareCareer: string;
    shareHallOfFame: string;
    copied: string;
    returnToGreenroom: string;
    perfect: string;
    finished: string;
    douzePoints: string;
    nulPoints: string;
    points: string;
    pointsShort: string;
    attempts: string;
    steps: string;
    mistakesLeft: string;
    howToPlay: string;
    close: string;
    selectLanguage: string;
    languages: string;
    qualified: string;
    playBonusRound: string;
  };
  greenroom: {
    greenroom: string;
    description: string;
    dailyProgress: string;
    qualified: string;
    finishedToday: string;
    statsButton: string;
    careerStats: string;
    todayScore: string;
    howToPlayTitle: string;
    howToPlayP1: string;
    howToPlayP2: string;
  };
  games: {
    eurosong: { title: string; desc: string; rulesShort: string; rulesLong: string };
    euroartist: { title: string; desc: string; rulesShort: string; rulesLong: string };
    eurorefrain: { title: string; desc: string; rulesShort: string; rulesLong: string };
    eurolinks: { title: string; desc: string; rulesShort: string; rulesLong: string };
    euroguess: { title: string; desc: string; rulesShort: string; rulesLong: string };
    euroarena: { title: string; desc: string; rulesShort: string; rulesLong: string };
  };
  wordGame: {
    enter: string;
    board: string;
    keyboard: string;
    notEnoughLetters: string;
  };
  links: {
    mistakesRemaining: string;
    oneAway: string;
    betterLuck: string;
    notALink: string;
    shuffle: string;
    deselectAll: string;
    categoriesDiscovered: string;
    // Added missing property used by EuroRefrain to track discovered lyric hooks
    lyricsDiscovered: string;
  };
  guesser: {
    searchPlaceholder: string;
    noResults: string;
    hintLabels: {
      year: string;
      country: string;
      genre: string;
      placing: string;
      fact: string;
      artist: string;
    };
  };
  arena: {
    analyze: string;
    verdict: string;
    labels: {
      year: string;
      rank: string;
      country: string;
      genre: string;
      size: string;
      sex: string;
    };
  };
  stats: {
    totalRecord: string;
    voterBreakdown: string;
    howToWin: string;
    earnPoints: string;
    earnPointsDesc: string;
    claimDouze: string;
    claimDouzeDesc: string;
    gotIt: string;
    played: string;
    wins: string;
    winRate: string;
    streak: string;
    scoreHistory: string;
    pointsNeeded: string;
    toRank: string;
  };
  scorecard: {
    performanceVerdict: string;
    dailyResult: string;
    revealedEntry: string;
    origin: string;
    year: string;
    placing: string;
    greenroomGossip: string;
    performanceLog: string;
    watch: string;
    reviewBoard: string;
    shareResult: string;
    saveImage: string;
    copyImage: string;
    resultsCopied: string;
    breakthrough: string;
    signalLost: string;
    score: string;
    viewScorecard: string;
    nextGame: string;
    headlines: {
      nulPoints: string;
      douzePoints: string;
      greatPerformance: string;
      qualified: string;
    };
  };
  privacy: {
    title: string;
    lastUpdated: string;
    introduction: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
    };
    dataCollection: {
      title: string;
      autoTitle: string;
      autoDesc: string;
      autoItems: string[];
      autoFootnote: string;
      cookiesTitle: string;
      cookiesDesc1: string;
      cookiesDesc2: string;
      cookiesDesc3: string;
    };
    legalBasis: {
      title: string;
      p1: string;
      consentLabel: string;
      consent: string;
      legitimacyLabel: string;
      legitimacy: string;
      legalLabel: string;
      legal: string;
    };
    localStorage: {
      title: string;
      p1: string;
      items: string[];
    };
    dataSharing: {
      title: string;
      p1: string;
      items: string[];
    };
    internationalTransfers: {
      title: string;
      p1: string;
    };
    dataRetention: {
      title: string;
      p1: string;
    };
    yourRights: {
      title: string;
      p1: string;
      p2: string;
    };
    dataSecurity: {
      title: string;
      p1: string;
    };
    thirdPartyLinks: {
      title: string;
      p1: string;
    };
    changes: {
      title: string;
      p1: string;
    };
    about: {
      title: string;
      p1: string;
      p2: string;
    };
    stats: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    mission: { title: string; p1: string; p2: string };
    story: { title: string; p1: string; p2: string };
    history: { title: string; p1: string; p2: string };
    games: { title: string; p1: string; gameList: { name: string; desc: string }[] };
    community: { title: string; p1: string };
  };
  contact: {
    title: string;
    methods: { title: string; p1: string };
    faq: {
      title: string;
      q1: string; a1: string;
      q2: string; a2: string;
      q3: string; a3: string;
      q4: string; a4: string;
      q5: string; a5: string;
    };
    feedback: { title: string; p1: string };
  };
  terms: {
    lastUpdated: string;
    title: string;
    acceptance: { title: string; p1: string };
    description: { title: string; p1: string };
    ip: { title: string; p1: string; p2: string };
    conduct: { title: string; p1: string; items: string[] };
    disclaimer: { title: string; p1: string };
    limitation: { title: string; p1: string };
    governingLaw: { title: string; p1: string };
    changes: { title: string; p1: string };
    contact: { title: string; p1: string };
  };
  ranks: Record<string, string>;
  metadata: {
    countries: Record<string, string>;
    genres: Record<string, string>;
    sex: Record<string, string>;
    sizes: {
      solo: string;
      duo: string;
    };
  };
  support: {
    title: string;
    completed: string;
    button: string;
  };
}