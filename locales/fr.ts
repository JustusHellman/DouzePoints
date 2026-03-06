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
    todayScore: "Score du Jour",
    howToPlayTitle: "Comment Jouer à Douze Points",
    howToPlayP1: "Douze Points est votre centre de défis quotidiens de l'Eurovision. Chaque jour, six jeux uniques sont publiés pour tester vos connaissances sur l'histoire du concours, les artistes et les paroles. Votre objectif est de relever chaque défi avec le moins d'erreurs possible pour obtenir le score maximum de 12 points — les légendaires 'Douze Points' !",
    howToPlayP2: "À mesure que vous accumulez des points dans tous les jeux, vous grimperez dans les rangs mondiaux des fans, passant de 'Premier Votant' à une véritable 'Légende de l'Eurovision'. Vous pouvez suivre vos progrès quotidiens, vos étapes de carrière et votre rang actuel en cliquant sur le bouton 'Stats' dans l'en-tête à tout moment. Bonne chance, et que le meilleur fan gagne !",
    historyTitle: "L'Héritage de l'Eurovision",
    historyP1: "Le Concours Eurovision de la chanson a débuté en 1956 comme une expérience technique de diffusion en direct, simultanée et transnationale. Depuis lors, il est devenu l'un des événements non sportifs les plus regardés au monde, touchant des centaines de millions de téléspectateurs à travers le globe. C'est une célébration unique de la musique, de la diversité et de la coopération internationale.",
    historyP2: "Des premiers jours des ballades orchestrales à l'ère moderne de la pop, du rock et des performances expérimentales, l'Eurovision a toujours été un miroir de la culture et de l'identité européennes. Il a lancé les carrières d'icônes mondiales comme ABBA et Céline Dion, et continue d'être chaque année une plateforme pour l'innovation artistique et l'échange culturel.",
    historyP3: "Chez Douze Points, nous célébrons cette riche histoire à travers nos défis quotidiens. Que vous soyez un spectateur occasionnel ou un superfan inconditionnel qui connaît chaque participation depuis Lugano, nos jeux sont conçus pour tester vos connaissances et votre passion pour le concours. Rejoignez-nous chaque jour pour prouver votre expertise, découvrir de nouvelles chansons préférées et grimper dans les rangs de la communauté des fans de l'Eurovision.",
    historyP4: "Alors que le concours continue d'évoluer avec les nouvelles technologies et les tendances musicales, sa mission principale reste la même : rassembler les gens grâce au pouvoir de la musique. De l'introduction du télévote aux scénographies spectaculaires du XXIe siècle, l'Eurovision a toujours repoussé les limites de ce qui est possible dans le divertissement en direct. Nous sommes fiers de faire partie de cette communauté dynamique et de fournir un espace où les fans peuvent s'engager avec l'héritage du concours de manière amusante et interactive.",
    historyP5: "Au-delà de la compétition, l'Eurovision a favorisé une immense communauté mondiale de fans qui partagent une profonde appréciation pour les divers styles musicaux et expressions culturelles présentés sur scène. Cette communauté est le cœur du concours, et chez Douze Points, nous visons à fournir une plateforme qui honore cet esprit. Notre mission est de faire vivre la magie de l'Eurovision tout au long de l'année, en offrant un espace où les fans peuvent tester leurs connaissances, célébrer leurs chansons préférées et se connecter avec l'histoire du concours de chanson le plus aimé au monde."
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
  about: {
    title: "À propos de Douze Points",
    mission: {
      title: "Notre Mission",
      p1: "Douze Points est né d'un amour profond pour le Concours Eurovision de la Chanson. Ma mission est de fournir un centre ouvert toute l'année pour que les fans puissent s'imprégner de la riche histoire du concours à travers des jeux quotidiens amusants, stimulants et interactifs. Je crois que l'esprit de l'Eurovision — l'unité par la musique — doit être célébré chaque jour, et pas seulement pendant la semaine du concours en mai.",
      p2: "Je crois que l'Eurovision est plus qu'une simple compétition musicale — c'est une célébration de la diversité, de la culture et de l'unité. Mes jeux sont conçus pour honorer cet esprit tout en testant les connaissances des superfans les plus dévoués. Des ballades orchestrales des années 1950 à la pop et au rock énergiques de l'ère moderne, je couvre tout."
    },
    story: {
      title: "L'Histoire",
      p1: "Créé par un fan pour les fans, Douze Points a commencé comme un petit projet pour garder la magie de l'Eurovision vivante entre les concours. Aujourd'hui, il propose six jeux quotidiens uniques qui couvrent tout, de 1956 à nos jours.",
      p2: "Que vous soyez un 'Premier Votant' ou une 'Légende de l'Eurovision', il y a toujours quelque chose de nouveau à découvrir sur le concours de chanson préféré au monde."
    },
    history: {
      title: "Histoire de l'Eurovision",
      p1: "Le Concours Eurovision de la Chanson est l'un des événements non sportifs les plus anciens et les plus regardés au monde.",
      p2: "Au fil des ans, le concours a lancé les carrières d'icônes mondiales et a offert une scène à diverses expressions musicales. Chez Douze Points, mon objectif est de préserver et de célébrer cet héritage incroyable."
    },
    games: {
      title: "Les Jeux",
      p1: "Nos défis quotidiens sont inspirés de puzzles de mots et de logique populaires, adaptés spécifiquement pour la communauté de l'ESC :"
    },
    community: {
      title: "La Communauté d'abord",
      p1: "Je ne suis pas affilié à l'UER ni à aucun diffuseur officiel. Je suis simplement un fan qui veut partager sa passion pour l'Eurovision avec le monde."
    }
  },
  contact: {
    title: "Contactez-nous",
    methods: {
      title: "Entrer en contact",
      p1: "Vous avez une question, un commentaire ou vous avez trouvé un bug ? J'aimerais avoir de vos nouvelles ! Vous pouvez me joindre par e-mail ou me trouver dans la communauté Eurovision."
    },
    faq: {
      title: "Foire Aux Questions",
      q1: "Quand les jeux sont-ils réinitialisés ?",
      a1: "Les défis quotidiens sont réinitialisés chaque jour à minuit (UTC).",
      q2: "Comment mon rang est-il calculé ?",
      a2: "Votre rang est basé sur le total des points de votre carrière accumulés dans tous les jeux. Plus vous jouez et plus vous êtes performant, plus vous montez !",
      q3: "Puis-je suggérer une chanson ou un artiste ?",
      a3: "Absolument ! Je cherche toujours à améliorer notre base de données. Envoyez-moi un e-mail avec vos suggestions.",
      q4: "Douze Points est-il gratuit ?",
      a4: "Oui, Douze Points est entièrement gratuit pour tout le monde.",
      q5: "Comment partager mes résultats ?",
      a5: "Après avoir terminé un jeu, vous verrez un bouton 'Partager'."
    },
    feedback: {
      title: "Commentaires",
      p1: "Vos commentaires m'aident à améliorer Douze Points pour tout le monde. N'hésitez pas à partager vos réflexions sur la façon dont je peux améliorer l'expérience."
    }
  },
  terms: {
    lastUpdated: "Février 2026",
    title: "Conditions de Service",
    acceptance: {
      title: "Acceptation des Conditions",
      p1: "En accédant à ou en utilisant Douze Points (www.douzepoints.net), vous acceptez d'être lié par ces Conditions de Service. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site web."
    },
    description: {
      title: "Description du Service",
      p1: "Douze Points est un site web fait par des fans proposant des jeux et des anecdotes sur le thème de l'Eurovision à des fins de divertissement. Le service est fourni 'tel quel' et peut être modifié ou interrompu à tout moment."
    },
    ip: {
      title: "Propriété Intellectuelle",
      p1: "Le Concours Eurovision de la Chanson et les marques associées sont la propriété de l'Union Européenne de Radio-Télévision (UER). Ce site web n'est pas affilié à, approuvé par ou parrainé par l'UER.",
      p2: "Tout le contenu original, le code et le design de ce site web sont la propriété du propriétaire du site web. Vous ne pouvez reproduire ou distribuer aucune partie de ce site web sans autorisation."
    },
    conduct: {
      title: "Conduite de l'Utilisateur",
      p1: "Vous acceptez d'utiliser le site web uniquement à des fins légales et d'une manière qui n'enfreint pas les droits d'autrui. Les comportements interdits incluent :",
      items: [
        "Tenter d'interférer avec le fonctionnement du site web",
        "Utiliser des scripts automatisés pour collecter des données ou jouer",
        "Usurper l'identité d'autrui ou fournir de fausses informations",
        "S'engager dans toute activité qui pourrait nuire à la réputation du site web"
      ]
    },
    disclaimer: {
      title: "Exclusion de Garanties",
      p1: "Le site web est fourni 'tel quel' et 'selon disponibilité'. Nous ne donnons aucune garantie, expresse ou implicite, concernant l'exactitude, la fiabilité ou la disponibilité du service."
    },
    limitation: {
      title: "Limitation de Responsabilité",
      p1: "Dans la mesure maximale permise par la loi, le propriétaire du site web ne sera pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de votre utilisation du site web."
    },
    governingLaw: {
      title: "Loi Applicable",
      p1: "Ces Conditions de Service sont régies et interprétées conformément aux lois de la Suède."
    },
    changes: {
      title: "Modifications des Conditions",
      p1: "Nous nous réservons le droit de modifier ces Conditions de Service à tout moment. Votre utilisation continue du site web après tout changement constitue l'acceptation des nouvelles conditions."
    },
    contact: {
      title: "Informations de Contact",
      p1: "Si vous avez des questions sur ces Conditions de Service, veuillez nous contacter à : douzepointsgame@gmail.com"
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
      "Andorra": "Andorre", "Morocco": "Maroc", "Belarus": "Bélarus"
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
      "Celtic Folk": "Folk Celtique", "Balkan Ballad": "Ballade Balkanique", "Disco": "Disco",
      "Operatic Pop": "Pop Opératique", "Indie Rock": "Indie Rock", "Avant-Garde": "Avant-Garde", "Country": "Country"
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