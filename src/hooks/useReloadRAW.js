import { useCallback } from 'react';

export function useReloadRAW() {
  return useCallback(() => {
    return window.location.replace(window.location.pathname);
  }, []);
}
