export type Core = "SEER" | "ARCH" | "SOV" | "GUARD" | "CAT" | "EXPL" | "WEAV" | "ALC";
export type Likert = 1 | 2 | 3 | 4 | 5;
export type Mode = "FULL" | "QUICK";
export type Layer = "L1" | "L2" | "L3";

export type SessionMeta = { displayName?: string; notes?: string };

export type Question = {
  id: string;
  layer: Layer | 1 | 2 | 3;
  core: Core;
  prompt: string;
  polarity: 1 | -1;
};

export type Answer = { qid: string; value: Likert };

export type ScoreMap = Record<Core, number>;

export type Session = {
  id: string;
  createdAt: number;
  mode: Mode;
  meta?: SessionMeta;
  answers: Answer[] | Record<string, Likert>;
  scores: ScoreMap;
  dominant: Core;
  secondary: Core;
  subtypeId: string; // `${dominant}-${secondary}`
  result?: any;
};
