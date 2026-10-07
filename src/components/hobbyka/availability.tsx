import './styles';
import type { HTMLAttributes } from 'react';
import { Icon } from './icon';
const labels = {
  available: 'Товар в наличии',
  order: 'Под заказ',
  unavailable: 'Нет в наличии',
  error: 'Недоступен',
} as const;
export type AvailabilityState = keyof typeof labels;
/** Figma 188:21112: текст не даёт передавать статус только цветом. */
export function Availability({
  state = 'available',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { state?: AvailabilityState }) {
  return (
    <span {...props} data-hk="availability" data-state={state}>
      <Icon
        size={14}
        name={
          state === 'available'
            ? 'box-check'
            : state === 'order'
              ? 'clock'
              : 'box-cancel'
        }
      />
      {labels[state]}
    </span>
  );
}
