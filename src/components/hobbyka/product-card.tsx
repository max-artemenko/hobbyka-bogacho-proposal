'use client';
import './styles';
import { Button } from './button';
import { Badge } from './badge';
import { Availability, type AvailabilityState } from './availability';
import { Counter } from './counter';
import { Icon } from './icon';
export type Product = {
  id: string;
  title: string;
  image: string;
  href: string;
  price: number;
  oldPrice?: number;
  sku?: string;
  availability?: AvailabilityState;
  label?: string;
};
export const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
/** Figma 27:1281 / 539:33553. Корзина и избранное принадлежат приложению, карточка получает их состояние. */
export function ProductCard({
  product,
  quantity = 0,
  favorite = false,
  onQuantityChange,
  onFavoriteChange,
}: {
  product: Product;
  quantity?: number;
  favorite?: boolean;
  onQuantityChange: (quantity: number) => void;
  onFavoriteChange?: (favorite: boolean) => void;
}) {
  const cannotAdd =
    product.availability === 'unavailable' || product.availability === 'error';
  return (
    <article data-hk="product-card">
      <div data-hk="product-media">
        <a href={product.href} tabIndex={-1} aria-hidden="true">
          <img src={product.image} alt="" loading="lazy" />
        </a>
        {product.label ? <Badge>{product.label}</Badge> : null}
        {onFavoriteChange ? (
          <Button
            tone="ghost"
            size="icon"
            aria-label={`В избранное: ${product.title}`}
            aria-pressed={favorite}
            onClick={() => onFavoriteChange(!favorite)}
          >
            <Icon name={favorite ? 'filled-favourite' : 'heart'} />
          </Button>
        ) : null}
      </div>
      <div data-hk="product-meta">
        <Availability state={product.availability} />
        {product.sku ? <span data-hk="sku">Арт. {product.sku}</span> : null}
      </div>
      <a data-hk="product-title" href={product.href}>
        {product.title}
      </a>
      <div data-hk="product-price">
        {product.oldPrice ? <del>{formatPrice(product.oldPrice)}</del> : null}
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <div data-hk="product-actions">
        {quantity > 0 ? (
          <>
            <Counter
              min={0}
              max={cannotAdd ? quantity : undefined}
              value={quantity}
              onValueChange={onQuantityChange}
            />
            <output>В корзине</output>
          </>
        ) : (
          <Button disabled={cannotAdd} onClick={() => onQuantityChange(1)}>
            <Icon name="filled-cart" />В корзину
          </Button>
        )}
      </div>
    </article>
  );
}
