import React, { useMemo, useState } from "react";
import { Card, Button } from "../ui/atoms";
import { CORE_LABEL } from "../core/data/archetypes";
import {
  clearArchive,
  loadArchive,
  deleteEntry,
  saveSession,
} from "../core/storage";
import { Session } from "../core/types";

function fmt(ts: number) {
  try {
    return new Date(ts).toLocaleDateString(undefined, { 
      month: "short", 
      day: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  } catch {
    return String(ts);
  }
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
    deleteEntry(id);
    refresh();
  }

  return (
    <div className="grid">
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>Session Archive</h2>
            <p className="muted" style={{ fontSize: "0.85rem" }}>{archive.length} saved results</p>
          </div>
          <Button 
            variant="danger" 
            onClick={() => { if(confirm("Clear all results?")) { clearArchive(); refresh(); } }}
            disabled={archive.length === 0}
          >
            Clear All
          </Button>
        </div>
      </Card>

      {archive.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "3rem" }}>
          <p className="muted">No archived sessions yet.</p>
          <Button onClick={() => location.hash = "#test"} style={{ marginTop: "1rem" }}>Take Your First Test</Button>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {archive.map((s) => (
            <Card key={s.id} style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {CORE_LABEL[s.dominant]} / {CORE_LABEL[s.secondary]}
                  </div>
                  <div className="muted" style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
                    {fmt(s.createdAt)} • {s.mode} Mode • ID: {s.subtypeId}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button onClick={() => openSession(s)}>View</Button>
                  <Button variant="danger" onClick={() => delSession(s.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
