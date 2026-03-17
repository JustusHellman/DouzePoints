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

  }
];
