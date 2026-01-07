import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) { 
  return <div className={`card ${className}`}>{children}</div>; 
}

export function Button({ variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"danger" }) {
  return <button {...props} className={`btn btn-${variant} ${className}`.trim()} />;
}

export function Kbd({ children }: { children: React.ReactNode }) { 
  return <span className="kbd">{children}</span>; 
}

export function Progress({ value }: { value: number }) {
  return (
    <div style={{ background: "var(--glass)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
      <div style={{ background: "var(--accent)", height: "100%", width: `${value}%` }} />
    </div>
  );
}
