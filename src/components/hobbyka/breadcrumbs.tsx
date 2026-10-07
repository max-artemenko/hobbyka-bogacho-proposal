import './styles';
import { Icon } from './icon';
/** Figma 67:1242. Последний пункт — текущая страница, родители остаются ссылками. */
export function Breadcrumbs({
  items,
}: {
  items: readonly { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Навигационная цепочка" data-hk="breadcrumbs">
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {i > 0 ? <Icon name="chevron-right" size={12} /> : null}
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
