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
  },
  {
    id: "9",
    date: "2026-04-14",
    title: "Languages and Bingo",
    description: "Hey! Sorry for the long break, I've been having a cold and I'm still quite knocked out, but I couldn't resist pushing this one out!\nWe've now got language support for 12 languages as well as Bingo for the live shows added to the game! The Bingo has some smaller tweeks to fix, but it has support for printing physical cards, playing locally or live with your friends! I hope you'll all enjoy it!",
  },
  {
    id: "10",
    date: "2026-07-03",
    title: "Eurovision 2026",
    description: "Hey! Sorry for the longER break! It's been quite some time since we had the nerve wracking final but I've finally added in the result of 2026! So starting from tomorrow (July the 4:th) you may start seeing this years entries in the daily challenges as well as in the Encore mode. Thanks for playing and stay put for future updates!",
  },
  {
    id: "11",
    date: "2026-07-30",
    title: "EuroCollection and sound effects",
    description: "Today we're releasing the next game on our site - It's a card collecting game which ties together with our other games! In EuroCollection, you earn a card pack containing 6 cards every time you finish any of the daily games. These card represent one Eurovision Content entry each! You can view them in sets and if you get duplicates you'll be awarded with conteffi with which you can craft cards you don't already own! Fancy, huh? And right, I've also added some sound effects! Don't like it? Well you can turn them off in the new profile settings in the top right!\n\nThank you so much for sicking around, I love the continued support! More updates coming soon!",
  },
  {
    id: "12",
    date: "2026-08-08",
    title: "EuroLinks and earn packs through encore mode",
    description: "EuroLinks has been like a little problem child. Never feeling truly fair, having incorrect answers or overlapping categories. Now we're changing that! From now on you'll only see song titles and I've made sure (I really hope) that there's no overlaps or false info! It might feel harder, but it should for sure feel a lot more fair! I'd love to hear what you all think of it!\n\nSecondly, I've increased the cap of packs you can earn from 6 to 10. Why? Cause now you can earn packs through playing Encore! Every 5:th streak you can earn a pack! So now all encore enjoyers can also join in in the card collection extatic!\n\Take care out there!",
  }
];
