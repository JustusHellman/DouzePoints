import { TranslationSchema } from './types.ts';

export const fr: TranslationSchema = {
  common: {
    back: "Retour",
    play: "Jouer",
    submit: "Envoyer",
    loading: "Chargement...",
    share: "Partager la Fiche",
    shareDaily: "Partager le Score du Jour",
    shareCareer: "Partager les Stats",
    shareHallOfFame: "Partager le Hall of Fame",
    copied: "Copié dans le presse-papiers !",
    returnToGreenroom: "Retour au Greenroom",
    perfect: "Parfait",
    finished: "Terminé",
    douzePoints: "DOUZE POINTS !",
    nulPoints: "NUL POINTS",
    points: "Points",
    pointsShort: "pts",
    attempts: "essais",
    steps: "étapes",
    mistakesLeft: "Erreurs restantes",
    howToPlay: "Comment jouer",
    close: "Fermer",
    selectLanguage: "Choisir la Langue"
  },
  greenroom: {
    greenroom: "Le Greenroom",
    description: "Détendez-vous et préparez-vous pour la performance. Cinq défis quotidiens pour prouver que vous êtes le fan ultime.",
    dailyProgress: "Progression du Jour",
    qualified: "✨ Qualifié pour la Grande Finale ✨",
    finishedToday: "Terminé aujourd'hui",
    statsButton: "Record de la Grande Finale",
    careerStats: "Stats",
    todayScore: "Score du Jour"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Défi quotidien de titres.",
      rules: "Devinez le titre de la chanson cachée en 6 essais. Vous pouvez entrer n'importe quelle combinaison de lettres. La couleur des tuiles changera pour montrer si vous étiez proche.\n\n🟩 : Lettre et position correctes\n🟨 : Lettre correcte, mauvaise position\n⬛ : Mauvaise lettre"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Défi quotidien d'artistes.",
      rules: "Devinez l'artiste caché en 6 essais. Vous pouvez entrer n'importe quelle combinaison de lettres. La couleur des tuiles changera pour montrer si vous étiez proche.\n\n🟩 : Lettre et position correctes\n🟨 : Lettre correcte, mauvaise position\n⬛ : Mauvaise lettre"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Groupez 4 éléments liés.",
      rules: "Trouvez des groupes de quatre éléments qui partagent un thème commun du concours. Sélectionnez quatre éléments et appuyez sur 'Envoyer' pour vérifier. Vous avez droit à 6 erreurs !"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifiez l'entrée via 6 indices.",
      rules: "Identifiez l'entrée mystère en utilisant jusqu'à 6 indices. Chaque erreur révèle un indice plus précis (Année, Pays, Genre, etc.). Plus vous devinez vite, plus vous marquez de points !"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Devinez via les statistiques.",
      rules: "Comparez vos suppositions à une entrée mystère. Utilisez les marqueurs d'attributs (Année, Classement, Pays, Genre, Taille, Sexe) pour affiner votre recherche.\n\n🟩 : Correspondance Parfaite\n🟨 : Correspondance Proche (année/rang proche, même région ou groupe de genre)\n⬛ : Aucune Correspondance"
    }
  },
  wordGame: {
    enter: "Entrer",
    board: "Plateau de jeu",
    keyboard: "Clavier virtuel"
  },
  links: {
    mistakesRemaining: "Erreurs restantes",
    oneAway: "Plus qu'un...",
    notALink: "Aucun lien",
    shuffle: "Mélanger",
    deselectAll: "Tout désélectionner",
    categoriesDiscovered: "Catégories Découvertes"
  },
  guesser: {
    searchPlaceholder: "Chercher un titre, artiste ou pays...",
    noResults: "Aucune entrée correspondante",
    hintLabels: {
      year: "Année",
      country: "Pays",
      genre: "Genre",
      placing: "Place",
      fact: "Anecdote",
      artist: "Membres"
    }
  },
  arena: {
    analyze: "Analysez le terrain",
    verdict: "Voir le verdict de l'Arena",
    labels: {
      year: "Année",
      rank: "Rang",
      country: "Pays",
      genre: "Genre",
      size: "Taille",
      sex: "Sexe"
    }
  },
  stats: {
    totalRecord: "Record de la Grande Finale",
    voterBreakdown: "Détails des Votes",
    howToWin: "Comment Gagner",
    earnPoints: "Gagner des Points de Rang",
    earnPointsDesc: "Cumulez des points pour grimper dans le classement. Les victoires parfaites rapportent plus.",
    claimDouze: "Obtenir Douze Points 🏆",
    claimDouzeDesc: "Accordé pour les jeux parfaits (aucune erreur ou victoire au premier essai).",
    gotIt: "Compris, je joue !",
    played: "Joués",
    wins: "Victoires",
    winRate: "Taux de réussite",
    streak: "Série",
    scoreHistory: "Historique des Scores",
    pointsNeeded: "pts jusqu'au",
    toRank: "Prochain Palier"
  },
  scorecard: {
    performanceVerdict: "Verdict de la Performance",
    dailyResult: "Résultat du Jour",
    revealedEntry: "Entrée Révélée",
    origin: "Origine",
    year: "Année",
    placing: "Classement",
    greenroomGossip: "Potins du Greenroom",
    performanceLog: "Journal de Performance",
    watch: "VOIR",
    reviewBoard: "Revoir le Plateau",
    shareResult: "Partager le Résultat",
    resultsCopied: "Résultats Copiés !",
    breakthrough: "Percée à l'indice",
    signalLost: "Signal perdu...",
    score: "Score",
    viewScorecard: "Voir la Fiche",
    headlines: {
      nulPoints: "❌ NUL POINTS... 🗳️",
      douzePoints: "🏆 DOUZE POINTS ! ✨",
      greatPerformance: "🌟 SUPER PERFORMANCE ! 🎤",
      qualified: "🗳️ QUALIFIÉ ! 🎤"
    }
  },
  cookies: {
    bannerText: "Nous utilisons des cookies pour personnaliser le contenu, les publicités, et analyser notre trafic.",
    learnMore: "En savoir plus",
    acceptAll: "Tout accepter",
    decline: "Essentiels uniquement",
    manage: "Gérer",
    privacyPolicy: "Politique de Confidentialité",
    cookiePolicy: "Politique de Cookies",
    privacySettings: "Confidentialité"
  },
  ranks: {
    "First-Time Voter": "Premier Votant",
    "Backing Vocalist": "Choriste",
    "National Finalist": "Finaliste National",
    "Semi-Final Qualifier": "Qualifié en Demi-Finale",
    "Grand Finalist": "Grand Finaliste",
    "Top 10 Contender": "Candidat au Top 10",
    "Podium Finish": "Place sur le Podium",
    "Winner": "Vainqueur",
    "Multi-Winner": "Multi-Vainqueur",
    "Hall of Famer": "Hall of Famer",
    "Eurovision Legend": "Légende de l'Eurovision"
  },
  metadata: {
    countries: {
      "Switzerland": "Suisse", "Sweden": "Suède", "Finland": "Finlande", "Netherlands": "Pays-Bas",
      "Italy": "Italie", "Croatie": "Croatie", "United Kingdom": "Royaume-Uni", "Ukraine": "Ukraine",
      "Israel": "Israël", "Portugal": "Portugal", "Denmark": "Danemark", "Norway": "Norvège", "Spain": "Espagne",
      "Austria": "Autriche", "Cyprus": "Chypre", "Iceland": "Islande", "Germany": "Allemagne", "Azerbaijan": "Azerbaïdjan",
      "Serbia": "Serbie", "Australia": "Australie", "Greece": "Grèce", "Moldova": "Moldavie", "Belgium": "Belgique",
      "Poland": "Pologne", "Slovenia": "Slovénie", "Ireland": "Irlande", "Luxembourg": "Luxembourg", "Albania": "Albanie",
      "Bulgaria": "Bulgarie", "Estonia": "Estonie", "Russia": "Russie", "Turkey": "Turquie", "Bosnia & Herzegovina": "Bosnie-Herzégovine",
      "Malta": "Malte", "Monaco": "Monaco", "Latvia": "Lettonie", "Hungary": "Hongrie"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Opéra", "Drum and Bass / Opera": "Drum and Bass / Opéra",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballade": "Ballade", "Rock": "Rock", "Industrial Rock": "Rock Industriel", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Pop Comique", "Latin Pop": "Pop Latin",
      "R&B": "R&B", "Orchestral Pop": "Pop Orchestral", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Pop Indé", "Ethno-Pop": "Ethno-Pop", "Soul": "Soul", "Other": "Autre", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternative", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Ballade Pop", "Electronic": "Électronique", "Industrial Techno": "Techno Industrielle",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Néo-classique", "Folk Ballad": "Ballade Folk", "Pop Rock": "Pop Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Folk Celtique", "Balkan Ballad": "Ballade Balkanique", "Disco": "Disco"
    },
    sex: {
      "Male": "Masculin", "Female": "Féminin", "Mixed": "Mixte", "Other": "Autre"
    },
    sizes: {
      solo: "Solo",
      duo: "Duo"
    }
  }
};