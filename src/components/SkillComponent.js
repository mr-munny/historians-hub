import { useTheme, FONT_MONO, FONT_SERIF, FONT_SIZES, SPACING, RADII } from "../contexts/ThemeContext";
import { getNextThreshold, getMasteryColor, getMasteryBg } from "../data/constants";

export default function SkillComponent({ comp, progress, onTap }) {
  const { theme } = useTheme();
  const p = progress || { points: 0, mastery: "N" };
  const next = getNextThreshold(p.points);
  const isMaxed = !next;
  const pct = next ? Math.min(100, (p.points / next.needed) * 100) : 100;
  const unlocked = next ? p.points >= next.needed : true;

  return (
    <button
      onClick={() => onTap(comp)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: SPACING[3],
        padding: `${SPACING[3]} ${SPACING[4]}`,
        background: theme.cardBg,
        border: `1.5px solid ${theme.cardBorder}`,
        borderRadius: RADII.xl,
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.2s",
        borderLeftWidth: 4,
        borderLeftColor: getMasteryColor(p.mastery),
      }}
    >
      <div style={{
        width: 36,
        height: 36,
        borderRadius: RADII.lg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: getMasteryBg(p.mastery),
        color: getMasteryColor(p.mastery),
        fontSize: FONT_SIZES.sm,
        fontWeight: 800,
        fontFamily: FONT_MONO,
        flexShrink: 0,
        border: p.mastery === "E" ? `2px solid ${getMasteryColor("E")}` : "none",
      }}>
        {p.mastery === "N" ? "\u2014" : p.mastery}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING["1.5"], marginBottom: SPACING["0.5"] }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: theme.textSecondary, fontFamily: FONT_MONO }}>
            {comp.id}
          </span>
          <span style={{ fontSize: FONT_SIZES.sm, fontWeight: 600, color: theme.textPrimary, fontFamily: FONT_SERIF }}>
            {comp.name}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: SPACING[2] }}>
          <div style={{ flex: 1, height: 6, background: theme.subtleBg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: 3,
              background: isMaxed
                ? `linear-gradient(90deg, ${getMasteryColor("E")}, #34D399)`
                : unlocked
                  ? getMasteryColor(next.level)
                  : `${getMasteryColor(next?.level || "N")}80`,
              transition: "width 0.6s ease",
            }} />
          </div>
          <span style={{ fontSize: 10, fontFamily: FONT_MONO, color: theme.textMuted, whiteSpace: "nowrap" }}>
            {isMaxed ? "MAX" : `${p.points}/${next.needed}`}
          </span>
        </div>
      </div>

      {next && (
        <div style={{
          fontSize: 16,
          flexShrink: 0,
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: RADII.md,
          background: unlocked ? "#FEF3C7" : theme.subtleBg,
        }}>
          {unlocked ? "\uD83D\uDD13" : "\uD83D\uDD12"}
        </div>
      )}
      {isMaxed && (
        <div style={{
          fontSize: 16,
          flexShrink: 0,
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: RADII.md,
          background: "#D1FAE5",
        }}>
          \u2728
        </div>
      )}
    </button>
  );
}
