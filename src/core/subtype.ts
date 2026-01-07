import { Core } from "./types";
import { CORE_LABEL } from "./data/archetypes";

export function subtypeFromCores(dominant: Core, secondary: Core) {
  return {
    id: `${dominant}-${secondary}`,
    name: `${CORE_LABEL[dominant]} / ${CORE_LABEL[secondary]}`,
    description: `Placeholder description for ${dominant}-${secondary} subtype.`
  };
}
