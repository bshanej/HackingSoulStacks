import React, { useMemo, useState } from "react";
import { Card, Button } from "../ui/atoms";

import { CORE_LABEL } from "../core/data/archetypes";
import {
  clearArchive,
  loadArchive,
  removeFromArchive,
  saveSession,
} from "../core/storage";
import { Session } from "../core/types";

function fmt(ts: number) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

function Row({
  s,
  onOpen,
  onDelete,
}: {
  s: Session;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const d = s.dominant;
  const sec = s.secondary;

  return (
    <div className="card" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700 }}>
            {CORE_LABEL[d]} / {CORE_LABEL[sec]}
          </div>
          <div className="muted" style={{ fontSize: "0.8rem" }}>
            {fmt(s.createdAt)} • {s.mode} • {s.subtypeId}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={onOpen}>Open</Button>
          <Button variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default function Archive() {
  const [tick, setTick] = useState(0);
  const archive = useMemo(() => loadArchive(), [tick]);

  function refresh() { setTick((t) => t + 1); }

  function openSession(s: Session) {
    saveSession(s);
    location.hash = "#results";
  }

  function delSession(id: string) {
    removeFromArchive(id);
    refresh();
  }

  return (
    <div className="grid">
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Archive</h2>
          <Button 
            variant="danger" 
            onClick={() => { clearArchive(); refresh(); }}
            disabled={archive.length === 0}
          >
            Clear All
          </Button>
        </div>
      </Card>

      {archive.length === 0 ? (
        <Card><p className="muted">No archived sessions yet.</p></Card>
      ) : (
        archive.map((s) => (
          <Row key={s.id} s={s} onOpen={() => openSession(s)} onDelete={() => delSession(s.id)} />
        ))
      )}
    </div>
  );
}
