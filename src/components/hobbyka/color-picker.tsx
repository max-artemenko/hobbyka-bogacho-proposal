'use client';
import './styles';
import { RadioGroup } from './radio-group';
/** Figma 584:25059. Названия цветов доступны и без различения оттенков. */
export function ColorPicker({
  colors,
  value,
  onValueChange,
  label = 'Цвет покрытия',
}: {
  colors: readonly { value: string; label: string; color: string }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}) {
  return (
    <div data-hk="color-picker">
      <RadioGroup
        label={label}
        value={value}
        onValueChange={(v) => {
          if (v !== null) onValueChange(String(v));
        }}
        options={colors.map((c) => ({ value: c.value, label: c.label }))}
      />
      <div data-hk="color-swatches" aria-hidden="true">
        {colors.map((c) => (
          <span
            key={c.value}
            data-selected={value === c.value}
            style={{ background: c.color }}
          />
        ))}
      </div>
    </div>
  );
}
