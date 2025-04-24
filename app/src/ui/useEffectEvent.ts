import { useCallback, useLayoutEffect, useRef } from "react";

export function useEffectEvent<P extends unknown[]>(
  cb: (...args: P) => void
): (...args: P) => void {
  const cbRef = useRef<((...args: P) => void) | null>(null);

  useLayoutEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  return useCallback((...args: P) => {
    const callback = cbRef.current!;
    callback(...args);
  }, []);
}
