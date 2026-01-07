// src/core/storage.ts
// LocalStorage helpers for: latest session + archive list

const KEY_LATEST = "soulstack.latestSession";
const KEY_ARCHIVE = "soulstack.archive";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeStringify(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    // last resort: stringify-ish
    return JSON.stringify({ error: "Could not stringify value" });
  }
}

/** Session shape is intentionally loose so you don't brick the app while iterating. */
export type AnySession = {
  id?: string;
  createdAt?: number;
  mode?: string;
  displayName?: string;
  notes?: string;

  // test payload
  answers?: Record<string, number>;

  // computed/scored output (whatever your scorer returns)
  result?: any;

  // allow anything else
  [k: string]: any;
};

function ensureId(s: AnySession): AnySession {
  if (s.id) return s;
  return { ...s, id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}` };
}

function ensureCreatedAt(s: AnySession): AnySession {
  if (typeof s.createdAt === "number") return s;
  return { ...s, createdAt: Date.now() };
}

/** Read the most recent session (used by Results). */
export function loadLatestSession(): AnySession | null {
  return safeParse<AnySession>(localStorage.getItem(KEY_LATEST));
}

/** Persist latest session (used by Test + Results). */
export function saveLatestSession(session: AnySession): void {
  const fixed = ensureCreatedAt(ensureId(session));
  localStorage.setItem(KEY_LATEST, safeStringify(fixed));
}

/** Alias (some of your earlier code referenced this name) */
export const loadLatest = loadLatestSession;
export const saveLatest = saveLatestSession;

/** Load the archive list (used by Archive page). */
export function loadArchive(): AnySession[] {
  const a = safeParse<AnySession[]>(localStorage.getItem(KEY_ARCHIVE));
  if (!Array.isArray(a)) return [];
  // newest first
  return [...a].sort((x, y) => (y.createdAt ?? 0) - (x.createdAt ?? 0));
}

/** Add an entry to archive (does NOT remove latest). */
export function addToArchive(session: AnySession): void {
  const fixed = ensureCreatedAt(ensureId(session));
  const current = loadArchive();

  // De-dupe by id (replace if exists)
  const idx = current.findIndex((s) => s.id && fixed.id && s.id === fixed.id);
  if (idx >= 0) current[idx] = fixed;
  else current.unshift(fixed);

  localStorage.setItem(KEY_ARCHIVE, safeStringify(current));
}

/** Remove one archived session by id. */
export function removeFromArchive(id: string): void {
  const current = loadArchive().filter((s) => s.id !== id);
  localStorage.setItem(KEY_ARCHIVE, safeStringify(current));
}

/** Delete all archived sessions. */
export function clearArchive(): void {
  localStorage.setItem(KEY_ARCHIVE, safeStringify([]));
}

/** Back-compat exports (in case other files import these names) */
export const getArchive = loadArchive;
export const deleteArchiveItem = removeFromArchive;
