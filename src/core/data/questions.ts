import { Question } from "../types";

function q(
  id: string,
  layer: "L1" | "L2" | "L3",
  core: Question["core"],
  prompt: string,
  polarity: 1 | -1 = 1
): Question {
  return { id, layer, core, prompt, polarity };
}

/* FULL (placeholder set — stable and working) */
export const FULL_L1: Question[] = [
  q("L1_SEER_1", "L1", "SEER", "I seek patterns behind reality."),
  q("L1_ARCH_1", "L1", "ARCH", "I design systems in my mind."),
  q("L1_SOV_1", "L1", "SOV", "I naturally take command."),
  q("L1_GUARD_1", "L1", "GUARD", "I protect people and values."),
  q("L1_CAT_1", "L1", "CAT", "I provoke necessary change."),
  q("L1_EXPL_1", "L1", "EXPL", "I crave new experiences."),
  q("L1_WEAV_1", "L1", "WEAV", "I connect people and ideas."),
  q("L1_ALC_1", "L1", "ALC", "I transform chaos into meaning."),
];

export const FULL_L2: Question[] = [
  q("L2_SEER_1", "L2", "SEER", "Insight matters more than certainty."),
  q("L2_ARCH_1", "L2", "ARCH", "Structure brings freedom."),
  q("L2_SOV_1", "L2", "SOV", "Authority should be embodied."),
  q("L2_GUARD_1", "L2", "GUARD", "Boundaries preserve integrity."),
  q("L2_CAT_1", "L2", "CAT", "Disruption is sometimes mercy."),
  q("L2_EXPL_1", "L2", "EXPL", "Stagnation feels like death."),
  q("L2_WEAV_1", "L2", "WEAV", "Everything is relational."),
  q("L2_ALC_1", "L2", "ALC", "Suffering refines the soul."),
];

export const FULL_L3: Question[] = [
  q("L3_SEER_1", "L3", "SEER", "I trust intuition over logic."),
  q("L3_ARCH_1", "L3", "ARCH", "I optimize everything."),
  q("L3_SOV_1", "L3", "SOV", "I feel responsible for outcomes."),
  q("L3_GUARD_1", "L3", "GUARD", "Loyalty is non-negotiable."),
  q("L3_CAT_1", "L3", "CAT", "Pressure reveals truth."),
  q("L3_EXPL_1", "L3", "EXPL", "Risk makes me alive."),
  q("L3_WEAV_1", "L3", "WEAV", "I see invisible connections."),
  q("L3_ALC_1", "L3", "ALC", "Transformation is my nature."),
];

/* QUICK SCAN */
export const QUICK_SCAN: Question[] = [
  q("QS_SEER", "L1", "SEER", "I read between the lines."),
  q("QS_ARCH", "L1", "ARCH", "I think in systems."),
  q("QS_SOV", "L1", "SOV", "People follow my lead."),
  q("QS_GUARD", "L1", "GUARD", "I defend what matters."),
  q("QS_CAT", "L1", "CAT", "I ignite change."),
  q("QS_EXPL", "L1", "EXPL", "I chase the unknown."),
  q("QS_WEAV", "L1", "WEAV", "I unify perspectives."),
  q("QS_ALC", "L1", "ALC", "I transmute experience into wisdom."),
];
