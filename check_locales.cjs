const fs = require('fs');

const genres = [
"A Cappella", "Acoustic", "Acoustic Ballad", "Alternative Rock", "Blues", "Chanson", "Classical Crossover", "Comedy", "Country", "Country Pop", "Dance-Pop", "EDM", "Electronic", "Ethno-Pop", "Eurodance", "Experimental", "Folk-Rock", "Funk", "Gospel", "Hard Rock", "Heavy Metal", "Hip Hop", "House", "Indie Folk", "Indie Rock", "Indie-Pop", "Jazz", "Musical Theater", "Novelty", "Opera", "Piano Ballad", "Pop", "Pop Rap", "Pop-Rock", "Power Ballad", "R&B", "Rock", "Schlager", "Soft Rock", "Soul", "Synth-Pop", "Techno", "Traditional Folk", "Trap"
];

const en = fs.readFileSync('locales/en.ts', 'utf8');
const missing = genres.filter(g => !en.includes(`"${g}"`));
console.log("Missing in en.ts:", missing);
