// src/pages/Test.tsx
import React, { useMemo, useState } from "react";
import { Card, Button, Kbd } from "../ui/atoms";

import type { Likert, Question } from "../core/data/types";
import { FULL_L1, FULL_L2, FULL_L3, QUICK_SCAN } from "../core/data/questions";
import { scoreSession } from "../core/scoring";
import { saveLatestSession, addToArchive } from "../core/storage/storage";

type Mode = "FULL" | "QUICK";

type Answers = Record<string, Likert>;

function nowId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function likertLabel(n: Likert) {
  switch (n) {
    case 1:
      return "Strongly Disagree";
    case 2:
      return "Disagree";
    case 3:
      return "Neutral";
    case 4:
      return "Agree";
    case 5:
      return "Strongly Agree";
  }
}

function getBank(mode: Mode) {
  if (mode === "QUICK") return QUICK_SCAN;
  return [...FULL_L1, ...FULL_L2, ...FULL_L3];
}

function getSections(mode: Mode) {
  if (mode === "QUICK") return [{ key: "Q", title: "Quick Scan", items: QUICK_SCAN }];

  return [
    { key: "L1", title: "Layer 1", items: FULL_L1 },
    { key: "L2", title: "Layer 2", items: FULL_L2 },
    { key: "L3", title: "Layer 3", items: FULL_L3 },
  ];
}

export default function TestPage() {
  const [mode, setMode] = useState<Mode>("FULL");
  const sections = useMemo(() => getSections(mode), [mode]);

  // Flattened question order for “next/prev”
  const all = useMemo(() => getBank(mode), [mode]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const q = all[idx];

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const totalCount = all.length;

  const currentValue: Likert | undefined = q ? answers[q.id] : undefined;

  function setAnswer(question: Question, value: Likert) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goPrev() {
    setIdx((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setIdx((i) => Math.min(all.length - 1, i + 1));
  }

  function restart(newMode: Mode) {
    setMode(newMode);
    setIdx(0);
    setAnswers({});
  }

  function finish() {
    const session = {
      id: nowId(),
      createdAt: Date.now(),
      mode,
      answers,
    };

    let result: any = null;
    try {
      result = scoreSession({ mode, answers });
    } catch (e) {
      // If scoring isn't ready yet, still save raw session so app flows.
      result = { error: "Scoring failed", detail: String(e) };
    }

    const payload = { ...session, result };

    saveLatestSession(payload);
    // Optional: auto-add to archive on finish
    addToArchive(payload);

    location.hash = "#results";
  }

  if (!q) {
    return (
      <Card>
        <h2>Assessment</h2>
        <p className="muted">No questions found. Check your questions export.</p>
      </Card>
    );
  }

  // Find which section we’re in (for display)
  const sectionInfo = useMemo(() => {
    const s = sections.find((sec) => sec.items.some((x) => x.id === q.id));
    return s ?? sections[0];
  }, [sections, q.id]);

  const progressPct = Math.round((answeredCount / totalCount) * 100);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Assessment</h2>
            <div className="muted" style={{ marginTop: 4 }}>
              Mode: <Kbd>{mode}</Kbd> • {sectionInfo.title} • {answeredCount}/{totalCount} answered • {progressPct}%
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button variant={mode === "FULL" ? "primary" : "ghost"} onClick={() => restart("FULL")}>
              Full
            </Button>
            <Button variant={mode === "QUICK" ? "primary" : "ghost"} onClick={() => restart("QUICK")}>
              Quick
            </Button>
            <Button variant="ghost" onClick={() => location.hash = "#library"}>
              Library
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="muted" style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span>
            Q <Kbd>{idx + 1}</Kbd> / <Kbd>{totalCount}</Kbd>
          </span>
          <span>
            Core: <Kbd>{q.core}</Kbd> • Layer: <Kbd>{q.layer}</Kbd>
          </span>
        </div>

        <h3 style={{ marginTop: 10 }}>{q.prompt}</h3>

        <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const v = n as Likert;
            const active = currentValue === v;
            return (
              <Button
                key={n}
                variant={active ? "primary" : "ghost"}
                onClick={() => setAnswer(q, v)}
                style={{ justifyContent: "flex-start" }}
              >
                <span style={{ width: 26, display: "inline-block" }}>
                  <Kbd>{n}</Kbd>
                </span>
                {likertLabel(v)}
              </Button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" onClick={goPrev} disabled={idx === 0}>
              ← Prev
            </Button>
            <Button variant="ghost" onClick={goNext} disabled={idx === totalCount - 1}>
              Next →
            </Button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="danger" onClick={() => restart(mode)}>
              Reset
            </Button>
            <Button onClick={finish} disabled={answeredCount < totalCount}>
              Finish
            </Button>
          </div>
        </div>

        {answeredCount < totalCount && (
          <p className="muted" style={{ marginTop: 10 }}>
            Answer every question to enable <Kbd>Finish</Kbd>.
          </p>
        )}
      </Card>
    </div>
  );
}

// named export too (in case App.tsx imports { Test })
export const Test = TestPage;
