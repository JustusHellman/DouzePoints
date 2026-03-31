// This is a prototype utility to demonstrate how we could programmatically
// extract meaningful 4-word snippets from a large Eurovision lyrics dataset.

// A basic list of English stop words to penalize in snippets
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in", 
  "into", "is", "it", "no", "not", "of", "on", "or", "such", "that", "the", 
  "their", "then", "there", "these", "they", "this", "to", "was", "will", "with",
  "i", "you", "he", "she", "we", "me", "my", "your", "do", "can", "so", "oh", "ah", "la",
  "yeah", "na", "da", "dum", "de"
]);

/**
 * Represents a raw song entry from a dataset
 */
export interface RawSongData {
  id: string;
  title: string;
  artist: string;
  year: number;
  lyrics: string; // Full lyrics text
  language?: string;
  placing?: number;
}

/**
 * Represents the extracted snippet for EuroRefrain
 */
export interface ExtractedSnippet {
  id: string;
  title: string;
  artist: string;
  words: string[];
  tier: "easy" | "medium" | "hard" | "expert";
  language?: string;
  year?: number;
  placing?: number;
}

interface Token {
  word: string;
  raw: string;
  hasTrailingPunctuation: boolean;
  isLineStart: boolean;
  isLineEnd: boolean;
}

/**
 * Extracts all 4-word contiguous chunks (4-grams) from a text.
 */
export function get4Grams(text: string): Token[][] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const tokens: Token[] = [];
  
  lines.forEach((line) => {
    const rawWords = line.split(/\s+/).filter(w => w.length > 0);
    let validWordIndex = 0;
    
    rawWords.forEach((rawWord, idx) => {
      const cleanWord = rawWord.replace(/[^\p{L}']/gu, '').toUpperCase();
      if (!cleanWord) return;
      
      const hasTrailingPunctuation = /[.,!?;:]+$/.test(rawWord) || /[.,!?;:]+['"]*$/.test(rawWord);
      
      tokens.push({
        word: cleanWord,
        raw: rawWord,
        hasTrailingPunctuation,
        isLineStart: validWordIndex === 0,
        isLineEnd: idx === rawWords.length - 1
      });
      validWordIndex++;
    });
  });
  
  const nGrams: Token[][] = [];
  for (let i = 0; i <= tokens.length - 4; i++) {
    nGrams.push([tokens[i], tokens[i+1], tokens[i+2], tokens[i+3]]);
  }
  return nGrams;
}

/**
 * Scores a 4-word chunk based on how "meaningful" it is.
 */
export function scoreSnippet(tokens: Token[], songTitle: string): number {
  let score = 0;
  const words = tokens.map(t => t.word);
  const uniqueWords = new Set(words);
  
  // 1. Penalize highly repetitive snippets (e.g., "LA LA LA LA")
  if (uniqueWords.size === 1) return -100; 
  if (uniqueWords.size === 2) score -= 15;
  if (uniqueWords.size === 4) score += 5; // Reward 4 unique words

  // 2. Reward longer, more complex words
  tokens.forEach((token, index) => {
    const lowerWord = token.word.toLowerCase();
    
    if (token.word.length > 5) score += 4;
    if (token.word.length > 8) score += 6;
    
    // Penalize stop words heavily, but don't completely nullify the segment
    if (STOP_WORDS.has(lowerWord)) {
      score -= 5; // Increased penalty for stop words
    } else {
      score += 4; // Slightly increased reward for non-stop words
    }

    // Penalize crossing punctuation or linebreaks (only applies to first 3 tokens)
    if (index < 3) {
      if (token.hasTrailingPunctuation) score -= 15;
      if (token.isLineEnd) score -= 20;
    }
  });

  // Reward starting or ending a line
  if (tokens[0].isLineStart) score += 12;
  if (tokens[3].isLineEnd) score += 12;

  // 3. Check if it contains the song title (makes it an "Easy" tier)
  const titleUpper = songTitle.toUpperCase();
  const snippetString = words.join(" ");
  if (snippetString.includes(titleUpper) || titleUpper.includes(snippetString)) {
    score += 20; 
  }

  return score;
}

/**
 * Main function to process a dataset and generate EuroRefrain data.
 */
export function generateRefrainData(dataset: RawSongData[]): ExtractedSnippet[] {
  const results: ExtractedSnippet[] = [];

  dataset.forEach(song => {
    const nGrams = get4Grams(song.lyrics);
    if (nGrams.length === 0) return;

    // Score all snippets
    const scoredSnippets = nGrams.map(tokens => ({
      tokens,
      words: tokens.map(t => t.word),
      score: scoreSnippet(tokens, song.title)
    }));

    // Sort by score descending
    scoredSnippets.sort((a, b) => b.score - a.score);

    // Pick up to 3 non-overlapping snippets
    const selectedSnippets = [];
    const usedTokens = new Set<Token>();
    const usedPhrases: string[][] = [];

    for (const snippet of scoredSnippets) {
      if (selectedSnippets.length >= 3) break;
      
      // Check for overlap in tokens
      const hasOverlap = snippet.tokens.some(t => usedTokens.has(t));
      
      // Check if it shares 3 or more words with any existing phrase
      let isTooSimilar = false;
      for (const phrase of usedPhrases) {
        let commonWords = 0;
        const tempPhrase = [...phrase];
        for (const word of snippet.words) {
          const idx = tempPhrase.indexOf(word);
          if (idx !== -1) {
            commonWords++;
            tempPhrase.splice(idx, 1);
          }
        }
        if (commonWords >= 3) {
          isTooSimilar = true;
          break;
        }
      }
      
      if (!hasOverlap && !isTooSimilar) {
        selectedSnippets.push(snippet);
        snippet.tokens.forEach(t => usedTokens.add(t));
        usedPhrases.push(snippet.words);
      }
    }

    selectedSnippets.forEach((snippet, index) => {
      // Determine tier based on score or if it contains the title
      let tier: "easy" | "medium" | "hard" | "expert" = "medium";
      const snippetString = snippet.words.join(" ");
      
      if (snippetString.includes(song.title.toUpperCase()) || song.title.toUpperCase().includes(snippetString)) {
        tier = "easy";
      } else if (snippet.score > 53) {
        tier = "easy"; // High score usually means very common/recognizable words
      } else if (snippet.score > 45) {
        tier = "medium";
      } else if (snippet.score > 35) {
        tier = "hard";
      } else {
        tier = "expert"; // Low score means obscure words or lots of stop words
      }

      results.push({
        id: `${song.id || `${song.year}-${song.artist.replace(/\s+/g, '').substring(0, 5)}`}-${index + 1}`,
        title: song.title,
        artist: song.artist,
        words: snippet.words,
        tier,
        year: song.year,
        language: song.language,
        placing: song.placing
      });
    });
  });

  return results;
}

// Example usage (commented out):
/*
const sampleData: RawSongData[] = [
  {
    id: "2012-SE", title: "Euphoria", artist: "Loreen", year: 2012,
    lyrics: "Why can't we make this moment last forevermore? Euphoria, forever 'till the end of time. From now on, only you and I."
  }
];
console.log(generateRefrainData(sampleData));
// Output might pick: ["EUPHORIA", "FOREVER", "TILL", "THE"]
*/
