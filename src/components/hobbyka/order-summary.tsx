'use client';
import './styles';
import { Button } from './button';
import { formatPrice } from './product-card';
/** Figma 585:28171. Строки и итог выводятся из одной и той же корзины. */
export function OrderSummary({
  items,
  discount = 0,
  onCheckout,
  disabled = false,
}: {
  items: readonly { price: number; quantity: number }[];
  discount?: number;
  onCheckout: () => void;
  disabled?: boolean;
}) {
  const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
    saving = Math.min(Math.max(0, discount), subtotal),
    count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <aside data-hk="order-summary" aria-label="Сумма заказа">
      <h3>Ваш заказ</h3>
      <dl>
        <div>
          <dt>Товары, {count} шт.</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {saving > 0 ? (
          <div>
            <dt>Скидка</dt>
            <dd>−{formatPrice(saving)}</dd>
          </div>
        ) : null}
        <div data-total>
          <dt>Итого</dt>
          <dd>{formatPrice(subtotal - saving)}</dd>
        </div>
      </dl>
      <Button disabled={disabled || count === 0} onClick={onCheckout}>
        Оформить заказ
      </Button>
      <small>Стоимость доставки рассчитывается отдельно</small>
    </aside>
  );
}
