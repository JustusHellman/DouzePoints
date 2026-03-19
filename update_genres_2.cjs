const fs = require('fs');

const genreMap = {
  "Disco": "Dance-Pop",
  "Disco Pop": "Dance-Pop",
  "Electronic Rock": "Alternative Rock",
  "Folk Pop": "Indie Folk",
  "Folk Punk": "Folk-Rock",
  "Industrial Pop": "Synth-Pop",
  "Pop Ballad": "Power Ballad",
  "Romantic Ballad": "Power Ballad",
  "Reggae": "Pop"
};

let content = fs.readFileSync('./data/fullMasterData.ts', 'utf-8');

// Replace genres
content = content.replace(/genre:\s*"([^"]+)"/g, (match, genre) => {
  const newGenre = genreMap[genre] || genre;
  return `genre: "${newGenre}"`;
});

fs.writeFileSync('./data/fullMasterData.ts', content);
console.log("Genres updated successfully pass 2.");
