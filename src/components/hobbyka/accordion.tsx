'use client';
import './styles';
import { useId, useState, type ReactNode } from 'react';
import { Icon } from './icon';
/** Figma 1361:66338 / 551:38416. Обычная кнопка раскрывает связанную область. */
export function Accordion({
  items,
  value,
  defaultValue = [],
  onValueChange,
  multiple = true,
}: {
  items: readonly {
    value: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
  }[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
}) {
  const id = useId(),
    [local, setLocal] = useState(defaultValue),
    active = value ?? local;
  function toggle(key: string) {
    const next = active.includes(key)
      ? active.filter((v) => v !== key)
      : multiple
        ? [...active, key]
        : [key];
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
  }
  return (
    <div data-hk="accordion">
      {items.map((item, i) => (
        <section key={item.value} data-hk="accordion-item">
          <h3>
            <button
              type="button"
              data-slot="accordion-trigger"
              id={`${id}-${i}-trigger`}
              disabled={item.disabled}
              aria-expanded={active.includes(item.value)}
              aria-controls={`${id}-${i}-content`}
              onClick={() => toggle(item.value)}
            >
              {item.title}
              <Icon name="chevron-down" />
            </button>
          </h3>
          <div
            id={`${id}-${i}-content`}
            role="region"
            aria-labelledby={`${id}-${i}-trigger`}
            data-slot="accordion-content"
            hidden={!active.includes(item.value)}
          >
            <div>{item.content}</div>
          </div>
        </section>
      ))}
    </div>
  );
}
