import React, { useState } from "react";
import { Card, Button } from "../ui/atoms";
import { dataStore, CoreID } from "../core/dataStore";
import { subtypeFromCores } from "../core/subtype";

export default function Library() {
  const [selectedSubtypeId, setSelectedSubtypeId] = useState<string | null>(null);

  const lore = selectedSubtypeId ? dataStore.getSubtypeById(selectedSubtypeId) : null;

  return (
    <div className="grid">
      <Card>
        <h2>The Grand Library</h2>
        <p className="muted">Explore the 8 core archetypes and the 32 unique subtype signatures.</p>
      </Card>

      {dataStore.getCores().map((c) => (
        <Card key={c.core_id}>
          <h3 style={{ color: "var(--accent)", fontSize: "1.4rem" }}>{c.name}</h3>
          <p style={{ margin: "0.5rem 0 1.5rem" }}>{c.domain}</p>
          
          <div className="muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
            Execution Modes
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {dataStore.getSubtypesByCore(c.core_id).map(s => (
              <button 
                key={s.subtype_id} 
                className={`pill ${selectedSubtypeId === s.subtype_id ? "active" : ""}`}
                onClick={() => setSelectedSubtypeId(s.subtype_id)}
                style={{ fontSize: "0.8rem" }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </Card>
      ))}

      {selectedSubtypeId && lore && (
        <div className="modal-overlay" onClick={() => setSelectedSubtypeId(null)}>
          <Card className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ color: "var(--accent)" }}>{lore.name}</h2>
                <p className="muted">{lore.subtype_id}</p>
              </div>
              <Button onClick={() => setSelectedSubtypeId(null)} variant="ghost">✕</Button>
            </div>

            <div style={{ marginTop: "1.5rem", display: "grid", gap: "1.25rem" }}>
              <section>
                <h4 style={{ color: "var(--text-main)" }}>The Essence</h4>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{lore.description}</p>
              </section>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <section>
                  <h4 style={{ color: "var(--accent)" }}>Light Stack (Strengths)</h4>
                  <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1.2rem" }}>
                    {lore.cards.mode_light.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </section>
                <section>
                  <h4 style={{ color: "#ff4d6d" }}>Shadow Stack (Weaknesses)</h4>
                  <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1.2rem" }}>
                    {lore.cards.mode_shadow.map(w => <li key={w}>{w}</li>)}
                  </ul>
                </section>
              </div>

              <section>
                <h4 style={{ color: "var(--text-main)" }}>Integration & Relationships</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Path:</b> {lore.cards.integration_keys.join("; ")}</p>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Best With:</b> {lore.cards.relationships.best_with.join(", ")}</p>
              </section>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
