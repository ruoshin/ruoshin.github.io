import {
  readEmittedCount,
  SKILLS_CUT_KEY,
  SKILLS_EMITTED_COUNT_KEY,
  SKILLS_EMPTIED_KEY,
} from "@/lib/skills-storage";

const CUT_THRESHOLD_PX = 110;
const TILT_THRESHOLD_DEG = -18;
const EMIT_INTERVAL_MS = 95;
const GRAVITY_PX_S2 = 1600;
const DRAG_X_LEFT_PX = -1200;
const DRAG_X_RIGHT_PX = 400;
const DRAG_Y_TOP_PX = -300;
const DRAG_Y_BOTTOM_PX = 1000;
const SETTLE_DURATION_MS = 520;

type FlyingChip = {
  el: HTMLElement;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  rot: number;
  angVel: number;
};

const bagCleanups = new WeakMap<HTMLElement, () => void>();

function setProgress(bag: HTMLElement, p: number) {
  bag.style.setProperty("--cut-progress", String(Math.max(0, Math.min(1, p))));
}

function setTransform(bag: HTMLElement, dx: number, dy: number, rot: number) {
  bag.style.setProperty("--bag-dx", `${dx}px`);
  bag.style.setProperty("--bag-dy", `${dy}px`);
  bag.style.setProperty("--bag-rot", `${rot}deg`);
}

function getBagOffset(bag: HTMLElement) {
  return {
    dx: Number.parseFloat(bag.style.getPropertyValue("--bag-dx") || "0"),
    dy: Number.parseFloat(bag.style.getPropertyValue("--bag-dy") || "0"),
  };
}

function shuffled<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function bindBag(bag: HTMLElement) {
  if (bag.dataset.bagInit) return;
  bag.dataset.bagInit = "1";

  const mouthMarker = bag.querySelector<SVGCircleElement>("[data-bag-mouth]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function signalBloom() {
    document.documentElement.setAttribute("data-skills-poured", "");
    document.dispatchEvent(new CustomEvent("garden:bloom"));
  }
  function signalReset() {
    document.documentElement.removeAttribute("data-skills-poured");
    document.dispatchEvent(new CustomEvent("garden:reset"));
  }

  const allChips = Array.from(document.querySelectorAll<HTMLElement>("[data-skill-chip]"));
  const skillRows = Array.from(
    document.querySelectorAll<HTMLElement>(".skills-row[data-group-index]"),
  );
  const chipsByGroup = new Map<number, HTMLElement[]>();
  for (const chip of allChips) {
    const g = Number(chip.dataset.skillGroup);
    const list = chipsByGroup.get(g) ?? [];
    list.push(chip);
    chipsByGroup.set(g, list);
  }
  for (const [g, chips] of chipsByGroup) {
    chipsByGroup.set(g, shuffled(chips));
  }
  let activeGroups: Set<number> = new Set();
  let emittedTotal = 0;
  const totalChips = allChips.length;

  const flyingChips: FlyingChip[] = [];
  let rafId: number | null = null;
  let lastTickMs = 0;

  // Hit-test expanded vertically by row height so the mouth covers three
  // adjacent rows at once (catches dragging between categories).
  function findActiveGroups(): Set<number> {
    const result = new Set<number>();
    if (!mouthMarker) return result;
    const m = mouthMarker.getBoundingClientRect();
    const px = m.left + m.width / 2;
    const py = m.top + m.height / 2;
    for (const row of skillRows) {
      const r = row.getBoundingClientRect();
      const expandY = r.height;
      if (px >= r.left && px <= r.right && py >= r.top - expandY && py <= r.bottom + expandY) {
        result.add(Number(row.dataset.groupIndex));
      }
    }
    return result;
  }

  function setActiveGroups(groups: Set<number>) {
    if (groups.size === activeGroups.size && [...groups].every((g) => activeGroups.has(g))) {
      return;
    }
    activeGroups = groups;
    for (const row of skillRows) {
      if (activeGroups.has(Number(row.dataset.groupIndex))) {
        row.dataset.active = "1";
      } else {
        delete row.dataset.active;
      }
    }
  }

  let alreadyCut = false;
  let alreadyEmptied = false;
  try {
    alreadyCut = localStorage.getItem(SKILLS_CUT_KEY) === "1";
    alreadyEmptied = localStorage.getItem(SKILLS_EMPTIED_KEY) === "1";
  } catch {
    // ignore (private mode etc.)
  }
  const alreadyEmittedCount = readEmittedCount();

  function tick(now: number) {
    if (!lastTickMs) lastTickMs = now;
    // Clamp dt so a stalled tab doesn't fling chips off-screen.
    const dt = Math.min(0.05, (now - lastTickMs) / 1000);
    lastTickMs = now;

    for (let i = flyingChips.length - 1; i >= 0; i--) {
      const c = flyingChips[i];
      c.vy += GRAVITY_PX_S2 * dt;
      c.dx += c.vx * dt;
      c.dy += c.vy * dt;
      c.rot += c.angVel * dt;
      c.el.style.transform = `translate(${c.dx}px, ${c.dy}px) rotate(${c.rot}deg)`;

      if (c.dy >= 0) {
        c.el.dataset.state = "settling";
        c.el.style.transform = "translate(0, 0) rotate(0deg)";
        flyingChips.splice(i, 1);
        window.setTimeout(() => {
          c.el.dataset.state = "settled";
        }, SETTLE_DURATION_MS);
      }
    }

    if (flyingChips.length > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
      lastTickMs = 0;
    }
  }

  function emitNext(): "ok" | "done" | "all" | "idle" {
    if (emittedTotal >= totalChips) return "all";
    if (activeGroups.size === 0) return "idle";
    const candidates: { g: number; chips: HTMLElement[] }[] = [];
    for (const g of activeGroups) {
      const chips = chipsByGroup.get(g);
      if (chips?.some((c) => c.dataset.state === "hidden")) {
        candidates.push({ g, chips });
      }
    }
    if (candidates.length === 0) return "done";
    const { chips: groupChips } = candidates[Math.floor(Math.random() * candidates.length)];
    const chip = groupChips.find((c) => c.dataset.state === "hidden");
    if (!chip) return "done";
    emittedTotal++;
    try {
      localStorage.setItem(SKILLS_EMITTED_COUNT_KEY, String(emittedTotal));
    } catch {
      // ignore
    }
    document.dispatchEvent(
      new CustomEvent("garden:tick", {
        detail: { emitted: emittedTotal, total: totalChips },
      }),
    );

    if (reduceMotion || !mouthMarker) {
      chip.dataset.state = "settled";
      return "ok";
    }
    const mouthRect = mouthMarker.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const initDx = mouthRect.left + mouthRect.width / 2 - (chipRect.left + chipRect.width / 2);
    const initDy = mouthRect.top + mouthRect.height / 2 - (chipRect.top + chipRect.height / 2);

    const fc: FlyingChip = {
      el: chip,
      dx: initDx,
      dy: initDy,
      // Pour direction follows the bag tilt: leftward velocity.
      vx: -120 - Math.random() * 80,
      vy: 40 + Math.random() * 40,
      rot: (Math.random() - 0.5) * 30,
      angVel: (Math.random() - 0.5) * 240,
    };
    chip.dataset.state = "emitted";
    chip.style.transform = `translate(${initDx}px, ${initDy}px) rotate(${fc.rot}deg)`;
    flyingChips.push(fc);

    if (rafId === null) {
      rafId = requestAnimationFrame(tick);
    }
    return "ok";
  }

  let emitTimer: number | null = null;
  function startEmission() {
    if (emitTimer !== null) return;
    if (emittedTotal >= totalChips) return;
    emitTimer = window.setInterval(() => {
      const result = emitNext();
      if (result === "all") {
        stopEmission();
        try {
          localStorage.setItem(SKILLS_EMPTIED_KEY, "1");
        } catch {
          // ignore
        }
        signalBloom();
      }
    }, EMIT_INTERVAL_MS);
  }
  function stopEmission() {
    if (emitTimer !== null) {
      window.clearInterval(emitTimer);
      emitTimer = null;
    }
  }

  let pointerDown = false;
  let startX = 0;
  let startY = 0;
  let startBagDx = 0;
  let startBagDy = 0;
  // Locks once tilting; only deepens until pointerup.
  let lockedRot = 0;

  function onPointerDownLift(e: PointerEvent) {
    if (bag.dataset.state !== "opened" && bag.dataset.state !== "empty") {
      return;
    }
    pointerDown = true;
    startX = e.clientX;
    startY = e.clientY;
    ({ dx: startBagDx, dy: startBagDy } = getBagOffset(bag));
    lockedRot = 0;
    bag.setPointerCapture(e.pointerId);
    bag.dataset.state = "holding";
    bag.dataset.dragging = "1";
  }

  function onPointerMoveLift(e: PointerEvent) {
    if (!pointerDown) return;
    const rawDx = e.clientX - startX;
    const rawDy = e.clientY - startY;
    const dx = Math.max(DRAG_X_LEFT_PX, Math.min(DRAG_X_RIGHT_PX, startBagDx + rawDx));
    const dy = Math.max(DRAG_Y_TOP_PX, Math.min(DRAG_Y_BOTTOM_PX, startBagDy + rawDy));

    const candidate = Math.max(-120, Math.min(15, rawDx * 1.1));
    let rot: number;
    if (bag.dataset.state === "tilting") {
      if (candidate < lockedRot) lockedRot = candidate;
      rot = lockedRot;
    } else {
      rot = candidate;
    }
    setTransform(bag, dx, dy, rot);

    setActiveGroups(findActiveGroups());

    if (bag.dataset.state !== "tilting" && rot <= TILT_THRESHOLD_DEG) {
      bag.dataset.state = "tilting";
      lockedRot = rot;
      startEmission();
    }
  }

  function onPointerEndLift(e: PointerEvent) {
    if (!pointerDown) return;
    pointerDown = false;
    if (bag.hasPointerCapture(e.pointerId)) {
      bag.releasePointerCapture(e.pointerId);
    }
    stopEmission();
    setActiveGroups(new Set());
    lockedRot = 0;
    bag.removeAttribute("data-dragging");
    // Don't clobber a reset() that fired mid-drag.
    if (bag.dataset.state === "sealed") return;
    const nowEmpty = emittedTotal >= totalChips;
    bag.dataset.state = nowEmpty ? "empty" : "opened";
    if (nowEmpty) {
      setTransform(bag, 0, 0, 0);
    } else {
      bag.style.setProperty("--bag-rot", "0deg");
    }
  }

  let cutPointerDown = false;
  let cutStartX = 0;
  bag.addEventListener("pointerdown", (e) => {
    if (bag.dataset.state !== "sealed") return;
    cutPointerDown = true;
    cutStartX = e.clientX;
    bag.setPointerCapture(e.pointerId);
  });
  bag.addEventListener("pointermove", (e) => {
    if (!cutPointerDown) return;
    const dx = e.clientX - cutStartX;
    if (dx <= 0) {
      setProgress(bag, 0);
      return;
    }
    setProgress(bag, dx / CUT_THRESHOLD_PX);
    if (dx >= CUT_THRESHOLD_PX) {
      cutPointerDown = false;
      if (bag.hasPointerCapture(e.pointerId)) {
        bag.releasePointerCapture(e.pointerId);
      }
      bag.dataset.state = "cutting";
      try {
        localStorage.setItem(SKILLS_CUT_KEY, "1");
      } catch {
        // ignore
      }
      window.setTimeout(() => {
        if (bag.dataset.state === "cutting") {
          bag.dataset.state = "opened";
          setProgress(bag, 1);
        }
      }, 950);
    }
  });
  const endCut = (e: PointerEvent) => {
    if (!cutPointerDown) return;
    cutPointerDown = false;
    if (bag.hasPointerCapture(e.pointerId)) {
      bag.releasePointerCapture(e.pointerId);
    }
    if (bag.dataset.state === "sealed") {
      setProgress(bag, 0);
    }
  };
  bag.addEventListener("pointerup", endCut);
  bag.addEventListener("pointercancel", endCut);

  bag.addEventListener("pointerdown", onPointerDownLift);
  bag.addEventListener("pointermove", onPointerMoveLift);
  bag.addEventListener("pointerup", onPointerEndLift);
  bag.addEventListener("pointercancel", onPointerEndLift);

  function reset() {
    stopEmission();
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    flyingChips.length = 0;
    lastTickMs = 0;
    for (const chip of allChips) {
      chip.dataset.state = "hidden";
      chip.style.transform = "";
    }
    for (const [g, chips] of chipsByGroup) {
      chipsByGroup.set(g, shuffled(chips));
    }
    emittedTotal = 0;
    setActiveGroups(new Set());
    bag.removeAttribute("data-dragging");
    setProgress(bag, 0);
    setTransform(bag, 0, 0, 0);
    bag.dataset.state = "sealed";
    try {
      localStorage.removeItem(SKILLS_CUT_KEY);
      localStorage.removeItem(SKILLS_EMPTIED_KEY);
      localStorage.removeItem(SKILLS_EMITTED_COUNT_KEY);
    } catch {
      // ignore
    }
    signalReset();
  }
  const resetBtn = bag.parentElement?.querySelector<HTMLButtonElement>("[data-soil-bag-reset]");
  if (resetBtn) {
    resetBtn.addEventListener("click", reset);
    // Stop pointerdown from bubbling into the bag.
    resetBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
  }

  if (alreadyEmptied) {
    bag.dataset.state = "empty";
    for (const chip of allChips) {
      chip.dataset.state = "settled";
    }
    emittedTotal = totalChips;
  } else if (alreadyCut) {
    bag.dataset.state = "opened";
    setProgress(bag, 1);
    if (alreadyEmittedCount > 0) {
      const n = Math.min(alreadyEmittedCount, totalChips);
      for (let i = 0; i < n; i++) {
        allChips[i].dataset.state = "settled";
      }
      emittedTotal = n;
    }
  }

  bagCleanups.set(bag, () => {
    stopEmission();
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    flyingChips.length = 0;
  });

  // Keyboard: Enter/Space — cut (sealed) or pour-all (opened).
  bag.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (bag.dataset.state === "sealed") {
      e.preventDefault();
      bag.dataset.state = "cutting";
      setProgress(bag, 1);
      try {
        localStorage.setItem(SKILLS_CUT_KEY, "1");
      } catch {
        // ignore
      }
      window.setTimeout(() => {
        bag.dataset.state = "opened";
      }, 950);
    } else if (bag.dataset.state === "opened") {
      e.preventDefault();
      for (const chip of allChips) {
        if (chip.dataset.state !== "settled") {
          chip.dataset.state = "settled";
        }
      }
      emittedTotal = totalChips;
      bag.dataset.state = "empty";
      try {
        localStorage.setItem(SKILLS_EMPTIED_KEY, "1");
        localStorage.setItem(SKILLS_EMITTED_COUNT_KEY, String(totalChips));
      } catch {
        // ignore
      }
      signalBloom();
    }
  });
}

export function setupBags() {
  document.querySelectorAll<HTMLElement>("[data-soil-bag]").forEach(bindBag);
}

export function teardownBags() {
  document.querySelectorAll<HTMLElement>("[data-soil-bag]").forEach((bag) => {
    const cleanup = bagCleanups.get(bag);
    if (cleanup) {
      cleanup();
      bagCleanups.delete(bag);
    }
  });
}
