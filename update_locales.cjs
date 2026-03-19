const fs = require('fs');
const path = require('path');

const genresToAdd = [
  "Dance-Pop", "Folk-Rock", "Gospel", "Indie-Pop", "Opera", "Pop-Rock", "Synth-Pop", "Techno", "Traditional Folk", "Trap"
];

const localesDir = './locales';
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.ts') && f !== 'types.ts');

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the genres object
  const genresMatch = content.match(/genres:\s*\{([\s\S]*?)\},/);
  if (genresMatch) {
    let genresContent = genresMatch[1];
    let added = false;
    genresToAdd.forEach(g => {
      if (!genresContent.includes(`"${g}"`)) {
        genresContent += `\n      "${g}": "${g}",`;
        added = true;
      }
    });
    
    if (added) {
      // Sort the genres alphabetically
      const lines = genresContent.split('\n').filter(l => l.trim().length > 0);
      lines.sort((a, b) => a.trim().localeCompare(b.trim()));
      const newGenresContent = '\n' + lines.join('\n') + '\n    ';
      content = content.replace(genresMatch[1], newGenresContent);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
