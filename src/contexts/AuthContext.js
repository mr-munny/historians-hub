import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, SCHOOL_DOMAIN, INITIAL_TEACHER_EMAIL, ALLOW_ALL_DOMAINS } from "../firebase";
import {
  subscribeToStudentSection,
  subscribeToTeacherRecord,
  createTeacherRecord,
  generateJoinCode,
  checkTeacherInvite,
  removeTeacherInvite,
  migrateDataToTeacher,
} from "../services/database";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [userSection, setUserSection] = useState(null);
  const [userTeacherUid, setUserTeacherUid] = useState(null);
  const [sectionLoading, setSectionLoading] = useState(true);

  // Teacher-specific state
  const [isTeacher, setIsTeacher] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [teacherLoading, setTeacherLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || "";
        if (ALLOW_ALL_DOMAINS || email.endsWith("@" + SCHOOL_DOMAIN)) {
          setUser(firebaseUser);
          setAuthError(null);
        } else {
          signOut(auth);
          setUser(null);
          setAuthError(
            `This tool is only available to @${SCHOOL_DOMAIN} accounts.`
          );
        }
      } else {
        setUser(null);
        setIsTeacher(false);
        setIsSuperAdmin(false);
        setTeacherData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Subscribe to teacher record from Firebase
  useEffect(() => {
    if (!user) {
      setTeacherLoading(false);
      return;
    }
    setTeacherLoading(true);

    const unsub = subscribeToTeacherRecord(user.uid, async (data) => {
      try {
        if (data) {
          setIsTeacher(true);
          setIsSuperAdmin(!!data.isSuperAdmin);
          setTeacherData(data);
          setTeacherLoading(false);
        } else {
          // Check if this is the bootstrap teacher
          if (user.email === INITIAL_TEACHER_EMAIL) {
            const joinCode = generateJoinCode();
            await createTeacherRecord(user.uid, {
              email: user.email,
              displayName: user.displayName || user.email.split("@")[0],
              joinCode,
              isSuperAdmin: true,
              promotedBy: "bootstrap",
            });
            await migrateDataToTeacher(user.uid);
            return;
          }
          // Check for a pending teacher invite
          try {
            const invite = await checkTeacherInvite(user.email);
            if (invite) {
              const joinCode = generateJoinCode();
              await createTeacherRecord(user.uid, {
                email: user.email,
                displayName: user.displayName || user.email.split("@")[0],
                joinCode,
                isSuperAdmin: false,
                promotedBy: invite.invitedBy,
              });
              try {
                await removeTeacherInvite(user.email);
              } catch (removeErr) {
                console.warn("Could not remove teacher invite (will retry on next login):", removeErr);
              }
              return;
            }
          } catch (inviteErr) {
            console.warn("Could not check teacher invites:", inviteErr);
          }
          // Not a teacher
          setIsTeacher(false);
          setIsSuperAdmin(false);
          setTeacherData(null);
          setTeacherLoading(false);
        }
      } catch (err) {
        console.error("Teacher record check failed:", err);
        setIsTeacher(false);
        setTeacherLoading(false);
      }
    });
    return () => unsub();
  }, [user]);

  // Subscribe to student's section assignment (skip for teachers)
  useEffect(() => {
    if (!user || isTeacher || teacherLoading) {
      if (isTeacher) {
        setUserSection(null);
        setUserTeacherUid(null);
        setSectionLoading(false);
      }
      return;
    }
    setSectionLoading(true);
    const unsub = subscribeToStudentSection(user.uid, (data) => {
      setUserSection(data?.section || null);
      setUserTeacherUid(data?.teacherUid || null);
      setSectionLoading(false);
    });
    return () => unsub();
  }, [user, isTeacher, teacherLoading]);

  const login = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setAuthError("Sign-in failed. Please try again.");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setAuthError(null);
    setIsTeacher(false);
    setIsSuperAdmin(false);
    setTeacherData(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading: loading || teacherLoading,
      authError,
      login,
      logout,
      isTeacher,
      isSuperAdmin,
      teacherData,
      userSection,
      userTeacherUid,
      sectionLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
