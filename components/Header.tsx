"use client";
import { useEffect, useState } from "react";
import { hints } from "@/lib/hints";

export function Header({ onCommand }: { onCommand: (command: string) => void }) {
  const [hint, setHint] = useState("");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = hints[index];
  useEffect(() => {
    let timer: number;
    let position = 0;
    let erasing = false;
    const tick = () => {
      if (paused) return;
      if (!erasing && position < current.text.length) {
        position += 1; setHint(current.text.slice(0, position)); timer = window.setTimeout(tick, current.typeMs);
      } else if (!erasing) { timer = window.setTimeout(() => { erasing = true; tick(); }, current.holdMs); }
      else if (position > 0) { position -= 1; setHint(current.text.slice(0, position)); timer = window.setTimeout(tick, current.eraseMs); }
      else { setIndex((value) => (value + 1) % hints.length); }
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [current, paused]);
  const complete = hint === current.text;
  return <header className="site-header">
    <div className="wordmark">AnasQABBAL$<span className="block-cursor" /></div>
    <div className="hint" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      {complete ? <button className="hint-command" onClick={() => onCommand(current.command)}>{hint}</button> : hint}
    </div>
    <div className="profile-placeholder" aria-label="Profile photo placeholder" />
  </header>;
}
