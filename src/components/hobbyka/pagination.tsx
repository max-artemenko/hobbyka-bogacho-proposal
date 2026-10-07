'use client';
import './styles';
import { Button } from './button';
import { Icon } from './icon';
/** Figma 30:826. Окно страниц ограничено, чтобы большой каталог не создавал тысячи кнопок. */
export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const total = Number.isFinite(totalPages)
    ? Math.max(1, Math.floor(totalPages))
    : 1;
  const current = Math.min(
    total,
    Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1),
  );
  const visible = [
    ...new Set([
      1,
      ...Array.from({ length: 5 }, (_, i) => current - 2 + i).filter(
        (p) => p > 1 && p < total,
      ),
      total,
    ]),
  ].sort((a, b) => a - b);
  return (
    <nav aria-label="Страницы каталога" data-hk="pagination">
      <ul>
        <li data-slot="pagination-item">
          <Button
            tone="ghost"
            disabled={current === 1}
            aria-label="Предыдущая страница"
            onClick={() => onPageChange(current - 1)}
          >
            <Icon name="arrow-left" />
          </Button>
        </li>
        {visible.map((p, i) => (
          <li data-slot="pagination-item" key={p}>
            {i > 0 && p - visible[i - 1] > 1 ? (
              <span aria-hidden="true">…</span>
            ) : null}
            <Button
              tone={p === current ? 'yellow' : 'ghost'}
              aria-label={`Страница ${p}`}
              aria-current={p === current ? 'page' : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          </li>
        ))}
        <li data-slot="pagination-item">
          <Button
            tone="ghost"
            disabled={current === total}
            aria-label="Следующая страница"
            onClick={() => onPageChange(current + 1)}
          >
            <Icon name="arrow-right" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
