import './styles';
import { useId, type InputHTMLAttributes } from 'react';
/** Figma 267:9661. Подпись и сообщения связаны с нативным полем. */
export function TextField({
  label,
  hint,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const generated = useId(),
    inputId = id ?? generated;
  const described =
    [
      props['aria-describedby'],
      hint ? `${inputId}-hint` : undefined,
      error ? `${inputId}-error` : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div data-hk="field">
      <label data-slot="field-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        data-hk="input"
        aria-invalid={!!error || props['aria-invalid']}
        aria-describedby={described}
      />
      {hint ? (
        <p id={`${inputId}-hint`} data-slot="field-description">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} data-slot="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
