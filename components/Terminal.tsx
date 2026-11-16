"use client";

import { useEffect, useRef, useState } from "react";
import { Block } from "@/components/Block";
import { Composer } from "@/components/Composer";
import { Slogan } from "@/components/Slogan";
import { useTerminal } from "@/hooks/useTerminal";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Terminal() {
  const { entries, run, browseHistory } = useTerminal();
  const [manualValue, setManualValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastBlockRef = useRef<HTMLDivElement>(null);
  const { value: animatedValue, stop } = useTypewriter();
  const value = manualValue || animatedValue;
  const active = entries.length > 0;

  useEffect(() => {
    if (active) lastBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active, entries.length]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    const submittedValue = value;
    stop();
    setManualValue("");
    run(submittedValue);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    stop();
    if (event.key === "Enter") { event.preventDefault(); submit(); }
    if (event.key === "ArrowUp") { event.preventDefault(); setManualValue(browseHistory(-1)); }
    if (event.key === "ArrowDown") { event.preventDefault(); setManualValue(browseHistory(1)); }
  };

  return <main className={`terminal-page flex flex-col ${active ? "justify-end" : "items-center justify-center"}`}>
    <div className={`flex w-full flex-col ${active ? "flex-1 overflow-y-auto px-4 pb-8 pt-8 md:px-8" : "items-center"}`}>
      {!active && <div className="mb-12 max-w-[720px] animate-[fade-in_150ms_ease-out]"><Slogan /></div>}
      {active && <div role="log" aria-live="polite" className="mx-auto flex w-full max-w-[720px] flex-col gap-12">{entries.map((entry, index) => <div key={entry.id} ref={index === entries.length - 1 ? lastBlockRef : undefined}><Block entry={entry} onCommand={(command) => { run(command); setManualValue(""); }} /></div>)}</div>}
    </div>
    <div className={`w-full px-4 pb-[max(24px,env(safe-area-inset-bottom))] transition-[padding] duration-200 ease-out md:px-8 ${active ? "pt-4" : ""}`}>
      <div className="mx-auto w-full max-w-[720px]"><Composer value={value} onChange={(next) => { stop(); setManualValue(next); }} onSubmit={submit} onKeyDown={handleKeyDown} inputRef={inputRef} /></div>
    </div>
  </main>;
}
