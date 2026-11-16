"use client";
import { useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { Header } from "@/components/Header";
import { Composer } from "@/components/Composer";
import { Slogan } from "@/components/Slogan";
import { Block } from "@/components/Block";

export function Terminal() {
  const terminal = useTerminal();
  const [value, setValue] = useState("");
  const submit = () => { terminal.run(value); setValue(""); };
  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { event.preventDefault(); submit(); }
    if (event.key === "ArrowUp" && terminal.history.length) { event.preventDefault(); const index = Math.max(0, terminal.historyIndex < 0 ? terminal.history.length - 1 : terminal.historyIndex - 1); terminal.setHistoryIndex(index); setValue(terminal.history[index]); }
    if (event.key === "ArrowDown" && terminal.historyIndex >= 0) { event.preventDefault(); const index = terminal.historyIndex + 1; terminal.setHistoryIndex(index >= terminal.history.length ? -1 : index); setValue(index >= terminal.history.length ? "" : terminal.history[index]); }
  };
  const selectCommand = (command: string) => {
    setValue("");
    terminal.run(command);
  };
  return <main className={terminal.entries.length ? "terminal state-b" : "terminal"}><Header /><div className="chat" role="log" aria-live="polite">{!terminal.entries.length && <div className="idle"><Slogan /></div>}{terminal.entries.map((entry) => <Block key={entry.id} entry={entry} onCommand={terminal.run} />)}</div><div className={terminal.entries.length ? "composer-wrap composer-bottom" : "composer-wrap"}><Composer value={value} onChange={setValue} onSubmit={submit} onKeyDown={keyDown} onCommandSelect={selectCommand} /></div></main>;
}
