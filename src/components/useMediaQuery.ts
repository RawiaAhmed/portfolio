import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query. Used to switch off layout behaviour that only
 * makes sense with room to spare, rather than trying to make one layout serve
 * both. Returns false during the first render on the server or before the
 * listener attaches, so the mobile layout is the default.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
