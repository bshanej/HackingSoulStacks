#!/usr/bin/env bash
set -e

echo "Rebuilding missing files..."

mkdir -p src/ui src/UI src/core/data

# atoms
cat > src/ui/atoms.tsx <<'EOT'
import React from "react";
export function Card({ children }: { children: React.ReactNode }) { return <div className="card">{children}</div>; }
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"danger" }) {
  const v = props.variant ?? "primary";
  return <button {...props} className={`btn ${v} ${props.className ?? ""}`.trim()} />;
}
export function Kbd({ children }: { children: React.ReactNode }) { return <span className="kbd">{children}</span>; }
EOT
cp -f src/ui/atoms.tsx src/UI/atoms.tsx

# core types
cat > src/core/types.ts <<'EOT'
export type Core = "SEER"|"ARCH"|"SOV"|"GUARD"|"CAT"|"EXPL"|"WEAV"|"ALC";
export type Likert = 1|2|3|4|5;
export type Mode = "FULL" | "QUICK";
export type Layer = "L1"|"L2"|"L3";
export type SessionMeta = { displayName?: string; notes?: string };
export type Question = { id: string; layer: Layer; core: Core; prompt: string; polarity: 1|-1 };
EOT

# questions
cat > src/core/data/questions.ts <<'EOT'
import { Question } from "../types";
const q = (id: string, layer: "L1"|"L2"|"L3", core: any, prompt: string, polarity: 1|-1 = 1): Question => ({ id, layer, core, prompt, polarity });

const L1: Question[] = [
  q("L1-01","L1","SEER","I notice patterns and timing before most people do."),
  q("L1-02","L1","ARCH","I naturally organize chaos into a workable plan."),
  q("L1-03","L1","SOV","When something needs direction, I step up."),
  q("L1-04","L1","GUARD","I feel responsible for stability and safety."),
  q("L1-05","L1","CAT","I prefer action over waiting."),
  q("L1-06","L1","EXPL","Freedom matters more to me than predictability."),
  q("L1-07","L1","WEAV","I can read people and connect them easily."),
  q("L1-08","L1","ALC","I turn hard experiences into growth or mastery."),
  q("L1-09","L1","SEER","My gut sense is usually right, even without proof."),
  q("L1-10","L1","ARCH","I like systems that are elegant and efficient."),
  q("L1-11","L1","SOV","I set standards and expect people to meet them."),
  q("L1-12","L1","GUARD","I’d rather be reliable than flashy."),
  q("L1-13","L1","CAT","I’m at my best when I’m pushing forward."),
  q("L1-14","L1","EXPL","I learn by trying things in the real world."),
  q("L1-15","L1","WEAV","I often play the role of mediator or connector."),
  q("L1-16","L1","ALC","I go deep—surface-level doesn’t satisfy me.")
];

const L2: Question[] = [
  q("L2-01","L2","ARCH","Under stress, I look for structure and rules."),
  q("L2-02","L2","CAT","Under stress, I push harder and move faster."),
  q("L2-03","L2","GUARD","Under stress, I become more protective."),
  q("L2-04","L2","SEER","Under stress, I scan for hidden motives."),
  q("L2-05","L2","SOV","Under stress, I take command and set boundaries."),
  q("L2-06","L2","EXPL","Under stress, I seek space or a new angle."),
  q("L2-07","L2","WEAV","Under stress, I check on people and relationships."),
  q("L2-08","L2","ALC","Under stress, I go inward and process deeply.")
];

const L3: Question[] = [
  q("L3-01","L3","SEER","I can get stuck overthinking hidden meanings.", -1),
  q("L3-02","L3","ARCH","I can become controlling about how things should be.", -1),
  q("L3-03","L3","SOV","I can become harsh when people don’t perform.", -1),
  q("L3-04","L3","GUARD","I can carry responsibilities that aren’t mine.", -1),
  q("L3-05","L3","CAT","I can chase intensity even when it’s not wise.", -1),
  q("L3-06","L3","EXPL","I can avoid commitment when things get real.", -1),
  q("L3-07","L3","WEAV","I can lose myself trying to keep everyone okay.", -1),
  q("L3-08","L3","ALC","I can isolate when I’m overwhelmed.", -1)
];

export const QUICK_SCAN: Question[] = [...L1.slice(0, 12)];
export const FULL_L1 = L1;
export const FULL_L2 = L2;
export const FULL_L3 = L3;
EOT

echo "✅ Rebuild complete."
