import './styles';
/** Figma 96:2618, 96:2633 и 991:35649. Вся карточка — одна ссылка. */
export function CategoryCard({
  title,
  image,
  href,
  count,
  compact = false,
}: {
  title: string;
  image: string;
  href: string;
  count?: number;
  compact?: boolean;
}) {
  return (
    <a data-hk="category-card" data-compact={compact} href={href}>
      <img src={image} alt="" loading="lazy" />
      <span>{title}</span>
      {count !== undefined ? (
        <small>{count.toLocaleString('ru-RU')} товаров</small>
      ) : null}
    </a>
  );
}
