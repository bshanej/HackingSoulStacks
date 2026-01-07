import React, { useMemo, useState } from "react";
import { Card, Button } from "../ui/atoms";

import { CORE_LABEL } from "../core/data/archetypes";
import {
  clearArchive,
  loadArchive,
  removeFromArchive,
  saveLatestSession,
  type StoredSession,
} from "../core/storage";

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
  s: StoredSession;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const d = s.result?.dominant;
  const sec = s.result?.secondary;

  return (
    <div
      className="card"
      style={{
        padding: 12,
        background: "rgba(18,19,36,.65)",
        borderColor: "rgba(255,255,255,.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 700 }}>
            {d ? CORE_LABEL[d] : "Unknown"}{" "}
            <span className="muted">/</span>{" "}
            {sec ? CORE_LABEL[sec] : "Unknown"}
          </div>

          <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
            {fmt(s.createdAt)} • {s.mode} • {s.result?.subtypeId ?? "—"}
          </div>

          {s.displayName ? (
            <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
              Name: {s.displayName}
            </div>
          ) : null}

          {s.notes ? (
            <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
              Notes: {s.notes}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 120 }}>
          <Button onClick={onOpen}>Open</Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Archive() {
  const [tick, setTick] = useState(0);
  const archive = useMemo(() => loadArchive(), [tick]);

  function refresh() {
    setTick((t) => t + 1);
  }

  function openSession(s: StoredSession) {
    saveLatestSession(s);
    location.hash = "#results";
  }

  function delSession(id: string) {
    removeFromArchive(id);
    refresh();
  }

  return (
    <div className="grid" style={{ gap: 12 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h2>Archive</h2>
            <p className="muted">
              Saved sessions: <b>{archive.length}</b>
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Button
              variant="danger"
              onClick={() => {
                clearArchive();
                refresh();
              }}
              disabled={archive.length === 0}
            >
              Clear All
            </Button>
            <Button variant="ghost" onClick={() => (location.hash = "#test")}>
              New Test
            </Button>
          </div>
        </div>
      </Card>

      {archive.length === 0 ? (
        <Card>
          <p className="muted">No archived sessions yet. Take the test and save results.</p>
          <Button onClick={() => (location.hash = "#test")}>Take Test</Button>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {archive.map((s) => (
            <Row
              key={s.id}
              s={s}
              onOpen={() => openSession(s)}
              onDelete={() => delSession(s.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
