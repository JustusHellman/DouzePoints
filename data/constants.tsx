
export const REGION_MAP: Record<string, string> = {
  // Nordics
  "Sweden": "Nordics", "Norway": "Nordics", "Finland": "Nordics", "Denmark": "Nordics", "Iceland": "Nordics",
  // Baltics
  "Estonia": "Baltics", "Latvia": "Baltics", "Lithuania": "Baltics",
  // Western Europe
  "Switzerland": "Western Europe", "Netherlands": "Western Europe", "United Kingdom": "Western Europe", 
  "UK": "Western Europe", "Austria": "Western Europe", "Belgium": "Western Europe", "France": "Western Europe", 
  "Germany": "Western Europe", "Ireland": "Western Europe", "Luxembourg": "Western Europe",
  // Mediterranean
  "Italy": "Mediterranean", "Israel": "Mediterranean", "Spain": "Mediterranean", "Portugal": "Mediterranean", 
  "Cyprus": "Mediterranean", "Greece": "Mediterranean", "Malta": "Mediterranean", "San Marino": "Mediterranean",
  // Balkans
  "Croatia": "Balkans", "Serbia": "Balkans", "Slovenia": "Balkans", "Albania": "Balkans", 
  "Bosnia & Herzegovina": "Balkans", "Montenegro": "Balkans", "North Macedonia": "Balkans",
  // Eastern Europe
  "Ukraine": "Eastern Europe", "Poland": "Eastern Europe", "Moldova": "Eastern Europe", 
  "Bulgaria": "Eastern Europe", "Czechia": "Eastern Europe", "Hungary": "Eastern Europe", 
  "Romania": "Eastern Europe", "Slovakia": "Eastern Europe",
  // Caucasus
  "Turkey": "Caucasus", "Georgia": "Caucasus", "Armenia": "Caucasus", "Azerbaijan": "Caucasus",
  // Oceania
  "Australia": "Oceania"
};

export const GENRE_PARENT_MAP: Record<string, string> = {
  "Pop": "Pop", "Dance Pop": "Pop", "Dance-Pop": "Pop", "Europop": "Pop", "Synthpop": "Pop", "Latin Pop": "Pop", "Comedy Pop": "Pop",
  "Rock": "Rock", "Hard Rock": "Rock", "Party Metal": "Rock", "Industrial Rock": "Rock", "Glam Rock": "Rock",
  "Drum and Bass": "Electronic", "Techno": "Electronic",
  "Opera": "Classical", "Orchestral Pop": "Classical",
  "Ballad": "Ballad", "Pop Ballad": "Ballad",
  "Folk-Hop": "Urban", "R&B": "Urban", "Hip-Hop": "Urban", "Rap": "Urban",
  "Jazz": "Jazz",
  "Folk": "Folk", "Folk-Pop": "Folk"
};

export const getMemberLabel = (count: number) => {
  if (count === 1) return "Solo";
  if (count === 2) return "Duo";
  return count.toString();
};

export const getGenreParent = (genre: string) => {
  const keys = Object.keys(GENRE_PARENT_MAP);
  const found = keys.find(k => genre.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(genre.toLowerCase()));
  return found ? GENRE_PARENT_MAP[found] : "Other";
};
