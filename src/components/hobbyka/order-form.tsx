'use client';
import './styles';
import { useState } from 'react';
import { Button } from './button';
import { TextField } from './text-field';
import { TextareaField } from './textarea-field';
import { Checkbox } from './checkbox';
export type OrderDetails = { name: string; email: string; comment: string };
/** Figma 348:26489. Успех появляется только после завершения обработчика приложения. */
export function OrderForm({
  onSubmit,
  privacyHref,
}: {
  onSubmit: (details: OrderDetails) => Promise<void>;
  privacyHref: string;
}) {
  const [pending, setPending] = useState(false),
    [error, setError] = useState(''),
    [done, setDone] = useState(false),
    [consent, setConsent] = useState(false);
  return (
    <form
      data-hk="order-form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (pending || !consent) return;
        const data = new FormData(event.currentTarget);
        const text = (key: string) => {
          const value = data.get(key);
          return typeof value === 'string' ? value.trim() : '';
        };
        setPending(true);
        setError('');
        setDone(false);
        try {
          await onSubmit({
            name: text('name'),
            email: text('email'),
            comment: text('comment'),
          });
          setDone(true);
        } catch {
          setError('Не удалось отправить. Попробуйте ещё раз.');
        } finally {
          setPending(false);
        }
      }}
    >
      <h3>Получить предложение</h3>
      <div data-hk="order-form-fields">
        <TextField
          label="Ваше имя"
          name="name"
          autoComplete="name"
          required
          disabled={pending}
        />
        <TextField
          label="Электронная почта"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
        />
      </div>
      <TextareaField
        label="Комментарий"
        name="comment"
        disabled={pending}
        placeholder="Что вас интересует?"
      />
      <Checkbox
        label={
          <>
            Согласен с <a href={privacyHref}>условиями обработки данных</a>
          </>
        }
        checked={consent}
        onCheckedChange={setConsent}
        disabled={pending}
      />
      <Button type="submit" disabled={pending || !consent}>
        {pending ? 'Отправляем…' : 'Отправить'}
      </Button>
      {error ? <p role="alert">{error}</p> : null}
      {done ? <output>Заявка отправлена</output> : null}
    </form>
  );
}
