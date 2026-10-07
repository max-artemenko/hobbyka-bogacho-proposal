import './styles';
import type { HTMLAttributes } from 'react';
/** Figma 29:3300: три цвета и размера меток товара. */
export function Badge({
  tone = 'yellow',
  size = 'large',
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: 'yellow' | 'red' | 'green';
  size?: 'large' | 'medium' | 'small';
}) {
  return <span {...props} data-hk="badge" data-tone={tone} data-size={size} />;
}
