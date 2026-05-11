export type BonsaiBranch = {
  /** Matches an entry in experience.ts so a click can open that role's drawer. */
  experienceId: string;
  /** Clock-style angle in degrees. 0 = back (12 o'clock), clockwise. */
  angle: number;
  /** Orbital radius in stage-local px. Inner ring ~60–90, outer ring ~120–160. */
  radius: number;
  /** Visual scale variation (0.7–1.1) so the scatter doesn't read as uniform. */
  scale: number;
  /** In-plane (screen-Z) tilt in degrees for organic lean. */
  tilt: number;
};

export const bonsaiBranches: BonsaiBranch[] = [
  { experienceId: "actuaViz", angle: 15, radius: 155, scale: 1.05, tilt: -8 },
  { experienceId: "vocus", angle: 95, radius: 65, scale: 0.85, tilt: 6 },
  { experienceId: "infocast", angle: 170, radius: 140, scale: 1.0, tilt: -5 },
  { experienceId: "toujia", angle: 235, radius: 85, scale: 0.9, tilt: 10 },
  { experienceId: "pace", angle: 310, radius: 130, scale: 0.95, tilt: -12 },
];
