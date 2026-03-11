import { Icon } from "@iconify/react";
import compassOutline from "@iconify-icons/mdi/compass-outline";
import weatherSunny from "@iconify-icons/mdi/weather-sunny";
import weatherNight from "@iconify-icons/mdi/weather-night";
import { useTheme, FONT_MONO, FONT_SERIF, FONT_SIZES, SPACING, RADII } from "../contexts/ThemeContext";

export default function HubHeader({ userName, userSection, onPractice, onLogout }) {
  const { theme, toggleTheme, mode } = useTheme();

  return (
    <header style={{ background: theme.headerBg, color: theme.headerText, padding: `${SPACING[5]} ${SPACING[6]} ${SPACING[4]}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: SPACING[3] }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: SPACING[2], marginBottom: SPACING[1] }}>
              <span style={{
                fontSize: FONT_SIZES.tiny,
                fontWeight: 700,
                color: theme.accentGold,
                fontFamily: FONT_MONO,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: theme.accentGoldSubtle,
                padding: `${SPACING[1]} ${SPACING[2]}`,
                borderRadius: RADII.sm,
              }}>
                Historian's Hub
              </span>
              {userSection && (
                <span style={{
                  fontSize: FONT_SIZES.tiny,
                  fontWeight: 700,
                  color: theme.teacherGreen,
                  fontFamily: FONT_MONO,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: theme.teacherGreenSubtle,
                  padding: `${SPACING[1]} ${SPACING[2]}`,
                  borderRadius: RADII.sm,
                }}>
                  {userSection}
                </span>
              )}
            </div>
            <h1 style={{
              fontSize: FONT_SIZES.xxl,
              fontWeight: 700,
              margin: `${SPACING[1]} 0 0`,
              letterSpacing: "-0.01em",
              fontFamily: FONT_SERIF,
              display: "flex",
              alignItems: "center",
              gap: SPACING[2],
            }}>
              <Icon icon={compassOutline} width={26} style={{ color: theme.accentGold }} aria-hidden="true" />
              Your Skill Map
            </h1>
            <p style={{
              fontSize: FONT_SIZES.micro,
              color: theme.headerSubtext,
              margin: `${SPACING[1]} 0 0`,
              fontFamily: FONT_MONO,
            }}>
              Welcome back, {userName}
            </p>
          </div>
          <div style={{ display: "flex", gap: SPACING[2], alignItems: "center" }}>
            <button
              onClick={onPractice}
              style={{
                padding: `${SPACING["2.5"]} ${SPACING[4]}`,
                background: theme.accentGold,
                color: theme.headerBg,
                border: "none",
                borderRadius: RADII.lg,
                fontSize: FONT_SIZES.tiny,
                fontFamily: FONT_MONO,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "filter 0.15s",
              }}
            >
              Practice
            </button>
            <a
              href="https://mr-munny.github.io/timeline-explorer"
              style={{
                padding: `${SPACING["2.5"]} ${SPACING[4]}`,
                background: "transparent",
                color: theme.headerSubtext,
                border: `1.5px solid ${theme.headerBorder}`,
                borderRadius: RADII.lg,
                fontSize: FONT_SIZES.micro,
                fontFamily: FONT_MONO,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Timeline
            </a>
            <button
              onClick={toggleTheme}
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                padding: `${SPACING["2.5"]} ${SPACING[3]}`,
                background: "transparent",
                border: `1.5px solid ${theme.headerBorder}`,
                borderRadius: RADII.lg,
                cursor: "pointer",
                color: theme.headerSubtext,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Icon icon={mode === "dark" ? weatherSunny : weatherNight} width={14} aria-hidden="true" />
            </button>
            <button
              onClick={onLogout}
              style={{
                padding: `${SPACING["2.5"]} ${SPACING[4]}`,
                background: "transparent",
                border: `1.5px solid ${theme.headerBorder}`,
                borderRadius: RADII.lg,
                fontSize: FONT_SIZES.micro,
                fontFamily: FONT_MONO,
                fontWeight: 600,
                cursor: "pointer",
                color: theme.headerSubtext,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
