import { resolveResult, ResultProfile } from "./resolver";
import { saveSession } from "./storage";
import { CoreID, ModeID } from "./dataStore";
import { Answer, Likert, Session, Question } from "./types";

export function scoreSession(args: { 
  mode: Session["mode"], 
  questions: Question[], 
  answers: Answer[] 
}): Session {
  const { mode, questions, answers } = args;
  
  const core_scores: Record<CoreID, number> = {
    CATA: 0, ARCH: 0, EXPL: 0, GUAR: 0, SEER: 0, WEAV: 0, ALCH: 0, SOVE: 0
  };
  
  const mode_scores: Record<ModeID, number> = {
    BUI: 0, VIS: 0, REG: 0, TRN: 0
  };

  // 1. Calculate Core Scores
  answers.forEach(ans => {
    const q = questions.find(q => q.id === ans.qid);
    if (q) {
      const weight = q.layer === 1 ? 1 : q.layer === 2 ? 1.5 : 2;
      const val = q.polarity === 1 ? ans.value : (6 - ans.value);
      core_scores[q.core as CoreID] += (val - 3) * weight;
    }
  });

  // 2. Derive Mode Scores (Mapping cores to modes)
  mode_scores.BUI = (core_scores.ARCH + core_scores.SOVE) / 2;
  mode_scores.VIS = (core_scores.SEER + core_scores.EXPL) / 2;
  mode_scores.REG = (core_scores.GUAR + core_scores.WEAV) / 2;
  mode_scores.TRN = (core_scores.ALCH + core_scores.CATA) / 2;

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
    confidence: Math.abs(profile.charts.light_vs_shadow_index) / 100
  };

  return session;
}
