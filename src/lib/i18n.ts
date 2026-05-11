export const LOCALES = ["zh-Hant", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "zh-Hant";

export type Localized<T = string> = Record<Locale, T>;

export function getLocale(astroLocale: string | undefined): Locale {
  return astroLocale === "en" ? "en" : "zh-Hant";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh-Hant" : "en";
}

export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\//, "");
  return locale === DEFAULT_LOCALE ? `/${clean}` : `/${locale}/${clean}`;
}

export function t<T>(localized: Localized<T>, locale: Locale): T {
  return localized[locale];
}

/** Compact constructor for `Localized<string>` used by content modules. */
export function tx(zh: string, en: string): Localized {
  return { "zh-Hant": zh, en };
}

export const ui = {
  metaDescription: {
    "zh-Hant": "Ruoshin Wang — 資深前端工程師，重視設計與功能易用性，為使用者打造良好體驗的產品。",
    en: "Ruoshin Wang — Senior Front-end Engineer focused on design quality and usability, building products that feel good to use.",
  },

  navAbout: { "zh-Hant": "About", en: "About" },
  navExperience: { "zh-Hant": "Experience", en: "Experience" },
  navProjects: { "zh-Hant": "Projects", en: "Projects" },
  navSkills: { "zh-Hant": "Skills", en: "Skills" },
  navContact: { "zh-Hant": "Contact", en: "Contact" },

  themeToggleAria: {
    "zh-Hant": "切換深淺色主題",
    en: "Toggle color theme",
  },
  langToggleLabel: { "zh-Hant": "EN", en: "中" },
  langToggleAria: {
    "zh-Hant": "Switch to English",
    en: "切換到中文",
  },

  heroEyebrow: {
    "zh-Hant": "Hi, I'm Ruoshin",
    en: "Hi, I'm Ruoshin",
  },
  heroCtaPrimary: { "zh-Hant": "查看經歷", en: "View experience" },
  heroCtaSecondary: { "zh-Hant": "聯絡我", en: "Get in touch" },

  aboutLabel: { "zh-Hant": "About", en: "About" },
  aboutTitle: {
    "zh-Hant": "跨領域思維。",
    en: "Cross-functional by design.",
  },
  aboutFacetFrontend: { "zh-Hant": "Frontend", en: "Frontend" },
  aboutFacetFrontendBody: {
    "zh-Hant": "十年以上 React 與現代前端工具鏈經驗，從產品架構到細節互動都能掌握。",
    en: "Over a decade of React and modern frontend tooling — comfortable from product architecture down to interaction details.",
  },
  aboutFacetBackend: { "zh-Hant": "Backend-aware", en: "Backend-aware" },
  aboutFacetBackendBody: {
    "zh-Hant": "曾任 PHP 後端工程師，能與後端工程師有效對話、共同設計 API 與資料流。",
    en: "Former PHP developer — able to design API contracts and data flows together with backend engineers.",
  },
  aboutFacetDesign: { "zh-Hant": "Design-aware", en: "Design-aware" },
  aboutFacetDesignBody: {
    "zh-Hant": "前端設計背景出身，熟悉 Figma 與設計協作流程，能還原並提出可行性建議。",
    en: "Frontend designer background — fluent in Figma and design handoff, able to translate intent and surface tradeoffs.",
  },

  experienceLabel: { "zh-Hant": "Experience", en: "Experience" },
  experienceTitle: {
    "zh-Hant": "我建造東西的地方。",
    en: "Where I've built things.",
  },

  projectsLabel: { "zh-Hant": "Projects", en: "Projects" },
  projectsTitle: {
    "zh-Hant": "做過的東西。",
    en: "Things I've made.",
  },

  skillsLabel: { "zh-Hant": "Skills", en: "Skills" },
  skillsTitle: {
    "zh-Hant": "常用的工具。",
    en: "Tools of the trade.",
  },

  contactLabel: { "zh-Hant": "Contact", en: "Contact" },
  contactTitle: {
    "zh-Hant": "一起來打造東西。",
    en: "Let's build something together.",
  },
  contactBody: {
    "zh-Hant":
      "目前對新的合作機會持開放態度。如果你有適合的職缺、合作專案，或單純想交流前端與設計，歡迎來信聊聊。",
    en: "Open to new opportunities. If you have a role, a collaboration in mind, or just want to chat about frontend and design — drop me a line.",
  },
  contactGithub: { "zh-Hant": "GitHub", en: "GitHub" },

  footerBuilt: {
    "zh-Hant": "以 Astro · Tailwind CSS · GitHub Pages 打造",
    en: "Built with Astro · Tailwind CSS · GitHub Pages",
  },
} satisfies Record<string, Localized>;
