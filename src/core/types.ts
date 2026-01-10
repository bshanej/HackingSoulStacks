import { CoreID } from "./dataStore";

export type Core = CoreID;

export type Likert = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  core: Core;
  layer: 1 | 2 | 3;
  polarity: 1 | -1;
  prompt: string;
}

export type ScoreMap = Record<Core, number>;

export interface Answer {
  qid: string;
  value: Likert;
}

export interface Session {
  id: string;
  createdAt: number;
  mode: "FULL" | "QUICK";
  answers: Answer[];
  scores: ScoreMap;
  mode_scores?: Record<string, number>;
  dominant: Core;
  secondary: Core;
  subtypeId: string;
  confidence: number;
}
