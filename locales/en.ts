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
    qualified: "Qualified",
    playBonusRound: "Play Bonus Round",
    semiFinal: "Semi Final"
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
    howToPlayP2: "As you accumulate points across all games, you will climb the global fandom ranks, evolving from a 'First-Time Voter' to a true 'Eurovision Legend'. You can track your daily progress, career milestones, and current rank by clicking the 'Stats' button in the header at any time. Good luck, and may the best fan win!"
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
    saveImage: "Save Scorecard",
    copyImage: "Copy Scorecard",
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
  privacy: {
    title: "Privacy Policy",
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
      autoFootnote: "This information may be processed by our analytics providers.",
      cookiesTitle: "b) Local Storage",
      cookiesDesc1: "We use your browser's local storage exclusively to save your game progress, scores, and statistics.",
      cookiesDesc2: "This data is stored only on your device, is not transmitted to our servers, and can be deleted by clearing your browser data.",
      cookiesDesc3: "We do not use tracking cookies or third-party advertising cookies."
    },
    legalBasis: {
      title: "Legal Basis (GDPR)",
      p1: "If you are located in the EU/EEA, we process personal data on the following legal bases:",
      consentLabel: "Consent",
      consent: "for non-essential cookies (if any).",
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
      items: ["Hosting providers", "Technical service providers necessary for website operation"]
    },
    internationalTransfers: {
      title: "International Transfers",
      p1: "Some third-party providers may process data outside the EU or EEA. Where such transfers occur, appropriate safeguards such as Standard Contractual Clauses are used."
    },
    dataRetention: {
      title: "Data Retention",
      p1: "We do not maintain a user database. Technical logs for security purposes are retained according to our providers' policies, and local storage remains until you delete it."
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
    },
    about: {
      title: "About Douze Points",
      p1: "Douze Points is a passion project created for the Eurovision Song Contest community. Our goal is to provide a fun, daily interactive experience for fans to test their knowledge and celebrate the rich history of the contest.",
      p2: "The game is completely free to play and is maintained as a tribute to the world's greatest music competition."
    },
    stats: {
      title: "Game Statistics & Analytics",
      p1: "To help us understand how the community is performing and to improve the game balance, Douze Points collects anonymous game statistics.",
      p2: "When you complete a game, we record the game type, the score achieved, and the date. This information is aggregated and does not contain any personally identifiable information (such as your name, IP address, or email).",
      p3: "We use Google Firebase (a service provided by Google) to store and process these aggregated statistics. This data is used solely for the purpose of analyzing game popularity and difficulty levels."
    }
  },
  about: {
    title: "About Douze Points",
    subtitle: "Celebrating the Eurovision Song Contest",
    mission: {
      title: "Our Mission",
      p1: "Douze Points was born out of a deep love for the Eurovision Song Contest. My mission is to provide a year-round hub for fans to engage with the contest's rich history through fun, challenging, and interactive daily games. I believe that the spirit of Eurovision—unity through music—should be celebrated every day, not just during the contest week in May.",
      p2: "I believe Eurovision is more than just a music competition—it's a celebration of diversity, culture, and unity. My games are designed to honor that spirit while testing the knowledge of even the most dedicated superfans. From the orchestral ballads of the 1950s to the high-energy pop and rock of the modern era, I cover it all."
    },
    story: {
      title: "The Story",
      p1: "Created by a fan for the fans, Douze Points started as a small project to keep the Eurovision magic alive between contests. The idea was simple: create a daily ritual for fans to test their knowledge and discover new songs from the contest's vast catalog. What began as a single game has evolved into a comprehensive hub with six unique daily challenges.",
      p2: "Whether you're a 'First-Time Voter' who just discovered the contest or a 'Eurovision Legend' who has watched every show since 1956, there's always something new to discover. Our database is constantly growing, featuring thousands of entries, artists, and lyrics from over 65 years of competition."
    },
    history: {
      title: "Eurovision History",
      p1: "The Eurovision Song Contest is one of the longest-running and most-watched non-sporting events in the world. Established in 1956 by the European Broadcasting Union (EBU), it was designed to bring European nations together through a live, simultaneous transnational broadcast. Since then, it has become a platform for musical innovation, cultural exchange, and spectacular television production.",
      p2: "Over the years, the contest has launched the careers of global icons and provided a stage for diverse musical expressions. It has survived political shifts, technological revolutions, and changing musical tastes, always remaining a beloved fixture in the international cultural calendar. At Douze Points, I aim to preserve and celebrate this incredible legacy."
    },
    games: {
      title: "The Games",
      p1: "Our daily challenges are inspired by popular word and logic puzzles, adapted specifically for the ESC community. Each game is designed to test a different area of your knowledge, from lyrics and artists to statistics and history:",
      gameList: [
        { name: "EuroSong", desc: "A Wordle-style song title guessing game." },
        { name: "EuroArtist", desc: "Identify the performer in 6 tries." },
        { name: "EuroRefrain", desc: "Connect lyrics to their iconic hooks." },
        { name: "EuroLinks", desc: "Find the hidden connections between ESC items." },
        { name: "EuroGuess", desc: "The ultimate mystery entry quiz." },
        { name: "EuroArena", desc: "A data-driven battle of Eurovision stats." }
      ]
    },
    community: {
      title: "Community First",
      p1: "I am not affiliated with the EBU or any official broadcaster. I am simply a fan who wants to share my passion for Eurovision with the world. I am committed to maintaining a fair and fun environment for all players, and I welcome feedback from the global Eurovision community to help me improve the site."
    }
  },
  contact: {
    title: "Contact Us",
    methods: {
      title: "Get in Touch",
      p1: "Have a question, feedback, or found a bug? I'd love to hear from you! Whether you have a suggestion for a new feature, a correction for our database, or just want to share your love for a particular Eurovision entry, my inbox is always open. You can reach me via email or find me in the Eurovision community."
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "When do the games reset?",
      a1: "The daily challenges reset every day at midnight (UTC). This ensures that fans all over the world can start their new challenges at the same time.",
      q2: "How is my rank calculated?",
      a2: "Your rank is based on your total career points accumulated across all games. The more you play and the better you perform, the higher you climb! Points are awarded based on how few attempts or mistakes you make in each game.",
      q3: "Can I suggest a song or artist?",
      a3: "Absolutely! I am always looking to improve the database and ensure accuracy. If you notice a missing entry or have a suggestion for a future challenge, please send me an email.",
      q4: "Is Douze Points free to play?",
      a4: "Yes, Douze Points is completely free for everyone. Our goal is to make Eurovision trivia accessible to all fans around the world.",
      q5: "How do I share my results?",
      a5: "After completing a game, you'll see a 'Share' button. This will copy a spoiler-free summary of your performance to your clipboard, which you can then paste into social media or group chats."
    },
    feedback: {
      title: "Feedback",
      p1: "Your feedback helps me make Douze Points better for everyone. I am a fan who appreciates every message I receive. Don't hesitate to share your thoughts on how I can improve the experience, add new games, or make the site more accessible."
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
      "Andorra": "Andorra", "Morocco": "Morocco", "Belarus": "Belarus",
      "Yugoslavia": "Yugoslavia", "Serbia & Montenegro": "Serbia & Montenegro",
      "Serbia and Montenegro": "Serbia and Montenegro",
      "Czech Republic": "Czech Republic"
    },
    genres: {
      "A Cappella": "A Cappella",
      "Acoustic Ballad": "Acoustic Ballad",
      "Acoustic Pop": "Acoustic Pop",
      "Acoustic": "Acoustic",
      "Afrobeats": "Afrobeats",
      "Afropop": "Afropop",
      "Alpine Folk": "Alpine Folk",
      "Alternative Pop": "Alternative Pop",
      "Alternative Rock": "Alternative Rock",
      "Alternative Soul": "Alternative Soul",
      "Antillean Creole": "Antillean Creole",
      "Arabic Pop": "Arabic Pop",
      "Art Pop": "Art Pop",
      "Avant-Garde Jazz": "Avant-Garde Jazz",
      "Avant-Garde Metal": "Avant-Garde Metal",
      "Avant-Garde Pop": "Avant-Garde Pop",
      "Avant-Garde Rock": "Avant-Garde Rock",
      "Avant-Garde": "Avant-Garde",
      "Balkan Ballad": "Balkan Ballad",
      "Balkan Pop": "Balkan Pop",
      "Ballad": "Ballad",
      "Blues Pop": "Blues Pop",
      "Blues Rock": "Blues Rock",
      "Blues": "Blues",
      "Boy Band Pop": "Boy Band Pop",
      "Boy Band": "Boy Band",
      "Britpop": "Britpop",
      "Bubblegum Pop": "Bubblegum Pop",
      "Calypso": "Calypso",
      "Canzone": "Canzone",
      "Celtic Folk": "Celtic Folk",
      "Celtic Pop": "Celtic Pop",
      "Celtic Rock": "Celtic Rock",
      "Chamber Pop": "Chamber Pop",
      "Chanson": "Chanson",
      "Choral": "Choral",
      "Classical & Theatrical": "Classical & Theatrical",
      "Classical Crossover": "Classical Crossover",
      "Comedy & Novelty": "Comedy & Novelty",
      "Comedy Pop": "Comedy Pop",
      "Comedy Rock": "Comedy Rock",
      "Comedy": "Comedy",
      "Contemporary Pop": "Contemporary Pop",
      "Country Pop": "Country Pop",
      "Country Rock": "Country Rock",
      "Country": "Country",
      "Cumbia": "Cumbia",
      "Dalmatian Pop": "Dalmatian Pop",
      "Dance Industrial": "Dance Industrial",
      "Dance Pop": "Dance Pop",
      "Dance-Pop": "Dance-Pop",
      "Dance": "Dance",
      "Dansband": "Dansband",
      "Dark Pop": "Dark Pop",
      "Deep House": "Deep House",
      "Disco Pop": "Disco Pop",
      "Disco": "Disco",
      "Dramatic Ballad": "Dramatic Ballad",
      "Dramatic Pop": "Dramatic Pop",
      "Dream Pop": "Dream Pop",
      "Drum & Bass Pop": "Drum & Bass Pop",
      "Drum & Bass": "Drum & Bass",
      "Dubstep Ballad": "Dubstep Ballad",
      "EDM Pop": "EDM Pop",
      "EDM": "EDM",
      "Electro-Folk": "Electro-Folk",
      "Electro-Swing": "Electro-Swing",
      "Electronic & Dance": "Electronic & Dance",
      "Electronic Dance": "Electronic Dance",
      "Electronic Pop": "Electronic Pop",
      "Electronic Rock": "Electronic Rock",
      "Electronic": "Electronic",
      "Electropop": "Electropop",
      "Epic Pop": "Epic Pop",
      "Ethnic Pop": "Ethnic Pop",
      "Ethno-Ballad": "Ethno-Ballad",
      "Ethno-Drum": "Ethno-Drum",
      "Ethno-Folk": "Ethno-Folk",
      "Ethno-Hip Hop": "Ethno-Hip Hop",
      "Ethno-Jazz": "Ethno-Jazz",
      "Ethno-Pop": "Ethno-Pop",
      "Ethno-Rock": "Ethno-Rock",
      "Ethno-Techno": "Ethno-Techno",
      "Eurodance": "Eurodance",
      "Europop": "Europop",
      "Experimental Pop": "Experimental Pop",
      "Experimental Rock": "Experimental Rock",
      "Experimental": "Experimental",
      "Fado Pop": "Fado Pop",
      "Fado": "Fado",
      "Flamenco Pop": "Flamenco Pop",
      "Flamenco": "Flamenco",
      "Folk & Ethnic": "Folk & Ethnic",
      "Folk Ballad": "Folk Ballad",
      "Folk Hip Hop": "Folk Hip Hop",
      "Folk Jazz": "Folk Jazz",
      "Folk Metal": "Folk Metal",
      "Folk Pop": "Folk Pop",
      "Folk Punk": "Folk Punk",
      "Folk Rock": "Folk Rock",
      "Folk-Rock": "Folk-Rock",
      "Folk": "Folk",
      "Folktronica": "Folktronica",
      "Funk Pop": "Funk Pop",
      "Funk": "Funk",
      "Gabberpop": "Gabberpop",
      "Girl Group": "Girl Group",
      "Glam Metal": "Glam Metal",
      "Glam Pop": "Glam Pop",
      "Glam Rock": "Glam Rock",
      "Gospel Ballad": "Gospel Ballad",
      "Gospel Pop": "Gospel Pop",
      "Gospel": "Gospel",
      "Gothic Rock": "Gothic Rock",
      "Gypsy Pop": "Gypsy Pop",
      "Hard Rock": "Hard Rock",
      "Heavy Metal": "Heavy Metal",
      "Hip Hop Pop": "Hip Hop Pop",
      "Hip Hop": "Hip Hop",
      "House": "House",
      "Hyperpop": "Hyperpop",
      "Indie Folk": "Indie Folk",
      "Indie Pop": "Indie Pop",
      "Indie Rock": "Indie Rock",
      "Indie-Pop": "Indie-Pop",
      "Industrial Metal": "Industrial Metal",
      "Industrial Pop": "Industrial Pop",
      "Industrial Techno": "Industrial Techno",
      "Italian Pop": "Italian Pop",
      "Italo Pop": "Italo Pop",
      "Jazz Ballad": "Jazz Ballad",
      "Jazz Pop": "Jazz Pop",
      "Jazz Rock": "Jazz Rock",
      "Jazz Waltz": "Jazz Waltz",
      "Jazz, Blues & Soul": "Jazz, Blues & Soul",
      "Jazz": "Jazz",
      "Klapa": "Klapa",
      "Laïko Pop": "Laïko Pop",
      "Laïko": "Laïko",
      "Latin Pop": "Latin Pop",
      "Metalcore": "Metalcore",
      "Multilingual Pop": "Multilingual Pop",
      "Musical Theater": "Musical Theater",
      "Neo-Folk": "Neo-Folk",
      "New Age": "New Age",
      "New Wave": "New Wave",
      "None": "None",
      "Nordic Folk": "Nordic Folk",
      "Novelty Pop": "Novelty Pop",
      "Novelty": "Novelty",
      "Nu Metal": "Nu Metal",
      "Opera": "Opera",
      "Operatic Pop": "Operatic Pop",
      "Operatic Rock": "Operatic Rock",
      "Operetta": "Operetta",
      "Orchestral Pop": "Orchestral Pop",
      "Other": "Other",
      "Paso Doble": "Paso Doble",
      "Piano Ballad": "Piano Ballad",
      "Pimba": "Pimba",
      "Pop Ballad": "Pop Ballad",
      "Pop Folk": "Pop Folk",
      "Pop Punk": "Pop Punk",
      "Pop Rap": "Pop Rap",
      "Pop Rock": "Pop Rock",
      "Pop-Rock": "Pop-Rock",
      "Pop": "Pop",
      "Power Ballad": "Power Ballad",
      "Progressive Metal": "Progressive Metal",
      "Progressive Rock": "Progressive Rock",
      "Punk Folk": "Punk Folk",
      "Punk Rock": "Punk Rock",
      "R&B & Hip Hop": "R&B & Hip Hop",
      "R&B Pop": "R&B Pop",
      "R&B": "R&B",
      "Rap": "Rap",
      "Rave Pop": "Rave Pop",
      "Reggae": "Reggae",
      "Retro Pop": "Retro Pop",
      "Rock & Metal": "Rock & Metal",
      "Rock Ballad": "Rock Ballad",
      "Rock": "Rock",
      "Rockabilly": "Rockabilly",
      "Romantic Ballad": "Romantic Ballad",
      "Rumba Catalana": "Rumba Catalana",
      "Satirical Pop": "Satirical Pop",
      "Schlager & Chanson": "Schlager & Chanson",
      "Schlager": "Schlager",
      "Ska Folk": "Ska Folk",
      "Ska Pop": "Ska Pop",
      "Ska Punk": "Ska Punk",
      "Soft Rock": "Soft Rock",
      "Soul Ballad": "Soul Ballad",
      "Soul Pop": "Soul Pop",
      "Soul": "Soul",
      "Spaghetti Western Pop": "Spaghetti Western Pop",
      "Swing": "Swing",
      "Symphonic Rock": "Symphonic Rock",
      "Synth-Pop": "Synth-Pop",
      "Synthpop": "Synthpop",
      "Tango Pop": "Tango Pop",
      "Techno Pop": "Techno Pop",
      "Techno": "Techno",
      "Teen Pop": "Teen Pop",
      "Traditional Folk": "Traditional Folk",
      "Trance": "Trance",
      "Trap Pop": "Trap Pop",
      "Trap": "Trap",
      "Trip Hop": "Trip Hop",
      "Turbo-Folk": "Turbo-Folk",
      "Vocal Group": "Vocal Group",
      "Waltz Pop": "Waltz Pop",
      "Yodel Rap Rock": "Yodel Rap Rock",
      "Zeibekiko Hip Hop": "Zeibekiko Hip Hop",
      "Zouk": "Zouk"
    },
    sex: {
      "Male": "Male", "Female": "Female", "Mixed": "Mixed", "Other": "Other"
    },
    sizes: {
      solo: "Solo",
      duo: "Duo"
    }
  },
  support: {
    title: "Enjoying Douze Points?",
    completed: "You completed today's challenges!",
    button: "Buy me a coffee"
  }
};