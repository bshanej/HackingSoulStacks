import { Core, Question, ScoreMap, Session, Answer } from "./types";
import { CORE_ORDER } from "./data/archetypes";

function emptyScores(): ScoreMap {
  return CORE_ORDER.reduce((acc, c) => {
    acc[c] = 0;
    return acc;
  }, {} as ScoreMap);
}

export function scoreSession(args: {
  mode: Session["mode"];
  questions: Question[];
  answers: Answer[];
}): Session {
  const { mode, questions, answers } = args;
  const scores = emptyScores();

  const questionsById = new Map(questions.map(q => [q.id, q]));

  answers.forEach(a => {
    const q = questionsById.get(a.qid);
    if (q) {
      const val = q.polarity === 1 ? a.value : (6 - a.value);
      scores[q.core] += val;
    }
  });

  const sorted = [...CORE_ORDER].sort((a, b) => {
    const scoreDiff = scores[b] - scores[a];
    if (scoreDiff !== 0) return scoreDiff;
    return CORE_ORDER.indexOf(a) - CORE_ORDER.indexOf(b);
  });

  const dominant = sorted[0];
  const secondary = sorted[1];
  
  const topScore = scores[dominant];
  const secondScore = scores[secondary];
  const confidence = (topScore - secondScore) / Math.max(1, topScore);

  return {
    id: `sess_${Date.now()}`,
    createdAt: Date.now(),
    mode,
    answers,
    scores,
    dominant,
    secondary,
    subtypeId: `${dominant}-${secondary}`,
    confidence
  };
}
