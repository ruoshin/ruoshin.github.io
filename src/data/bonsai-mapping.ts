/** Glyph used for any orbiter (experience plant or decoration). The kind
 *  also picks the per-glyph width rule in BonsaiScene's CSS. */
type BonsaiOrbiterKind = "plant" | "kinoko" | "flower";

type BonsaiPlant = {
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
  /** Any CSS color string — applied as `color:` on the orbiter so the SVG's
   *  currentColor picks it up. Clickable orbiters use vivid brand hexes;
   *  decorations use desaturated hexes so the eye is pulled to the
   *  experience plants and tree first. */
  color: string;
  /** Dark-mode color override. The light-mode brand hexes are tuned against
   *  the cream parchment bg; against the warm-earth dark bg they read as
   *  out-of-palette RGB-bright. Provide a warmer, slightly less saturated
   *  OKLCH here so brand plants harmonize with the dark accent palette. */
  colorDark?: string;
  /** Glyph used for the orbiter. Defaults to "plant"; swap when a role
   *  reads better as a different silhouette. */
  kind?: BonsaiOrbiterKind;
};

// Radii bound: each plant's screen-projected base must stay inside the
// soil's inner ellipse. BonsaiScene's `perspective: 1400px` pushes
// front-orbit plants (cos(θ)>0) visibly further down on screen than the
// plain sin(20°) projection would suggest — so the binding rule at the
// front is r·cos(θ) ≲ 117 (mirror: r·cos(θ) ≳ -127 at the back). The
// lateral constraint at θ≈90°/270° is much looser and has never been
// binding in practice.
export const bonsaiPlants: BonsaiPlant[] = [
  {
    experienceId: "vocus",
    angle: 322,
    radius: 95,
    scale: 0.85,
    tilt: 0,
    color: "#ff485a",
    colorDark: "oklch(0.72 0.16 25)",
    kind: "kinoko",
  },
  {
    experienceId: "infocast",
    angle: 55,
    radius: 125,
    scale: 1.0,
    tilt: 0,
    color: "#2eb7e6",
    colorDark: "oklch(0.72 0.12 215)",
  },
  {
    experienceId: "tendecay",
    angle: 195,
    radius: 122,
    scale: 0.95,
    tilt: 0,
    color: "#5a9d6b",
    colorDark: "oklch(0.72 0.12 145)",
  },
];

/** The central tree represents the "main" experience — typically the most
 *  recent role. Clicking the tree opens that experience's popup just like
 *  the orbiting plants do. */
export const bonsaiTreeExperienceId = "actuaviz";

/** Tree color — applied inline on the tree element; the SVG fills with
 *  currentColor so any CSS color value works here. Dark counterpart sits
 *  in the warm-earth palette (see colorDark on BonsaiPlant for rationale). */
export const bonsaiTreeColor = "#407e9f";
export const bonsaiTreeColorDark = "oklch(0.65 0.10 230)";

/** Decorative orbiters — no experience linkage, just visual fill. */
type BonsaiDecoration = {
  kind: BonsaiOrbiterKind;
  angle: number;
  radius: number;
  scale: number;
  tilt: number;
  color: string;
};

// Deliberately non-uniform angular spacing — even ≥20° gaps everywhere were
// reading as a ring outline regardless of radius variation. Now there are
// dense clusters (5°-38°, 80°-95°, 155°-195°) and obvious empty bands
// (95°-130° spans 35°; 290°-vocus-5° spans ~75° broken only by vocus at
// 322°), so the scatter no longer traces a single circular path.
// Radii are unique per orbiter (incl. plants above) across 60–125, with
// every adjacent pair differing by ≥25 so no two close-angle items ever
// share a ring.
// Colors are deliberately low-chroma so the only saturated spots in the
// scene are the experience plants (vocus/infocast/tendecay) and the central
// tree — the visual hierarchy reads "click these" without any extra affordance.
export const bonsaiDecorations: BonsaiDecoration[] = [
  { kind: "flower", angle: 5, radius: 70, scale: 0.65, tilt: 0, color: "#ac7575" },
  { kind: "kinoko", angle: 22, radius: 115, scale: 0.7, tilt: 0, color: "#807ba5" },
  { kind: "flower", angle: 38, radius: 60, scale: 0.5, tilt: 0, color: "#93854f" },
  { kind: "flower", angle: 80, radius: 80, scale: 0.8, tilt: 0, color: "#698f8c" },
  { kind: "kinoko", angle: 95, radius: 105, scale: 0.6, tilt: 0, color: "#ae7d61" },
  { kind: "flower", angle: 130, radius: 65, scale: 0.55, tilt: 0, color: "#ac7575" },
  { kind: "kinoko", angle: 155, radius: 110, scale: 0.7, tilt: 0, color: "#807ba5" },
  { kind: "flower", angle: 175, radius: 75, scale: 0.6, tilt: 0, color: "#93854f" },
  { kind: "kinoko", angle: 222, radius: 85, scale: 0.55, tilt: 0, color: "#ac7575" },
  { kind: "flower", angle: 248, radius: 118, scale: 0.7, tilt: 0, color: "#807ba5" },
  { kind: "kinoko", angle: 270, radius: 90, scale: 0.65, tilt: 0, color: "#698f8c" },
  { kind: "flower", angle: 290, radius: 120, scale: 0.8, tilt: 0, color: "#ae7d61" },
];
