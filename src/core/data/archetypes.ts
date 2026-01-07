import { Core } from "../types";

export const CORE_ORDER: Core[] = [
  "CATA", "ARCH", "EXPL", "GUAR", "SEER", "WEAV", "ALCH", "SOVE"
];

export const CORE_LABEL: Record<Core, string> = {
  CATA: "Catalyst",
  ARCH: "Architect",
  EXPL: "Explorer",
  GUAR: "Guardian",
  SEER: "Seer",
  WEAV: "Weaver",
  ALCH: "Alchemist",
  SOVE: "Sovereign"
};

export const CORE_BLURB: Record<Core, string> = {
  CATA: "Change • Disruption • Momentum",
  ARCH: "Structure • Systems • Design",
  EXPL: "Expansion • Discovery • Experimentation",
  GUAR: "Protection • Continuity • Boundaries",
  SEER: "Perception • Insight • Foresight",
  WEAV: "Connection • Coherence • Relationship",
  ALCH: "Transformation • Healing • Meaning",
  SOVE: "Authority • Direction • Leadership"
};

export const CORE_OPPOSITE: Record<Core, Core> = {
  CATA: "ARCH",
  ARCH: "CATA",
  EXPL: "WEAV",
  WEAV: "EXPL",
  GUAR: "SEER",
  SEER: "GUAR",
  ALCH: "SOVE",
  SOVE: "ALCH"
};

// Simplified SUBTYPES for the Library - we will use the ID to lookup in the DataPack
export const SUBTYPES = [
  { id: "ARCH-BUI", dominant: "ARCH", label: "System Builder" },
  { id: "ARCH-VIS", dominant: "ARCH", label: "Visionary Planner" },
  { id: "ARCH-REG", dominant: "ARCH", label: "Structural Regulator" },
  { id: "ARCH-TRN", dominant: "ARCH", label: "Adaptive Designer" },
  { id: "CATA-BUI", dominant: "CATA", label: "Disruptive Igniter" },
  { id: "CATA-VIS", dominant: "CATA", label: "Chaos Prophet" },
  { id: "CATA-REG", dominant: "CATA", label: "Boundary Breaker" },
  { id: "CATA-TRN", dominant: "CATA", label: "Transmutation Spark" },
  { id: "SEER-BUI", dominant: "SEER", label: "Pattern Oracle" },
  { id: "SEER-VIS", dominant: "SEER", label: "Strategic Forecaster" },
  { id: "SEER-REG", dominant: "SEER", label: "Threshold Watcher" },
  { id: "SEER-TRN", dominant: "SEER", label: "Vision Alchemist" }
  // ... rest of the 32 would be added here or dynamically loaded
];
