import { useAuth } from "./contexts/AuthContext";
import { useTheme, FONT_SERIF, FONT_MONO, FONT_SIZES, SPACING } from "./contexts/ThemeContext";
import LoginScreen from "./components/LoginScreen";
import SectionPicker from "./components/SectionPicker";
import StudentHub from "./components/StudentHub";
import { assignStudentSection } from "./services/database";

export default function App() {
  const { user, loading, authError, login, logout, isTeacher, userSection, sectionLoading } = useAuth();
  const { theme, mode } = useTheme();

  return (
    <div
      style={{
        fontFamily: FONT_SERIF,
        background: theme.pageBg,
        minHeight: "100vh",
        color: theme.pageText,
        colorScheme: mode,
      }}
      data-theme={mode}
    >
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          zIndex: 10001,
          padding: SPACING[3],
          background: theme.activeToggleBg,
          color: theme.activeToggleText,
          fontFamily: FONT_MONO,
          fontSize: FONT_SIZES.base,
          fontWeight: 700,
          textDecoration: "none",
          borderRadius: 4,
        }}
        onFocus={(e) => { e.currentTarget.style.left = "8px"; e.currentTarget.style.top = "8px"; }}
        onBlur={(e) => { e.currentTarget.style.left = "-9999px"; e.currentTarget.style.top = "0"; }}
      >
        Skip to main content
      </a>

      <style>{`
        * { transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
        :root { --focus-ring: #2563EB; }
        [data-theme="dark"] { --focus-ring: #60A5FA; }
        :focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
        :focus:not(:focus-visible) { outline: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {loading ? (
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
      ) : !user ? (
        <LoginScreen onLogin={login} error={authError} />
      ) : !isTeacher && !userSection && !sectionLoading ? (
        <SectionPicker
          userName={user.displayName || user.email.split("@")[0]}
          onSelect={async (sectionId, teacherUid) => {
            await assignStudentSection(user.uid, sectionId, teacherUid, user.email, user.displayName);
          }}
        />
      ) : isTeacher ? (
        <div id="main-content" style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_MONO,
          fontSize: FONT_SIZES.sm,
          color: theme.textSecondary,
        }}>
          Teacher dashboard coming soon.
          <button
            onClick={logout}
            style={{
              marginLeft: SPACING[4],
              padding: `${SPACING[2]} ${SPACING[4]}`,
              background: "transparent",
              border: `1.5px solid ${theme.inputBorder}`,
              borderRadius: 8,
              fontSize: FONT_SIZES.micro,
              fontFamily: FONT_MONO,
              fontWeight: 600,
              cursor: "pointer",
              color: theme.textSecondary,
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <StudentHub />
      )}
    </div>
  );
}
