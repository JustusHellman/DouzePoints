import { TranslationSchema } from './types.ts';

export const it: TranslationSchema = {
  common: {
    back: "Indietro",
    play: "Gioca",
    submit: "Invia",
    loading: "Caricamento...",
    share: "Condividi Scheda",
    shareDaily: "Condividi Punteggio Giornaliero",
    shareCareer: "Condividi Statistiche",
    shareHallOfFame: "Condividi Hall of Fame",
    copied: "Copiato negli appunti!",
    returnToGreenroom: "Torna alla Greenroom",
    perfect: "Perfetto",
    finished: "Terminato",
    douzePoints: "DOUZE POINTS!",
    nulPoints: "NUL POINTS",
    points: "Punti",
    pointsShort: "pt",
    attempts: "tentativi",
    steps: "passaggi",
    mistakesLeft: "Errori rimasti",
    howToPlay: "Come giocare",
    close: "Chiudi",
    selectLanguage: "Seleziona Lingua"
  },
  greenroom: {
    greenroom: "La Greenroom",
    description: "Benvenuto nella Greenroom. Dimostra le tue conoscenze sull'Eurovision Song Contest con sei sfide quotidiane per il superfan definitivo.",
    dailyProgress: "Progresso Giornaliero",
    qualified: "✨ Qualificato per la Grand Final ✨",
    finishedToday: "Completato oggi",
    statsButton: "Stats",
    careerStats: "Stats",
    todayScore: "Punteggio di oggi"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Sfida quotidiana sui titoli dell'Eurovision.",
      rules: "Indovina il titolo della canzone dell'Eurovision nascosta in 6 tentativi. Puoi inserire qualsiasi combinazione de lettere. Il colore delle tessere cambierà per mostrare quanto eri vicino alla risposta.\n\n🟩: Lettera e posizione corrette\n🟨: Lettera corretta, posizione errata\n⬛: Lettera errata"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Sfida quotidiana sugli artisti ESC.",
      rules: "Indovina l'artista ESC nascosto in 6 tentativi. Puoi inserire qualsiasi combinazione de lettere. Il colore delle tessere cambierà per mostrare quanto eri vicino alla risposta.\n\n🟩: Lettera e posizione corrette\n🟨: Lettera corretta, posizione errata\n⬛: Lettera errata"
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Collega 4 parole da un hook lirico.",
      rules: "Trova gruppi di quattro parole che formano un hook sequenziale o un ritornello di una specifica canzone dell'Eurovision. Seleziona quattro parole e premi 'Invia'. Hai 6 errori a disposizione per identificare tutte e 4 le canzoni!"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Raggruppa 4 elementi dell'Eurovision.",
      rules: "Trova gruppi di quattro elementi che condividono un tema comune del festival. Seleziona quattro elementi e premi 'Invia' per controllare. Hai 6 errori a disposizione!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifica l'entry tramite indizi ESC.",
      rules: "Identifica l'entry misteriosa del festival usando fino a 6 indizi. Ogni errore rivela un nuovo indizio più specifico (Anno, Paese, Genere, ecc.). Indovinare subito conferisce più punti!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Indovina tramite le statistiche del festival.",
      rules: "Confronta i tuoi tentativi con un'entry misteriosa dell'Eurovision. Usa i marcatori di attributo (Anno, Posizione, Paese, Genere, Dimensione, Sesso) per restringere la ricerca.\n\n🟩: Corrispondenza Perfetta\n🟨: Corrispondenza Vicina (anno/posizione vicini, stessa regione o gruppo di genere)\n⬛: Nessuna Corrispondenza"
    }
  },
  wordGame: {
    enter: "Invio",
    board: "Tabellone",
    keyboard: "Tastiera virtuale"
  },
  links: {
    mistakesRemaining: "Errori rimasti",
    oneAway: "Manca solo uno...",
    notALink: "Nessun collegamento",
    shuffle: "Mescola",
    deselectAll: "Deseleziona tutto",
    categoriesDiscovered: "Categorie Scoperte",
    lyricsDiscovered: "Ritornelli Scoperti"
  },
  guesser: {
    searchPlaceholder: "Cerca entry dell'Eurovision...",
    noResults: "Nessuna entry corrispondente",
    hintLabels: {
      year: "Anno",
      country: "Paese",
      genre: "Genere",
      placing: "Posizione",
      fact: "Curiosità",
      artist: "Membri"
    }
  },
  arena: {
    analyze: "Analizza il campo dell'Eurovision",
    verdict: "Vedi il verdetto dell'Arena",
    labels: {
      year: "Anno",
      rank: "Posiz.",
      country: "Paese",
      genre: "Genere",
      size: "Taglia",
      sex: "Sesso"
    }
  },
  stats: {
    totalRecord: "Record dell'Eurovision",
    voterBreakdown: "Dettaglio Votazioni",
    howToWin: "Come Vincere",
    earnPoints: "Guadagna Punti Rango",
    earnPointsDesc: "Accumula punti per scalare la classifica. Le vittorie perfette danno punteggi più alti.",
    claimDouze: "Ottieni Douze Points 🏆",
    claimDouzeDesc: "Assegnati per le partite perfette (nessun errore o vittoria al primo tentativo).",
    gotIt: "Capito, giochiamo!",
    played: "Giocate",
    wins: "Vittorie",
    winRate: "Percentuale",
    streak: "Serie",
    scoreHistory: "Storico Punteggi",
    pointsNeeded: "pt al",
    toRank: "Prossimo Livello"
  },
  scorecard: {
    performanceVerdict: "Verdetto della Performance",
    dailyResult: "Risultato Giornaliero",
    revealedEntry: "Entry Svelata",
    origin: "Origine",
    year: "Anno",
    placing: "Posizione",
    greenroomGossip: "Gossip dalla Greenroom",
    performanceLog: "Log della Performance",
    watch: "GUARDA",
    reviewBoard: "Rivedi Tabellone",
    shareResult: "Condividi Risultato",
    resultsCopied: "Risultati Copiati!",
    breakthrough: "Successo all'indizio",
    signalLost: "Segnale perso...",
    score: "Punteggio",
    viewScorecard: "Vedi Scheda",
    headlines: {
      nulPoints: "❌ NUL POINTS... 🗳️",
      douzePoints: "🏆 DOUZE POINTS! ✨",
      greatPerformance: "🌟 GRANDE PERFORMANCE! 🎤",
      qualified: "🗳️ QUALIFICATO! 🎤"
    }
  },
  cookies: {
    bannerText: "Utilizziamo i cookie per personalizzare contenuti e annunci, fornire funzioni social e analizzare il traffico.",
    learnMore: "Scopri di più",
    acceptAll: "Accetta tutti",
    decline: "Solo essenziali",
    manage: "Gestisci",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    privacySettings: "Privacy"
  },
  ranks: {
    "First-Time Voter": "Primo Votante",
    "Backing Vocalist": "Corista",
    "National Finalist": "Finalista Nazionale",
    "Semi-Final Qualifier": "Qualificato in Semifinale",
    "Grand Finalist": "Finalista della Grand Final",
    "Top 10 Contender": "Contendente Top 10",
    "Podium Finish": "Piazzamento sul Podio",
    "Winner": "Winner",
    "Multi-Winner": "Vincitore Multiplo",
    "Hall of Famer": "Hall of Famer",
    "Eurovision Legend": "Leggenda dell'Eurovision"
  },
  metadata: {
    countries: {
      "Switzerland": "Svizzera", "Sweden": "Svezia", "Finland": "Finlandia", "The Netherlands": "Paesi Bassi",
      "Italy": "Italia", "Croatia": "Croazia", "United Kingdom": "Regno Unito", "Ukraine": "Ucraina",
      "Israel": "Israele", "Portugal": "Portogallo", "Denmark": "Danimarca", "Norway": "Norvegia", "Spain": "Spagna",
      "Austria": "Austria", "Cyprus": "Cipro", "Iceland": "Islanda", "Germany": "Germania", "Azerbaijan": "Azerbaigian",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Grecia", "Moldova": "Moldavia", "Belgium": "Belgio",
      "Poland": "Polonia", "Slovenia": "Slovenia", "Ireland": "Irlanda", "Luxembourg": "Lussemburgo", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonie": "Estonia", "Russia": "Russia", "Turkey": "Turchia", "Bosnia & Herzegovina": "Bosnia ed Erzegovina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Lettonia", "Hungary": "Ungheria", "San Marino": "San Marino"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Opera", "Drum and Bass / Opera": "Drum and Bass / Opera",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballad": "Ballata", "Rock": "Rock", "Industrial Rock": "Rock Industriale", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Pop Comique", "Latin Pop": "Pop Latino",
      "R&B": "R&B", "Orchestral Pop": "Pop Orchestrale", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Indie Pop", "Ethno-Pop": "Ethno-Pop", "Soul": "Soul", "Other": "Altro", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternative", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Ballata Pop", "Electronic": "Elettronica", "Industrial Techno": "Techno Industriale",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Neoclassica", "Folk Ballad": "Ballata Folk", "Pop Rock": "Pop Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Folk Celtico", "Balkan Ballad": "Ballata Balcanica", "Disco": "Disco"
    },
    sex: {
      "Male": "Maschio", "Female": "Femmina", "Mixed": "Misto", "Other": "Altro"
    },
    sizes: {
      solo: "Solista",
      duo: "Duo"
    }
  }
};