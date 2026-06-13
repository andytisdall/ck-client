import { useEffect, useState, useRef } from "react";

export function useDebounce<T>(query: T, delay = 1000): [T, boolean] {
  const [debouncedQuery, setDebouncedQuery] = useState<T>(query);
  const [isDebouncing, setIsDebouncing] = useState(true);

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setIsDebouncing(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsDebouncing(false);
    }, delay);
  }, [delay, query]);

  return [debouncedQuery, isDebouncing];
}
