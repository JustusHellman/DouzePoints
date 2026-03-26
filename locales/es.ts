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
    songs: "canciones",
    steps: "pasos",
    mistakesLeft: "Errores restantes",
    howToPlay: "Cómo jugar",
    close: "Cerrar",
    selectLanguage: "Seleccionar Idioma",
    languages: "Idiomas",
    qualified: "Calificado",
    semiFinal: "Semifinal",
    joinCommunity: "Únete a la comunidad"
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
    howToPlayP2: "A medida que acumules puntos en todos los juegos, subirás en los rangos globales de fans, evolucionando de un 'Primer Votante' a una verdadera 'Leyenda de Eurovisión'. Puedes seguir tu progreso diario, tus hitos profesionales y tu rango actual haciendo clic en el botón 'Stats' en el encabezado en cualquier momento. ¡Buena suerte, y que gane el mejor fan!"
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
    saveImage: "Guardar tarjeta",
    copyImage: "Copiar tarjeta",
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
  privacy: {
    title: "Política de Privacidad",
    lastUpdated: "Marzo 2026",
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
      autoFootnote: "Esta información puede ser procesada por nuestros proveedores de análisis.",
      cookiesTitle: "b) Almacenamiento local",
      cookiesDesc1: "Utilizamos el almacenamiento local de su navegador exclusivamente para guardar su progreso en el juego, puntuaciones y estadísticas.",
      cookiesDesc2: "Estos datos se almacenan solo en su dispositivo, no se transmiten a nuestros servidores y se pueden eliminar borrando los datos de su navegador.",
      cookiesDesc3: "Utilizamos Google Analytics para ayudarnos a comprender cómo los usuarios interactúan con nuestro sitio web. Esto nos ayuda a mejorar la experiencia del usuario y a comprender qué funciones son más populares."
    },
    legalBasis: {
      title: "Base legal (RGPD)",
      p1: "Si se encuentra en la UE/EEE, procesamos datos personales sobre las siguientes bases legales:",
      consentLabel: "Consentimiento",
      consent: "para cookies no esenciales (si las hubiera).",
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
      items: ["Proveedores de alojamiento", "Proveedores de servicios técnicos necesarios para el funcionamiento del sitio web"]
    },
    internationalTransfers: {
      title: "Transferencias internacionales",
      p1: "Algunos proveedores externos pueden procesar datos fuera de la UE o el EEE. Cuando se producen tales transferencias, se utilizan salvaguardias adecuadas, como las Cláusulas Contractuales Tipo."
    },
    dataRetention: {
      title: "Retención de datos",
      p1: "No mantenemos una base de datos de usuarios. Los registros técnicos para fines de seguridad se conservan de acuerdo con las políticas de nuestros proveedores, y el almacenamiento local permanece hasta que lo elimine."
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
    },
    about: {
      title: "Sobre Douze Points",
      p1: "Douze Points es un proyecto apasionado creado para la comunidad del Festival de la Canción de Eurovisión. Nuestro objetivo es proporcionar una experiencia interactiva diaria y divertida para que los fans pongan a prueba sus conocimientos y celebren la rica historia del festival.",
      p2: "El juego es completamente gratuito y se mantiene como un tributo a la mayor competición musical del mundo."
    },
    stats: {
      title: "Estadísticas y análisis del juego",
      p1: "Para ayudarnos a entender cómo se desempeña la comunidad y mejorar el equilibrio del juego, Douze Points recopila estadísticas anónimas del juego.",
      p2: "Cuando completas un juego, registramos el tipo de juego, la puntuación obtenida y la fecha. Estas información es agregada y no contiene ninguna información de identificación personal (como su nombre, dirección IP o correo electrónico).",
      p3: "Utilizamos Google Firebase (un servicio proporcionado por Google) para almacenar y procesar estas estadísticas agregadas. Estos datos se utilizan únicamente con el fin de analizar la popularidad del juego y los niveles de dificultad."
    },
    googleAnalytics: {
      title: "Google Analytics",
      p1: "Utilizamos Google Analytics para recopilar información sobre cómo los usuarios interactúan con nuestro sitio web. Esto nos ayuda a mejorar la experiencia del usuario y a comprender qué funciones son más populares.",
      p2: "Google Analytics utiliza cookies y tecnologías similares para recopilar datos como su dirección IP, tipo de navegador, información del dispositivo y páginas visitadas. Estos datos son procesados por Google de acuerdo con su política de privacidad.",
      p3: "Puede optar por no participar en Google Analytics utilizando el Complemento de inhabilitación para navegadores de Google Analytics o ajustando la configuración de su navegador."
    }
  },
  about: {
    title: "Sobre Douze Points",
    subtitle: "Celebrando el Festival de la Canción de Eurovisión",
    mission: {
      title: "Nuestra Misión",
      p1: "Douze Points nació de un profundo amor por el Festival de la Canción de Eurovisión. Mi misión es proporcionar un centro durante todo el año para que los fans se involucren con la rica historia del concurso a través de juegos diarios divertidos, desafiantes e interactivos. Creo que el espíritu de Eurovisión —la unidad a través de la música— debe celebrarse todos los días, no solo durante la semana del concurso en mayo.",
      p2: "Creo que Eurovisión es más que una simple competencia musical: es una celebración de la diversidad, la cultura y la unidad. Mis juegos están diseñados para honrar ese espíritu mientras ponen a prueba el conocimiento incluso de los superfans más dedicados. Desde las baladas orquestales de la década de 1950 hasta el pop y el rock de alta energía de la era moderna, lo cubro todo."
    },
    story: {
      title: "La Historia",
      p1: "Creado por un fan para los fans, Douze Points comenzó como un pequeño proyecto para mantener viva la magia de Eurovisión entre concursos. Hoy en día, cuenta con seis juegos diarios únicos que cubren todo, desde 1956 hasta el presente.",
      p2: "Ya seas un 'Votante por primera vez' o una 'Leyenda de Eurovisión', siempre hay algo nuevo que descubrir sobre el festival de la canción favorito del mundo."
    },
    history: {
      title: "Historia de Eurovisión",
      p1: "El Festival de la Canción de Eurovisión es uno de los eventos no deportivos más antiguos y vistos del mundo.",
      p2: "A lo largo de los años, el concurso ha lanzado las carreras de iconos globales y ha proporcionado un escenario para diversas expresiones musicales. En Douze Points, mi objetivo es preservar y celebrar este increíble legado."
    },
    games: {
      title: "Los Juegos",
      p1: "Nuestros desafíos diarios están inspirados en populares acertijos de palabras y lógica, adaptados específicamente para la comunidad de ESC:",
      gameList: [
        { name: "EuroSong", desc: "Un juego de adivinar títulos de canciones al estilo Wordle." },
        { name: "EuroArtist", desc: "Identifica al intérprete en 6 intentos." },
        { name: "EuroRefrain", desc: "Conecta las letras con sus estribillos icónicos." },
        { name: "EuroLinks", desc: "Encuentra las conexiones ocultas entre elementos de ESC." },
        { name: "EuroGuess", desc: "El cuestionario definitivo sobre entradas misteriosas." },
        { name: "EuroArena", desc: "Una batalla de estadísticas de Eurovisión basada en datos." }
      ]
    },
    community: {
      title: "La Comunidad Primero",
      p1: "No estoy afiliado a la UER ni a ninguna emisora oficial. Soy simplemente un fan que quiere compartir mi pasión por Eurovisión con el mundo."
    },
    data: {
      title: "Datos y Créditos",
      p1: "¡Un enorme agradecimiento al proyecto TidyTuesday y a sus colaboradores por proporcionar el conjunto de datos fundamental que hizo posible Douze Points! ¡Su dedicación a los datos abiertos nos permitió construir la rica historia del concurso para estos juegos!"
    }
  },
  contact: {
    title: "Contáctanos",
    methods: {
      title: "Ponte en contacto",
      p1: "¿Tienes alguna pregunta, comentario o has encontrado un error? ¡Me encantaría saber de ti! Puedes contactarme por correo electrónico o encontrarme en la comunidad de Eurovisión."
    },
    faq: {
      title: "Preguntas frecuentes",
      q1: "¿Cuándo se reinician los juegos?",
      a1: "Los desafíos diarios se reinician todos los días a medianoche (UTC).",
      q2: "¿Cómo si calcula mi rango?",
      a2: "Tu rango se basa en el total de puntos de tu carrera acumulados en todos los juegos. ¡Cuanto más juegues y mejor lo hagas, más alto subirás!",
      q3: "¿Puedo sugerir una canción o un artista?",
      a3: "¡Absolutamente! Siempre busco mejorar nuestra base de datos. Envíame un correo electrónico con tus sugerencias.",
      q4: "¿Douze Points es gratis?",
      a4: "Sí, Douze Points es completamente gratuito para todos.",
      q5: "¿Cómo comparto mis resultados?",
      a5: "Después de completar un juego, verás un botón 'Compartir'."
    },
    feedback: {
      title: "Comentarios",
      p1: "Tus comentarios me ayudan a hacer que Douze Points sea mejor para todos. No dudes en compartir tus ideas sobre cómo puedo mejorar la experiencia."
    }
  },
  terms: {
    lastUpdated: "Marzo 2026",
    title: "Términos de servicio",
    acceptance: {
      title: "Aceptación de los términos",
      p1: "Al acceder o utilizar Douze Points (www.douzepoints.net), aceptas estar sujeto a estos Términos de servicio. Si no estás de acuerdo con estos términos, no utilices el sitio web."
    },
    description: {
      title: "Descripción del servicio",
      p1: "Douze Points es un sitio web hecho por fans que ofrece juegos y curiosidades con temática de Eurovisión con fines de entretenimiento. El servicio se proporciona 'tal cual' y puede modificarse o interrumpirse en cualquier momento."
    },
    ip: {
      title: "Propiedad intelectual",
      p1: "El Festival de la Canción de Eurovisión y las marcas comerciales relacionadas sono propiedad de la Unión Europea de Radiodifusión (EBU). Este sitio web no está afiliado, respaldado ni patrocinado por la EBU.",
      p2: "Todo el contenido original, el código y el diseño de este sitio web son propiedad del propietario del sitio web. No puedes reproducir ni distribuir ninguna parte de este sitio web sin permiso."
    },
    conduct: {
      title: "Conducta del usuario",
      p1: "Aceptas utilizar el sitio web solo para fines lícitos y de una manera que no infrinja los derechos de los demás. El comportamiento prohibido incluye:",
      items: [
        "Intentar interferir con el funcionamiento del sitio web",
        "Uso de scripts automatizados para recopilar datos o jugar",
        "Suplantar a otros o proporcionar información falsa",
        "Participar en cualquier actividad que pueda dañar la reputación del sitio web"
      ]
    },
    disclaimer: {
      title: "Descargo de responsabilidad de garantías",
      p1: "El sitio web se proporciona 'tal cual' y 'según disponibilidad'. No ofrecemos garantías, expresas o implícitas, con respecto a la precisión, confiabilidad o disponibilidad del servicio."
    },
    limitation: {
      title: "Limitación de responsabilidad",
      p1: "En la máxima medida permitida por la ley, el propietario del sitio web no será responsable de ningún daño directo, indirecto, incidental o consecuente que surja de su uso del sitio web."
    },
    governingLaw: {
      title: "Ley aplicable",
      p1: "Estos Términos de servicio se regirán e interpretarán de acuerdo con las leyes de Suecia."
    },
    changes: {
      title: "Cambios en los términos",
      p1: "Nos reservamos el derecho de modificar estos Términos de servicio en cualquier momento. Cualquier actualización se publicará en esta página con una fecha de 'Última actualización' revisada."
    },
    contact: {
      title: "Información de contacto",
      p1: "Si tienes alguna pregunta sobre estos Términos de servicio, contáctanos en: douzepointsgame@gmail.com"
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
      "Andorra": "Andorra", "Morocco": "Marruecos", "Belarus": "Bielorrusia",
      "Yugoslavia": "Yugoslavia", "Serbia & Montenegro": "Serbia y Montenegro",
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
      "Male": "Masculino", "Female": "Femenino", "Mixed": "Mixto", "Other": "Otro"
    },
    sizes: {
      solo: "Solo",
      duo: "Dúo"
    }
  },
  support: {
    title: "¿Disfrutas de Douze Points?",
    completed: "¡Has completado los desafíos de hoy!",
    button: "Cómprame un café"
  },
  infinite: {
    title: "Encore",
    description: "¡El espectáculo diario ha terminado, pero la fiesta nunca se detiene! Vuelve al escenario y pon a prueba tu resistencia en nuestros modos de juego sin fin. ¿Cuánto tiempo puedes mantener la música sonando antes de tocar la nota equivocada?",
    difficulty: "Seleccionar Dificultad",
    difficulties: {
      top10: "Top 10 (2000-Presente)",
      modern: "2000-Presente",
      all: "Toda la Historia (1956-Presente)"
    },
    currentRun: "Racha Actual",
    bestRun: "Mejor Racha",
    best: "Mejor",
    songsFinished: "Canciones Terminadas",
    currentScore: "Puntuación Actual",
    bestScore: "Mejor Puntuación",
    score: "Puntuación",
    nextSong: "Siguiente Canción",
    gameOver: "Fin del Juego",
    tryAgain: "Intentar de Nuevo",
    congratulations: "¡Felicidades!",
    allSongsFinished: "¡Has terminado con éxito todas las entradas de esta categoría! Eres una verdadera Leyenda de Eurovisión.",
    streak: "Racha",
    bestStreak: "Mejor Racha",
    continueRun: "Continuar Racha",
    exitToEncore: "Salir al Encore",
    playAgain: "Jugar de Nuevo",
    continue: "Continuar",
    newBest: "¡Nuevo Récord!",
    infiniteMode: "Modo Infinito",
    placement: "Posición",
    era: "Época",
    placements: {
      all: "Todas las posiciones",
      winners: "Solo ganadores",
      top3: "Top 3",
      top5: "Top 5",
      top10: "Top 10",
      top15: "Top 15",
      finalists: "Finalistas"
    },
    years: {
      all: "Toda la historia",
      "2021": "2021-Presente",
      "2010": "2010-Presente",
      "2000": "2000-Presente",
      "1956": "1956-1999"
    }
  }
};