import React, { useState, useEffect } from "react";
import { Card, Button } from "../ui/atoms";
import { dataStore, CoreData, SubtypeData } from "../core/dataStore";

export default function Library() {
  const [selectedSubtype, setSelectedSubtype] = useState<SubtypeData | null>(null);
  const [cores, setCores] = useState<CoreData[]>([]);
  const [subtypes, setSubtypes] = useState<SubtypeData[]>([]);

  useEffect(() => {
    setCores(dataStore.getCores());
    setSubtypes(dataStore.getSubtypes());
  }, []);

  return (
    <div className="grid">
      <Card>
        <h2>The Grand Library</h2>
        <p className="muted">Explore the 8 core archetypes and their 32 unique resonance signatures.</p>
      </Card>

      {cores.map((c) => (
        <Card key={c.core_id}>
          <h3 style={{ color: "var(--accent)", fontSize: "1.4rem" }}>{c.name}</h3>
          <p className="muted" style={{ margin: "0.2rem 0 1rem", fontSize: "0.85rem" }}>{c.domain}</p>
          <p style={{ margin: "0.5rem 0 1.5rem" }}>{c.domain} - Opposite: {c.opposite}</p>
          
          <div className="muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
            Resonance Signatures
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {subtypes.filter(s => s.core_id === c.core_id).map(s => (
              <button 
                key={s.subtype_id} 
                className={`pill ${selectedSubtype?.subtype_id === s.subtype_id ? "active" : ""}`}
                onClick={() => setSelectedSubtype(s)}
                style={{ fontSize: "0.8rem" }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </Card>
      ))}

      {selectedSubtype && (
        <div className="modal-overlay" onClick={() => setSelectedSubtype(null)}>
          <Card className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ color: "var(--accent)" }}>{selectedSubtype.name}</h2>
                <p className="muted">{selectedSubtype.tagline}</p>
              </div>
              <Button onClick={() => setSelectedSubtype(null)} variant="ghost">✕</Button>
            </div>

            <div style={{ marginTop: "1.5rem", display: "grid", gap: "1.25rem" }}>
              <section>
                <h4 style={{ color: "var(--text-main)" }}>The Core Profile</h4>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{selectedSubtype.description}</p>
              </section>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <section>
                  <h4 style={{ color: "var(--accent)" }}>Light Strengths</h4>
                  <ul className="muted" style={{ fontSize: "0.85rem", paddingLeft: "1rem" }}>
                    {selectedSubtype.cards.mode_light.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </section>
                <section>
                  <h4 style={{ color: "#ff4d6d" }}>Shadow Warnings</h4>
                  <ul className="muted" style={{ fontSize: "0.85rem", paddingLeft: "1rem" }}>
                    {selectedSubtype.cards.mode_shadow.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </section>
              </div>

              <section>
                <h4 style={{ color: "var(--text-main)" }}>Pathways</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Integration:</b> {selectedSubtype.cards.integration_keys.join("; ")}</p>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Best With:</b> {selectedSubtype.cards.relationships.best_with.join(", ")}</p>
              </section>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
