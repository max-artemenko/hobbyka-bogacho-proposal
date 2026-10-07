'use client';
import './styles';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
/** Figma 893:31018. Стрелки, Home и End перемещают фокус и выбор по доступным вкладкам. */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  label = 'Разделы',
}: {
  items: readonly {
    value: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
  }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}) {
  const id = useId(),
    [local, setLocal] = useState(
      defaultValue ?? items.find((i) => !i.disabled)?.value,
    ),
    refs = useRef<(HTMLButtonElement | null)[]>([]),
    firstAvailable = items.find((item) => !item.disabled)?.value,
    active =
      value ??
      (items.some((item) => item.value === local && !item.disabled)
        ? local
        : firstAvailable),
    focusable = items.some((item) => item.value === active && !item.disabled)
      ? active
      : firstAvailable;
  // При удалении или отключении вкладки сохраняем новый выбор; значение
  // управляемого компонента по-прежнему принадлежит родителю.
  useEffect(() => {
    if (value === undefined && local !== active) setLocal(active);
  }, [value, local, active]);
  const select = (v: string) => {
    if (value === undefined) setLocal(v);
    onValueChange?.(v);
  };
  return (
    <div data-hk="tabs">
      <div role="tablist" aria-label={label} data-slot="tabs-list">
        {items.map((item, i) => (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-${i}-tab`}
            aria-selected={active === item.value}
            aria-controls={`${id}-${i}-panel`}
            tabIndex={!item.disabled && focusable === item.value ? 0 : -1}
            disabled={item.disabled}
            data-slot="tabs-trigger"
            data-active={active === item.value || undefined}
            onClick={() => select(item.value)}
            onKeyDown={(e) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
                return;
              e.preventDefault();
              const indexes = items.flatMap((x, n) => (x.disabled ? [] : [n])),
                position = indexes.indexOf(i),
                next =
                  e.key === 'Home'
                    ? indexes[0]
                    : e.key === 'End'
                      ? indexes.at(-1)!
                      : indexes[
                          (position +
                            (e.key === 'ArrowRight' ? 1 : -1) +
                            indexes.length) %
                            indexes.length
                        ];
              refs.current[next]?.focus();
              select(items[next].value);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          key={item.value}
          id={`${id}-${i}-panel`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`${id}-${i}-tab`}
          hidden={active !== item.value}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
