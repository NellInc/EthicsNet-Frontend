import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/** Navigate with the same soft transition used by nellwatson.com. */
export function useSoftNavigate() {
  const navigate = useNavigate();

  return useCallback((to, options = {}) => {
    const reducedMotion = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    navigate(to, {
      ...options,
      viewTransition: options.viewTransition ?? !reducedMotion,
    });
  }, [navigate]);
}
