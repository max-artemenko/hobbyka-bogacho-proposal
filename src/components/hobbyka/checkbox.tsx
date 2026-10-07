'use client';
import './styles';
import {
  useId,
  useRef,
  useEffect,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
/** Figma 188:21144. Нативный флажок сохраняет клавиатуру и отправку формы. */
export function Checkbox({
  label,
  id,
  indeterminate = false,
  hideLabel = false,
  onCheckedChange,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  indeterminate?: boolean;
  hideLabel?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const generated = useId(),
    inputId = id ?? generated,
    ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <div data-hk="choice" data-disabled={props.disabled}>
      <input
        {...props}
        ref={ref}
        type="checkbox"
        id={inputId}
        data-hk="checkbox"
        onChange={(e) => {
          props.onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
      />
      <label
        data-slot="field-label"
        htmlFor={inputId}
        className={hideLabel ? 'hk-visually-hidden' : undefined}
      >
        {label}
      </label>
    </div>
  );
}
