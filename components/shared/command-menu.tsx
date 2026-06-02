'use client';

import { useEffect, useCallback } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import { useUIStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import {
  Search,
  MessageSquare,
  FileText,
  Brain,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const shortcuts = [
  { icon: Sparkles, label: 'New Chat', shortcut: '⌘ K', href: '/dashboard/chat' },
  { icon: FileText, label: 'Notes', shortcut: '⌘ N', href: '/dashboard/notes' },
  { icon: Brain, label: 'Quiz', shortcut: '⌘ Q', href: '/dashboard/quiz' },
  { icon: BarChart3, label: 'Analytics', shortcut: '⌘ A', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', shortcut: '⌘ ,', href: '/dashboard/settings' },
];

export function CommandMenu() {
  const commandMenuOpen = useUIStore((state) => state.commandMenuOpen);
  const toggleCommandMenu = useUIStore((state) => state.toggleCommandMenu);
  const router = useRouter();

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      toggleCommandMenu();
    },
    [router, toggleCommandMenu]
  );

  useEffect(() => {
    if (commandMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [commandMenuOpen]);

  return (
    <AnimatePresence>
      {commandMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCommandMenu}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-1/4 z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border bg-background shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
          >
            <Command className="[&_[cmdk-input]]:h-12 [&_[cmdk-input]]:text-base">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                  placeholder="Type a command or search..."
                  className="flex h-12 flex-1 border-0 bg-transparent outline-none placeholder:text-muted-foreground"
                />
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                  esc
                </kbd>
              </div>
              <CommandList className="max-h-[300px] overflow-y-auto p-2">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </CommandEmpty>
                <CommandGroup heading="Quick Actions">
                  {shortcuts.map((shortcut) => (
                    <CommandItem
                      key={shortcut.href}
                      value={shortcut.label}
                      onSelect={() => handleSelect(shortcut.href)}
                      className="flex cursor-pointer items-center justify-between rounded-md px-2 py-3 aria-selected:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <shortcut.icon className="h-4 w-4 text-muted-foreground" />
                        <span>{shortcut.label}</span>
                      </div>
                      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                        {shortcut.shortcut}
                      </kbd>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}