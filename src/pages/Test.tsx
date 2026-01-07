import React, { useMemo, useState } from "react";
import { Card, Button, Progress, Kbd } from "../ui/atoms";
import { FULL_L1, FULL_L2, FULL_L3, QUICK_SCAN } from "../core/data/questions";
import { scoreSession } from "../core/scoring";
import { saveSession } from "../core/storage";
import { Likert, Answer } from "../core/types";

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

  const progressPct = Math.round(((idx) / questions.length) * 100);

  const setAnswer = (val: Likert) => {
    const newAnswers = [...answers.filter(a => a.qid !== q.id), { qid: q.id, value: val }];
    setAnswers(newAnswers);
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    }
  };

  const finish = () => {
    const session = scoreSession({ mode, questions, answers });
    saveSession(session);
    onDone();
  };

  const restart = (newMode: Mode) => {
    setMode(newMode);
    setIdx(0);
    setAnswers([]);
  };

  if (!q) return <Card>Loading...</Card>;

  return (
    <div className="grid">
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>{mode === "FULL" ? "Full Assessment" : "Quick Scan"}</h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button variant={mode === "FULL" ? "primary" : "ghost"} onClick={() => restart("FULL")}>Full</Button>
            <Button variant={mode === "QUICK" ? "primary" : "ghost"} onClick={() => restart("QUICK")}>Quick</Button>
          </div>
        </div>
        
        <div style={{ marginBottom: "1.5rem" }}>
           <div className="muted" style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
             <span>Question {idx + 1} of {questions.length}</span>
             <span>{progressPct}% Complete</span>
           </div>
           <Progress value={progressPct} />
        </div>

        <div style={{ minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{ fontSize: "1.25rem", textAlign: "center", marginBottom: "2rem" }}>{q.prompt}</h3>
          
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Button 
                key={n} 
                variant={currentAnswer?.value === n ? "primary" : "ghost"} 
                onClick={() => setAnswer(n as Likert)}
                style={{ justifyContent: "flex-start", paddingLeft: "1.5rem" }}
              >
                <Kbd>{n}</Kbd> 
                <span style={{ marginLeft: "1rem" }}>
                  {n === 1 ? "Strongly Disagree" : n === 2 ? "Disagree" : n === 3 ? "Neutral" : n === 4 ? "Agree" : "Strongly Agree"}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
          <Button disabled={idx === 0} onClick={() => setIdx(idx - 1)} variant="ghost">← Previous</Button>
          
          <div style={{ display: "flex", gap: "1rem" }}>
            {answers.length === questions.length ? (
              <Button onClick={finish}>Finish & View Results</Button>
            ) : (
              <Button disabled={idx === questions.length - 1} onClick={() => setIdx(idx + 1)} variant="ghost">Next →</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
