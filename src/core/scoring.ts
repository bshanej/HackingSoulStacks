import { resolveResult, ResultProfile } from "./resolver";
import { saveSession } from "./storage";
import { CoreID, ModeID } from "./dataStore";
import { Answer, Session, Question } from "./types";

export function scoreSession(args: { 
  mode: Session["mode"], 
  questions: any[], // Now accepting generic question data from JSON
  answers: Answer[] 
}): Session {
  const { mode, questions, answers } = args;
  
  const core_scores: Record<CoreID, number> = {
    CATA: 0, ARCH: 0, EXPL: 0, GUAR: 0, SEER: 0, WEAV: 0, ALCH: 0, SOVE: 0
  };
  
  const mode_scores: Record<ModeID, number> = {
    BUI: 0, VIS: 0, REG: 0, TRN: 0
  };

  // 1. Process Answers
  answers.forEach(ans => {
    const q = questions.find(q => q.id === ans.qid);
    if (q && q.weights) {
      const multiplier = q.polarity === 1 ? (ans.value - 3) : (3 - ans.value);
      
      // Core weights
      if (q.weights.cores) {
        Object.entries(q.weights.cores).forEach(([core, weight]) => {
          core_scores[core as CoreID] += (weight as number) * multiplier;
        });
      }

      // Mode weights
      if (q.weights.modes) {
        Object.entries(q.weights.modes).forEach(([mode, weight]) => {
          mode_scores[mode as ModeID] += (weight as number) * multiplier;
        });
      }
    }
  });

  const profile = resolveResult(core_scores, mode_scores);

  const session: Session = {
    id: `sess_${Date.now()}`,
    createdAt: Date.now(),
    mode,
    answers,
    scores: core_scores,
    dominant: profile.primary_core,
    secondary: profile.support_core,
    subtypeId: profile.subtype_id,
    confidence: Math.abs(profile.charts.light_vs_shadow_index) / 10 // Adjusted scale
  };

  return session;
}
