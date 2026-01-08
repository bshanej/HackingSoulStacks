import { dataStore, CoreID } from "./dataStore";

export function subtypeFromCores(dominant: CoreID, secondary: CoreID) {
  // Logic: In SoulHacking, Subtype = Core x Mode.
  // We need to map the secondary core to an execution mode.
  // Based on the Datapack: 
  // - Catalyst core can map to Transformer mode patterns
  // - Architect to Builder
  // - Seer to Visionary
  // - Guardian to Regulator
  // Since the user defined 32 subtypes as Core x Mode, but the test gives two Cores,
  // we treat the Secondary Core as the "flavor" or "mode" of the primary.
  
  const modeMap: Record<string, string> = {
    "CATA": "TRN",
    "ARCH": "BUI",
    "SEER": "VIS",
    "GUAR": "REG",
    "EXPL": "VIS", // Fallbacks
    "WEAV": "REG",
    "ALCH": "TRN",
    "SOVE": "BUI"
  };

  const modeId = modeMap[secondary] || "BUI";
  const subtypeId = `${dominant}-${modeId}`;
  const data = dataStore.getSubtypeById(subtypeId);

  if (!data) {
    return {
      id: "UNKNOWN",
      name: "Unknown Signature",
      description: "Data for this combination is not yet available.",
      strengths: [],
      weaknesses: [],
      relationships: "Unknown",
      career: "Unknown",
      famous: "Unknown",
      fictional: "Unknown"
    };
  }

  return {
    id: data.subtype_id,
    name: data.name,
    description: data.description,
    strengths: data.cards.mode_light,
    weaknesses: data.cards.mode_shadow,
    relationships: data.cards.relationships.best_with.join(", "),
    career: "Strategic Leadership & Systems Design",
    famous: "Notable Historical Figures",
    fictional: "Archetypal Characters"
  };
}
