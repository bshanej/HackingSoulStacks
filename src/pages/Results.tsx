import React, { useMemo } from "react";
import { Card, Button, Progress } from "../ui/atoms";
import { CORE_LABEL, CORE_ORDER } from "../core/data/archetypes";
import { loadLatestSession, saveSession } from "../core/storage";
import { subtypeFromCores } from "../core/subtype";

export default function Results() {
  const session = loadLatestSession();
  
  const subtype = useMemo(() => {
    if (!session) return null;
    return subtypeFromCores(session.dominant, session.secondary);
  }, [session]);

  if (!session || !subtype) {
    return (
      <Card style={{ textAlign: "center" }}>
        <h2>No Results Found</h2>
        <p className="muted" style={{ margin: "1rem 0" }}>Take the assessment to see your profile.</p>
        <Button onClick={() => location.hash = "#test"}>Start Test</Button>
      </Card>
    );
  }

  const maxScore = Math.max(...Object.values(session.scores));

  return (
    <div className="grid">
      <Card>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--accent)" }}>Your Signature</h2>
          <h1 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>{subtype.name}</h1>
          <div className="muted" style={{ fontSize: "1.1rem" }}>
            {CORE_LABEL[session.dominant]} + {CORE_LABEL[session.secondary]}
          </div>
          <div style={{ marginTop: "1rem", display: "inline-block", padding: "0.25rem 1rem", background: "var(--glass)", borderRadius: "99px", fontSize: "0.85rem" }}>
            Confidence: {Math.round(session.confidence * 100)}%
          </div>
        </div>
        
        <p style={{ fontSize: "1.1rem", textAlign: "center", fontStyle: "italic", marginBottom: "2rem" }}>
          "{subtype.description}"
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Button onClick={() => saveSession(session)}>Save to Archive</Button>
          <Button variant="ghost" onClick={() => location.hash = "#test"}>Retake Test</Button>
        </div>
      </Card>

      <Card>
        <h3>Archetype Profile</h3>
        <p className="muted" style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>Comparative scoring across all 8 cores</p>
        
        <div style={{ display: "grid", gap: "1rem" }}>
          {CORE_ORDER.map(c => {
            const score = session.scores[c];
            const pct = Math.max(5, (score / (maxScore || 1)) * 100);
            const isDominant = c === session.dominant;
            const isSecondary = c === session.secondary;

            return (
              <div key={c} style={{ display: "grid", gridTemplateColumns: "100px 1fr 40px", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: isDominant || isSecondary ? 700 : 400, color: isDominant ? "var(--accent)" : "inherit" }}>
                  {CORE_LABEL[c]}
                </div>
                <div style={{ background: "var(--glass)", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
                  <div style={{ 
                    background: isDominant ? "var(--accent)" : isSecondary ? "rgba(125, 95, 255, 0.6)" : "var(--border)", 
                    height: "100%", 
                    width: `${pct}%`,
                    boxShadow: isDominant ? "0 0 10px var(--accent-glow)" : "none"
                  }} />
                </div>
                <div style={{ textAlign: "right", fontSize: "0.85rem", opacity: 0.7 }}>{score}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3>Layer Analysis</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
           {["L1", "L2", "L3"].map(layer => (
             <div key={layer} style={{ background: "var(--glass)", padding: "1rem", borderRadius: "0.5rem", textAlign: "center" }}>
               <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{layer}</div>
               <div style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0.25rem 0" }}>Optimal</div>
               <div style={{ fontSize: "0.7rem", color: "var(--accent)" }}>Balanced</div>
             </div>
           ))}
        </div>
      </Card>
    </div>
  );
}
