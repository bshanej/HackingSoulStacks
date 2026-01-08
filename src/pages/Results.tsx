import React, { useMemo } from "react";
import { Card, Button, BarChart } from "../ui/atoms";
import { loadLatestSession, saveSession } from "../core/storage";
import { dataStore, CoreID, ModeID } from "../core/dataStore";
import { resolveResult, ResultProfile } from "../core/resolver";
import { CORE_LABEL } from "../core/data/archetypes";

export default function Results() {
  const session = loadLatestSession();

  const profile = useMemo(() => {
    if (!session) return null;
    return resolveResult(session.scores, {
      BUI: (session.scores.ARCH + session.scores.SOVE) / 2,
      VIS: (session.scores.SEER + session.scores.EXPL) / 2,
      REG: (session.scores.GUAR + session.scores.WEAV) / 2,
      TRN: (session.scores.ALCH + session.scores.CATA) / 2,
    });
  }, [session]);

  if (!session || !profile) {
    return (
      <Card style={{ textAlign: "center" }}>
        <h2>No Results Found</h2>
        <Button onClick={() => (location.hash = "#test")} style={{ marginTop: "1rem" }}>
          Start Assessment
        </Button>
      </Card>
    );
  }

  const { subtype_card: card } = profile;

  const stackInfo = (cores: CoreID[]) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
      {cores.map((c, i) => (
        <div key={c} style={{ fontSize: "0.8rem", opacity: i < 2 ? 1 : 0.6 }}>
          {CORE_LABEL[c]} {i >= 2 ? "•" : ""}
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid" style={{ gap: "2rem" }}>
      {/* A) Identity Summary */}
      <Card style={{ textAlign: "center", border: "1px solid var(--accent)", background: "radial-gradient(circle at center, rgba(125, 95, 255, 0.1), transparent)" }}>
        <h2 style={{ textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", color: "var(--accent)" }}>
          The Signature
        </h2>
        <h1 style={{ fontSize: "2.8rem", margin: "0.5rem 0", textShadow: "0 0 20px var(--accent-glow)" }}>{card?.name || profile.subtype_id}</h1>
        <p className="muted" style={{ fontSize: "1.2rem" }}>
          {CORE_LABEL[profile.primary_core]} + {CORE_LABEL[profile.support_core]}
        </p>
        <p style={{ marginTop: "1rem", fontStyle: "italic", opacity: 0.8, fontSize: "1.1rem" }}>"{card?.tagline}"</p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {/* B) Yin-Yang Stacks */}
        <Card style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "var(--accent)", filter: "blur(80px)", opacity: 0.1 }}></div>
          <h3 style={{ color: "#fff", marginBottom: "1rem" }}>Yin-Yang Stacks</h3>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.08)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <strong style={{ color: "#fff", display: "block", marginBottom: "0.5rem" }}>Light Stack (Expansion)</strong>
              {stackInfo(profile.light_stack)}
            </div>
            <div style={{ padding: "1.2rem", background: "rgba(0,0,0,0.4)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <strong style={{ color: "var(--accent)", display: "block", marginBottom: "0.5rem" }}>Shadow Stack (Stability)</strong>
              {stackInfo(profile.shadow_stack)}
            </div>
          </div>
          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Polarity Index:</span>
              <span style={{ fontWeight: "bold", color: "var(--accent)", fontSize: "1.2rem" }}>{profile.charts.light_vs_shadow_index.toFixed(1)}</span>
            </div>
            <p className="muted" style={{ fontSize: "0.85rem", marginTop: "0.7rem", lineHeight: "1.4" }}>
              {profile.charts.light_vs_shadow_index > 0 
                ? "Your current energy signature favors externalized growth and explorative momentum."
                : "Your current energy signature favors internal integration and structural refinement."}
            </p>
          </div>
        </Card>

        {/* D) Charts */}
        <Card>
          <h3>Core Distribution</h3>
          <p className="muted" style={{ fontSize: "0.8rem", marginBottom: "1rem" }}>Relative resonance across the 8 core archetypes.</p>
          <div style={{ marginTop: "1rem" }}>
            <BarChart 
              data={Object.entries(profile.charts.core_scores).map(([k, v]) => ({
                label: CORE_LABEL[k as CoreID],
                value: v,
                active: k === profile.primary_core || k === profile.support_core
              }))}
              max={Math.max(...Object.values(profile.charts.core_scores), 1)}
            />
          </div>
        </Card>
      </div>

      {/* C) Deep Dive */}
      <Card>
        <h2 style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>Subtype Deep Dive</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
          <section>
            <h4 style={{ color: "var(--text-main)", marginBottom: "0.8rem" }}>The Essence</h4>
            <p className="muted" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{card?.description}</p>
          </section>

          <section>
            <h4 style={{ color: "var(--accent)", marginBottom: "0.8rem" }}>Strengths & Light Patterns</h4>
            <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1.2rem", lineHeight: "1.8" }}>
              {card?.cards.mode_light.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>

          <section>
            <h4 style={{ color: "#ff4d6d", marginBottom: "0.8rem" }}>Shadow Traps & Blindspots</h4>
            <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1.2rem", lineHeight: "1.8" }}>
              {card?.cards.mode_shadow.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </section>

          <section>
            <h4 style={{ color: "var(--text-main)", marginBottom: "0.8rem" }}>Relational Dynamics</h4>
            <div className="muted" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              <p style={{ marginBottom: "0.5rem" }}><strong>High Resonance:</strong> {card?.cards.relationships.best_with.join(", ")}</p>
              <p><strong>Friction Points:</strong> {card?.cards.relationships.watch_out_for.join(", ")}</p>
            </div>
          </section>

          <section>
            <h4 style={{ color: "var(--text-main)", marginBottom: "0.8rem" }}>Integration Micro-Practices</h4>
            <div className="muted" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              {card?.cards.integration_keys.map((k, i) => <p key={i} style={{ marginBottom: "0.4rem" }}>• {k}</p>)}
            </div>
          </section>

          <section>
            <h4 style={{ color: "var(--text-main)", marginBottom: "0.8rem" }}>Pathways & Environment</h4>
            <div className="muted" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              <p style={{ marginBottom: "0.5rem" }}><strong>Ideal Roles:</strong> Strategic Leadership, Systems Design</p>
              <p><strong>Thrives In:</strong> High-trust environments with clear long-term direction.</p>
            </div>
          </section>
        </div>
      </Card>

      {/* E) Actions */}
      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "4rem", marginTop: "1rem" }}>
        <Button onClick={() => {
          saveSession(session);
          alert("Reading saved to your archive.");
        }} style={{ padding: "0.8rem 2rem" }}>Save to Archive</Button>
        <Button variant="ghost" onClick={() => window.print()} style={{ padding: "0.8rem 2rem" }}>Print / Export</Button>
        <Button variant="ghost" onClick={() => (location.hash = "#test")} style={{ padding: "0.8rem 2rem" }}>Retake Assessment</Button>
      </div>
    </div>
  );
}
