import { generateRefrainData, RawSongData } from './lyricsExtractor.js';
import * as fs from 'fs';

const sampleData: RawSongData[] = [
  {
    id: "2014-AT", title: "Rise Like a Phoenix", artist: "Conchita Wurst", year: 2014,
    lyrics: "Rise like a phoenix\nOut of the ashes\nSeeking rather than vengeance\nRetribution\nYou were warned\nOnce I'm transformed\nOnce I'm reborn"
  },
  {
    id: "2012-SE", title: "Euphoria", artist: "Loreen", year: 2012,
    lyrics: "Euphoria\nForever, 'till the end of time\nFrom now on, only you and I\nWe're going up-up-up-up-up-up-up\nEuphoria\nAn everlasting piece of art\nA beating love within my heart\nWe're going up-up-up-up-up-up-up"
  },
  {
    id: "2009-NO", title: "Fairytale", artist: "Alexander Rybak", year: 2009,
    lyrics: "I'm in love with a fairytale\nEven though it hurts\n'Cause I don't care if I lose my mind\nI'm already cursed"
  },
  {
    id: "2021-IT", title: "Zitti e buoni", artist: "Måneskin", year: 2021,
    lyrics: "Sono fuori di testa, ma diverso da loro\nE tu sei fuori di testa, ma diversa da loro\nSiamo fuori di testa, ma diversi da loro\nSiamo fuori di testa, ma diversi da loro"
  },
  {
    id: "2023-SE", title: "Tattoo", artist: "Loreen", year: 2023,
    lyrics: "No, I don't care about them all\n'Cause all I want is to be loved\nAnd all I care about is you\nYou're stuck on me like a tattoo"
  },
  {
    id: "2007-RS", title: "Molitva", artist: "Marija Serifovic", year: 2007,
    lyrics: "Molitva, kao žar na mojim usnama je\nMolitva, mesto reči samo ime tvoje\nNebo zna, kao i ja\nKoliko puta sam ponovila\nTo nebo zna, baš kao i ja\nDa je ime tvoje moja jedina\nMolitva"
  },
  {
    id: "2015-SE", title: "Heroes", artist: "Måns Zelmerlöw", year: 2015,
    lyrics: "We are the heroes of our time\nBut we're dancing with the demons in our minds\nWe are the heroes of our time\nHero-ou-o-oes\nO-uh-o-uh-o"
  },
  {
    id: "1974-SE", title: "Waterloo", artist: "ABBA", year: 1974,
    lyrics: "Waterloo - I was defeated, you won the war\nWaterloo - promise to love you for ever more\nWaterloo - couldn't escape if I wanted to\nWaterloo - knowing my fate is to be with you\nWo, wo, wo, wo, Waterloo - finally facing my Waterloo"
  },
  {
    id: "2018-IL", title: "Toy", artist: "Netta", year: 2018,
    lyrics: "I'm not your toy\nYou stupid boy\nI'll take you down now, make you watch me\nDancing with my dolls on the motha-bucka beat\nNot your toy"
  },
  {
    id: "2006-FI", title: "Hard Rock Hallelujah", artist: "Lordi", year: 2006,
    lyrics: "Hard Rock Hallelujah!\nThe saints are crippled on this sinners' night\nLost are the lambs with no guiding light\nThe walls come down like thunder\nThe rock 'n' roll angels bring thyn hard rock hallelujah"
  },
  {
    id: "2019-NL", title: "Arcade", artist: "Duncan Laurence", year: 2019,
    lyrics: "Loving you is a losing game\nOh, oh-oh-oh, oh-oh-oh-oh\nAll I know, all I know\nLoving you is a losing game"
  },
  {
    id: "2022-UA", title: "Stefania", artist: "Kalush Orchestra", year: 2022,
    lyrics: "Stefania mamo, mamo Stefania\nRozkvitaye pole, a vona siyiye\nZaspivay meni, mamo, kolyskovu\nKhochu shche pochuty tvoye ridne slovo"
  },
  {
    id: "2010-DE", title: "Satellite", artist: "Lena", year: 2010,
    lyrics: "Like a satellite, I'm in an orbit all the way around you\nAnd I would fall out into the night\nCan't go a minute without your love"
  },
  {
    id: "1998-IL", title: "Diva", artist: "Dana International", year: 1998,
    lyrics: "Viva naríya\nViva Victoria\nAphrodita\nViva la diva\nViva Victoria\nCleopatra"
  },
  {
    id: "2016-UA", title: "1944", artist: "Jamala", year: 2016,
    lyrics: "When strangers are coming\nThey come to your house\nThey kill you all and say\nWe're not guilty\nNot guilty"
  },
  {
    id: "2024-CH", title: "The Code", artist: "Nemo", year: 2024,
    lyrics: "I went to hell and back\nTo find myself on track\nI broke the code, woah-oh-oh\nLike ammonites\nI just gave it some time\nNow I found paradise\nI broke the code, woah-oh-oh"
  },
  {
    id: "2003-TR", title: "Everyway That I Can", artist: "Sertab Erener", year: 2003,
    lyrics: "Everyway that I can\nI'll try to make you love me again\nEveryway that I can\nI'll give you all my love and then\nEveryway that I can\nI'll cry, I'll die, make you mine again"
  },
  {
    id: "1987-IE", title: "Hold Me Now", artist: "Johnny Logan", year: 1987,
    lyrics: "Hold me now, don't cry\nDon't say a word\nJust hold me now\nAnd I will know\nThough we're apart, we'll always be together\nForever in love\nWhat do you say when words are not enough?"
  },
  {
    id: "2013-DK", title: "Only Teardrops", artist: "Emmelie de Forest", year: 2013,
    lyrics: "How many times can we win and lose?\nHow many times can we break the rules between us?\nOnly teardrops\nHow many times do we have to fight?\nHow many times till we get it right between us?\nOnly teardrops"
  },
  {
    id: "1958-IT", title: "Nel blu, dipinto di blu", artist: "Domenico Modugno", year: 1958,
    lyrics: "Volare, oh, oh\nCantare, oh, oh, oh, oh\nNel blu, dipinto di blu\nFelice di stare lassù"
  }
];

const extracted = generateRefrainData(sampleData);

const outputContent = `import { LyricSnippet } from './types.ts';

// This file was auto-generated by the lyricsExtractor utility
// It contains a sample of extracted snippets from a mock dataset.
export const REFRAIN_DATA_V2: LyricSnippet[] = ${JSON.stringify(extracted, null, 2)};
`;

fs.writeFileSync('./data/refrainData-v2.ts', outputContent);
console.log("Extraction complete. Wrote " + extracted.length + " snippets.");
