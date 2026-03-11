import { useTheme, FONT_MONO, FONT_SERIF, FONT_SIZES, SPACING, RADII } from "../contexts/ThemeContext";
import { getMasteryColor, getMasteryLabel } from "../data/constants";
import SkillComponent from "./SkillComponent";

export default function SkillAreaCard({ area, progress, isExpanded, onToggle, onComponentTap }) {
  const { theme } = useTheme();
  const areaProgress = area.components.map(c => progress[c.id] || { points: 0, mastery: "N" });
  const masteryCount = areaProgress.filter(p => p.mastery !== "N").length;
  const allMastered = areaProgress.every(p => p.mastery !== "N");
  const anyExceeding = areaProgress.some(p => p.mastery === "E");

  return (
    <div style={{
      background: theme.cardBg,
      borderRadius: RADII.xl + 2,
      border: `1.5px solid ${isExpanded ? area.color + "60" : theme.cardBorder}`,
      overflow: "hidden",
      transition: "all 0.2s",
    }}>
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        style={{
          width: "100%",
          padding: `${SPACING[4]} ${SPACING[5]}`,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: SPACING[3],
          textAlign: "left",
        }}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: RADII.xl,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: area.bg,
          fontSize: 22,
          flexShrink: 0,
          border: allMastered ? `2px solid ${area.color}` : "none",
        }}>
          {area.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING[2], marginBottom: SPACING["0.5"] }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: area.color, fontFamily: FONT_MONO }}>
              SKILL {area.id}
            </span>
            {anyExceeding && <span style={{ fontSize: 10 }}>{"\u2728"}</span>}
          </div>
          <div style={{ fontSize: FONT_SIZES.base + 1, fontWeight: 700, color: theme.textPrimary, fontFamily: FONT_SERIF }}>
            {area.name}
          </div>
          <div style={{ display: "flex", gap: SPACING["1.5"], marginTop: SPACING[1], alignItems: "center" }}>
            {area.components.map(c => {
              const p = progress[c.id] || { mastery: "N" };
              return (
                <div key={c.id} style={{
                  width: 18,
                  height: 6,
                  borderRadius: 3,
                  background: getMasteryColor(p.mastery),
                  opacity: p.mastery === "N" ? 0.3 : 1,
                  transition: "all 0.3s",
                }} title={`${c.id}: ${getMasteryLabel(p.mastery)}`} />
              );
            })}
            <span style={{ fontSize: 10, color: theme.textSecondary, fontFamily: FONT_MONO, marginLeft: SPACING[1] }}>
              {masteryCount}/{area.components.length}
            </span>
          </div>
        </div>

        <div style={{
          fontSize: 18,
          color: theme.textDivider,
          transition: "transform 0.2s",
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          {"\u25BE"}
        </div>
      </button>

      {isExpanded && (
        <div style={{
          padding: `0 ${SPACING[5]} ${SPACING[4]}`,
          display: "flex",
          flexDirection: "column",
          gap: SPACING[2],
          borderTop: `1px solid ${theme.cardBorder}`,
          paddingTop: SPACING[3],
        }}>
          {area.components.map(comp => (
            <SkillComponent
              key={comp.id}
              comp={comp}
              progress={progress[comp.id]}
              onTap={onComponentTap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
