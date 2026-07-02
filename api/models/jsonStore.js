import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const storePath = process.env.AI_COMPANION_STORE_PATH || join(tmpdir(), "ai-companion-prototype-db.json");

const emptyStore = {
  users: [],
  profiles: [],
  devices: [],
};

export async function readStore() {
  try {
    const raw = await readFile(storePath, "utf8");
    return { ...emptyStore, ...JSON.parse(raw) };
  } catch {
    return { ...emptyStore };
  }
}

export async function writeStore(store) {
  await mkdir(dirname(storePath), { recursive: true });
  await writeFile(storePath, JSON.stringify({ ...emptyStore, ...store }, null, 2));
}

export function nowIso() {
  return new Date().toISOString();
}

export function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
