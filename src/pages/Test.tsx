import React, { useState, useEffect, useMemo } from "react";
import { Card, Button, Progress } from "../ui/atoms";
import assessmentData from "../core/data/assessment_v1.json";
import { scoreSession } from "../core/scoring";
import { saveSession } from "../core/storage";

type AssessmentMode = "STANDARD" | "QUICK";

interface Question {
  id: string;
  prompt: string;
  layer: number;
  weights: any;
  polarity: number;
}

export default function Test({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<AssessmentMode | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isResuming, setIsResuming] = useState(false);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem("soulstack.progress");
    if (saved) {
      const { mode: savedMode, currentIdx: savedIdx, answers: savedAnswers } = JSON.parse(saved);
      setMode(savedMode);
      setCurrentIdx(savedIdx);
      setAnswers(savedAnswers);
      setIsResuming(true);
    }
  }, []);

  // Save persistence
  useEffect(() => {
    if (mode) {
      localStorage.setItem("soulstack.progress", JSON.stringify({ mode, currentIdx, answers }));
    }
  }, [mode, currentIdx, answers]);

  const questions = useMemo(() => {
    if (!mode) return [];
    const allQuestions: Question[] = [];
    
    if (mode === "QUICK") {
      assessmentData.quick_scan.forEach(id => {
        for (const layerId in assessmentData.layers) {
          const q = (assessmentData.layers as any)[layerId].questions.find((q: any) => q.id === id);
          if (q) {
            allQuestions.push({ ...q, layer: parseInt(layerId) });
            break;
          }
        }
      });
    } else {
      Object.entries(assessmentData.layers).forEach(([layerId, layer]: [string, any]) => {
        layer.questions.forEach((q: any) => {
          allQuestions.push({ ...q, layer: parseInt(layerId) });
        });
      });
    }
    return allQuestions;
  }, [mode]);

  const currentQuestion = questions[currentIdx];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Finalize
      const mappedAnswers = Object.entries(newAnswers).map(([qid, value]) => ({ qid, value: value as any }));
      const session = scoreSession({ 
        mode: mode === "STANDARD" ? "FULL" : "QUICK", 
        questions: questions as any, 
        answers: mappedAnswers 
      });
      saveSession(session);
      localStorage.removeItem("soulstack.progress");
      onDone();
    }
  };

  if (!mode) {
    return (
      <Card style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Choose Your Path</h2>
        <p className="muted" style={{ marginBottom: "2rem" }}>Select the depth of your assessment.</p>
        <div style={{ display: "grid", gap: "1rem" }}>
          <Button onClick={() => setMode("STANDARD")}>Standard Assessment (3 Layers)</Button>
          <Button variant="ghost" onClick={() => setMode("QUICK")}>Quick Scan (12 Questions)</Button>
        </div>
      </Card>
    );
  }

  const progress = Math.round((currentIdx / questions.length) * 100);

  return (
    <div className="grid">
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center" }}>
          <div className="muted" style={{ fontSize: "0.85rem" }}>
            Layer {currentQuestion.layer}: {assessmentData.layers[currentQuestion.layer as unknown as keyof typeof assessmentData.layers].name}
          </div>
          <div className="muted" style={{ fontSize: "0.85rem" }}>
            {currentIdx + 1} / {questions.length}
          </div>
        </div>
        <Progress value={progress} />
        
        <div style={{ marginTop: "3rem", textAlign: "center", minHeight: "150px" }}>
          <h3 style={{ fontSize: "1.4rem", lineHeight: "1.4" }}>{currentQuestion.prompt}</h3>
        </div>

        <div style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {[
            { label: "Strongly Agree", val: 5 },
            { label: "Agree", val: 4 },
            { label: "Neutral", val: 3 },
            { label: "Disagree", val: 2 },
            { label: "Strongly Disagree", val: 1 },
          ].map((opt) => (
            <Button 
              key={opt.val} 
              variant={answers[currentQuestion.id] === opt.val ? "primary" : "ghost"} 
              onClick={() => handleAnswer(opt.val)}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <Button 
            variant="ghost" 
            disabled={currentIdx === 0} 
            onClick={() => setCurrentIdx(currentIdx - 1)}
          >
            ← Back
          </Button>
          <Button variant="ghost" onClick={() => {
             if(confirm("Exit and save progress?")) location.hash = "#home";
          }}>Save & Exit</Button>
        </div>
      </Card>
    </div>
  );
}
