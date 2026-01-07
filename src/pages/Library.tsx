import React, { useState } from "react";
import { Card, Button } from "../ui/atoms";
import { CORE_BLURB, CORE_LABEL, CORE_ORDER, SUBTYPES } from "../core/data/archetypes";
import { subtypeFromCores } from "../core/subtype";

export default function Library() {
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);

  const lore = selectedSubtype ? subtypeFromCores(
    selectedSubtype.split('-')[0] as any,
    selectedSubtype.split('-')[1] as any
  ) : null;

  const subtypeLore = lore ? {
    ...lore,
    strengths: ["Strategic Thinking", "Deep Empathy", "Analytical Prowess"],
    weaknesses: ["Over-analysis", "Emotional Sensitivity", "Decision Fatigue"],
    relationships: "Thrives with grounding types like Guardians; challenged by impulsive Nomads.",
    career: "Systems Architect, Creative Director, High-Stakes Mediator",
    famous: "Carl Jung, Marie Curie",
    fictional: "Gandalf, Batman",
  } : null;

  return (
    <div className="grid">
      <Card>
        <h2>The Grand Library</h2>
        <p className="muted">Explore the 8 core archetypes and the 32 unique subtype signatures.</p>
      </Card>

      {CORE_ORDER.map((c) => (
        <Card key={c}>
          <h3 style={{ color: "var(--accent)", fontSize: "1.4rem" }}>{CORE_LABEL[c]}</h3>
          <p style={{ margin: "0.5rem 0 1.5rem" }}>{CORE_BLURB[c]}</p>
          
          <div className="muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
            Derived Subtypes
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {SUBTYPES.filter(s => s.dominant === c).map(s => (
              <button 
                key={s.id} 
                className={`pill ${selectedSubtype === s.id ? "active" : ""}`}
                onClick={() => setSelectedSubtype(s.id)}
                style={{ fontSize: "0.8rem" }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Card>
      ))}

      {selectedSubtype && subtypeLore && (
        <div className="modal-overlay" onClick={() => setSelectedSubtype(null)}>
          <Card className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ color: "var(--accent)" }}>{subtypeLore.name}</h2>
                <p className="muted">{selectedSubtype}</p>
              </div>
              <Button onClick={() => setSelectedSubtype(null)} variant="ghost">✕</Button>
            </div>

            <div style={{ marginTop: "1.5rem", display: "grid", gap: "1.25rem" }}>
              <section>
                <h4 style={{ color: "var(--text-main)" }}>The Essence</h4>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{subtypeLore.description}</p>
              </section>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <section>
                  <h4 style={{ color: "var(--accent)" }}>Strengths</h4>
                  <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1.2rem" }}>
                    {subtypeLore.strengths.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </section>
                <section>
                  <h4 style={{ color: "#ff4d6d" }}>Weaknesses</h4>
                  <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1.2rem" }}>
                    {subtypeLore.weaknesses.map(w => <li key={w}>{w}</li>)}
                  </ul>
                </section>
              </div>

              <section>
                <h4 style={{ color: "var(--text-main)" }}>Relationships & Careers</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Dynamic:</b> {subtypeLore.relationships}</p>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Pathways:</b> {subtypeLore.career}</p>
              </section>

              <section>
                <h4 style={{ color: "var(--text-main)" }}>Notable Echoes</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Famous:</b> {subtypeLore.famous}</p>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Fictional:</b> {subtypeLore.fictional}</p>
              </section>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
