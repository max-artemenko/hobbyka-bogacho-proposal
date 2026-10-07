'use client';
import './styles';
import { useId, useState } from 'react';
import { Button } from './button';
/** Figma 584:27086. Поиск передаёт запрос приложению. */
export function Search({
  onSearch,
  defaultValue = '',
  placeholder = 'Скамейка или артикул…',
  label = 'Поиск по каталогу',
  disabled = false,
}: {
  onSearch: (query: string) => void;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}) {
  const id = useId(),
    [query, setQuery] = useState(defaultValue);
  return (
    <search data-hk="search" aria-label={label}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled && query.trim()) onSearch(query.trim());
        }}
      >
        <label className="hk-visually-hidden" htmlFor={id}>
          {label}
        </label>
        <div data-slot="input-group">
          <input
            id={id}
            data-slot="input-group-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
          <Button
            type="submit"
            size="small"
            disabled={disabled || !query.trim()}
          >
            Найти
          </Button>
        </div>
      </form>
    </search>
  );
}
