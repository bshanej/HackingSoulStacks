import { dataStore, CoreID } from "./dataStore";

export async function fetchCoreArchetypes() {
  const res = await fetch("/api/core");
  return await res.json();
}

export async function fetchSubtypes() {
  const res = await fetch("/api/archetypes");
  return await res.json();
}

export function subtypeFromCores(dominant: CoreID, secondary: CoreID) {
  // Logic remains for mapping dominant/secondary to a mode-based ID
  const modeMap: Record<string, string> = {
    "CATA": "TRN",
    "ARCH": "BUI",
    "SEER": "VIS",
    "GUAR": "REG",
    "EXPL": "VIS",
    "WEAV": "REG",
    "ALCH": "TRN",
    "SOVE": "BUI"
  };

  const modeId = modeMap[secondary] || "BUI";
  const subtypeId = `${dominant}_${modeId}`;
  
  // Note: For now, we return the ID for the frontend to fetch from the API
  return {
    id: subtypeId,
    name: `${dominant} ${modeId}`,
    description: "Loading detailed resonance profile..."
  };
}
