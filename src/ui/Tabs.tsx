import React from "react";
import { Button } from "./Button";

export function Tabs({ tabs, value, onChange }:{
  tabs: Array<{ id:string; label:string }>;
  value: string;
  onChange: (id:string)=>void;
}){
  return (
    <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
      {tabs.map(t=>(
        <Button key={t.id} variant={value===t.id ? "primary" : "ghost"} onClick={()=>onChange(t.id)}>
          {t.label}
        </Button>
      ))}
    </div>
  );
}
