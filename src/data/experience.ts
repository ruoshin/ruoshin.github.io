export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: 'Actuaviz',
    role: 'Senior Front-end Developer',
    period: '2021.10 — Present',
    summary:
      '參與精算軟體開發，面對高度專業且複雜的精算與保險領域知識，需在跨部門會議中與領域專家持續溝通，釐清產品 data model 與需求邊界。在快速迭代的開發節奏中，培養出靈活的架構思維與試錯能力。',
    highlights: [
      '與設計師密切協作，從 Figma 設計可行性討論、介面精準還原到後續迭代優化',
      '主動參與跨領域會議，與精算人員、產品端協作釐清產品 data model',
      '以 Office.js 與 React 開發 Excel add-in，將精算工具整合進使用者熟悉的 Excel 環境',
      '參與 AI 保險對話介面 POC，負責前端介面開發與維護',
      '規劃內部管理系統功能流程，並負責 UI/UX 設計與開發',
      '產品 landing page 的設計實作與後續維護',
      '使用 Jest 與 Playwright 撰寫單元測試與 E2E 測試',
    ],
    stack: ['React', 'TypeScript', 'Office.js', 'Tailwind CSS', 'Jest', 'Playwright', 'Figma'],
  },
  {
    company: '新銳數位 / vocus.cc',
    role: 'Front-end Developer',
    period: '2019.11 — 2020.11',
    summary:
      '維護內容平台方格子（vocus.cc），與設計師、後端密切協作迭代介面與功能，並推動架構與 SEO 改善。',
    highlights: [
      '使用 Next.js 重構平台前端架構',
      '建立 Storybook，將現有樣式整理為可重複使用的 component',
      '新增方格人物訪談頁面，串接後端 API',
      '改善網站 SEO',
    ],
    stack: ['React', 'Next.js', 'Storybook', 'SCSS'],
  },
  {
    company: 'Infocast / Nucleus',
    role: 'Front-end Developer',
    period: '2015.6 — 2019.6',
    summary:
      '社群輿情分析平台 Nucleus 的前端開發，協助分析師蒐集社群媒體與新聞文章並產出客戶報告。從零到一參與整個產品週期，與跨部門協作頻繁。',
    highlights: [
      '使用 React 開發產品前端，根據設計師 mockup 實作介面並串接後端 API',
      '推動 Storybook 樣式模組化與維護，縮短開發時間並改善設計—前端團隊溝通',
      '帶領、協助 junior front-end developer，撰寫內部前端開發文件',
      '製作客戶與內部官方網站、Email 樣板',
    ],
    stack: ['React', 'Storybook', 'JavaScript'],
  },
  {
    company: '北士設計 PACE Design',
    role: 'Front-end Designer',
    period: '2015.1 — 2015.6',
    summary: '參與品牌形象網站從規劃、設計到實作的完整流程，與品牌設計團隊深度協作。',
    highlights: [
      '參與品牌形象網站開發的討論、設計與實作',
      '使用 jQuery、Bootstrap 製作 RWD 網站',
      '撰寫 LESS 將 CSS 模組化',
      '與客戶開會直接討論需求',
    ],
    stack: ['jQuery', 'Bootstrap', 'LESS', 'RWD'],
  },
  {
    company: '台灣頭家',
    role: 'PHP Developer',
    period: '2014.7 — 2014.12',
    summary: '使用內部 PHP 框架開發後端功能，這段經驗奠定了與後端工程師溝通的基礎。',
    highlights: [],
    stack: ['PHP'],
  },
];
