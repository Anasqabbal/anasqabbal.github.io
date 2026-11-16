"use client";
import { FormEvent, useEffect, useRef } from "react";

export function Composer({ value, onChange, onSubmit, onKeyDown }: { value: string; onChange: (value: string) => void; onSubmit: () => void; onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(); };
  return <form className="composer" onSubmit={submit}>
    <span className="composer-prompt">AnasQABBAL$</span>
    <input ref={inputRef} aria-label="Command" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={onKeyDown} placeholder="type here" autoComplete="off" />
    <svg aria-hidden="true" className="composer-icon" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v4M8 22h8"/></svg>
    <svg aria-hidden="true" className="composer-icon" viewBox="0 0 24 24"><path d="m21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l8.5-8.5a4 4 0 0 1 5.7 5.7l-8.5 8.5a2 2 0 0 1-2.8-2.8l8-8"/></svg>
  </form>;
}
