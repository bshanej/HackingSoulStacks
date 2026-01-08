import React, { useState, useEffect } from "react";
import { Card, Button } from "../ui/atoms";
import { CORE_LABEL } from "../core/data/archetypes";

export default function Library() {
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [cores, setCores] = useState([]);
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    fetch("/api/core").then(res => res.json()).then(setCores);
    fetch("/api/archetypes").then(res => res.json()).then(setSubtypes);
  }, []);

  return (
    <div className="grid">
      <Card>
        <h2>The Grand Library</h2>
        <p className="muted">Explore the 8 core archetypes and their 32 unique resonance signatures.</p>
      </Card>

      {cores.map((c) => (
        <Card key={c.id}>
          <h3 style={{ color: "var(--accent)", fontSize: "1.4rem" }}>{c.name}</h3>
          <p className="muted" style={{ margin: "0.2rem 0 1rem", fontSize: "0.85rem" }}>{c.axis}</p>
          <p style={{ margin: "0.5rem 0 1.5rem" }}>{c.personality}</p>
          
          <div className="muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
            Resonance Signatures
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {subtypes.filter(s => s.primary === c.id).map(s => (
              <button 
                key={s.id} 
                className={`pill ${selectedSubtype?.id === s.id ? "active" : ""}`}
                onClick={() => setSelectedSubtype(s)}
                style={{ fontSize: "0.8rem" }}
              >
                {s.display_name}
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
                <h2 style={{ color: "var(--accent)" }}>{selectedSubtype.display_name}</h2>
                <p className="muted">{selectedSubtype.summary}</p>
              </div>
              <Button onClick={() => setSelectedSubtype(null)} variant="ghost">✕</Button>
            </div>

            <div style={{ marginTop: "1.5rem", display: "grid", gap: "1.25rem" }}>
              <section>
                <h4 style={{ color: "var(--text-main)" }}>The Core Profile</h4>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{selectedSubtype.personality}</p>
              </section>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <section>
                  <h4 style={{ color: "var(--accent)" }}>Light Strengths</h4>
                  <p className="muted" style={{ fontSize: "0.85rem" }}>{selectedSubtype.strengths}</p>
                </section>
                <section>
                  <h4 style={{ color: "#ff4d6d" }}>Shadow Warnings</h4>
                  <p className="muted" style={{ fontSize: "0.85rem" }}>{selectedSubtype.shadow_warning}</p>
                </section>
              </div>

              <section>
                <h4 style={{ color: "var(--text-main)" }}>Pathways</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Careers:</b> {selectedSubtype.career_paths}</p>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Growth:</b> {selectedSubtype.growth_path}</p>
              </section>

              <section>
                <h4 style={{ color: "var(--text-main)" }}>Notable Echoes</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Famous:</b> {selectedSubtype.famous_people}</p>
                <p className="muted" style={{ fontSize: "0.9rem" }}><b>Fictional:</b> {selectedSubtype.fictional_characters}</p>
              </section>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
