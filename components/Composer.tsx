type ComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

function MicrophoneIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></svg>;
}

function PaperclipIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m20.5 11.5-8.8 8.8a5 5 0 0 1-7.1-7.1l9.2-9.2a3.5 3.5 0 0 1 5 5l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.4-8.4" /></svg>;
}

export function Composer({ value, onChange, onSubmit, onKeyDown, inputRef }: ComposerProps) {
  return (
    <form className="composer flex min-h-16 w-full max-w-[720px] items-center gap-3 px-4 py-3" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      <label className="shrink-0 font-bold text-[var(--accent)]" htmlFor="command-input">AnasQABBAL$</label>
      <div className="relative min-w-0 flex-1">
        <input
          ref={inputRef}
          id="command-input"
          aria-label="Command"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          className="w-full border-0 bg-transparent text-base text-[var(--text)] outline-none"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder=""
        />
        {!value && <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[var(--muted)]"><span className="cursor-block mr-2" />type here</span>}
      </div>
      <span className="shrink-0 text-[var(--muted)]"><MicrophoneIcon /></span>
      <span className="shrink-0 text-[var(--muted)]"><PaperclipIcon /></span>
    </form>
  );
}
