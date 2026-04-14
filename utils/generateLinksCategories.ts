import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Type } from "@google/genai";
import { MASTER_DATA } from '../data/fullMasterData.ts';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const MODEL = "gemini-3-flash-preview";

// ─── Precompute useful context strings ───────────────────────────────────────

const uniqueCountries = Array.from(new Set(MASTER_DATA.map(m => m.country))).sort();
const uniqueArtists = Array.from(new Set(MASTER_DATA.map(m => m.artist))).sort();
const uniqueTitles = Array.from(new Set(MASTER_DATA.map(m => m.title))).sort();
const uniqueYears = Array.from(new Set(MASTER_DATA.map(m => m.year))).sort();
const winners = MASTER_DATA.filter(m => m.placing === 1)
  .map(m => `${m.year}: ${m.country} - ${m.artist} "${m.title}"`);

// Build a compact but complete summary the AI can reference
const compactData = MASTER_DATA.map(m =>
  `${m.year}|${m.country}|${m.artist}|${m.title}|#${m.placing}|${m.sex}|${m.genre}|${m.members}p`
).join('\n');

interface SubCategoryDraft {
  name: string;
  description: string;
  itemType: string;
}

interface MainCategoryDraft {
  main: string;
  itemType: string;
  subs: SubCategoryDraft[];
}

// ─── PASS 1A: Brainstorm ONLY main category names ───────────────────────────

async function pass1a_brainstormMainCategories(): Promise<{ main: string; itemType: string }[]> {
  console.log("═══ PASS 1A: Brainstorming main categories ═══");

  const prompt = `You are a Eurovision Song Contest expert and puzzle designer.

I'm building a "Connections" style game. Players see 16 items of the SAME TYPE
(e.g. 16 country names, or 16 song titles) and must group them into 4 groups of 4.

I need you to brainstorm MAIN CATEGORIES — these define what TYPE of item the player sees.

Examples:
- "Countries" → player sees country names like "Sweden", "France", "Australia"  
- "Artists" → player sees performer names like "ABBA", "Loreen", "Måneskin"
- "Song Titles" → player sees song names like "Waterloo", "Euphoria", "Zitti e buoni"
- "Years" → player sees years like "1974", "2012", "2021"

Think broadly and creatively. Consider:
- Countries, Artists, Song Titles, Years, Host Cities
- Languages sung in, Genres, Numbers that appear in Eurovision
- Words/themes that appear in lyrics, Performance elements
- Real-world things connected to Eurovision (instruments, costumes, props, animals mentioned)
- Geographic/cultural groupings

For each, specify the "itemType" — what the player actually sees as text on screen.

IMPORTANT: Give me EXACTLY 15 main categories. No more, no fewer.
Make them diverse — avoid categories that would produce similar-looking items.

Eurovision countries for reference: ${uniqueCountries.join(', ')}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                main: { type: Type.STRING },
                itemType: { type: Type.STRING },
              },
              required: ["main", "itemType"]
            }
          }
        },
        required: ["categories"]
      }
    }
  });

  const result = JSON.parse(response.text!);
  console.log(`  → Got ${result.categories.length} main categories:`);
  for (const cat of result.categories) {
    console.log(`    • ${cat.main} (items are: ${cat.itemType})`);
  }
  return result.categories;
}

// ─── PASS 1B: For ONE main category, brainstorm its sub-categories ───────────

async function pass1b_brainstormSubCategories(
  mainCategory: string,
  itemType: string
): Promise<SubCategoryDraft[]> {
  console.log(`  Brainstorming subs for "${mainCategory}"...`);

  const prompt = `You are a Eurovision expert. I need sub-categories for a "Connections" puzzle game.

MAIN CATEGORY: "${mainCategory}"
ITEM TYPE: ${itemType}

The player will see 16 ${itemType} and must find 4 groups of 4.
Each group is defined by a sub-category (a rule that exactly those 4 items share).

Generate EXACTLY 20 sub-categories. For each, provide:
- "name": Short label shown to the player after solving (e.g. "Won Eurovision twice")
- "description": Detailed explanation of the rule, so someone can look up which items qualify
- "itemType": "${itemType}"

CRITICAL RULES:
1. Sub-categories must be SPECIFIC ENOUGH that a knowledgeable fan could figure them out
2. Sub-categories must be BROAD ENOUGH that at least 6-8 items fit (we pick 4 randomly)
3. MINIMIZE OVERLAP between sub-categories — if an item could fit in two subs, the game breaks
   Bad example: "Countries starting with S" + "Balkan countries" (Serbia fits both)
   Good example: "Countries starting with S" + "Countries that border France" (minimal overlap)
4. Mix difficulty levels — some obvious, some tricky
5. All facts must be verifiable from Eurovision history (1956–2025)

Eurovision countries: ${uniqueCountries.join(', ')}
Year range: 1956–2025
Sample artists: ${uniqueArtists.slice(0, 50).join(', ')}
Sample titles: ${uniqueTitles.slice(0, 50).join(', ')}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                itemType: { type: Type.STRING },
              },
              required: ["name", "description", "itemType"]
            }
          }
        },
        required: ["subs"]
      }
    }
  });

  const result = JSON.parse(response.text!);
  console.log(`    → ${result.subs.length} sub-categories`);
  return result.subs;
}

// ─── Combined Pass 1 with checkpointing ──────────────────────────────────────

async function pass1_generateFullStructure(): Promise<MainCategoryDraft[]> {
  // Step A: Get main categories
  let mainCats = loadCheckpoint<{ main: string; itemType: string }[]>("pass1a_mains");
  if (!mainCats) {
    mainCats = await pass1a_brainstormMainCategories();
    saveCheckpoint("pass1a_mains", mainCats);
  } else {
    console.log(`  → Loaded ${mainCats.length} main categories from checkpoint`);
  }

  // Step B: Get subs for each main (with per-category checkpointing)
  console.log("\n═══ PASS 1B: Brainstorming sub-categories ═══");
  const fullStructure: MainCategoryDraft[] = [];

  for (let i = 0; i < mainCats.length; i++) {
    const mc = mainCats[i];
    const checkpointName = `pass1b_subs_${i}_${mc.main.replace(/[^a-zA-Z0-9]/g, '_')}`;

    let subs = loadCheckpoint<SubCategoryDraft[]>(checkpointName);
    if (!subs) {
      subs = await pass1b_brainstormSubCategories(mc.main, mc.itemType);
      saveCheckpoint(checkpointName, subs);
      // Small delay between calls
      await new Promise(r => setTimeout(r, 1000));
    } else {
      console.log(`  ✓ Skipping "${mc.main}" — already brainstormed (${subs.length} subs)`);
    }

    fullStructure.push({
      main: mc.main,
      itemType: mc.itemType,
      subs: subs
    });
  }

  // Save the combined result
  saveCheckpoint("pass1_structure", fullStructure);
  return fullStructure;
}

// ─── PASS 2: Populate items per sub-category ─────────────────────────────────

interface PopulatedSub {
  name: string;
  items: string[];
}

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

async function pass2_populateSubCategoryWithRetry(
  mainCategory: string,
  itemType: string,
  sub: SubCategoryDraft,
  contextData: string,
  maxRetries: number = 4
): Promise<PopulatedSub> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await pass2_populateSubCategory(
        mainCategory, itemType, sub, contextData
      );
    } catch (err: any) {
      const isRateLimit = err?.message?.includes("429") 
        || err?.message?.includes("RESOURCE_EXHAUSTED")
        || err?.toString()?.includes("429");

      if (isRateLimit && attempt < maxRetries) {
        const waitSeconds = Math.pow(2, attempt) * 10;
        console.log(`    ⏳ Rate limited on "${sub.name}", waiting ${waitSeconds}s (attempt ${attempt + 1}/${maxRetries})...`);
        await sleep(waitSeconds * 1000);
      } else {
        throw err;
      }
    }
  }
  return { name: sub.name, items: [] };
}

async function pass2_populateSubCategory(
  mainCategory: string,
  itemType: string,
  sub: SubCategoryDraft,
  contextData: string
): Promise<PopulatedSub> {
  const prompt = `You are a Eurovision expert. I need you to find ALL items that match a specific category.

MAIN CATEGORY: ${mainCategory}
ITEM TYPE: ${itemType}
SUB-CATEGORY: "${sub.name}"
DESCRIPTION: ${sub.description}

Using the Eurovision data below AND your own Eurovision knowledge, list EVERY ${itemType}
that fits this sub-category. Be thorough — I need at least 6 items, ideally 8-15+.

RULES:
- Only include items you are confident are correct
- Items must be formatted as the player would see them (e.g. just "Sweden" not "Sweden (won 7 times)")
- For country names, use the common English name as used in Eurovision
- For artists, use the stage name as credited at Eurovision
- For years, just the number as a string like "1974"
- For song titles, use the official English or original title as performed

EUROVISION DATA (format: year|country|artist|title|placing|sex|genre|members):
${contextData}

Winners list for reference:
${winners.join('\n')}

Return items as a JSON array of strings. Be exhaustive.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: {
        thinkingBudget: 0
      },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["items"]
      }
    }
  });

  const result = JSON.parse(response.text!);
  return {
    name: sub.name,
    items: result.items
  };
}

async function pass2_populateAll(
  structure: MainCategoryDraft[]
): Promise<{ main: string; itemType: string; subs: PopulatedSub[] }[]> {
  console.log("\n═══ PASS 2: Populating items (this will take a while) ═══");

  const populated: { main: string; itemType: string; subs: PopulatedSub[] }[] = [];

  for (const mainCat of structure) {
    console.log(`\n  Main: ${mainCat.main}`);
    const populatedSubs: PopulatedSub[] = [];

    // Process in batches of 5 to avoid rate limits but still parallelize
    const BATCH_SIZE = 5;
    for (let i = 0; i < mainCat.subs.length; i += BATCH_SIZE) {
      const batch = mainCat.subs.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(
        batch.map(sub =>
          pass2_populateSubCategory(mainCat.main, mainCat.itemType, sub, compactData)
            .catch(err => {
              console.error(`    ✗ Failed: "${sub.name}" — ${err.message}`);
              return { name: sub.name, items: [] as string[] };
            })
        )
      );

      for (const result of results) {
        console.log(`    ${result.items.length >= 6 ? '✓' : '⚠'} "${result.name}": ${result.items.length} items`);
        populatedSubs.push(result);
      }

      // Small delay between batches to be nice to the API
      if (i + BATCH_SIZE < mainCat.subs.length) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    populated.push({
      main: mainCat.main,
      itemType: mainCat.itemType,
      subs: populatedSubs
    });
  }

  return populated;
}

async function pass2_retryEmpty(
  populated: { main: string; itemType: string; subs: PopulatedSub[] }[],
  structure: MainCategoryDraft[]
) {
  console.log("\n═══ PASS 2B: Retrying empty sub-categories ═══");
  let retried = 0;
  let stillEmpty = 0;

  for (let catIdx = 0; catIdx < populated.length; catIdx++) {
    const mainCat = populated[catIdx];
    const structCat = structure[catIdx];

    for (let i = 0; i < mainCat.subs.length; i++) {
      const sub = mainCat.subs[i];
      if (sub.items.length > 0) continue;

      // Find the original draft with the description
      const draft = structCat?.subs?.find(s => s.name === sub.name) || {
        name: sub.name,
        description: sub.name,
        itemType: mainCat.itemType
      };

      console.log(`  Retrying "${mainCat.main}" → "${sub.name}"...`);
      try {
        const result = await pass2_populateSubCategoryWithRetry(
          mainCat.main, mainCat.itemType, draft, compactData
        );
        const icon = result.items.length >= 6 ? '✓' : result.items.length >= 4 ? '~' : '✗';
        console.log(`    ${icon} "${result.name}": ${result.items.length} items`);
        mainCat.subs[i] = result;
        retried++;
        await sleep(8000);
      } catch (err: any) {
        console.log(`    ✗ Still failing: "${sub.name}"`);
        stillEmpty++;
      }
    }

    // Update the checkpoint for this main category
    if (retried > 0) {
      const checkpointName = `pass2_main_${catIdx}_${mainCat.main.replace(/[^a-zA-Z0-9]/g, '_')}`;
      saveCheckpoint(checkpointName, mainCat);
    }
  }

  console.log(`  Retried: ${retried}, Still empty: ${stillEmpty}`);
  return populated;
}

// ─── PASS 3: Validate and clean ──────────────────────────────────────────────

function pass3_validate(
  data: { main: string; itemType: string; subs: PopulatedSub[] }[]
) {
  console.log("\n═══ PASS 3: Validating and cleaning ═══");

  // Build lookup sets from master data for validation
  const validCountries = new Set(MASTER_DATA.map(m => m.country));
  const validArtists = new Set(MASTER_DATA.map(m => m.artist));
  const validTitles = new Set(MASTER_DATA.map(m => m.title));
  const validYears = new Set(MASTER_DATA.map(m => String(m.year)));

  let totalRemoved = 0;
  let totalKept = 0;
  let subsRemoved = 0;

  for (const mainCat of data) {
    // Determine which validation set to use
    let validSet: Set<string> | null = null;
    const itemTypeLower = mainCat.itemType.toLowerCase();
    if (itemTypeLower.includes('country') || itemTypeLower.includes('nation')) {
      validSet = validCountries;
    } else if (itemTypeLower.includes('artist') || itemTypeLower.includes('performer')) {
      validSet = validArtists;
    } else if (itemTypeLower.includes('title') || itemTypeLower.includes('song')) {
      validSet = validTitles;
    } else if (itemTypeLower.includes('year')) {
      validSet = validYears;
    }
    // For categories like "Cities", "Languages", etc. we can't easily validate
    // against master data — skip validation but still deduplicate

    for (const sub of mainCat.subs) {
      // Deduplicate
      const before = sub.items.length;
      sub.items = Array.from(new Set(sub.items));

      // Validate against master data if possible
      if (validSet) {
        sub.items = sub.items.filter(item => {
          if (validSet!.has(item)) return true;
          // Try case-insensitive match
          for (const valid of validSet!) {
            if (valid.toLowerCase() === item.toLowerCase()) {
              // Fix casing
              sub.items[sub.items.indexOf(item)] = valid;
              return true;
            }
          }
          return false;
        });
      }

      const removed = before - sub.items.length;
      totalRemoved += removed;
      totalKept += sub.items.length;

      if (removed > 0) {
        console.log(`    Cleaned "${sub.name}": removed ${removed}, kept ${sub.items.length}`);
      }
    }

    // Remove sub-categories with fewer than 4 items (unusable for the game)
    const beforeSubs = mainCat.subs.length;
    mainCat.subs = mainCat.subs.filter(sub => sub.items.length >= 4);
    const removedSubs = beforeSubs - mainCat.subs.length;
    subsRemoved += removedSubs;
    if (removedSubs > 0) {
      console.log(`  ⚠ ${mainCat.main}: removed ${removedSubs} sub-categories with < 4 items`);
    }
  }

  // Remove main categories with fewer than 4 subs (can't make a game)
  data = data.filter(mainCat => mainCat.subs.length >= 4);

  console.log(`\n  Summary: kept ${totalKept} items, removed ${totalRemoved} invalid items, removed ${subsRemoved} thin sub-categories`);

  return data;
}

// ─── Output ──────────────────────────────────────────────────────────────────

function writeOutput(
  data: { main: string; itemType: string; subs: PopulatedSub[] }[]
) {
  const outputPath = path.resolve("./data/linksCategories.ts");

  const fileContent = `/**
 * Eurovision Categories for EuroLinks game.
 * Auto-generated — do not edit manually.
 *
 * Structure:
 *   Main Category → Sub Categories → Items (6+ each)
 *
 * Game logic: Pick a main category, then pick 4 non-overlapping sub-categories,
 * drawing 4 random items from each.
 */

export interface LinkSubCategory {
  name: string;
  items: string[];
}

export interface LinkMainCategory {
  main: string;
  itemType: string;
  subs: LinkSubCategory[];
}

export const LINKS_CATEGORIES: LinkMainCategory[] = ${JSON.stringify(
    data.map(d => ({
      main: d.main,
      itemType: d.itemType,
      subs: d.subs.map(s => ({ name: s.name, items: s.items }))
    })),
    null,
    2
  )};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`\n✓ Saved to ${outputPath}`);

  // Print stats
  let totalSubs = 0;
  let totalItems = 0;
  for (const cat of data) {
    totalSubs += cat.subs.length;
    for (const sub of cat.subs) {
      totalItems += sub.items.length;
    }
  }
  console.log(`  Total Main Categories: ${data.length}`);
  console.log(`  Total Sub-Categories: ${totalSubs}`);
  console.log(`  Total Items: ${totalItems}`);
  console.log(`  Avg items per sub: ${(totalItems / totalSubs).toFixed(1)}`);
}

// ─── Checkpointing (save spots) ─────────────────────────────────────────────

const CHECKPOINT_DIR = path.resolve("./data/checkpoints");

function ensureCheckpointDir() {
  if (!fs.existsSync(CHECKPOINT_DIR)) {
    fs.mkdirSync(CHECKPOINT_DIR, { recursive: true });
  }
}

function saveCheckpoint(name: string, data: any) {
  ensureCheckpointDir();
  const filePath = path.join(CHECKPOINT_DIR, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  💾 Checkpoint saved: ${filePath}`);
}

function loadCheckpoint<T>(name: string): T | null {
  const filePath = path.join(CHECKPOINT_DIR, `${name}.json`);
  if (fs.existsSync(filePath)) {
    console.log(`  📂 Resuming from checkpoint: ${filePath}`);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return null;
}

// ─── Main execution ──────────────────────────────────────────────────────────

async function main() {
  console.log("🎤 EuroLinks Category Generator");
  console.log("================================\n");

  // ── Step 1: Get or load structure ──
  let structure = loadCheckpoint<MainCategoryDraft[]>("pass1_structure");
  if (!structure) {
    structure = await pass1_generateFullStructure();
    saveCheckpoint("pass1_structure", structure);
  } else {
    console.log(`  → Loaded ${structure.length} main categories from checkpoint`);
  }

  // ── Step 2: Populate items (with per-main-category checkpointing) ──
  let populated: { main: string; itemType: string; subs: PopulatedSub[] }[] = [];

  // Try loading the full pass2 result first
  const fullPass2 = loadCheckpoint<typeof populated>("pass2_populated_all");
  if (fullPass2) {
    populated = fullPass2;
    console.log(`  → Loaded all ${populated.length} populated categories from checkpoint`);
  } else {
    console.log("\n═══ PASS 2: Populating items (this will take a while) ═══");

    for (let catIdx = 0; catIdx < structure.length; catIdx++) {
      const mainCat = structure[catIdx];
      const checkpointName = `pass2_main_${catIdx}_${mainCat.main.replace(/[^a-zA-Z0-9]/g, '_')}`;

      // Check if this specific main category was already done
      const existing = loadCheckpoint<{ main: string; itemType: string; subs: PopulatedSub[] }>(checkpointName);
      if (existing) {
        console.log(`  ✓ Skipping "${mainCat.main}" — already populated`);
        populated.push(existing);
        continue;
      }

      console.log(`\n  Main [${catIdx + 1}/${structure.length}]: ${mainCat.main}`);
      const populatedSubs: PopulatedSub[] = [];

      for (const sub of mainCat.subs) {
        try {
          const result = await pass2_populateSubCategoryWithRetry(
            mainCat.main, mainCat.itemType, sub, compactData
          );
          const icon = result.items.length >= 6 ? '✓' : result.items.length >= 4 ? '~' : '✗';
          console.log(`    ${icon} "${result.name}": ${result.items.length} items`);
          populatedSubs.push(result);
        } catch (err: any) {
          console.error(`    ✗ Failed after retries: "${sub.name}" — ${err.message}`);
          populatedSubs.push({ name: sub.name, items: [] });
        }
        // 8 second delay to stay under 5 requests/minute
        await sleep(8000);
      }

      const mainResult = {
        main: mainCat.main,
        itemType: mainCat.itemType,
        subs: populatedSubs
      };

      populated.push(mainResult);

      // Save after each main category completes
      saveCheckpoint(checkpointName, mainResult);
    }

    // Save the full pass2 result
    saveCheckpoint("pass2_populated_all", populated);
  }

  // ── Step 2B: Retry any empty sub-categories ──
  populated = await pass2_retryEmpty(populated, structure);
  saveCheckpoint("pass2_populated_all", populated);

  // ── Step 3: Validate ──
  const validated = pass3_validate(populated);
  saveCheckpoint("pass3_validated", validated);

  // ── Step 4: Write final output ──
  writeOutput(validated);

  console.log("\n🎉 Done! You can now delete ./data/checkpoints/ if you want.");
}

main().catch(err => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});