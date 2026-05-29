import { useEffect, useState, useRef } from "react";

export function useDebounce<T>(query: T, delay = 1600): T {
  const [debouncedQuery, setDebouncedQuery] = useState<T>(query);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);
  }, [query, delay]);

  return debouncedQuery;
}
