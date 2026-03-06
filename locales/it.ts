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
    selectLanguage: "Seleziona Lingua",
    languages: "Lingue",
    qualified: "Qualificato"
  },
  greenroom: {
    greenroom: "La Greenroom",
    description: "Rilassati e preparati per l'esibizione. Dimostra le tue conoscenze sull'Eurovision Song Contest con sei sfide quotidiane per il superfan definitivo.",
    dailyProgress: "Progresso Giornaliero",
    qualified: "✨ Qualificato per la Grand Final ✨",
    finishedToday: "Completato oggi",
    statsButton: "Stats",
    careerStats: "Stats",
    todayScore: "Punteggio di oggi",
    howToPlayTitle: "Come Giocare a Douze Points",
    howToPlayP1: "Douze Points è il tuo centro quotidiano per le sfide dell'Eurovision. Ogni giorno vengono pubblicati sei giochi unici per mettere alla prova la tua conoscenza della storia del concorso, degli artisti e dei testi. Il tuo obiettivo è completare ogni sfida con il minor numero di errori possibile per ottenere il punteggio massimo di 12 punti: i leggendari 'Douze Points'!",
    howToPlayP2: "Man mano che accumuli punti in tutti i giochi, scalerai i ranghi globali dei fan, evolvendo da 'Primo Votante' a una vera 'Leggenda dell'Eurovision'. Puoi monitorare i tuoi progressi quotidiani, i traguardi della tua carriera e il tuo rango attuale facendo clic sul pulsante 'Stats' nell'intestazione in qualsiasi momento. Buona fortuna e che vinca il miglior fan!",
    historyTitle: "L'Eredità dell'Eurovision",
    historyP1: "L'Eurovision Song Contest è iniziato nel 1956 come esperimento tecnico di trasmissione in diretta, simultanea e transnazionale. Da allora, è cresciuto fino a diventare uno degli eventi non sportivi più visti al mondo, raggiungendo centinaia di milioni di spettatori in tutto il globo. È una celebrazione unica della musica, della diversità e della cooperazione internazionale.",
    historyP2: "Dai primi giorni delle ballate orchestrali all'era moderna del pop, del rock e delle esibizioni sperimentali ad alto numero di ottani, l'Eurovision è sempre stato uno specchio della cultura e dell'identità europea. Ha lanciato le carriere di icone globali come gli ABBA e Celine Dion, e continua ad essere ogni anno una piattaforma per l'innovazione artistica e lo scambio culturale.",
    historyP3: "Su Douze Points, celebriamo questa ricca storia attraverso le nostre sfide quotidiane. Che tu sia uno spettatore occasionale o un superfan accanito che conosce ogni brano fin da Lugano, i nostri giochi sono progettati per mettere alla prova la tua conoscenza e passione per il concorso. Unisciti a noi ogni giorno per dimostrare la tua competenza, scoprire nuove canzoni preferite e scalare le classifiche della comunità dei fan dell'Eurovision.",
    historyP4: "Mentre il concorso continua ad evolversi con nuove tecnologie e tendenze musicali, la sua missione principale rimane la stessa: unire le persone attraverso il potere della musica. Dall'introduzione del televoto alle spettacolari scenografie del XXI secolo, l'Eurovision ha sempre spinto i confini di ciò che è possibile nell'intrattenimento dal vivo. Siamo orgogliosi di far parte di questa vivace comunità e di fornire uno spazio in cui i fan possono interagire con l'eredità del concorso in modo divertente e interattivo.",
    historyP5: "Oltre alla competizione, l'Eurovision ha favorito un'enorme comunità globale di fan che condividono un profondo apprezzamento per i diversi stili musicali e le espressioni culturali mostrate sul palco. Questa comunità è il cuore del concorso e, su Douze Points, miriamo a fornire una piattaforma che onori questo spirito. La nostra missione è mantenere viva la magia dell'Eurovision tutto l'anno, offrendo uno spazio in cui i fan possano mettere alla prova le proprie conoscenze, celebrare i propri brani preferiti e connettersi con la storia del concorso canoro più amato al mondo."
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Sfida quotidiana sui titoli dell'Eurovision.",
      rulesShort: "Identifica il titolo nascosto della canzone dell'Eurovision in 6 tentativi. Le tessere cambiano colore:\n🟩 Posizione corretta\n🟨 Posizione errata\n⬛ Non è nel titolo",
      rulesLong: "EuroSong è un gioco di indovinelli di parole dedicato al vasto catalogo di titoli di canzoni dell'Eurovision. Il tuo obiettivo è identificare un titolo di canzone specifico della storia del concorso in sei tentativi.\n\nCome giocare:\n• Digita qualsiasi combinazione di lettere per formare un tentativo.\n• Dopo ogni tentativo, il colore delle tessere cambierà per fornire un feedback:\n  - 🟩 (Verde): La lettera è nel titolo e nel posto giusto.\n  - 🟨 (Giallo): La lettera è nel titolo ma nel posto sbagliato.\n  - ⬛ (Grigio): La lettera non è affatto nel titolo.\n• Usa il feedback di ogni tentativo per restringere le possibilità.\n• Il gioco presenta titoli di tutte le epoche dell'Eurovision, dagli anni '50 ai giorni nostri."
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Sfida quotidiana sugli artisti ESC.",
      rulesShort: "Indovina il nome dell'artista o del gruppo dell'Eurovision in 6 tentativi. Le tessere cambiano colore:\n🟩 Posizione corretta\n🟨 Posizione errata\n⬛ Non è nel nome",
      rulesLong: "EuroArtist ti sfida a identificare i famosi interpreti e gruppi che hanno calcato il palco dell'Eurovision. Dai vincitori leggendari ai preferiti di culto, riesci a indovinare l'artista del giorno in sei tentativi?\n\nCome giocare:\n• Inserisci il nome di un artista o di un gruppo come tentativo.\n• Le tessere cambieranno colore in base a quanto il tuo tentativo è vicino al nome di destinazione:\n  - 🟩 (Verde): Lettera corretta nella posizione corretta.\n  - 🟨 (Giallo): Lettera corretta nella posizione errata.\n  - ⬛ (Grigio): Questa lettera non fa parte del nome dell'artista.\n• Ricorda che i nomi degli artisti possono includere spazi e caratteri speciali, che spesso sono fissi sul tabellone per aiutarti."
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Collega 4 parole da un hook lirico.",
      rulesShort: "Collega 16 parole in quattro gruppi di quattro. Ogni gruppo appartiene al ritornello di una diversa canzone dell'Eurovision. 6 errori permessi.",
      rulesLong: "EuroRefrain mette alla prova la tua memoria per i testi più iconici della storia dell'Eurovision. Ti viene presentata una griglia di 16 parole tratte da quattro diversi ritornelli di canzoni.\n\nCome giocare:\n• Il tuo compito è raggruppare queste 16 parole in quattro set da quattro, dove ogni set appartiene al ritornello di una singola canzone.\n• Seleziona quattro parole che pensi vadano insieme e premi 'Invia'.\n• Se corretto, le parole verranno rimosse dal tabellone e verrà svelato il titolo della canzone.\n• Se errato, conta come un errore. Ti sono consentiti fino a 6 errori prima che il gioco finisca.\n• Le parole sono scelte con cura per essere impegnative, spesso con parole comuni che potrebbero appartenere a più canzoni."
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Raggruppa 4 elementi dell'Eurovision.",
      rulesShort: "Raggruppa 16 elementi dell'Eurovision in quattro categorie de quattro basate su una connessione comune. 6 errori permessi.",
      rulesLong: "EuroLinks è un gioco di logica e curiosità sull'Eurovision. Devi trovare i collegamenti nascosti tra 16 diversi elementi relativi al concorso.\n\nCome giocare:\n• La griglia contiene 16 elementi che possono essere raggruppati in quattro categorie di quattro elementi ciascuna.\n• Le categorie possono variare da 'Vincitori degli anni '90' a 'Paesi che non hanno mai vinto' o 'Artistas che hanno gareggiato più volte'.\n• Seleziona quattro elementi e premi 'Invia' per verificare se condividono una categoria.\n• Hai 6 errori consentiti per risolvere l'intero puzzle.\n• Ogni categoria ha un livello di difficoltà, che va dal semplice alle curiosità di livello esperto!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Identifica l'entry tramite indizi ESC.",
      rulesShort: "Identifica la partecipazione misteriosa dell'Eurovision in 6 tentativi. Ogni risposta errata rivela un nuovo indizio più specifico.",
      rulesLong: "EuroGuess è un gioco in stile investigativo in cui identifichi un brano misterioso dell'Eurovision utilizzando una serie di indizi. La sfida è indovinare il brano con il minor numero di indizi possibile.\n\nCome giocare:\n• Inizi con un indizio iniziale (solitamente l'anno).\n• Se il tuo tentativo è errato, viene svelato un nuovo indizio più specific (Paese, Genere, Posizione, etc.).\n• Hai un totale di 6 tentativi per identificare il brano corretto.\n• Usa la barra di ricerca per trovare e selezionare il tuo tentativo dal nostro database completo di brani dell'Eurovision.\n• Il punteggio si basa su quanti indizi hai avuto bisogno: indovinare presto ti fa guadagnare il massimo dei punti!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Indovina tramite le statistiche del festival.",
      rulesShort: "Trova la partecipazione target dell'Eurovision in 7 tentativi. I marcatori indicano:\n🟩 Corrispondenza corretta\n🟨 Corrispondenza vicina\n⬛ Nessuna corrispondenza\nUsa le frecce (⬆️⬇️) per Anno e Posizione.",
      rulesLong: "EuroArena è un gioco di indovinelli basato sui dati in cui utilizzi statistiche comparative per trovare un brano nascosto dell'Eurovision. È un test della tua conoscenza dei risultati del concorso e degli attributi degli artisti.\n\nCome giocare:\n• Inserisci un tentativo per vedere come i suoi attributi si confrontano con il brano di destinazione.\n• Gli attributi includono Anno, Posizione, Paese, Genere e Taglia/Sesso dell'artista.\n• I marcatori di feedback guideranno la tua prossima mossa:\n  - 🟩 (Verde): Una corrispondenza perfetta per quell'attributo.\n  - 🟨 (Giallo): Una corrispondenza vicina (ad esempio, l'anno è entro 3 anni, o il paese è nella stessa regione).\n  - ⬛ (Grigio): Nessuna corrispondenza per questo attributo.\n• Le frecce accanto ad Anno e Posizione ti diranno se il valore di destinazione è superiore o inferiore al tuo tentativo.\n• Hai 7 tentativi per trovare il brano corretto."
    }
  },
  wordGame: {
    enter: "Invio",
    board: "Tabellone",
    keyboard: "Tastiera virtuale",
    notEnoughLetters: "Non ci sono abbastanza lettere"
  },
  links: {
    mistakesRemaining: "Errori rimasti",
    oneAway: "Manca solo uno...",
    betterLuck: "Più fortuna domani!",
    notALink: "Nessun collegamento",
    shuffle: "Mescola",
    deselectAll: "Deseleziona tutto",
    categoriesDiscovered: "Categorie Scoperte",
    lyricsDiscovered: "Ritornelli Scoperti"
  },
  guesser: {
    searchPlaceholder: "Cerca entry dell'Eurovision...",
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
    analyze: "Analizza il campo dell'Eurovision",
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
    totalRecord: "Record dell'Eurovision",
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
    nextGame: "Prossimo gioco tra",
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
    privacySettings: "Privacy",
    lastUpdated: "Ultimo aggiornamento"
  },
  privacy: {
    lastUpdated: "Febbraio 2026",
    introduction: {
      title: "Introduzione",
      p1: "Benvenuti su Douze Points (www.douzepoints.net).",
      p2: "Questo sito web è gestito da Justus Hellman, con sede in Svezia (il \"Titolare del trattamento\").",
      p3: "In caso di domande sulla presente Informativa sulla privacy o sui propri dati personali, è possibile contattare: douzepointsgame@gmail.com"
    },
    dataCollection: {
      title: "Quali dati raccogliamo",
      autoTitle: "a) Dati raccolti automaticamente",
      autoDesc: "Quando visiti il sito web, alcune informazioni possono essere raccolte automaticamente, tra cui:",
      autoItems: ["Indirizzo IP", "Tipo e versione del browser", "Informazioni sul dispositivo", "Sistema operativo", "Pagine visitate", "Data e ora di accesso", "Sito web di provenienza"],
      autoFootnote: "Queste informazioni possono essere elaborate dai nostri fornitori di pubblicità e analisi.",
      cookiesTitle: "b) Cookie e tecnologie simili",
      cookiesDesc1: "Utilizziamo i cookie e tecnologie simili per la pubblicità, la misurazione delle prestazioni degli annunci e la funzionalità del sito web.",
      cookiesDesc2: "Il consenso per i cookie viene raccolto e gestito tramite Google Funding Choices, che fornisce la nostra piattaforma di gestione del consenso (CMP). Agli utenti nelle regioni applicabili (come l'UE/SEE e il Regno Unito) viene chiesto di fornire il consenso prima dell'utilizzo di cookie non essenziali.",
      cookiesDesc3: "È possibile modificare le proprie preferenze di consenso in qualsiasi momento tramite le opzioni di consenso disponibili sul sito web."
    },
    advertising: {
      title: "Pubblicità",
      p1: "Utilizziamo Google AdSense per visualizzare annunci pubblicitari. I fornitori di terze parti, tra cui Google, utilizzano i cookie per pubblicare annunci in base alle precedenti visite di un utente al nostro sito Web o ad altri siti Web. L'uso dei cookie pubblicitari da parte di Google consente a lui e ai suoi partner di pubblicare annunci per i nostri utenti in base alla loro visita al nostro sito e/o ad altri siti su Internet.",
      p2: "È possibile gestire le proprie preferenze pubblicitarie tramite: adssettings.google.com",
      p3: "Ulteriori informazioni su come Google elabora i dati personali sono disponibili nell'Informativa sulla privacy di Google."
    },
    legalBasis: {
      title: "Base giuridica (GDPR)",
      p1: "Se ti trovi nell'UE/SEE, trattiamo i dati personali sulle seguenti basi giuridiche:",
      consentLabel: "Consenso",
      consent: "per la pubblicità personalizzata e i cookie non essenziali.",
      legitimacyLabel: "Legittimità",
      legitimacy: "per la funzionalità di base del sito web, la sicurezza e la prevenzione delle frodi.",
      legalLabel: "Legale",
      legal: "ove richiesto dalla legge applicabile."
    },
    localStorage: {
      title: "Memoria locale",
      p1: "Utilizziamo la memoria locale del tuo browser per salvare i progressi di gioco, i punteggi e le statistiche. Queste informazioni:",
      items: ["Sono memorizzate solo sul tuo dispositivo", "Non vengono trasmesse ai nostri server", "Possono essere eliminate cancellando i dati del browser"]
    },
    dataSharing: {
      title: "Condivisione dei dati",
      p1: "Non vendiamo dati personali. Tuttavia, i dati possono essere elaborati da fornitori di servizi terzi, tra cui:",
      items: ["Google (pubblicità e gestione del consenso)", "Fornitori di hosting", "Fornitori di servizi tecnici necessari per il funzionamento del sito web"]
    },
    internationalTransfers: {
      title: "Trasferimenti internazionali",
      p1: "Alcuni fornitori terzi, tra cui Google, possono elaborare i dati al di fuori dell'UE o del SEE. Laddove si verifichino tali trasferimenti, vengono utilizzate garanzie adeguate come le Clausole contrattuali standard."
    },
    dataRetention: {
      title: "Conservazione dei dati",
      p1: "Non manteniamo un database di utenti. I dati pubblicitari vengono conservati in conformità con le politiche di Google, i log tecnici per scopi di sicurezza e la memoria locale rimane fino a quando non viene eliminata."
    },
    yourRights: {
      title: "I tuoi diritti (UE/SEE)",
      p1: "Se ti trovi nell'UE/SEE, hai il diritto di accedere, correggere o eliminare i tuoi dati e di limitare o opporsi al trattamento. In Svezia, l'autorità di controllo è Integritetsskyddsmyndigheten.",
      p2: "Contattaci all'indirizzo douzepointsgame@gmail.com per esercitare i tuoi diritti."
    },
    dataSecurity: {
      title: "Sicurezza dei dati",
      p1: "Adottiamo ragionevoli misure tecniche e organizzative per proteggere i dati personali. Tuttavia, nessun metodo di trasmissione su Internet è completamente sicuro."
    },
    thirdPartyLinks: {
      title: "Link a siti web di terzi",
      p1: "Questo sito web può contenere link a siti web di terzi, tra cui YouTube. Non siamo responsabili per le pratiche sulla privacy o per il contenuto dei siti web esterni."
    },
    changes: {
      title: "Modifiche alla presente Informativa",
      p1: "Potremmo aggiornare la presente Informativa sulla privacy di tanto in tanto. Eventuali aggiornamenti saranno pubblicati su questa pagina con una data di \"Ultimo aggiornamento\" revisionata."
    }
  },
  about: {
    title: "About Douze Points",
    mission: {
      title: "Our Mission",
      p1: "Douze Points was born out of a deep love for the Eurovision Song Contest. My mission is to provide a year-round hub for fans to engage with the contest's rich history through fun, challenging, and interactive daily games. I believe that the spirit of Eurovision—unity through music—should be celebrated every day, not just during the contest week in May.",
      p2: "I believe Eurovision is more than just a music competition—it's a celebration of diversity, culture, and unity. My games are designed to honor that spirit while testing the knowledge of even the most dedicated superfans. From the orchestral ballads of the 1950s to the high-energy pop and rock of the modern era, I cover it all."
    },
    story: {
      title: "The Story",
      p1: "Created by a fan for the fans, Douze Points started as a small project to keep the Eurovision magic alive between contests. Today, it features six unique daily games that cover everything from 1956 to the present day.",
      p2: "Whether you're a 'First-Time Voter' or a 'Eurovision Legend', there's always something new to discover about the world's favorite song contest."
    },
    history: {
      title: "Eurovision History",
      p1: "The Eurovision Song Contest is one of the longest-running and most-watched non-sporting events in the world.",
      p2: "Over the years, the contest has launched the careers of global icons and provided a stage for diverse musical expressions. At Douze Points, I aim to preserve and celebrate this incredible legacy."
    },
    games: {
      title: "The Games",
      p1: "Our daily challenges are inspired by popular word and logic puzzles, adapted specifically for the ESC community:"
    },
    community: {
      title: "Community First",
      p1: "I am not affiliated with the EBU or any official broadcaster. I am simply a fan who wants to share my passion for Eurovision with the world."
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
    "First-Time Voter": "Primo Votante",
    "Greenroom Guest": "Ospite della Greenroom",
    "Backing Vocalist": "Corista",
    "Jury Member": "Membro della Giuria",
    "National Finalist": "Finalista Nazionale",
    "Televote Favorite": "Favorito del Televoto",
    "National Representative": "Rappresentante Nazionale",
    "Semi-Final Qualifier": "Qualificato in Semifinale",
    "Press Center Darling": "Beniamino della Stampa",
    "Grand Finalist": "Finalista della Grand Final",
    "Fan Favorite": "Favorito dei Fan",
    "Top 10 Contender": "Contendente Top 10",
    "Dark Horse": "Outsider",
    "Podium Finish": "Piazzamento sul Podio",
    "Chart Topper": "In Cima alle Classifiche",
    "Silver Medalist": "Medaglia d'Argento",
    "Winner": "Winner",
    "Double Winner": "Doppio Vincitore",
    "Multi-Winner": "Vincitore Multiplo",
    "Hall of Famer": "Hall of Famer",
    "Iconic Entry": "Entry Iconica",
    "Eurovision Legend": "Leggenda dell'Eurovision"
  },
  metadata: {
    countries: {
      "Switzerland": "Svizzera", "Sweden": "Svezia", "Finland": "Finlandia", "The Netherlands": "Paesi Bassi",
      "Italy": "Italia", "Croatia": "Croazia", "United Kingdom": "Regno Unito", "Ukraine": "Ucraina",
      "France": "Francia",
      "Israel": "Israele", "Portugal": "Portogallo", "Denmark": "Danimarca", "Norway": "Norvegia", "Spain": "Spagna",
      "Austria": "Austria", "Cyprus": "Cipro", "Iceland": "Islanda", "Germany": "Germania", "Azerbaijan": "Azerbaigian",
      "Serbia": "Serbia", "Australia": "Australia", "Greece": "Grecia", "Moldova": "Moldavia", "Belgium": "Belgio",
      "Poland": "Polonia", "Slovenia": "Slovenia", "Ireland": "Irlanda", "Luxembourg": "Lussemburgo", "Albania": "Albania",
      "Bulgaria": "Bulgaria", "Estonia": "Estonia", "Russia": "Russia", "Turkey": "Turchia", "Bosnia & Herzegovina": "Bosnia ed Erzegovina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Lettonia", "Hungary": "Ungheria", "San Marino": "San Marino",
      "Lithuania": "Lituania", "Montenegro": "Montenegro", "North Macedonia": "Macedonia del Nord", "Czechia": "Cechia",
      "Romania": "Romania", "Slovakia": "Slovacchia", "Georgia": "Georgia", "Armenia": "Armenia",
      "Andorra": "Andorra", "Morocco": "Marocco", "Belarus": "Bielorussia"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Opera", "Drum and Bass / Opera": "Drum and Bass / Opera",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballad": "Ballata", "Rock": "Rock", "Industrial Rock": "Rock Industriale", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Pop Comique", "Latin Pop": "Pop Latino",
      "R&B": "R&B", "Orchestral Pop": "Pop Orchestrale", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Indie Pop", "Ethno-Pop": "Ethno-Pop", "Soul": "Soul", "Other": "Altro", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternative", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Ballata Pop", "Electronic": "Elettronica", "Industrial Techno": "Techno Industriale",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Neoclassica", "Folk Ballad": "Ballata Folk", "Pop Rock": "Pop Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Folk Celtico", "Balkan Ballad": "Ballata Balcanica", "Disco": "Disco",
      "Operatic Pop": "Pop Operistico", "Indie Rock": "Indie Rock", "Avant-Garde": "Avant-Garde", "Country": "Country"
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