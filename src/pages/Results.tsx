import React, { useMemo } from "react";
import { Card, Button } from "../ui/atoms";
import { CORE_LABEL, CORE_ORDER } from "../core/data/archetypes";
import { loadLatestSession } from "../core/storage";
import { subtypeFromCores } from "../core/subtype";

export default function Results() {
  const session = loadLatestSession();
  
  const subtype = useMemo(() => {
    if (!session) return null;
    return subtypeFromCores(session.dominant, session.secondary);
  }, [session]);

  if (!session || !subtype) return <Card>No results yet.</Card>;

  const maxScore = Math.max(...Object.values(session.scores));

  return (
    <div className="grid">
      <Card>
        <h2>Your Result</h2>
        <div className="muted" style={{ marginBottom: "1rem" }}>
          Dominant: {CORE_LABEL[session.dominant]} | Secondary: {CORE_LABEL[session.secondary]}
        </div>
        <h3 style={{ color: "var(--accent)", fontSize: "1.5rem" }}>{subtype.name}</h3>
        <p>{subtype.description}</p>
        <div className="muted" style={{ marginTop: "1rem" }}>Confidence: {Math.round(session.confidence * 100)}%</div>
      </Card>

      <Card>
        <h3>Archetype Breakdown</h3>
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
          {CORE_ORDER.map(c => {
            const score = session.scores[c];
            const pct = Math.max(0, (score / (maxScore || 1)) * 100);
            return (
              <div key={c} style={{ display: "grid", gridTemplateColumns: "100px 1fr 40px", alignItems: "center", gap: "1rem" }}>
                <div className="muted" style={{ fontSize: "0.85rem" }}>{CORE_LABEL[c]}</div>
                <div style={{ background: "var(--glass)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ background: "var(--accent)", height: "100%", width: `${pct}%` }} />
                </div>
                <div style={{ textAlign: "right", fontSize: "0.85rem" }}>{score}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={() => location.hash = "#test"}>Retake Test</Button>
        <Button variant="ghost" onClick={() => location.hash = "#archive"}>View Archive</Button>
      </div>
    </div>
  );
}
