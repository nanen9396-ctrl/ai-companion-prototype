import { makeId, nowIso, readStore, writeStore } from "./jsonStore.js";

const defaultActivationCodes = ["XIA-2026", "NANEN-2026", "AI-COMPANION-001"];

export function normalizeActivationCode(code) {
  return String(code || "").trim().toUpperCase();
}

export function validActivationCodes() {
  return (process.env.ACTIVATION_CODES || defaultActivationCodes.join(","))
    .split(",")
    .map((code) => normalizeActivationCode(code))
    .filter(Boolean);
}

export async function activateUser(code) {
  const activationCode = normalizeActivationCode(code);
  if (!validActivationCodes().includes(activationCode)) {
    return null;
  }

  const store = await readStore();
  let user = store.users.find((item) => item.activation_code === activationCode);
  if (!user) {
    const now = nowIso();
    user = {
      id: makeId("user"),
      activation_code: activationCode,
      created_at: now,
      updated_at: now,
    };
    store.users.push(user);
    await writeStore(store);
  }
  return user;
}

export async function getUserProfile(userId) {
  if (!userId) return null;
  const store = await readStore();
  return store.profiles.find((profile) => profile.user_id === userId) || null;
}

export async function saveUserProfile(userId, profile) {
  const store = await readStore();
  const existingIndex = store.profiles.findIndex((item) => item.user_id === userId);
  const nextProfile = {
    user_id: userId,
    nickname: String(profile?.nickname || "").trim(),
    location: String(profile?.location || "").trim(),
    conversation_style: String(profile?.conversation_style || "").trim(),
    updated_at: nowIso(),
  };

  if (existingIndex >= 0) {
    store.profiles[existingIndex] = { ...store.profiles[existingIndex], ...nextProfile };
  } else {
    store.profiles.push(nextProfile);
  }
  await writeStore(store);
  return nextProfile;
}
