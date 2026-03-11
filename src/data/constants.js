// ── Mastery Thresholds ───────────────────────────────────────
export const THRESHOLDS = { W: 10, M: 30, E: 60 };

// ── Mastery Colors (domain-specific, not theme tokens) ──────
const MASTERY_COLORS = {
  E: "#059669",
  M: "#1D4ED8",
  W: "#D97706",
  N: "#D1D5DB",
};

const MASTERY_BGS = {
  E: "#D1FAE5",
  M: "#DBEAFE",
  W: "#FEF3C7",
  N: "#F3F4F6",
};

const MASTERY_LABELS = {
  E: "Exceeding",
  M: "Meeting",
  W: "Working",
  N: "Not Yet",
};

// ── Helpers ──────────────────────────────────────────────────

export function getNextThreshold(points) {
  if (points < THRESHOLDS.W) return { level: "W", needed: THRESHOLDS.W, label: "Working" };
  if (points < THRESHOLDS.M) return { level: "M", needed: THRESHOLDS.M, label: "Meeting" };
  if (points < THRESHOLDS.E) return { level: "E", needed: THRESHOLDS.E, label: "Exceeding" };
  return null;
}

export function getMasteryColor(m) {
  return MASTERY_COLORS[m] || MASTERY_COLORS.N;
}

export function getMasteryBg(m) {
  return MASTERY_BGS[m] || MASTERY_BGS.N;
}

export function getMasteryLabel(m) {
  return MASTERY_LABELS[m] || MASTERY_LABELS.N;
}

export function getLevelPoints(l) {
  if (l === "guided") return 10;
  if (l === "independent") return 20;
  if (l === "extended") return 30;
  return 0;
}

export function getLevelLabel(l) {
  if (l === "guided") return "Guided";
  if (l === "independent") return "Independent";
  if (l === "extended") return "Extended";
  return l;
}

export function getLevelColor(l) {
  if (l === "guided") return "#D97706";
  if (l === "independent") return "#1D4ED8";
  if (l === "extended") return "#059669";
  return "#6B7280";
}
