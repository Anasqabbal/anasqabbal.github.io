"use client";
import { useState } from "react";
import { normalizeCommand } from "@/lib/commands";

export type Entry = { id: number; raw: string; command: string; streaming: boolean };
export function useTerminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const run = (raw: string) => {
    const command = normalizeCommand(raw);
    if (!command) return;
    if (command === "clear") { setEntries([]); setHistory([]); return; }
    setHistory((items) => [...items, raw]);
    // Keep the conversation focused on the latest response.
    setEntries([{ id: Date.now(), raw, command, streaming: true }]);
  };
  return { entries, run, history, historyIndex, setHistoryIndex };
}
