const fs = require('fs');

const genreMap = {
  // Pop
  "Dance Pop": "Dance-Pop", "Europop": "Dance-Pop", "Bubblegum Pop": "Dance-Pop", "Teen Pop": "Dance-Pop", "Hyperpop": "Dance-Pop", "Contemporary Pop": "Dance-Pop", "Rave Pop": "Dance-Pop", "Boy Band Pop": "Dance-Pop", "Girl Group": "Dance-Pop", "Boy Band": "Dance-Pop", "Italo Pop": "Dance-Pop",
  "Synthpop": "Synth-Pop", "Electropop": "Synth-Pop", "Techno Pop": "Synth-Pop", "Electronic Pop": "Synth-Pop",
  "Indie Pop": "Indie-Pop", "Alternative Pop": "Indie-Pop", "Art Pop": "Indie-Pop", "Dream Pop": "Indie-Pop", "Dark Pop": "Indie-Pop", "Chamber Pop": "Indie-Pop",
  "Pop Rock": "Pop-Rock", "Pop Punk": "Pop-Rock", "Britpop": "Pop-Rock",
  "Ethno-Pop": "Ethno-Pop", "Latin Pop": "Ethno-Pop", "Balkan Pop": "Ethno-Pop", "Turbo-Folk": "Ethno-Pop", "Pop Folk": "Ethno-Pop", "Laïko Pop": "Ethno-Pop", "Laïko": "Ethno-Pop", "Flamenco Pop": "Ethno-Pop", "Celtic Pop": "Ethno-Pop", "Gypsy Pop": "Ethno-Pop", "Dalmatian Pop": "Ethno-Pop", "Tango Pop": "Ethno-Pop", "Waltz Pop": "Ethno-Pop", "Spaghetti Western Pop": "Ethno-Pop", "Arabic Pop": "Ethno-Pop", "Afropop": "Ethno-Pop", "Afrobeats": "Ethno-Pop", "Multilingual Pop": "Ethno-Pop", "Ethnic Pop": "Ethno-Pop",
  "Schlager": "Schlager", "Dansband": "Schlager", "Pimba": "Schlager", "Canzone": "Schlager", "Italian Pop": "Schlager",
  "Retro Pop": "Pop", "Epic Pop": "Pop", "Dramatic Pop": "Pop", "Glam Pop": "Pop", "Pop": "Pop",

  // Rock & Metal
  "Hard Rock": "Hard Rock", "Glam Rock": "Hard Rock", "Arena Rock": "Hard Rock",
  "Alternative Rock": "Alternative Rock", "Grunge": "Alternative Rock", "Gothic Rock": "Alternative Rock", "Symphonic Rock": "Alternative Rock", "Avant-Garde Rock": "Alternative Rock", "Experimental Rock": "Alternative Rock", "Ethno-Rock": "Alternative Rock", "Celtic Rock": "Alternative Rock", "Yodel Rap Rock": "Alternative Rock",
  "Heavy Metal": "Heavy Metal", "Glam Metal": "Heavy Metal", "Nu Metal": "Heavy Metal", "Industrial Metal": "Heavy Metal", "Metalcore": "Heavy Metal", "Progressive Metal": "Heavy Metal", "Avant-Garde Metal": "Heavy Metal", "Folk Metal": "Heavy Metal",
  "Folk Rock": "Folk-Rock", "Punk Folk": "Folk-Rock", "Ska Folk": "Folk-Rock", "Ska Punk": "Folk-Rock", "Punk Rock": "Folk-Rock",
  "Soft Rock": "Soft Rock", "Rock": "Rock", "Progressive Rock": "Rock",

  // Electronic & Dance
  "Eurodance": "Eurodance", "Trance": "Eurodance",
  "EDM": "EDM", "EDM Pop": "EDM", "Electronic Dance": "EDM", "Dance": "EDM",
  "House": "House", "Deep House": "House",
  "Techno": "Techno", "Industrial Techno": "Techno", "Gabberpop": "Techno", "Ethno-Techno": "Techno",
  "Electronic": "Electronic", "Dance Industrial": "Electronic", "Drum & Bass": "Electronic", "Drum & Bass Pop": "Electronic", "Dubstep Ballad": "Electronic", "Electro-Swing": "Electronic", "Trip Hop": "Electronic",

  // Folk & Ethnic
  "Folk": "Traditional Folk", "Nordic Folk": "Traditional Folk", "Celtic Folk": "Traditional Folk", "Alpine Folk": "Traditional Folk", "Ethno-Folk": "Traditional Folk", "Neo-Folk": "Traditional Folk",
  "Balkan Ballad": "Traditional Folk", "Klapa": "Traditional Folk", "Antillean Creole": "Traditional Folk", "Cumbia": "Traditional Folk", "Paso Doble": "Traditional Folk", "Rumba Catalana": "Traditional Folk", "Zouk": "Traditional Folk", "Flamenco": "Traditional Folk", "Fado": "Traditional Folk", "Fado Pop": "Traditional Folk", "Calypso": "Traditional Folk", "Ethno-Drum": "Traditional Folk",

  // Ballad & Vocal
  "Power Ballad": "Power Ballad", "Dramatic Ballad": "Power Ballad", "Rock Ballad": "Power Ballad",
  "Piano Ballad": "Piano Ballad", "Jazz Ballad": "Piano Ballad",
  "Acoustic Ballad": "Acoustic Ballad", "Folk Ballad": "Acoustic Ballad", "Ethno-Ballad": "Acoustic Ballad", "Soul Ballad": "Acoustic Ballad", "Gospel Ballad": "Acoustic Ballad", "Ballad": "Acoustic Ballad",
  "Chanson": "Chanson",
  "A Cappella": "A Cappella", "Vocal Group": "A Cappella", "Choral": "A Cappella",

  // R&B, Soul & Jazz
  "Soul": "Soul", "Alternative Soul": "Soul", "Soul Pop": "Soul",
  "R&B": "R&B", "R&B Pop": "R&B",
  "Funk": "Funk", "Funk Pop": "Funk",
  "Jazz": "Jazz", "Avant-Garde Jazz": "Jazz", "Ethno-Jazz": "Jazz", "Folk Jazz": "Jazz", "Jazz Pop": "Jazz", "Jazz Rock": "Jazz", "Swing": "Jazz", "Jazz Waltz": "Jazz",
  "Blues": "Blues", "Blues Pop": "Blues", "Blues Rock": "Blues",
  "Gospel": "Gospel", "Gospel Pop": "Gospel",

  // Hip Hop & Rap
  "Hip Hop": "Hip Hop", "Ethno-Hip Hop": "Hip Hop", "Folk Hip Hop": "Hip Hop", "Zeibekiko Hip Hop": "Hip Hop", "Rap": "Hip Hop",
  "Pop Rap": "Pop Rap", "Hip Hop Pop": "Pop Rap",
  "Trap Pop": "Trap",

  // Classical & Theatrical
  "Opera": "Opera", "Operatic Pop": "Opera", "Operatic Rock": "Opera", "Operetta": "Opera",
  "Classical Crossover": "Classical Crossover", "Orchestral Pop": "Classical Crossover",
  "Musical Theater": "Musical Theater",

  // Alternative & Indie
  "Indie Rock": "Indie Rock",
  "Indie Folk": "Indie Folk", "Folktronica": "Indie Folk", "Electro-Folk": "Indie Folk",
  "Experimental": "Experimental", "Experimental Pop": "Experimental", "Avant-Garde": "Experimental", "Avant-Garde Pop": "Experimental", "New Age": "Experimental", "New Wave": "Experimental",

  // Country & Acoustic
  "Country": "Country",
  "Country Pop": "Country Pop", "Country Rock": "Country Pop", "Rockabilly": "Country Pop",
  "Acoustic": "Acoustic", "Acoustic Pop": "Acoustic",

  // Novelty & Comedy
  "Comedy": "Comedy", "Comedy Pop": "Comedy", "Comedy Rock": "Comedy", "Satirical Pop": "Comedy",
  "Novelty": "Novelty", "Novelty Pop": "Novelty", "Ska Pop": "Novelty", "None": "Pop"
};

let content = fs.readFileSync('./data/fullMasterData.ts', 'utf-8');

// Replace genres
content = content.replace(/genre:\s*"([^"]+)"/g, (match, genre) => {
  const newGenre = genreMap[genre] || genre;
  return `genre: "${newGenre}"`;
});

fs.writeFileSync('./data/fullMasterData.ts', content);
console.log("Genres updated successfully.");
