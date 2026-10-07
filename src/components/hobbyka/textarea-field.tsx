import './styles';
import { useId, type TextareaHTMLAttributes } from 'react';
/** Figma 542:45102: многострочное поле с самостоятельным изменением высоты. */
export function TextareaField({
  label,
  hint,
  error,
  id,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
      <textarea
        {...props}
        id={inputId}
        data-hk="textarea"
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
