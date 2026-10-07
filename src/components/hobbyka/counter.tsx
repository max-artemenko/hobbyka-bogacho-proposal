'use client';
import './styles';
import { useState } from 'react';
import { Button } from './button';
import { Icon } from './icon';
/** Figma 27:1451. Границы применяются и к набору вручную, и к кнопкам. */
export function Counter({
  value,
  defaultValue = 1,
  onValueChange,
  min = 1,
  max = 999,
  disabled = false,
  size = 'default',
  label = 'Количество',
}: {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'default' | 'small';
  label?: string;
}) {
  const lower = Number.isFinite(min) ? Math.ceil(min) : 1,
    upper = Number.isFinite(max)
      ? Math.max(lower, Math.floor(max))
      : Math.max(lower, 999);
  const clamp = (n: number) =>
    Math.max(
      lower,
      Math.min(upper, Number.isFinite(n) ? Math.round(n) : lower),
    );
  const [internal, setInternal] = useState(() => clamp(defaultValue));
  const current = clamp(value ?? internal);
  // Незавершённый ввод не ограничиваем: иначе при min=10 нельзя набрать 25.
  const [editing, setDraft] = useState<{ base: number; text: string } | null>(
    null,
  );
  const draft = editing?.base === current ? editing.text : null;
  function change(next: number) {
    const bounded = clamp(next);
    if (value === undefined) setInternal(bounded);
    setDraft(null);
    if (bounded !== current) onValueChange?.(bounded);
  }
  return (
    <div data-hk="counter" data-size={size}>
      <Button
        type="button"
        tone="ghost"
        size="small"
        disabled={disabled || current <= lower}
        aria-label={`Уменьшить: ${label}`}
        onClick={() => change(current - 1)}
      >
        <Icon name="minus" size={20} />
      </Button>
      <input
        aria-label={label}
        type="number"
        inputMode="numeric"
        min={lower}
        max={upper}
        step={1}
        value={draft ?? String(current)}
        disabled={disabled}
        onChange={(event) =>
          setDraft({ base: current, text: event.target.value })
        }
        onBlur={() =>
          change(draft === null || draft === '' ? current : Number(draft))
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            change(draft === null || draft === '' ? current : Number(draft));
          }
        }}
      />
      <Button
        type="button"
        tone="ghost"
        size="small"
        disabled={disabled || current >= upper}
        aria-label={`Увеличить: ${label}`}
        onClick={() => change(current + 1)}
      >
        <Icon name="plus" size={20} />
      </Button>
    </div>
  );
}
