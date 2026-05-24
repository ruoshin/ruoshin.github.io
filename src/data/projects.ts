import type { ImageMetadata } from "astro";
import actuaworks01 from "@/assets/images/actuaworks01.png";
import actuaworks02 from "@/assets/images/actuaworks02.png";
import actuaworks03 from "@/assets/images/actuaworks03.png";
import dataBridge01 from "@/assets/images/data-bridge01.png";
import dataBridge02 from "@/assets/images/data-bridge02.png";
import reportTool01 from "@/assets/images/reporttool01.png";
import reportTool02 from "@/assets/images/reporttool02.png";
import reportTool03 from "@/assets/images/reporttool03.png";
import reportToolNote01 from "@/assets/images/reporttoolnote01.jpg";
import reportToolNote02 from "@/assets/images/reporttoolnote02.jpg";
import synoptos01 from "@/assets/images/synoptos01.png";
import synoptos02 from "@/assets/images/synoptos02.png";
import tendecay01 from "@/assets/images/tendecay01.png";
import tendecay02 from "@/assets/images/tendecay02.png";
import tendecay03 from "@/assets/images/tendecay03.png";
import vocus01 from "@/assets/images/v01.png";
import vocus02 from "@/assets/images/v02.png";
import { type Localized, tx } from "@/lib/i18n";

export type ProjectImage = {
  src: ImageMetadata;
  alt: Localized;
  href?: string;
};

type Project = {
  id: string;
  /** Links this project to an entry in experience.ts so it can appear in
   *  that role's bonsai popup. */
  experienceId?: string;
  name: string;
  client?: Localized;
  summary?: Localized;
  href?: string;
  images: ProjectImage[];
  stack?: string[];
};

export const projects: Project[] = [
  {
    id: "actuaworks",
    experienceId: "actuaviz",
    name: "ActuaWorks",
    client: tx("ActuaViz / 精算軟體", "ActuaViz / Actuarial software"),
    summary: tx(
      "精算軟體前端，與精算師、產品端協作釐清 data model，從 Figma 可行性討論到介面實作與迭代。",
      "Frontend for the actuarial platform — aligning the underlying data model with actuaries and product, then carrying designs from Figma feasibility review through pixel-faithful implementation.",
    ),
    images: [
      { src: actuaworks01, alt: tx("ActuaWorks 介面截圖一", "ActuaWorks UI screenshot 1") },
      { src: actuaworks02, alt: tx("ActuaWorks 介面截圖二", "ActuaWorks UI screenshot 2") },
      { src: actuaworks03, alt: tx("ActuaWorks 介面截圖三", "ActuaWorks UI screenshot 3") },
    ],
  },
  {
    id: "data-bridge",
    experienceId: "actuaviz",
    name: "Data Bridge",
    client: tx("ActuaViz / 精算後台", "ActuaViz / Actuarial backend"),
    summary: tx(
      "精算後台系統，規劃功能流程並負責 UI/UX 設計與前端實作。",
      "Actuarial backend system — owned the flow design plus UI/UX and the frontend implementation.",
    ),
    images: [
      { src: dataBridge01, alt: tx("Data Bridge 介面截圖一", "Data Bridge UI screenshot 1") },
      { src: dataBridge02, alt: tx("Data Bridge 介面截圖二", "Data Bridge UI screenshot 2") },
    ],
  },
  {
    id: "vocus",
    experienceId: "vocus",
    name: "vocus.cc",
    client: tx("新銳數位 / 內容平台", "Vocus / Content platform"),
    summary: tx(
      "以 Next.js 重構平台前端架構，導入 Storybook 將樣式整理為可重用元件。",
      "Refactored the platform on Next.js and consolidated styles into reusable components with Storybook.",
    ),
    href: "https://vocus.cc",
    images: [
      { src: vocus01, alt: tx("vocus.cc 介面截圖一", "vocus.cc UI screenshot 1") },
      { src: vocus02, alt: tx("vocus.cc 介面截圖二", "vocus.cc UI screenshot 2") },
    ],
    stack: ["Next.js", "React", "Storybook", "SCSS"],
  },
  {
    id: "tendecay",
    experienceId: "tendecay",
    name: "苔息 Tendecay",
    client: tx("生態瓶模擬遊戲", "Ecosphere simulation"),
    images: [
      { src: tendecay01, alt: tx("苔息 Tendecay 介面截圖一", "Tendecay UI screenshot 1") },
      { src: tendecay02, alt: tx("苔息 Tendecay 介面截圖二", "Tendecay UI screenshot 2") },
      {
        src: tendecay03,
        alt: tx(
          "為繪製遊戲 pixel art 自製的小工具",
          "Custom mini-tool built for drawing the game's pixel art",
        ),
      },
    ],
  },
  {
    id: "nucleus",
    experienceId: "infocast",
    name: "Nucleus",
    client: tx("Infocast / 社群輿情分析平台", "Infocast / Social listening platform"),
    summary: tx(
      "從零到一參與 Nucleus 平台前端開發，協助分析師蒐集社群與新聞並產出客戶報告。",
      "Built Nucleus from zero to one — helping analysts collect coverage and assemble client reports.",
    ),
    images: [
      { src: synoptos01, alt: tx("Nucleus 平台主介面", "Nucleus platform UI 1") },
      { src: synoptos02, alt: tx("Nucleus 平台分析頁", "Nucleus platform UI 2") },
      { src: reportTool01, alt: tx("Nucleus 報告工具一", "Nucleus report tool 1") },
      { src: reportTool02, alt: tx("Nucleus 報告工具二", "Nucleus report tool 2") },
      { src: reportTool03, alt: tx("Nucleus 報告工具三", "Nucleus report tool 3") },
      { src: reportToolNote01, alt: tx("報告工具設計筆記一", "Report tool design notes 1") },
      { src: reportToolNote02, alt: tx("報告工具設計筆記二", "Report tool design notes 2") },
    ],
    stack: ["React", "Storybook", "JavaScript"],
  },
];
