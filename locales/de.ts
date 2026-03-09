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
    howToPlayP2: "Während du in allen Spielen Punkte sammelst, steigst du in den globalen Fandom-Rängen auf, vom 'Erst-Wähler' bis hin zur echten 'Eurovision-Legende'. Du kannst deinen täglichen Fortschritt, deine Karriere-Meilensteine und deinen aktuellen Rang jederzeit verfolgen, indem du auf die Schaltfläche 'Stats' im Header klickst. Viel Glück, und möge der beste Fan gewinnen!"
  },
  games: {
    eurosong: { 
      title: "EuroSong", 
      desc: "Tägliche Eurovision Titel-Herausforderung.",
      rulesShort: "Identifiziere den versteckten Eurovision-Songtitel in 6 Versuchen. Die Kacheln ändern ihre Farbe:\n🟩 Richtige Stelle\n🟨 Falsche Stelle\n⬛ Nicht im Titel",
      rulesLong: "EuroSong ist ein Worträtselspiel, das dem riesigen Katalog der Eurovision-Songtitel gewidmet ist. Ihr Ziel ist es, einen bestimmten Songtitel aus der Geschichte des Wettbewerbs innerhalb von sechs Versuchen zu identifizieren.\n\nSpielanleitung:\n• Geben Sie eine beliebige Buchstabenkombination ein, um einen Tipp abzugeben.\n• Nach jedem Tipp ändert sich die Farbe der Kacheln, um Feedback zu geben:\n  - 🟩 (Grün): Der Buchstabe ist im Titel und an der richtigen Stelle.\n  - 🟨 (Gelb): Der Buchstabe ist im Titel, aber an der falschen Stelle.\n  - ⬛ (Grau): Der Buchstabe ist überhaupt nicht im Titel enthalten.\n• Nutzen Sie das Feedback jedes Tipps, um die Möglichkeiten einzugrenzen.\n• Das Spiel bietet Titel aus allen Epochen der Eurovision, von den 1950er Jahren bis heute."
    },
    euroartist: { 
      title: "EuroArtist", 
      desc: "Tägliche ESC Künstler-Herausforderung.",
      rulesShort: "Errate den Namen des Eurovision-Künstlers oder der Gruppe in 6 Versuchen. Die Kacheln ändern ihre Farbe:\n🟩 Richtige Stelle\n🟨 Falsche Stelle\n⬛ Nicht im Namen",
      rulesLong: "EuroArtist fordert Sie heraus, die berühmten Interpreten und Gruppen zu identifizieren, die die Eurovision-Bühne beehrt haben. Von legendären Gewinnern bis hin zu Kult-Favoriten – können Sie den täglichen Künstler in sechs Versuchen erraten?\n\nSpielanleitung:\n• Geben Sie den Namen eines Künstlers oder einer Gruppe als Tipp ein.\n• Die Kacheln ändern ihre Farbe, je nachdem, wie nah Ihr Tipp am Zielnamen liegt:\n  - 🟩 (Grün): Richtiger Buchstabe an der richtigen Position.\n  - 🟨 (Gelb): Richtiger Buchstabe an der falschen Position.\n  - ⬛ (Grau): Dieser Buchstabe ist nicht Teil des Künstlernamens.\n• Denken Sie daran, dass Künstlernamen Leerzeichen und Sonderzeichen enthalten können, die oft auf dem Spielfeld fixiert sind, um Ihnen zu helfen."
    },
    eurorefrain: {
      title: "EuroRefrain",
      desc: "Verbinde 4 Wörter aus einem Lyric-Hook.",
      rulesShort: "Verbinde 16 Wörter in vier Vierergruppen. Jede Gruppe gehört zu einem anderen Eurovision-Refrain. 6 Fehler erlaubt.",
      rulesLong: "EuroRefrain testet Ihr Gedächtnis für die ikonischsten Songtexte der Eurovision-Geschichte. Ihnen wird ein Raster mit 16 Wörtern präsentiert, die aus vier verschiedenen Song-Refrains stammen.\n\nSpielanleitung:\n• Ihre Aufgabe ist es, diese 16 Wörter in vier Vierergruppen zu unterteilen, wobei jede Gruppe zum Refrain eines Songs gehört.\n• Wählen Sie vier Wörter aus, von denen Sie glauben, dass sie zusammengehören, und tippen Sie auf 'Absenden'.\n• Wenn sie korrekt sind, werden die Wörter vom Spielfeld entfernt und der Songtitel wird enthüllt.\n• Wenn sie falsch sind, zählt dies als Fehler. Sie dürfen bis zu 6 Fehler machen, bevor das Spiel endet.\n• Die Wörter sind sorgfältig ausgewählt, um herausfordernd zu sein, und enthalten oft häufige Wörter, die zu mehreren Songs gehören könnten!"
    },
    eurolinks: { 
      title: "EuroLinks", 
      desc: "Gruppiere 4 Eurovision Begriffe.",
      rulesShort: "Gruppiere 16 Eurovision-bezogene Elemente in vier Viererkategorien basierend auf einer gemeinsamen Verbindung. 6 Fehler erlaubt.",
      rulesLong: "EuroLinks ist ein Spiel für Logik und Eurovision-Trivia. Sie müssen die versteckten Verbindungen zwischen 16 verschiedenen Elementen im Zusammenhang mit dem Wettbewerb finden.\n\nSpielanleitung:\n• Das Raster enthält 16 Elemente, die in vier Kategorien zu je vier Elementen gruppiert werden können.\n• Die Kategorien können von 'Gewinner aus den 90ern' bis hin zu 'Länder, die noch nie gewonnen haben' oder 'Künstler, die mehrmals teilgenommen haben' reichen.\n• Wählen Sie vier Elemente aus und tippen Sie auf 'Absenden', um zu prüfen, ob sie eine Kategorie teilen.\n• Sie haben 6 Fehler erlaubt, um das gesamte Rätsel zu lösen.\n• Jede Kategorie hat einen Schwierigkeitsgrad, der von einfach bis hin zu Experten-Trivia reicht!"
    },
    euroguess: { 
      title: "EuroGuess", 
      desc: "Erkenne den Beitrag über ESC Hinweise.",
      rulesShort: "Identifiziere den geheimnisvollen Eurovision-Beitrag in 6 Versuchen. Jeder falsche Tipp enthüllt einen neuen, spezifischeren Hinweis.",
      rulesLong: "EuroGuess ist ein Detektivspiel, bei dem Sie einen geheimnisvollen Eurovision-Beitrag anhand einer Reihe von Hinweisen identifizieren. Die Herausforderung besteht darin, den Beitrag mit so wenigen Hinweisen wie möglich zu erraten.\n\nSpielanleitung:\n• Sie beginnen mit einem ersten Hinweis (normalerweise dem Jahr).\n• Wenn Ihr Tipp falsch ist, wird ein neuer, spezifischerer Hinweis enthüllt (Land, Genre, Platzierung usw.).\n• Sie haben insgesamt 6 Versuche, um den richtigen Beitrag zu identifizieren.\n• Nutzen Sie die Suchleiste, um Ihren Tipp in unserer umfassenden Datenbank von Eurovision-Beiträgen zu finden und auszuwählen.\n• Die Punktzahl basiert darauf, wie viele Hinweise Sie benötigt haben – wer früh rät, erhält die maximale Punktzahl!"
    },
    euroarena: { 
      title: "EuroArena", 
      desc: "Errate über Statistiken des Contests.",
      rulesShort: "Finde den Ziel-Eurovision-Beitrag in 7 Versuchen. Feedback-Marker zeigen:\n🟩 Richtige Übereinstimmung\n🟨 Nahe Übereinstimmung\n⬛ Keine Übereinstimmung\nNutze Pfeile (⬆️⬇️) für Jahr und Rang.",
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
    lastUpdated: "Zuletzt aktualisiert",
    whatAreCookies: "Was sind Cookies?",
    whatAreCookiesDesc: "Cookies sind kleine Textdateien, die von Ihrem Browser auf Ihrem Gerät gespeichert werden. Sie helfen Websites, sich an Sie und Ihre Präferenzen zu erinnern.",
    typesWeUse: "Arten, die wir verwenden",
    essential: "Essenzielle Cookies",
    essentialDesc: "Wird für die Stabilität der Website verwendet und um Ihre Datenschutzeinstellungen zu speichern. Diese verfolgen keine persönlichen Daten.",
    advertising: "Werbe-Cookies",
    advertisingDesc: "Wird über unsere Website von unseren Werbepartnern (wie AdsTerra) gesetzt. Sie können von diesen Unternehmen verwendet werden, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Werbung auf anderen Websites anzuzeigen. AdsTerra kann eigene Cookies für das Ad-Targeting und die Personalisierung setzen.",
    yourChoices: "Ihre Auswahl",
    yourChoicesDesc: "Wir respektieren Ihr Recht auf Privatsphäre. Sie können wählen, bestimmte Arten von Cookies nicht zuzulassen.",
    status: "Aktueller Status",
    allAllowed: "Alle erlaubt",
    essentialOnly: "Nur essenzielle",
    notSet: "Nicht festgelegt",
    partners: "Werbepartner",
    partnersDesc: "Wir verwenden AdsTerra, um Werbung anzuzeigen. AdsTerra und seine Partner verwenden Cookies, um Anzeigen basierend auf Ihrem Besuch auf dieser Website und/oder anderen Websites im Internet zu schalten.",
    partnersOptOut: "Sie können Ihre Werbeeinstellungen verwalten, indem Sie oben den Schalter 'Nur essenzielle' verwenden oder die AdsTerra-Datenschutzerklärung besuchen (https://adterra.com/privacy-policy/), um weitere Informationen darüber zu erhalten, wie sie Daten verarbeiten.",
    moreInfo: "Weitere Informationen",
    moreInfoDesc: "Weitere Informationen zu Datenschutzpraktiken und Ihren Rechten finden Sie auf unserer Seite mit den Datenschutzbestimmungen.",
    settingsSaved: "Einstellungen erfolgreich gespeichert"
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
      autoFootnote: "Diese Informationen können von unseren Werbe- und Analyseanbietern (AdsTerra) verarbeitet werden.",
      cookiesTitle: "b) Cookies und ähnliche Technologien",
      cookiesDesc1: "Wir verwenden Cookies und ähnliche Technologien für Werbung, Messung der Anzeigenleistung und Website-Funktionalität.",
      cookiesDesc2: "Die Einwilligung für Cookies wird über unser integriertes Consent-System eingeholt und verwaltet. Nutzer in relevanten Regionen (wie EU/EWR und UK) werden um ihre Einwilligung gebeten, bevor nicht-essenzielle Cookies verwendet werden.",
      cookiesDesc3: "Sie können Ihre Einwilligungseinstellungen jederzeit über die auf der Website verfügbaren Einwilligungsoptionen ändern."
    },
    advertising: {
      title: "Werbung",
      p1: "Wir verwenden AdsTerra, um Anzeigen zu schalten. AdsTerra und seine Partner verwenden Cookies, um Anzeigen basierend auf den vorherigen Besuchen eines Nutzers auf unserer Website oder anderen Websites zu schalten. Dies ermöglicht es ihnen, unseren Nutzern Anzeigen basierend auf ihrem Besuch auf unserer Website und/oder anderen Websites im Internet zu schalten.",
      p2: "Sie können Ihre Werbeeinstellungen über unsere Cookie-Richtlinien-Seite oder über die Option 'Nur essenzielle' in unserem Einwilligungsbanner verwalten.",
      p3: "Weitere Informationen darüber, wie AdsTerra personenbezogene Daten verarbeitet, finden Sie in der Datenschutzerklärung von AdsTerra (https://adterra.com/privacy-policy/)."
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
      items: ["AdsTerra (Werbung)", "Hosting-Anbieter", "Technische Dienstleister, die für den Betrieb der Website erforderlich sind"]
    },
    internationalTransfers: {
      title: "Internationale Übermittlungen",
      p1: "Einige Drittanbieter, einschließlich AdsTerra, können Daten außerhalb der EU oder des EWR verarbeiten. Wo solche Übermittlungen stattfinden, werden angemessene Garantien wie Standardvertragsklauseln verwendet."
    },
    dataRetention: {
      title: "Datenspeicherung",
      p1: "Wir führen keine Benutzerdatenbank. Werbedaten werden gemäß den Richtlinien von AdsTerra gespeichert, technische Protokolle für Sicherheitszwecke und der lokale Speicher bleibt erhalten, bis Sie ihn löschen."
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
  about: {
    title: "Über Douze Points",
    subtitle: "Wir feiern den Eurovision Song Contest",
    mission: {
      title: "Unsere Mission",
      p1: "Douze Points entstand aus einer tiefen Liebe zum Eurovision Song Contest. Meine Mission ist es, einen ganzjährigen Hub für Fans zu bieten, um sich durch unterhaltsame, herausfordernde und interaktive tägliche Spiele mit der reichen Geschichte des Wettbewerbs auseinanderzusetzen. Ich glaube, dass der Geist des Eurovision – Einheit durch Musik – jeden Tag gefeiert werden sollte, nicht nur während der Wettbewerbswoche im Mai.",
      p2: "Ich glaube, dass der Eurovision mehr als nur ein Musikwettbewerb ist – er ist ein Fest der Vielfalt, Kultur und Einheit. Meine Spiele sind darauf ausgelegt, diesen Geist zu ehren und gleichzeitig das Wissen selbst der engagiertesten Superfans zu testen. Von den Orchesterballaden der 1950er Jahre bis hin zum energiegeladenen Pop und Rock der modernen Ära decke ich alles ab."
    },
    story: {
      title: "Die Geschichte",
      p1: "Von einem Fan für die Fans erstellt, begann Douze Points als kleines Projekt, um die Eurovision-Magie zwischen den Wettbewerben am Leben zu erhalten. Heute bietet es sechs einzigartige tägliche Spiele, die alles von 1956 bis heute abdecken.",
      p2: "Egal, ob Sie ein 'Erstwähler' oder eine 'Eurovision-Legende' sind, es gibt immer etwas Neues über den beliebtesten Songwettbewerb der Welt zu entdecken."
    },
    history: {
      title: "Eurovision Geschichte",
      p1: "Der Eurovision Song Contest ist eine der am längsten laufenden und meistgesehenen Nicht-Sportveranstaltungen der Welt.",
      p2: "Im Laufe der Jahre hat der Wettbewerb die Karrieren globaler Ikonen gestartet und eine Bühne für vielfältige musikalische Ausdrucksformen geboten. Bei Douze Points möchte ich dieses unglaubliche Erbe bewahren und feiern."
    },
    games: {
      title: "Die Spiele",
      p1: "Unsere täglichen Herausforderungen sind von beliebten Wort- und Logikrätseln inspiriert, die speziell für die ESC-Community angepasst wurden:",
      gameList: [
        { name: "EuroSong", desc: "Ein Songtitel-Ratespiel im Wordle-Stil." },
        { name: "EuroArtist", desc: "Identifizieren Sie den Interpreten in 6 Versuchen." },
        { name: "EuroRefrain", desc: "Verbinden Sie Songtexte mit ihren ikonischen Hooks." },
        { name: "EuroLinks", desc: "Finden Sie die versteckten Verbindungen zwischen ESC-Elementen." },
        { name: "EuroGuess", desc: "Das ultimative Quiz zu mysteriösen Beiträgen." },
        { name: "EuroArena", desc: "Ein datengesteuerter Kampf der Eurovision-Statistiken." }
      ]
    },
    community: {
      title: "Community Zuerst",
      p1: "Ich bin nicht mit der EBU oder einem offiziellen Sender verbunden. Ich bin einfach ein Fan, der seine Leidenschaft für den Eurovision mit der Welt teilen möchte."
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
    lastUpdated: "Februar 2026",
    title: "Nutzungsbedingungen",
    acceptance: {
      title: "Annahme der Bedingungen",
      p1: "Durch den Zugriff auf oder die Nutzung von Douze Points (www.douzepoints.net) erklären Sie sich damit einverstanden, an diese Nutzungsbedingungen gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie die Website bitte nicht."
    },
    description: {
      title: "Beschreibung des Dienstes",
      p1: "Douze Points ist eine von Fans erstellte Website, die Eurovision-Themenspiele und Trivia zu Unterhaltungszwecken anbietet. Der Dienst wird 'wie besehen' bereitgestellt und kann jederzeit geändert oder eingestellt werden."
    },
    ip: {
      title: "Geistiges Eigentum",
      p1: "Der Eurovision Song Contest und verwandte Marken sind Eigentum der Europäischen Rundfunkunion (EBU). Diese Website ist nicht mit der EBU verbunden, wird nicht von ihr unterstützt oder gesponsert.",
      p2: "Alle Originalinhalte, Codes und Designs auf dieser Website sind Eigentum des Website-Besitzers. Sie dürfen keinen Teil dieser Website ohne Erlaubnis vervielfältigen oder verbreiten."
    },
    conduct: {
      title: "Nutzerverhalten",
      p1: "Sie erklären sich damit einverstanden, die Website nur für rechtmäßige Zwecke und in einer Weise zu nutzen, die die Rechte anderer nicht verletzt. Verbotenes Verhalten umfasst:",
      items: [
        "Versuch, den Betrieb der Website zu stören",
        "Verwendung automatisierter Skripte zum Sammeln von Daten oder zum Spielen von Spielen",
        "Sich als andere ausgeben oder falsche Informationen bereitstellen",
        "Teilnahme an Aktivitäten, die dem Ruf der Website schaden könnten"
      ]
    },
    disclaimer: {
      title: "Haftungsausschluss",
      p1: "Die Website wird auf einer 'wie besehen' und 'wie verfügbar' Basis bereitgestellt. Wir geben keine Garantien, weder ausdrücklich noch stillschweigend, hinsichtlich der Genauigkeit, Zuverlässigkeit oder Verfügbarkeit des Dienstes."
    },
    limitation: {
      title: "Haftungsbeschränkung",
      p1: "Soweit gesetzlich zulässig, haftet der Website-Besitzer nicht für direkte, indirekte, zufällige oder Folgeschäden, die aus Ihrer Nutzung der Website entstehen."
    },
    governingLaw: {
      title: "Anwendbares Recht",
      p1: "Diese Nutzungsbedingungen unterliegen den Gesetzen von Schweden und werden in Übereinstimmung mit diesen ausgelegt."
    },
    changes: {
      title: "Änderungen der Bedingungen",
      p1: "Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Ihre fortgesetzte Nutzung der Website nach Änderungen stellt die Annahme der neuen Bedingungen dar."
    },
    contact: {
      title: "Kontaktinformationen",
      p1: "Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter: douzepointsgame@gmail.com"
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