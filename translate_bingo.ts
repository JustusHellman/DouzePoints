import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const enBingo = {
  bingo: {
    title: "EuroBingo",
    subtitle: "Try to get 5 in a row from events in the live show",
    howToPlay: "Mark squares as you see events happen during the show. Get 5 in a row, column, or diagonal to win!",
    rules: {
      rule1: "Tap a square to mark it when you spot the event on screen.",
      rule2: "Long-press (or right-click) any square to read its full description.",
      rule3: "Get 5 marked squares in a row, column, or diagonal to get a Bingo!",
      rule4: "The center '12' square is a free space to help you out."
    },
    newBoard: "New Board",
    confirmNewBoard: "Are you sure you want to generate a new board? Your current progress will be lost.",
    bingoTitle: "BINGO!",
    bingoMessage: "You've got a Bingo! What would you like to do next?",
    continuePlaying: "Keep Playing",
    generateNew: "New Board",
    freeSquare: "12",
    share: {
      title: "Share Board",
      emoji: "Copy Emoji Grid",
      image: "Save as Image",
      print: "Print Cards",
      copied: "Copied to clipboard!",
      emojiText: "EuroBingo 2026 🏆\n\n{grid}\nPlay at: {url}"
    },
    countdown: {
      days: "days",
      hours: "h",
      minutes: "m",
      seconds: "s",
      toShow: "to {showName}",
      isLive: "{showName} is LIVE!",
      allShowsFinished: "Thank you for playing, until next time!"
    },
    events: {
      // Performance
      perf_wind_machine: "Wind machine",
      perf_key_change: "Key change",
      perf_pyrotechnics: "Pyrotechnics",
      perf_costume_reveal: "Costume reveal and tearaway",
      perf_barefoot: "Barefoot singer",
      perf_fake_instrument: "Fake instrument playing",
      perf_glitter: "Excessive glitter and sequins",
      perf_traditional_inst: "Traditional instrument",
      perf_rap: "Rap section",
      perf_operatic: "Operatic vocals",
      perf_high_note: "High note held for 5+ seconds",
      perf_weird_dancers: "Weird backing dancers",
      perf_winks: "Singer winks at camera",
      perf_leather: "Leather outfit",
      perf_white_suit: "White suit",
      perf_smoke: "Dramatic smoke and fog",
      perf_fire: "Fire on stage",
      perf_heart_peace: "Heart hands and Peace sign",
      perf_on_floor: "Singer lies on floor",
      perf_acrobatics: "Acrobatics and Circus act",
      perf_edm_drop: "Dubstep and EDM drop",
      perf_sax_keytar: "Saxophone and Keytar solo",
      perf_touches_camera: "Singer touches camera",
      perf_bw_effect: "Black & white camera effect",
      perf_sunglasses: "Sunglasses indoors",

      // Production / Hosts
      prod_french: "Host speaks French",
      prod_awkward_joke: "Awkward host joke",
      prod_tech_glitch: "Minor technical glitch",
      prod_host_costume: "Host costume change",
      prod_australia: "Australia mentioned",
      prod_abba: "ABBA mentioned",
      prod_prev_winner: "Previous winner appears",
      prod_post_nature: "Postcard features nature",
      prod_post_food: "Postcard features food",
      prod_post_dancing: "Postcard features dancing",
      prod_host_sings: "Host sings",
      prod_junior_euro: "Junior Eurovision mention",
      prod_camera_visible: "Camera operator accidentally visible",
      prod_big_five: "Big Five joke",
      prod_uk_zero: "UK zero points joke",
      prod_multilingual: "Host speaks in 3+ languages",
      prod_sat_delay: "Delay in satellite connection",
      prod_host_sequins: "Host wears sequins",
      prod_host_country_joke: "Joke about the host country",
      prod_host_audience: "Host interacts with the audience",
      prod_meme: "Host mentions a past Eurovision meme",
      prod_teleprompter: "Host struggles with teleprompter",
      prod_awkward_interview: "Awkward green room interview",
      prod_mispronounce: "Host mispronounces a country or name",
      prod_weird_prop: "Host holds a weird prop",

      // Voting
      vote_sings: "Spokesperson sings their votes",
      vote_milks_time: "Spokesperson milks their screen time",
      vote_12_host: "12 points to the host country",
      vote_neighbor: "Obvious neighborly voting block",
      vote_slow: "Spokesperson too slow",
      vote_thank_you: "\"Thank you for a wonderful show\"",
      vote_tech_delay: "Technical delay in voting",
      vote_public_zero: "Public vote gives 0 points",
      vote_unexpected_lead: "Unexpected country takes the lead",
      vote_close_race: "Close race between top 2",
      vote_winner_cries: "Winner cries",
      vote_traditional: "Spokesperson wears traditional dress",
      vote_weird_bg: "Spokesperson has a weird background",
      vote_flirts: "Spokesperson flirts with the host",
      vote_boos: "Audience boos a country's vote",
      vote_massive_jump: "Massive jump in public vote points (>200)",
      vote_jury_public_diff: "Jury and Public vote completely disagree",
      vote_prop: "Spokesperson holds a prop",
      vote_rushed: "Host rushes the spokesperson",
      vote_french: "Spokesperson speaks French",
      vote_12_to_zero: "12 points go to a country with 0 points",
      vote_forgets: "Spokesperson forgets the points",
      vote_awkward_silence: "Awkward silence before points are given",
      vote_echo: "Spokesperson's audio echoes",
      vote_joke_12: "Country gives 12 points to themselves (joke)",

      // Audience / Green Room
      aud_crying: "Crying fan",
      aud_giant_flag: "Giant flag blocks the camera",
      aud_drinking: "Artist drinking in green room",
      aud_celebrity: "Celebrity cameo in audience",
      aud_crazy_costume: "Fan in crazy costume",
      aud_non_part_flag: "Non-participating country flag (e.g., USA)",
      aud_sign: "Audience member with a sign",
      aud_confused: "Artist looks confused",
      aud_tiny_flag: "Artist waving a tiny flag",
      aud_bored: "Green room artist looks bored",
      aud_eating: "Artist eating in the green room",
      aud_phone: "Green room artist on their phone",
      aud_face_paint: "Audience member with face paint",
      aud_flag_cape: "Artist wearing country's flag as a cape",
      aud_jumps_sofa: "Green room artist jumps on sofa",
      aud_crying_joy: "Audience member crying with joy",
      aud_stuffed_animal: "Artist holding a stuffed animal",
      aud_dance: "Green room artist doing a coordinated dance",
      aud_sequined_hat: "Audience member wearing a sequined hat",
      aud_mini_instrument: "Artist playing a mini instrument",
      aud_cheers_camera: "Green room artist holding a drink up to the camera",
      aud_country_suit: "Audience member wearing a country-themed suit",
      aud_hugging: "Artist hugging another country's artist",
      aud_sunglasses: "Green room artist wearing sunglasses",
      aud_yawning: "Audience member sleeping/yawning"
    }
  }
};

const languages = [
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'sv', name: 'Swedish' },
  { code: 'uk', name: 'Ukrainian' }
];

async function translate() {
  for (const lang of languages) {
    console.log(`Translating to ${lang.name}...`);
    const prompt = `Translate the following JSON object to ${lang.name}. Keep the exact same keys, only translate the values. Return ONLY valid JSON, no markdown formatting, no backticks.

${JSON.stringify(enBingo, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1
      }
    });

    let text = response.text;
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const fileContent = `export default ${text};\n`;
    fs.writeFileSync(path.join(process.cwd(), 'locales', lang.code, 'bingo.ts'), fileContent);
    
    // Update index.ts
    const indexPath = path.join(process.cwd(), 'locales', lang.code, 'index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    indexContent = indexContent.replace(/import bingo from '\.\.\/en\/bingo\.ts';/, "import bingo from './bingo.ts';");
    fs.writeFileSync(indexPath, indexContent);
    console.log(`Done ${lang.name}`);
  }
}

translate().catch(console.error);
