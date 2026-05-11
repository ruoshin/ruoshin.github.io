export type BonsaiColor =
  | "leaf"
  | "sage"
  | "mustard"
  | "terra"
  | "rose"
  | "lavender"
  | "teal"
  | "clay";

export type BonsaiPlant = {
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

export const bonsaiPlants: BonsaiPlant[] = [
  { experienceId: "actuaViz", angle: 15, radius: 155, scale: 1.05, tilt: -8, color: "terra" },
  { experienceId: "vocus", angle: 95, radius: 65, scale: 0.85, tilt: 6, color: "teal" },
  { experienceId: "infocast", angle: 170, radius: 140, scale: 1.0, tilt: -5, color: "mustard" },
  { experienceId: "toujia", angle: 235, radius: 85, scale: 0.9, tilt: 10, color: "lavender" },
  { experienceId: "pace", angle: 310, radius: 130, scale: 0.95, tilt: -12, color: "rose" },
];

/** Decorative orbiters — no experience linkage, just visual fill. */
export type BonsaiDecorationKind = "kinoko" | "flower";

export type BonsaiDecoration = {
  kind: BonsaiDecorationKind;
  angle: number;
  radius: number;
  scale: number;
  tilt: number;
  color: BonsaiColor;
};

export const bonsaiDecorations: BonsaiDecoration[] = [
  { kind: "kinoko", angle: 55, radius: 75, scale: 0.7, tilt: -8, color: "lavender" },
  { kind: "kinoko", angle: 130, radius: 115, scale: 0.55, tilt: 5, color: "rose" },
  { kind: "kinoko", angle: 200, radius: 135, scale: 0.65, tilt: 12, color: "clay" },
  { kind: "kinoko", angle: 275, radius: 60, scale: 0.8, tilt: -6, color: "teal" },
  { kind: "kinoko", angle: 340, radius: 105, scale: 0.6, tilt: 9, color: "mustard" },
  { kind: "flower", angle: 30, radius: 90, scale: 0.7, tilt: -5, color: "rose" },
  { kind: "flower", angle: 110, radius: 50, scale: 0.8, tilt: 8, color: "mustard" },
  { kind: "flower", angle: 195, radius: 110, scale: 0.65, tilt: -10, color: "terra" },
  { kind: "flower", angle: 160, radius: 90, scale: 0.75, tilt: 12, color: "teal" },
  { kind: "flower", angle: 39, radius: 140, scale: 0.55, tilt: 8, color: "sage" },
  { kind: "flower", angle: 75, radius: 110, scale: 0.75, tilt: -10, color: "clay" },
  { kind: "flower", angle: 225, radius: 95, scale: 0.7, tilt: 3, color: "terra" },
  { kind: "flower", angle: 325, radius: 130, scale: 0.6, tilt: -6, color: "teal" },
];
