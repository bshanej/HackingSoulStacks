import React from "react";

export function Card({ title, right, children }:{
  title?: string; right?: React.ReactNode; children: React.ReactNode;
}){
  return (
    <div style={{
      border:"1px solid var(--line)",
      background:"linear-gradient(180deg, rgba(18,19,36,.72), rgba(14,15,21,.72))",
      borderRadius:"var(--radius)",
      boxShadow:"var(--shadow)",
      padding:14
    }}>
      {(title || right) && (
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, marginBottom:10}}>
          <div style={{fontFamily:"var(--mono)", letterSpacing:".06em", fontSize:13, color:"var(--muted)"}}>
            {title}
          </div>
          <div>{right}</div>
        </div>
      )}
      {children}
    </div>
  );
}
