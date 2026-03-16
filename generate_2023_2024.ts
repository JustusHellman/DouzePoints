const data23 = [
  "Sweden|Loreen|Tattoo",
  "Finland|Käärijä|Cha Cha Cha",
  "Israel|Noa Kirel|Unicorn",
  "Italy|Marco Mengoni|Due Vite",
  "Norway|Alessandra|Queen of Kings",
  "Ukraine|Tvorchi|Heart of Steel",
  "Belgium|Gustaph|Because of You",
  "Estonia|Alika|Bridges",
  "Australia|Voyager|Promise",
  "Czechia|Vesna|My Sister's Crown",
  "Lithuania|Monika Linkytė|Stay",
  "Cyprus|Andrew Lambrou|Break a Broken Heart",
  "Croatia|Let 3|Mama ŠČ!",
  "Armenia|Brunette|Future Lover",
  "Austria|Teya & Salena|Who the Hell Is Edgar?",
  "France|La Zarra|Évidemment",
  "Spain|Blanca Paloma|Eaea",
  "Moldova|Pasha Parfeni|Soarele și luna",
  "Poland|Blanka|Solo",
  "Switzerland|Remo Forrer|Watergun",
  "Slovenia|Joker Out|Carpe Diem",
  "Albania|Albina & Familja Kelmendi|Duje",
  "Portugal|Mimicat|Ai coração",
  "Serbia|Luke Black|Samo mi se spava",
  "United Kingdom|Mae Muller|I Wrote a Song",
  "Germany|Lord of the Lost|Blood & Glitter"
];

const data23_sf1 = [
  "Latvia|Sudden Lights|Aijā",
  "Ireland|Wild Youth|We Are One",
  "Netherlands|Mia Nicolai & Dion Cooper|Burning Daylight",
  "Azerbaijan|TuralTuranX|Tell Me More",
  "Malta|The Busker|Dance (Our Own Party)"
];

const data23_sf2 = [
  "Iceland|Diljá|Power",
  "Georgia|Iru|Echo",
  "Greece|Victor Vernicos|What They Say",
  "Denmark|Reiley|Breaking My Heart",
  "Romania|Theodor Andrei|D.G.T. (Off and On)",
  "San Marino|Piqued Jacks|Like an Animal"
];

const data24 = [
  "Switzerland|Nemo|The Code",
  "Croatia|Baby Lasagna|Rim Tim Tagi Dim",
  "Ukraine|alyona alyona & Jerry Heil|Teresa & Maria",
  "France|Slimane|Mon amour",
  "Israel|Eden Golan|Hurricane",
  "Ireland|Bambie Thug|Doomsday Blue",
  "Italy|Angelina Mango|La noia",
  "Armenia|Ladaniva|Jako",
  "Sweden|Marcus & Martinus|Unforgettable",
  "Portugal|Iolanda|Grito",
  "Greece|Marina Satti|Zari",
  "Germany|Isaak|Always on the Run",
  "Luxembourg|Tali|Fighter",
  "Lithuania|Silvester Belt|Luktelk",
  "Cyprus|Silia Kapsis|Liar",
  "Latvia|Dons|Hollow",
  "Serbia|Teya Dora|Ramonda",
  "United Kingdom|Olly Alexander|Dizzy",
  "Finland|Windows95man|No Rules!",
  "Estonia|5miinust & Puuluup|(nendest) narkootikumidest ei tea me (küll) midagi",
  "Georgia|Nutsa Buzaladze|Firefighter",
  "Spain|Nebulossa|Zorra",
  "Slovenia|Raiven|Veronika",
  "Austria|Kaleen|We Will Rave",
  "Norway|Gåte|Ulveham",
  "The Netherlands|Joost Klein|Europapa"
];

const data24_sf1 = [
  "Australia|Electric Fields|One Milkali (One Blood)",
  "Poland|Luna|The Tower",
  "Moldova|Natalia Barbu|In the Middle",
  "Azerbaijan|Fahree feat. Ilkin Dovlatov|Özünlə apar",
  "Iceland|Hera Björk|Scared of Heights"
];

const data24_sf2 = [
  "Czechia|Aiko|Pedestal",
  "Denmark|Saba|Sand",
  "Belgium|Mustii|Before the Party's Over",
  "San Marino|Megara|11:11",
  "Albania|Besa|Titan",
  "Malta|Sarah Bonnici|Loop"
];

const data25 = [
  "Austria|JJ|Wasted Love",
  "Israel|Yuval Raphael|New Day Will Rise",
  "Estonia|Tommy Cash|Espresso Macchiato",
  "Sweden|KAJ|Bara Bada Bastu",
  "Italy|Lucio Corsi|Volevo essere un duro",
  "Greece|Klavdia|Asteromata",
  "France|Louane|Maman",
  "The Netherlands|Claude|C'est La Vie",
  "Ukraine|Ziferblat|Bird of Pray",
  "Switzerland|Zoë Më|Voyage",
  "Finland|Erika Vikman|Ich komme",
  "Latvia|Tautumeitas|Bur Man Laimi",
  "Lithuania|Katarsis|Tavo akys",
  "Poland|Justyna|Gaja",
  "Germany|Abor & Tynna|Baller",
  "Portugal|NAPA|Deslocado",
  "Armenia|Parg|Survivor",
  "Luxembourg|Laura Thorn|La poupée monte le son",
  "United Kingdom|Remember Monday|What the Hell Just Happened",
  "Malta|Miriana Conte|Kant",
  "Albania|Shkodra Elektronike|Zjerm",
  "Norway|Kyle Alessandro|Lighter",
  "Denmark|Sissal|Hallucination",
  "Spain|Melody|Esa Diva",
  "Iceland|VÆB|RÓA",
  "San Marino|Gabry Ponte|Tutta L'Italia"
];

const data25_sf1 = [
  "Cyprus|Theo Evan|Shh",
  "Croatia|Marko Bošnjak|Poison Cake",
  "Slovenia|Klemen|How Much Time Do We Have Left",
  "Belgium|Red Sebastian|Strobe Lights",
  "Azerbaijan|Mamagama|Run With U"
];

const data25_sf2 = [
  "Australia|Go-Jo|Milkshake Man",
  "Montenegro|Nina Žižić|Dobrodošli",
  "Ireland|Emmy|Laika Party",
  "Georgia|Mariam Shengelia|Freedom",
  "Czechia|ADONXS|Kiss Kiss Goodbye",
  "Serbia|Princ|Mila"
];

const result = [];

const processData = (data, year, isSf = false) => {
  data.forEach((row, i) => {
    const [country, artist, title] = row.split('|');
    const placing = isSf ? 100 + 11 + i : i + 1;
    result.push({
      id: `${year}-${country.replace(/ /g, '')}`,
      year,
      country,
      artist,
      title,
      placing,
      sex: "Other",
      genre: "Pop",
      members: 1,
      fact: `Represented ${country} in ${year}.`,
      weightModifiers: [],
      weight: 0
    });
  });
};

processData(data25, 2025);
processData(data25_sf1, 2025, true);
processData(data25_sf2, 2025, true);
processData(data24, 2024);
processData(data24_sf1, 2024, true);
processData(data24_sf2, 2024, true);
processData(data23, 2023);
processData(data23_sf1, 2023, true);
processData(data23_sf2, 2023, true);

// Sort to interleave semi-finalists correctly (111, 111, 112, 112, etc.)
result.sort((a, b) => {
  if (a.year !== b.year) {
    return b.year - a.year; // Descending year (2025, 2024, 2023)
  }
  return a.placing - b.placing; // Ascending placing (1, 2, 3... 111, 111, 112, 112...)
});

const formattedArray = result.map(obj => JSON.stringify(obj).replace(/"([^"]+)":/g, '$1: ')).join(',\n  ');

const tsOutput = `import { MasterSong } from './types.ts';

export const RECENT_DATA: MasterSong[] = [
  ${formattedArray}
];
`;

import fs from 'fs';
fs.writeFileSync('recent_data.ts', tsOutput);
console.log('Successfully generated recent_data.ts with single-line entries');
