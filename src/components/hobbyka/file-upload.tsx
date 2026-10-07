'use client';
import './styles';
import { useId, useRef, useState } from 'react';
import { Button } from './button';
/** Figma 624:67332. Выбор и перетаскивание проходят одну проверку; отправку выполняет приложение. */
export function FileUpload({
  label = 'Прикрепить файлы',
  accept = '.pdf,.jpg,.jpeg,.png',
  maxBytes = 10 * 1024 * 1024,
  multiple = true,
  disabled = false,
  onFilesChange,
}: {
  label?: string;
  accept?: string;
  maxBytes?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
}) {
  const id = useId(),
    input = useRef<HTMLInputElement>(null),
    [files, setFiles] = useState<File[]>([]),
    [error, setError] = useState(''),
    [drag, setDrag] = useState(false);
  function select(incoming: File[]) {
    if (disabled) return;
    const allowed = accept
      .split(',')
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);
    const validType = (f: File) =>
      !allowed.length ||
      allowed.some((rule) =>
        rule.startsWith('.')
          ? f.name.toLowerCase().endsWith(rule)
          : rule.endsWith('/*')
            ? f.type.startsWith(rule.slice(0, -1))
            : f.type === rule,
      );
    const rejected = incoming.find((f) => !validType(f) || f.size > maxBytes);
    if (rejected) {
      setError(
        `Файл «${rejected.name}» не подходит. Проверьте формат и размер.`,
      );
      return;
    }
    if (!multiple && incoming.length > 1) {
      setError('Выберите один файл.');
      return;
    }
    setError('');
    // Список принадлежит компоненту; пустое поле позволяет повторно выбрать
    // тот же файл после перетаскивания другого.
    if (input.current) input.current.value = '';
    setFiles(incoming);
    onFilesChange?.(incoming);
  }
  return (
    <div data-hk="file-upload" data-disabled={disabled} data-invalid={!!error}>
      <label data-slot="field-label" htmlFor={id}>
        {label}
      </label>
      <div
        data-hk="drop-zone"
        data-drag={drag}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDrag(false);
          select(Array.from(event.dataTransfer.files));
        }}
      >
        <input
          ref={input}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-describedby={`${id}-hint${error ? ` ${id}-error` : ''}`}
          aria-invalid={!!error}
          onChange={(event) => select(Array.from(event.target.files ?? []))}
        />
        <span>Перетащите файлы сюда или выберите на устройстве</span>
      </div>
      <p data-slot="field-description" id={`${id}-hint`}>
        {accept || 'Любые файлы'} · до {Math.round(maxBytes / 1024 / 1024)} МБ
        каждый
      </p>
      {error ? (
        <p data-slot="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
      <ul data-hk="file-list" aria-live="polite">
        {files.map((file, index) => (
          <li key={`${file.name}-${index}`}>
            <span>{file.name}</span>
            <Button
              type="button"
              tone="ghost"
              size="small"
              disabled={disabled}
              aria-label={`Убрать ${file.name}`}
              onClick={() => {
                const next = files.filter((_, i) => i !== index);
                setFiles(next);
                onFilesChange?.(next);
                if (input.current) input.current.value = '';
              }}
            >
              ×
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
