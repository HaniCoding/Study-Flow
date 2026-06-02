'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const mounted = typeof window !== 'undefined';

  return {
    theme: theme || 'system',
    setTheme,
    resolvedTheme: resolvedTheme || 'light',
    mounted,
    isDark: resolvedTheme === 'dark',
  };
}