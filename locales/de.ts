
import { TranslationSchema } from './types.ts';

export const de: TranslationSchema = {
  common: {
    back: "Zurück",
    play: "Spielen",
    submit: "Absenden",
    loading: "Laden...",
    share: "Karte teilen",
    shareDaily: "Tagespunktzahl teilen",
    shareCareer: "Statistiken teilen",
    shareHallOfFame: "Hall of Fame teilen",
    copied: "In die Zwischenablage kopiert!",
    returnToGreenroom: "Zurück zum Greenroom",
    perfect: "Perfekt",
    finished: "Beendet",
    douzePoints: "DOUZE POINTS!",
    nulPoints: "NULL PUNKTE",
    points: "Punkte",
    pointsShort: "Pkt",
    attempts: "Versuche",
    steps: "Schritte",
    mistakesLeft: "Fehler verbleibend",
    howToPlay: "Spielanleitung",
    close: "Schließen",
    selectLanguage: "Sprache Wählen"
  },
  greenroom: {
    greenroom: "Der Greenroom",
    description: "Willkommen im Greenroom. Teste dein Wissen über den Eurovision Song Contest mit fünf täglichen Herausforderungen für den ultimativen Superfan.",
    dailyProgress: "Tagesfortschritt",
    qualified: "✨ Qualifiziert für das Finale ✨",
    finishedToday: "Heute abgeschlossen",
    statsButton: "Stats",
    careerStats: "Statistiken",
    todayScore: "Heutige Punktzahl"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Tägliche Eurovision Titel-Herausforderung.",
      rules: "Errate den versteckten Eurovision Songtitel in 6 Versuchen. Du kannst jede Buchstabenkombination eingeben. Die Farbe der Kacheln zeigt an, wie nah du der Lösung warst.\n\n🟩: Richtiger Buchstabe & Position\n🟨: Richtiger Buchstabe, falsche Position\n⬛: Falscher Buchstabe"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Tägliche ESC Künstler-Herausforderung.",
      rules: "Errate den versteckten ESC Künstler in 6 Versuchen. Du kannst jede Buchstabenkombination eingeben. Die Farbe der Kacheln zeigt an, wie nah du der Lösung warst.\n\n🟩: Richtiger Buchstabe & Position\n🟨: Richtiger Buchstabe, falsche Position\n⬛: Falscher Buchstabe"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Gruppiere 4 Eurovision Begriffe.",
      rules: "Finde Gruppen von vier Begriffen, die ein gemeinsames Eurovision-Thema haben. Wähle vier Begriffe aus und tippe auf 'Absenden'. Du hast 6 Fehler frei!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Erkenne den Beitrag über ESC Hinweise.",
      rules: "Identifiziere den mysteriösen Song-Contest-Beitrag mit bis zu 6 Hinweisen. Jeder falsche Tipp enthüllt einen neuen, spezifischeren Hinweis (Jahr, Land, Genre usw.). Frühes Erraten gibt mehr Punkte!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Errate über Statistiken des Contests.",
      rules: "Vergleiche deine Tipps mit einem mysteriösen Eurovision Zielbeitrag. Nutze die Attribute (Jahr, Rang, Land, Genre, Größe, Geschlecht), um deine Suche einzugrenzen.\n\n🟩: Perfekter Treffer\n🟨: Nahe dran (nahes Jahr/Rang, gleiche Region oder Genregruppe)\n⬛: Kein Treffer"
    }
  },
  wordGame: {
    enter: "Eingabe",
    board: "Spielfeld",
    keyboard: "Virtuelle Tastatur"
  },
  links: {
    mistakesRemaining: "Verbleibende Fehler",
    oneAway: "Nur noch einer...",
    notALink: "Keine Verbindung",
    shuffle: "Mischen",
    deselectAll: "Alle abwählen",
    categoriesDiscovered: "Gefundene Kategorien"
  },
  guesser: {
    searchPlaceholder: "Suche Eurovision Beiträge...",
    noResults: "Keine passenden Beiträge gefunden",
    hintLabels: {
      year: "Jahr",
      country: "Land",
      genre: "Genre",
      placing: "Platzierung",
      fact: "Fun Fact",
      artist: "Mitglieder"
    }
  },
  arena: {
    analyze: "Analysiere das Eurovision Feld",
    verdict: "Arena-Urteil ansehen",
    labels: {
      year: "Jahr",
      rank: "Rang",
      country: "Land",
      genre: "Genre",
      size: "Größe",
      sex: "Geschlecht"
    }
  },
  stats: {
    totalRecord: "Eurovision Rekord",
    voterBreakdown: "Wähler-Details",
    howToWin: "Wie man gewinnt",
    earnPoints: "Rang-Punkte verdienen",
    earnPointsDesc: "Sammle Punkte, um in der Rangliste aufzusteigen. Makellose Siege bringen höhere Punktzahlen.",
    claimDouze: "Douze Points erhalten 🏆",
    claimDouzeDesc: "Vergeben für perfekte Spiele (keine Fehler oder Sieg beim ersten Versuch).",
    gotIt: "Verstanden, los geht's",
    played: "Gespielt",
    wins: "Siege",
    winRate: "Erfolgsquote",
    streak: "Serie",
    scoreHistory: "Punktverlauf",
    pointsNeeded: "Pkt bis",
    toRank: "Nächster Rang"
  },
  scorecard: {
    performanceVerdict: "Auftritts-Urteil",
    dailyResult: "Tagesergebnis",
    revealedEntry: "Enthüllter Beitrag",
    origin: "Herkunft",
    year: "Jahr",
    placing: "Platzierung",
    greenroomGossip: "Greenroom-Geflüster",
    performanceLog: "Auftritts-Protokoll",
    watch: "ANSEHEN",
    reviewBoard: "Feld überprüfen",
    shareResult: "Ergebnis teilen",
    resultsCopied: "Ergebnis kopiert!",
    breakthrough: "Durchbruch bei Hinweis",
    signalLost: "Signal verloren...",
    score: "Punktzahl",
    viewScorecard: "Punktestand ansehen",
    headlines: {
      nulPoints: "❌ NULL PUNKTE... 🗳️",
      douzePoints: "🏆 DOUZE POINTS! ✨",
      greatPerformance: "🌟 TOLLE PERFORMANCE! 🎤",
      qualified: "🗳️ QUALIFIZIERT! 🎤"
    }
  },
  cookies: {
    bannerText: "Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und unseren Datenverkehr zu analysieren.",
    learnMore: "Mehr erfahren",
    acceptAll: "Alle akzeptieren",
    decline: "Nur essenzielle",
    manage: "Verwalten",
    privacyPolicy: "Datenschutzerklärung",
    cookiePolicy: "Cookie-Richtlinie",
    privacySettings: "Privatsphäre"
  },
  ranks: {
    "First-Time Voter": "Erst-Wähler",
    "Backing Vocalist": "Hintergrundsänger",
    "National Finalist": "Vorentscheid-Teilnehmer",
    "Semi-Final Qualifier": "Halbfinal-Qualifikant",
    "Grand Finalist": "Finalist",
    "Top 10 Contender": "Top-10-Kandidat",
    "Podium Finish": "Podestplatz",
    "Winner": "Winner",
    "Multi-Winner": "Mehrfach-Gewinner",
    "Hall of Famer": "Hall of Famer",
    "Eurovision Legend": "Eurovision-Legende"
  },
  metadata: {
    countries: {
      "Switzerland": "Schweiz", "Sweden": "Schweden", "Finland": "Finnland", "Netherlands": "Niederlande",
      "Italy": "Italien", "Croatien": "Kroatien", "United Kingdom": "Vereinigtes Königreich", "Ukraine": "Ukraine",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Danimarca", "Norway": "Norwegen", "Spain": "Spanien",
      "Austria": "Österreich", "Cyprus": "Zypern", "Iceland": "Island", "Germany": "Deutschland", "Azerbaijan": "Aserbaidschan",
      "Serbia": "Serbien", "Australia": "Australien", "Greece": "Griechenland", "Moldova": "Moldawien", "Belgium": "Belgien",
      "Poland": "Polen", "Slovenia": "Slowenien", "Ireland": "Irland", "Luxembourg": "Luxemburg", "Albania": "Albanien",
      "Bulgaria": "Bulgarien", "Estonia": "Estland", "Russia": "Russland", "Turkey": "Türkei", "Bosnia & Herzegovina": "Bosnien & Herzegowina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Lettland", "Hungary": "Ungarn"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Oper", "Drum and Bass / Opera": "Drum and Bass / Oper",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballade": "Ballade", "Rock": "Rock", "Industrial Rock": "Industrial Rock", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Comedy Pop", "Latin Pop": "Latin Pop",
      "R&B": "R&B", "Orchestral Pop": "Orchestral Pop", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Indie Pop", "Ethno-Pop": "Ethno-Pop", "Soul": "Soul", "Other": "Andere", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternative", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Pop-Ballade", "Electronic": "Electronic", "Industrial Techno": "Industrial Techno",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Neoklassik", "Folk Ballad": "Folk-Ballade", "Pop Rock": "Pop-Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Keltischer Folk", "Balkan Ballad": "Balkan-Ballade", "Disco": "Disco"
    },
    sex: {
      "Male": "Männlich", "Female": "Weiblich", "Mixed": "Gemischt", "Other": "Andere"
    },
    sizes: {
      solo: "Solo",
      duo: "Duo"
    }
  }
};
