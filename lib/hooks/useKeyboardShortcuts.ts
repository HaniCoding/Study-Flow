'use client';

import { useEffect, useCallback } from 'react';
import { useUIStore } from '@/lib/store';

export function useKeyboardShortcuts() {
  const toggleCommandMenu = useUIStore((state) => state.toggleCommandMenu);
  const closeCommandMenu = useUIStore((state) => state.closeCommandMenu);
  const commandMenuOpen = useUIStore((state) => state.commandMenuOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleCommandMenu();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
      if (event.key === 'Escape' && commandMenuOpen) {
        event.preventDefault();
        closeCommandMenu();
      }
    },
    [toggleCommandMenu, toggleSidebar, closeCommandMenu, commandMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}