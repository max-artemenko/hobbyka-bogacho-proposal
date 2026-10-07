import './styles';
import type { ComponentProps } from 'react';
/** Figma 29:4727. Ссылка остаётся ссылкой, чтобы работали открытие в новой вкладке и клавиатура. */
export function Link({
  tone = 'black',
  children,
  ...props
}: ComponentProps<'a'> & {
  tone?: 'black' | 'white' | 'yellow' | 'red' | 'red-dashed' | 'gray';
}) {
  return (
    <a {...props} data-hk="link" data-tone={tone}>
      {children}
    </a>
  );
}
