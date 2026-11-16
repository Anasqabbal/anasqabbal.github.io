import { useEffect, useRef, useState } from "react";

export function useTypewriter(onStop?: () => void) {
  const [value, setValue] = useState("");
  const stopped = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const text = "/help";
    const type = (index: number) => {
      if (stopped.current) return;
      if (index <= text.length) {
        setValue(text.slice(0, index));
        timer = setTimeout(() => type(index + 1), 80);
      } else {
        timer = setTimeout(() => erase(text.length), 700);
      }
    };
    const erase = (index: number) => {
      if (stopped.current) return;
      if (index >= 0) {
        setValue(text.slice(0, index));
        timer = setTimeout(() => erase(index - 1), 40);
      }
    };
    timer = setTimeout(() => type(1), 600);
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  const stop = () => {
    if (!stopped.current) {
      stopped.current = true;
      setValue("");
      onStop?.();
    }
  };

  return { value, setValue, stop };
}
