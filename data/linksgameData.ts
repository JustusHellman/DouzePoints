import { ConnectionsGroup } from './types.ts';

export const PUZZLES: ConnectionsGroup[][] = [
  [
    { category: "Eurovision winners (2010s)", items: ["EUPHORIA", "HEROES", "TOY", "ARCADE"], difficulty: "easy" },
    { category: "Countries that have hosted 3+ times", items: ["UNITED KINGDOM", "IRELAND", "SWEDEN", "ISRAEL"], difficulty: "medium" },
    { category: "Countries that have participated but never won (as of 2024)", items: ["ICELAND", "LITHUANIA", "MALTA", "SAN MARINO"], difficulty: "hard" },
    { category: "Winners performed in a language other than English (2000–2023)", items: ["MOLITVA", "AMAR PELOS DOIS", "ZITTI E BUONI", "STEFANIA"], difficulty: "expert" }
  ],
  [
    { category: "Winning songs with one-word titles", items: ["TATTOO", "SATELLITE", "FAIRYTALE", "BELIEVE"], difficulty: "easy" },
    { category: "BBC-hosted editions outside London", items: ["BRIGHTON", "HARROGATE", "BIRMINGHAM", "LIVERPOOL"], difficulty: "medium" },
    { category: "Countries debuting after Yugoslavia's breakup", items: ["BOSNIA AND HERZEGOVINA", "CROATIA", "SLOVENIA", "NORTH MACEDONIA"], difficulty: "hard" },
    { category: "Countries winning with non-English songs (since 2000)", items: ["SERBIA", "PORTUGAL", "ITALY", "UKRAINE"], difficulty: "expert" }
  ],
  [
    { category: "Bands/collectives that won Eurovision", items: ["ABBA", "LORDI", "MANESKIN", "KALUSH ORCHESTRA"], difficulty: "easy" },
    { category: "Titles with repeated syllables", items: ["CHA CHA CHA", "HABA HABA", "LOCO LOCO", "LA LA LOVE"], difficulty: "medium" },
    { category: "Host cities beginning with 'M'", items: ["MALMO", "MOSCOW", "MUNICH", "MADRID"], difficulty: "hard" },
    { category: "3rd-place finishers in the 2010s (song titles)", items: ["PLAYING WITH FIRE", "POPULAR", "NIJE LJUBAV STVAR", "UNDO"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision slogans", items: ["COME TOGETHER", "DARE TO DREAM", "OPEN UP", "UNITED BY MUSIC"], difficulty: "easy" },
    { category: "Cities that have hosted multiple times", items: ["DUBLIN", "STOCKHOLM", "COPENHAGEN", "OSLO"], difficulty: "medium" },
    { category: "Artists who performed barefoot on the ESC stage", items: ["LOREEN", "EMMELIE DE FOREST", "SANDIE SHAW", "REMEDIOS AMAYA"], difficulty: "hard" },
    { category: "National selection shows", items: ["MELODIFESTIVALEN", "SANREMO", "MELODI GRAND PRIX", "DORA"], difficulty: "expert" }
  ],
  [
    { category: "1970s Eurovision-winning songs", items: ["WATERLOO", "SAVE YOUR KISSES FOR ME", "A-BA-NI-BI", "HALLELUJAH"], difficulty: "easy" },
    { category: "National finals (names)", items: ["FESTIVAL DA CANCAO", "SONGVAKEPPNIN", "SUPERNOVA", "EESTI LAUL"], difficulty: "medium" },
    { category: "Countries that debuted in 1994", items: ["ESTONIA", "HUNGARY", "POLAND", "RUSSIA"], difficulty: "hard" },
    { category: "Countries that have hosted exactly once in the 21st century", items: ["GERMANY", "PORTUGAL", "THE NETHERLANDS", "ITALY"], difficulty: "expert" }
  ],
  [
    { category: "Host cities that are national capitals", items: ["KYIV", "ATHENS", "BAKU", "BELGRADE"], difficulty: "easy" },
    { category: "Non-French countries with French-titled entries", items: ["NE PARTEZ PAS SANS MOI", "L'AMOUR EST BLEU", "APRES TOI", "POUPEE DE CIRE, POUPEE DE SON"], difficulty: "medium" },
    { category: "Host broadcasters (2018–2023)", items: ["RTP", "KAN", "AVROTROS", "BBC"], difficulty: "hard" },
    { category: "Entries with numbers in the title", items: ["ONE LIFE", "THREE MINUTES TO EARTH", "ZERO GRAVITY", "1944"], difficulty: "expert" }
  ],
  [
    { category: "Song titles including 'Love'", items: ["LOVE SHINE A LIGHT", "LOVE INJECTED", "LOVEWAVE", "LOVE KILLS"], difficulty: "easy" },
    { category: "Artists with numerals in their name", items: ["3+2", "4FUN", "OG3NE", "2B"], difficulty: "medium" },
    { category: "Host venues (arenas)", items: ["OLYMPIAHALLE", "B&W HALLERNE", "WIENER STADTHALLE", "ALTICE ARENA"], difficulty: "hard" },
    { category: "2010s entries performed mostly in a non-English language", items: ["SUUS", "KEDVESEM", "LA FORZA", "SOLDI"], difficulty: "expert" }
  ],
  [
    { category: "Teenage Eurovision winners (artists)", items: ["SANDRA KIM", "LENA", "NICOLE", "GIGLIOLA CINQUETTI"], difficulty: "easy" },
    { category: "Duos that won Eurovision", items: ["BOBBYSOX!", "SECRET GARDEN", "OLSEN BROTHERS", "ELL & NIKKI"], difficulty: "medium" },
    { category: "Titles with 'Dance/Dancing'", items: ["DANCING LASHA TUMBAI", "DANCE YOU OFF", "DANCING IN THE RAIN", "DANCE ALONE"], difficulty: "hard" },
    { category: "Host cities in the former USSR", items: ["MOSCOW", "KYIV", "BAKU", "TALLINN"], difficulty: "expert" }
  ],
  [
    { category: "Big Five countries", items: ["FRANCE", "GERMANY", "ITALY", "SPAIN", "UNITED KINGDOM"], difficulty: "easy" },
    { category: "Participants outside geographical Europe", items: ["ISRAEL", "AZERBAIJAN", "ARMENIA", "AUSTRALIA"], difficulty: "medium" },
    { category: "Exclamation marks in the song title", items: ["HEY MAMMA!", "YODEL IT!", "OPA!", "HVALA, NE!"], difficulty: "hard" },
    { category: "Host cities beginning with 'B'", items: ["BELGRADE", "BAKU", "BIRMINGHAM", "BERGEN"], difficulty: "expert" }
  ],
  [
    { category: "Host cities beginning with 'L'", items: ["LISBON", "LONDON", "LAUSANNE", "LUGANO"], difficulty: "easy" },
    { category: "Color words in the title", items: ["GOLDEN BOY", "BLACKBIRD", "BLUE AND RED", "BLACK SMOKE"], difficulty: "medium" },
    { category: "Countries with wins both before and after 1990", items: ["IRELAND", "UNITED KINGDOM", "SWEDEN", "ISRAEL"], difficulty: "hard" },
    { category: "1950s debutants that still compete", items: ["SWITZERLAND", "THE NETHERLANDS", "GERMANY", "BELGIUM"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (2000–2009)", items: ["EVERYWAY THAT I CAN", "WILD DANCES", "BELIEVE", "FAIRYTALE"], difficulty: "easy" },
    { category: "Countries with consecutive wins", items: ["IRELAND", "LUXEMBOURG", "ISRAEL", "SPAIN"], difficulty: "medium" },
    { category: "Countries that debuted in the 2000s", items: ["ALBANIA", "ANDORRA", "AZERBAIJAN", "SERBIA AND MONTENEGRO"], difficulty: "hard" },
    { category: "Staging built around projections/LED interaction", items: ["HEROES", "YOU ARE THE ONLY ONE", "LA FORZA", "O MIE"], difficulty: "expert" }
  ],
  [
    { category: "Returning artists for the same country", items: ["LOREEN", "DIMA BILAN", "IRA LOSCO", "VALENTINA MONETTA"], difficulty: "easy" },
    { category: "Countries whose first win was in the 21st century", items: ["UKRAINE", "AZERBAIJAN", "PORTUGAL", "SERBIA"], difficulty: "medium" },
    { category: "Titles about space/physics", items: ["SPACE", "SPACE MAN", "LAIKA PARTY", "GRAVITY"], difficulty: "hard" },
    { category: "Countries absent from Eurovision 2022–2024", items: ["TURKEY", "HUNGARY", "BELARUS", "RUSSIA"], difficulty: "expert" }
  ],
  [
    { category: "1969 four-way tie winners (song titles)", items: ["BOOM BANG-A-BANG", "DE TROUBADOUR", "UN JOUR, UN ENFANT", "VIVO CANTANDO"], difficulty: "easy" },
    { category: "Countries with population under 1 million", items: ["ICELAND", "MALTA", "SAN MARINO", "MONTENEGRO"], difficulty: "medium" },
    { category: "Titles with repeated/nonsense syllables", items: ["DIGGI-LOO DIGGI-LEY", "DING-A-DONG", "A-BA-NI-BI", "LA LA LOVE"], difficulty: "hard" },
    { category: "Former Yugoslav republics", items: ["SLOVENIA", "CROATIA", "BOSNIA AND HERZEGOVINA", "NORTH MACEDONIA"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (1990s)", items: ["ROCK 'N' ROLL KIDS", "NOCTURNE", "LOVE SHINE A LIGHT", "TAKE ME TO YOUR HEAVEN"], difficulty: "easy" },
    { category: "National selection shows", items: ["UMK", "A DAL", "BEOVIZIJA", "DESTINATION EUROVISION"], difficulty: "medium" },
    { category: "Sibling acts at Eurovision", items: ["OLSEN BROTHERS", "TOLMACHEVY SISTERS", "JEDWARD", "TURALTURANX"], difficulty: "hard" },
    { category: "Titles with numbers spelled out", items: ["ONE LIFE", "ONE THING I SHOULD HAVE DONE", "TEN YEARS", "THREE MINUTES TO EARTH"], difficulty: "expert" }
  ],
  [
    { category: "2020 entries that never got to compete", items: ["THINK ABOUT THINGS", "FAI RUMORE", "TEARS GETTING SOBER", "UNO"], difficulty: "easy" },
    { category: "Countries currently inactive as of 2024", items: ["TURKEY", "ANDORRA", "BOSNIA AND HERZEGOVINA", "MONACO"], difficulty: "medium" },
    { category: "Founding participants in 1956", items: ["THE NETHERLANDS", "SWITZERLAND", "FRANCE", "ITALY"], difficulty: "hard" },
    { category: "National-final winners that didn't make the ESC stage", items: ["MOMENT OF SILENCE", "SIREN SONG", "FLAME IS BURNING", "YA NAUCHU TEBYA"], difficulty: "expert" }
  ],
  [
    { category: "Grand Final runners-up (2021–2024)", items: ["VOILA", "SPACE MAN", "CHA CHA CHA", "RIM TIM TAGI DIM"], difficulty: "easy" },
    { category: "Participating countries in Western Asia", items: ["ISRAEL", "AZERBAIJAN", "ARMENIA", "GEORGIA"], difficulty: "medium" },
    { category: "Countries whose capitals have hosted Eurovision", items: ["GREECE", "SERBIA", "NORWAY", "PORTUGAL"], difficulty: "hard" },
    { category: "Song titles with a question mark", items: ["WHY ME?", "IS IT TRUE?", "WHERE ARE YOU?", "WHAT ABOUT MY DREAMS?"], difficulty: "expert" }
  ],
  [
    { category: "Non-capital host cities", items: ["BRIGHTON", "HARROGATE", "MALMO", "THE HAGUE"], difficulty: "easy" },
    { category: "Countries bordering the Baltic Sea", items: ["ESTONIA", "LATVIA", "LITHUANIA", "POLAND"], difficulty: "medium" },
    { category: "Countries with 'land' in their English name", items: ["FINLAND", "ICELAND", "IRELAND", "THE NETHERLANDS"], difficulty: "hard" },
    { category: "Song titles containing 'Light'", items: ["LOVE SHINE A LIGHT", "CITY LIGHTS", "LIGHTS OFF", "LIGHT ME UP"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (2021–2024)", items: ["ZITTI E BUONI", "STEFANIA", "TATTOO", "THE CODE"], difficulty: "easy" },
    { category: "Countries that have won exactly once (as of 2024)", items: ["GREECE", "TURKEY", "PORTUGAL", "AZERBAIJAN"], difficulty: "medium" },
    { category: "Acts who competed at both Junior Eurovision and Eurovision", items: ["DESTINY", "TOLMACHEVY SISTERS", "STEFANIA", "NEVENA BOZOVIC"], difficulty: "hard" },
    { category: "Countries that have participated but never won (as of 2024)", items: ["CYPRUS", "ARMENIA", "ROMANIA", "GEORGIA"], difficulty: "expert" }
  ],
  [
    { category: "National selection shows (Nordic focus)", items: ["MELODIFESTIVALEN", "MELODI GRAND PRIX", "UMK", "SONGVAKEPPNIN"], difficulty: "easy" },
    { category: "Countries first appearing in the 1990s", items: ["SLOVENIA", "CROATIA", "BOSNIA AND HERZEGOVINA", "NORTH MACEDONIA"], difficulty: "medium" },
    { category: "Entries notable for instrumental solos on stage", items: ["FAIRYTALE", "BELIEVE", "NOCTURNE", "LOVEWAVE"], difficulty: "hard" },
    { category: "Countries with both a win and a hosting in the 2010s", items: ["SWEDEN", "AZERBAIJAN", "ISRAEL", "PORTUGAL"], difficulty: "expert" }
  ],
  [
    { category: "Host cities beginning with 'T'", items: ["TEL AVIV", "TURIN", "TALLINN", "THE HAGUE"], difficulty: "easy" },
    { category: "Countries using Cyrillic as an official script", items: ["RUSSIA", "BELARUS", "SERBIA", "NORTH MACEDONIA"], difficulty: "medium" },
    { category: "Countries whose capitals begin with 'B'", items: ["GERMANY", "ROMANIA", "AZERBAIJAN", "SERBIA"], difficulty: "hard" },
    { category: "Folk meets pop: entries blending traditional elements", items: ["SHUM", "SPIRIT IN THE SKY", "BOONIKA BATE DOBA", "TRENULETUL"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (1980s)", items: ["MAKING YOUR MIND UP", "HOLD ME NOW", "NE PARTEZ PAS SANS MOI", "EIN BISSCHEN FRIEDEN"], difficulty: "easy" },
    { category: "Netta song words", items: ["TOY", "CHICKEN", "STUPID", "BOY"], difficulty: "medium" },
    { category: "Mixed-gender duos at Eurovision (artists)", items: ["ELL & NIKKI", "THE COMMON LINNETS", "KOIT TOOME & LAURA", "STIG RASTA & ELINA BORN"], difficulty: "hard" },
    { category: "Countries with Eurovision wins both before and after 2000", items: ["SWEDEN", "ISRAEL", "ITALY", "THE NETHERLANDS"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (2000s)", items: ["FLY ON THE WINGS OF LOVE", "I WANNA", "MY NUMBER ONE", "HARD ROCK HALLELUJAH"], difficulty: "easy" },
    { category: "Participating countries in the Caucasus region", items: ["ARMENIA", "AZERBAIJAN", "GEORGIA", "RUSSIA"], difficulty: "medium" },
    { category: "Entries disqualified/removed", items: ["JOOST KLEIN", "ANNA ODOBESCU", "THE SOCIAL NETWORK SONG", "DON'T PLAY THAT SONG AGAIN"], difficulty: "hard" },
    { category: "Host cities on a sea coast", items: ["LISBON", "TEL AVIV", "BAKU", "CANNES"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (2010s)", items: ["ONLY TEARDROPS", "RISE LIKE A PHOENIX", "HEROES", "ARCADE"], difficulty: "easy" },
    { category: "Eurovision slogans (set)", items: ["SHARE THE MOMENT", "FEEL YOUR HEART BEAT!", "JOIN US", "UNITED BY MUSIC"], difficulty: "medium" },
    { category: "Returning artists (second attempt or more)", items: ["ZELJKO JOKSIMOVIC", "ALEXANDER RYBAK", "IRA LOSCO", "VALENTINA MONETTA"], difficulty: "hard" },
    { category: "Winners who topped both jury and televote (since 2009)", items: ["EUPHORIA", "SATELLITE", "AMAR PELOS DOIS", "TATTOO"], difficulty: "expert" }
  ],
  [
    { category: "Grand Final runners-up (2010s)", items: ["WE COULD BE THE SAME", "MADNESS OF LOVE", "PARTY FOR EVERYBODY", "A MILLION VOICES"], difficulty: "easy" },
    { category: "Mediterranean-bordering countries that have won Eurovision", items: ["SPAIN", "ITALY", "FRANCE", "ISRAEL"], difficulty: "medium" },
    { category: "Balkan national selection shows", items: ["BEOVIZIJA", "DORA", "FESTIVALI I KENGES", "MONTEVIZIJA"], difficulty: "hard" },
    { category: "Host cities beginning with 'B'", items: ["BELGRADE", "BAKU", "BIRMINGHAM", "BERGEN"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (1960s)", items: ["NON HO L'ETA", "POUPEE DE CIRE, POUPEE DE SON", "MERCI, CHERIE", "LA, LA, LA"], difficulty: "easy" },
    { category: "Titles with 'Dance/Dancing'", items: ["DANCE YOU OFF", "DANCING LASHA TUMBAI", "DANCING IN THE RAIN", "DANCE ALONE"], difficulty: "medium" },
    { category: "Artists with diacritics in their credited name", items: ["MANS ZELMERLOW", "DADI FREYR", "SEBASTIEN TELLIER", "ZELJKO JOKSIMOVIC"], difficulty: "hard" },
    { category: "Countries that debuted in the 1990s", items: ["SLOVENIA", "CROATIA", "BOSNIA AND HERZEGOVINA", "NORTH MACEDONIA"], difficulty: "expert" }
  ],
  [
    { category: "Host cities that are national capitals (set 2)", items: ["OSLO", "ATHENS", "VIENNA", "BAKU"], difficulty: "easy" },
    { category: "Titles beginning with 'If'", items: ["IF LOVE WAS A CRIME", "IF I HAD YOUR LOVE", "IF I WERE SORRY", "IF WE ALL GIVE A LITTLE"], difficulty: "medium" },
    { category: "Countries with a Black Sea coastline", items: ["BULGARIA", "ROMANIA", "GEORGIA", "UKRAINE"], difficulty: "hard" },
    { category: "Eurovision editions with three presenters", items: ["OSLO 2010", "DUSSELDORF 2011", "VIENNA 2015", "KYIV 2017"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (2020s)", items: ["ZITTI E BUONI", "STEFANIA", "TATTOO", "THE CODE"], difficulty: "easy" },
    { category: "Song titles with 'Light/Lights'", items: ["CITY LIGHTS", "LIGHTS OFF", "LIGHT ME UP", "LOVE SHINE A LIGHT"], difficulty: "medium" },
    { category: "Entries featuring rap sections", items: ["YODEL IT!", "IGRANKA", "TRENULETUL", "CHA CHA CHA"], difficulty: "hard" },
    { category: "Countries that have participated but never won (as of 2024)", items: ["CYPRUS", "ROMANIA", "ICELAND", "MALTA"], difficulty: "expert" }
  ],
  [
    { category: "Winning songs with one-word titles (set)", items: ["TATTOO", "ARCADE", "HEROES", "SATELLITE"], difficulty: "easy" },
    { category: "Cities that have hosted multiple times (set)", items: ["JERUSALEM", "COPENHAGEN", "STOCKHOLM", "DUBLIN"], difficulty: "medium" },
    { category: "Titles with 'Run/Running'", items: ["RUN AWAY", "RUNNING SCARED", "RUNNING", "RUN WITH THE LIONS"], difficulty: "hard" },
    { category: "Countries with non-Indo-European official languages", items: ["FINLAND", "HUNGARY", "ESTONIA", "GEORGIA"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners (1990s)", items: ["INSIEME: 1992", "ROCK 'N' ROLL KIDS", "NOCTURNE", "LOVE SHINE A LIGHT"], difficulty: "easy" },
    { category: "Song titles with a question mark", items: ["WHY ME?", "IS IT TRUE?", "WHAT ABOUT MY DREAMS?", "WHERE ARE YOU?"], difficulty: "medium" },
    { category: "Titles starting with 'You'", items: ["YOU", "YOU ARE THE ONLY ONE", "YOU LET ME WALK ALONE", "YOU AND ME"], difficulty: "hard" },
    { category: "Countries that have won exactly once (as of 2024)", items: ["FINLAND", "ESTONIA", "LATVIA", "RUSSIA"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners that also hit UK No.1", items: ["WATERLOO", "PUPPET ON A STRING", "SAVE YOUR KISSES FOR ME", "MAKING YOUR MIND UP"], difficulty: "easy" },
    { category: "Song titles with 'Heart'", items: ["MY HEART GOES BOOM", "MY HEART IS YOURS", "YOUR HEART BELONGS TO ME", "HEARTBEAT"], difficulty: "medium" },
    { category: "Iberian national selections", items: ["BENIDORM FEST", "FESTIVAL DA CANCAO", "OBJETIVO EUROVISION", "OPERACION TRIUNFO"], difficulty: "hard" },
    { category: "Countries with a land border to exactly one Eurovision country", items: ["PORTUGAL", "IRELAND", "DENMARK", "SAN MARINO"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision acts that went viral/meme status", items: ["SUNSTROKE PROJECT", "VERKA SERDUCHKA", "BURANOVSKIYE BABUSHKI", "DADI OG GAGNAMAGNID"], difficulty: "easy" },
    { category: "Cities that hosted both Eurovision and the Olympics", items: ["ATHENS", "MOSCOW", "LONDON", "TURIN"], difficulty: "medium" },
    { category: "Titles referencing fire", items: ["PLAYING WITH FIRE", "FUEGO", "ON FIRE", "THE FIRE IN YOUR EYES"], difficulty: "hard" },
    { category: "Winners with major international chart success", items: ["ABBA", "CELINE DION", "MANESKIN", "LOREEN"], difficulty: "expert" }
  ],
  [
    { category: "Winners with titles starting with 'A'", items: ["ARCADE", "AMAR PELOS DOIS", "A-BA-NI-BI", "ALL KINDS OF EVERYTHING"], difficulty: "easy" },
    { category: "Song titles beginning with 'We'", items: ["WE ARE THE WINNERS", "WE COULD BE THE SAME", "WE GOT LOVE", "WE ARE THE HEROES"], difficulty: "medium" },
    { category: "Eurovision winners who returned as contestants", items: ["JOHNNY LOGAN", "LOREEN", "ALEXANDER RYBAK", "DANA INTERNATIONAL"], difficulty: "hard" },
    { category: "Televote winners who didn't win overall", items: ["GRANDE AMORE", "YOU ARE THE ONLY ONE", "SPIRIT IN THE SKY", "RIM TIM TAGI DIM"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 2000s", items: ["EVERYBODY", "WILD DANCES", "MY NUMBER ONE", "HARD ROCK HALLELUJAH"], difficulty: "easy" },
    { category: "Countries that won within five contests of debut", items: ["SERBIA", "UKRAINE", "AZERBAIJAN", "LATVIA"], difficulty: "medium" },
    { category: "Songs that got zero points", items: ["DSCHINGHIS KHAN", "A MESSAGE TO YOUR HEART", "LADIES FIRST", "ENCORE"], difficulty: "hard" },
    { category: "Countries with consecutive wins", items: ["IRELAND", "LUXEMBOURG", "ISRAEL", "SPAIN"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision slogans", items: ["BUILDING BRIDGES", "COME TOGETHER", "DARE TO DREAM", "OPEN UP"], difficulty: "easy" },
    { category: "Nordic participating countries", items: ["DENMARK", "FINLAND", "ICELAND", "NORWAY"], difficulty: "medium" },
    { category: "Folk meets pop on the ESC stage", items: ["SHUM", "ORO", "LANE MOJE", "SPIRIT IN THE SKY"], difficulty: "hard" },
    { category: "Countries with five or more wins", items: ["IRELAND", "SWEDEN", "UNITED KINGDOM", "FRANCE"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 2010s", items: ["ONLY TEARDROPS", "RISE LIKE A PHOENIX", "AMAR PELOS DOIS", "TOY"], difficulty: "easy" },
    { category: "Song titles with Heart", items: ["HEARTBEAT", "LISTEN TO YOUR HEARTBEATS", "MY HEART IS YOURS", "MY HEART GOES BOOM"], difficulty: "medium" },
    { category: "Countries whose capital host city is coastal", items: ["GREECE", "DENMARK", "PORTUGAL", "AZERBAIJAN"], difficulty: "hard" },
    { category: "Artists who performed barefoot on stage", items: ["EMMELIE DE FOREST", "LOREEN", "SANDIE SHAW", "DIMA BILAN"], difficulty: "expert" }
  ],
  [
    { category: "Host cities beginning with M", items: ["MALMO", "MOSCOW", "MADRID", "MUNICH"], difficulty: "easy" },
    { category: "Countries participating in Western Asia", items: ["ISRAEL", "AZERBAIJAN", "ARMENIA", "GEORGIA"], difficulty: "medium" },
    { category: "Countries that debuted in 1994", items: ["ESTONIA", "HUNGARY", "LITHUANIA", "POLAND"], difficulty: "hard" },
    { category: "Entries featuring rap sections", items: ["IGRANKA", "YODEL IT!", "LIE TO ME", "TRENULETUL"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 1960s", items: ["NON HO L'ETA", "POUPEE DE CIRE, POUPEE DE SON", "PUPPET ON A STRING", "BOOM BANG-A-BANG"], difficulty: "easy" },
    { category: "Host cities that are national capitals", items: ["DUBLIN", "JERUSALEM", "ROME", "MOSCOW"], difficulty: "medium" },
    { category: "Countries that hosted multiple times", items: ["IRELAND", "UNITED KINGDOM", "SWEDEN", "THE NETHERLANDS"], difficulty: "hard" },
    { category: "Countries currently inactive as of 2024", items: ["TURKEY", "ANDORRA", "BOSNIA AND HERZEGOVINA", "MONACO"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winning duos", items: ["ELL & NIKKI", "OLSEN BROTHERS", "BOBBYSOX!", "SECRET GARDEN"], difficulty: "easy" },
    { category: "Titles beginning with My", items: ["MY NUMBER ONE", "MY LUCKY DAY", "MY FRIEND", "MY STAR"], difficulty: "medium" },
    { category: "Countries with population under one million", items: ["ICELAND", "MALTA", "SAN MARINO", "MONTENEGRO"], difficulty: "hard" },
    { category: "Countries that have never won", items: ["ARMENIA", "CYPRUS", "ROMANIA", "GEORGIA"], difficulty: "expert" }
  ],
  [
    { category: "Participants outside geographical Europe", items: ["ISRAEL", "AZERBAIJAN", "ARMENIA", "AUSTRALIA"], difficulty: "easy" },
    { category: "Viral or meme-status Eurovision acts", items: ["SUNSTROKE PROJECT", "VERKA SERDUCHKA", "DADI OG GAGNAMAGNID", "BURANOVSKIYE BABUSHKI"], difficulty: "medium" },
    { category: "Bird or creature themed titles", items: ["BIRDS", "BLACKBIRD", "BUTTERFLIES", "RISE LIKE A PHOENIX"], difficulty: "hard" },
    { category: "Countries bordering the Baltic Sea", items: ["ESTONIA", "LATVIA", "LITHUANIA", "POLAND"], difficulty: "expert" }
  ],
  [
    { category: "Winning songs with one-word titles", items: ["ARCADE", "EUPHORIA", "SATELLITE", "TATTOO"], difficulty: "easy" },
    { category: "Countries using Cyrillic as an official script", items: ["RUSSIA", "BELARUS", "SERBIA", "NORTH MACEDONIA"], difficulty: "medium" },
    { category: "Titles with Run or Running", items: ["RUN AWAY", "RUN WITH THE LIONS", "RUNNING", "RUNNING SCARED"], difficulty: "hard" },
    { category: "Countries with wins before and after 2000", items: ["SWEDEN", "THE NETHERLANDS", "ISRAEL", "ITALY"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 1990s", items: ["INSIEME 1992", "ROCK 'N' ROLL KIDS", "NOCTURNE", "LOVE SHINE A LIGHT"], difficulty: "easy" },
    { category: "Top five countries in 2021", items: ["ITALY", "FRANCE", "SWITZERLAND", "UKRAINE"], difficulty: "medium" },
    { category: "Titles beginning with Love", items: ["LOVE INJECTED", "LOVE KILLS", "LOVE IS BLIND", "LOVE ME BACK"], difficulty: "hard" },
    { category: "Televote winners who did not win overall", items: ["GRANDE AMORE", "YOU ARE THE ONLY ONE", "SPIRIT IN THE SKY", "RIM TIM TAGI DIM"], difficulty: "expert" }
  ],
  [
    { category: "Host cities beginning with B", items: ["BAKU", "BELGRADE", "BIRMINGHAM", "BERGEN"], difficulty: "easy" },
    { category: "Countries with population under one million", items: ["ICELAND", "MALTA", "SAN MARINO", "MONTENEGRO"], difficulty: "medium" },
    { category: "Titles with Time", items: ["TIME", "IT'S MY TME", "THIS TIME", "A MATTER OF TIME"], difficulty: "hard" },
    { category: "Founding participants in 1956", items: ["THE NETHERLANDS", "SWITZERLAND", "FRANCE", "ITALY"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winner bands and collectives", items: ["TEACH-IN", "BROTHERHOOD OF MAN", "BUCKS FIZZ", "KALUSH ORCHESTRA"], difficulty: "easy" },
    { category: "Returning artists for the same country", items: ["ZELJKO JOKSIMOVIC", "CAROLA", "IRA LOSCO", "VALENTINA MONETTA"], difficulty: "medium" },
    { category: "Color words in the title", items: ["GOLDEN BOY", "BLACK SMOKE", "BLUE AND RED", "BLACKBIRD"], difficulty: "hard" },
    { category: "Countries winning with non-English songs since 2000", items: ["SERBIA", "PORTUGAL", "ITALY", "UKRAINE"], difficulty: "expert" }
  ],
  [
    { category: "Winners topping both jury and televote since 2009", items: ["FAIRYTALE", "EUPHORIA", "SATELLITE", "TATTOO"], difficulty: "easy" },
    { category: "Countries that have won exactly once", items: ["FINLAND", "ESTONIA", "LATVIA", "RUSSIA"], difficulty: "medium" },
    { category: "Acts performing with face coverings", items: ["LORDI", "HATARI", "SUBWOOLFER", "WHO SEE"], difficulty: "hard" },
    { category: "Finals with zero points since 2000", items: ["CRY BABY", "I AM YOURS", "BLACK SMOKE", "EMBERS"], difficulty: "expert" }
  ],
  [
    { category: "Host cities beginning with L", items: ["LISBON", "LONDON", "LAUSANNE", "LUGANO"], difficulty: "easy" },
    { category: "Light themed titles", items: ["CITY LIGHTS", "LIGHTS OFF", "LIGHT ME UP", "LOVE SHINE A LIGHT"], difficulty: "medium" },
    { category: "Artists who later hosted Eurovision", items: ["MANS ZELMERLOW", "SAKIS ROUVAS", "ELDAR GASIMOV", "NIGAR JAMAL"], difficulty: "hard" },
    { category: "Mediterranean countries that have won", items: ["SPAIN", "ITALY", "FRANCE", "ISRAEL"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 1950s", items: ["REFRAIN", "NET ALS TOEN", "DORS MON AMOUR", "EEN BEETJE"], difficulty: "easy" },
    { category: "National selection shows", items: ["BENIDORM FEST", "EESTI LAUL", "SUPERNOVA", "FESTIVAL DA CANCAO"], difficulty: "medium" },
    { category: "Onomatopoeic or repeated-syllable titles", items: ["DIGGI-LOO DIGGI-LEY", "DING-A-DONG", "BOOM BANG-A-BANG", "LA LA LOVE"], difficulty: "hard" },
    { category: "Countries that debuted in the 2000s", items: ["ALBANIA", "ANDORRA", "AZERBAIJAN", "SERBIA AND MONTENEGRO"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 2021 to 2024", items: ["ZITTI E BUONI", "STEFANIA", "TATTOO", "THE CODE"], difficulty: "easy" },
    { category: "Cities that hosted both Eurovision and the Olympics", items: ["ATHENS", "MOSCOW", "LONDON", "TURIN"], difficulty: "medium" },
    { category: "Titles referring to life", items: ["THIS IS MY LIFE", "C'EST LA VIE", "ONE LIFE", "1 LIFE"], difficulty: "hard" },
    { category: "Entries in minority or regional languages", items: ["VIVER SENZA TEI", "MAMA CORSICA", "1944", "FULENN"], difficulty: "expert" }
  ],
  [
    { category: "Solo female Eurovision winners", items: ["LOREEN", "NETTA", "CONCHITA WURST", "JAMALA"], difficulty: "easy" },
    { category: "Animal themed titles", items: ["WOLVES OF THE SEA", "BIRDS", "BLACKBIRD", "BUTTERFLIES"], difficulty: "medium" },
    { category: "Countries with a top three finish on debut", items: ["SERBIA", "LATVIA", "POLAND", "SWITZERLAND"], difficulty: "hard" },
    { category: "Barbara Dex Award winners", items: ["DUSTIN THE TURKEY", "VERKA SERDUCHKA", "KALOMIRA", "AMINATA"], difficulty: "expert" }
  ],
  [
    { category: "Grand Final runners-up", items: ["A MILLION VOICES", "CALM AFTER THE STORM", "SOUND OF SILENCE", "CHA CHA CHA"], difficulty: "easy" },
    { category: "Fire-themed titles", items: ["FUEGO", "PLAYING WITH FIRE", "ON FIRE", "START A FIRE"], difficulty: "medium" },
    { category: "Entries with prominent whistling", items: ["IF LOVE WAS A CRIME", "J'AI CHERCHE", "CAROBAN", "AVEN ROMALE"], difficulty: "hard" },
    { category: "Staging with kinetic props", items: ["I CAN'T GO ON", "RUNNING", "THE CODE", "SPACE MAN"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 1990s", items: ["FANGAD AV EN STORMVIND", "IN YOUR EYES", "THE VOICE", "LOVE SHINE A LIGHT"], difficulty: "easy" },
    { category: "Titles starting with I", items: ["I CAN'T GO ON", "I FEED YOU MY LOVE", "I STAND", "I DO"], difficulty: "medium" },
    { category: "Returning artists who improved their result", items: ["CAROLA", "DIMA BILAN", "ELENA PAPARIZOU", "MARCO MENGONI"], difficulty: "hard" },
    { category: "Popera or classical-crossover entries", items: ["LA FORZA", "IT'S MY LIFE", "MY FRIEND", "GRANDE AMORE"], difficulty: "expert" }
  ],
  [
    { category: "Host cities that are Nordic capitals", items: ["STOCKHOLM", "COPENHAGEN", "HELSINKI", "OSLO"], difficulty: "easy" },
    { category: "Celestial titles", items: ["SATELLITE", "FALLING STARS", "MY STAR", "THE MOON IS RISING"], difficulty: "medium" },
    { category: "Grand Final opening songs", items: ["TICK-TOCK", "HERE FOR YOU", "L'ENFER ET MOI", "EL DIABLO"], difficulty: "hard" },
    { category: "Hosts that won on home soil", items: ["IRELAND", "LUXEMBOURG", "ISRAEL", "SPAIN"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 1980s", items: ["WHAT'S ANOTHER YEAR", "LA DET SWINGE", "EIN BISSCHEN FRIEDEN", "NE PARTEZ PAS SANS MOI"], difficulty: "easy" },
    { category: "Imperative titles", items: ["SHAKE IT", "RUN AWAY", "YODEL IT!", "SAY NA NA NA"], difficulty: "medium" },
    { category: "Entries with violins on stage", items: ["FAIRYTALE", "BELIEVE", "TIME", "LANE MOJE"], difficulty: "hard" },
    { category: "Jury winners who didn't win overall", items: ["MADNESS OF LOVE", "SOUND OF SILENCE", "NOBODY BUT YOU", "TOUT L'UNIVERS"], difficulty: "expert" }
  ],
  [
    { category: "Sibling acts", items: ["OLSEN BROTHERS", "TOLMACHEVY SISTERS", "JEDWARD", "OG3NE"], difficulty: "easy" },
    { category: "Male-female duos", items: ["ELL & NIKKI", "THE COMMON LINNETS", "ZALA KRALJ & GASPER SANTL", "ILINCA & ALEX FLOREA"], difficulty: "medium" },
    { category: "Eurovision slogans", items: ["CELEBRATE DIVERSITY", "ALL ABOARD!", "LIGHT YOUR FIRE!", "WE ARE ONE"], difficulty: "hard" },
    { category: "Countries that withdrew and returned in the 2010s", items: ["PORTUGAL", "ROMANIA", "BULGARIA", "UKRAINE"], difficulty: "expert" }
  ],
  [
    { category: "Mononym artists", items: ["LOREEN", "JAMALA", "NETTA", "ANOUK"], difficulty: "easy" },
    { category: "Titles beginning with My", items: ["MY NUMBER ONE", "MY LUCKY DAY", "MY FRIEND", "MY STAR"], difficulty: "medium" },
    { category: "Countries with both a win and a last place", items: ["UNITED KINGDOM", "NORWAY", "GERMANY", "SWITZERLAND"], difficulty: "hard" },
    { category: "Rap blended into pop", items: ["CHA CHA CHA", "TRENULETUL", "YODEL IT!", "LIE TO ME"], difficulty: "expert" }
  ],
  [
    { category: "Titles with exclamation marks", items: ["HEY MAMMA!", "YODEL IT!", "OPA!", "HVALA, NE!"], difficulty: "easy" },
    { category: "Creature themed titles", items: ["BIRDS", "BLACKBIRD", "BUTTERFLIES", "WOLVES OF THE SEA"], difficulty: "medium" },
    { category: "Eurovision songs that went viral", items: ["ARCADE", "SNAP", "THINK ABOUT THINGS", "SHUM"], difficulty: "hard" },
    { category: "Countries with 30+ years between wins", items: ["AUSTRIA", "THE NETHERLANDS", "ITALY", "SWITZERLAND"], difficulty: "expert" }
  ],
  [
    { category: "French-language winners", items: ["DORS MON AMOUR", "UN PREMIER AMOUR", "L'OISEAU ET L'ENFANT", "NE PARTEZ PAS SANS MOI"], difficulty: "easy" },
    { category: "Portuguese-language entries", items: ["AMAR PELOS DOIS", "O JARDIM", "TELEMOVEIS", "AI CORACAO"], difficulty: "medium" },
    { category: "Songs featuring rap sections", items: ["SHUM", "1944", "SNAP", "RANDAJAD"], difficulty: "hard" },
    { category: "Countries with wins in Eurovision and Junior Eurovision", items: ["ITALY", "FRANCE", "SPAIN", "THE NETHERLANDS"], difficulty: "expert" }
  ],
  [
    { category: "Solo male winners since 2000", items: ["BELIEVE", "FAIRYTALE", "AMAR PELOS DOIS", "ARCADE"], difficulty: "easy" },
    { category: "One-word titles starting with S", items: ["SATELLITE", "SUUS", "SHUM", "SOLDI"], difficulty: "medium" },
    { category: "LED or AR-driven staging illusions", items: ["HEROES", "YOU ARE THE ONLY ONE", "SCREAM", "SKELETONS"], difficulty: "hard" },
    { category: "3rd-place finishers in the 2010s", items: ["PLAYING WITH FIRE", "POPULAR", "NIJE LJUBAV STVAR", "GRANDE AMORE"], difficulty: "expert" }
  ],
  [
    { category: "Host cities beginning with B", items: ["BELGRADE", "BAKU", "BIRMINGHAM", "BRIGHTON"], difficulty: "easy" },
    { category: "Weather in the title", items: ["SUNLIGHT", "STORM", "FLOWER IN THE SNOW", "RAIN OF REVOLUTION"], difficulty: "medium" },
    { category: "Returnees who later won", items: ["DIMA BILAN", "CAROLA", "JOHNNY LOGAN", "LOREEN"], difficulty: "hard" },
    { category: "Cities hosting three or more times", items: ["DUBLIN", "LONDON", "STOCKHOLM", "COPENHAGEN"], difficulty: "expert" }
  ],
  [
    { category: "2010s female solo winners", items: ["EUPHORIA", "ONLY TEARDROPS", "RISE LIKE A PHOENIX", "TOY"], difficulty: "easy" },
    { category: "Light-themed titles", items: ["CITY LIGHTS", "LIGHTS OFF", "LIGHT ME UP", "LOVE SHINE A LIGHT"], difficulty: "medium" },
    { category: "2010s finalists mostly not in English", items: ["SUUS", "KEDVESEM", "OCCIDENTALI'S KARMA", "AMAR PELOS DOIS"], difficulty: "hard" },
    { category: "Artists in both Junior Eurovision and Eurovision", items: ["IRU", "STEFANIA", "DESTINY", "NEVENA BOZOVIC"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision winners 1970s", items: ["DING-A-DONG", "WATERLOO", "SAVE YOUR KISSES FOR ME", "A-BA-NI-BI"], difficulty: "easy" },
    { category: "Titles beginning with Hold", items: ["HOLD ME NOW", "HOLD ME", "HOLD ON BE STRONG", "HOLD ON TO OUR LOVE"], difficulty: "medium" },
    { category: "Non-capital host cities", items: ["BRIGHTON", "HARROGATE", "MALMO", "LIVERPOOL"], difficulty: "hard" },
    { category: "Countries with 10+ years out of the contest", items: ["TURKEY", "ANDORRA", "MONACO", "LUXEMBOURG"], difficulty: "expert" }
  ],
  [
    { category: "Iconic interval acts", items: ["RIVERDANCE", "LOVE LOVE PEACE PEACE", "ROCK THE ROOF", "SWITCH SONG"], difficulty: "easy" },
    { category: "Grand Final opening songs", items: ["UNDER THE LADDER", "WHAT'S THE PRESSURE", "HERE FOR YOU", "I FEEL ALIVE"], difficulty: "medium" },
    { category: "Countries with land in the name", items: ["FINLAND", "ICELAND", "IRELAND", "THE NETHERLANDS"], difficulty: "hard" },
    { category: "Countries that returned after a long absence", items: ["ITALY", "CZECH REPUBLIC", "MONTENEGRO", "LUXEMBOURG"], difficulty: "expert" }
  ],
  [
    { category: "Entries with viral choreographies", items: ["UNO", "FUEGO", "SLOMO", "TOY"], difficulty: "easy" },
    { category: "Closing songs of recent Grand Finals", items: ["ONLY LOVE SURVIVES", "GRANDE AMORE", "ADRENALINA", "I WROTE A SONG"], difficulty: "medium" },
    { category: "Countries hosting in a non-capital city", items: ["UNITED KINGDOM", "SWEDEN", "GERMANY", "IRELAND"], difficulty: "hard" },
    { category: "Countries whose first win came in the 21st century", items: ["UKRAINE", "SERBIA", "AZERBAIJAN", "PORTUGAL"], difficulty: "expert" }
  ],
  [
    { category: "Celestial imagery in the title", items: ["SATELLITE", "THE MOON IS RISING", "CHILDREN OF THE UNIVERSE", "FALLING STARS"], difficulty: "easy" },
    { category: "Entries featuring a violin on stage", items: ["FAIRYTALE", "BELIEVE", "TIME", "LANE MOJE"], difficulty: "medium" },
    { category: "Countries with capitals starting B", items: ["GERMANY", "ROMANIA", "AZERBAIJAN", "SERBIA"], difficulty: "hard" },
    { category: "Countries with a Black Sea coastline", items: ["BULGARIA", "ROMANIA", "GEORGIA", "UKRAINE"], difficulty: "expert" }
  ],
  [
    { category: "Supernatural-themed titles", items: ["GHOST", "MONSTERS", "SKELETONS", "SPIRIT IN THE SKY"], difficulty: "easy" },
    { category: "Stylized all-caps artist names", items: ["KEIINO", "AWS", "OG3NE", "IVAN"], difficulty: "medium" },
    { category: "Countries that withdrew and have not returned", items: ["TURKEY", "ANDORRA", "BOSNIA AND HERZEGOVINA", "MOROCCO"], difficulty: "hard" },
    { category: "Countries with exactly one win", items: ["PORTUGAL", "AZERBAIJAN", "GREECE", "RUSSIA"], difficulty: "expert" }
  ],
  [
    { category: "Nonsense or invented words in the title", items: ["SANOMI", "DIGGI-LOO DIGGI-LEY", "DUM TEK TEK", "DANCING LASHA TUMBAI"], difficulty: "easy" },
    { category: "2020 artists who returned in 2021", items: ["DADI OG GAGNAMAGNID", "THE ROOP", "GO_A", "GJON'S TEARS"], difficulty: "medium" },
    { category: "1993 pre-qualification participants", items: ["SLOVENIA", "CROATIA", "BOSNIA AND HERZEGOVINA", "ESTONIA"], difficulty: "hard" },
    { category: "Nordic participating countries", items: ["DENMARK", "FINLAND", "ICELAND", "NORWAY"], difficulty: "expert" }
  ],
  [
    { category: "Host cities before and after 2000", items: ["STOCKHOLM", "COPENHAGEN", "OSLO", "MALMO"], difficulty: "easy" },
    { category: "Color words in the title", items: ["GOLDEN BOY", "BLACKBIRD", "BLACK SMOKE", "BLUE AND RED"], difficulty: "medium" },
    { category: "Countries with capitals starting L", items: ["UNITED KINGDOM", "PORTUGAL", "LUXEMBOURG", "SLOVENIA"], difficulty: "hard" },
    { category: "Countries bordering the Baltic Sea", items: ["ESTONIA", "LATVIA", "LITHUANIA", "POLAND"], difficulty: "expert" }
  ],
  [
    { category: "Eurovision slogans", items: ["ALL ABOARD!", "THE SOUND OF BEAUTY", "OPEN UP", "DARE TO DREAM"], difficulty: "easy" },
    { category: "Space and physics titles", items: ["SPACE MAN", "SPACE", "ZERO GRAVITY", "GRAVITY"], difficulty: "medium" },
    { category: "Island countries in the contest", items: ["CYPRUS", "MALTA", "ICELAND", "UNITED KINGDOM"], difficulty: "hard" },
    { category: "Founding 1956 participants", items: ["THE NETHERLANDS", "SWITZERLAND", "FRANCE", "ITALY"], difficulty: "expert" }
  ],
  [
    { category: "Titles beginning with You", items: ["YOU", "YOU ARE THE ONLY ONE", "YOU LET ME WALK ALONE", "YOU AND ME"], difficulty: "easy" },
    { category: "Countries with five or more wins", items: ["IRELAND", "SWEDEN", "UNITED KINGDOM", "FRANCE"], difficulty: "medium" },
    { category: "Countries debuting in the 1990s", items: ["SLOVENIA", "CROATIA", "BOSNIA AND HERZEGOVINA", "NORTH MACEDONIA"], difficulty: "hard" },
    { category: "Titles with exclamation marks", items: ["HEY MAMMA!", "YODEL IT!", "OPA!", "HVALA, NE!"], difficulty: "expert" }
  ],
  [
    { category: "Heart in the title", items: ["HEARTBEAT", "BREAK A BROKEN HEART", "MY HEART IS YOURS", "MY HEART GOES BOOM"], difficulty: "easy" },
    { category: "Countries using Cyrillic officially", items: ["RUSSIA", "BELARUS", "SERBIA", "NORTH MACEDONIA"], difficulty: "medium" },
    { category: "Titles with numbers", items: ["ONE LIFE", "TEN YEARS", "THREE MINUTES TO EARTH", "1944"], difficulty: "hard" },
    { category: "Countries that have never won", items: ["CYPRUS", "MALTA", "LITHUANIA", "ICELAND"], difficulty: "expert" }
  ],
  [
    { category: "Winning songs with one-word titles", items: ["ARCADE", "TATTOO", "SATELLITE", "HEROES"], difficulty: "easy" },
    { category: "Countries debuting in the 2000s", items: ["ALBANIA", "ANDORRA", "AZERBAIJAN", "SERBIA AND MONTENEGRO"], difficulty: "medium" },
    { category: "Titles beginning with My", items: ["MY NUMBER ONE", "MY LUCKY DAY", "MY FRIEND", "MY STAR"], difficulty: "hard" },
    { category: "Participants outside geographical Europe", items: ["ISRAEL", "AZERBAIJAN", "ARMENIA", "AUSTRALIA"], difficulty: "expert" }
  ],
  [
    { category: "Food and drink in titles", items: ["CHEESECAKE", "CAKE TO BAKE", "VODKA", "SUGAR"], difficulty: "easy" },
    { category: "Communication-themed titles", items: ["CALL ME", "TICK-TOCK - CROATIA", "THE SOCIAL NETWORK SONG", "TELEMOVEIS"], difficulty: "medium" },
    { category: "Titles with apostrophes", items: ["WHAT'S ANOTHER YEAR", "DON'T COME EASY", "I'M ALIVE", "IT'S MY LIFE"], difficulty: "hard" },
    { category: "Female trios at Eurovision", items: ["FEMINNEM", "OG3NE", "SEREBRO", "HURRICANE"], difficulty: "expert" }
  ],
  [
    { category: "One-word titles of four letters", items: ["HALO", "HOME", "SNAP", "TIME - BELARUS"], difficulty: "easy" },
    { category: "Heaven and hell imagery in titles", items: ["ANGEL", "FALLEN ANGEL", "EL DIABLO", "TAKE ME TO YOUR HEAVEN"], difficulty: "medium" },
    { category: "Entries credited to multiple artists", items: ["PLAYING WITH FIRE", "RUN AWAY", "IGRANKA", "ADRENALINA"], difficulty: "hard" },
    { category: "Host cities that stepped in for another country", items: ["EDINBURGH", "BRIGHTON", "THE HAGUE", "LIVERPOOL"], difficulty: "expert" }
  ],
  [
    { category: "Celestial bodies in the title", items: ["SPACE MAN", "THE MOON IS RISING", "SUNLIGHT", "FALLING STARS"], difficulty: "easy" },
    { category: "Mythic or famous women in titles", items: ["CLEOPATRA", "MATA HARI", "JEZEBEL", "APHRODISIAC"], difficulty: "medium" },
    { category: "Titles meaning love in various languages", items: ["AMAR PELOS DOIS", "L'AMOUR EST BLEU", "L'AMORE E FEMMINA", "NIJE LJUBAV STVAR"], difficulty: "hard" },
    { category: "Night-themed titles", items: ["TONIGHT AGAIN", "THIS NIGHT", "MIDNIGHT GOLD", "NOCTURNE"], difficulty: "expert" }
  ],
  [
    { category: "Time-themed titles", items: ["TICK-TOCK", "THESE DAYS", "TIME", "TEN YEARS"], difficulty: "easy" },
    { category: "Mononym Eurovision artists", items: ["NETTA", "JAMALA", "ANOUK", "KÄÄRIJÄ"], difficulty: "medium" },
    { category: "Solitude-themed titles", items: ["DANCE ALONE", "LEAVE ME ALONE", "LONELY PLANET", "SOLO"], difficulty: "hard" },
    { category: "Countries that won Eurovision and the World Cup", items: ["FRANCE", "GERMANY", "ITALY", "SPAIN"], difficulty: "expert" }
  ],
  [
    { category: "Masked or helmeted performers", items: ["LORDI", "SUBWOOLFER", "HATARI", "WHO SEE"], difficulty: "easy" },
    { category: "Weather in the title", items: ["SUNLIGHT", "STORM", "DANCING IN THE RAIN", "RAIN OF REVOLUTION"], difficulty: "medium" },
    { category: "Eurovision songs that went viral", items: ["SNAP", "ARCADE", "THINK ABOUT THINGS", "SHUM"], difficulty: "hard" },
    { category: "30+ years between a country's wins", items: ["AUSTRIA", "THE NETHERLANDS", "ITALY", "SWITZERLAND"], difficulty: "expert" }
  ],
  [
    { category: "Artists playing an instrument live on stage", items: ["ME AND MY GUITAR", "FAIRYTALE", "GOODBYE TO YESTERDAY", "I DON'T FEEL HATE"], difficulty: "easy" },
    { category: "One-word titles starting with S", items: ["SATELLITE", "SUUS", "SHUM", "SOLDI"], difficulty: "medium" },
    { category: "Countries on the Adriatic Sea", items: ["ITALY", "SLOVENIA", "CROATIA", "MONTENEGRO"], difficulty: "hard" },
    { category: "Unity-themed Eurovision slogans", items: ["COME TOGETHER", "WE ARE ONE", "BUILDING BRIDGES", "UNITED BY MUSIC"], difficulty: "expert" }
  ],
  [
    { category: "Color plus object titles", items: ["GOLDEN BOY", "BLACK SMOKE", "BLUE AND RED", "WHITE AND BLACK BLUES"], difficulty: "easy" },
    { category: "Host cities beginning with a vowel", items: ["AMSTERDAM", "OSLO", "ATHENS", "EDINBURGH"], difficulty: "medium" },
    { category: "Gerund titles ending in -ing", items: ["PLAYING WITH FIRE", "RUNNING SCARED", "DANCING IN THE RAIN", "FALLING STARS"], difficulty: "hard" },
    { category: "1994 debuting countries", items: ["ESTONIA", "HUNGARY", "LITHUANIA", "POLAND"], difficulty: "expert" }
  ],
  [
    { category: "Travel-themed titles", items: ["ON MY WAY", "FLY ON THE WINGS OF LOVE", "TRENULETUL", "TAKE ME TO YOUR HEAVEN"], difficulty: "easy" },
    { category: "Walk-themed titles", items: ["YOU LET ME WALK ALONE", "WALKING OUT", "WALK ON WATER", "WALK ALONG"], difficulty: "medium" },
    { category: "Family words in titles", items: ["MAMO", "SISTER", "HEY MAMMA!", "MOTHER"], difficulty: "hard" },
    { category: "Countries ending with -land", items: ["FINLAND", "ICELAND", "IRELAND", "SWITZERLAND"], difficulty: "expert" }
  ],
  [
    { category: "Titles beginning with On", items: ["ON FIRE", "ON MY WAY", "ON A SUNDAY", "ON AGAIN... OFF AGAIN"], difficulty: "easy" },
    { category: "Imperative titles", items: ["SHAKE IT", "YODEL IT!", "SAY NA NA NA", "START A FIRE"], difficulty: "medium" },
    { category: "Countries with 5+ Eurovision-country land borders", items: ["GERMANY", "POLAND", "ROMANIA", "AUSTRIA"], difficulty: "hard" },
    { category: "Winners who returned in later years", items: ["JOHNNY LOGAN", "LOREEN", "ALEXANDER RYBAK", "DANA INTERNATIONAL"], difficulty: "expert" }
  ],
  [
    { category: "Titles beginning with I", items: ["I CAN'T GO ON", "I STAND", "I FEED YOU MY LOVE", "I WROTE A SONG"], difficulty: "easy" },
    { category: "Countries whose capitals begin with L", items: ["PORTUGAL", "UNITED KINGDOM", "SLOVENIA", "LUXEMBOURG"], difficulty: "medium" },
    { category: "Group or band winners", items: ["ABBA", "TEACH-IN", "LORDI", "KALUSH ORCHESTRA"], difficulty: "hard" },
    { category: "Light-themed titles", items: ["CITY LIGHTS", "LIGHTS OFF", "LIGHT ME UP", "LOVE SHINE A LIGHT"], difficulty: "expert" }
  ],
  [
    { category: "Animals in the title", items: ["WOLVES OF THE SEA", "GIVE THAT WOLF A BANANA", "RUN WITH THE LIONS", "BUTTERFLIES"], difficulty: "easy" },
    { category: "Titles beginning with La", items: ["LA, LA, LA", "LA VENDA", "LA FORZA", "LA NOCHE ES PARA MI"], difficulty: "medium" },
    { category: "Countries using Cyrillic officially", items: ["RUSSIA", "BELARUS", "SERBIA", "NORTH MACEDONIA"], difficulty: "hard" },
    { category: "Countries that returned after a long absence", items: ["ITALY", "CZECH REPUBLIC", "MONACO", "LUXEMBOURG"], difficulty: "expert" }
  ],
  [
    { category: "Alphanumeric stage names", items: ["S10", "OG3NE", "3+2", "4FUN"], difficulty: "easy" },
    { category: "Dance in the title", items: ["DANCE YOU OFF", "DANCE ALONE", "DANCING IN THE RAIN", "DANCING LASHA TUMBAI"], difficulty: "medium" },
    { category: "Countries with one land border to a Eurovision nation", items: ["PORTUGAL", "IRELAND", "SAN MARINO", "DENMARK"], difficulty: "hard" },
    { category: "Former Yugoslav republics", items: ["SLOVENIA", "CROATIA", "BOSNIA AND HERZEGOVINA", "NORTH MACEDONIA"], difficulty: "expert" }
  ],
  [
    { category: "Body parts in the title", items: ["LIPSTICK", "BONES", "EYES THAT NEVER LIE", "MY HEART IS YOURS"], difficulty: "easy" },
    { category: "Sing or Song in the title", items: ["SING IT AWAY", "SING LITTLE BIRDIE", "THAT'S HOW YOU WRITE A SONG", "THE SOCIAL NETWORK SONG"], difficulty: "medium" },
    { category: "Winners in Romance languages", items: ["FRANCE", "SPAIN", "ITALY", "PORTUGAL"], difficulty: "hard" },
    { category: "Mediterranean participants that never won", items: ["MALTA", "CYPRUS", "MOROCCO", "BOSNIA AND HERZEGOVINA"], difficulty: "expert" }
  ],
  [
    { category: "Rap or spoken passages on stage", items: ["IGRANKA", "EURO NEURO", "LOVEWAVE", "CHA CHA CHA"], difficulty: "easy" },
    { category: "Time-themed titles", items: ["TICK-TOCK", "THIS TIME", "A MATTER OF TIME", "10 YEARS"], difficulty: "medium" },
    { category: "Participants outside geographical Europe", items: ["ISRAEL", "AZERBAIJAN", "ARMENIA", "AUSTRALIA"], difficulty: "hard" },
    { category: "Countries with land in the name", items: ["FINLAND", "ICELAND", "IRELAND", "THE NETHERLANDS"], difficulty: "expert" }
  ],
  [
    { category: "Numerals in the title", items: ["1 LIFE", "1944", "ZERO GRAVITY", "10 YEARS"], difficulty: "easy" },
    { category: "Staging built around boxes or frames", items: ["HOLD ME", "SKELETONS", "TRUTH", "MY LUCKY DAY"], difficulty: "medium" },
    { category: "Baltic national selections", items: ["EESTI LAUL", "SUPERNOVA", "PABANDOM IS NAUJO!", "DZIESMA"], difficulty: "hard" },
    { category: "Titles containing Love", items: ["LOVEWAVE", "LOVE INJECTED", "LOVE ME BACK", "I LOVE BELARUS"], difficulty: "expert" }
  ],
  [
    { category: "Italian-language entries (2010s-2020s)", items: ["GRANDE AMORE", "OCCIDENTALI'S KARMA", "NON MI AVETE FATTO NIENTE", "DUE VITE"], difficulty: "easy" },
    { category: "Male-female duos credited with &", items: ["ELL & NIKKI", "THE COMMON LINNETS", "KOIT TOOME & LAURA", "MORLAND & DEBRAH SCARLETT"], difficulty: "medium" },
    { category: "Countries ending with -ia", items: ["SERBIA", "ROMANIA", "ESTONIA", "LITHUANIA"], difficulty: "hard" },
    { category: "Countries with a Black Sea coastline", items: ["BULGARIA", "ROMANIA", "GEORGIA", "UKRAINE"], difficulty: "expert" }
  ],
  [
    { category: "Addressing mother in the title", items: ["MAMO", "MOTHER", "HEY MAMMA!", "MAMA SC!"], difficulty: "easy" },
    { category: "Yodel or joik featured in performance", items: ["YODEL IT!", "SAMIID AEDNAN", "SPIRIT IN THE SKY", "Y ASI"], difficulty: "medium" },
    { category: "Countries withdrawn and not returned", items: ["TURKEY", "ANDORRA", "BOSNIA AND HERZEGOVINA", "MOROCCO"], difficulty: "hard" },
    { category: "Countries with one Eurovision-country land border", items: ["PORTUGAL", "IRELAND", "SAN MARINO", "DENMARK"], difficulty: "expert" }
  ],
  [
    { category: "Mythic or famous women in titles", items: ["CLEOPATRA", "MATA HARI", "JEZEBEL", "APHRODISIAC"], difficulty: "easy" },
    { category: "One-word titles of four letters", items: ["HALO", "HOME", "SNAP", "TIME"], difficulty: "medium" },
    { category: "Entries with viral choreographies", items: ["UNO", "FUEGO", "SLOMO", "TOY"], difficulty: "hard" },
    { category: "Non-capital host cities", items: ["BRIGHTON", "HARROGATE", "MALMO", "LIVERPOOL"], difficulty: "expert" }
  ],
  [
    { category: "Celestial imagery in the title", items: ["SATELLITE", "THE MOON IS RISING", "SUNLIGHT", "FALLING STARS"], difficulty: "easy" },
    { category: "Large stage prop as centerpiece", items: ["TICK-TOCK", "I CAN'T GO ON", "HOLD ME", "LOVE IS FOREVER"], difficulty: "medium" },
    { category: "Countries with five or more wins", items: ["IRELAND", "SWEDEN", "UNITED KINGDOM", "FRANCE"], difficulty: "hard" },
    { category: "Countries bordering the Baltic Sea", items: ["ESTONIA", "LATVIA", "LITHUANIA", "POLAND"], difficulty: "expert" }
  ],
  [
    { category: "Titles that are full sentences", items: ["THAT'S HOW YOU WRITE A SONG", "I DON'T FEEL HATE", "I CAN'T GO ON", "WE ARE THE WINNERS"], difficulty: "easy" },
    { category: "Invented or nonsense words in titles", items: ["SANOMI", "DUM TEK TEK", "ZALEILAH", "HABA HABA"], difficulty: "medium" },
    { category: "Countries whose capitals begin with B", items: ["GERMANY", "ROMANIA", "AZERBAIJAN", "SERBIA"], difficulty: "hard" },
    { category: "Host cities beginning with T", items: ["TEL AVIV", "TURIN", "TALLINN", "THE HAGUE"], difficulty: "expert" }
  ],
  [
    { category: "Water imagery in titles", items: ["WALK ON WATER", "RIVER", "LOVEWAVE", "RAIN OF REVOLUTION"], difficulty: "easy" },
    { category: "Titles beginning with Sh", items: ["SHADY LADY", "SHINE", "SHUM", "SHE GOT ME"], difficulty: "medium" },
    { category: "Heavy rock or metal entries", items: ["HARD ROCK HALLELUJAH", "HATRID MUN SIGRA", "VISZLAT NYAR", "IN MY DREAMS"], difficulty: "hard" },
    { category: "Landlocked participating countries", items: ["AUSTRIA", "HUNGARY", "CZECH REPUBLIC", "SWITZERLAND"], difficulty: "expert" }
  ],
  [
    { category: "Titles beginning with On", items: ["ON FIRE", "ON MY WAY", "ON A SUNDAY", "ON AGAIN... OFF AGAIN"], difficulty: "easy" },
    { category: "Regional or minority language entries", items: ["VIVER SENZA TEI", "DIWANIT BUGALE", "FULENN", "SAMIID AEDNAN"], difficulty: "medium" },
    { category: "Common idioms used as titles", items: ["PLAYING WITH FIRE", "RUNNING SCARED", "LOVE IS BLIND", "UNDER THE LADDER"], difficulty: "hard" },
    { category: "Countries with wins in four or more decades", items: ["UNITED KINGDOM", "SWEDEN", "THE NETHERLANDS", "ISRAEL"], difficulty: "expert" }
  ],
  [
    { category: "Family words in titles", items: ["SISTER", "MAMO", "MOTHER", "HEY MAMMA!"], difficulty: "easy" },
    { category: "Alphanumeric act names", items: ["S10", "OG3NE", "3+2", "4FUN"], difficulty: "medium" },
    { category: "Entries with prominent whistling", items: ["J'AI CHERCHE", "IF LOVE WAS A CRIME", "CAROBAN", "HUNTER OF STARS"], difficulty: "hard" },
    { category: "Countries that have won exactly once", items: ["PORTUGAL", "AZERBAIJAN", "GREECE", "RUSSIA"], difficulty: "expert" }
  ],
  [
    { category: "Supernatural-themed titles", items: ["GHOST", "MONSTERS", "SKELETONS", "SPIRIT IN THE SKY"], difficulty: "easy" },
    { category: "Countries whose flags have a Nordic cross", items: ["DENMARK", "SWEDEN", "NORWAY", "ICELAND"], difficulty: "medium" },
    { category: "Entries blending rap with pop", items: ["CHA CHA CHA", "TRENULETUL", "YODEL IT!", "LIE TO ME"], difficulty: "hard" },
    { category: "Countries with one Eurovision-country land border", items: ["PORTUGAL", "IRELAND", "SAN MARINO", "DENMARK"], difficulty: "expert" }
  ],
  [
    { category: "Fire-themed titles", items: ["FUEGO", "PLAYING WITH FIRE", "ON FIRE", "START A FIRE"], difficulty: "easy" },
    { category: "Countries on the Baltic Sea", items: ["ESTONIA", "LATVIA", "LITHUANIA", "POLAND"], difficulty: "medium" },
    { category: "Host cities beginning with H", items: ["HELSINKI", "HARROGATE", "HILVERSUM", "THE HAGUE"], difficulty: "hard" },
    { category: "Acts performing with face coverings", items: ["LORDI", "HATARI", "SUBWOOLFER", "WHO SEE"], difficulty: "expert" }
  ],
  [
    { category: "Songs that rhyme with 'fire'", items: ["HIGHER", "DESIRE", "LIAR", "EMPIRE"], difficulty: "easy" },
    { category: "Participating countries beginning with S", items: ["SPAIN", "SWEDEN", "SWITZERLAND", "SLOVENIA"], difficulty: "medium" },
    { category: "Gerund titles ending in -ing", items: ["RUNNING SCARED", "DANCING IN THE RAIN", "FALLING STARS", "PLAYING WITH FIRE"], difficulty: "hard" },
    { category: "Countries with non-Indo-European official languages", items: ["FINLAND", "HUNGARY", "ESTONIA", "GEORGIA"], difficulty: "expert" }
  ],
  [
    { category: "Titles that are one-word English nouns", items: ["EUPHORIA", "ARCADE", "TOY", "SKELETONS"], difficulty: "easy" },
    { category: "Countries with wins before and after 2000", items: ["SWEDEN", "ISRAEL", "ITALY", "THE NETHERLANDS"], difficulty: "medium" },
    { category: "LED or projection-driven staging highlights", items: ["HEROES", "YOU ARE THE ONLY ONE", "SCREAM", "LA FORZA"], difficulty: "hard" },
    { category: "Countries debuting in 1994", items: ["ESTONIA", "HUNGARY", "LITHUANIA", "POLAND"], difficulty: "expert" }
  ],
  [
    { category: "Imperative titles", items: ["SHAKE IT", "YODEL IT!", "SAY NA NA NA", "START A FIRE"], difficulty: "easy" },
    { category: "Coastal host cities", items: ["LISBON", "TEL AVIV", "BAKU", "CANNES"], difficulty: "medium" },
    { category: "Folk meets pop on stage", items: ["SHUM", "SPIRIT IN THE SKY", "TRENULETUL", "ORO"], difficulty: "hard" },
    { category: "Countries with exactly five Eurovision wins (as of 2025)", items: ["UNITED KINGDOM", "FRANCE", "LUXEMBOURG", "THE NETHERLANDS"], difficulty: "expert" }
  ],
  [
    { category: "Weather in the title", items: ["SUNLIGHT", "STORM", "DANCING IN THE RAIN", "FLOWER IN THE SNOW"], difficulty: "easy" },
    { category: "2020 artists who returned in 2021", items: ["DADI OG GAGNAMAGNID", "THE ROOP", "GO_A", "GJON'S TEARS"], difficulty: "medium" },
    { category: "Teenage Eurovision winners", items: ["SANDRA KIM", "LENA", "NICOLE", "GIGLIOLA CINQUETTI"], difficulty: "hard" },
    { category: "Winners performed in a language other than English since 2000", items: ["MOLITVA", "AMAR PELOS DOIS", "ZITTI E BUONI", "STEFANIA"], difficulty: "expert" }
  ],
  [
    { category: "Five-letter one-word titles", items: ["SHINE", "ANGEL", "STORM", "SUGAR"], difficulty: "easy" },
    { category: "Countries with land in their English name", items: ["FINLAND", "ICELAND", "IRELAND", "THE NETHERLANDS"], difficulty: "medium" },
    { category: "Host cities beginning with L", items: ["LISBON", "LONDON", "LAUSANNE", "LUGANO"], difficulty: "hard" },
    { category: "Televote winners who didn't win overall", items: ["GRANDE AMORE", "YOU ARE THE ONLY ONE", "SPIRIT IN THE SKY", "RIM TIM TAGI DIM"], difficulty: "expert" }
  ]
];