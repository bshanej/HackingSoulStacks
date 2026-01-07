import React from "react";
import { Card } from "../ui/atoms";
import { CORE_BLURB, CORE_LABEL, CORE_ORDER, SUBTYPES } from "../core/data/archetypes";

export default function Library() {
  return (
    <div className="grid">
      <Card>
        <h2>The Library</h2>
        <p className="muted">Explore the 8 core archetypes and their 32 possible combinations.</p>
      </Card>

      {CORE_ORDER.map((c) => (
        <Card key={c}>
          <h3 style={{ color: "var(--accent)" }}>{CORE_LABEL[c]}</h3>
          <p style={{ marginBottom: "1rem" }}>{CORE_BLURB[c]}</p>
          <div className="muted" style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>Subtype Combinations:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {SUBTYPES.filter(s => s.dominant === c).map(s => (
              <span key={s.id} className="pill" style={{ fontSize: "0.75rem" }}>{s.label}</span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
