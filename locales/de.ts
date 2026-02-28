import { TranslationSchema } from './types.ts';

export const de: TranslationSchema = {
  common: {
    back: "Zurück",
    play: "Spielen",
    submit: "Absenden",
    loading: "Laden...",
    share: "Karte teilen",
    shareDaily: "Tagespunktzahl teilen",
    shareCareer: "Statistiken teilen",
    shareHallOfFame: "Hall of Fame teilen",
    copied: "In die Zwischenablage kopiert!",
    returnToGreenroom: "Zurück zum Greenroom",
    perfect: "Perfekt",
    finished: "Beendet",
    douzePoints: "DOUZE POINTS!",
    nulPoints: "NULL PUNKTE",
    points: "Punkte",
    pointsShort: "Pkt",
    attempts: "Versuche",
    steps: "Schritte",
    mistakesLeft: "Fehler verbleibend",
    howToPlay: "Spielanleitung",
    close: "Schließen",
    selectLanguage: "Sprache Wählen",
    languages: "Sprachen",
    qualified: "Qualifiziert"
  },
  greenroom: {
    greenroom: "Der Greenroom",
    description: "Entspanne dich und bereite dich auf den Auftritt vor. Teste dein Wissen über den Eurovision Song Contest mit sechs täglichen Herausforderungen für den ultimativen Superfan.",
    dailyProgress: "Tagesfortschritt",
    qualified: "✨ Qualifiziert für das Finale ✨",
    finishedToday: "Heute abgeschlossen",
    statsButton: "Stats",
    careerStats: "Statistiken",
    todayScore: "Heutiger Punktestand",
    howToPlayTitle: "Spielanleitung für Douze Points",
    howToPlayP1: "Douze Points ist deine tägliche Anlaufstelle für Eurovision-Herausforderungen. Jeden Tag werden sechs einzigartige Spiele veröffentlicht, um dein Wissen über die Geschichte des Wettbewerbs, die Künstler und die Songtexte zu testen. Dein Ziel ist es, jede Herausforderung mit so wenigen Fehlern wie möglich abzuschließen, um die maximale Punktzahl von 12 Punkten zu erreichen – die legendären 'Douze Points'!",
    howToPlayP2: "Während du in allen Spielen Punkte sammelst, steigst du in den globalen Fandom-Rängen auf, vom 'Erst-Wähler' bis hin zur echten 'Eurovision-Legende'. Du kannst deinen täglichen Fortschritt, deine Karriere-Meilensteine und deinen aktuellen Rang jederzeit verfolgen, indem du auf die Schaltfläche 'Stats' im Header klickst. Viel Glück, und möge der beste Fan gewinnen!",
    historyTitle: "Das Erbe von Eurovision",
    historyP1: "Der Eurovision Song Contest begann 1956 als technisches Experiment für simultane, transnationale Live-Übertragungen. Seitdem hat er sich zu einer der meistgesehenen Nicht-Sportveranstaltungen der Welt entwickelt und erreicht hunderte Millionen Zuschauer rund um den Globus. Er ist eine einzigartige Feier der Musik, Vielfalt und internationalen Zusammenarbeit.",
    historyP2: "Von den frühen Tagen orchestraler Balladen bis zur modernen Ära von energiegeladenem Pop, Rock und experimentellen Performances war Eurovision schon immer ein Spiegel der europäischen Kultur und Identität. Er hat die Karrieren globaler Ikonen wie ABBA und Celine Dion gestartet und ist jedes Jahr aufs Neue eine Plattform für künstlerische Innovation und kulturellen Austausch.",
    historyP3: "Bei Douze Points feiern wir diese reiche Geschichte durch unsere täglichen Herausforderungen. Egal, ob Sie ein Gelegenheitszuschauer oder ein eingefleischter Superfan sind, der jeden Beitrag seit Lugano kennt – unsere Spiele sind darauf ausgelegt, Ihr Wissen und Ihre Leidenschaft für den Wettbewerb zu testen. Kommen Sie jeden Tag vorbei, um Ihre Expertise zu beweisen, neue Lieblingssongs zu entdecken und in den Rängen der Eurovision-Fangemeinde aufzusteigen.",
    historyP4: "Während sich der Wettbewerb mit neuen Technologien und musikalischen Trends ständig weiterentwickelt, bleibt seine Kernmission dieselbe: Menschen durch die Kraft der Musik zusammenzubringen. Von der Einführung des Televotings bis zu den spektakulären Bühnendesigns des 21. Jahrhunderts hat Eurovision immer die Grenzen dessen verschoben, was in der Live-Unterhaltung möglich ist. Wir sind stolz darauf, Teil dieser lebendigen Gemeinschaft zu sein und einen Raum zu bieten, in dem Fans auf unterhaltsame und interaktive Weise mit dem Erbe des Wettbewerbs interagieren können.",
    historyP5: "Über den Wettbewerb hinaus hat Eurovision eine riesige globale Fangemeinde gefördert, die eine tiefe Wertschätzung für die vielfältigen Musikstile und kulturellen Ausdrucksformen auf der Bühne teilt. Diese Gemeinschaft ist das Herz des Wettbewerbs, und bei Douze Points möchten wir eine Plattform bieten, die diesen Geist ehrt. Unsere Mission ist es, die Eurovision-Magie das ganze Jahr über am Leben zu erhalten und einen Raum zu bieten, in dem Fans ihr Wissen testen, ihre Lieblingseinträge feiern und sich mit der Geschichte des beliebtesten Songcontests der Welt verbinden können."
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Tägliche Eurovision Titel-Herausforderung.",
      rulesShort: "Identifiziere den versteckten Eurovision-Songtitel in 6 Versuchen. Die Kacheln ändern ihre Farbe: Grün für die richtige Stelle, Gelb für die falsche Stelle und Grau, wenn der Buchstabe nicht im Titel enthalten ist.",
      rulesLong: "EuroSong ist ein Worträtselspiel, das dem riesigen Katalog der Eurovision-Songtitel gewidmet ist. Ihr Ziel ist es, einen bestimmten Songtitel aus der Geschichte des Wettbewerbs innerhalb von sechs Versuchen zu identifizieren.\n\nSpielanleitung:\n• Geben Sie eine beliebige Buchstabenkombination ein, um einen Tipp abzugeben.\n• Nach jedem Tipp ändert sich die Farbe der Kacheln, um Feedback zu geben:\n  - 🟩 (Grün): Der Buchstabe ist im Titel und an der richtigen Stelle.\n  - 🟨 (Gelb): Der Buchstabe ist im Titel, aber an der falschen Stelle.\n  - ⬛ (Grau): Der Buchstabe ist überhaupt nicht im Titel enthalten.\n• Nutzen Sie das Feedback jedes Tipps, um die Möglichkeiten einzugrenzen.\n• Das Spiel bietet Titel aus allen Epochen der Eurovision, von den 1950er Jahren bis heute."
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Tägliche ESC Künstler-Herausforderung.",
      rulesShort: "Errate den Namen des Eurovision-Künstlers oder der Gruppe in 6 Versuchen. Nutze das farbcodierte Feedback, um die richtigen Buchstaben und ihre Positionen zu finden.",
      rulesLong: "EuroArtist fordert Sie heraus, die berühmten Interpreten und Gruppen zu identifizieren, die die Eurovision-Bühne beehrt haben. Von legendären Gewinnern bis hin zu Kult-Favoriten – können Sie den täglichen Künstler in sechs Versuchen erraten?\n\nSpielanleitung:\n• Geben Sie den Namen eines Künstlers oder einer Gruppe als Tipp ein.\n• Die Kacheln ändern ihre Farbe, je nachdem, wie nah Ihr Tipp am Zielnamen liegt:\n  - 🟩 (Grün): Richtiger Buchstabe an der richtigen Position.\n  - 🟨 (Gelb): Richtiger Buchstabe an der falschen Position.\n  - ⬛ (Grau): Dieser Buchstabe ist nicht Teil des Künstlernamens.\n• Denken Sie daran, dass Künstlernamen Leerzeichen und Sonderzeichen enthalten können, die oft auf dem Spielfeld fixiert sind, um Ihnen zu helfen."
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Verbinde 4 Wörter aus einem Lyric-Hook.",
      rulesShort: "Verbinde 16 Wörter in vier Vierergruppen, die jeweils zum Refrain eines anderen Eurovision-Songs gehören. Du hast 6 Fehler erlaubt, um das Raster zu lösen.",
      rulesLong: "EuroRefrain testet Ihr Gedächtnis für die ikonischsten Songtexte der Eurovision-Geschichte. Ihnen wird ein Raster mit 16 Wörtern präsentiert, die aus vier verschiedenen Song-Refrains stammen.\n\nSpielanleitung:\n• Ihre Aufgabe ist es, diese 16 Wörter in vier Vierergruppen zu unterteilen, wobei jede Gruppe zum Refrain eines Songs gehört.\n• Wählen Sie vier Wörter aus, von denen Sie glauben, dass sie zusammengehören, und tippen Sie auf 'Absenden'.\n• Wenn sie korrekt sind, werden die Wörter vom Spielfeld entfernt und der Songtitel wird enthüllt.\n• Wenn sie falsch sind, zählt dies als Fehler. Sie dürfen bis zu 6 Fehler machen, bevor das Spiel endet.\n• Die Wörter sind sorgfältig ausgewählt, um herausfordernd zu sein, und enthalten oft häufige Wörter, die zu mehreren Songs gehören könnten!"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Gruppiere 4 Eurovision Begriffe.",
      rulesShort: "Gruppiere 16 Eurovision-bezogene Elemente in vier Viererkategorien basierend auf einer gemeinsamen Verbindung. Sei vorsichtig – du hast nur 6 Fehler erlaubt!",
      rulesLong: "EuroLinks ist ein Spiel für Logik und Eurovision-Trivia. Sie müssen die versteckten Verbindungen zwischen 16 verschiedenen Elementen im Zusammenhang mit dem Wettbewerb finden.\n\nSpielanleitung:\n• Das Raster enthält 16 Elemente, die in vier Kategorien zu je vier Elementen gruppiert werden können.\n• Die Kategorien können von 'Gewinner aus den 90ern' bis hin zu 'Länder, die noch nie gewonnen haben' oder 'Künstler, die mehrmals teilgenommen haben' reichen.\n• Wählen Sie vier Elemente aus und tippen Sie auf 'Absenden', um zu prüfen, ob sie eine Kategorie teilen.\n• Sie haben 6 Fehler erlaubt, um das gesamte Rätsel zu lösen.\n• Jede Kategorie hat einen Schwierigkeitsgrad, der von einfach bis hin zu Experten-Trivia reicht!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Erkenne den Beitrag über ESC Hinweise.",
      rulesShort: "Identifiziere den geheimnisvollen Eurovision-Beitrag mit bis zu 6 zunehmend spezifischen Hinweisen. Je weniger Hinweise du benötigst, desto mehr Punkte erhältst du.",
      rulesLong: "EuroGuess ist ein Detektivspiel, bei dem Sie einen geheimnisvollen Eurovision-Beitrag anhand einer Reihe von Hinweisen identifizieren. Die Herausforderung besteht darin, den Beitrag mit so wenigen Hinweisen wie möglich zu erraten.\n\nSpielanleitung:\n• Sie beginnen mit einem ersten Hinweis (normalerweise dem Jahr).\n• Wenn Ihr Tipp falsch ist, wird ein neuer, spezifischerer Hinweis enthüllt (Land, Genre, Platzierung usw.).\n• Sie haben insgesamt 6 Versuche, um den richtigen Beitrag zu identifizieren.\n• Nutzen Sie die Suchleiste, um Ihren Tipp in unserer umfassenden Datenbank von Eurovision-Beiträgen zu finden und auszuwählen.\n• Die Punktzahl basiert darauf, wie viele Hinweise Sie benötigt haben – wer früh rät, erhält die maximale Punktzahl!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Errate über Statistiken des Contests.",
      rulesShort: "Finde den Ziel-Eurovision-Beitrag, indem du deine Tipps mit seinen Attributen (Jahr, Rang, Land, Genre) vergleichst. Nutze die Farbmarker und Pfeile, um deine Suche in 7 Versuchen einzugrenzen.",
      rulesLong: "EuroArena ist ein datenbasiertes Ratespiel, bei dem Sie vergleichende Statistiken verwenden, um einen versteckten Eurovision-Beitrag zu finden. Es ist ein Test für Ihr Wissen über Wettbewerbsergebnisse und Künstlerattribute.\n\nSpielanleitung:\n• Geben Sie einen Tipp ein, um zu sehen, wie seine Attribute im Vergleich zum Zielbeitrag abschneiden.\n• Zu den Attributen gehören Jahr, Rang, Land, Genre und Künstlergröße/-geschlecht.\n• Feedback-Marker leiten Ihren nächsten Schritt:\n  - 🟩 (Grün): Eine perfekte Übereinstimmung für dieses Attribut.\n  - 🟨 (Gelb): Eine knappe Übereinstimmung (z. B. liegt das Jahr innerhalb von 3 Jahren oder das Land in derselben Region).\n  - ⬛ (Grau): Keine Übereinstimmung für dieses Attribut.\n• Pfeile neben Jahr und Rang sagen Ihnen, ob der Zielwert höher oder niedriger als Ihr Tipp ist.\n• Sie haben 7 Versuche, um den richtigen Beitrag zu finden."
    }
  },
  wordGame: {
    enter: "Eingabe",
    board: "Spielfeld",
    keyboard: "Virtuelle Tastatur",
    notEnoughLetters: "Nicht genügend Buchstaben"
  },
  links: {
    mistakesRemaining: "Verbleibende Fehler",
    oneAway: "Nur noch einer...",
    betterLuck: "Viel Glück morgen!",
    notALink: "Keine Verbindung",
    shuffle: "Mischen",
    deselectAll: "Alle abwählen",
    categoriesDiscovered: "Gefundene Kategorien",
    lyricsDiscovered: "Song-Hooks Gefunden"
  },
  guesser: {
    searchPlaceholder: "Suche Eurovision Beiträge...",
    noResults: "Keine passenden Beiträge gefunden",
    hintLabels: {
      year: "Jahr",
      country: "Land",
      genre: "Genre",
      placing: "Platzierung",
      fact: "Fun Fact",
      artist: "Mitglieder"
    }
  },
  arena: {
    analyze: "Analysiere das Eurovision Feld",
    verdict: "Arena-Urteil ansehen",
    labels: {
      year: "Jahr",
      rank: "Rang",
      country: "Land",
      genre: "Genre",
      size: "Größe",
      sex: "Geschlecht"
    }
  },
  stats: {
    totalRecord: "Eurovision Rekord",
    voterBreakdown: "Wähler-Details",
    howToWin: "Wie man gewinnt",
    earnPoints: "Rang-Punkte verdienen",
    earnPointsDesc: "Sammle Punkte, um in der Rangliste aufzusteigen. Makellose Siege bringen höhere Punktzahlen.",
    claimDouze: "Douze Points erhalten 🏆",
    claimDouzeDesc: "Vergeben für perfekte Spiele (keine Fehler oder Sieg beim ersten Versuch).",
    gotIt: "Verstanden, los geht's",
    played: "Gespielt",
    wins: "Siege",
    winRate: "Erfolgsquote",
    streak: "Serie",
    scoreHistory: "Punktverlauf",
    pointsNeeded: "Pkt bis",
    toRank: "Nächster Rang"
  },
  scorecard: {
    performanceVerdict: "Auftritts-Urteil",
    dailyResult: "Tagesergebnis",
    revealedEntry: "Enthüllter Beitrag",
    origin: "Herkunft",
    year: "Jahr",
    placing: "Platzierung",
    greenroomGossip: "Greenroom-Geflüster",
    performanceLog: "Auftritts-Protokoll",
    watch: "ANSEHEN",
    reviewBoard: "Feld überprüfen",
    shareResult: "Ergebnis teilen",
    resultsCopied: "Ergebnis kopiert!",
    breakthrough: "Durchbruch bei Hinweis",
    signalLost: "Signal verloren...",
    score: "Punktzahl",
    viewScorecard: "Punktestand ansehen",
    nextGame: "Nächstes Spiel in",
    headlines: {
      nulPoints: "❌ NULL PUNKTE... 🗳️",
      douzePoints: "🏆 DOUZE POINTS! ✨",
      greatPerformance: "🌟 TOLLE PERFORMANCE! 🎤",
      qualified: "🗳️ QUALIFIZIERT! 🎤"
    }
  },
  cookies: {
    bannerText: "Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und unseren Datenverkehr zu analysieren.",
    learnMore: "Mehr erfahren",
    acceptAll: "Alle akzeptieren",
    decline: "Nur essenzielle",
    manage: "Verwalten",
    privacyPolicy: "Datenschutzerklärung",
    cookiePolicy: "Cookie-Richtlinie",
    privacySettings: "Privatsphäre",
    lastUpdated: "Zuletzt aktualisiert"
  },
  privacy: {
    lastUpdated: "Februar 2026",
    introduction: {
      title: "Einleitung",
      p1: "Willkommen bei Douze Points (www.douzepoints.net).",
      p2: "Diese Website wird von Justus Hellman mit Sitz in Schweden betrieben (der „Verantwortliche“).",
      p3: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie oder Ihren personenbezogenen Daten haben, können Sie uns kontaktieren: douzepointsgame@gmail.com"
    },
    dataCollection: {
      title: "Welche Daten wir sammeln",
      autoTitle: "a) Automatisch erhobene Daten",
      autoDesc: "Wenn Sie die Website besuchen, können bestimmte Informationen automatisch erfasst werden, darunter:",
      autoItems: ["IP-Adresse", "Browsertyp und -version", "Geräteinformationen", "Betriebssystem", "Besuchte Seiten", "Datum und Uhrzeit des Zugriffs", "Referrer-Website"],
      autoFootnote: "Diese Informationen können von unseren Werbe- und Analyseanbietern verarbeitet werden.",
      cookiesTitle: "b) Cookies und ähnliche Technologien",
      cookiesDesc1: "Wir verwenden Cookies und ähnliche Technologien für Werbung, Messung der Anzeigenleistung und Website-Funktionalität.",
      cookiesDesc2: "Die Einwilligung für Cookies wird über Google Funding Choices eingeholt und verwaltet, das unsere Consent Management Platform (CMP) bereitstellt. Nutzer in relevanten Regionen (wie EU/EWR und UK) werden um ihre Einwilligung gebeten, bevor nicht-essenzielle Cookies verwendet werden.",
      cookiesDesc3: "Sie können Ihre Einwilligungseinstellungen jederzeit über die auf der Website verfügbaren Einwilligungsoptionen ändern."
    },
    advertising: {
      title: "Werbung",
      p1: "Wir verwenden Google AdSense, um Anzeigen zu schalten. Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen basierend auf den vorherigen Besuchen eines Nutzers auf unserer Website oder anderen Websites zu schalten. Die Verwendung von Werbecookies durch Google ermöglicht es Google und seinen Partnern, unseren Nutzern Anzeigen basierend auf ihrem Besuch auf unserer Website und/oder anderen Websites im Internet zu schalten.",
      p2: "Sie können Ihre Werbeeinstellungen verwalten über: adssettings.google.com",
      p3: "Weitere Informationen darüber, wie Google personenbezogene Daten verarbeitet, finden Sie in der Datenschutzerklärung von Google."
    },
    legalBasis: {
      title: "Rechtsgrundlage (DSGVO)",
      p1: "Wenn Sie sich in der EU/im EWR befinden, verarbeiten wir personenbezogene Daten auf den folgenden Rechtsgrundlagen:",
      consentLabel: "Einwilligung",
      consent: "für personalisierte Werbung und nicht-essenzielle Cookies.",
      legitimacyLabel: "Legitimität",
      legitimacy: "für grundlegende Website-Funktionalität, Sicherheit und Betrugsprävention.",
      legalLabel: "Rechtlich",
      legal: "wo dies nach geltendem Recht erforderlich ist."
    },
    localStorage: {
      title: "Lokaler Speicher",
      p1: "Wir verwenden den lokalen Speicher Ihres Browsers, um Spielfortschritte, Spielstände und Statistiken zu speichern. Diese Informationen:",
      items: ["Werden nur auf Ihrem Gerät gespeichert", "Werden nicht an unsere Server übertragen", "Können durch Löschen Ihrer Browserdaten gelöscht werden"]
    },
    dataSharing: {
      title: "Weitergabe von Daten",
      p1: "Wir verkaufen keine personenbezogenen Daten. Daten können jedoch von Drittanbietern verarbeitet werden, darunter:",
      items: ["Google (Werbung und Einwilligungsmanagement)", "Hosting-Anbieter", "Technische Dienstleister, die für den Betrieb der Website erforderlich sind"]
    },
    internationalTransfers: {
      title: "Internationale Übermittlungen",
      p1: "Einige Drittanbieter, einschließlich Google, können Daten außerhalb der EU oder des EWR verarbeiten. Wo solche Übermittlungen stattfinden, werden angemessene Garantien wie Standardvertragsklauseln verwendet."
    },
    dataRetention: {
      title: "Datenspeicherung",
      p1: "Wir führen keine Benutzerdatenbank. Werbedaten werden gemäß den Richtlinien von Google gespeichert, technische Protokolle für Sicherheitszwecke und der lokale Speicher bleibt erhalten, bis Sie ihn löschen."
    },
    yourRights: {
      title: "Ihre Rechte (EU/EWR)",
      p1: "Wenn Sie sich in der EU/im EWR befinden, haben Sie das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten sowie auf Einschränkung oder Widerspruch gegen die Verarbeitung. In Schweden ist die Aufsichtsbehörde Integritetsskyddsmyndigheten.",
      p2: "Kontaktieren Sie uns unter douzepointsgame@gmail.com, um Ihre Rechte auszuüben."
    },
    dataSecurity: {
      title: "Datensicherheit",
      p1: "Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten. Keine Methode der Übertragung über das Internet ist jedoch vollständig sicher."
    },
    thirdPartyLinks: {
      title: "Links zu Websites Dritter",
      p1: "Diese Website kann Links zu Websites Dritter enthalten, einschließlich YouTube. Wir sind nicht verantwortlich für die Datenschutzpraktiken oder Inhalte externer Websites."
    },
    changes: {
      title: "Änderungen an dieser Richtlinie",
      p1: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Alle Aktualisierungen werden auf dieser Seite mit einem überarbeiteten Datum „Zuletzt aktualisiert“ veröffentlicht."
    }
  },
  ranks: {
    "First-Time Voter": "Erst-Wähler",
    "Greenroom Guest": "Greenroom-Gast",
    "Backing Vocalist": "Hintergrundsänger",
    "Jury Member": "Jury-Mitglied",
    "National Finalist": "Vorentscheid-Teilnehmer",
    "Televote Favorite": "Televoting-Favorit",
    "National Representative": "Nationaler Vertreter",
    "Semi-Final Qualifier": "Halbfinal-Qualifikant",
    "Press Center Darling": "Liebling des Pressezentrums",
    "Grand Finalist": "Finalist",
    "Fan Favorite": "Fan-Favorit",
    "Top 10 Contender": "Top-10-Kandidat",
    "Dark Horse": "Geheimfavorit",
    "Podium Finish": "Podestplatz",
    "Chart Topper": "Chartstürmer",
    "Silver Medalist": "Silbermedaillengewinner",
    "Winner": "Winner",
    "Double Winner": "Zweifach-Gewinner",
    "Multi-Winner": "Mehrfach-Gewinner",
    "Hall of Famer": "Hall of Famer",
    "Iconic Entry": "Ikonischer Beitrag",
    "Eurovision Legend": "Eurovision-Legende"
  },
  metadata: {
    countries: {
      "Switzerland": "Schweiz", "Sweden": "Schweden", "Finland": "Finnland", "The Netherlands": "Niederlande",
      "Italy": "Italien", "Croatia": "Kroatien", "United Kingdom": "Vereinigtes Königreich", "Ukraine": "Ukraine",
      "France": "Frankreich",
      "Israel": "Israel", "Portugal": "Portugal", "Denmark": "Danimarca", "Norway": "Norwegen", "Spain": "Spanien",
      "Austria": "Österreich", "Cyprus": "Zypern", "Iceland": "Island", "Germany": "Deutschland", "Azerbaijan": "Aserbaidschan",
      "Serbia": "Serbien", "Australia": "Australien", "Greece": "Griechenland", "Moldova": "Moldawien", "Belgium": "Belgien",
      "Poland": "Polen", "Slovenia": "Slowenien", "Ireland": "Irland", "Luxembourg": "Luxemburg", "Albania": "Albanien",
      "Bulgaria": "Bulgarien", "Estonia": "Estland", "Russia": "Russland", "Turkey": "Türkei", "Bosnia & Herzegovina": "Bosnien & Herzegowina",
      "Malta": "Malta", "Monaco": "Monaco", "Latvia": "Lettland", "Hungary": "Ungarn", "San Marino": "San Marino",
      "Lithuania": "Litauen", "Montenegro": "Montenegro", "North Macedonia": "Nordmazedonien", "Czechia": "Tschechien",
      "Romania": "Rumänien", "Slovakia": "Slowakei", "Georgia": "Georgien", "Armenia": "Armenien",
      "Andorra": "Andorra", "Morocco": "Marokko", "Belarus": "Belarus"
    },
    genres: {
      "Drum and Bass": "Drum and Bass", "Opera": "Oper", "Drum and Bass / Opera": "Drum and Bass / Oper",
      "Pop": "Pop", "Party Metal": "Party Metal", "Ballade": "Ballade", "Rock": "Rock", "Industrial Rock": "Industrial Rock", 
      "Glam Rock": "Glam Rock", "Folk-Hop": "Folk-Hop", "Jazz": "Jazz", "Europop": "Europop", "Hard Rock": "Hard Rock",
      "Folk-Pop": "Folk-Pop", "Folk": "Folk", "Comedy Pop": "Comedy Pop", "Latin Pop": "Latin Pop",
      "R&B": "R&B", "Orchestral Pop": "Orchestral Pop", "Dance Pop": "Dance Pop", "Synthpop": "Synthpop",
      "Indie Pop": "Indie Pop", "Ethno-Pop": "Ethno-Pop", "Soul": "Soul", "Other": "Andere", "Ouija Pop": "Ouija Pop",
      "Electro-Folk": "Electro-Folk", "Synth-Pop": "Synth-Pop", "Alternative": "Alternative", "Electropop": "Electropop",
      "Chanson": "Chanson", "Pop Ballad": "Pop-Ballade", "Electronic": "Electronic", "Industrial Techno": "Industrial Techno",
      "Metalcore": "Metalcore", "Soul / Jazz": "Soul / Jazz", "Art Pop": "Art Pop", "Ska / Folk": "Ska / Folk",
      "Folk-Dance": "Folk-Dance", "Nu-Metal": "Nu-Metal", "Ethno-Hip-Hop": "Ethno-Hip-Hop", "Punk": "Punk",
      "Ska": "Ska", "Hardcore": "Hardcore", "Folk-Rap": "Folk-Rap", "Yé-yé": "Yé-yé", "Schlager": "Schlager",
      "Neoclassical": "Neoklassik", "Folk Ballad": "Folk-Ballade", "Pop Rock": "Pop-Rock", "Soft Rock": "Soft Rock",
      "Celtic Folk": "Keltischer Folk", "Balkan Ballad": "Balkan-Ballade", "Disco": "Disco",
      "Operatic Pop": "Opern-Pop", "Indie Rock": "Indie Rock", "Avant-Garde": "Avant-Garde", "Country": "Country"
    },
    sex: {
      "Male": "Männlich", "Female": "Weiblich", "Mixed": "Gemischt", "Other": "Andere"
    },
    sizes: {
      solo: "Solo",
      duo: "Duo"
    }
  }
};