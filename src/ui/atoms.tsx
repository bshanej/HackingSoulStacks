import React from "react";

export function Card({ children, className = "", style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) { 
  return <div className={`card ${className}`} style={style}>{children}</div>; 
}

export function Button({ variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"danger" }) {
  return <button {...props} className={`btn btn-${variant} ${className}`.trim()} />;
}

export function Kbd({ children }: { children: React.ReactNode }) { 
  return <span className="kbd" style={{ background: "var(--glass)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8em", border: "1px solid var(--border)" }}>{children}</span>; 
}

export function Progress({ value }: { value: number }) {
  return (
    <div style={{ background: "var(--glass)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
      <div style={{ background: "var(--accent)", height: "100%", width: `${value}%`, transition: "width 0.3s ease" }} />
    </div>
  );
}
