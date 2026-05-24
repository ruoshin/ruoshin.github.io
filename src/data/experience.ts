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
};

export const experience: Experience[] = [
  {
    id: "actuaviz",
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
    id: "tendecay",
    company: "苔息 Tendecay",
    shortName: tx("苔息", "Tendecay"),
    role: tx("個人專案", "Side project"),
    period: "2026 — Present",
    summary: tx(
      "苔息 Tendecay 是一款密閉生態瓶模擬遊戲。玩家只擺放土壤、水、苔蘚孢子，菌絲、藻類、地衣、蘭花皆由規則自行產生。基於嚴格的養分守恆定律，每一個生態瓶都會走過獨一無二的演替路徑。Pixel Art 美術 + 自製 2.5D 渲染管線，呈現透過玻璃觀看微縮世界的儀式感。整個專案以 Vibe Coding 模式與 Claude Code 協作完成，重點在示範 doc-to-code 的設計流程，以及 AI 重度參與時如何維持嚴謹的系統架構。",
      'Tendecay is a sealed-jar ecosphere simulation game. Players only place soil, water, and moss spores — mycelium, algae, lichen, and orchids all emerge from the rules. Under strict nutrient conservation, every jar walks its own succession path. Pixel art paired with a custom 2.5D render pipeline captures the ritual of peering into a miniature world through glass. Built end-to-end in close collaboration with Claude Code ("vibe coding") to demonstrate the doc-to-code design workflow and how a disciplined system architecture survives heavy AI co-authorship.',
    ),
    highlights: [
      tx(
        "結合生態學知識、遊戲設計與工程實作，從概念到 prototype 獨立完成",
        "Solo-built from concept to prototype, weaving together ecology knowledge, game design, and engineering.",
      ),
      tx(
        "全程與 Claude Code 協作開發，主導設計、架構、debug 引導與品質把關",
        "Built end-to-end in close collaboration with Claude Code — leading design, architecture, debugging direction, and quality control.",
      ),
      tx(
        "建立 CLAUDE.md + MEMORY.md + 設計文件三層 context 系統，讓 AI 跨 session 維持一致性",
        "Designed a three-layer context system (CLAUDE.md + MEMORY.md + design docs) so the AI stays coherent across sessions.",
      ),
      tx(
        "自訂分層架構 + 設計文件先行（doc-to-code 對應），讓 AI 在規則內實作",
        "Custom layered architecture with a design-docs-first workflow (doc-to-code correspondence) so the AI implements within explicit boundaries.",
      ),
      tx(
        "為 pixel art 自製 in-browser painter 工具：含調色、預覽、與主遊戲 sprite atlas 雙向匯入匯出",
        "Built an in-browser pixel-art painter — palette editor, live preview, and two-way import/export with the main game's sprite atlas.",
      ),
      tx(
        "從零打造 Pixel Art 2.5D 渲染管線",
        "Custom 2.5D render pipeline — Z-sort, Y-axis compression, autotile, deferred flush, and glass lighting.",
      ),
    ],
    stack: ["Phaser 3", "TypeScript", "Vite", "Vitest"],
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
];
