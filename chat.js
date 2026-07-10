import { activateUser, getUserProfile, saveUserProfile } from "./models/user.js";

function parseBody(req) {
  return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = parseBody(req);
  const user = await activateUser(body.code);
  if (!user) {
    return res.status(403).json({ error: "激活码无效" });
  }

  const profile = body.profile ? await saveUserProfile(user.id, body.profile) : await getUserProfile(user.id);
  return res.status(200).json({
    active: true,
    userId: user.id,
    profile,
    needsProfile: !profile?.nickname && !profile?.location,
  });
}
