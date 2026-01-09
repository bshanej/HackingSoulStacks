import { dataStore, CoreID, ModeID, SubtypeData } from "./dataStore";
import { CORE_LABEL } from "./data/archetypes";

export interface ResultProfile {
  primary_core: CoreID;
  support_core: CoreID;
  dominant_mode: ModeID;
  subtype_id: string;
  subtype_card: SubtypeData | undefined;
  light_stack: CoreID[];
  shadow_stack: CoreID[];
  charts: {
    core_scores: Record<CoreID, number>;
    mode_scores: Record<ModeID, number>;
    light_vs_shadow_index: number;
  };
}

export function resolveResult(
  core_scores: Record<CoreID, number>,
  mode_scores: Record<ModeID, number>
): ResultProfile {
  // 1. Core Rankings (Sort high to low)
  const core_rankings = (Object.keys(core_scores) as CoreID[]).sort(
    (a, b) => core_scores[b] - core_scores[a]
  );

  // 2. Dominant Mode (Highest score)
  const dominant_mode_id = (Object.keys(mode_scores) as ModeID[]).sort(
    (a, b) => mode_scores[b] - mode_scores[a]
  )[0];

  const primary_core = core_rankings[0];
  const support_core = core_rankings[1];

  // 3. Stack Rules (Ensure we have at least 8 cores to avoid index errors)
  const safe_rank = (idx: number) => core_rankings[idx] || core_rankings[0];

  // Light stack (white) = core ranks 1, 2, 5, 6
  const light_stack = [
    safe_rank(0),
    safe_rank(1),
    safe_rank(4),
    safe_rank(5),
  ];

  const shadow_stack = [
    safe_rank(2),
    safe_rank(3),
    safe_rank(6),
    safe_rank(7),
  ];

  // Logic: "The engine that turns test scores into identities"
  // If the user's top score is below a certain threshold, we might flag it as "Low Resolution"
  // but for now we follow the ranking rule.

  // 4. Subtype Mapping
  const subtype_id = `${primary_core}-${dominant_mode_id}`;
  const subtype_card = dataStore.getSubtypeById(subtype_id);

  // 5. Primary/Secondary Sub-Archetype Lookup
  // Lookup based on primary_core and support_core from the 56 Sub-Archetype rules
  const primary_label = CORE_LABEL[primary_core];
  const secondary_label = CORE_LABEL[support_core];
  const sub_archetype = dataStore.getSubArchetype(primary_label, secondary_label);

  // 6. Index Calculation
  const light_sum = light_stack.reduce((sum, core) => sum + core_scores[core], 0);
  const shadow_sum = shadow_stack.reduce((sum, core) => sum + core_scores[core], 0);
  const light_vs_shadow_index = light_sum - shadow_sum;

  return {
    primary_core,
    support_core,
    dominant_mode: dominant_mode_id,
    subtype_id,
    subtype_card,
    light_stack,
    shadow_stack,
    charts: {
      core_scores,
      mode_scores,
      light_vs_shadow_index,
    },
  };
}
