import { FULL_MASTER_DATA } from './data/fullMasterData';

const genres = new Set<string>();
const countries = new Set<string>();
const sexes = new Set<string>();

FULL_MASTER_DATA.forEach(entry => {
  genres.add(entry.genre);
  countries.add(entry.country);
  sexes.add(entry.sex);
});

console.log("=== GENRES ===");
console.log(Array.from(genres).sort().join('\n'));

console.log("\n=== COUNTRIES ===");
console.log(Array.from(countries).sort().join('\n'));

console.log("\n=== SEXES ===");
console.log(Array.from(sexes).sort().join('\n'));
