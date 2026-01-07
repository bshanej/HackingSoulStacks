import React from "react";

export function Card({ children, className = "", style, onClick }: { children: React.ReactNode, className?: string, style?: React.CSSProperties, onClick?: (e: React.MouseEvent) => void }) { 
  return <div className={`card ${className}`} style={style} onClick={onClick}>{children}</div>; 
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
      <div style={{ background: "var(--accent)", height: "100%", width: `${value}%`, transition: "width 0.3s ease", boxShadow: "0 0 10px var(--accent-glow)" }} />
    </div>
  );
}

export function Tabs({ tabs, activeTab, onTabChange }: { tabs: { id: string, label: string }[], activeTab: string, onTabChange: (id: string) => void }) {
  return (
    <div className="nav-pills" style={{ marginBottom: "1.5rem" }}>
      {tabs.map(tab => (
        <button 
          key={tab.id} 
          className={`pill ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function BarChart({ data, max }: { data: { label: string, value: number, active?: boolean }[], max: number }) {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      {data.map((item, i) => {
        const pct = Math.max(5, (item.value / (max || 1)) * 100);
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 40px", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "0.85rem", opacity: item.active ? 1 : 0.7, fontWeight: item.active ? 700 : 400 }}>{item.label}</div>
            <div style={{ background: "var(--glass)", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ 
                background: item.active ? "var(--accent)" : "var(--border)", 
                height: "100%", 
                width: `${pct}%`,
                transition: "width 0.5s ease-out",
                boxShadow: item.active ? "0 0 10px var(--accent-glow)" : "none"
              }} />
            </div>
            <div style={{ textAlign: "right", fontSize: "0.85rem", opacity: 0.7 }}>{item.value}</div>
          </div>
        );
      })}
    </div>
  );
}
