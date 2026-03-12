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
    lastUpdated: "Última actualización",
    whatAreCookies: "¿Qué son las cookies?",
    whatAreCookiesDesc: "Las cookies son pequeños archivos de texto almacenados en su dispositivo por su navegador. Ayudan a los sitios web a recordarle a usted y sus preferencias.",
    typesWeUse: "Tipos que utilizamos",
    essential: "Cookies esenciales",
    essentialDesc: "Se utilizan para la estabilidad del sitio y para recordar sus opciones de privacidad. Estas no rastrean datos personales.",
    advertising: "Cookies publicitarias",
    advertisingDesc: "Establecidas a través de nuestro sitio por nuestros socios publicitarios (como AdsTerra). Pueden ser utilizadas por esas empresas para crear un perfil de sus intereses y mostrarle anuncios relevantes en otros sitios. AdsTerra puede establecer sus propias cookies para la segmentación y personalización de anuncios.",
    yourChoices: "Sus opciones",
    yourChoicesDesc: "Respetamos su derecho a la privacidad. Puede elegir no permitir ciertos tipos de cookies.",
    status: "Estado actual",
    allAllowed: "Todo permitido",
    essentialOnly: "Solo esenciales",
    notSet: "No establecido",
    partners: "Socios publicitarios",
    partnersDesc: "Utilizamos AdsTerra para mostrar anuncios. AdsTerra y sus socios utilizan cookies para servir anuncios basados en su visita a este sitio y/u otros sitios en Internet.",
    partnersOptOut: "Puede gestionar sus preferencias de publicidad utilizando el interruptor 'Solo esenciales' de arriba o visitando la Política de Privacidad de AdsTerra (https://adsterra.com/privacy-policy/) para obtener más información sobre cómo procesan los datos.",
    moreInfo: "Más información",
    moreInfoDesc: "Para obtener más información sobre las prácticas de privacidad y sus derechos, visite nuestra página de Política de Privacidad.",
    settingsSaved: "Configuración guardada con éxito"
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
      cookiesDesc2: "El consentimiento para las cookies se recopila y gestiona a través de nuestra plataforma de gestión de consentimiento integrada. A los usuarios de las regiones aplicables (como la UE/EEE y el Reino Unido) se les pide su consentimiento antes de utilizar cookies no esenciales.",
      cookiesDesc3: "Puede cambiar sus preferencias de consentimiento en cualquier momento a través de las opciones de consentimiento disponibles en el sitio web."
    },
    advertising: {
      title: "Publicidad",
      p1: "Utilizamos AdsTerra para mostrar anuncios. AdsTerra y sus socios utilizan cookies para servir anuncios basados en las visitas previas de un usuario a nuestro sitio web u otros sitios web. Esto les permite servir anuncios a nuestros usuarios basados en sus visitas a nuestro sitio y/o a otros sitios en Internet.",
      p2: "Puede gestionar sus preferencias de publicidad a través de nuestra página de Política de Cookies o utilizando la opción 'Solo esenciales' en nuestro banner de consentimiento.",
      p3: "Más información sobre cómo AdsTerra procesa los datos personales está disponible en la Política de Privacidad de AdsTerra (https://adsterra.com/privacy-policy/)."
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
      items: ["AdsTerra (publicidad)", "Proveedores de alojamiento", "Proveedores de servicios técnicos necesarios para el funcionamiento del sitio web"]
    },
    internationalTransfers: {
      title: "Transferencias internacionales",
      p1: "Algunos proveedores externos, incluido AdsTerra, pueden procesar datos fuera de la UE o el EEE. Cuando se producen tales transferencias, se utilizan salvaguardias adecuadas, como las Cláusulas Contractuales Tipo."
    },
    dataRetention: {
      title: "Retención de datos",
      p1: "No mantenemos una base de datos de usuarios. Los datos publicitarios se conservan de acuerdo con las políticas de AdsTerra, los registros técnicos para fines de seguridad y el almacenamiento local permanece hasta que lo elimine."
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
      p2: "Cuando completas un juego, registramos el tipo de juego, la puntuación obtenida y la fecha. Esta información es agregada y no contiene ninguna información de identificación personal (como su nombre, dirección IP o correo electrónico).",
      p3: "Utilizamos Google Firebase (un servicio proporcionado por Google) para almacenar y procesar estas estadísticas agregadas. Estos datos se utilizan únicamente con el fin de analizar la popularidad del juego y los niveles de dificultad."
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