import type { ImageMetadata } from "astro";
import allianz from "@/assets/images/allianz.png";
import li01 from "@/assets/images/li01.png";
import ohstudy01 from "@/assets/images/ohstudy01.png";
import ohstudy02 from "@/assets/images/ohstudy02.png";
import ohstudy03 from "@/assets/images/ohstudy03.png";
import reportTool01 from "@/assets/images/reporttool01.png";
import reportTool02 from "@/assets/images/reporttool02.png";
import reportTool03 from "@/assets/images/reporttool03.png";
import reportToolNote01 from "@/assets/images/reporttoolnote01.jpg";
import reportToolNote02 from "@/assets/images/reporttoolnote02.jpg";
import synoptos01 from "@/assets/images/synoptos01.png";
import synoptos02 from "@/assets/images/synoptos02.png";
import umai01 from "@/assets/images/umai01.png";
import umai02 from "@/assets/images/umai02.png";
import vocus01 from "@/assets/images/v01.png";
import vocus02 from "@/assets/images/v02.png";
import { type Localized, tx } from "@/lib/i18n";

export type ProjectImage = {
  src: ImageMetadata;
  alt: Localized;
  href?: string;
};

export type Project = {
  id: string;
  name: string;
  client?: Localized;
  summary?: Localized;
  href?: string;
  images: ProjectImage[];
  stack?: string[];
};

export const projects: Project[] = [
  {
    id: "vocus",
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
    id: "nucleus",
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

export const otherImages: ProjectImage[] = [
  { src: allianz, alt: tx("Allianz", "Allianz") },
  { src: ohstudy01, alt: tx("OHStudy 一", "OHStudy 1"), href: "https://ohstudy.net" },
  { src: ohstudy02, alt: tx("OHStudy 二", "OHStudy 2"), href: "https://ohstudy.net" },
  { src: ohstudy03, alt: tx("OHStudy 三", "OHStudy 3"), href: "https://ohstudy.net" },
  { src: umai01, alt: tx("Umai 一", "Umai 1") },
  { src: umai02, alt: tx("Umai 二", "Umai 2") },
  { src: li01, alt: tx("LI", "LI") },
];
