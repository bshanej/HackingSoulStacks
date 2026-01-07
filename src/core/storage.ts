import { Session } from "./types";

const KEY_ARCHIVE = "soulstack.archive";
const KEY_LATEST = "soulstack.latestSession";

export function saveSession(session: Session): void {
  const archive = loadArchive();
  const index = archive.findIndex(s => s.id === session.id);
  if (index !== -1) {
    archive[index] = session;
  } else {
    archive.unshift(session);
  }
  localStorage.setItem(KEY_ARCHIVE, JSON.stringify(archive));
  localStorage.setItem(KEY_LATEST, JSON.stringify(session));
}

export function loadArchive(): Session[] {
  const raw = localStorage.getItem(KEY_ARCHIVE);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function deleteEntry(id: string): void {
  const archive = loadArchive().filter(s => s.id !== id);
  localStorage.setItem(KEY_ARCHIVE, JSON.stringify(archive));
}

export function clearArchive(): void {
  localStorage.setItem(KEY_ARCHIVE, JSON.stringify([]));
}

export function loadLatestSession(): Session | null {
  const raw = localStorage.getItem(KEY_LATEST);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
