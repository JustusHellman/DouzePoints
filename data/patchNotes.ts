export interface PatchNote {
  id: string;
  date: string;
  title: string;
  description: string;
  version?: string;
}

export const PATCH_NOTES: PatchNote[] = [
  {
    id: "1",
    date: "2026-02-21",
    title: "Welcome to Douze Points!",
    description: "The page is up and running! ",
  },
  {
    id: "2",
    date: "2026-03-16",
    title: "Patch Notes introduced",
    description: "Okay, I'm betting noone will ever read this, but if someone ever does - Hi! I've decided to put some patch notes in here so I can keep you posted on what's new on Douze Points! For now, I'm super happy that you're (hopefully) liking the game and I hope you'll stick around! There has been plenty of updates since the page was released, but from now on I'll try to keep you updated on the new stuff!",
  },
  {
    id: "3",
    date: "2026-03-17",
    title: "Full dataset prepared",
    description: "Thank you so much for the recent support! Today is a small yet large update. You won't notice anything yet, but in the coming days I'll exchange our dataset to include all Eurovision entries of all time. This will allow for more fun games and fair challenges, so stay put and thank you for all your support!",
  },
  {
    id: "4",
    date: "2026-03-19",
    title: "Major update - All entries of Eurovision",
    description: "Finally I've managed to gather all of the entries in the Eurovision history into the database! That means from tomorrow (20:th of March) the games will be able to pull challenges from a bigger pool and I'll be able to soonish make new game modes! Stay put for more fun in the future!\n\n Also a thank you to Gracie who pointed out that Tutta L'Italia had the wrong artist - It has now been fixed!",
  },
  {
    id: "5",
    date: "2026-03-20",
    title: "EuroLink poor options",
    description: "I'd like to appologize for today's EuroLinks having quite poor categories. I've updated it today around lunchtime so if you play after that, you'll have better options. I'm sorry if it caused any annoyance to anyone.",
  },
  {
    id: "6",
    date: "2026-03-23",
    title: "ENCORE - Infinite mode",
    description: "It's time to release the game mode I've been longing for and that has been requested several times...\n\nENCORE\nThe new infinite game mode where you can set your own settings on which placements and era you'd like to play with and select the game you'd like to play out of EuroSong, EuroArtist, EuroGuess and EuroArena! If you actually manage to get through all entries in any game mode, I'll be in shock and you'll be a true Eurovision legend!",
  },
  {
    id: "7",
    date: "2026-03-26",
    title: "General update",
    description: "Thank you all so much for playing the new infinite mode 'Encore' and enjoying it! It really makes me happy to see! I've made some smaller tweeks and fixes, hopefully nothing you'll really notice!",
  },
  {
    id: "8",
    date: "2026-03-30",
    title: "EuroRefrain updates tomorrow!",
    description: "I've gotten a lot of feedback that EuroRefrain has too many repetitative items and words, or that it sometimes seems incorrect or illogical. I've hence taken some time and updated the whole database that's used and hopefully you'll notice a good difference! It might feel harder, but it should feel more fair!\n\nThanks for playing!",
  }
];
