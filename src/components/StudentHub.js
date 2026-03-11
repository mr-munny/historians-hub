import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme, FONT_MONO, SPACING } from "../contexts/ThemeContext";
import { SKILL_AREAS } from "../data/skillAreas";
import useProgress from "../hooks/useProgress";
import HubHeader from "./HubHeader";
import OverviewStats from "./OverviewStats";
import SkillAreaCard from "./SkillAreaCard";
import RubricModal from "./RubricModal";
import ActivityPanel from "./ActivityPanel";

const TOTAL_COMPONENTS = SKILL_AREAS.reduce((sum, a) => sum + a.components.length, 0);

export default function StudentHub() {
  const { user, logout, userSection } = useAuth();
  const { theme } = useTheme();
  const { progress, progressLoading } = useProgress();

  const [selectedComp, setSelectedComp] = useState(null);
  const [showActivities, setShowActivities] = useState(false);
  const [expandedArea, setExpandedArea] = useState(null);

  const userName = user?.displayName || user?.email?.split("@")[0] || "Student";

  if (progressLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: 28,
          height: 28,
          border: `3px solid ${theme.inputBorder}`,
          borderTopColor: theme.accentGold,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    );
  }

  return (
    <>
      <HubHeader
        userName={userName}
        userSection={userSection}
        onPractice={() => setShowActivities(true)}
        onLogout={logout}
      />

      <main id="main-content" style={{ maxWidth: 960, margin: "0 auto", padding: `${SPACING[5]} ${SPACING[6]}` }}>
        <OverviewStats progress={progress} totalComponents={TOTAL_COMPONENTS} />

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING[3] }}>
          {SKILL_AREAS.map(area => (
            <SkillAreaCard
              key={area.id}
              area={area}
              progress={progress}
              isExpanded={expandedArea === area.id}
              onToggle={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
              onComponentTap={setSelectedComp}
            />
          ))}
        </div>

        <footer style={{
          marginTop: SPACING[8],
          padding: `${SPACING[4]} 0`,
          borderTop: `1px solid ${theme.cardBorder}`,
          textAlign: "center",
        }}>
          <p style={{ fontSize: 10, color: theme.textSecondary, fontFamily: FONT_MONO, margin: 0 }}>
            Historian's Hub {userSection ? `\u00B7 ${userSection} ` : ""}\u00B7 Prototype v1
            <br />Signed in as {userName}
          </p>
        </footer>
      </main>

      {selectedComp && (
        <RubricModal
          comp={selectedComp}
          progress={progress[selectedComp.id]}
          onClose={() => setSelectedComp(null)}
        />
      )}

      {showActivities && (
        <ActivityPanel
          progress={progress}
          onClose={() => setShowActivities(false)}
        />
      )}
    </>
  );
}
