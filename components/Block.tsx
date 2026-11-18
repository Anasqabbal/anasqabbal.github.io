"use client";
import { useEffect, useRef, useState } from "react";
import { Entry } from "@/hooks/useTerminal";
import { About } from "@/components/pages/About";
import { Connect } from "@/components/pages/Connect";
import { Projects } from "@/components/pages/Projects";
import { Education } from "@/components/pages/Education";
import { Help } from "@/components/pages/Help";
import { Profile } from "@/components/pages/Profile";

export function Block({ entry, onCommand }: { entry: Entry; onCommand: (command: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      if (now - started >= 900) {
        setDone(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  const page = entry.command === "about" ? <About /> : entry.command === "connect" || entry.command === "contact" ? <Connect /> : entry.command === "projects" ? <Projects /> : entry.command === "education" ? <Education /> : entry.command === "profile" ? <Profile /> : entry.command === "help" ? <Help onCommand={onCommand} /> : <p className="error">error: command not found: {entry.raw}. type /help</p>;
  return <section ref={ref} className={`block ${done ? "stream-complete" : "streaming"}`} aria-busy={!done} onClick={() => setDone(true)}><div className="user-line"><b>AnasQABBAL$</b> <span>{entry.raw}</span></div><div className="stream-page">{page}<span className="stream-cursor" aria-hidden="true" /></div></section>;
}
