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
    songs: "canzoni",
    steps: "passaggi",
    mistakesLeft: "Errori rimasti",
    howToPlay: "Come giocare",
    close: "Chiudi",
    selectLanguage: "Seleziona Lingua",
    languages: "Lingue",
    qualified: "Qualificato",
    semiFinal: "Semifinale",
    joinCommunity: "Unisciti alla community"
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
    lastUpdated: "Marzo 2026",
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
      cookiesDesc3: "Utilizziamo Google Analytics per aiutarci a capire come gli utenti interagiscono con il nostro sito web. Questo ci aiuta a migliorare l'esperienza dell'utente e a capire quali funzionalità sono più popolari."
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
    },
    googleAnalytics: {
      title: "Google Analytics",
      p1: "Utilizziamo Google Analytics per raccogliere informazioni su come gli utenti interagiscono con il nostro sito web. Questo ci aiuta a migliorare l'esperienza dell'utente e a capire quali funzionalità sono più popolari.",
      p2: "Google Analytics utilizza cookie e tecnologie simili per raccogliere dati come l'indirizzo IP, il tipo di browser, le informazioni sul dispositivo e le pagine visitate. Questi dati vengono elaborati da Google in conformità con la loro politica sulla privacy.",
      p3: "Puoi disattivare Google Analytics utilizzando il Componente aggiuntivo del browser per la disattivazione di Google Analytics o regolando le impostazioni del tuo browser."
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
    },
    data: {
      title: "Dati e Crediti",
      p1: "Un enorme ringraziamento al progetto TidyTuesday e ai suoi collaboratori per aver fornito il set di dati fondamentale che ha reso possibile Douze Points. La loro dedizione agli open data ci ha permesso di ricostruire la ricca storia del concorso per questi giochi!"
    }
  },
  contact: {
    title: "Contattaci",
    methods: {
      title: "Mettiti in contatto",
      p1: "Hai una domanda, un feedback o hai trovato un bug? Mi piacerebbe sentirti! Puoi contattarmi via email o trovarmi nella comunità dell'Eurovision."
    },
    faq: {
      title: "Domande Frequenti",
      q1: "Quando si resettano i giochi?",
      a1: "Le sfide quotidiane si resettano ogni giorno a mezzanotte (UTC).",
      q2: "Come viene calcolato il mio grado?",
      a2: "Il tuo grado si basa sui punti totali della carriera accumulati in tutti i giochi. Più giochi e meglio ti comporti, più in alto salirai!",
      q3: "Posso suggerire una canzone o un artista?",
      a3: "Assolutamente! Cerco sempre di migliorare il nostro database. Inviami un'e-mail con i tuoi suggerimenti.",
      q4: "Douze Points è gratuito?",
      a4: "Sì, Douze Points è completamente gratuito per tutti.",
      q5: "Come condivido i miei risultati?",
      a5: "Dopo aver completato un gioco, vedrai un pulsante 'Condividi'."
    },
    feedback: {
      title: "Feedback",
      p1: "Il tuo feedback mi aiuta a rendere Douze Points migliore per tutti. Non esitare a condividere i tuoi pensieri su come posso migliorare l'esperienza."
    }
  },
  terms: {
    lastUpdated: "Marzo 2026",
    title: "Termini di Servizio",
    acceptance: {
      title: "Accettazione dei Termini",
      p1: "Accedendo o utilizzando Douze Points (www.douzepoints.net), accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare il sito web."
    },
    description: {
      title: "Descrizione del Servizio",
      p1: "Douze Points è un sito web creato dai fan che fornisce giochi e curiosità a tema Eurovision a scopo di intrattenimento. Il servizio è fornito 'così com'è' e può essere modificato o interrotto in qualsiasi momento."
    },
    ip: {
      title: "Proprietà Intellettuale",
      p1: "L'Eurovision Song Contest e i relativi marchi sono di proprietà dell'Unione Europea di Radiodiffusione (EBU). Questo sito web non è affiliato, approvato o sponsorizzato dall'EBU.",
      p2: "Tutti i contenuti originali, il codice e il design di questo sito web sono di proprietà del proprietario del sito web. Non è consentito riprodurre o distribuire alcuna parte di questo sito web senza autorizzazione."
    },
    conduct: {
      title: "Condotta dell'Utente",
      p1: "Accetti di utilizzare il sito web solo per scopi leciti e in modo da non violare i diritti altrui. I comportamenti vietati includono:",
      items: [
        "Tentare di interferire con il funzionamento del sito web",
        "Utilizzare script automatizzati per raccogliere dati o giocare",
        "Impersonare altri o fornire informazioni false",
        "Intraprendere qualsiasi attività che possa danneggiare la reputazione del sito web"
      ]
    },
    disclaimer: {
      title: "Esclusione di Garanzie",
      p1: "Il sito web è fornito 'così com'è' e 'come disponibile'. Non forniamo alcuna garanzia, espressa o implicita, riguardo all'accuratezza, all'affidabilità o alla disponibilità del servizio."
    },
    limitation: {
      title: "Limitazione di Responsabilità",
      p1: "Nella misura massima consentita dalla legge, il proprietario del sito web non sarà responsabile per eventuali danni diretti, indiretti, incidentali o consequenziali derivanti dall'uso del sito web."
    },
    governingLaw: {
      title: "Legge Applicabile",
      p1: "Questi Termini di Servizio saranno regolati e interpretati in conformità con le leggi della Svezia."
    },
    changes: {
      title: "Modifiche ai Termini",
      p1: "Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento. Qualsiasi modifica sarà pubblicata su questa pagina con una data di 'Ultimo aggiornamento' revisionata."
    },
    contact: {
      title: "Contatti",
      p1: "In caso di domande su questi Termini di Servizio, è possibile contattarci all'indirizzo: douzepointsgame@gmail.com"
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
  },
  infinite: {
    title: "Encore",
    description: "Lo spettacolo quotidiano è finito, ma la festa non si ferma mai! Torna sul palco e metti alla prova la tua resistenza nei nostri giochi infiniti. Quanto a lungo riesci a far suonare la musica prima di sbagliare nota?",
    difficulty: "Seleziona Difficoltà",
    difficulties: {
      top10: "Top 10 (2000-Presente)",
      modern: "2000-Presente",
      all: "Tutta la Storia (1956-Presente)"
    },
    currentRun: "Serie Attuale",
    bestRun: "Miglior Serie",
    best: "Max",
    songsFinished: "Canzoni Completate",
    currentScore: "Punteggio Attuale",
    bestScore: "Miglior Punteggio",
    score: "Punteggio",
    nextSong: "Prossima Canzone",
    gameOver: "Fine Giochi",
    tryAgain: "Riprova",
    congratulations: "Congratulazioni!",
    allSongsFinished: "Hai completato con successo tutte le voci di questa categoria! Sei una vera Leggenda dell'Eurovision.",
    streak: "Serie",
    bestStreak: "Miglior Serie",
    continueRun: "Continua Serie",
    exitToEncore: "Esci verso l'Encore",
    playAgain: "Gioca Ancora",
    continue: "Continua",
    newBest: "Nuovo Record!",
    infiniteMode: "Modalità Infinita",
    placement: "Posizionamento",
    era: "Era",
    placements: {
      all: "Tutti i posizionamenti",
      winners: "Solo vincitori",
      top3: "Top 3",
      top5: "Top 5",
      top10: "Top 10",
      top15: "Top 15",
      finalists: "Finalisti"
    },
    years: {
      all: "Tutta la storia",
      "2021": "2021-Presente",
      "2010": "2010-Presente",
      "2000": "2000-Presente",
      "1956": "1956-1999"
    }
  }
};