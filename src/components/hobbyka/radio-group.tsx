import './styles';
import { useId } from 'react';
/** Figma 188:21155. Одинаковое имя даёт нативный выбор одного значения и управление стрелками. */
export function RadioGroup({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  required = false,
}: {
  label: string;
  options: readonly { value: string; label: string; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const id = useId();
  return (
    <fieldset data-hk="radio-group" disabled={disabled}>
      <legend>{label}</legend>
      {options.map((option, i) => (
        <div key={option.value} data-hk="choice">
          <input
            data-hk="radio"
            type="radio"
            name={name ?? id}
            id={`${id}-${i}`}
            value={option.value}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={
              value === undefined ? defaultValue === option.value : undefined
            }
            disabled={option.disabled}
            required={required}
            onChange={(e) => {
              if (e.target.checked) onValueChange?.(option.value);
            }}
          />
          <label data-slot="field-label" htmlFor={`${id}-${i}`}>
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
