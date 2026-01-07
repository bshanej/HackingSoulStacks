import React from "react";
import { Card } from "../ui/atoms";
import {
  CORE_BLURB,
  CORE_LABEL,
  CORE_ORDER,
  SUBTYPES,
} from "../core/data/archetypes";

export default function Library() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <h2>Core Archetypes</h2>
        <p className="muted">8 cores • 32 subtype blends</p>
      </Card>

      {CORE_ORDER.map((c) => (
        <Card key={c}>
          <h3>{CORE_LABEL[c]}</h3>
          <p className="muted">{CORE_BLURB[c]}</p>

          <ul>
            {SUBTYPES.filter((s) => s.dominant === c).map((s) => (
              <li key={s.id}>
                <code>{s.id}</code> — {s.label}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
