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

  }
];
