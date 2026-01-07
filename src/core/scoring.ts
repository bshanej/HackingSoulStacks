import { Core, Question, ScoreMap, Session } from "./data/types";
import { CORE_ORDER } from "./data/archetypes";

type Answer = { qid: string; value: number };

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
  meta?: Session["meta"];
}): Session {
  const { mode, questions, answers, meta } = args;

  const byId = new Map<string, Question>();
  for (const qu of questions) byId.set(qu.id, qu);

  const scores = emptyScores();

  for (const a of answers) {
    const qu = byId.get(a.qid);
    if (!qu) continue;
    const v = qu.polarity === 1 ? a.value : (6 - a.value) as any;
    scores[qu.core] += Number(v);
  }

  // dominant + secondary
  const sorted = [...CORE_ORDER].sort((x, y) => scores[y] - scores[x]);
  const dominant = sorted[0];
  const secondary = sorted[1];

  const id = `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  return {
    id,
    createdAt: Date.now(),
    mode,
    meta,
    answers,
    scores,
    dominant,
    secondary,
    subtypeId: `${dominant}-${secondary}`,
  };
}
