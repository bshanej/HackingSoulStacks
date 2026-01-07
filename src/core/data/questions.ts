import { Question, Core } from "../types";

const createQuestions = (prefix: string, count: number, layer: 1 | 2 | 3): Question[] => {
  const cores: Core[] = ["CATA", "ARCH", "EXPL", "GUAR", "SEER", "WEAV", "ALCH", "SOVE"];
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    core: cores[i % cores.length],
    layer,
    polarity: i % 2 === 0 ? 1 : -1,
    prompt: `[${prefix}] Behavioral diagnostic indicator for the ${cores[i % cores.length]} core archetype (Question ${i + 1}).`
  }));
};

export const FULL_L1: Question[] = createQuestions("L1", 40, 1);
export const FULL_L2: Question[] = createQuestions("L2", 16, 2);
export const FULL_L3: Question[] = createQuestions("L3", 16, 3);
export const QUICK_SCAN: Question[] = createQuestions("QS", 12, 1);
