'use client';
import './styles';
import { useState } from 'react';
import { Button } from './button';
import { Icon } from './icon';
/** Figma 584:21538. Кнопки и миниатюры меняют один индекс; пустая галерея не создаёт сломанное изображение. */
export function Gallery({
  images,
  label = 'Фотографии товара',
}: {
  images: readonly { src: string; alt: string }[];
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const active = Math.min(index, Math.max(0, images.length - 1));
  if (!images.length)
    return <div data-hk="gallery-empty">Фотографии пока не добавлены</div>;
  return (
    <section data-hk="gallery" aria-label={label}>
      <div data-hk="gallery-main">
        <img src={images[active].src} alt={images[active].alt} />
        {images.length > 1 ? (
          <>
            <Button
              tone="light"
              size="icon"
              aria-label="Предыдущее фото"
              onClick={() =>
                setIndex((active - 1 + images.length) % images.length)
              }
            >
              <Icon name="chevron-left" />
            </Button>
            <Button
              tone="light"
              size="icon"
              aria-label="Следующее фото"
              onClick={() => setIndex((active + 1) % images.length)}
            >
              <Icon name="chevron-right" />
            </Button>
          </>
        ) : null}
      </div>
      <div data-hk="gallery-thumbs">
        {images.map((image, i) => (
          <button
            key={`${image.src}-${i}`}
            type="button"
            aria-label={`Фото ${i + 1}: ${image.alt}`}
            aria-pressed={active === i}
            onClick={() => setIndex(i)}
          >
            <img src={image.src} alt="" />
          </button>
        ))}
      </div>
      <output className="hk-visually-hidden">
        Фото {active + 1} из {images.length}
      </output>
    </section>
  );
}
