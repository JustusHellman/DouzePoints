
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
    // Add stats key to match usage in locales/en.ts and other locale files
    stats: string;
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
  };
  games: {
    eurosong: { title: string; desc: string; rules: string };
    euroartist: { title: string; desc: string; rules: string };
    eurolinks: { title: string; desc: string; rules: string };
    euroguess: { title: string; desc: string; rules: string };
    euroarena: { title: string; desc: string; rules: string };
  };
  wordGame: {
    enter: string;
    board: string;
    keyboard: string;
  };
  links: {
    mistakesRemaining: string;
    oneAway: string;
    notALink: string;
    shuffle: string;
    deselectAll: string;
    categoriesDiscovered: string;
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
    resultsCopied: string;
    breakthrough: string;
    signalLost: string;
    score: string;
    viewScorecard: string;
    headlines: {
      nulPoints: string;
      douzePoints: string;
      greatPerformance: string;
      qualified: string;
    };
  };
  cookies: {
    bannerText: string;
    learnMore: string;
    acceptAll: string;
    decline: string;
    manage: string;
    privacyPolicy: string;
    cookiePolicy: string;
    privacySettings: string;
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
}
