import {
  ref,
  push,
  set,
  remove,
  update,
  onValue,
  get,
} from "firebase/database";
import { db } from "../firebase";

// ── Teachers ────────────────────────────────────────────────

export function subscribeToTeacherRecord(uid, callback) {
  const teacherRef = ref(db, `teachers/${uid}`);
  return onValue(teacherRef, (snapshot) => {
    callback(snapshot.val() || null);
  });
}

export async function createTeacherRecord(uid, data) {
  const teacherRef = ref(db, `teachers/${uid}`);
  await set(teacherRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
}

export function generateJoinCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function lookupTeacherByJoinCode(code) {
  const teachersRef = ref(db, "teachers");
  const snapshot = await get(teachersRef);
  if (!snapshot.exists()) return null;
  let found = null;
  snapshot.forEach((child) => {
    if (child.val().joinCode === code.toUpperCase()) {
      found = { uid: child.key, ...child.val() };
    }
  });
  return found;
}

// ── Teacher Invites ─────────────────────────────────────────

function sanitizeEmailKey(email) {
  return email.toLowerCase().replace(/\./g, ",");
}

export async function checkTeacherInvite(email) {
  const key = sanitizeEmailKey(email);
  const inviteRef = ref(db, `teacherInvites/${key}`);
  const snapshot = await get(inviteRef);
  return snapshot.exists() ? snapshot.val() : null;
}

export async function removeTeacherInvite(email) {
  const key = sanitizeEmailKey(email);
  const inviteRef = ref(db, `teacherInvites/${key}`);
  await remove(inviteRef);
}

// ── Migration ───────────────────────────────────────────────

export async function migrateDataToTeacher(teacherUid) {
  const sectionsRef = ref(db, "sections");
  const sectionsSnap = await get(sectionsRef);
  if (sectionsSnap.exists()) {
    const sections = sectionsSnap.val();
    if (Array.isArray(sections)) {
      const updated = sections.filter(Boolean).map((s) =>
        s.teacherUid ? s : { ...s, teacherUid: teacherUid }
      );
      await set(sectionsRef, updated);
    }
  }

  const studentsRef = ref(db, "studentSections");
  const studentsSnap = await get(studentsRef);
  if (studentsSnap.exists()) {
    const updates = {};
    studentsSnap.forEach((child) => {
      const data = child.val();
      if (!data.teacherUid) {
        updates[`${child.key}/teacherUid`] = teacherUid;
      }
    });
    if (Object.keys(updates).length > 0) {
      await update(studentsRef, updates);
    }
  }
}

// ── Sections ────────────────────────────────────────────────

export async function getSections() {
  const snapshot = await get(ref(db, "sections"));
  const data = snapshot.val();
  return Array.isArray(data) ? data.filter(Boolean) : [];
}

export function subscribeToSections(callback) {
  const sectionsRef = ref(db, "sections");
  return onValue(sectionsRef, (snapshot) => {
    const data = snapshot.val();
    callback(Array.isArray(data) ? data.filter(Boolean) : []);
  }, (error) => {
    console.error("Error reading sections:", error);
    callback([]);
  });
}

// ── Student Sections ────────────────────────────────────────

export function subscribeToStudentSection(uid, callback) {
  const studentRef = ref(db, `studentSections/${uid}`);
  return onValue(studentRef, (snapshot) => {
    callback(snapshot.val() || null);
  }, (error) => {
    console.error("Error reading student section:", error);
    callback(null);
  });
}

export async function assignStudentSection(uid, sectionId, teacherUid, email, displayName) {
  const studentRef = ref(db, `studentSections/${uid}`);
  await set(studentRef, {
    section: sectionId,
    teacherUid: teacherUid || null,
    email,
    displayName,
    assignedAt: new Date().toISOString(),
    assignedBy: "self",
  });
}

export function subscribeToAllStudentSections(callback) {
  const allRef = ref(db, "studentSections");
  return onValue(allRef, (snapshot) => {
    const result = [];
    snapshot.forEach((child) => {
      result.push({ uid: child.key, ...child.val() });
    });
    callback(result);
  }, (error) => {
    console.error("Error reading student sections:", error);
    callback([]);
  });
}

// ── Hub: Student Progress ───────────────────────────────────

export function subscribeToStudentProgress(uid, callback) {
  const progressRef = ref(db, `hub/progress/${uid}`);
  return onValue(progressRef, (snapshot) => {
    callback(snapshot.val() || {});
  }, (error) => {
    console.error("Error reading student progress:", error);
    callback({});
  });
}

export async function updateSkillProgress(uid, componentId, data) {
  const componentRef = ref(db, `hub/progress/${uid}/${componentId}`);
  await update(componentRef, {
    ...data,
    lastUpdated: new Date().toISOString(),
  });
}

// ── Hub: Activity Results ───────────────────────────────────

export async function submitActivityResult(data) {
  const resultsRef = ref(db, "hub/activityResults");
  const newRef = push(resultsRef);
  await set(newRef, {
    ...data,
    completedAt: new Date().toISOString(),
  });
  return newRef.key;
}

// ── Hub: Activities ─────────────────────────────────────────

export function subscribeToActivities(callback) {
  const activitiesRef = ref(db, "hub/activities");
  return onValue(activitiesRef, (snapshot) => {
    const result = [];
    snapshot.forEach((child) => {
      result.push({ id: child.key, ...child.val() });
    });
    callback(result);
  }, (error) => {
    console.error("Error reading activities:", error);
    callback([]);
  });
}
