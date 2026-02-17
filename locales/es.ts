import { TranslationSchema } from './types.ts';

export const es: TranslationSchema = {
  common: {
    back: "Volver",
    play: "Jugar",
    submit: "Enviar",
    loading: "Cargando...",
    share: "Compartir Ficha",
    shareDaily: "Compartir Puntuación Diaria",
    shareCareer: "Compartir Estadísticas",
    shareHallOfFame: "Compartir Salón de la Fama",
    copied: "¡Copiado al portapapeles!",
    returnToGreenroom: "Volver a la Sala Verde",
    perfect: "Perfecto",
    finished: "Terminado",
    douzePoints: "¡DOUZE POINTS!",
    nulPoints: "NUL POINTS",
    points: "Puntos",
    pointsShort: "pts",
    attempts: "intentos",
    steps: "pasos",
    mistakesLeft: "Errores restantes",
    howToPlay: "Cómo jugar",
    close: "Cerrar",
    selectLanguage: "Seleccionar Idioma"
  },
  greenroom: {
    greenroom: "La Sala Verde",
    description: "Bienvenido a la Sala Verde. Demuestra tus conocimientos sobre el Festival de la Canción de Eurovisión con cinco retos diarios diseñados para el fan definitivo.",
    dailyProgress: "Progreso Diario",
    qualified: "✨ Clasificado para la Gran Final ✨",
    finishedToday: "Completado hoy",
    statsButton: "Estadísticas",
    careerStats: "Estadísticas",
    todayScore: "Puntuación de hoy"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Reto diario de títulos de Eurovisión.",
      rules: "Adivina el título de la canción de Eurovisión oculta en 6 intentos. Puedes introducir cualquier combinación de letras. El color de las casillas cambiará para mostrar qué tan cerca estuviste.\n\n🟩: Letra y posición correctas\n🟨: Letra correcta, posición incorrecta\n⬛: Letra incorrecta"
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Reto diario de artistas del ESC.",
      rules: "Adivina el artista del ESC oculto en 6 intentos. Puedes introducir cualquier combinación de letras. El color de las casillas cambiará para mostrar qué tan cerca estuviste.\n\n🟩: Letra y posición correctas\n🟨: Letra correcta, posición incorrecta\n⬛: Letra incorrecta"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Agrupa 4 elementos de Eurovisión.",
      rules: "Encuentra grupos de cuatro elementos que compartan un tema común del festival. Selecciona cuatro elementos y pulsa 'Enviar' para comprobar tu suposición. ¡Tienes 6 errores permitidos!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifica la entrada con pistas de Eurovisión.",
      rules: "Identifica la entrada misteriosa usando hasta 6 pistas. Cada suposición incorrecta revela una pista nueva y más específica (Año, País, Género, etc.). ¡Adivinar antes otorga más puntos!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Compara estadísticas del festival.",
      rules: "Compara tus suposiciones contra una entrada misteriosa de Eurovisión. Usa los marcadores de atributos (Año, Puesto, País, Género, Tamaño, Sexo) para estrechar tu búsqueda.\n\n🟩: Coincidencia Perfecta\n🟨: Coincidencia Cercana (año/puesto cercano, misma región o grupo de género)\n⬛: Sin Coincidencia"
    }
  },
  wordGame: {
    enter: "Entrar",
    board: "Tablero de juego",
    keyboard: "Teclado virtual"
  },
  links: {
    mistakesRemaining: "Errores restantes",
    oneAway: "A uno...",
    notALink: "Sin vínculo",
    shuffle: "Mezclar",
    deselectAll: "Deseleccionar todo",
    categoriesDiscovered: "Categorías Descubiertas"
  },
  guesser: {
    searchPlaceholder: "Buscar entradas de Eurovisión...",
    noResults: "No se encontraron entradas",
    hintLabels: {
      year: "Año",
      country: "País",
      genre: "Género",
      placing: "Puesto",
      fact: "Dato curioso",
      artist: "Miembros"
    }
  },
  arena: {
    analyze: "Analiza el campo de Eurovisión",
    verdict: "Ver veredicto del Arena",
    labels: {
      year: "Año",
      rank: "Puesto",
      country: "País",
      genre: "Género",
      size: "Tamaño",
      sex: "Sexo"
    }
  },
  stats: {
    totalRecord: "Récord de Eurovisión",
    voterBreakdown: "Desglose de Votante",
    howToWin: "Cómo Ganar",
    earnPoints: "Gana Puntos de Rango",
    earnPointsDesc: "Acumula puntos para subir en la clasificación. Las victorias perfectas dan puntuaciones más altas.",
    claimDouze: "Consigue Douze Points 🏆",
    claimDouzeDesc: "Otorgado por juegos perfectos (sin errores o victorias al primer intento).",
    gotIt: "Entendido, ¡a jugar!",
    played: "Jugados",
    wins: "Victorias",
    winRate: "Efectividad",
    streak: "Racha",
    scoreHistory: "Historial de Puntuación",
    pointsNeeded: "pts para",
    toRank: "Siguiente Rango"
  },
  scorecard: {
    performanceVerdict: "Veredicto de Actuación",
    dailyResult: "Resultado Diario",
    revealedEntry: "Entrada Revelada",
    origin: "Origen",
    year: "Año",
    placing: "Puesto",
    greenroomGossip: "Cotilleo de la Sala Verde",
    performanceLog: "Registro de Actuación",
    watch: "VER",
    reviewBoard: "Revisar Tablero",
    shareResult: "Compartir Resultado",
    resultsCopied: "¡Resultado Copiado!",
    breakthrough: "Acierto en Pista",
    signalLost: "Señal Perdida...",
    score: "Puntuación",
    viewScorecard: "Ver Ficha de Puntuación",
    headlines: {
      nulPoints: "❌ NUL POINTS... 🗳️",
      douzePoints: "🏆 ¡DOUZE POINTS! ✨",
      greatPerformance: "🌟 ¡GRAN ACTUACIÓN! 🎤",
      qualified: "🗳️ ¡CLASIFICADO! 🎤"
    }
  },
  cookies: {
    bannerText: "Utilizamos cookies para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar nuestro tráfico.",
    learnMore: "Saber más",
    acceptAll: "Aceptar todo",
    decline: "Solo esenciales",
    manage: "Gestionar",
    privacyPolicy: "Política de Privacidad",
    cookiePolicy: "Política de Cookies",
    privacySettings: "Privaciad"
  },
  ranks: {
    "First-Time Voter": "Primer Votante",
    "Backing Vocalist": "Corista",
    "National Finalist": "Finalista Nacional",
    "Semi-Final Qualifier": "Clasificado de Semifinal",
    "Grand Finalist": "Gran Finalista",
    "Top 10 Contender": "Aspirante al Top 10",
    "Podium Finish": "Puesto en el Podio",
    "Winner": "Winner",
    "Multi-Winner": "Ganador Múltiple",
    "Hall of Famer": "Salón de la Fama",
    "Eurovision Legend": "Leyenda de Eurovisión"
  },
  metadata: {
    countries: {
      "Switzerland": "Suiza", "Sweden": "Suecia", "Finland": "Finlandia", "Netherlands": "Países Bajos",
      "Italy": "Italia", "Croatia": "Croacia", "United Kingdom": "Reino Unido", "Ukraine": "Ucrania",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Dinamarca", "Norway": "Noruega", "Spain": "España",
      "Austria": "Austria", "Cyprus": "Chipre", "Iceland": "Islandia", "Germany": "Alemania", "Azerbaijan": "Azerbaiyán",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Grecia", "Moldavia": "Moldavia", "Belgium": "Bélgica",
      "Poland": "Polonia", "Slovenia": "Eslovenia", "Ireland": "Irlanda", "Luxembourg": "Luxemburgo", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Rusia", "Turkey": "Turquía", "Bosnia & Herzegovina": "Bosnia y Herzegovina",
      "Malta": "Malta", "Monaco": "Mónaco", "Latvia": "Letonia", "Hungary": "Hungría", "San Marino": "San Marino"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Ópera", "Drum and Bass / Opera": "Drum and Bass / Ópera",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballad": "Balada", "Rock": "Rock", "Industrial Rock": "Rock Industrial", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Pop Cómico", "Latin Pop": "Pop Latino",
      "R&B": "R&B", "Orchestral Pop": "Pop Orquestal", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Pop Indie", "Ethno-Pop": "Etno-Pop", "Soul": "Soul", "Other": "Otro", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternativa", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Balada Pop", "Electronic": "Electrónica", "Industrial Techno": "Techno Industrial",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Neoclásica", "Folk Ballad": "Balada Folk", "Pop Rock": "Pop Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Folk Celta", "Balkan Ballad": "Balada Balcánica", "Disco": "Disco"
    },
    sex: {
      "Male": "Masculino", "Female": "Femenino", "Mixed": "Mixto", "Other": "Otro"
    },
    sizes: {
      solo: "Solo",
      duo: "Dúo"
    }
  }
};
