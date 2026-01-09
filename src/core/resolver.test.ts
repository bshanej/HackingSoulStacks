import { describe, test, expect } from '@jest/globals';
import { resolveResult } from "./resolver";
import { CoreID, ModeID } from "./dataStore";

describe("SoulHacking Resolver", () => {
  const mockCoreScores: Record<CoreID, number> = {
    CATA: 10,
    ARCH: 8,
    EXPL: 6,
    GUAR: 5,
    SEER: 4,
    WEAV: 3,
    ALCH: 2,
    SOVE: 1,
  };

  const mockModeScores: Record<ModeID, number> = {
    BUI: 5,
    VIS: 10,
    REG: 3,
    TRN: 2,
  };

  test("correctly ranks cores and identifies primary/support", () => {
    const result = resolveResult(mockCoreScores, mockModeScores);
    expect(result.primary_core).toBe("CATA");
    expect(result.support_core).toBe("ARCH");
  });

  test("identifies dominant mode", () => {
    const result = resolveResult(mockCoreScores, mockModeScores);
    expect(result.dominant_mode).toBe("VIS");
  });

  test("constructs light and shadow stacks correctly", () => {
    const result = resolveResult(mockCoreScores, mockModeScores);
    // Ranks: 0:CATA, 1:ARCH, 2:EXPL, 3:GUAR, 4:SEER, 5:WEAV, 6:ALCH, 7:SOVE
    // Light: 1,2,5,6 (0,1,4,5 index) -> CATA, ARCH, SEER, WEAV
    expect(result.light_stack).toEqual(["CATA", "ARCH", "SEER", "WEAV"]);
    // Shadow: 3,4,7,8 (2,3,6,7 index) -> EXPL, GUAR, ALCH, SOVE
    expect(result.shadow_stack).toEqual(["EXPL", "GUAR", "ALCH", "SOVE"]);
  });

  test("calculates light vs shadow index", () => {
    const result = resolveResult(mockCoreScores, mockModeScores);
    const lightSum = 10 + 8 + 4 + 3; // 25
    const shadowSum = 6 + 5 + 2 + 1; // 14
    expect(result.charts.light_vs_shadow_index).toBe(11);
  });

  test("generates correct subtype_id", () => {
    const result = resolveResult(mockCoreScores, mockModeScores);
    expect(result.subtype_id).toBe("CATA-VIS");
  });
});
