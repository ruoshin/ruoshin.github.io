export type BonsaiColor =
  | "leaf"
  | "sage"
  | "mustard"
  | "terra"
  | "rose"
  | "lavender"
  | "teal"
  | "clay";

export type BonsaiBranch = {
  /** Matches an entry in experience.ts so a click can open that role's drawer. */
  experienceId: string;
  /** Angle in degrees around the pot's vertical axis, clockwise from front
   *  (camera-facing side). 0 = front, 90 = right, 180 = back, 270 = left. */
  angle: number;
  /** Orbital radius in stage-local px. Inner ring ~60–90, outer ring ~120–160. */
  radius: number;
  /** Visual scale variation (0.7–1.1) so the scatter doesn't read as uniform. */
  scale: number;
  /** In-plane (screen-Z) tilt in degrees for organic lean. */
  tilt: number;
  /** Palette key — resolves to var(--bonsai-<color>) at render. */
  color: BonsaiColor;
};

export const bonsaiBranches: BonsaiBranch[] = [
  { experienceId: "actuaViz", angle: 15, radius: 155, scale: 1.05, tilt: -8, color: "terra" },
  { experienceId: "vocus", angle: 95, radius: 65, scale: 0.85, tilt: 6, color: "teal" },
  { experienceId: "infocast", angle: 170, radius: 140, scale: 1.0, tilt: -5, color: "mustard" },
  { experienceId: "toujia", angle: 235, radius: 85, scale: 0.9, tilt: 10, color: "lavender" },
  { experienceId: "pace", angle: 310, radius: 130, scale: 0.95, tilt: -12, color: "rose" },
];

/** Decorative orbiters (mushrooms) — no experience linkage, just visual fill. */
export type BonsaiDecoration = {
  angle: number;
  radius: number;
  scale: number;
  tilt: number;
  color: BonsaiColor;
};

export const bonsaiDecorations: BonsaiDecoration[] = [
  { angle: 55, radius: 75, scale: 0.7, tilt: -8, color: "lavender" },
  { angle: 130, radius: 115, scale: 0.55, tilt: 5, color: "rose" },
  { angle: 200, radius: 135, scale: 0.65, tilt: 12, color: "clay" },
  { angle: 275, radius: 60, scale: 0.8, tilt: -6, color: "teal" },
  { angle: 340, radius: 105, scale: 0.6, tilt: 9, color: "mustard" },
];
