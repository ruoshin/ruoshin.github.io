export const SKILLS_CUT_KEY = "skills-bag-cut";
export const SKILLS_EMPTIED_KEY = "skills-bag-emptied";
export const SKILLS_EMITTED_COUNT_KEY = "skills-bag-emitted-count";

export function readEmittedCount(): number {
  try {
    const n = Number(localStorage.getItem(SKILLS_EMITTED_COUNT_KEY) ?? "0");
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}
