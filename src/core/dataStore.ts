import datapack from "./data/datapack.json";

export type CoreID = "CATA" | "ARCH" | "EXPL" | "GUAR" | "SEER" | "WEAV" | "ALCH" | "SOVE";
export type ModeID = "BUI" | "VIS" | "REG" | "TRN";

export interface CoreData {
  core_id: CoreID;
  name: string;
  domain: string;
  opposite: string;
  order: number;
}

export interface ModeData {
  mode_id: ModeID;
  name: string;
  tagline: string;
  definition: string;
}

export interface SubtypeData {
  subtype_id: string;
  index: number;
  core_id: CoreID;
  core_name: string;
  mode_id: ModeID;
  mode_name: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  cards: {
    mode_light: string[];
    mode_shadow: string[];
    integration_keys: string[];
    relationships: {
      best_with: string[];
      watch_out_for: string[];
    };
  };
}

export const dataStore = {
  getCores: (): CoreData[] => datapack.cores as CoreData[],
  getModes: (): ModeData[] => datapack.modes as ModeData[],
  getSubtypes: (): SubtypeData[] => datapack.subtypes as any as SubtypeData[],
  
  getSubtypeById: (id: string): SubtypeData | undefined => 
    (datapack.subtypes as any as SubtypeData[]).find(s => s.subtype_id === id),
    
  getSubtypesByCore: (coreId: CoreID): SubtypeData[] => 
    (datapack.subtypes as any as SubtypeData[]).filter(s => s.core_id === coreId),
    
  getSubtypesByMode: (modeId: ModeID): SubtypeData[] => 
    (datapack.subtypes as any as SubtypeData[]).filter(s => s.mode_id === modeId)
};
