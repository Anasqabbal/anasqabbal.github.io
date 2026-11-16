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
      <input ref={inputRef} aria-label="Command" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={onKeyDown} autoComplete="off" />
    </span>
  </form>;
}
