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
    todayScore: "Puntuación de hoy",
    howToPlayTitle: "Cómo Jugar a Douze Points",
    howToPlayP1: "Douze Points es tu centro diario de desafíos de Eurovisión. Cada día, se lanzan seis juegos únicos para poner a prueba tus conocimientos sobre la historia del concurso, los artistas y las letras. Tu objetivo es completar cada desafío con el menor número de errores posible para obtener la puntuación máxima de 12 puntos: ¡los legendarios 'Douze Points'!",
    howToPlayP2: "A medida que acumules puntos en todos los juegos, subirás en los rangos globales de fans, evolucionando de un 'Primer Votante' a una verdadera 'Leyenda de Eurovisión'. Puedes seguir tu progreso diario, tus hitos profesionales y tu rango actual haciendo clic en el botón 'Stats' en el encabezado en cualquier momento. ¡Buena suerte, y que gane el mejor fan!",
    historyTitle: "El Legado de Eurovisión",
    historyP1: "El Festival de la Canción de Eurovisión comenzó en 1956 como un experimento técnico de transmisión en vivo, simultánea y transnacional. Desde entonces, se ha convertido en uno de los eventos no deportivos más vistos del mundo, llegando a cientos de millones de espectadores en todo el planeta. Es una celebración única de la música, la diversidad y la cooperación internacional.",
    historyP2: "Desde los primeros días de las baladas orquestales hasta la era moderna del pop, el rock y las actuaciones experimentales de alto octanaje, Eurovisión siempre ha sido un espejo de la cultura e identidad europeas. Ha lanzado las carreras de iconos globales como ABBA y Celine Dion, y sigue siendo una plataforma para la innovación artística y el intercambio cultural cada año.",
    historyP3: "En Douze Points, celebramos esta rica historia a través de nuestros desafíos diarios. Tanto si eres un espectador ocasional como un superfan incondicional que conoce cada entrada desde Lugano, nuestros juegos están diseñados para poner a prueba tu conocimiento y pasión por el concurso. Únete a nosotros cada día para demostrar tu experiencia, descubrir nuevas canciones favoritas y subir en los rangos de la comunidad de fans de Eurovisión.",
    historyP4: "A medida que el concurso continúa evolucionando con nuevas tecnologías y tendencias musicales, su misión principal sigue siendo la misma: unir a las personas a través del poder de la música. Desde la introducción del televoto hasta los espectaculares diseños de escenario del siglo XXI, Eurovisión siempre ha superado los límites de lo que es posible en el entretenimiento en vivo. Estamos orgullosos de formar parte de esta vibrante comunidad y de proporcionar un espacio donde los fans puedan interactuar con el legado del concurso de una manera divertida e interactiva.",
    historyP5: "Más allá de la competición, Eurovisión ha fomentado una enorme comunidad global de fans que comparten un profundo aprecio por los diversos estilos musicales y expresiones culturales mostrados en el escenario. Esta comunidad es el corazón del concurso, y en Douze Points, nuestro objetivo es proporcionar una plataforma que honre este espíritu. Nuestra misión es mantener viva la magia de Eurovisión durante todo el año, ofreciendo un espacio donde los fans puedan poner a prueba sus conocimientos, celebrar sus entradas favoritas y conectar con la historia del concurso de canciones más querido del mundo."
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Reto diario de títulos de Eurovisión.",
      rulesShort: "Identifica el título oculto de la canción de Eurovisión en 6 intentos. Las fichas cambian de color:\n🟩 Lugar correcto\n🟨 Lugar equivocado\n⬛ No está en el título",
      rulesLong: "EuroSong es un juego de adivinanzas de palabras dedicado al vasto catálogo de títulos de canciones de Eurovisión. Tu objetivo es identificar un título de canción específico de la historia del concurso en seis intentos.\n\nCómo jugar:\n• Escribe cualquier combinación de letras para formar una suposición.\n• Después de cada intento, el color de las fichas cambiará para proporcionar retroalimentación:\n  - 🟩 (Verde): La letra está en el título y en el lugar correcto.\n  - 🟨 (Amarillo): La letra está en el título pero en el lugar equivocado.\n  - ⬛ (Gris): La letra no está en el título en absoluto.\n• Usa la retroalimentación de cada intento para reducir las posibilidades.\n• El juego presenta títulos de todas las épocas de Eurovisión, desde la década de 1950 hasta la actualidad."
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Reto diario de artistas del ESC.",
      rulesShort: "Adivina el nombre del artista o grupo de Eurovisión en 6 intentos. Las fichas cambian de color:\n🟩 Lugar correcto\n🟨 Lugar equivocado\n⬛ No está en el nombre",
      rulesLong: "EuroArtist te desafía a identificar a los famosos intérpretes y grupos que han pasado por el escenario de Eurovisión. Desde ganadores legendarios hasta favoritos de culto, ¿puedes adivinar el artista diario en seis intentos?\n\nCómo jugar:\n• Introduce el nombre de un artista o grupo como tu suposición.\n• Las fichas cambiarán de color según lo cerca que esté tu suposición del nombre objetivo:\n  - 🟩 (Verde): Letra correcta en la posición correcta.\n  - 🟨 (Amarillo): Letra correcta en la posición incorrecta.\n  - ⬛ (Gris): Esta letra no forma parte del nombre del artista.\n• Recuerda que los nombres de los artistas pueden incluir espacios y caracteres especiales, que a menudo están fijos en el tablero para ayudarte."
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Conecta 4 palabras de un estribillo lírico.",
      rulesShort: "Conecta 16 palabras en cuatro grupos de cuatro. Cada grupo pertenece al estribillo de una canción de Eurovisión diferente. 6 errores permitidos.",
      rulesLong: "EuroRefrain pone a prueba tu memoria para las letras más icónicas de la historia de Eurovisión. Se te presenta una cuadrícula de 16 palabras tomadas de cuatro estribillos de canciones diferentes.\n\nCómo jugar:\n• Tu tarea es agrupar estas 16 palabras en cuatro conjuntos de cuatro, donde cada conjunto pertenece al estribillo de una sola canción.\n• Selecciona cuatro palabras que creas que van juntas y pulsa 'Enviar'.\n• Si es correcto, las palabras se eliminarán del tablero y se revelará el título de la canción.\n• Si es incorrecto, cuenta como un error. Tienes permitido hasta 6 errores antes de que termine el juego.\n• Las palabras se eligen cuidadosamente para que sean un desafío, a menudo con palabras comunes que podrían pertenecer a varias canciones."
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Agrupa 4 elementos de Eurovisión.",
      rulesShort: "Agrupa 16 elementos relacionados con Eurovisión en cuatro categorías de cuatro basadas en una conexión compartida. 6 errores permitidos.",
      rulesLong: "EuroLinks es un juego de lógica y curiosidades de Eurovisión. Debes encontrar las conexiones ocultas entre 16 elementos diferentes relacionados con el concurso.\n\nCómo jugar:\n• La cuadrícula contiene 16 elementos que pueden agruparse in cuatro categorías de cuatro elementos cada una.\n• Las categorías pueden ir desde 'Ganadores de los 90' hasta 'Países que nunca han ganado' o 'Artistas que compitieron varias veces'.\n• Selecciona cuatro elementos y pulsa 'Enviar' para comprobar si comparten una categoría.\n• Tienes 6 errores permitidos para resolver todo el rompecabezas.\n• Cada categoría tiene un nivel de dificultad, que va desde lo sencillo hasta curiosidades de nivel experto."
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifica la entrada con pistas de Eurovisión.",
      rulesShort: "Identifica la entrada misteriosa de Eurovisión en 6 intentos. Cada suposición incorrecta revela una nueva pista más específica.",
      rulesLong: "EuroGuess es un juego de estilo detectivesco en el que identificas una entrada misteriosa de Eurovisión utilizando una serie de pistas. El desafío es adivinar la entrada con el menor número de pistas posible.\n\nCómo jugar:\n• Empiezas con una pista inicial (normalmente el año).\n• Si tu suposición es incorrecta, se revela una nueva pista más específica (País, Género, Puesto, etc.).\n• Tienes un total de 6 intentos para identificar la entrada correcta.\n• Usa la barra de búsqueda para encontrar y seleccionar tu suposición de nuestra base de datos completa de entradas de Eurovisión.\n• La puntuación se basa en cuántas pistas has necesitado: ¡adivinar pronto te otorga el máximo de puntos!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Compara estadísticas del festival.",
      rulesShort: "Encuentra la entrada objetivo de Eurovisión en 7 intentos. Los marcadores muestran:\n🟩 Coincidencia correcta\n🟨 Coincidencia cercana\n⬛ Sin coincidencia\nUsa flechas (⬆️⬇️) para Año y Puesto.",
      rulesLong: "EuroArena es un juego de adivinanzas basado en datos en el que utilizas estadísticas comparativas para encontrar una entrada oculta de Eurovisión. Es una prueba de tu conocimiento de los resultados del concurso y los atributos de los artistas.\n\nCómo jugar:\n• Introduce una suposición para ver cómo se comparan sus atributos con la entrada objetivo.\n• Los atributos incluyen Año, Puesto, País, Género y Tamaño/Sexo del artista.\n• Los marcadores de retroalimentación guiarán tu siguiente movimiento:\n  - 🟩 (Verde): Una coincidencia perfecta para ese atributo.\n  - 🟨 (Amarillo): Una coincidencia cercana (por ejemplo, el año está dentro de los 3 años, o el país está en la misma región).\n  - ⬛ (Gris): No hay coincidencia para este atributo.\n• Las flechas junto a Año y Puesto te dirán si el valor objetivo es mayor o menor que tu suposición.\n• Tienes 7 intentos para encontrar la entrada correcta."
    }
  },
  wordGame: {
    enter: "Entrar",
    board: "Tablero de juego",
    keyboard: "Teclado virtual",
    notEnoughLetters: "No hay suficientes letras"
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
      p1: "Utilizamos Google AdSense para mostrar anuncios. Los proveedores terceros, incluido Google, utilizan cookies para servir anuncios basados en las visitas previas de un usuario a nuestro sitio web u otros sitios web. El uso de cookies publicitarias por parte de Google le permite a él y a sus socios servir anuncios a nuestros usuarios basados en sus visitas a nuestro sitio y/o a otros sitios en Internet.",
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
    "First-Time Voter": "Primer Votante",
    "Greenroom Guest": "Invitado de la Sala Verde",
    "Backing Vocalist": "Corista",
    "Jury Member": "Miembro del Jurado",
    "National Finalist": "Finalista Nacional",
    "Televote Favorite": "Favorito del Tele-voto",
    "National Representative": "Representante Nacional",
    "Semi-Final Qualifier": "Clasificado de Semifinal",
    "Press Center Darling": "Favorito de la Prensa",
    "Grand Finalist": "Gran Finalista",
    "Fan Favorite": "Favorito de los Fans",
    "Top 10 Contender": "Aspirante al Top 10",
    "Dark Horse": "Caballo Ganador",
    "Podium Finish": "Puesto en el Podio",
    "Chart Topper": "Éxito en Listas",
    "Silver Medalist": "Medallista de Plata",
    "Winner": "Winner",
    "Double Winner": "Doble Ganador",
    "Multi-Winner": "Ganador Múltiple",
    "Hall of Famer": "Salón de la Fama",
    "Iconic Entry": "Entrada Icónica",
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
      "Malta": "Malta", "Monaco": "Mónaco", "Latvia": "Lettonia", "Hungary": "Hungría", "San Marino": "San Marino",
      "Lithuania": "Lituania", "Montenegro": "Montenegro", "North Macedonia": "Macedonia del Norte", "Czechia": "Chequia",
      "Romania": "Rumania", "Slovakia": "Eslovaquia", "Georgia": "Georgia", "Armenia": "Armenia",
      "Andorra": "Andorra", "Morocco": "Marruecos", "Belarus": "Bielorrusia"
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
      "Celtic Folk": "Folk Celta", "Balkan Ballad": "Balada Balcánica", "Disco": "Disco",
      "Operatic Pop": "Pop Operístico", "Indie Rock": "Indie Rock", "Avant-Garde": "Avant-Garde", "Country": "Country"
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