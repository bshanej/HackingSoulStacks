import React from "react";
export function Card({ children }: { children: React.ReactNode }) { return <div className="card">{children}</div>; }
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"danger" }) {
  const v = props.variant ?? "primary";
  return <button {...props} className={`btn ${v} ${props.className ?? ""}`.trim()} />;
}
export function Kbd({ children }: { children: React.ReactNode }) { return <span className="kbd">{children}</span>; }
