import React from "react";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"danger" }
){
  const v = props.variant ?? "primary";
  const style: React.CSSProperties = {
    padding:"10px 14px",
    borderRadius:14,
    border: v==="ghost" ? "1px solid var(--line)" : "1px solid rgba(155,140,255,.35)",
    background: v==="ghost" ? "rgba(18,19,36,.6)"
      : v==="danger" ? "rgba(255,77,109,.12)"
      : "rgba(155,140,255,.14)",
    color: v==="danger" ? "var(--danger)" : "var(--text)",
    cursor:"pointer",
    fontSize:13,
    fontFamily:"var(--mono)",
    letterSpacing:".02em",
    transition:".15s ease",
    opacity: props.disabled ? .55 : 1
  };
  return <button {...props} style={style} />;
}
