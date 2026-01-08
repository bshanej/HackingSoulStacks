import { dataStore, CoreID, ModeID, SubtypeData } from "./dataStore";

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

  // 3. Stack Rules
  // Light stack (white) = core ranks 1, 2, 5, 6
  // Shadow stack (black) = core ranks 3, 4, 7, 8
  const light_stack = [
    core_rankings[0],
    core_rankings[1],
    core_rankings[4],
    core_rankings[5],
  ];

  const shadow_stack = [
    core_rankings[2],
    core_rankings[3],
    core_rankings[6],
    core_rankings[7],
  ];

  // 4. Subtype Mapping
  const subtype_id = `${primary_core}-${dominant_mode_id}`;
  const subtype_card = dataStore.getSubtypeById(subtype_id);

  // 5. Index Calculation
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
