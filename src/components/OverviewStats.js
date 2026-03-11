import { useTheme, FONT_MONO, FONT_SERIF, FONT_SIZES, SPACING, RADII } from "../contexts/ThemeContext";

export default function OverviewStats({ progress, totalComponents }) {
  const { theme } = useTheme();
  const total = Object.values(progress).reduce((s, p) => s + (p.points || 0), 0);
  const started = Object.values(progress).filter(p => p.mastery && p.mastery !== "N").length;
  const mastered = Object.values(progress).filter(p => p.mastery === "E").length;

  const stats = [
    { label: "Total Points", value: total, icon: "\u2B50" },
    { label: "Skills Started", value: `${started}/${totalComponents}`, icon: "\uD83D\uDDFA\uFE0F" },
    { label: "Mastered", value: mastered, icon: "\u2728" },
    { label: "Current Unit", value: "Revolution", icon: "\uD83D\uDCDA" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: SPACING["2.5"], marginBottom: SPACING[5] }}>
      {stats.map(s => (
        <div key={s.label} style={{
          padding: `${SPACING[3]} ${SPACING[4]}`,
          borderRadius: RADII.xl,
          background: theme.cardBg,
          border: `1.5px solid ${theme.cardBorder}`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 20, marginBottom: SPACING[1] }}>{s.icon}</div>
          <div style={{ fontSize: FONT_SIZES.lg, fontWeight: 700, color: theme.textPrimary, fontFamily: FONT_SERIF }}>
            {s.value}
          </div>
          <div style={{
            fontSize: 9,
            color: theme.textSecondary,
            fontFamily: FONT_MONO,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
