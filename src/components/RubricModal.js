import ModalShell, { ModalCloseButton } from "./ModalShell";
import { useTheme, FONT_MONO, FONT_SERIF, FONT_SIZES, SPACING, RADII } from "../contexts/ThemeContext";
import { THRESHOLDS, getMasteryColor, getMasteryBg, getMasteryLabel, getLevelPoints } from "../data/constants";

const MASTERY_ORDER = { N: 0, W: 1, M: 2, E: 3 };

export default function RubricModal({ comp, progress, onClose }) {
  const { theme } = useTheme();
  const p = progress || { points: 0, mastery: "N" };

  const levels = [
    { key: "W", label: "Working", desc: comp.rubricW, threshold: THRESHOLDS.W, color: "#D97706", bg: "#FEF3C7", studentLabel: "Guided Practice" },
    { key: "M", label: "Meeting", desc: comp.rubricM, threshold: THRESHOLDS.M, color: "#1D4ED8", bg: "#DBEAFE", studentLabel: "Independent Practice" },
    { key: "E", label: "Exceeding", desc: comp.rubricE, threshold: THRESHOLDS.E, color: "#059669", bg: "#D1FAE5", studentLabel: "Extended Practice" },
  ];

  return (
    <ModalShell onClose={onClose} maxWidth={520} ariaLabelledBy="rubric-title">
      <div style={{ padding: `${SPACING[6]} ${SPACING[8]}` }}>
        <ModalCloseButton onClose={onClose} />

        <div style={{ marginBottom: SPACING[5] }}>
          <div style={{ fontSize: FONT_SIZES.micro, fontWeight: 700, color: theme.textSecondary, fontFamily: FONT_MONO, marginBottom: SPACING[1] }}>
            {comp.id}
          </div>
          <h2 id="rubric-title" style={{ fontSize: FONT_SIZES.xl, fontWeight: 700, margin: 0, fontFamily: FONT_SERIF, color: theme.textPrimary }}>
            {comp.name}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING[2], marginTop: SPACING[2] }}>
            <span style={{
              fontSize: FONT_SIZES.micro,
              fontWeight: 700,
              padding: `${SPACING["0.5"]} ${SPACING["2.5"]}`,
              borderRadius: RADII.sm + 1,
              background: getMasteryBg(p.mastery),
              color: getMasteryColor(p.mastery),
              fontFamily: FONT_MONO,
            }}>
              {getMasteryLabel(p.mastery)}
            </span>
            <span style={{ fontSize: FONT_SIZES.micro, color: theme.textSecondary, fontFamily: FONT_MONO }}>
              {p.points} points earned
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING["2.5"] }}>
          {levels.map(lv => {
            const isEarned = MASTERY_ORDER[p.mastery] >= MASTERY_ORDER[lv.key];
            const isUnlocked = p.points >= lv.threshold;
            const isCurrent = p.mastery === lv.key;
            return (
              <div key={lv.key} style={{
                border: `1.5px solid ${isCurrent ? lv.color : theme.cardBorder}`,
                borderRadius: RADII.xl,
                padding: `${SPACING[3]} ${SPACING[4]}`,
                position: "relative",
                background: isCurrent ? (lv.bg + "80") : theme.warmSubtleBg,
                opacity: isEarned || isUnlocked ? 1 : 0.55,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: SPACING[2], marginBottom: SPACING["1.5"] }}>
                  <span style={{
                    fontSize: FONT_SIZES.tiny,
                    fontWeight: 800,
                    color: lv.color,
                    fontFamily: FONT_MONO,
                    background: lv.bg,
                    padding: `${SPACING["0.5"]} ${SPACING[2]}`,
                    borderRadius: RADII.sm,
                  }}>
                    {lv.key}
                  </span>
                  <span style={{ fontSize: FONT_SIZES.sm, fontWeight: 700, color: theme.textPrimary, fontFamily: FONT_MONO }}>
                    {lv.label}
                  </span>
                  {isEarned && <span style={{ fontSize: FONT_SIZES.tiny }}>{"\u2705"}</span>}
                  {!isEarned && isUnlocked && <span style={{ fontSize: FONT_SIZES.tiny }}>{"\uD83D\uDD13"}</span>}
                  {!isEarned && !isUnlocked && (
                    <span style={{ fontSize: FONT_SIZES.micro, color: theme.textSecondary, fontFamily: FONT_MONO }}>
                      {lv.threshold - p.points} pts to unlock
                    </span>
                  )}
                </div>
                <p style={{ fontSize: FONT_SIZES.sm, lineHeight: 1.6, color: theme.textDescription, margin: 0, fontFamily: FONT_SERIF }}>
                  "{lv.desc}"
                </p>
                <div style={{ marginTop: SPACING["1.5"], fontSize: 10, color: theme.textSecondary, fontFamily: FONT_MONO }}>
                  Unlock at {lv.threshold} pts via {lv.studentLabel} ({getLevelPoints(lv.key === "W" ? "guided" : lv.key === "M" ? "independent" : "extended")} pts each)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}
