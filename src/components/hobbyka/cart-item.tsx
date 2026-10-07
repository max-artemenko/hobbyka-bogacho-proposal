'use client';
import './styles';
import { Button } from './button';
import { Counter } from './counter';
import { Checkbox } from './checkbox';
import { Icon } from './icon';
import { formatPrice, type Product } from './product-card';
/** Figma 575:37933. Цена строки вычисляется из количества — отдельной копии суммы нет. */
export function CartItem({
  product,
  quantity,
  selected = true,
  onSelectedChange,
  onQuantityChange,
  onRemove,
}: {
  product: Product;
  quantity: number;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <article data-hk="cart-item">
      {onSelectedChange ? (
        <Checkbox
          label={`Выбрать ${product.title}`}
          hideLabel
          checked={selected}
          onCheckedChange={onSelectedChange}
        />
      ) : null}
      <img src={product.image} alt="" />
      <div data-hk="cart-item-title">
        <a href={product.href}>{product.title}</a>
        {product.sku ? <small>Арт. {product.sku}</small> : null}
      </div>
      {/* Количество задаёт корзина: внутренний предел счётчика не должен менять показанную сумму. */}
      <Counter
        value={quantity}
        max={Number.MAX_SAFE_INTEGER}
        onValueChange={onQuantityChange}
      />
      <strong>{formatPrice(product.price * quantity)}</strong>
      <Button
        tone="ghost"
        size="icon"
        aria-label={`Удалить ${product.title}`}
        onClick={onRemove}
      >
        <Icon name="trash" />
      </Button>
    </article>
  );
}
