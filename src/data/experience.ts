import { type Localized, tx } from "@/lib/i18n";

export type Experience = {
  id: string;
  company: string;
  shortName?: Localized;
  href?: string;
  role: Localized;
  period: string;
  summary: Localized;
  highlights: Localized[];
  stack: string[];
  /** Hide this entry from the sidebar index (still shown in the Experience section). */
  sidebarHidden?: boolean;
};

export const experience: Experience[] = [
  {
    id: "actuaViz",
    company: "ActuaViz",
    href: "https://www.actuaviz.com",
    role: tx("資深前端工程師", "Senior Front-end Developer"),
    period: "2021.10 — Present",
    summary: tx(
      "參與精算軟體開發，面對高度專業且複雜的精算與保險領域知識，需在跨部門會議中與領域專家持續溝通，釐清產品 data model 與需求邊界。在快速迭代的開發節奏中，培養出靈活的架構思維與試錯能力。",
      "Building actuarial software in a domain that demands constant cross-functional dialogue with subject matter experts to refine product data models and requirement boundaries. Iteration is fast, which has sharpened a flexible, decision-driven approach to architecture.",
    ),
    highlights: [
      tx(
        "與設計師密切協作，從 Figma 設計可行性討論、介面精準還原到後續迭代優化",
        "Worked closely with designers — from Figma feasibility reviews to pixel-faithful UI implementation and iterative refinement.",
      ),
      tx(
        "主動參與跨領域會議，與精算人員、產品端協作釐清產品 data model",
        "Joined cross-discipline meetings to align with actuaries and product on the underlying data model.",
      ),
      tx(
        "以 Office.js 與 React 開發 Excel add-in，將精算工具整合進使用者熟悉的 Excel 環境",
        "Built an Excel add-in with Office.js and React, embedding our actuarial tooling directly into the workflow users already know.",
      ),
      tx(
        "參與 AI 保險對話介面 POC，負責前端介面開發與維護",
        "Drove the frontend for an AI insurance conversational-interface POC.",
      ),
      tx(
        "規劃內部管理系統功能流程，並負責 UI/UX 設計與開發",
        "Owned the flow design plus UI/UX implementation of an internal management system.",
      ),
      tx(
        "產品 landing page 的設計實作與後續維護",
        "Designed, built, and maintained the product landing page.",
      ),
      tx(
        "使用 Jest 與 Playwright 撰寫單元測試與 E2E 測試",
        "Wrote unit and end-to-end tests with Jest and Playwright.",
      ),
    ],
    stack: ["React", "TypeScript", "Office.js", "Tailwind CSS", "Jest", "Playwright", "Figma"],
  },
  {
    id: "vocus",
    company: "新銳數位 / vocus.cc",
    shortName: tx("vocus.cc", "vocus.cc"),
    href: "https://vocus.cc",
    role: tx("前端工程師", "Front-end Developer"),
    period: "2019.11 — 2020.11",
    summary: tx(
      "維護內容平台方格子（vocus.cc），與設計師、後端密切協作迭代介面與功能，並推動架構與 SEO 改善。",
      "Maintained the content platform vocus.cc, partnering with designers and backend engineers to iterate on UX and ship architectural and SEO improvements.",
    ),
    highlights: [
      tx(
        "看出舊前端架構對 SEO 不友善，提案並開始用 Next.js 重寫",
        "Identified SEO limitations in the existing client-side architecture and initiated a Next.js rewrite.",
      ),
      tx(
        "建立 Storybook，將現有樣式整理為可重複使用的 component",
        "Introduced Storybook and consolidated existing styles into reusable components.",
      ),
      tx(
        "新增方格人物訪談頁面，串接後端 API",
        'Shipped the "vocus people" interview page end-to-end with the backend API.',
      ),
    ],
    stack: ["React", "Next.js", "Storybook", "SCSS"],
  },
  {
    id: "infocast",
    company: "Infocast / Nucleus",
    shortName: tx("Infocast", "Infocast"),
    href: "https://lihsunco.com/",
    role: tx("前端工程師", "Front-end Developer"),
    period: "2015.6 — 2019.6",
    summary: tx(
      "社群輿情分析平台 Nucleus 的前端開發，協助分析師蒐集社群媒體與新聞文章並產出客戶報告。從零到一參與整個產品週期，與跨部門協作頻繁。",
      "Frontend lead on Nucleus, a social listening and analysis platform that helps analysts collect coverage from social and news outlets and assemble client reports. Took the product from zero to one with heavy cross-team collaboration.",
    ),
    highlights: [
      tx(
        "使用 React 開發產品前端，根據設計師 mockup 實作介面並串接後端 API",
        "Built the React frontend, translating designer mockups into UI and integrating with the backend API.",
      ),
      tx(
        "推動 Storybook 樣式模組化與維護，縮短開發時間並改善設計—前端團隊溝通",
        "Drove Storybook adoption to modularise styles, shorten dev cycles, and tighten the design–frontend feedback loop.",
      ),
      tx(
        "帶領、協助 junior front-end developer，撰寫內部前端開發文件",
        "Mentored junior frontend developers and authored internal frontend engineering docs.",
      ),
      tx(
        "製作客戶與內部官方網站、Email 樣板",
        "Built client and internal marketing sites and reusable email templates.",
      ),
    ],
    stack: ["React", "Storybook", "JavaScript"],
  },
  {
    id: "pace",
    company: "北士設計 PACE Design",
    shortName: tx("PACE Design", "PACE Design"),
    href: "https://pace.com.tw",
    role: tx("前端設計師", "Front-end Designer"),
    period: "2015.1 — 2015.6",
    summary: tx(
      "參與品牌形象網站從規劃、設計到實作的完整流程，與品牌設計團隊深度協作。",
      "Worked across the full brand-website lifecycle — strategy, design, and implementation — in close partnership with the brand design team.",
    ),
    highlights: [
      tx(
        "參與品牌形象網站開發的討論、設計與實作",
        "Participated in the discussion, design, and build of brand websites.",
      ),
      tx(
        "使用 jQuery、Bootstrap 製作 RWD 網站",
        "Built responsive sites with jQuery and Bootstrap.",
      ),
      tx("撰寫 LESS 將 CSS 模組化", "Modularised stylesheets with LESS."),
      tx("與客戶開會直接討論需求", "Met directly with clients to gather and clarify requirements."),
    ],
    stack: ["jQuery", "Bootstrap", "LESS", "RWD"],
    sidebarHidden: true,
  },
  {
    id: "toujia",
    company: "台灣頭家",
    role: tx("後端工程師", "PHP Developer"),
    period: "2014.7 — 2014.12",
    summary: tx(
      "使用內部 PHP 框架開發後端功能，這段經驗奠定了與後端工程師溝通的基礎。",
      "Built backend features on the company's in-house PHP framework. This stint shaped how I collaborate with backend engineers today.",
    ),
    highlights: [],
    stack: ["PHP"],
    sidebarHidden: true,
  },
];
