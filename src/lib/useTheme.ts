import { useCallback, useEffect, useState } from 'react';
import { store } from './storage';

export type Theme = 'light' | 'dark';
const KEY = 'rb-theme';
const media = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null);

function resolved(): Theme {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'light' || t === 'dark') return t;
  return media()?.matches ? 'dark' : 'light';
}

function paintMeta(theme: Theme) {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || (theme === 'dark' ? '#101217' : '#F5F6F8');
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', color));
}

/** Light/dark switch. Follows the system until the user picks one; the pick is remembered. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(() => resolved());
  useEffect(() => {
    paintMeta(theme);
    const mq = media();
    const onChange = () => { const t = resolved(); setThemeState(t); paintMeta(t); };
    mq?.addEventListener('change', onChange);
    return () => mq?.removeEventListener('change', onChange);
  }, [theme]);
  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
    store.set(KEY, t);
    setThemeState(t);
  }, []);
  return [theme, setTheme];
}
