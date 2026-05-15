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
  /** Orbital radius in stage-local px. Scatter across ~60–125 with every
   *  orbiter at a unique value, picking one far from each neighbour's so
   *  adjacent angles don't land on the same ring (uniform radii read as a
   *  halo around the tree, not a scatter). */
  radius: number;
  /** Visual scale variation (0.7–1.1) so the scatter doesn't read as uniform. */
  scale: number;
  /** In-plane (screen-Z) tilt in degrees for organic lean. */
  tilt: number;
  /** Palette key — resolves to var(--bonsai-<color>) at render. */
  color: BonsaiColor;
};

// Radii bound: each plant's screen-projected base must stay inside
// the soil's inner ellipse (rx≈160 ry≈55, centered at screen y≈458).
// BonsaiScene's `perspective: 1400px` pushes front-orbit plants (cos(θ)>0)
// visibly further down on screen than the plain sin(20°) projection
// would suggest — so the binding rule at the front is r·cos(θ) ≲ 117
// (mirror: r·cos(θ) ≳ -127 at the back). Lateral constraint at
// θ≈90°/270° is much looser; the plant body half-width (plant ~19px
// at 6% of 640, kinoko ~26px at 8%, flower ~16px at 5%, scaled by
// `scale`) is rarely binding.
export const bonsaiPlants: BonsaiPlant[] = [
  { experienceId: "vocus", angle: 322, radius: 95, scale: 0.85, tilt: 0, color: "teal" },
  { experienceId: "infocast", angle: 55, radius: 125, scale: 1.0, tilt: 0, color: "mustard" },
];

/** The central tree represents the "main" experience — typically the most
 *  recent role. Clicking the tree opens that experience's popup just like
 *  the orbiting plants do. */
export const bonsaiTreeExperienceId = "actuaviz";

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

// Deliberately non-uniform angular spacing — even ≥20° gaps everywhere were
// reading as a ring outline regardless of radius variation. Now there are
// dense clusters (5°-38°, 80°-95°, 155°-195°) and obvious empty bands
// (95°-130° spans 35°; 290°-vocus-5° spans ~75° broken only by vocus at
// 322°), so the scatter no longer traces a single circular path.
// Radii are unique per orbiter (incl. plants above) across 60–125, with
// every adjacent pair differing by ≥25 so no two close-angle items ever
// share a ring.
export const bonsaiDecorations: BonsaiDecoration[] = [
  { kind: "flower", angle: 5, radius: 70, scale: 0.65, tilt: 0, color: "rose" },
  { kind: "kinoko", angle: 22, radius: 115, scale: 0.7, tilt: 0, color: "lavender" },
  { kind: "flower", angle: 38, radius: 60, scale: 0.5, tilt: 0, color: "mustard" },
  { kind: "flower", angle: 80, radius: 80, scale: 0.8, tilt: 0, color: "teal" },
  { kind: "kinoko", angle: 95, radius: 105, scale: 0.6, tilt: 0, color: "terra" },
  { kind: "flower", angle: 130, radius: 65, scale: 0.55, tilt: 0, color: "rose" },
  { kind: "kinoko", angle: 155, radius: 110, scale: 0.7, tilt: 0, color: "lavender" },
  { kind: "flower", angle: 175, radius: 75, scale: 0.6, tilt: 0, color: "mustard" },
  { kind: "flower", angle: 195, radius: 122, scale: 0.75, tilt: 0, color: "terra" },
  { kind: "kinoko", angle: 222, radius: 85, scale: 0.55, tilt: 0, color: "rose" },
  { kind: "flower", angle: 248, radius: 118, scale: 0.7, tilt: 0, color: "lavender" },
  { kind: "kinoko", angle: 270, radius: 90, scale: 0.65, tilt: 0, color: "teal" },
  { kind: "flower", angle: 290, radius: 120, scale: 0.8, tilt: 0, color: "terra" },
];
