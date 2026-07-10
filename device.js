import { createDevice, deleteDevice, listDevices, updateDevice } from "./models/device.js";

function parseBody(req) {
  return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
}

function getUserId(req, body) {
  return String(req.headers?.["x-user-id"] || body.user_id || "").trim();
}

function getQuery(req) {
  return new URL(req.url || "/api/devices", "http://localhost").searchParams;
}

export default async function handler(req, res) {
  const body = req.method === "GET" ? {} : parseBody(req);
  const userId = getUserId(req, body);
  if (!userId) {
    return res.status(401).json({ error: "请先激活账号" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ devices: await listDevices(userId) });
  }

  if (req.method === "POST") {
    try {
      const device = await createDevice(userId, body);
      return res.status(201).json({ device });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "PATCH" || req.method === "PUT") {
    const device = await updateDevice(userId, body.id, body);
    if (!device) return res.status(404).json({ error: "设备不存在" });
    return res.status(200).json({ device });
  }

  if (req.method === "DELETE") {
    const id = body.id || getQuery(req).get("id");
    const deleted = await deleteDevice(userId, id);
    if (!deleted) return res.status(404).json({ error: "设备不存在" });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
