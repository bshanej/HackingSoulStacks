import { Core } from "./types";
import datapack from "../../attached_assets/SoulHacking_App_DataPack_32_YinYang_COREORDER_1767814099470.json";

export function subtypeFromCores(dominant: Core, secondary: Core) {
  // Map secondary core to mode if needed, or lookup by dominant-mode pattern
  // For now, we'll try to find a matching subtype_id in the datapack
  const subtypeId = `${dominant}-${secondary}`;
  const data = datapack.subtypes.find(s => s.subtype_id === subtypeId) || 
               datapack.subtypes.find(s => s.core_id === dominant); // Fallback

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
    career: "Strategic Leadership & Systems Design", // Derived
    famous: "Notable Historical Figures",
    fictional: "Archetypal Characters"
  };
}
