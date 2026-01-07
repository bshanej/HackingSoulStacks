import React, { useMemo, useState } from "react";
import { Card, Button, Kbd } from "../ui/atoms";
import { FULL_L1, FULL_L2, FULL_L3, QUICK_SCAN } from "../core/data/questions";
import { scoreSession } from "../core/scoring";
import { saveSession } from "../core/storage";
import { Likert, Question, Answer } from "../core/types";

type Mode = "FULL" | "QUICK";

export default function Test({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<Mode>("FULL");
  const questions = useMemo(() => {
    if (mode === "QUICK") return QUICK_SCAN;
    return [...FULL_L1, ...FULL_L2, ...FULL_L3];
  }, [mode]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  
  const q = questions[idx];
  const currentAnswer = answers.find(a => a.qid === q?.id);

  const setAnswer = (val: Likert) => {
    const newAnswers = [...answers.filter(a => a.qid !== q.id), { qid: q.id, value: val }];
    setAnswers(newAnswers);
    if (idx < questions.length - 1) setIdx(idx + 1);
  };

  const finish = () => {
    const session = scoreSession({ mode, questions, answers });
    saveSession(session);
    onDone();
  };

  if (!q) return <Card>Loading...</Card>;

  return (
    <div className="grid">
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2>Assessment</h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button variant={mode === "FULL" ? "primary" : "ghost"} onClick={() => { setMode("FULL"); setIdx(0); setAnswers([]); }}>Full</Button>
            <Button variant={mode === "QUICK" ? "primary" : "ghost"} onClick={() => { setMode("QUICK"); setIdx(0); setAnswers([]); }}>Quick</Button>
          </div>
        </div>
        <div className="muted">Question {idx + 1} of {questions.length}</div>
        <h3 style={{ margin: "1.5rem 0" }}>{q.prompt}</h3>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Button key={n} variant={currentAnswer?.value === n ? "primary" : "ghost"} onClick={() => setAnswer(n as Likert)}>
              <Kbd>{n}</Kbd> {n === 1 ? "Strongly Disagree" : n === 5 ? "Strongly Agree" : ""}
            </Button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          <Button disabled={idx === 0} onClick={() => setIdx(idx - 1)}>Prev</Button>
          {answers.length === questions.length ? (
            <Button onClick={finish}>Finish</Button>
          ) : (
            <Button disabled={idx === questions.length - 1} onClick={() => setIdx(idx + 1)}>Next</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
