import React from "react";
import { Card, Button } from "../ui/atoms";

export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <Card>
      <h2>Welcome</h2>
      <p>
        This is the working scaffold: questions → scoring → dominant + secondary → 32 subtype id.
      </p>
      <Button onClick={onStart}>Begin Assessment</Button>
      <div style={{ height: 10 }} />
      <p className="muted">
        Next step after it runs: swap in your real question banks + full subtype lore.
      </p>
    </Card>
  );
}
