import fs from 'fs';

const content = fs.readFileSync('./data/fullMasterData.ts', 'utf-8');
const matches = content.match(/genre:\s*"([^"]+)"/g);
if (matches) {
  const genres = new Set(matches.map(m => m.split('"')[1]));
  console.log(Array.from(genres).sort().join('\n'));
} else {
  console.log("No genres found.");
}
