'use client';
import './styles';
import { useSyncExternalStore } from 'react';
import { Button } from './button';
const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  });
  return () => observer.disconnect();
};
const snapshot = () =>
  document.documentElement.dataset.theme === 'dark' ||
  document.documentElement.classList.contains('dark');
/** Все переключатели читают одну тему документа, включая заданную до загрузки React. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, () => false);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('hobbyka-theme', next ? 'dark' : 'light');
    } catch {
      /* Частный режим не должен блокировать переключение. */
    }
  }
  return (
    <Button
      tone="outline"
      size="small"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Тёмная тема"
    >
      {dark ? 'Светлая тема' : 'Тёмная тема'}
    </Button>
  );
}
