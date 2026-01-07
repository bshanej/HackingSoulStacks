import { Core } from "./types";

export const CORE_ORDER: Core[] = [
  "SEER",
  "ARCH",
  "SOV",
  "GUARD",
  "CAT",
  "EXPL",
  "WEAV",
  "ALC",
];

export const CORE_LABEL: Record<Core, string> = {
  SEER: "The Seer",
  ARCH: "The Architect",
  SOV: "The Sovereign",
  GUARD: "The Guardian",
  CAT: "The Catalyst",
  EXPL: "The Explorer",
  WEAV: "The Weaver",
  ALC: "The Alchemist",
};

export const CORE_BLURB: Record<Core, string> = {
  SEER: "Pattern-reader. Intuition-forward. Sees the hidden wiring of reality.",
  ARCH: "System-builder. Strategy-forward. Designs the path before walking it.",
  SOV: "Authority-holder. Outcome-forward. Leads by presence and decision.",
  GUARD: "Protector. Boundary-forward. Keeps people and principles intact.",
  CAT: "Disruptor. Truth-forward. Forces stagnation to evolve or die.",
  EXPL: "Trailblazer. Freedom-forward. Lives for discovery and expansion.",
  WEAV: "Connector. Relationship-forward. Unites people, ideas, and meaning.",
  ALC: "Transformer. Growth-forward. Turns chaos into insight and power.",
};

/** 32 subtype IDs = dominant + secondary (no self-pairs) */
export const SUBTYPES = CORE_ORDER.flatMap((a) =>
  CORE_ORDER.filter((b) => b !== a).map((b) => ({
    id: `${a}-${b}`,
    dominant: a,
    secondary: b,
    label: `${CORE_LABEL[a]} / ${CORE_LABEL[b]}`,
  }))
);
