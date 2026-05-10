import { type Localized, tx } from "@/lib/i18n";

export type Profile = {
  name: string;
  title: Localized;
  tagline: Localized;
  bio: Localized;
  location: Localized;
  email: string;
  links: {
    github: string;
  };
};

export const profile: Profile = {
  name: "Ruoshin Wang",
  title: tx("資深前端工程師", "Senior Front-end Engineer"),
  tagline: tx(
    "重視設計與功能易用性，為使用者打造良好體驗的產品。",
    "Frontend engineer focused on design and usability — building products that feel good to use.",
  ),
  bio: tx(
    "擁有十年以上前端開發經驗，曾參與從 0 到 1 的產品開發、平台架構重構，以及高度專業領域（精算、保險）的軟體建置。早期的後端工程師與網站設計經驗，讓我能在跨部門協作中減少溝通誤差，並在快速迭代與需求變動的節奏中，依當下情境選擇最合適、最具彈性的設計。",
    "Over a decade of frontend experience spanning 0-to-1 product work, platform refactors, and software for highly specialised domains (actuarial science, insurance). An earlier background as a backend engineer and web designer means I can move fluently across team boundaries — and pick the most flexible, fit-for-purpose design when requirements keep shifting.",
  ),
  location: tx("臺灣臺北", "Taipei, Taiwan"),
  email: "ruoshin0706@gmail.com",
  links: {
    github: "https://github.com/ruoshin",
  },
};
