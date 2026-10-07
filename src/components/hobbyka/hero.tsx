'use client';
import './styles';
import { useState } from 'react';
import { Button } from './button';
import { Icon } from './icon';
/** Figma 63:1324. Без автоматической смены: посетитель успевает прочесть предложение. */
export function Hero({
  slides,
}: {
  slides: readonly {
    title: string;
    text: string;
    image: string;
    href: string;
    action: string;
  }[];
}) {
  const [index, setIndex] = useState(0),
    active = Math.min(index, Math.max(0, slides.length - 1)),
    slide = slides[active];
  if (!slide) return null;
  return (
    <section
      data-hk="hero"
      aria-roledescription="карусель"
      aria-label="Предложения"
    >
      <div>
        <h2>{slide.title}</h2>
        <p>{slide.text}</p>
        <a data-hk="hero-link" href={slide.href}>
          {slide.action}
          <Icon name="arrow-right" />
        </a>
        {slides.length > 1 ? (
          <div data-hk="hero-controls">
            <Button
              tone="outline"
              size="icon"
              aria-label="Предыдущее предложение"
              onClick={() =>
                setIndex((active - 1 + slides.length) % slides.length)
              }
            >
              <Icon name="arrow-left" />
            </Button>
            <output>
              {active + 1} / {slides.length}
            </output>
            <Button
              tone="outline"
              size="icon"
              aria-label="Следующее предложение"
              onClick={() => setIndex((active + 1) % slides.length)}
            >
              <Icon name="arrow-right" />
            </Button>
          </div>
        ) : null}
      </div>
      <img src={slide.image} alt="" />
    </section>
  );
}
