import type { Core } from "./data/types";
import { CORE_LABEL } from "./data/archetypes";

export type SubtypeResult = {
  dominant: Core;
  secondary: Core;
  id: string;
  label: string;
};

function flavor(core: Core) {
  switch (core) {
    case "SEER": return "Oracle";
    case "ARCH": return "Builder";
    case "SOV": return "Commander";
    case "GUARD": return "Sentinel";
    case "CAT": return "Igniter";
    case "EXPL": return "Voyager";
    case "WEAV": return "Connector";
    case "ALC": return "Transmuter";
    default: return "Unknown";
  }
}

export function subtypeFromCores(dominant: Core, secondary: Core) {
  const id = `${dominant}-${secondary}`;
  return {
    id,
    name: `${CORE_LABEL[dominant]} • ${flavor(secondary)}`,
    tagline: "The synthesis of power and vision.",
    description: "A unique combination of traits that defines your approach.",
    strengths: ["Strategic vision", "Reliable execution"],
    weaknesses: ["Over-analysis", "Rigidity"],
    relationships: ["Works well with Architects", "Complements Sovereigns"],
    careers: ["Systems Engineer", "Product Lead"]
  };
}

export function deriveSubtype(scores: Record<Core, number>): SubtypeResult {
  const sorted = (Object.keys(scores) as Core[])
    .map(k => ({ k, v: scores[k] }))
    .sort((a,b) => b.v - a.v);

  const dominant = sorted[0]?.k ?? "SEER";
  const secondary = sorted[1]?.k ?? "ARCH";

  return {
    dominant,
    secondary,
    id: `${dominant}-${secondary}`,
    label: `${CORE_LABEL[dominant]} • ${flavor(secondary)}`
  };
}
