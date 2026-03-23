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
    songs: "chansons",
    steps: "étapes",
    mistakesLeft: "Erreurs restantes",
    howToPlay: "Comment jouer",
    close: "Fermer",
    selectLanguage: "Choisir la Langue",
    languages: "Langues",
    qualified: "Qualifié",
    playBonusRound: "Jouer le tour bonus",
    semiFinal: "Demi-finale",
    joinCommunity: "Rejoignez la communauté"
  },
  greenroom: {
    greenroom: "Le Greenroom",
    description: "Détendez-vous et préparez-vous pour la performance. Prouvez vos connaissances sur le Concours Eurovision de la Chanson avec six défis quotidiens pour le fan ultime.",
    dailyProgress: "Progression du Jour",
    qualified: "✨ Qualifié pour la Grande Finale ✨",
    finishedToday: "Terminé aujourd'hui",
    statsButton: "Stats",
    careerStats: "Stats",
    todayScore: "Score du Jour",
    howToPlayTitle: "Comment Jouer à Douze Points",
    howToPlayP1: "Douze Points est votre centre de défis quotidiens de l'Eurovision. Chaque jour, six jeux uniques sont publiés pour tester vos connaissances sur l'histoire du concours, les artistes et les paroles. Votre objectif est de relever chaque défi avec le moins d'erreurs possible pour obtenir le score maximum de 12 points — les légendaires 'Douze Points' !",
    howToPlayP2: "À mesure que vous accumulez des points dans tous les jeux, vous grimperez dans les rangs mondiaux des fans, passant de 'Premier Votant' à une véritable 'Légende de l'Eurovision'. Vous pouvez suivre vos progrès quotidiens, vos étapes de carrière et votre rang actuel en cliquant sur le bouton 'Stats' dans l'en-tête à tout moment. Bonne chance, et que le meilleur fan gagne !"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Défi quotidien de titres de l'Eurovision.",
      rulesShort: "Identifiez le titre caché de la chanson de l'Eurovision en 6 tentatives. Les tuiles changent de couleur :\n🟩 Bon endroit\n🟨 Mauvais endroit\n⬛ Pas dans le titre",
      rulesLong: "EuroSong est un jeu de devinettes de mots dédié au vaste catalogue de titres de chansons de l'Eurovision. Votre objectif est d'identifier un titre de chanson spécifique de l'histoire du concours en six tentatives.\n\nComment jouer :\n• Tapez n'importe quelle combinaison de lettres pour former une supposition.\n• Après chaque supposition, la couleur des tuiles changera pour fournir un retour :\n  - 🟩 (Vert) : La lettre est dans le titre et au bon endroit.\n  - 🟨 (Jaune) : La lettre est dans le titre mais au mauvais endroit.\n  - ⬛ (Gris) : La lettre n'est pas du tout dans le titre.\n• Utilisez les retours de chaque supposition pour réduire les possibilités.\n• Le jeu propose des titres de toutes les époques de l'Eurovision, des années 1950 à nos jours."
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Défi quotidien d'artistes de l'ESC.",
      rulesShort: "Devinez le nom de l'artiste ou du groupe de l'Eurovision en 6 essais. Les tuiles changent de couleur :\n🟩 Bon endroit\n🟨 Mauvais endroit\n⬛ Pas dans le nom",
      rulesLong: "EuroArtist vous met au défi d'identifier les célèbres interprètes et groupes qui ont honoré la scène de l'Eurovision. Des gagnants légendaires aux favoris cultes, pouvez-vous deviner l'artiste du jour en six essais ?\n\nComment jouer :\n• Entrez le nom d'un artiste ou d'un groupe comme supposition.\n• Les tuiles changeront de couleur en fonction de la proximité de votre supposition par rapport au nom cible :\n  - 🟩 (Vert) : Lettre correcte à la bonne position.\n  - 🟨 (Jaune) : Lettre correcte à la mauvaise position.\n  - ⬛ (Gris) : Cette lettre ne fait pas partie du nom de l'artiste.\n• N'oubliez pas que les noms d'artistes peuvent inclure des espaces et des caractères spéciaux, qui sont souvent fixés sur le plateau pour vous aider."
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Connectez 4 mots d'un refrain lyrique.",
      rulesShort: "Reliez 16 mots en quatre groupes de quatre. Chaque groupe appartient au refrain d'une chanson différente de l'Eurovision. 6 erreurs autorisées.",
      rulesLong: "EuroRefrain teste votre mémoire pour les paroles les plus emblématiques de l'histoire de l'Eurovision. On vous présente une grille de 16 mots tirés de quatre refrains de chansons différents.\n\nComment jouer :\n• Votre tâche consiste à regrouper ces 16 mots en quatre ensembles de quatre, où chaque ensemble appartient au refrain d'une seule chanson.\n• Sélectionnez quatre mots qui, selon vous, vont ensemble et appuyez sur 'Envoyer'.\n• Si c'est correct, les mots seront effacés du plateau et le titre de la chanson sera révélé.\n• Si est incorrect, cela compte comme une erreur. Vous avez droit à un maximum de 6 erreurs avant la fin du jeu.\n• Les mots sont soigneusement choisis pour être stimulants, comportant souvent des mots communs qui pourraient appartenir à plusieurs chansons."
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Groupez 4 éléments de l'Eurovision.",
      rulesShort: "Regroupez 16 éléments liés à l'Eurovision en quatre catégories de quatre basées sur une connexion commune. 6 erreurs autorisées.",
      rulesLong: "EuroLinks est un jeu de logique et de culture générale sur l'Eurovision. Vous devez trouver les liens cachés entre 16 éléments différents liés au concours.\n\nComment jouer :\n• La grille contient 16 éléments qui peuvent être regroupés en quatre catégories de quatre éléments chacune.\n• Les catégories peuvent aller de 'Gagnants des années 90' à 'Pays qui n'ont jamais gagné' ou 'Artistes ayant participé plusieurs fois'.\n• Sélectionnez quatre éléments et appuyez sur 'Envoyer' pour vérifier s'ils partagent une catégorie.\n• Vous avez droit à 6 erreurs pour résoudre l'énigme entière.\n• Chaque catégorie a un niveau de difficulté, allant du simple à la culture générale de niveau expert !"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifiez l'entrée via des indices Eurovision.",
      rulesShort: "Identifiez l'entrée mystère de l'Eurovision en 6 tentatives. Chaque mauvaise réponse révèle un nouvel indice plus spécifique.",
      rulesLong: "EuroGuess est un jeu de style détective où vous identifiez une participation mystère à l'Eurovision à l'aide d'une série d'indices. Le défi est de deviner la participation avec le moins d'indices possible.\n\nComment jouer :\n• Vous commencez avec un premier indice initial (généralement l'année).\n• Si votre supposition est incorrecte, un nouvel indice plus spécifique est révélé (Pays, Genre, Classement, etc.).\n• Vous avez un total de 6 tentatives pour identifier correctement la participation.\n• Utilisez la barre de recherche pour trouver et sélectionner votre supposition dans notre base de données complète des participations à l'Eurovision.\n• Le score est basé sur le nombre d'indices dont vous avez eu besoin — deviner tôt vous rapporte le maximum de points !"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Devinez via les statistiques du concours.",
      rulesShort: "Trouvez l'entrée cible de l'Eurovision en 7 tentatives. Les marqueurs indiquent :\n🟩 Correspondance correcte\n🟨 Correspondance proche\n⬛ Aucune correspondance\nUtilisez les flèches (⬆️⬇️) pour l'Année et le Rang.",
      rulesLong: "EuroArena est un jeu de devinettes basé sur les données où vous utilisez des statistiques comparatives pour trouver une participation cachée à l'Eurovision. C'est un test de vos connaissances sur les résultats du concours et les attributs des artistes.\n\nComment jouer :\n• Entrez une supposition pour voir comment ses attributs se comparent à la participation cible.\n• Les attributs incluent l'Année, le Rang, le Pays, le Genre et la Taille/le Sexe de l'artiste.\n• Des marqueurs de retour guideront votre prochain mouvement :\n  - 🟩 (Vert) : Une correspondance parfaite pour cet attribut.\n  - 🟨 (Jaune) : Une correspondance proche (par exemple, l'année est à moins de 3 ans, ou le pays est dans la même région).\n  - ⬛ (Gris) : Aucune correspondance pour cet attribut.\n• Les flèches à côté de l'Année et du Rang vous indiqueront si la valeur cible est supérieure ou inférieure à votre supposition.\n• Vous avez 7 tentatives pour trouver la bonne participation."
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
    saveImage: "Enregistrer la carte",
    copyImage: "Copier la carte",
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
  privacy: {
    title: "Politique de Confidentialité",
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
      autoFootnote: "Ces informations peuvent être traitées par nos prestataires d'analyse.",
      cookiesTitle: "b) Stockage local",
      cookiesDesc1: "Nous utilisons le stockage local de votre navigateur exclusivement pour enregistrer votre progression dans le jeu, vos scores et vos statistiques.",
      cookiesDesc2: "Ces données sont stockées uniquement sur votre appareil, ne sont pas transmises à nos serveurs et peuvent être supprimées en effaçant les données de votre navigateur.",
      cookiesDesc3: "Nous n'utilisons pas de cookies de suivi ni de cookies publicitaires tiers."
    },
    legalBasis: {
      title: "Base juridique (RGPD)",
      p1: "Si vous êtes situé dans l'UE/EEE, nous traitons les données personnelles sur les bases juridiques suivantes :",
      consentLabel: "Consentement",
      consent: "pour les cookies non essentiels (le cas échéant).",
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
      items: ["Fournisseurs d'hébergement", "Prestataires de services techniques nécessaires au fonctionnement du site web"]
    },
    internationalTransfers: {
      title: "Transferts internationaux",
      p1: "Certains prestataires tiers peuvent traiter des données en dehors de l'UE ou de l'EEE. Lorsque de tels transferts ont lieu, des garanties appropriées telles que des clauses contractuelles types sont utilisées."
    },
    dataRetention: {
      title: "Rétention des données",
      p1: "Nous ne maintenons pas de base de données d'utilisateurs. Les journaux techniques à des fins de sécurité sont conservés conformément aux politiques de nos fournisseurs, et le stockage local demeure jusqu'à ce que vous le supprimiez."
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
    },
    about: {
      title: "À propos de Douze Points",
      p1: "Douze Points est un projet passionné créé pour la communauté du Concours Eurovision de la chanson. Notre objectif est de fournir une expérience interactive quotidienne amusante aux fans pour tester leurs connaissances et célébrer la riche histoire du concours.",
      p2: "Le jeu est entièrement gratuit et est maintenu comme un hommage à la plus grande compétition musicale au monde."
    },
    stats: {
      title: "Statistiques et analyses du jeu",
      p1: "Pour nous aider à comprendre comment la communauté se comporte et pour améliorer l'équilibre du jeu, Douze Points collecte des statistiques de jeu anonymes.",
      p2: "Lorsque vous terminez un jeu, nous enregistrons le type de jeu, le score obtenu et la date. Ces informations sont agrégées et ne contiennent aucune information personnellement identifiable (telle que votre nom, votre adresse IP ou votre e-mail).",
      p3: "Nous utilisons Google Firebase (un service fourni par Google) pour stocker et traiter ces statistiques agrégées. Ces données sont utilisées uniquement dans le but d'analyser la popularité du jeu et les niveaux de difficulté."
    }
  },
  about: {
    title: "À propos de Douze Points",
    subtitle: "Célébrer le Concours Eurovision de la Chanson",
    mission: {
      title: "Notre Mission",
      p1: "Douze Points est né d'un amour profond pour le Concours Eurovision de la Chanson. Ma mission est de fournir un centre ouvert toute l'année pour que les fans puissent s'impliquer dans la riche histoire du concours à travers des jeux quotidiens amusants, stimulants et interactifs. Je crois que l'esprit de l'Eurovision — l'unité par la musique — doit être célébré chaque jour, pas seulement pendant la semaine du concours en mai.",
      p2: "Je crois que l'Eurovision est plus qu'un simple concours de musique — c'est une célébration de la diversité, de la culture et de l'unité. Mes jeux sont conçus pour honorer cet esprit tout en testant les connaissances des superfans les plus dévoués. Des ballades orchestrales des années 1950 à la pop et au rock énergiques de l'ère moderne, je couvre tout."
    },
    story: {
      title: "L'Histoire",
      p1: "Créé par un fan pour les fans, Douze Points a commencé comme un petit projet pour garder la magie de l'Eurovision vivante entre les concours. Aujourd'hui, il propose six jeux quotidiens uniques qui couvrent tout, de 1956 à nos jours.",
      p2: "Que vous soyez un 'Premier votant' ou une 'Légende de l'Eurovision', il y a toujours quelque chose de nouveau à découvrir sur le concours de chanson préféré au monde."
    },
    history: {
      title: "Histoire de l'Eurovision",
      p1: "Le Concours Eurovision de la Chanson est l'un des événements non sportifs les plus anciens et les plus regardés au monde.",
      p2: "Au fil des ans, le concours a lancé les carrières d'icônes mondiales et a offert une scène à diverses expressions musicales. Chez Douze Points, mon objectif est de préserver et de célébrer cet incroyable héritage."
    },
    games: {
      title: "Les Jeux",
      p1: "Nos défis quotidiens sont inspirés par des puzzles de mots et de logique populaires, adaptés spécifiquement pour la communauté ESC :",
      gameList: [
        { name: "EuroSong", desc: "Un jeu de devinettes de titres de chansons de style Wordle." },
        { name: "EuroArtist", desc: "Identifiez l'interprète en 6 tentatives." },
        { name: "EuroRefrain", desc: "Reliez les paroles à leurs refrains emblématiques." },
        { name: "EuroLinks", desc: "Trouvez les liens cachés entre les éléments de l'ESC." },
        { name: "EuroGuess", desc: "Le quiz ultime sur les entrées mystères." },
        { name: "EuroArena", desc: "Une bataille de statistiques de l'Eurovision basée sur les données." }
      ]
    },
    community: {
      title: "La Communauté d'Abord",
      p1: "Je ne suis pas affilié à l'UER ni à aucun diffuseur officiel. Je suis simplement un fan qui veut partager sa passion pour l'Eurovision avec le monde."
    },
    data: {
      title: "Données et Crédits",
      p1: "Un immense merci au projet TidyTuesday et à ses contributeurs pour avoir fourni le jeu de données fondamental qui a rendu Douze Points possible. Leur dévouement aux données ouvertes nous a permis de reconstituer la riche histoire du concours pour ces jeux !"
    }
  },
  contact: {
    title: "Contact Us",
    methods: {
      title: "Get in Touch",
      p1: "Have a question, feedback, or found a bug? I'd love to hear from you! You can reach me via email or find me in the Eurovision community."
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "When do the games reset?",
      a1: "The daily challenges reset every day at midnight (UTC).",
      q2: "How is my rank calculated?",
      a2: "Your rank is based on your total career points accumulated across all games. The more you play and the better you perform, the higher you climb!",
      q3: "Can I suggest a song or artist?",
      a3: "Absolutely! I am always looking to improve our database. Send me an email with your suggestions.",
      q4: "Is Douze Points free to play?",
      a4: "Yes, Douze Points is completely free for everyone.",
      q5: "How do I share my results?",
      a5: "After completing a game, you'll see a 'Share' button."
    },
    feedback: {
      title: "Feedback",
      p1: "Your feedback helps me make Douze Points better for everyone. Don't hesitate to share your thoughts on how I can improve the experience."
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
    "First-Time Voter": "Premier Votant",
    "Greenroom Guest": "Invité du Greenroom",
    "Backing Vocalist": "Choriste",
    "Jury Member": "Membre du Jury",
    "National Finalist": "Finaliste National",
    "Televote Favorite": "Favori du Télévote",
    "National Representative": "Représentant National",
    "Semi-Final Qualifier": "Qualifié en Demi-Finale",
    "Press Center Darling": "Chouchou du Centre de Presse",
    "Grand Finalist": "Grand Finaliste",
    "Fan Favorite": "Favori des Fans",
    "Top 10 Contender": "Candidat au Top 10",
    "Dark Horse": "Outsider",
    "Podium Finish": "Place sur le Podium",
    "Chart Topper": "En Tête des Charts",
    "Silver Medalist": "Médaillé d'Argent",
    "Winner": "Winner",
    "Double Winner": "Double Vainqueur",
    "Multi-Winner": "Multi-Vainqueur",
    "Hall of Famer": "Hall of Famer",
    "Iconic Entry": "Entrée Iconique",
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
      "Bulgaria": "Bulgarie", "Estonia": "Estonie", "Russia": "Russie", "Turkey": "Turquie", "Bosnia & Herzegovina": "Bosnie-Herzégovine",
      "Malta": "Malte", "Monaco": "Monaco", "Latvia": "Lettonie", "Hungary": "Hongrie", "San Marino": "Saint-Marin",
      "Lithuania": "Lituanie", "Montenegro": "Monténégro", "North Macedonia": "Macédoine du Nord", "Czechia": "Tchéquie",
      "Romania": "Roumanie", "Slovakia": "Slovaquie", "Georgia": "Géorgie", "Armenia": "Arménie",
      "Andorra": "Andorre", "Morocco": "Maroc", "Belarus": "Bélarus",
      "Yugoslavia": "Yougoslavie", "Serbia & Montenegro": "Serbie-et-Monténégro",
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
      "Male": "Masculin", "Female": "Féminin", "Mixed": "Mixte", "Other": "Autre"
    },
    sizes: {
      solo: "Solo",
      duo: "Duo"
    }
  },
  support: {
    title: "Vous aimez Douze Points ?",
    completed: "Vous avez terminé les défis d'aujourd'hui !",
    button: "Offrez-moi un café"
  },
  infinite: {
    title: "Encore",
    description: "Le spectacle quotidien est terminé, mais la fête ne s'arrête jamais ! Remontez sur scène et testez votre endurance dans nos modes de jeu sans fin. Combien de temps pouvez-vous garder la musique avant de faire une fausse note ?",
    difficulty: "Sélectionner la Difficulté",
    difficulties: {
      top10: "Top 10 (2000-Présent)",
      modern: "2000-Présent",
      all: "Toute l'Histoire (1956-Présent)"
    },
    currentRun: "Série Actuelle",
    bestRun: "Meilleure Série",
    best: "Max",
    songsFinished: "Chansons Terminées",
    currentScore: "Score Actuel",
    bestScore: "Meilleur Score",
    score: "Score",
    nextSong: "Chanson Suivante",
    gameOver: "Fin du Jeu",
    tryAgain: "Réessayer",
    congratulations: "Félicitations !",
    allSongsFinished: "Vous avez terminé avec succès toutes les entrées de cette catégorie ! Vous êtes une véritable Légende de l'Eurovision.",
    streak: "Série",
    bestStreak: "Meilleure Série",
    continueRun: "Continuer la Série",
    exitToEncore: "Quitter vers l'Encore",
    playAgain: "Rejouer",
    continue: "Continuer",
    newBest: "Nouveau Record !",
    infiniteMode: "Mode Infini",
    placement: "Classement",
    era: "Époque",
    placements: {
      all: "Tous les classements",
      winners: "Gagnants uniquement",
      top3: "Top 3",
      top5: "Top 5",
      top10: "Top 10",
      top15: "Top 15",
      finalists: "Finalistes"
    },
    years: {
      all: "Toute l'histoire",
      "2021": "2021-Présent",
      "2010": "2010-Présent",
      "2000": "2000-Présent",
      "1956": "1956-1999"
    }
  }
};