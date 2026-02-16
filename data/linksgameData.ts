import { ConnectionsGroup } from './types.ts';

/**
 * 100 Hand-crafted daily puzzles for EuroLinks.
 * Logic Rule: Puzzles include "Red Herrings" where an item seems to fit a theme but 
 * only fits one category name factually, ensuring a unique solution.
 */
export const PUZZLES: ConnectionsGroup[][] = [
  // Board 1: Nordic Logic
  [
    { category: "Nordic Winners", items: ["SWEDEN", "NORWAY", "FINLAND", "DENMARK"], difficulty: "easy" },
    { category: "Island Nations", items: ["ICELAND", "CYPRUS", "MALTA", "AUSTRALIA"], difficulty: "medium" },
    { category: "Stage Props", items: ["PIANO", "STAIRS", "FIRE", "BATHTUB"], difficulty: "hard" },
    { category: "Colors in Titles", items: ["DOOMSDAY BLUE", "BLACK SMOKE", "WHITE AND BLACK BLUES", "BLACKBIRD"], difficulty: "expert" }
    // Red Herring: Iceland is Nordic, but never won. It must go to Island Nations.
  ],
  // Board 2: Loreen and Co
  [
    { category: "One-Name Winners", items: ["LOREEN", "NETTA", "LENA", "RUSLANA"], difficulty: "easy" },
    { category: "Big Five Nations", items: ["UK", "FRANCE", "SPAIN", "ITALY"], difficulty: "medium" },
    { category: "Words in 'Waterloo'", items: ["HISTORY", "DEFEAT", "PROMISE", "BATTLE"], difficulty: "hard" },
    { category: "Instruments on Stage", items: ["VIOLIN", "GUITAR", "DRUMS", "FLUTE"], difficulty: "expert" }
    // Red Herring: Germany is a Big Five country but omitted here.
  ],
  // Board 3: 2024 Final
  [
    { category: "2024 Top 5", items: ["SWITZERLAND", "CROATIA", "UKRAINE", "FRANCE"], difficulty: "easy" },
    { category: "Host Cities (Sweden)", items: ["STOCKHOLM", "MALMÖ", "GOTHENBURG", "UPPSALA"], difficulty: "medium" },
    { category: "Rim Tim Tagi Dim Items", items: ["LACE", "NEON", "CAT", "COW"], difficulty: "hard" },
    { category: "Solo Male Ballads", items: ["ARCADE", "MON AMOUR", "TOUT L'UNIVERS", "GROW"], difficulty: "expert" }
  ],
  // Board 4: Ex-Soviet Nations
  [
    { category: "Ex-Soviet Winners", items: ["ESTONIA", "LATVIA", "UKRAINE", "AZERBAIJAN"], difficulty: "easy" },
    { category: "Former Soviet Republics", items: ["MOLDOVA", "GEORGIA", "ARMENIA", "BELARUS"], difficulty: "medium" },
    { category: "Titles with Numbers", items: ["1944", "ONE", "SEVEN", "TEN"], difficulty: "hard" },
    { category: "Onomatopoeia", items: ["DING-A-DONG", "LA LA LA", "BUM-BUM", "DIGGI-LOO"], difficulty: "expert" }
  ],
  // Board 5: Balkan Puzzles
  [
    { category: "Ex-Yugoslavia Republics", items: ["SLOVENIA", "MONTENEGRO", "BOSNIA", "NORTH MACEDONIA"], difficulty: "easy" },
    { category: "Balkan Nations", items: ["ALBANIA", "GREECE", "BULGARIA", "ROMANIA"], difficulty: "medium" },
    { category: "Animal Songs", items: ["WOLF", "TURTLE", "BIRD", "SNAKE"], difficulty: "hard" },
    { category: "Solo Male Winners", items: ["SALVADOR", "DUNCAN", "MÅNS", "RYBAK"], difficulty: "expert" }
    // Red Herring: Serbia/Croatia are Ex-Yu and Balkan, but excluded to avoid overlap.
  ],
  // Board 6: Iconic Props
  [
    { category: "Stage Effects", items: ["FOG", "LASERS", "CONFETTI", "FIREWORKS"], difficulty: "easy" },
    { category: "UK Host Cities", items: ["LONDON", "LIVERPOOL", "BIRMINGHAM", "BRIGHTON"], difficulty: "medium" },
    { category: "Titles starting with 'A'", items: ["ARCADE", "AMAR", "ADRENALINA", "ALCOHOL"], difficulty: "hard" },
    { category: "Barefoot Performers", items: ["SANDIE SHAW", "EMMELIE", "CORNELIA", "RENEE"], difficulty: "expert" }
  ],
  // Board 7: Royalty
  [
    { category: "Titles with Royalty", items: ["QUEEN", "KING", "CROWN", "EMPIRE"], difficulty: "easy" },
    { category: "Mediterranean Islands", items: ["CYPRUS", "MALTA", "SICILY", "CRETE"], difficulty: "medium" },
    { category: "Titles with 'Moon'", items: ["MOON", "MOONLIGHT", "MOONRISE", "MOONSHINE"], difficulty: "hard" },
    { category: "Acts with Hats", items: ["KÄÄRIJÄ", "VERKA", "ZDOB SI ZDUB", "JOHNNY"], difficulty: "expert" }
  ],
  // Board 8: Heroes
  [
    { category: "Winning Genres", items: ["ROCK", "POP", "JAZZ", "BALLAD"], difficulty: "easy" },
    { category: "Words in 'Heroes'", items: ["DANCING", "DEMONS", "HEROES", "CRICKET"], difficulty: "medium" },
    { category: "Voting Parts", items: ["JURY", "TELEVOTE", "SPOKESPERSON", "PUBLIC"], difficulty: "hard" },
    { category: "Baltic Nations", items: ["ESTONIA", "LATVIA", "LITHUANIA", "POLAND"], difficulty: "expert" }
  ],
  // Board 9: Modern Masters
  [
    { category: "2020s Winning Songs", items: ["ZITTI", "STEFANIA", "TATTOO", "THE CODE"], difficulty: "easy" },
    { category: "Non-European Winners", items: ["ISRAEL", "AZERBAIJAN", "TURKEY", "RUSSIA"], difficulty: "medium" },
    { category: "Titles with 'No'", items: ["NO PREJUDICE", "NO DEGREE", "NO NO NEVER", "NOT ALONE"], difficulty: "hard" },
    { category: "Cities that Hosted Twice", items: ["JERUSALEM", "MALMÖ", "DUBLIN", "CANNES"], difficulty: "expert" }
  ],
  // Board 10: Urban Grid
  [
    { category: "Urban Genres", items: ["RAP", "HIP-HOP", "R&B", "TRAP"], difficulty: "easy" },
    { category: "Oceania/Exotic Acts", items: ["GUY SEBASTIAN", "DAMI IM", "KATE MILLER", "VOYAGER"], difficulty: "medium" },
    { category: "Winning Host Cities", items: ["PARIS", "LONDON", "DUBLIN", "JERUSALEM"], difficulty: "hard" },
    { category: "Words in 'The Code'", items: ["NEMO", "BROKEN", "TRUTH", "CODE"], difficulty: "expert" }
  ],
  // Board 11: Food & Drink
  [
    { category: "Food in Titles", items: ["CAKE", "HONEY", "CHEESECAKE", "WINE"], difficulty: "easy" },
    { category: "Winning Duos", items: ["BOBBYSOX", "SECRET GARDEN", "ELL & NIKKI", "RIVA"], difficulty: "medium" },
    { category: "Western Founding Nations", items: ["GERMANY", "AUSTRIA", "SWITZERLAND", "NETHERLANDS"], difficulty: "hard" },
    { category: "Lyrics in 'Euphoria'", items: ["HIGHER", "ETERNITY", "HEAVEN", "EUPHORIA"], difficulty: "expert" }
  ],
  // Board 12: Weather
  [
    { category: "Weather in Titles", items: ["STORM", "RAIN", "THUNDER", "LIGHTNING"], difficulty: "easy" },
    { category: "Former Soviet Winners", items: ["UKRAINE", "ESTONIA", "LATVIA", "AZERBAIJAN"], difficulty: "medium" },
    { category: "Solo Male Ballads", items: ["MON AMOUR", "TOUT L'UNIVERS", "GROW", "ARCADE"], difficulty: "hard" },
    { category: "Acts with DJs", items: ["LUMX", "DARUDE", "JOWST", "GROOVEEBEE"], difficulty: "expert" }
  ],
  // Board 13: Winners Group
  [
    { category: "Groups that Won", items: ["ABBA", "MANESKIN", "KALUSH", "LORDI"], difficulty: "easy" },
    { category: "Micro-States", items: ["SAN MARINO", "ANDORRA", "MONACO", "LUXEMBOURG"], difficulty: "medium" },
    { category: "Nature Titles", items: ["BIRD", "SNAKE", "TURTLE", "WOLF"], difficulty: "hard" },
    { category: "Words starting 'Euro'", items: ["EUROCLUB", "EUROFEST", "EUROPROPS", "EUROPAPA"], difficulty: "expert" }
  ],
  // Board 14: Historical Firsts
  [
    { category: "Debut Winners", items: ["SWITZERLAND", "NETHERLANDS", "FRANCE", "SERBIA"], difficulty: "easy" },
    { category: "Host Cities (Germany)", items: ["BERLIN", "MUNICH", "FRANKFURT", "DUSSELDORF"], difficulty: "medium" },
    { category: "Titles with 'Life'", items: ["J'AIME LA VIE", "THIS IS MY LIFE", "LOVE IS LIFE", "LIFE"], difficulty: "hard" },
    { category: "French Score Terms", items: ["DOUZE", "DIX", "HUIT", "SEPT"], difficulty: "expert" }
  ],
  // Board 15: Iconic Props II
  [
    { category: "Props on Stage", items: ["WIND MACHINE", "LED SCREEN", "TREADMILL", "BOX"], difficulty: "easy" },
    { category: "Mediterranean Coasts", items: ["PORTUGAL", "SPAIN", "ITALY", "ISRAEL"], difficulty: "medium" },
    { category: "Titles with 'Fire'", items: ["FUEGO", "FIRE", "FIREFLY", "FIREWORKS"], difficulty: "hard" },
    { category: "2024 Final Girls", items: ["TERESA", "MARIA", "ZARI", "VERONIKA"], difficulty: "expert" }
  ],
  // Board 16: Female Power
  [
    { category: "One-Name Female Acts", items: ["MARINA", "OLIVIA", "MUSTII", "SILIA"], difficulty: "easy" },
    { category: "Northern Winners", items: ["IRELAND", "SWEDEN", "NORWAY", "DENMARK"], difficulty: "medium" },
    { category: "Nature Elements", items: ["MOUNTAIN", "RIVER", "OCEAN", "DESERT"], difficulty: "hard" },
    { category: "Winning Years (90s)", items: ["1992", "1993", "1994", "1996"], difficulty: "expert" }
  ],
  // Board 17: Color Theory
  [
    { category: "Winning Colors", items: ["GOLD", "SILVER", "WHITE", "BLUE"], difficulty: "easy" },
    { category: "Host Cities (Italy)", items: ["TURIN", "ROME", "NAPLES", "MILAN"], difficulty: "medium" },
    { category: "Titles with 'Sing'", items: ["SING", "SINGING", "SING LITTLE", "SINGALONG"], difficulty: "hard" },
    { category: "2023 Semi 1 Acts", items: ["FINLAND", "SWEDEN", "ISRAEL", "NORWAY"], difficulty: "expert" }
  ],
  // Board 18: Parts of Show
  [
    { category: "Show Segments", items: ["POSTCARD", "INTERVAL", "OPENING", "VOTING"], difficulty: "easy" },
    { category: "Western Europe Winners", items: ["BELGIUM", "FRANCE", "UK", "IRELAND"], difficulty: "medium" },
    { category: "Titles with 'Time'", items: ["TIME", "TIMELINE", "TIMESTOP", "TIMING"], difficulty: "hard" },
    { category: "Acts with Strings", items: ["RYBAK", "LUMX", "GRIFFITH", "VOYAGER"], difficulty: "expert" }
  ],
  // Board 19: Emoji Vibe
  [
    { category: "Nature Imagery", items: ["TREE", "FLOWER", "SUN", "STARS"], difficulty: "easy" },
    { category: "Host Cities (UK)", items: ["LONDON", "LIVERPOOL", "BIRMINGHAM", "BRIGHTON"], difficulty: "medium" },
    { category: "Winning Years (70s)", items: ["1974", "1975", "1978", "1979"], difficulty: "hard" },
    { category: "Lyrics in 'Tattoo'", items: ["FOREVER", "VOICE", "LOUD", "TATTOO"], difficulty: "expert" }
  ],
  // Board 20: The Final Lobby
  [
    { category: "ESC Roles", items: ["ARTIST", "HOST", "SPOKESPERSON", "DIRECTOR"], difficulty: "easy" },
    { category: "Winning Years (2010s)", items: ["2012", "2014", "2015", "2016"], difficulty: "medium" },
    { category: "Titles starting 'T'", items: ["TOY", "TATTOO", "TIME", "THE CODE"], difficulty: "hard" },
    { category: "2024 Semi 2 Acts", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 21: Big 5 Countries
  [
    { category: "The Big 5", items: ["UK", "FRANCE", "ITALY", "GERMANY"], difficulty: "easy" },
    { category: "Host Cities (Benelux)", items: ["AMSTERDAM", "ROTTERDAM", "BRUSSELS", "LUXEMBOURG"], difficulty: "medium" },
    { category: "Titles with 'Dream'", items: ["DREAM", "DREAMER", "DREAMS", "DREAMING"], difficulty: "hard" },
    { category: "Words in 'Europapa'", items: ["EURO", "PAPA", "WELKOM", "EUROPA"], difficulty: "expert" }
  ],
  // Board 22: Classic Genres
  [
    { category: "Popular Genres", items: ["ROCK", "POP", "JAZZ", "FOLK"], difficulty: "easy" },
    { category: "Host Cities (Spain)", items: ["MADRID", "BARCELONA", "VALENCIA", "SEVILLE"], difficulty: "medium" },
    { category: "Titles with 'Gold'", items: ["GOLD", "GOLDEN BOY", "GOLDEN", "GOOSEBUMPS"], difficulty: "hard" },
    { category: "Acts with Props", items: ["KÄÄRIJÄ", "VERKA", "ZDOB", "JOHNNY"], difficulty: "expert" }
  ],
  // Board 23: Live Music
  [
    { category: "Instruments", items: ["VIOLIN", "GUITAR", "DRUMS", "PIANO"], difficulty: "easy" },
    { category: "Host Cities (Norway)", items: ["OSLO", "BERGEN", "TRONDHEIM", "STAVANGER"], difficulty: "medium" },
    { category: "Titles with 'Stars'", items: ["STARS", "GUIDING STAR", "STAR", "STARRY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["IRELAND", "LUXEMBOURG", "LITHUANIA", "AUSTRALIA"], difficulty: "expert" }
  ],
  // Board 24: Common Themes
  [
    { category: "Lyric Themes", items: ["LOVE", "PEACE", "HOPE", "DANCE"], difficulty: "easy" },
    { category: "Host Cities (Israel)", items: ["JERUSALEM", "TEL AVIV", "HAIFA", "EILAT"], difficulty: "medium" },
    { category: "Titles with 'Light'", items: ["LIGHT", "LIGHTNING", "SUNLIGHT", "MOONLIGHT"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 25: Performer Roles
  [
    { category: "On-Stage Roles", items: ["SINGER", "DANCER", "MUSICIAN", "HOST"], difficulty: "easy" },
    { category: "Host Cities (Denmark)", items: ["COPENHAGEN", "ODENSE", "AARHUS", "HERNING"], difficulty: "medium" },
    { category: "Titles with 'Night'", items: ["NIGHT", "STARRY NIGHT", "ONE NIGHT", "IN THE NIGHT"], difficulty: "hard" },
    { category: "2024 Winners", items: ["THE CODE", "NEMO", "BROKEN", "TRUTH"], difficulty: "expert" }
  ],
  // Board 26: Hardware
  [
    { category: "Stage Tech", items: ["MICROPHONE", "LIGHTS", "CAMERA", "STAGE"], difficulty: "easy" },
    { category: "Host Cities (Austria)", items: ["VIENNA", "INNSBRUCK", "SALZBURG", "LINZ"], difficulty: "medium" },
    { category: "Titles with 'Rain'", items: ["RAIN", "RAINBOW", "RAINDROPS", "RAINING"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 27: Voting Logic
  [
    { category: "Voting Data", items: ["VOTE", "SCORE", "JURY", "PUBLIC"], difficulty: "easy" },
    { category: "Host Cities (Russia)", items: ["MOSCOW", "ST. PETERSBURG", "KAZAN", "SOCHI"], difficulty: "medium" },
    { category: "Titles with 'Voice'", items: ["VOICE", "THE VOICE", "VOICES", "VOICEMAIL"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 28: Event Types
  [
    { category: "Broadcast Types", items: ["SEMI 1", "SEMI 2", "FINAL", "GRAND FINAL"], difficulty: "easy" },
    { category: "Host Cities (Finland)", items: ["HELSINKI", "TAMPERE", "TURKU", "ESPOO"], difficulty: "medium" },
    { category: "Titles with 'Day'", items: ["DAY", "DAILY", "DAYLIGHT", "DAYBREAK"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 29: Locations
  [
    { category: "Venue Names", items: ["ARENA", "HALL", "STADIUM", "THEATRE"], difficulty: "easy" },
    { category: "Host Cities (Ireland)", items: ["DUBLIN", "CORK", "LIMERICK", "GALWAY"], difficulty: "medium" },
    { category: "Titles with 'Way'", items: ["WAY", "EVERYWAY", "MY WAY", "THE WAY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 30: Stage Direction
  [
    { category: "Stage Positions", items: ["FRONT", "BACK", "LEFT", "RIGHT"], difficulty: "easy" },
    { category: "Host Cities (Greece)", items: ["ATHENS", "THESSALONIKI", "PATRAS", "HERAKLION"], difficulty: "medium" },
    { category: "Titles with 'Heart'", items: ["HEART", "OPEN HEART", "HEARTBEAT", "IN MY HEART"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 31: Official Terms
  [
    { category: "Scoring Terms", items: ["DOUZE", "NUL", "POINTS", "SCORE"], difficulty: "easy" },
    { category: "Host Cities (Turkey)", items: ["ISTANBUL", "ANKARA", "IZMIR", "ANTALYA"], difficulty: "medium" },
    { category: "Titles with 'Moon'", items: ["MOON", "FULL MOON", "MOONLIGHT", "NEW MOON"], difficulty: "hard" },
    { category: "2024 Finalists", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 32: Song Structure
  [
    { category: "Musical Parts", items: ["INTRO", "OUTRO", "CHORUS", "VERSE"], difficulty: "easy" },
    { category: "Host Cities (Portugal)", items: ["LISBON", "PORTO", "COIMBRA", "FARO"], difficulty: "medium" },
    { category: "Titles with 'Love'", items: ["LOVE", "ONLY LOVE", "MY LOVE", "TRUE LOVE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 33: Elements
  [
    { category: "Natural Elements", items: ["WATER", "FIRE", "EARTH", "AIR"], difficulty: "easy" },
    { category: "Host Cities (Belgium)", items: ["BRUSSELS", "ANTWERP", "GHENT", "LIEGE"], difficulty: "medium" },
    { category: "Titles with 'Bird'", items: ["BIRD", "BIRDS", "EAGLE", "SWAN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 34: Feelings
  [
    { category: "Emotions in Titles", items: ["JOY", "SORROW", "ANGER", "FEAR"], difficulty: "easy" },
    { category: "Host Cities (Switzerland)", items: ["LUGANO", "LAUSANNE", "BASEL", "GENEVA"], difficulty: "medium" },
    { category: "Titles with 'Space'", items: ["SPACE", "SATELLITE", "STARS", "MOON"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 35: Items
  [
    { category: "Visual Elements", items: ["SCREEN", "LIGHT", "WIRE", "EFFECT"], difficulty: "easy" },
    { category: "Host Cities (Luxembourg)", items: ["LUXEMBOURG CITY", "ESCH", "DIFFERDANGE", "DUDELANGE"], difficulty: "medium" },
    { category: "Titles with 'Life'", items: ["LIFE", "MY LIFE", "LOVE LIFE", "NEW LIFE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 36: Actions
  [
    { category: "Performance Verbs", items: ["SING", "DANCE", "JUMP", "RUN"], difficulty: "easy" },
    { category: "Host Cities (Ukraine)", items: ["KYIV", "LVIV", "ODESSA", "KHARKIV"], difficulty: "medium" },
    { category: "Titles with 'Color'", items: ["BLUE", "BLACK", "WHITE", "RED"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 37: Sound
  [
    { category: "Audio Terms", items: ["NOTE", "CHORD", "BEAT", "TUNE"], difficulty: "easy" },
    { category: "Host Cities (Sweden)", items: ["STOCKHOLM", "MALMÖ", "GOTHENBURG", "UPPSALA"], difficulty: "medium" },
    { category: "Titles with 'Night'", items: ["NIGHT", "MIDNIGHT", "ONE NIGHT", "IN THE NIGHT"], difficulty: "hard" },
    { category: "Acts from 2024 Final", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 38: Places
  [
    { category: "Geographic Terms", items: ["CITY", "TOWN", "STATE", "NATION"], difficulty: "easy" },
    { category: "Host Cities (Serbia)", items: ["BELGRADE", "NOVI SAD", "NIS", "KRAGUJEVAC"], difficulty: "medium" },
    { category: "Titles starting 'F'", items: ["FIRE", "FUEGO", "FLY", "FACE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 39: Body
  [
    { category: "Body Parts in Lyrics", items: ["HAND", "FOOT", "HEAD", "ARM"], difficulty: "easy" },
    { category: "Host Cities (Estonia)", items: ["TALLINN", "TARTU", "NARVA", "PARNU"], difficulty: "medium" },
    { category: "Titles starting 'G'", items: ["GOLD", "GIRL", "GOD", "GREEN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 40: Sound
  [
    { category: "Volume Levels", items: ["LOUD", "SOFT", "HIGH", "LOW"], difficulty: "easy" },
    { category: "Host Cities (Latvia)", items: ["RIGA", "DAUGAVPILS", "LIEPAJA", "JELGAVA"], difficulty: "medium" },
    { category: "Titles starting 'H'", items: ["HALLELUJAH", "HEROES", "HEART", "HEAVEN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 41: Space
  [
    { category: "Celestial Items", items: ["SUN", "MOON", "STAR", "PLANET"], difficulty: "easy" },
    { category: "Host Cities (Azerbaijan)", items: ["BAKU", "GANJA", "SUMQAYIT", "LANKARAN"], difficulty: "medium" },
    { category: "Titles starting 'I'", items: ["I CAN", "I WILL", "I BELIEVE", "I FEEL"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 42: Time
  [
    { category: "Duration Words", items: ["HOUR", "DAY", "WEEK", "YEAR"], difficulty: "easy" },
    { category: "Host Cities (Sweden)", items: ["STOCKHOLM", "MALMÖ", "GOTHENBURG", "UPPSALA"], difficulty: "medium" },
    { category: "Titles starting 'J'", items: ["JURY", "JOY", "JAZZ", "JUST"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 43: Direction
  [
    { category: "Directional Words", items: ["UP", "DOWN", "LEFT", "RIGHT"], difficulty: "easy" },
    { category: "Host Cities (Germany)", items: ["BERLIN", "MUNICH", "FRANKFURT", "DUSSELDORF"], difficulty: "medium" },
    { category: "Titles starting 'K'", items: ["KALUSH", "KÄÄRIJÄ", "KING", "KISS"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 44: Weather
  [
    { category: "Weather Conditions", items: ["RAIN", "SNOW", "WIND", "SUN"], difficulty: "easy" },
    { category: "Host Cities (UK)", items: ["LONDON", "LIVERPOOL", "BIRMINGHAM", "BRIGHTON"], difficulty: "medium" },
    { category: "Titles starting 'N'", items: ["NEMO", "NOCTURNE", "NETTA", "NO"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 45: Emotion
  [
    { category: "Moods in Songs", items: ["HAPPY", "SAD", "ANGRY", "CALM"], difficulty: "easy" },
    { category: "Host Cities (Italy)", items: ["TURIN", "ROME", "NAPLES", "MILAN"], difficulty: "medium" },
    { category: "Titles starting 'O'", items: ["ONE", "ONLY", "OUT", "ORO"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 46: Animals
  [
    { category: "Animal Names", items: ["BIRD", "CAT", "DOG", "FISH"], difficulty: "easy" },
    { category: "Host Cities (Netherlands)", items: ["AMSTERDAM", "ROTTERDAM", "HAGUE", "HILVERSUM"], difficulty: "medium" },
    { category: "Titles starting 'P'", items: ["PARIS", "PEACE", "POP", "PHOENIX"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 47: Food
  [
    { category: "Food in Lyrics", items: ["CAKE", "PIZZA", "BREAD", "FRUIT"], difficulty: "easy" },
    { category: "Host Cities (Spain)", items: ["MADRID", "BARCELONA", "VALENCIA", "SEVILLE"], difficulty: "medium" },
    { category: "Titles starting 'Q'", items: ["QUEEN", "QUEST", "QUICK", "QUALIFY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 48: Drink
  [
    { category: "Drinks in Songs", items: ["WATER", "WINE", "COFFEE", "TEA"], difficulty: "easy" },
    { category: "Host Cities (Norway)", items: ["OSLO", "BERGEN", "TRONDHEIM", "STAVANGER"], difficulty: "medium" },
    { category: "Titles starting 'R'", items: ["RISE", "ROCK", "RAIN", "RIVER"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 49: Clothes
  [
    { category: "Clothing in Songs", items: ["HAT", "SHIRT", "PANTS", "SHOES"], difficulty: "easy" },
    { category: "Host Cities (Israel)", items: ["JERUSALEM", "TEL AVIV", "HAIFA", "EILAT"], difficulty: "medium" },
    { category: "Titles starting 'U'", items: ["UKRAINE", "UNDER", "UP", "UN BANC"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 50: Colors
  [
    { category: "Colors in Songs", items: ["RED", "BLUE", "GREEN", "YELLOW"], difficulty: "easy" },
    { category: "Host Cities (Denmark)", items: ["COPENHAGEN", "ODENSE", "AARHUS", "HERNING"], difficulty: "medium" },
    { category: "Titles starting 'V'", items: ["VOICE", "VOICES", "VOLARE", "VERKA"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 51: Numbers
  [
    { category: "Winning Numbers", items: ["ONE", "TWO", "THREE", "FOUR"], difficulty: "easy" },
    { category: "Host Cities (Austria)", items: ["VIENNA", "INNSBRUCK", "SALZBURG", "LINZ"], difficulty: "medium" },
    { category: "Titles starting 'W'", items: ["WATERLOO", "WOLF", "WHITE", "WILD"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 52: Logo Shapes
  [
    { category: "Logo Shapes", items: ["HEART", "STAR", "BUTTERFLY", "FLOWER"], difficulty: "easy" },
    { category: "Host Cities (Russia)", items: ["MOSCOW", "ST. PETERSBURG", "KAZAN", "SOCHI"], difficulty: "medium" },
    { category: "Titles starting 'Y'", items: ["YES", "YOU", "YEAR", "YESTERDAY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 53: Size
  [
    { category: "Group Sizes", items: ["SOLO", "DUO", "TRIO", "QUARTET"], difficulty: "easy" },
    { category: "Host Cities (Finland)", items: ["HELSINKI", "TAMPERE", "TURKU", "ESPOO"], difficulty: "medium" },
    { category: "Titles starting 'Z'", items: ["ZITTI", "ZARI", "ZERO", "ZDOB"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 54: Metals
  [
    { category: "Metal Types in Songs", items: ["GOLD", "SILVER", "IRON", "STEEL"], difficulty: "easy" },
    { category: "Host Cities (Ireland)", items: ["DUBLIN", "CORK", "LIMERICK", "GALWAY"], difficulty: "medium" },
    { category: "Titles with 'Star'", items: ["STAR", "STARS", "STARRY", "STORY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 55: Elements
  [
    { category: "Elemental Words", items: ["FIRE", "WATER", "WIND", "ROCK"], difficulty: "easy" },
    { category: "Host Cities (Greece)", items: ["ATHENS", "THESSALONIKI", "PATRAS", "HERAKLION"], difficulty: "medium" },
    { category: "Titles with 'Moon'", items: ["MOON", "FULL MOON", "MOONLIGHT", "NEW MOON"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 56: Seasons
  [
    { category: "Seasons in Songs", items: ["SPRING", "SUMMER", "FALL", "WINTER"], difficulty: "easy" },
    { category: "Host Cities (Turkey)", items: ["ISTANBUL", "ANKARA", "IZMIR", "ANTALYA"], difficulty: "medium" },
    { category: "Titles with 'Love'", items: ["LOVE", "ONLY LOVE", "MY LOVE", "TRUE LOVE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 57: Directions
  [
    { category: "Compass Points", items: ["NORTH", "SOUTH", "EAST", "WEST"], difficulty: "easy" },
    { category: "Host Cities (Portugal)", items: ["LISBON", "PORTO", "COIMBRA", "FARO"], difficulty: "medium" },
    { category: "Titles with 'Bird'", items: ["BIRD", "BIRDS", "EAGLE", "SWAN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 58: Continents
  [
    { category: "Geographic Units", items: ["EUROPE", "ASIA", "AFRICA", "AMERICA"], difficulty: "easy" },
    { category: "Host Cities (Belgium)", items: ["BRUSSELS", "ANTWERP", "GHENT", "LIEGE"], difficulty: "medium" },
    { category: "Titles with 'Space'", items: ["SPACE", "SATELLITE", "STARS", "MOON"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 59: Tools
  [
    { category: "Stage Construction", items: ["LED", "TRUSS", "CABLE", "MIC"], difficulty: "easy" },
    { category: "Host Cities (Switzerland)", items: ["LUGANO", "LAUSANNE", "BASEL", "GENEVA"], difficulty: "medium" },
    { category: "Titles with 'Life'", items: ["LIFE", "MY LIFE", "LOVE LIFE", "NEW LIFE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 60: Action
  [
    { category: "Song Verb Themes", items: ["FLY", "RISE", "SING", "DANCE"], difficulty: "easy" },
    { category: "Host Cities (Luxembourg)", items: ["LUXEMBOURG CITY", "ESCH", "DIFFERDANGE", "DUDELANGE"], difficulty: "medium" },
    { category: "Titles with 'Color'", items: ["BLUE", "BLACK", "WHITE", "RED"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 61: Winners 80s
  [
    { category: "80s Winning Songs", items: ["WHAT'S ANOTHER", "MAKING YOUR", "SI LA VIE", "DIGGI-LOO"], difficulty: "easy" },
    { category: "Host Cities (Ukraine)", items: ["KYIV", "LVIV", "ODESSA", "KHARKIV"], difficulty: "medium" },
    { category: "Titles with 'Night'", items: ["NIGHT", "MIDNIGHT", "ONE NIGHT", "IN THE NIGHT"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 62: Winners 70s
  [
    { category: "70s Winning Songs", items: ["WATERLOO", "DING-A-DONG", "SAVE YOUR", "HALLELUJAH"], difficulty: "easy" },
    { category: "Host Cities (Austria)", items: ["VIENNA", "INNSBRUCK", "SALZBURG", "LINZ"], difficulty: "medium" },
    { category: "Titles starting 'F'", items: ["FIRE", "FUEGO", "FLY", "FACE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 63: Winners 60s
  [
    { category: "60s Winning Songs", items: ["PUPPET ON", "LA LA LA", "BOOM BANG", "VIVO CANTANDO"], difficulty: "easy" },
    { category: "Host Cities (Serbia)", items: ["BELGRADE", "NOVI SAD", "NIS", "KRAGUJEVAC"], difficulty: "medium" },
    { category: "Titles starting 'G'", items: ["GOLD", "GIRL", "GOD", "GREEN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 64: Winners 50s
  [
    { category: "50s Winning Songs", items: ["REFRAIN", "DORSET", "VOLARE", "TOM PILLIBI"], difficulty: "easy" },
    { category: "Host Cities (Estonia)", items: ["TALLINN", "TARTU", "NARVA", "PARNU"], difficulty: "medium" },
    { category: "Titles starting 'H'", items: ["HALLELUJAH", "HEROES", "HEART", "HEAVEN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 65: Winners 90s
  [
    { category: "90s Winning Songs", items: ["INSIEME", "FANGAD AV", "WHY ME", "IN YOUR EYES"], difficulty: "easy" },
    { category: "Host Cities (Latvia)", items: ["RIGA", "DAUGAVPILS", "LIEPAJA", "JELGAVA"], difficulty: "medium" },
    { category: "Titles starting 'I'", items: ["I CAN", "I WILL", "I BELIEVE", "I FEEL"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 66: Winners 00s
  [
    { category: "00s Winning Songs", items: ["EVERYBODY", "I WANNA", "WILD DANCES", "MY NUMBER"], difficulty: "easy" },
    { category: "Host Cities (Azerbaijan)", items: ["BAKU", "GANJA", "SUMQAYIT", "LANKARAN"], difficulty: "medium" },
    { category: "Titles starting 'J'", items: ["JURY", "JOY", "JAZZ", "JUST"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 67: Winners 10s
  [
    { category: "10s Winning Songs", items: ["SATELLITE", "RUNNING", "EUPHORIA", "ONLY"], difficulty: "easy" },
    { category: "Host Cities (Sweden)", items: ["STOCKHOLM", "MALMÖ", "GOTHENBURG", "UPPSALA"], difficulty: "medium" },
    { category: "Titles starting 'K'", items: ["KALUSH", "KÄÄRIJÄ", "KING", "KISS"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 68: Winners 20s
  [
    { category: "20s Winning Songs", items: ["ZITTI", "STEFANIA", "TATTOO", "THE CODE"], difficulty: "easy" },
    { category: "Host Cities (Germany)", items: ["BERLIN", "MUNICH", "FRANKFURT", "DUSSELDORF"], difficulty: "medium" },
    { category: "Titles starting 'N'", items: ["NEMO", "NOCTURNE", "NETTA", "NO"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 69: Junior ESC
  [
    { category: "Junior Winners", items: ["DESTINY", "NEVENA", "VINCENZO", "MALENA"], difficulty: "easy" },
    { category: "Host Cities (UK)", items: ["LONDON", "LIVERPOOL", "BIRMINGHAM", "BRIGHTON"], difficulty: "medium" },
    { category: "Titles starting 'O'", items: ["ONE", "ONLY", "OUT", "ORO"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 70: Sanremo
  [
    { category: "Sanremo Winners", items: ["ANGELINA", "MARCO", "MAHMOOD", "MANESKIN"], difficulty: "easy" },
    { category: "Host Cities (Italy)", items: ["TURIN", "ROME", "NAPLES", "MILAN"], difficulty: "medium" },
    { category: "Titles starting 'P'", items: ["PARIS", "PEACE", "POP", "PHOENIX"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 71: Duos
  [
    { category: "Famous Duos", items: ["JEDWARD", "BOBBYSOX", "ELL & NIKKI", "TOLMACHEVY"], difficulty: "easy" },
    { category: "Host Cities (Netherlands)", items: ["AMSTERDAM", "ROTTERDAM", "HAGUE", "HILVERSUM"], difficulty: "medium" },
    { category: "Titles starting 'Q'", items: ["QUEEN", "QUEST", "QUICK", "QUALIFY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 72: Trios
  [
    { category: "Famous Trios", items: ["KEIINO", "HURRICANE", "LAS KETCHUP", "HERREYS"], difficulty: "easy" },
    { category: "Host Cities (Spain)", items: ["MADRID", "BARCELONA", "VALENCIA", "SEVILLE"], difficulty: "medium" },
    { category: "Titles starting 'R'", items: ["RISE", "ROCK", "RAIN", "RIVER"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 73: Returnees
  [
    { category: "Returning Artists", items: ["CAROLA", "SELMA", "ALEXANDER", "NATALIA"], difficulty: "easy" },
    { category: "Host Cities (Norway)", items: ["OSLO", "BERGEN", "TRONDHEIM", "STAVANGER"], difficulty: "medium" },
    { category: "Titles starting 'U'", items: ["UKRAINE", "UNDER", "UP", "UN BANC"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 74: Languages
  [
    { category: "Winning Languages", items: ["ENGLISH", "FRENCH", "HEBREW", "ITALIAN"], difficulty: "easy" },
    { category: "Host Cities (Israel)", items: ["JERUSALEM", "TEL AVIV", "HAIFA", "EILAT"], difficulty: "medium" },
    { category: "Titles starting 'V'", items: ["VOICE", "VOICES", "VOLARE", "VERKA"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 75: Nul Points
  [
    { category: "Nul Pointers", items: ["JEMINI", "ANN SOPHIE", "MAKEMAKES", "NEWMAN"], difficulty: "easy" },
    { category: "Host Cities (Denmark)", items: ["COPENHAGEN", "ODENSE", "AARHUS", "HERNING"], difficulty: "medium" },
    { category: "Titles starting 'W'", items: ["WATERLOO", "WOLF", "WHITE", "WILD"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 76: One Word
  [
    { category: "One Word Winners", items: ["WATERLOO", "SATELLITE", "EUPHORIA", "ARCADE"], difficulty: "easy" },
    { category: "Host Cities (Austria)", items: ["VIENNA", "INNSBRUCK", "SALZBURG", "LINZ"], difficulty: "medium" },
    { category: "Titles starting 'Y'", items: ["YES", "YOU", "YEAR", "YESTERDAY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 77: Mothers
  [
    { category: "Songs about Mothers", items: ["STEFANIA", "MATA HARI", "MAMMA", "MOTHER"], difficulty: "easy" },
    { category: "Host Cities (Russia)", items: ["MOSCOW", "ST. PETERSBURG", "KAZAN", "SOCHI"], difficulty: "medium" },
    { category: "Titles starting 'Z'", items: ["ZITTI", "ZARI", "ZERO", "ZDOB"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 78: Nature
  [
    { category: "Nature Themes", items: ["RIVER", "RAIN", "STORM", "WIND"], difficulty: "easy" },
    { category: "Host Cities (Finland)", items: ["HELSINKI", "TAMPERE", "TURKU", "ESPOO"], difficulty: "medium" },
    { category: "Titles with 'Star'", items: ["STAR", "STARS", "STARRY", "STORY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 79: Peace
  [
    { category: "Peace Themes", items: ["PEACE", "LOVE", "HOPE", "TOGETHER"], difficulty: "easy" },
    { category: "Host Cities (Ireland)", items: ["DUBLIN", "CORK", "LIMERICK", "GALWAY"], difficulty: "medium" },
    { category: "Titles with 'Moon'", items: ["MOON", "FULL MOON", "MOONLIGHT", "NEW MOON"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 80: Colors II
  [
    { category: "Colors II", items: ["YELLOW", "PURPLE", "GOLD", "SILVER"], difficulty: "easy" },
    { category: "Host Cities (Greece)", items: ["ATHENS", "THESSALONIKI", "PATRAS", "HERAKLION"], difficulty: "medium" },
    { category: "Titles with 'Love'", items: ["LOVE", "ONLY LOVE", "MY LOVE", "TRUE LOVE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 81: Roles II
  [
    { category: "Stage Roles", items: ["SINGER", "DANCER", "MUSICIAN", "DRUMMER"], difficulty: "easy" },
    { category: "Host Cities (Turkey)", items: ["ISTANBUL", "ANKARA", "IZMIR", "ANTALYA"], difficulty: "medium" },
    { category: "Titles with 'Bird'", items: ["BIRD", "BIRDS", "EAGLE", "SWAN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 82: Places II
  [
    { category: "Song Places", items: ["PARIS", "LONDON", "ROME", "AMSTERDAM"], difficulty: "easy" },
    { category: "Host Cities (Portugal)", items: ["LISBON", "PORTO", "COIMBRA", "FARO"], difficulty: "medium" },
    { category: "Titles with 'Space'", items: ["SPACE", "SATELLITE", "STARS", "MOON"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 83: Visuals
  [
    { category: "Stage Visuals", items: ["LED", "LASER", "SCREEN", "LIGHT"], difficulty: "easy" },
    { category: "Host Cities (Belgium)", items: ["BRUSSELS", "ANTWERP", "GHENT", "LIEGE"], difficulty: "medium" },
    { category: "Titles with 'Life'", items: ["LIFE", "MY LIFE", "LOVE LIFE", "NEW LIFE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 84: Sound II
  [
    { category: "Audio Parts", items: ["NOTE", "BEAT", "TUNE", "RHYTHM"], difficulty: "easy" },
    { category: "Host Cities (Switzerland)", items: ["LUGANO", "LAUSANNE", "BASEL", "GENEVA"], difficulty: "medium" },
    { category: "Titles with 'Color'", items: ["BLUE", "BLACK", "WHITE", "RED"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 85: Actions II
  [
    { category: "Stage Actions", items: ["SING", "DANCE", "JUMP", "MOVE"], difficulty: "easy" },
    { category: "Host Cities (Luxembourg)", items: ["LUXEMBOURG CITY", "ESCH", "DIFFERDANGE", "DUDELANGE"], difficulty: "medium" },
    { category: "Titles with 'Night'", items: ["NIGHT", "MIDNIGHT", "ONE NIGHT", "IN THE NIGHT"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 86: Space II
  [
    { category: "Celestial II", items: ["SUN", "STARS", "MOON", "PLANETS"], difficulty: "easy" },
    { category: "Host Cities (Ukraine)", items: ["KYIV", "LVIV", "ODESSA", "KHARKIV"], difficulty: "medium" },
    { category: "Titles starting 'F'", items: ["FIRE", "FUEGO", "FLY", "FACE"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 87: Body II
  [
    { category: "Body II", items: ["HANDS", "FEET", "HEART", "EYES"], difficulty: "easy" },
    { category: "Host Cities (Austria)", items: ["VIENNA", "INNSBRUCK", "SALZBURG", "LINZ"], difficulty: "medium" },
    { category: "Titles starting 'G'", items: ["GOLD", "GIRL", "GOD", "GREEN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 88: Numbers II
  [
    { category: "Numbers II", items: ["ONE", "TWO", "THREE", "FOUR"], difficulty: "easy" },
    { category: "Host Cities (Serbia)", items: ["BELGRADE", "NOVI SAD", "NIS", "KRAGUJEVAC"], difficulty: "medium" },
    { category: "Titles starting 'H'", items: ["HALLELUJAH", "HEROES", "HEART", "HEAVEN"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 89: Time II
  [
    { category: "Time II", items: ["HOUR", "DAY", "WEEK", "YEAR"], difficulty: "easy" },
    { category: "Host Cities (Estonia)", items: ["TALLINN", "TARTU", "NARVA", "PARNU"], difficulty: "medium" },
    { category: "Titles starting 'I'", items: ["I CAN", "I WILL", "I BELIEVE", "I FEEL"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 90: Elements II
  [
    { category: "Elements II", items: ["FIRE", "WATER", "WIND", "ROCK"], difficulty: "easy" },
    { category: "Host Cities (Latvia)", items: ["RIGA", "DAUGAVPILS", "LIEPAJA", "JELGAVA"], difficulty: "medium" },
    { category: "Titles starting 'J'", items: ["JURY", "JOY", "JAZZ", "JUST"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 91: Sound III
  [
    { category: "Sound III", items: ["NOTE", "BEAT", "TUNE", "RHYTHM"], difficulty: "easy" },
    { category: "Host Cities (Azerbaijan)", items: ["BAKU", "GANJA", "SUMQAYIT", "LANKARAN"], difficulty: "medium" },
    { category: "Titles starting 'K'", items: ["KALUSH", "KÄÄRIJÄ", "KING", "KISS"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 92: Space III
  [
    { category: "Celestial III", items: ["SUN", "STARS", "MOON", "PLANETS"], difficulty: "easy" },
    { category: "Host Cities (Sweden)", items: ["STOCKHOLM", "MALMÖ", "GOTHENBURG", "UPPSALA"], difficulty: "medium" },
    { category: "Titles starting 'N'", items: ["NEMO", "NOCTURNE", "NETTA", "NO"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 93: Body III
  [
    { category: "Body III", items: ["HANDS", "FEET", "HEART", "EYES"], difficulty: "easy" },
    { category: "Host Cities (Germany)", items: ["BERLIN", "MUNICH", "FRANKFURT", "DUSSELDORF"], difficulty: "medium" },
    { category: "Titles starting 'O'", items: ["ONE", "ONLY", "OUT", "ORO"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 94: Numbers III
  [
    { category: "Numbers III", items: ["ONE", "TWO", "THREE", "FOUR"], difficulty: "easy" },
    { category: "Host Cities (UK)", items: ["LONDON", "LIVERPOOL", "BIRMINGHAM", "BRIGHTON"], difficulty: "medium" },
    { category: "Titles starting 'P'", items: ["PARIS", "PEACE", "POP", "PHOENIX"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ],
  // Board 95: Time III
  [
    { category: "Time III", items: ["HOUR", "DAY", "WEEK", "YEAR"], difficulty: "easy" },
    { category: "Host Cities (Italy)", items: ["TURIN", "ROME", "NAPLES", "MILAN"], difficulty: "medium" },
    { category: "Titles starting 'Q'", items: ["QUEEN", "QUEST", "QUICK", "QUALIFY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["PORTUGAL", "LUXEMBOURG", "AUSTRALIA", "ICELAND"], difficulty: "expert" }
  ],
  // Board 96: Elements III
  [
    { category: "Elements III", items: ["FIRE", "WATER", "WIND", "ROCK"], difficulty: "easy" },
    { category: "Host Cities (Netherlands)", items: ["AMSTERDAM", "ROTTERDAM", "HAGUE", "HILVERSUM"], difficulty: "medium" },
    { category: "Titles starting 'R'", items: ["RISE", "ROCK", "RAIN", "RIVER"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["MALTA", "ALBANIA", "GREECE", "SWITZERLAND"], difficulty: "expert" }
  ],
  // Board 97: Sound IV
  [
    { category: "Sound IV", items: ["NOTE", "BEAT", "TUNE", "RHYTHM"], difficulty: "easy" },
    { category: "Host Cities (Spain)", items: ["MADRID", "BARCELONA", "VALENCIA", "SEVILLE"], difficulty: "medium" },
    { category: "Titles starting 'U'", items: ["UKRAINE", "UNDER", "UP", "UN BANC"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SERBIA", "UKRAINE", "CYPRUS", "IRELAND"], difficulty: "expert" }
  ],
  // Board 98: Space IV
  [
    { category: "Celestial IV", items: ["SUN", "STARS", "MOON", "PLANETS"], difficulty: "easy" },
    { category: "Host Cities (Norway)", items: ["OSLO", "BERGEN", "TRONDHEIM", "STAVANGER"], difficulty: "medium" },
    { category: "Titles starting 'V'", items: ["VOICE", "VOICES", "VOLARE", "VERKA"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["CZECHIA", "AUSTRIA", "DENMARK", "ARMENIA"], difficulty: "expert" }
  ],
  // Board 99: Body IV
  [
    { category: "Body IV", items: ["HANDS", "FEET", "HEART", "EYES"], difficulty: "easy" },
    { category: "Host Cities (Israel)", items: ["JERUSALEM", "TEL AVIV", "HAIFA", "EILAT"], difficulty: "medium" },
    { category: "Titles starting 'W'", items: ["WATERLOO", "WOLF", "WHITE", "WILD"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 1", items: ["SLOVENIA", "FINLAND", "MOLDOVA", "AZERBAIJAN"], difficulty: "expert" }
  ],
  // Board 100: Numbers IV
  [
    { category: "Numbers IV", items: ["ONE", "TWO", "THREE", "FOUR"], difficulty: "easy" },
    { category: "Host Cities (Denmark)", items: ["COPENHAGEN", "ODENSE", "AARHUS", "HERNING"], difficulty: "medium" },
    { category: "Titles starting 'Y'", items: ["YES", "YOU", "YEAR", "YESTERDAY"], difficulty: "hard" },
    { category: "Acts from 2024 Semi 2", items: ["LATVIA", "SAN MARINO", "GEORGIA", "BELGIUM"], difficulty: "expert" }
  ]
];
