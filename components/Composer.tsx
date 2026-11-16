"use client";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

export function Composer({ value, onChange, onSubmit, onKeyDown }: { value: string; onChange: (value: string) => void; onSubmit: () => void; onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [cursorOffset, setCursorOffset] = useState(0);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useLayoutEffect(() => {
    setCursorOffset(mirrorRef.current?.getBoundingClientRect().width ?? 0);
  }, [value]);
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(); };
  return <form className="composer" onSubmit={submit}>
    <span className="composer-prompt">anasqabbal_$:</span>
    <span className="composer-input">
      <span ref={mirrorRef} className="composer-mirror" aria-hidden="true">{value}</span>
      <span className="input-cursor" aria-hidden="true" style={{ left: `${cursorOffset}px` }} />
      <input ref={inputRef} aria-label="Command" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={onKeyDown} placeholder="type here" autoComplete="off" />
    </span>
    <svg aria-hidden="true" className="composer-icon" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v4M8 22h8"/></svg>
    <svg aria-hidden="true" className="composer-icon" viewBox="0 0 24 24"><path d="m21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l8.5-8.5a4 4 0 0 1 5.7 5.7l-8.5 8.5a2 2 0 0 1-2.8-2.8l8-8"/></svg>
  </form>;
}
