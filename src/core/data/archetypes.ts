import { Core } from "../types";

export const CORE_ORDER: Core[] = [
  "Seer",
  "Weaver",
  "Alchemist",
  "Guardian",
  "Sovereign",
  "Warrior",
  "Architect",
  "Nomad"
];

export const CORE_LABEL: Record<Core, string> = {
  Seer: "The Seer",
  Weaver: "The Weaver",
  Alchemist: "The Alchemist",
  Guardian: "The Guardian",
  Sovereign: "The Sovereign",
  Warrior: "The Warrior",
  Architect: "The Architect",
  Nomad: "The Nomad"
};

export const CORE_BLURB: Record<Core, string> = {
  Seer: "Placeholer blurb for Seer.",
  Weaver: "Placeholer blurb for Weaver.",
  Alchemist: "Placeholer blurb for Alchemist.",
  Guardian: "Placeholer blurb for Guardian.",
  Sovereign: "Placeholer blurb for Sovereign.",
  Warrior: "Placeholer blurb for Warrior.",
  Architect: "Placeholer blurb for Architect.",
  Nomad: "Placeholer blurb for Nomad."
};

export const SUBTYPES = CORE_ORDER.flatMap((a) =>
  CORE_ORDER.filter((b) => b !== a).map((b) => ({
    id: `${a}-${b}`,
    dominant: a,
    secondary: b,
    label: `${CORE_LABEL[a]} / ${CORE_LABEL[b]}`,
  }))
);
