import React from "react";
import { Card, Button } from "../ui/atoms";

export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <Card>
      <div className="home-hero">
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome to SoulStack</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
          Discover your unique psychological fingerprint through our advanced 3-layer diagnostic.
        </p>
        <div style={{ display: "grid", gap: "1rem" }}>
          <Button onClick={onStart} style={{ padding: "1.2rem", fontSize: "1.1rem" }}>
            Begin New Assessment
          </Button>
          <Button variant="ghost" onClick={() => (location.hash = "#library")}>
            Browse Archetype Library
          </Button>
        </div>
        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--glass)", borderRadius: "0.5rem" }}>
          <h4 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>How it works</h4>
          <p className="muted" style={{ fontSize: "0.9rem" }}>
            Answer a series of behavioral questions designed to reveal your dominant and secondary archetypes. 
            We'll generate one of 32 possible subtype signatures based on your specific results.
          </p>
        </div>
      </div>
    </Card>
  );
}
