import './styles';
import type { ButtonHTMLAttributes } from 'react';
/** Figma 13:661: размеры, заливки и состояния принадлежат макету Хоббики. */
export function Button({
  tone = 'yellow',
  size = 'default',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'yellow' | 'black' | 'gray' | 'light' | 'outline' | 'ghost';
  size?: 'default' | 'small' | 'icon';
}) {
  return (
    <button
      {...props}
      type={type}
      data-hk="button"
      data-tone={tone}
      data-size={size}
    />
  );
}
