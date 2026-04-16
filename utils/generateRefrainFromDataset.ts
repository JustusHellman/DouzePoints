import fs from 'fs';
import path from 'path';
import { generateRefrainData, RawSongData } from './lyricsExtractor.ts';
import { MASTER_DATA } from '../data/fullMasterData.ts';

// This script is designed to be run locally by the user with their own dataset.
// Usage: npx tsx utils/generateRefrainFromDataset.ts <path-to-dataset.json>

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Please provide a path to a JSON dataset file.");
  console.error("Usage: npx tsx utils/generateRefrainFromDataset.ts <path-to-dataset.json>");
  console.error("The JSON should be an array of objects with 'year', 'country' (or 'artist'/'title'), and 'lyrics' fields.");
  process.exit(1);
}

const datasetPath = path.resolve(args[0]);

if (!fs.existsSync(datasetPath)) {
  console.error(`File not found: ${datasetPath}`);
  process.exit(1);
}

try {
  const rawData = fs.readFileSync(datasetPath, 'utf-8');
  const parsedData = JSON.parse(rawData);

  if (!Array.isArray(parsedData)) {
    console.error("The dataset must be a JSON array.");
    process.exit(1);
  }

  const processedData: RawSongData[] = [];
  let matchedCount = 0;
  let unmatchedCount = 0;

  parsedData.forEach((entry: { lyrics?: string; year?: number; country?: string; artist?: string; title?: string }) => {
    if (!entry.lyrics || typeof entry.lyrics !== 'string') return;

    // Try to match with fullMasterData.ts
    // Match by year and country, or year and artist, or year and title
    const match = MASTER_DATA.find(m => 
      m.year === entry.year && 
      (
        (entry.country && m.country.toLowerCase() === entry.country.toLowerCase()) ||
        (entry.artist && m.artist.toLowerCase() === entry.artist.toLowerCase()) ||
        (entry.title && m.title.toLowerCase() === entry.title.toLowerCase())
      )
    );

    if (match) {
      matchedCount++;
      processedData.push({
        id: match.id,
        title: match.title,
        artist: match.artist,
        year: match.year,
        lyrics: entry.lyrics,
        placing: match.placing
      });
    } else {
      unmatchedCount++;
      // If no match, still include it but without the extra metadata
      processedData.push({
        id: `${entry.year || '0000'}-${(entry.artist || 'Unknown').replace(/\s+/g, '').substring(0, 5)}`,
        title: entry.title || 'Unknown Title',
        artist: entry.artist || 'Unknown Artist',
        year: entry.year || 0,
        lyrics: entry.lyrics
      });
    }
  });

  console.log(`Matched ${matchedCount} entries with fullMasterData.ts`);
  console.log(`Unmatched ${unmatchedCount} entries`);

  const extractedSnippets = generateRefrainData(processedData);

  const outputPath = path.join(process.cwd(), 'data', 'refrainData-v2.ts');
  
  const fileContent = `import { ExtractedSnippet } from '../utils/lyricsExtractor';

export const REFRAIN_DATA_V2: ExtractedSnippet[] = ${JSON.stringify(extractedSnippets, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Successfully generated ${extractedSnippets.length} snippets and saved to ${outputPath}`);
  
  // Print distribution
  const distribution = extractedSnippets.reduce((acc, curr) => {
    acc[curr.tier] = (acc[curr.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log("Tier Distribution:", distribution);

} catch (error) {
  console.error("Error processing dataset:", error);
}
