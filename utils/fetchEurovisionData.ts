import fs from 'fs';
import { generateRefrainData, RawSongData } from './lyricsExtractor.js';

// A curated list of well-known Eurovision songs (winners and fan favorites)
const EUROVISION_SONGS = [
  // 2010s-2020s Winners
  { year: 2024, country: "Switzerland", artist: "Nemo", title: "The Code" },
  { year: 2023, country: "Sweden", artist: "Loreen", title: "Tattoo" },
  { year: 2022, country: "Ukraine", artist: "Kalush Orchestra", title: "Stefania" },
  { year: 2021, country: "Italy", artist: "Måneskin", title: "Zitti e buoni" },
  { year: 2019, country: "Netherlands", artist: "Duncan Laurence", title: "Arcade" },
  { year: 2018, country: "Israel", artist: "Netta", title: "Toy" },
  { year: 2017, country: "Portugal", artist: "Salvador Sobral", title: "Amar pelos dois" },
  { year: 2016, country: "Ukraine", artist: "Jamala", title: "1944" },
  { year: 2015, country: "Sweden", artist: "Måns Zelmerlöw", title: "Heroes" },
  { year: 2014, country: "Austria", artist: "Conchita Wurst", title: "Rise Like a Phoenix" },
  { year: 2013, country: "Denmark", artist: "Emmelie de Forest", title: "Only Teardrops" },
  { year: 2012, country: "Sweden", artist: "Loreen", title: "Euphoria" },
  { year: 2011, country: "Azerbaijan", artist: "Ell & Nikki", title: "Running Scared" },
  { year: 2010, country: "Germany", artist: "Lena", title: "Satellite" },

  // 2000s Winners
  { year: 2009, country: "Norway", artist: "Alexander Rybak", title: "Fairytale" },
  { year: 2008, country: "Russia", artist: "Dima Bilan", title: "Believe" },
  { year: 2007, country: "Serbia", artist: "Marija Šerifović", title: "Molitva" },
  { year: 2006, country: "Finland", artist: "Lordi", title: "Hard Rock Hallelujah" },
  { year: 2005, country: "Greece", artist: "Helena Paparizou", title: "My Number One" },
  { year: 2004, country: "Ukraine", artist: "Ruslana", title: "Wild Dances" },
  { year: 2003, country: "Turkey", artist: "Sertab Erener", title: "Everyway That I Can" },
  { year: 2002, country: "Latvia", artist: "Marie N", title: "I Wanna" },
  { year: 2001, country: "Estonia", artist: "Tanel Padar", title: "Everybody" },
  { year: 2000, country: "Denmark", artist: "Olsen Brothers", title: "Fly on the Wings of Love" },

  // 1990s Winners
  { year: 1999, country: "Sweden", artist: "Charlotte Nilsson", title: "Take Me to Your Heaven" },
  { year: 1998, country: "Israel", artist: "Dana International", title: "Diva" },
  { year: 1997, country: "UK", artist: "Katrina and the Waves", title: "Love Shine a Light" },
  { year: 1996, country: "Ireland", artist: "Eimear Quinn", title: "The Voice" },
  { year: 1995, country: "Norway", artist: "Secret Garden", title: "Nocturne" },
  { year: 1994, country: "Ireland", artist: "Paul Harrington", title: "Rock 'n' Roll Kids" },
  { year: 1993, country: "Ireland", artist: "Niamh Kavanagh", title: "In Your Eyes" },
  { year: 1992, country: "Ireland", artist: "Linda Martin", title: "Why Me?" },
  { year: 1991, country: "Sweden", artist: "Carola", title: "Fångad av en stormvind" },
  { year: 1990, country: "Italy", artist: "Toto Cutugno", title: "Insieme: 1992" },

  // Iconic Classics
  { year: 1974, country: "Sweden", artist: "ABBA", title: "Waterloo" },
  { year: 1958, country: "Italy", artist: "Domenico Modugno", title: "Nel blu, dipinto di blu" },
  { year: 1981, country: "UK", artist: "Bucks Fizz", title: "Making Your Mind Up" },
  { year: 1987, country: "Ireland", artist: "Johnny Logan", title: "Hold Me Now" },
  { year: 1965, country: "France", artist: "France Gall", title: "Poupée de cire, poupée de son" },
  { year: 1988, country: "Switzerland", artist: "Céline Dion", title: "Ne partez pas sans moi" },

  // Recent Fan Favorites (2020s)
  { year: 2024, country: "Croatia", artist: "Baby Lasagna", title: "Rim Tim Tagi Dim" },
  { year: 2024, country: "France", artist: "Slimane", title: "Mon amour" },
  { year: 2024, country: "Italy", artist: "Angelina Mango", title: "La noia" },
  { year: 2024, country: "Ireland", artist: "Bambie Thug", title: "Doomsday Blue" },
  { year: 2023, country: "Finland", artist: "Käärijä", title: "Cha Cha Cha" },
  { year: 2023, country: "Israel", artist: "Noa Kirel", title: "Unicorn" },
  { year: 2023, country: "Italy", artist: "Marco Mengoni", title: "Due vite" },
  { year: 2023, country: "Norway", artist: "Alessandra", title: "Queen of Kings" },
  { year: 2022, country: "UK", artist: "Sam Ryder", title: "Space Man" },
  { year: 2022, country: "Spain", artist: "Chanel", title: "SloMo" },
  { year: 2022, country: "Sweden", artist: "Cornelia Jakobs", title: "Hold Me Closer" },
  { year: 2021, country: "France", artist: "Barbara Pravi", title: "Voilà" },
  { year: 2021, country: "Switzerland", artist: "Gjon's Tears", title: "Tout l'univers" },
  { year: 2021, country: "Iceland", artist: "Daði og Gagnamagnið", title: "10 Years" },
  { year: 2021, country: "Ukraine", artist: "Go_A", title: "Shum" },
  { year: 2020, country: "Iceland", artist: "Daði og Gagnamagnið", title: "Think About Things" },
  { year: 2020, country: "Lithuania", artist: "The Roop", title: "On Fire" },
  { year: 2020, country: "Russia", artist: "Little Big", title: "Uno" },

  // 2010s Fan Favorites
  { year: 2019, country: "Italy", artist: "Mahmood", title: "Soldi" },
  { year: 2019, country: "Russia", artist: "Sergey Lazarev", title: "Scream" },
  { year: 2019, country: "Switzerland", artist: "Luca Hänni", title: "She Got Me" },
  { year: 2019, country: "Norway", artist: "KEiiNO", title: "Spirit in the Sky" },
  { year: 2018, country: "Cyprus", artist: "Eleni Foureira", title: "Fuego" },
  { year: 2018, country: "Austria", artist: "Cesár Sampson", title: "Nobody But You" },
  { year: 2018, country: "Germany", artist: "Michael Schulte", title: "You Let Me Walk Alone" },
  { year: 2017, country: "Bulgaria", artist: "Kristian Kostov", title: "Beautiful Mess" },
  { year: 2017, country: "Moldova", artist: "SunStroke Project", title: "Hey, Mamma!" },
  { year: 2016, country: "Australia", artist: "Dami Im", title: "Sound of Silence" },
  { year: 2016, country: "Russia", artist: "Sergey Lazarev", title: "You Are the Only One" },
  { year: 2015, country: "Russia", artist: "Polina Gagarina", title: "A Million Voices" },
  { year: 2015, country: "Italy", artist: "Il Volo", title: "Grande amore" },
  { year: 2014, country: "Netherlands", artist: "The Common Linnets", title: "Calm After the Storm" },
  { year: 2014, country: "Sweden", artist: "Sanna Nielsen", title: "Undo" },
  { year: 2013, country: "Azerbaijan", artist: "Farid Mammadov", title: "Hold Me" },
  { year: 2013, country: "Ukraine", artist: "Zlata Ognevich", title: "Gravity" },
  { year: 2012, country: "Russia", artist: "Buranovskiye Babushki", title: "Party for Everybody" },
  { year: 2012, country: "Serbia", artist: "Željko Joksimović", title: "Nije ljubav stvar" },
  { year: 2011, country: "Italy", artist: "Raphael Gualazzi", title: "Madness of Love" },
  { year: 2011, country: "Sweden", artist: "Eric Saade", title: "Popular" },
  { year: 2010, country: "Turkey", artist: "maNga", title: "We Could Be The Same" },
  { year: 2010, country: "Romania", artist: "Paula Seling & Ovi", title: "Playing with Fire" },

  // 2000s Fan Favorites
  { year: 2009, country: "Iceland", artist: "Yohanna", title: "Is It True?" },
  { year: 2008, country: "Ukraine", artist: "Ani Lorak", title: "Shady Lady" },
  { year: 2008, country: "Greece", artist: "Kalomira", title: "Secret Combination" },
  { year: 2007, country: "Ukraine", artist: "Verka Serduchka", title: "Dancing Lasha Tumbai" },
  { year: 2007, country: "Russia", artist: "Serebro", title: "Song #1" },
  { year: 2006, country: "Russia", artist: "Dima Bilan", title: "Never Let You Go" },
  { year: 2005, country: "Malta", artist: "Chiara", title: "Angel" },
  { year: 2004, country: "Serbia and Montenegro", artist: "Željko Joksimović", title: "Lane moje" },
  { year: 2003, country: "Belgium", artist: "Urban Trad", title: "Sanomi" },
  { year: 2003, country: "Russia", artist: "t.A.T.u.", title: "Ne ver', ne boysia" },
];

async function fetchLyrics(artist: string, title: string): Promise<string | null> {
  try {
    // Using lyrics.ovh API
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.lyrics || null;
  } catch (error) {
    console.error(`Error fetching lyrics for ${artist} - ${title}:`, error);
    return null;
  }
}

async function run() {
  console.log(`Starting to fetch lyrics for ${EUROVISION_SONGS.length} songs...`);
  const rawData: RawSongData[] = [];

  for (const song of EUROVISION_SONGS) {
    console.log(`Fetching: ${song.artist} - ${song.title}...`);
    const lyrics = await fetchLyrics(song.artist, song.title);
    
    if (lyrics) {
      rawData.push({
        id: `${song.year}-${song.country.substring(0, 2).toUpperCase()}`,
        title: song.title,
        artist: song.artist,
        year: song.year,
        lyrics: lyrics
      });
      console.log(`✅ Success`);
    } else {
      console.log(`❌ Not found`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\nSuccessfully fetched lyrics for ${rawData.length} songs.`);
  console.log('Extracting refrains...');

  const extracted = generateRefrainData(rawData);

  const outputContent = `import { LyricSnippet } from './types.ts';

// This file was auto-generated by fetching from a public lyrics API
// and extracting snippets using the lyricsExtractor utility.
export const REFRAIN_DATA_V2: LyricSnippet[] = ${JSON.stringify(extracted, null, 2)};
`;

  fs.writeFileSync('./data/refrainData-v2.ts', outputContent);
  console.log(`Extraction complete. Wrote ${extracted.length} snippets to data/refrainData-v2.ts`);
}

run();
