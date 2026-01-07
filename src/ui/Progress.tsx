import React from "react";

export function Progress({ value }:{ value:number }){
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{height:10, borderRadius:999, border:"1px solid var(--line)", background:"rgba(0,0,0,.25)"}}>
      <div style={{
        height:"100%",
        width:`${v}%`,
        borderRadius:999,
        background:"linear-gradient(90deg, rgba(155,140,255,.9), rgba(57,208,255,.85))"
      }}/>
    </div>
  );
}
