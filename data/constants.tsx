// Region arrays
export const REGIONS = {
  "Nordics": [
    "Sweden", "Norway", "Finland", "Denmark", "Iceland"
  ],
  "Baltics": [
    "Estonia", "Latvia", "Lithuania"
  ],
  "Benelux & Isles": [
    "United Kingdom", "Ireland", "The Netherlands", "Belgium", "Luxembourg"
  ],
  "France & Iberia": [
    "France", "Spain", "Portugal", "Andorra", "Monaco", "Morocco"
  ],
  "Central Europe": [
    "Germany", "Austria", "Switzerland", "Poland", "Czechia", "Slovakia", "Hungary"
  ],
  "Mediterranean": [
    "Italy", "San Marino", "Malta", "Greece", "Cyprus", "Israel", "Turkey"
  ],
  "Balkans": [
    "Albania", "Bosnia & Herzegovina", "Bulgaria", "Croatia",
    "Montenegro", "North Macedonia", "Serbia", "Slovenia"
  ],
  "Eastern Europe": [
    "Ukraine", "Belarus", "Moldova", "Romania", "Russia"
  ],
  "Caucasus": [
    "Georgia", "Armenia", "Azerbaijan"
  ],
  "Oceania": [
    "Australia"
  ]
} as const;

export type Region = keyof typeof REGIONS;

// Build a country -> region map
export const REGION_MAP: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(REGIONS).flatMap(([region, countries]) =>
      (countries as readonly string[]).map((country) => [country, region])
    )
  ),
  "UK": "Benelux & Isles" // Alias for United Kingdom
};

export const GENRE_PARENT_MAP: Record<string, string> = {
  "Pop": "Pop", "Dance Pop": "Pop", "Dance-Pop": "Pop", "Europop": "Pop", "Synthpop": "Pop", "Latin Pop": "Pop", "Comedy Pop": "Pop",
  "Schlager": "Pop", "Chanson": "Pop",
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
