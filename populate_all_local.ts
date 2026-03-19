import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';

// Make sure to set GEMINI_API_KEY in your environment before running this script!
// export GEMINI_API_KEY="your_api_key_here"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  console.log("Reading fullMasterData.ts...");
  const content = fs.readFileSync('./data/fullMasterData.ts', 'utf8');
  const match = content.match(/export const MASTER_DATA: MasterSong\[\] = \[\s*([\s\S]*?)\];/);
  if (!match) {
    console.error("Could not find MASTER_DATA");
    return;
  }
  
  const dataStr = '[' + match[1].replace(/,\s*$/, '') + ']';
  const masterData = eval(dataStr);

  // Find songs that haven't been populated yet (they have the default fact)
  const toProcess = masterData.filter(s => s.fact.startsWith('Represented '));
  console.log(`Found ${toProcess.length} songs to process.`);

  const BATCH_SIZE = 50;
  
  for (let i = 0; i < toProcess.length; i += BATCH_SIZE) {
    const batch = toProcess.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(toProcess.length / BATCH_SIZE)}...`);

    const prompt = `
    You are an expert in Eurovision Song Contest history.
    I will provide a JSON array of Eurovision songs. For each song, provide the missing metadata.
    
    Return a JSON array of objects with the following exact structure:
    {
      "id": "string (keep the original id)",
      "sex": "Male" | "Female" | "Mixed" | "Other",
      "genre": "string (e.g., 'Synth-pop', 'Schlager', 'Hard Rock')",
      "members": "integer (number of performers in the act, e.g., 1 for solo, 4 for a 4-piece band)",
      "fact": "string (1-2 sentences of interesting trivia about the entry or performance)",
      "weightModifiers": "array of strings, ONLY containing zero or more of: ['Global hit', 'Viral phenomenon', 'Cult classic', 'First win', 'Debut entry', 'Nul points', 'Novelty act', 'Scandal']"
    }

    IMPORTANT RULES FOR weightModifiers:
    - 'First win' MUST ONLY be used if this was the FIRST TIME the COUNTRY won the contest (e.g., Switzerland 1956, Sweden 1974, Portugal 2017). It does NOT mean the artist's first win.
    - 'Debut entry' MUST ONLY be used if this was the FIRST TIME the COUNTRY ever participated in the contest. It does NOT mean the artist's debut.
    - All other modifiers ('Global hit', 'Viral phenomenon', 'Cult classic', 'Nul points', 'Novelty act', 'Scandal') relate to the specific song, artist, or act.
    
    Input Data:
    ${JSON.stringify(batch.map(s => ({ id: s.id, year: s.year, country: s.country, artist: s.artist, title: s.title })), null, 2)}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                sex: { type: Type.STRING },
                genre: { type: Type.STRING },
                members: { type: Type.INTEGER },
                fact: { type: Type.STRING },
                weightModifiers: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["id", "sex", "genre", "members", "fact", "weightModifiers"]
            }
          }
        }
      });

      const result = JSON.parse(response.text);
      
      // Merge results
      for (const r of result) {
        const song = masterData.find(s => s.id === r.id);
        if (song) {
          song.sex = r.sex;
          song.genre = r.genre;
          song.members = r.members;
          song.fact = r.fact;
          song.weightModifiers = r.weightModifiers;
        }
      }

      // Save progress after each batch
      const newLines = [];
      newLines.push("import { MasterSong } from './types.ts';");
      newLines.push("");
      newLines.push("/**");
      newLines.push(" * Full Eurovision dataset including TidyTuesday historical data.");
      newLines.push(" */");
      newLines.push("export const MASTER_DATA: MasterSong[] = [");
      for (const song of masterData) {
        newLines.push(`  ${JSON.stringify(song).replace(/"([^"]+)":/g, '$1: ')},`);
      }
      newLines.push("];");
      newLines.push("");
      fs.writeFileSync('./data/fullMasterData.ts', newLines.join('\n'));
      
      console.log(`Batch saved successfully. Waiting 5 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 5000));

    } catch (e) {
      console.error("Error calling Gemini on batch:", e);
      console.log("Stopping script. You can run it again to resume from where it left off.");
      break;
    }
  }
  
  console.log("Finished processing!");
}

run();
