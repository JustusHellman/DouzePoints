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
    description: "Rilassati e preparati per la performance. Cinque sfide quotidiane per dimostrare di essere il superfan definitivo.",
    dailyProgress: "Progresso Giornaliero",
    qualified: "✨ Qualificato per la Grand Final ✨",
    finishedToday: "Completato oggi",
    statsButton: "Record della Grand Final",
    careerStats: "Stats",
    todayScore: "Punteggio di oggi"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Sfida quotidiana sui titoli.",
      rules: "Indovina il titolo della canzone nascosta in 6 tentativi. Puoi inserire qualsiasi combinazione di lettere. Il colore delle tessere cambierà per mostrare quanto eri vicino alla risposta.\n\n🟩: Lettera e posizione corrette\n🟨: Lettera corretta, posizione errata\n⬛: Lettera errata"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Sfida quotidiana sugli artisti.",
      rules: "Indovina l'artista nascosto in 6 tentativi. Puoi inserire qualsiasi combinazione di lettere. Il colore delle tessere cambierà per mostrare quanto eri vicino alla risposta.\n\n🟩: Lettera e posizione corrette\n🟨: Lettera corretta, posizione errata\n⬛: Lettera errata"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Raggruppa 4 elementi correlati.",
      rules: "Trova gruppi di quattro elementi che condividono un tema comune del festival. Seleziona quattro elementi e premi 'Invia' per controllare. Hai 6 errori a disposizione!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifica l'entry da 6 indizi.",
      rules: "Identifica l'entry misteriosa usando fino a 6 indizi. Ogni errore rivela un nuovo indizio più specifico (Anno, Paese, Genere, ecc.). Indovinare subito conferisce più punti!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Indovina con le statistiche.",
      rules: "Confronta i tuoi tentativi con un'entry misteriosa. Usa i marcatori di attributo (Anno, Posizione, Paese, Genere, Dimensione, Sesso) per restringere la ricerca.\n\n🟩: Corrispondenza Perfetta\n🟨: Corrispondenza Vicina (anno/posizione vicini, stessa regione o gruppo di genere)\n⬛: Nessuna Corrispondenza"
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
    categoriesDiscovered: "Categorie Scoperte"
  },
  guesser: {
    searchPlaceholder: "Cerca titolo, artista o paese...",
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
    analyze: "Analizza il campo",
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
    totalRecord: "Record della Grand Final",
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
    "Winner": "Vincitore",
    "Multi-Winner": "Vincitore Multiplo",
    "Hall of Famer": "Hall of Famer",
    "Eurovision Legend": "Leggenda dell'Eurovision"
  },
  metadata: {
    countries: {
      "Switzerland": "Svizzera", "Sweden": "Svezia", "Finland": "Finlandia", "Netherlands": "Paesi Bassi",
      "Italy": "Italia", "Croazia": "Croazia", "United Kingdom": "Regno Unito", "Ukraine": "Ucraina",
      "Israel": "Israele", "Portugal": "Portogallo", "Denmark": "Danimarca", "Norway": "Norvegia", "Spain": "Spagna",
      "Austria": "Austria", "Cyprus": "Cipro", "Iceland": "Islanda", "Germany": "Germania", "Azerbaijan": "Azerbaigian",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Grecia", "Moldova": "Moldavia", "Belgium": "Belgio",
      "Poland": "Polonia", "Slovenia": "Slovenia", "Ireland": "Irlanda", "Luxembourg": "Lussemburgo", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Russia", "Turkey": "Turchia", "Bosnia & Herzegovina": "Bosnia ed Erzegovina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Lettonie", "Hungary": "Ungheria"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Opera", "Drum and Bass / Opera": "Drum and Bass / Opera",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballad": "Ballata", "Rock": "Rock", "Industrial Rock": "Rock Industriale", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Pop Comico", "Latin Pop": "Pop Latino",
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