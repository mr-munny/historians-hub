import { useState } from "react";
import ModalShell, { ModalCloseButton } from "./ModalShell";
import { useTheme, FONT_MONO, FONT_SERIF, FONT_SIZES, SPACING, RADII } from "../contexts/ThemeContext";
import { SKILL_AREAS } from "../data/skillAreas";
import { SAMPLE_ACTIVITIES } from "../data/activities";
import { getLevelColor, getLevelLabel, getLevelPoints } from "../data/constants";

export default function ActivityPanel({ progress, onClose }) {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? SAMPLE_ACTIVITIES : SAMPLE_ACTIVITIES.filter(a => a.skill.startsWith(filter));
  const allSkillAreas = [...new Set(SAMPLE_ACTIVITIES.map(a => a.skill.charAt(0)))];

  return (
    <ModalShell onClose={onClose} maxWidth={560} ariaLabelledBy="activities-title">
      <div style={{ padding: `${SPACING[6]} ${SPACING[8]}` }}>
        <ModalCloseButton onClose={onClose} />

        <div style={{ marginBottom: SPACING[4] }}>
          <h2 id="activities-title" style={{ fontSize: FONT_SIZES.lg, fontWeight: 700, margin: 0, fontFamily: FONT_SERIF, color: theme.textPrimary }}>
            Practice Activities
          </h2>
          <p style={{ fontSize: FONT_SIZES.micro, color: theme.textSecondary, margin: `${SPACING[1]} 0 0`, fontFamily: FONT_MONO }}>
            Choose what to work on — earn points toward your next unlock
          </p>
        </div>

        <div style={{ display: "flex", gap: SPACING[1], flexWrap: "wrap", marginBottom: SPACING[3] }}>
          <button onClick={() => setFilter("all")} style={{
            padding: `${SPACING["1.5"]} ${SPACING["2.5"]}`,
            borderRadius: RADII.md,
            border: "none",
            fontSize: FONT_SIZES.micro,
            fontFamily: FONT_MONO,
            fontWeight: filter === "all" ? 700 : 500,
            cursor: "pointer",
            background: filter === "all" ? theme.accentGold : theme.subtleBg,
            color: filter === "all" ? theme.headerBg : theme.textSecondary,
          }}>All</button>
          {allSkillAreas.map(n => {
            const area = SKILL_AREAS.find(a => a.id === parseInt(n));
            return (
              <button key={n} onClick={() => setFilter(n)} style={{
                padding: `${SPACING["1.5"]} ${SPACING["2.5"]}`,
                borderRadius: RADII.md,
                border: "none",
                fontSize: FONT_SIZES.micro,
                fontFamily: FONT_MONO,
                fontWeight: filter === n ? 700 : 500,
                cursor: "pointer",
                background: filter === n ? area.color : theme.subtleBg,
                color: filter === n ? "#fff" : theme.textSecondary,
              }}>{area?.icon} {n}</button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING[2] }}>
          {filtered.map(act => {
            const area = SKILL_AREAS.find(a => a.components.some(c => c.id === act.skill));
            return (
              <div key={act.id} style={{
                padding: `${SPACING[3]} ${SPACING[3]}`,
                borderRadius: RADII.xl,
                border: `1.5px solid ${theme.cardBorder}`,
                background: theme.warmSubtleBg,
                display: "flex",
                alignItems: "center",
                gap: SPACING[3],
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: RADII.lg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: area?.bg || theme.subtleBg,
                  fontSize: 18,
                  flexShrink: 0,
                }}>
                  {area?.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: FONT_SIZES.sm, fontWeight: 600, color: theme.textPrimary, fontFamily: FONT_SERIF }}>
                    {act.title}
                  </div>
                  <div style={{ display: "flex", gap: SPACING["1.5"], alignItems: "center", marginTop: SPACING["0.5"], flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: `${SPACING["0.5"]} ${SPACING["1.5"]}`,
                      borderRadius: 3,
                      background: getLevelColor(act.level) + "18",
                      color: getLevelColor(act.level),
                      fontFamily: FONT_MONO,
                      textTransform: "uppercase",
                    }}>
                      {getLevelLabel(act.level)} +{getLevelPoints(act.level)} pts
                    </span>
                    <span style={{ fontSize: 9, color: theme.textSecondary, fontFamily: FONT_MONO }}>
                      Skill {act.skill}
                    </span>
                    <span style={{ fontSize: 9, color: theme.textSecondary, fontFamily: FONT_MONO }}>
                      {act.type === "form" ? "\uD83D\uDCCB Form" : act.type === "notebook" ? "\uD83D\uDCD3 Notebook" : "\uD83D\uDCCC Activity"}
                    </span>
                  </div>
                </div>
                <button style={{
                  padding: `${SPACING[2]} ${SPACING[3]}`,
                  borderRadius: RADII.lg,
                  border: "none",
                  fontSize: FONT_SIZES.micro,
                  fontFamily: FONT_MONO,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: theme.activeToggleBg,
                  color: theme.activeToggleText,
                }}>
                  Start
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}
