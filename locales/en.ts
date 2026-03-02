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
    copied: "Copied to clipboard!",
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
    selectLanguage: "Select Language",
    languages: "Languages",
    qualified: "Qualified"
  },
  greenroom: {
    greenroom: "The Greenroom",
    description: "Relax and prepare for the performance. Prove your knowledge of the Eurovision Song Contest with six daily challenges designed for the ultimate superfan.",
    dailyProgress: "Daily Progress",
    qualified: "✨ Grand Final Qualified ✨",
    finishedToday: "Finished Today",
    statsButton: "Stats",
    careerStats: "Stats",
    todayScore: "Today's Score",
    howToPlayTitle: "How to Play Douze Points",
    howToPlayP1: "Douze Points is your daily Eurovision challenge hub. Every day, six unique games are released to test your knowledge of the contest's history, artists, and lyrics. Your goal is to complete each challenge with as few mistakes as possible to earn the maximum score of 12 points—the legendary 'Douze Points'!",
    howToPlayP2: "As you accumulate points across all games, you will climb the global fandom ranks, evolving from a 'First-Time Voter' to a true 'Eurovision Legend'. You can track your daily progress, career milestones, and current rank by clicking the 'Stats' button in the header at any time. Good luck, and may the best fan win!",
    historyTitle: "The Legacy of Eurovision",
    historyP1: "The Eurovision Song Contest began in 1956 as a technical experiment in live, simultaneous, transnational broadcasting. Since then, it has grown into one of the world's most-watched non-sporting events, reaching hundreds of millions of viewers across the globe. It is a unique celebration of music, diversity, and international cooperation.",
    historyP2: "From the early days of orchestral ballads to the modern era of high-octane pop, rock, and experimental performance, Eurovision has always been a mirror of European culture and identity. It has launched the careers of global icons like ABBA and Celine Dion, and continues to be a platform for artistic innovation and cultural exchange every single year.",
    historyP3: "At Douze Points, we celebrate this rich history through our daily challenges. Whether you're a casual viewer or a hardcore superfan who knows every entry since Lugano, our games are designed to test your knowledge and passion for the contest. Join us every day to prove your expertise, discover new favorite songs, and climb the ranks of the Eurovision fandom.",
    historyP4: "As the contest continues to evolve with new technologies and musical trends, its core mission remains the same: to bring people together through the power of music. From the introduction of televoting to the spectacular stage designs of the 21st century, Eurovision has always pushed the boundaries of what is possible in live entertainment. We are proud to be a part of this vibrant community and to provide a space where fans can engage with the contest's legacy in a fun and interactive way.",
    historyP5: "Beyond the competition, Eurovision has fostered a massive global community of fans who share a deep appreciation for the diverse musical styles and cultural expressions showcased on stage. This community is the heart of the contest, and at Douze Points, we aim to provide a platform that honors this spirit. Our mission is to keep the Eurovision magic alive all year round, offering a space where fans can test their knowledge, celebrate their favorite entries, and connect with the history of the world's most beloved song contest."
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Daily Eurovision song title challenge.",
      rulesShort: "Identify the hidden Eurovision song title in 6 attempts. Tiles change color:\n🟩 Correct spot\n🟨 Wrong spot\n⬛ Not in the title",
      rulesLong: "EuroSong is a word-guessing game dedicated to the vast catalog of Eurovision song titles. Your goal is to identify a specific song title from the contest's history within six attempts.\n\nHow to play:\n• Type any combination of letters to form a guess.\n• After each guess, the color of the tiles will change to provide feedback:\n  - 🟩 (Green): The letter is in the title and in the correct spot.\n  - 🟨 (Yellow): The letter is in the title but in the wrong spot.\n  - ⬛ (Gray): The letter is not in the title at all.\n• Use the feedback from each guess to narrow down the possibilities.\n• The game features titles from all eras of Eurovision, from the 1950s to the present day."
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Daily Eurovision artist guessing game.",
      rulesShort: "Guess the name of the Eurovision artist or group in 6 tries. Tiles change color:\n🟩 Correct spot\n🟨 Wrong spot\n⬛ Not in the name",
      rulesLong: "EuroArtist challenges you to identify the famous performers and groups who have graced the Eurovision stage. From legendary winners to cult favorites, can you guess the daily artist in six tries?\n\nHow to play:\n• Enter the name of an artist or group as your guess.\n• The tiles will change color based on how close your guess is to the target name:\n  - 🟩 (Green): Correct letter in the correct position.\n  - 🟨 (Yellow): Correct letter in the wrong position.\n  - ⬛ (Gray): This letter is not part of the artist's name.\n• Remember that artist names can include spaces and special characters, which are often fixed on the board to help you."
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Connect 4 words from a lyric hook.",
      rulesShort: "Connect 16 words into four groups of four. Each group belongs to a different Eurovision song's refrain. 6 mistakes allowed.",
      rulesLong: "EuroRefrain tests your memory for the most iconic lyrics in Eurovision history. You are presented with a grid of 16 words taken from four different song choruses (refrains).\n\nHow to play:\n• Your task is to group these 16 words into four sets of four, where each set belongs to a single song's refrain.\n• Select four words that you believe belong together and tap 'Submit'.\n• If correct, the words will be cleared from the board and the song title will be revealed.\n• If incorrect, it counts as a mistake. You are allowed up to 6 mistakes before the game ends.\n• The words are carefully chosen to be challenging, often featuring common words that could belong to multiple songs!"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Connect 4 related Eurovision items.",
      rulesShort: "Group 16 Eurovision items into four categories of four based on a shared connection. 6 mistakes allowed.",
      rulesLong: "EuroLinks is a game of logic and Eurovision trivia. You must find the hidden connections between 16 different items related to the contest.\n\nHow to play:\n• The grid contains 16 items that can be grouped into four categories of four items each.\n• Categories can range from 'Winners from the 90s' to 'Countries that have never won' or 'Artists who competed multiple times'.\n• Select four items and tap 'Submit' to check if they share a category.\n• You have 6 mistakes allowed to solve the entire puzzle.\n• Each category has a difficulty level, ranging from straightforward to expert-level trivia!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identify a mystery Eurovision entry.",
      rulesShort: "Identify the mystery Eurovision entry in 6 attempts. Each incorrect guess reveals a new, more specific hint.",
      rulesLong: "EuroGuess is a detective-style game where you identify a mystery Eurovision entry using a series of clues. The challenge is to guess the entry with as few hints as possible.\n\nHow to play:\n• You start with one initial hint (usually the year).\n• If your guess is incorrect, a new, more specific hint is revealed (Country, Genre, Placing, etc.).\n• You have a total of 6 attempts to identify the entry correctly.\n• Use the search bar to find and select your guess from our comprehensive database of Eurovision entries.\n• Scoring is based on how many hints you needed—guessing early earns you the maximum points!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Compare stats to find the target entry.",
      rulesShort: "Find the target Eurovision entry in 7 attempts. Feedback markers show:\n🟩 Correct match\n🟨 Close match\n⬛ No match\nUse arrows (⬆️⬇️) for Year and Rank.",
      rulesLong: "EuroArena is a data-driven guessing game where you use comparative statistics to find a hidden Eurovision entry. It's a test of your knowledge of contest results and artist attributes.\n\nHow to play:\n• Enter a guess to see how its attributes compare to the target entry.\n• Attributes include Year, Rank, Country, Genre, and Artist Size/Sex.\n• Feedback markers will guide your next move:\n  - 🟩 (Green): A perfect match for that attribute.\n  - 🟨 (Yellow): A close match (e.g., the year is within 3 years, or the country is in the same region).\n  - ⬛ (Gray): No match for this attribute.\n• Arrows next to Year and Rank will tell you if the target value is higher or lower than your guess.\n• You have 7 attempts to find the correct entry."
    }
  },
  wordGame: {
    enter: "Enter",
    board: "Game board",
    keyboard: "Virtual keyboard",
    notEnoughLetters: "Not enough letters"
  },
  links: {
    mistakesRemaining: "Mistakes Remaining",
    oneAway: "One away...",
    betterLuck: "Better luck tomorrow!",
    notALink: "Not a link",
    shuffle: "Shuffle Grid",
    deselectAll: "Deselect All",
    categoriesDiscovered: "Categories Discovered",
    lyricsDiscovered: "Lyric Hooks Discovered"
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
    nextGame: "Next Game In",
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
    privacySettings: "Privacy",
    lastUpdated: "Last Updated"
  },
  privacy: {
    lastUpdated: "February 2026",
    introduction: {
      title: "Introduction",
      p1: "Welcome to Douze Points (www.douzepoints.net).",
      p2: "This website is operated by Justus Hellman, based in Sweden (the “Data Controller”).",
      p3: "If you have any questions regarding this Privacy Policy or your personal data, you may contact: douzepointsgame@gmail.com"
    },
    dataCollection: {
      title: "What Data We Collect",
      autoTitle: "a) Automatically Collected Data",
      autoDesc: "When you visit the website, certain information may be automatically collected, including:",
      autoItems: ["IP address", "Browser type and version", "Device information", "Operating system", "Pages visited", "Date and time of access", "Referring website"],
      autoFootnote: "This information may be processed by our advertising and analytics providers.",
      cookiesTitle: "b) Cookies and Similar Technologies",
      cookiesDesc1: "We use cookies and similar technologies for Advertising, Measuring ad performance, and Website functionality.",
      cookiesDesc2: "Consent for cookies is collected and managed through Google Funding Choices, which provides our consent management platform (CMP). Users in applicable regions (such as the EU/EEA and UK) are asked to provide consent before non-essential cookies are used.",
      cookiesDesc3: "You can change your consent preferences at any time via the consent options available on the website."
    },
    advertising: {
      title: "Advertising",
      p1: "We use Google AdSense to display advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.",
      p2: "You can manage your advertising preferences via: adssettings.google.com",
      p3: "More information about how Google processes personal data is available in Google’s Privacy Policy."
    },
    legalBasis: {
      title: "Legal Basis (GDPR)",
      p1: "If you are located in the EU/EEA, we process personal data on the following legal bases:",
      consentLabel: "Consent",
      consent: "for personalized advertising and non-essential cookies.",
      legitimacyLabel: "Legitimacy",
      legitimacy: "for basic website functionality, security, and fraud prevention.",
      legalLabel: "Legal",
      legal: "where required by applicable law."
    },
    localStorage: {
      title: "Local Storage",
      p1: "We use your browser’s local storage to save game progress, scores, and statistics. This information:",
      items: ["Is stored only on your device", "Is not transmitted to our servers", "Can be deleted by clearing your browser data"]
    },
    dataSharing: {
      title: "Data Sharing",
      p1: "We do not sell personal data. However, data may be processed by third-party service providers, including:",
      items: ["Google (advertising and consent management)", "Hosting providers", "Technical service providers necessary for website operation"]
    },
    internationalTransfers: {
      title: "International Transfers",
      p1: "Some third-party providers, including Google, may process data outside the EU or EEA. Where such transfers occur, appropriate safeguards such as Standard Contractual Clauses are used."
    },
    dataRetention: {
      title: "Data Retention",
      p1: "We do not maintain a user database. Advertising data is retained according to Google’s policies, technical logs for security purposes, and local storage remains until you delete it."
    },
    yourRights: {
      title: "Your Rights (EU/EEA)",
      p1: "If you are located in the EU/EEA, you have the right to access, correct, or delete your data, and to restrict or object to processing. In Sweden, the supervisory authority is Integritetsskyddsmyndigheten.",
      p2: "Contact us at douzepointsgame@gmail.com to exercise your rights."
    },
    dataSecurity: {
      title: "Data Security",
      p1: "We take reasonable technical and organizational measures to protect personal data. However, no method of transmission over the Internet is completely secure."
    },
    thirdPartyLinks: {
      title: "Links to Third-Party Websites",
      p1: "This website may contain links to third-party websites, including YouTube. We are not responsible for the privacy practices or content of external websites."
    },
    changes: {
      title: "Changes to This Policy",
      p1: "We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised “Last Updated” date."
    }
  },
  terms: {
    lastUpdated: "February 2026",
    title: "Terms of Service",
    acceptance: {
      title: "Acceptance of Terms",
      p1: "By accessing or using Douze Points (www.douzepoints.net), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website."
    },
    description: {
      title: "Description of Service",
      p1: "Douze Points is a fan-made website providing Eurovision-themed games and trivia for entertainment purposes. The service is provided 'as is' and may be modified or discontinued at any time."
    },
    ip: {
      title: "Intellectual Property",
      p1: "The Eurovision Song Contest and related trademarks are the property of the European Broadcasting Union (EBU). This website is not affiliated with, endorsed by, or sponsored by the EBU.",
      p2: "All original content, code, and design on this website are the property of the website owner. You may not reproduce or distribute any part of this website without permission."
    },
    conduct: {
      title: "User Conduct",
      p1: "You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others. Prohibited behavior includes:",
      items: [
        "Attempting to interfere with the website's operation",
        "Using automated scripts to collect data or play games",
        "Impersonating others or providing false information",
        "Engaging in any activity that could damage the website's reputation"
      ]
    },
    disclaimer: {
      title: "Disclaimer of Warranties",
      p1: "The website is provided on an 'as is' and 'as available' basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of the service."
    },
    limitation: {
      title: "Limitation of Liability",
      p1: "To the maximum extent permitted by law, the website owner shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website."
    },
    governingLaw: {
      title: "Governing Law",
      p1: "These Terms of Service shall be governed by and construed in accordance with the laws of Sweden."
    },
    changes: {
      title: "Changes to Terms",
      p1: "We reserve the right to modify these Terms of Service at any time. Your continued use of the website after any changes constitutes acceptance of the new terms."
    },
    contact: {
      title: "Contact Information",
      p1: "If you have any questions about these Terms of Service, please contact us at: douzepointsgame@gmail.com"
    }
  },
  ranks: {
    "First-Time Voter": "First-Time Voter",
    "Greenroom Guest": "Greenroom Guest",
    "Backing Vocalist": "Backing Vocalist",
    "Jury Member": "Jury Member",
    "National Finalist": "National Finalist",
    "Televote Favorite": "Televote Favorite",
    "National Representative": "National Representative",
    "Semi-Final Qualifier": "Semi-Final Qualifier",
    "Press Center Darling": "Press Center Darling",
    "Grand Finalist": "Grand Finalist",
    "Fan Favorite": "Fan Favorite",
    "Top 10 Contender": "Top 10 Contender",
    "Dark Horse": "Dark Horse",
    "Podium Finish": "Podium Finish",
    "Chart Topper": "Chart Topper",
    "Silver Medalist": "Silver Medalist",
    "Winner": "Winner",
    "Double Winner": "Double Winner",
    "Multi-Winner": "Multi-Winner",
    "Hall of Famer": "Hall of Famer",
    "Iconic Entry": "Iconic Entry",
    "Eurovision Legend": "Eurovision Legend"
  },
  metadata: {
    countries: {
      "Switzerland": "Switzerland", "Sweden": "Sweden", "Finland": "Finland", "The Netherlands": "The Netherlands",
      "Italy": "Italy", "Croatia": "Croatia", "United Kingdom": "United Kingdom", "Ukraine": "Ukraine",
      "France": "France",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Denmark", "Norway": "Norway", "Spain": "Spain",
      "Austria": "Austria", "Cyprus": "Cyprus", "Iceland": "Iceland", "Germany": "Germany", "Azerbaijan": "Azerbaijan",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Greece", "Moldova": "Moldova", "Belgium": "Belgium",
      "Poland": "Poland", "Slovenia": "Slovenia", "Ireland": "Ireland", "Luxembourg": "Luxembourg", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Russia", "Turkey": "Turkey", "Bosnia & Herzegovina": "Bosnia & Herzegovina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Latvia", "Hungary": "Hungary", "San Marino": "San Marino",
      "Lithuania": "Lithuania", "Montenegro": "Montenegro", "North Macedonia": "North Macedonia", "Czechia": "Czechia",
      "Romania": "Romania", "Slovakia": "Slovakia", "Georgia": "Georgia", "Armenia": "Armenia",
      "Andorra": "Andorra", "Morocco": "Morocco", "Belarus": "Belarus"
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
      "Celtic Folk": "Celtic Folk", "Balkan Ballad": "Balkan Ballad", "Disco": "Disco", "Art Pop / Rock": "Art Pop / Rock", "Chanson / Pop Ballad": "Chanson / Pop Ballad",
      "Operatic Pop": "Operatic Pop", "Indie Rock": "Indie Rock", "Avant-Garde": "Avant-Garde", "Country": "Country"
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