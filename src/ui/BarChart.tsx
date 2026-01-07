import React from "react";
import { CoreKey } from "../core/types";
import { CORE_ORDER } from "../core/data/archetypes";

export function BarChart({ values }:{ values:Record<CoreKey, number> }){
  const max = Math.max(...CORE_ORDER.map(k => values[k] ?? 0), 1);
  return (
    <div style={{display:"grid", gap:8}}>
      {CORE_ORDER.map(k=>{
        const v = values[k] ?? 0;
        const w = Math.round((v / max) * 100);
        return (
          <div key={k} style={{display:"grid", gridTemplateColumns:"140px 1fr 44px", alignItems:"center", gap:10}}>
            <div style={{fontFamily:"var(--mono)", color:"var(--muted)", fontSize:12}}>{k}</div>
            <div style={{height:10, borderRadius:999, border:"1px solid var(--line)", background:"rgba(0,0,0,.25)"}}>
              <div style={{
                height:"100%",
                width:`${w}%`,
                borderRadius:999,
                background:"linear-gradient(90deg, rgba(155,140,255,.9), rgba(57,208,255,.85))"
              }}/>
            </div>
            <div style={{fontFamily:"var(--mono)", fontSize:12, textAlign:"right"}}>{v.toFixed(1)}</div>
          </div>
        );
      })}
    </div>
  );
}
