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
    selectLanguage: "Sprache Wählen",
    languages: "Sprachen",
    qualified: "Qualifiziert"
  },
  greenroom: {
    greenroom: "Der Greenroom",
    description: "Entspanne dich und bereite dich auf den Auftritt vor. Teste dein Wissen über den Eurovision Song Contest mit sechs täglichen Herausforderungen für den ultimativen Superfan.",
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
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Verbinde 4 Wörter aus einem Lyric-Hook.",
      rules: "Finde Gruppen von vier Wörtern, die einen sequentiellen Hook oder Refrain aus einem bestimmten Eurovision-Song bilden. Wähle vier Wörter aus und tippe auf 'Absenden'. Du hast 6 Fehler frei, um alle 4 Songs zu identifizieren!"
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
    betterLuck: "Viel Glück morgen!",
    notALink: "Keine Verbindung",
    shuffle: "Mischen",
    deselectAll: "Alle abwählen",
    categoriesDiscovered: "Gefundene Kategorien",
    lyricsDiscovered: "Song-Hooks Gefunden"
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
    score: "Pointzahl",
    viewScorecard: "Punktestand ansehen",
    nextGame: "Nächstes Spiel in",
    headlines: {
      nulPoints: "❌ NULL PUNKTE... 🗳️",
      douzePoints: "🏆 DOUZE POINTS! ✨",
      greatPerformance: "🌟 TOLLE PERFORMANCE! 🎤",
      qualified: "🗳️ QUALIFIÉ ! 🎤"
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
    privacySettings: "Privatsphäre",
    lastUpdated: "Zuletzt aktualisiert"
  },
  privacy: {
    lastUpdated: "Februar 2026",
    introduction: {
      title: "Einleitung",
      p1: "Willkommen bei Douze Points (www.douzepoints.net).",
      p2: "Diese Website wird von Justus Hellman mit Sitz in Schweden betrieben (der „Verantwortliche“).",
      p3: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie oder Ihren personenbezogenen Daten haben, können Sie uns kontaktieren: douzepointsgame@gmail.com"
    },
    dataCollection: {
      title: "Welche Daten wir sammeln",
      autoTitle: "a) Automatisch erhobene Daten",
      autoDesc: "Wenn Sie die Website besuchen, können bestimmte Informationen automatisch erfasst werden, darunter:",
      autoItems: ["IP-Adresse", "Browsertyp und -version", "Geräteinformationen", "Betriebssystem", "Besuchte Seiten", "Datum und Uhrzeit des Zugriffs", "Referrer-Website"],
      autoFootnote: "Diese Informationen können von unseren Werbe- und Analyseanbietern verarbeitet werden.",
      cookiesTitle: "b) Cookies und ähnliche Technologien",
      cookiesDesc1: "Wir verwenden Cookies und ähnliche Technologien für Werbung, Messung der Anzeigenleistung und Website-Funktionalität.",
      cookiesDesc2: "Die Einwilligung für Cookies wird über Google Funding Choices eingeholt und verwaltet, das unsere Consent Management Platform (CMP) bereitstellt. Nutzer in relevanten Regionen (wie EU/EWR und UK) werden um ihre Einwilligung gebeten, bevor nicht-essenzielle Cookies verwendet werden.",
      cookiesDesc3: "Sie können Ihre Einwilligungseinstellungen jederzeit über die auf der Website verfügbaren Einwilligungsoptionen ändern."
    },
    advertising: {
      title: "Werbung",
      p1: "Wir verwenden Google AdSense, um Werbung anzuzeigen. Google und seine Partner können Cookies und ähnliche Technologien verwenden, um personalisierte Anzeigen zu schalten, die Anzeigenleistung zu messen und die Häufigkeit zu begrenzen, mit der Sie eine Anzeige sehen.",
      p2: "Sie können Ihre Werbeeinstellungen verwalten über: adssettings.google.com",
      p3: "Weitere Informationen darüber, wie Google personenbezogene Daten verarbeitet, finden Sie in der Datenschutzerklärung von Google."
    },
    legalBasis: {
      title: "Rechtsgrundlage (DSGVO)",
      p1: "Wenn Sie sich in der EU/im EWR befinden, verarbeiten wir personenbezogene Daten auf den folgenden Rechtsgrundlagen:",
      consentLabel: "Einwilligung",
      consent: "für personalisierte Werbung und nicht-essenzielle Cookies.",
      legitimacyLabel: "Legitimität",
      legitimacy: "für grundlegende Website-Funktionalität, Sicherheit und Betrugsprävention.",
      legalLabel: "Rechtlich",
      legal: "wo dies nach geltendem Recht erforderlich ist."
    },
    localStorage: {
      title: "Lokaler Speicher",
      p1: "Wir verwenden den lokalen Speicher Ihres Browsers, um Spielfortschritte, Spielstände und Statistiken zu speichern. Diese Informationen:",
      items: ["Werden nur auf Ihrem Gerät gespeichert", "Werden nicht an unsere Server übertragen", "Können durch Löschen Ihrer Browserdaten gelöscht werden"]
    },
    dataSharing: {
      title: "Weitergabe von Daten",
      p1: "Wir verkaufen keine personenbezogenen Daten. Daten können jedoch von Drittanbietern verarbeitet werden, darunter:",
      items: ["Google (Werbung und Einwilligungsmanagement)", "Hosting-Anbieter", "Technische Dienstleister, die für den Betrieb der Website erforderlich sind"]
    },
    internationalTransfers: {
      title: "Internationale Übermittlungen",
      p1: "Einige Drittanbieter, einschließlich Google, können Daten außerhalb der EU oder des EWR verarbeiten. Wo solche Übermittlungen stattfinden, werden angemessene Garantien wie Standardvertragsklauseln verwendet."
    },
    dataRetention: {
      title: "Datenspeicherung",
      p1: "Wir führen keine Benutzerdatenbank. Werbedaten werden gemäß den Richtlinien von Google gespeichert, technische Protokolle für Sicherheitszwecke und der lokale Speicher bleibt erhalten, bis Sie ihn löschen."
    },
    yourRights: {
      title: "Ihre Rechte (EU/EWR)",
      p1: "Wenn Sie sich in der EU/im EWR befinden, haben Sie das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten sowie auf Einschränkung oder Widerspruch gegen die Verarbeitung. In Schweden ist die Aufsichtsbehörde Integritetsskyddsmyndigheten.",
      p2: "Kontaktieren Sie uns unter douzepointsgame@gmail.com, um Ihre Rechte auszuüben."
    },
    dataSecurity: {
      title: "Datensicherheit",
      p1: "Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten. Keine Methode der Übertragung über das Internet ist jedoch vollständig sicher."
    },
    thirdPartyLinks: {
      title: "Links zu Websites Dritter",
      p1: "Diese Website kann Links zu Websites Dritter enthalten, einschließlich YouTube. Wir sind nicht verantwortlich für die Datenschutzpraktiken oder Inhalte externer Websites."
    },
    changes: {
      title: "Änderungen an dieser Richtlinie",
      p1: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Alle Aktualisierungen werden auf dieser Seite mit einem überarbeiteten Datum „Zuletzt aktualisiert“ veröffentlicht."
    }
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
      "Switzerland": "Schweiz", "Sweden": "Schweden", "Finland": "Finnland", "The Netherlands": "Niederlande",
      "Italy": "Italien", "Croatia": "Kroatien", "United Kingdom": "Vereinigtes Königreich", "Ukraine": "Ukraine",
      "France": "Frankreich",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Danimarca", "Norway": "Norwegen", "Spain": "Spanien",
      "Austria": "Österreich", "Cyprus": "Zypern", "Iceland": "Island", "Germany": "Deutschland", "Azerbaijan": "Aserbaidschan",
      "Serbia": "Serbien", "Australia": "Australien", "Greece": "Griechenland", "Moldova": "Moldawien", "Belgium": "Belgien",
      "Poland": "Polen", "Slovenia": "Slowenien", "Ireland": "Irland", "Luxembourg": "Luxemburg", "Albania": "Albanien",
      "Bulgaria": "Bulgarien", "Estonia": "Estland", "Russia": "Russland", "Turkey": "Türkei", "Bosnia & Herzegovina": "Bosnien & Herzegowina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Lettland", "Hungary": "Ungarn", "San Marino": "San Marino"
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