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
    selectLanguage: "Choisir la Langue",
    languages: "Langues",
    qualified: "Qualifié"
  },
  greenroom: {
    greenroom: "Le Greenroom",
    description: "Détendez-vous et préparez-vous pour la performance. Prouvez vos connaissances sur le Concours Eurovision de la Chanson avec six défis quotidiens pour le fan ultime.",
    dailyProgress: "Progression du Jour",
    qualified: "✨ Qualifié pour la Grande Finale ✨",
    finishedToday: "Terminé aujourd'hui",
    statsButton: "Stats",
    careerStats: "Stats",
    todayScore: "Score du Jour"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Défi quotidien de titres de l'Eurovision.",
      rules: "Devinez le titre de la chanson de l'Eurovision cachée en 6 essais. Vous pouvez entrer n'importe quelle combinaison de lettres. La couleur des tuiles changera pour montrer si vous étiez proche.\n\n🟩 : Lettre et position correctes\n🟨 : Lettre correcte, mauvaise position\n⬛ : Mauvaise lettre"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Défi quotidien d'artistes de l'ESC.",
      rules: "Devinez l'artiste de l'ESC caché en 6 essais. Vous pouvez entrer n'importe quelle combinaison de lettres. La couleur des tuiles changera pour montrer si vous étiez proche.\n\n🟩 : Lettre et position correctes\n🟨 : Lettre correcte, mauvaise position\n⬛ : Mauvaise lettre"
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Connectez 4 mots d'un refrain lyrique.",
      rules: "Trouvez des groupes de quatre mots qui forment un crochet séquentiel ou un refrain d'une chanson spécifique de l'Eurovision. Sélectionnez quatre mots et appuyez sur 'Envoyer'. Vous avez droit à 6 erreurs pour identifier les 4 chansons !"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Groupez 4 éléments de l'Eurovision.",
      rules: "Trouvez des groupes de quatre éléments qui partagent un thème commun du concours. Sélectionnez quatre éléments et appuyez sur 'Envoyer' pour vérifier. Vous avez droit à 6 erreurs !"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifiez l'entrée via des indices Eurovision.",
      rules: "Identifiez l'entrée mystère du concours en utilisant jusqu'à 6 indices. Chaque erreur révèle un indice plus précis (Année, Pays, Genre, etc.). Plus vous devinez vite, plus vous marquez de points !"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Devinez via les statistiques du concours.",
      rules: "Comparez vos suppositions à une entrée mystère de l'Eurovision. Utilisez les marqueurs d'attributs (Année, Classement, Pays, Genre, Taille, Sexe) pour affiner votre recherche.\n\n🟩 : Correspondance Parfaite\n🟨 : Correspondance Proche (année/rang proche, même région ou groupe de genre)\n⬛ : Aucune Correspondance"
    }
  },
  wordGame: {
    enter: "Entrer",
    board: "Plateau de jeu",
    keyboard: "Clavier virtuel",
    notEnoughLetters: "Pas assez de lettres"
  },
  links: {
    mistakesRemaining: "Erreurs restantes",
    oneAway: "Plus qu'un...",
    betterLuck: "Plus de chance demain !",
    notALink: "Aucun lien",
    shuffle: "Mélanger",
    deselectAll: "Tout désélectionner",
    categoriesDiscovered: "Catégories Découvertes",
    lyricsDiscovered: "Refrains Découverts"
  },
  guesser: {
    searchPlaceholder: "Chercher des entrées Eurovision...",
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
    analyze: "Analysez le terrain Eurovision",
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
    totalRecord: "Record de l'Eurovision",
    voterBreakdown: "Détails des Votes",
    howToWin: "Comment Gagner",
    earnPoints: "Gagner des Points de Rang",
    earnPointsDesc: "Cumulez des points pour grimper dans le classement. Les victoires parfaites rapportent plus.",
    claimDouze: "Obtenir Douze Points 🏆",
    claimDouzeDesc: "Accordé pour les gens parfaits (aucune erreur ou victoire au premier essai).",
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
    nextGame: "Prochain jeu dans",
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
    privacySettings: "Confidentialité",
    lastUpdated: "Dernière mise à jour"
  },
  privacy: {
    lastUpdated: "Février 2026",
    introduction: {
      title: "Introduction",
      p1: "Bienvenue sur Douze Points (www.douzepoints.net).",
      p2: "Ce site web est exploité par Justus Hellman, basé en Suède (le « Responsable du traitement »).",
      p3: "Si vous avez des questions concernant cette politique de confidentialité ou vos données personnelles, vous pouvez nous contacter : douzepointsgame@gmail.com"
    },
    dataCollection: {
      title: "Quelles données nous collectons",
      autoTitle: "a) Données collectées automatiquement",
      autoDesc: "Lorsque vous visitez le site web, certaines informations peuvent être collectées automatiquement, notamment :",
      autoItems: ["Adresse IP", "Type et version du navigateur", "Informations sur l'appareil", "Système d'exploitation", "Pages visitées", "Date et heure d'accès", "Site web référent"],
      autoFootnote: "Ces informations peuvent être traitées par nos prestataires de publicité et d'analyse.",
      cookiesTitle: "b) Cookies et technologies similaires",
      cookiesDesc1: "Nous utilisons des cookies et des technologies similaires pour la publicité, la mesure de la performance des publicités et les fonctionnalités du site web.",
      cookiesDesc2: "Le consentement pour les cookies est collecté et géré via Google Funding Choices, qui fournit notre plateforme de gestion du consentement (CMP). Les utilisateurs des régions concernées (telles que l'UE/EEE et le Royaume-Uni) sont invités à donner leur consentement avant que des cookies non essentiels ne soient utilisés.",
      cookiesDesc3: "Vous pouvez modifier vos préférences de consentement à tout moment via les options de consentement disponibles sur le site web."
    },
    advertising: {
      title: "Publicité",
      p1: "Nous utilisons Google AdSense pour diffuser des annonces. Des fournisseurs tiers, y compris Google, utilisent des cookies pour diffuser des annonces basées sur les visites antérieures d'un utilisateur sur notre site Web ou sur d'autres sites Web. L'utilisation de cookies publicitaires par Google lui permet, ainsi qu'à ses partenaires, de diffuser des annonces à nos utilisateurs en fonction de leur visite sur notre site et/ou sur d'autres sites sur Internet.",
      p2: "Vous pouvez gérer vos préférences publicitaires via : adssettings.google.com",
      p3: "De plus amples informations sur la manière dont Google traite les données personnelles sont disponibles dans la politique de confidentialité de Google."
    },
    legalBasis: {
      title: "Base juridique (RGPD)",
      p1: "Si vous êtes situé dans l'UE/EEE, nous traitons les données personnelles sur les bases juridiques suivantes :",
      consentLabel: "Consentement",
      consent: "pour la publicité personnalisée et les cookies non essentiels.",
      legitimacyLabel: "Légitimité",
      legitimacy: "pour les fonctionnalités de base du site web, la sécurité et la prévention de la fraude.",
      legalLabel: "Juridique",
      legal: "lorsque cela est requis par la loi applicable."
    },
    localStorage: {
      title: "Stockage local",
      p1: "Nous utilisons le stockage local de votre navigateur pour enregistrer la progression du jeu, les scores et les statistiques. Ces informations :",
      items: ["Sont stockées uniquement sur votre appareil", "Ne sont pas transmises à nos serveurs", "Peuvent être supprimées en effaçant les données de votre navigateur"]
    },
    dataSharing: {
      title: "Partage de données",
      p1: "Nous ne vendons pas de données personnelles. Toutefois, les données peuvent être traitées par des prestataires de services tiers, notamment :",
      items: ["Google (publicité et gestion du consentement)", "Fournisseurs d'hébergement", "Prestataires de services techniques nécessaires au fonctionnement du site web"]
    },
    internationalTransfers: {
      title: "Transferts internationaux",
      p1: "Certains prestataires tiers, dont Google, peuvent traiter des données en dehors de l'UE ou de l'EEE. Lorsque de tels transferts ont lieu, des garanties appropriées telles que des clauses contractuelles types sont utilisées."
    },
    dataRetention: {
      title: "Rétention des données",
      p1: "Nous ne maintenons pas de base de données d'utilisateurs. Les données publicitaires sont conservées conformément aux politiques de Google, les journaux techniques à des fins de sécurité, et le stockage local demeure jusqu'à ce que vous le supprimiez."
    },
    yourRights: {
      title: "Vos droits (UE/EEE)",
      p1: "Si vous êtes situé dans l'UE/EEE, vous avez le droit d'accéder à vos données, de les corriger ou de les supprimer, et de restreindre le traitement ou de vous y opposer. En Suède, l'autorité de contrôle est Integritetsskyddsmyndigheten.",
      p2: "Contactez-nous à douzepointsgame@gmail.com pour exercer vos droits."
    },
    dataSecurity: {
      title: "Sécurité des données",
      p1: "Nous prenons des mesures techniques et organisationnelles raisonnables pour protéger les données personnelles. Toutefois, aucune méthode de transmission sur Internet n'est totalement sécurisée."
    },
    thirdPartyLinks: {
      title: "Liens vers des sites tiers",
      p1: "Ce site web peut contenir des liens vers des sites tiers, y compris YouTube. Nous ne sommes pas responsables des pratiques de confidentialité ou du contenu des sites web externes."
    },
    changes: {
      title: "Modifications de cette politique",
      p1: "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute mise à jour sera publiée sur cette page avec une date de « Dernière mise à jour » révisée."
    }
  },
  ranks: {
    "First-Time Voter": "Premier Votant",
    "Backing Vocalist": "Choriste",
    "National Finalist": "Finaliste National",
    "Semi-Final Qualifier": "Qualifié en Demi-Finale",
    "Grand Finalist": "Grand Finaliste",
    "Top 10 Contender": "Candidat au Top 10",
    "Podium Finish": "Place sur le Podium",
    "Winner": "Winner",
    "Multi-Winner": "Multi-Vainqueur",
    "Hall of Famer": "Hall of Famer",
    "Eurovision Legend": "Légende de l'Eurovision"
  },
  metadata: {
    countries: {
      "Switzerland": "Suisse", "Sweden": "Suède", "Finland": "Finlande", "The Netherlands": "Pays-Bas",
      "Italy": "Italie", "Croatia": "Croatie", "United Kingdom": "Royaume-Uni", "Ukraine": "Ukraine",
      "France": "France",
      "Israel": "Israël", "Portugal": "Portugal", "Denmark": "Danemark", "Norway": "Norvège", "Spain": "Espagne",
      "Austria": "Autriche", "Cyprus": "Chypre", "Iceland": "Islande", "Germany": "Allemagne", "Azerbaijan": "Azerbaïdjan",
      "Serbia": "Serbie", "Australia": "Australie", "Greece": "Grèce", "Moldova": "Moldavie", "Belgium": "Belgique",
      "Poland": "Pologne", "Slovénie": "Slovénie", "Irlande": "Irlande", "Luxembourg": "Luxembourg", "Albania": "Albanie",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Russia", "Turkey": "Turquie", "Bosnia & Herzegovina": "Bosnie-Herzégovine",
      "Malta": "Malte", "Monaco": "Monaco", "Latvia": "Lettonie", "Hungary": "Hongrie", "San Marino": "Saint-Marin"
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