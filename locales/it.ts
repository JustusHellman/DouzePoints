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
    qualified: "Qualificato",
    playBonusRound: "Gioca il round bonus"
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
    howToPlayP2: "Man mano che accumuli punti in tutti i giochi, scalerai i ranghi globali dei fan, evolvendo da 'Primo Votante' a una vera 'Leggenda dell'Eurovision'. Puoi monitorare i tuoi progressi quotidiani, i traguardi della tua carriera e il tuo rango attuale facendo clic sul pulsante 'Stats' nell'intestazione in qualsiasi momento. Buona fortuna e che vinca il miglior fan!"
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
    saveImage: "Salva scheda",
    copyImage: "Copia scheda",
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
  privacy: {
    title: "Informativa sulla Privacy",
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
      autoFootnote: "Queste informazioni possono essere elaborate dai nostri fornitori di analisi.",
      cookiesTitle: "b) Memoria locale",
      cookiesDesc1: "Utilizziamo la memoria locale del tuo browser esclusivamente per salvare i tuoi progressi di gioco, i punteggi e le statistiche.",
      cookiesDesc2: "Questi dati sono memorizzati solo sul tuo dispositivo, non vengono trasmessi ai nostri server e possono essere eliminati cancellando i dati del browser.",
      cookiesDesc3: "Non utilizziamo cookie di tracciamento o cookie pubblicitari di terze parti."
    },
    legalBasis: {
      title: "Base giuridica (GDPR)",
      p1: "Se ti trovi nell'UE/SEE, trattiamo i dati personali sulle seguenti basi giuridiche:",
      consentLabel: "Consenso",
      consent: "per i cookie non essenziali (se presenti).",
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
      items: ["Fornitori di hosting", "Fornitori di servizi tecnici necessari per il funzionamento del sito web"]
    },
    internationalTransfers: {
      title: "Trasferimenti internazionali",
      p1: "Alcuni fornitori terzi possono elaborare i dati al di fuori dell'UE o del SEE. Laddove si verifichino tali trasferimenti, vengono utilizzate garanzie adeguate come le Clausole contrattuali standard."
    },
    dataRetention: {
      title: "Conservazione dei dati",
      p1: "Non manteniamo un database di utenti. I log tecnici per scopi di sicurezza vengono conservati in conformità con le politiche dei nostri fornitori e la memoria locale rimane fino a quando non viene eliminata."
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
    },
    about: {
      title: "Informazioni su Douze Points",
      p1: "Douze Points è un progetto appassionato creato per la comunità dell'Eurovision Song Contest. Il nostro obiettivo è fornire un'esperienza interattiva quotidiana divertente per i fan per testare le loro conoscenze e celebrare la ricca storia del concorso.",
      p2: "Il gioco è completamente gratuito ed è mantenuto come tributo alla più grande competizione musicale del mondo."
    },
    stats: {
      title: "Statistiche e analisi del gioco",
      p1: "Per aiutarci a capire come si comporta la comunità e per migliorare l'equilibrio del gioco, Douze Points raccoglie statistiche di gioco anonime.",
      p2: "Quando completi un gioco, registriamo il tipo di gioco, il punteggio ottenuto e la data. Queste informazioni sono aggregate e non contengono informazioni di identificazione personale (come il nome, l'indirizzo IP o l'e-mail).",
      p3: "Utilizziamo Google Firebase (a servizio fornito da Google) per memorizzare ed elaborare queste statistiche aggregate. Questi dati vengono utilizzati esclusivamente allo scopo di analizzare la popolarità del gioco e i livelli di difficoltà."
    }
  },
  about: {
    title: "Informazioni su Douze Points",
    subtitle: "Celebrando l'Eurovision Song Contest",
    mission: {
      title: "La nostra missione",
      p1: "Douze Points è nato da un profondo amore per l'Eurovision Song Contest. La mia missione è fornire un centro aperto tutto l'anno affinché i fan possano interagire con la ricca storia del concorso attraverso giochi quotidiani divertenti, stimolanti e interattivi. Credo che lo spirito dell'Eurovision — l'unità attraverso la musica — debba essere celebrato ogni giorno, non solo durante la settimana del concorso a maggio.",
      p2: "Credo che l'Eurovision sia più di una semplice competizione musicale: è una celebrazione della diversità, della cultura e dell'unità. I miei giochi sono progettati per onorare quello spirito mettendo alla prova la conoscenza anche dei superfan più accaniti. Dalle ballate orchestrali degli anni '50 al pop e al rock energici dell'era moderna, copro tutto."
    },
    story: {
      title: "La storia",
      p1: "Creato da un fan per i fan, Douze Points è iniziato come un piccolo progetto per mantenere viva la magia dell'Eurovision tra un concorso e l'altro. Oggi offre sei giochi quotidiani unici che coprono tutto, dal 1956 ai giorni nostri.",
      p2: "Che tu sia un 'Elettore per la prima volta' o una 'Leggenda dell'Eurovision', c'è sempre qualcosa di nuovo da scoprire sul concorso canoro preferito al mondo."
    },
    history: {
      title: "Storia dell'Eurovision",
      p1: "L'Eurovision Song Contest è uno degli eventi non sportivi più longevi e seguiti al mondo.",
      p2: "Nel corso degli anni, il concorso ha lanciato le carriere di icone globali e ha offerto un palcoscenico per diverse espressioni musicali. Con Douze Points, miro a preservare e celebrare questa incredibile eredità."
    },
    games: {
      title: "I giochi",
      p1: "Le nostre sfide quotidiane si ispirano ai popolari puzzle di parole e logica, adattati specificamente per la comunità ESC:",
      gameList: [
        { name: "EuroSong", desc: "Un gioco di indovinelli sui titoli delle canzoni in stile Wordle." },
        { name: "EuroArtist", desc: "Identifica l'artista in 6 tentativi." },
        { name: "EuroRefrain", desc: "Collega i testi ai loro ritornelli iconici." },
        { name: "EuroLinks", desc: "Trova le connessioni nascoste tra gli elementi dell'ESC." },
        { name: "EuroGuess", desc: "Il quiz definitivo sulle voci misteriose." },
        { name: "EuroArena", desc: "Una battaglia di statistiche dell'Eurovision basata sui dati." }
      ]
    },
    community: {
      title: "La comunità prima di tutto",
      p1: "Non sono affiliato all'EBU né a alcun emittente ufficiale. Sono semplicemente un fan che vuole condividere la mia passione per l'Eurovision con il mondo."
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
      "Andorra": "Andorra", "Morocco": "Marocco", "Belarus": "Bielorussia",
      "Yugoslavia": "Jugoslavia", "Serbia & Montenegro": "Serbia e Montenegro",
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
      "Male": "Maschio", "Female": "Femmina", "Mixed": "Misto", "Other": "Altro"
    },
    sizes: {
      solo: "Solista",
      duo: "Duo"
    }
  },
  support: {
    title: "Ti piace Douze Points?",
    completed: "Hai completato le sfide di oggi!",
    button: "Offrimi un caffè"
  }
};