import React, { useMemo } from "react";
import { Card, Button } from "../ui/atoms";

import { CORE_LABEL, CORE_ORDER } from "../core/data/archetypes";
import { subtypeFromCores } from "../core/subtype";
import { addToArchive, loadLatestSession } from "../core/storage/storage";
import type { Core } from "../core/data/types";

function BarRow({ core, value, maxAbs }: { core: Core; value: number; maxAbs: number }) {
  const pct = maxAbs === 0 ? 0 : Math.round((Math.abs(value) / maxAbs) * 100);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 60px", gap: 10, alignItems: "center" }}>
      <div className="muted">{CORE_LABEL[core]}</div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden", height: 10 }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: value >= 0 ? "rgba(155,140,255,0.85)" : "rgba(255,77,109,0.75)",
          }}
        />
      </div>
      <div style={{ textAlign: "right" }} className="muted">
        {value}
      </div>
    </div>
  );
}

export default function Results() {
  const session = loadLatestSession();

  const view = useMemo(() => {
    if (!session) return null;

    const { scores, dominant, secondary, subtypeId } = session.result;
    const maxAbs = Math.max(...CORE_ORDER.map((c) => Math.abs(scores[c])));

    const subtype = subtypeFromCores(dominant, secondary);

    return { scores, dominant, secondary, subtypeId, subtype, maxAbs };
  }, [session]);

  if (!session || !view) {
    return (
      <Card>
        <h2>Results</h2>
        <p className="muted">No saved results yet. Take the test first.</p>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => (location.hash = "#test")}>Take Test</Button>
          <Button variant="ghost" onClick={() => (location.hash = "#home")}>
            Home
          </Button>
        </div>
      </Card>
    );
  }

  const { scores, dominant, secondary, subtype, maxAbs } = view;

  return (
    <div className="grid" style={{ gap: 12 }}>
      <Card>
        <h2>Your Signature</h2>
        <p className="muted">
          Dominant: <b>{CORE_LABEL[dominant]}</b> • Secondary: <b>{CORE_LABEL[secondary]}</b>
        </p>

        <div style={{ marginTop: 10 }}>
          <h3 style={{ marginBottom: 6 }}>{subtype.name}</h3>
          <p className="muted">{subtype.tagline}</p>
          <p style={{ marginTop: 10 }}>{subtype.description}</p>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          <Button
            onClick={() => {
              addToArchive(session);
              location.hash = "#archive";
            }}
          >
            Save to Archive
          </Button>
          <Button variant="ghost" onClick={() => (location.hash = "#test")}>
            Retake Test
          </Button>
        </div>
      </Card>

      <Card>
        <h3>Core Scores</h3>
        <p className="muted">Bigger bar = stronger signal. Negative means “opposite polarity” answers dominated.</p>

        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {CORE_ORDER.map((c) => (
            <BarRow key={c} core={c} value={scores[c]} maxAbs={maxAbs} />
          ))}
        </div>
      </Card>

      <Card>
        <h3>Strengths</h3>
        <ul>
          {subtype.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 12 }}>Weaknesses</h3>
        <ul>
          {subtype.weaknesses.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 12 }}>Relationships</h3>
        <ul>
          {subtype.relationships.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 12 }}>Careers</h3>
        <ul>
          {subtype.careers.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
