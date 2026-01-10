import React, { useMemo } from "react";
import { Card, Button, BarChart } from "../ui/atoms";
import { loadLatestSession, saveSession } from "../core/storage";
import { dataStore, CoreID } from "../core/dataStore";
import { resolveResult } from "../core/resolver";
import { CORE_LABEL } from "../core/data/archetypes";

export default function Results() {
  const session = loadLatestSession();

  const profile = useMemo(() => {
    if (!session) return null;
    
    // Use session scores if available, or fallback to zeroed map
    const core_scores = session.scores || {
      CATA: 0, ARCH: 0, EXPL: 0, GUAR: 0, SEER: 0, WEAV: 0, ALCH: 0, SOVE: 0
    };

    const mode_scores = {
      BUI: (core_scores.ARCH + core_scores.SOVE) / 2,
      VIS: (core_scores.SEER + core_scores.EXPL) / 2,
      REG: (core_scores.GUAR + core_scores.WEAV) / 2,
      TRN: (core_scores.ALCH + core_scores.CATA) / 2,
    };

    return resolveResult(core_scores, mode_scores);
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

  const subtypeData = profile.subtype_card;

  return (
    <div className="grid" style={{ gap: "2rem" }}>
      <Card style={{ textAlign: "center", border: "1px solid var(--accent)" }}>
        <h2 style={{ textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", color: "var(--accent)" }}>
          The Signature
        </h2>
        <h1 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>{subtypeData?.name || profile.subtype_id}</h1>
        <p className="muted" style={{ fontSize: "1.2rem" }}>
          {CORE_LABEL[profile.primary_core]} + {CORE_LABEL[profile.support_core]}
        </p>
        <p style={{ marginTop: "1rem", fontStyle: "italic", opacity: 0.8 }}>"{subtypeData?.tagline || "Analyzing resonance..."}"</p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <Card>
          <h3>Core Resonance</h3>
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

        {subtypeData && (
          <Card>
            <h3>Archetype Insights</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              <section>
                <h4 style={{ color: "var(--accent)" }}>Strengths</h4>
                <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1rem" }}>
                  {subtypeData.cards.mode_light.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </section>
              <section>
                <h4 style={{ color: "#ff4d6d" }}>Shadow Warnings</h4>
                <ul className="muted" style={{ fontSize: "0.9rem", paddingLeft: "1rem" }}>
                  {subtypeData.cards.mode_shadow.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </section>
              <section>
                <h4>Integration Keys</h4>
                <p className="muted" style={{ fontSize: "0.9rem" }}>{subtypeData.cards.integration_keys.join("; ")}</p>
              </section>
            </div>
          </Card>
        )}
      </div>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "3rem" }}>
        <Button onClick={() => {
          saveSession(session);
          alert("Reading archived.");
        }}>Save Reading</Button>
        <Button variant="ghost" onClick={() => (location.hash = "#test")}>Retake Test</Button>
      </div>
    </div>
  );
}
