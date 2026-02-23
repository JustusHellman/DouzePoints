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
    selectLanguage: "Seleccionar Idioma",
    languages: "Idiomas",
    qualified: "Calificado"
  },
  greenroom: {
    greenroom: "La Sala Verde",
    description: "Relájate y prepárate para la actuación. Demuestra tus conocimientos sobre el Festival de la Canción de Eurovisión con seis retos diarios diseñados para el fan definitivo.",
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
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Conecta 4 palabras de un estribillo lírico.",
      rules: "Encuentra grupos de cuatro palabras que formen un estribillo secuencial de una canción específica de Eurovisión. Selecciona cuatro palabras y pulsa 'Enviar'. ¡Tienes 6 errores permitidos para identificar las 4 canciones!"
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
    betterLuck: "¡Más suerte mañana!",
    notALink: "Sin vínculo",
    shuffle: "Mezclar",
    deselectAll: "Deseleccionar todo",
    categoriesDiscovered: "Categorías Descubiertas",
    lyricsDiscovered: "Estribillos Descubiertos"
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
    nextGame: "Próximo juego en",
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
    privacySettings: "Privaciad",
    lastUpdated: "Última actualización"
  },
  privacy: {
    lastUpdated: "Febrero 2026",
    introduction: {
      title: "Introducción",
      p1: "Bienvenido a Douze Points (www.douzepoints.net).",
      p2: "Este sitio web es operado por Justus Hellman, con sede en Suecia (el “Responsable del Tratamiento”).",
      p3: "Si tiene alguna pregunta sobre esta Política de Privacidad o sus datos personales, puede contactar con: douzepointsgame@gmail.com"
    },
    dataCollection: {
      title: "Qué datos recopilamos",
      autoTitle: "a) Datos recopilados automáticamente",
      autoDesc: "Cuando visita el sitio web, se puede recopilar automáticamente cierta información, incluyendo:",
      autoItems: ["Dirección IP", "Tipo y versión del navegador", "Información del dispositivo", "Sistema operativo", "Páginas visitadas", "Fecha y hora de acceso", "Sitio web de referencia"],
      autoFootnote: "Esta información puede ser procesada por nuestros proveedores de publicidad y análisis.",
      cookiesTitle: "b) Cookies y tecnologías similares",
      cookiesDesc1: "Utilizamos cookies y tecnologías similares para publicidad, medición del rendimiento de los anuncios y funcionalidad del sitio web.",
      cookiesDesc2: "El consentimiento para las cookies se recopila y gestiona a través de Google Funding Choices, que proporciona nuestra plataforma de gestión de consentimiento (CMP). A los usuarios de las regiones aplicables (como la UE/EEE y el Reino Unido) se les pide su consentimiento antes de utilizar cookies no esenciales.",
      cookiesDesc3: "Puede cambiar sus preferencias de consentimiento en cualquier momento a través de las opciones de consentimiento disponibles en el sitio web."
    },
    advertising: {
      title: "Publicidad",
      p1: "Utilizamos Google AdSense para mostrar anuncios. Google y sus socios pueden utilizar cookies y tecnologías similares para servir anuncios personalizados, medir el rendimiento de los anuncios y limitar el número de veces que ve un anuncio.",
      p2: "Puede gestionar sus preferencias de publicidad a través de: adssettings.google.com",
      p3: "Más información sobre cómo Google procesa los datos personales está disponible en la Política de Privacidad de Google."
    },
    legalBasis: {
      title: "Base legal (RGPD)",
      p1: "Si se encuentra en la UE/EEE, procesamos datos personales sobre las siguientes bases legales:",
      consentLabel: "Consentimiento",
      consent: "para publicidad personalizada y cookies no esenciales.",
      legitimacyLabel: "Legitimidad",
      legitimacy: "para la funcionalidad básica del sitio web, la seguridad y la prevención del fraude.",
      legalLabel: "Legal",
      legal: "cuando lo exija la legislación aplicable."
    },
    localStorage: {
      title: "Almacenamiento local",
      p1: "Utilizamos el almacenamiento local de su navegador para guardar el progreso del juego, las puntuaciones y las estadísticas. Esta información:",
      items: ["Se almacena solo en su dispositivo", "No se transmite a nuestros servidores", "Se puede eliminar borrando los datos de su navegador"]
    },
    dataSharing: {
      title: "Intercambio de datos",
      p1: "No vendemos datos personales. Sin embargo, los datos pueden ser procesados por terceros proveedores de servicios, incluyendo:",
      items: ["Google (publicidad y gestión de consentimiento)", "Proveedores de alojamiento", "Proveedores de servicios técnicos necesarios para el funcionamiento del sitio web"]
    },
    internationalTransfers: {
      title: "Transferencias internacionales",
      p1: "Algunos proveedores externos, incluido Google, pueden procesar datos fuera de la UE o el EEE. Cuando se producen tales transferencias, se utilizan salvaguardias adecuadas, como las Cláusulas Contractuales Tipo."
    },
    dataRetention: {
      title: "Retención de datos",
      p1: "No mantenemos una base de datos de usuarios. Los datos publicitarios se conservan de acuerdo con las políticas de Google, los registros técnicos para fines de seguridad y el almacenamiento local permanece hasta que lo elimine."
    },
    yourRights: {
      title: "Sus derechos (UE/EEE)",
      p1: "Si se encuentra en la UE/EEE, tiene derecho a acceder, corregir o eliminar sus datos, y a restringir u oponerse al tratamiento. En Suecia, la autoridad de control es Integritetsskyddsmyndigheten.",
      p2: "Póngase en contacto con nosotros en douzepointsgame@gmail.com para ejercer sus derechos."
    },
    dataSecurity: {
      title: "Seguridad de los datos",
      p1: "Tomamos medidas técnicas y organizativas razonables para proteger los datos personales. Sin embargo, ningún método de transmisión por Internet es completamente seguro."
    },
    thirdPartyLinks: {
      title: "Enlaces a sitios web de terceros",
      p1: "Este sitio web puede contener enlaces a sitios web de terceros, incluido YouTube. No somos responsables de las prácticas de privacidad ni del contenido de los sitios web externos."
    },
    changes: {
      title: "Cambios en esta política",
      p1: "Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier actualización se publicará en esta página con una fecha de “Última actualización” revisada."
    }
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
      "Switzerland": "Suiza", "Sweden": "Suecia", "Finland": "Finlandia", "The Netherlands": "Países Bajos",
      "Italy": "Italia", "Croatia": "Croacia", "United Kingdom": "Reino Unido", "Ukraine": "Ucrania",
      "France": "Francia",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Dinamarca", "Norway": "Noruega", "Spain": "España",
      "Austria": "Austria", "Cyprus": "Chipre", "Iceland": "Islandia", "Germany": "Alemania", "Azerbaijan": "Azerbaiyán",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Grecia", "Moldova": "Moldavia", "Belgium": "Bélgica",
      "Poland": "Polonia", "Slovenia": "Eslovenia", "Ireland": "Irlanda", "Luxembourg": "Luxemburgo", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Rusia", "Turkey": "Turquía", "Bosnia & Herzegovina": "Bosnia y Herzegovina",
      "Malta": "Malta", "Monaco": "Mónaco", "Latvia": "Lettonia", "Hungary": "Hungría", "San Marino": "San Marino"
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