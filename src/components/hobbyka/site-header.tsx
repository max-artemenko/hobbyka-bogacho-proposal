'use client';
import './styles';
import { Logo } from './logo';
import { useId, useState } from 'react';
import { Button } from './button';
import { Search } from './search';
import { Icon } from './icon';
/** Figma 251:8008 / 539:38047: меню на узком экране раскрывается с объявленным состоянием. */
export function SiteHeader({
  logo,
  homeHref = '/',
  links,
  cartHref,
  cartCount = 0,
  favoritesHref,
  onSearch,
}: {
  logo?: string;
  homeHref?: string;
  links: readonly { label: string; href: string }[];
  cartHref: string;
  cartCount?: number;
  favoritesHref: string;
  onSearch: (query: string) => void;
}) {
  const [open, setOpen] = useState(false),
    id = useId();
  return (
    <header data-hk="site-header">
      <div data-hk="site-header-main">
        <a href={homeHref} aria-label="Хоббика — главная">
          {logo ? <img data-hk="logo" src={logo} alt="Хоббика" /> : <Logo />}
        </a>
        <Search onSearch={onSearch} />
        <a href={favoritesHref} data-hk="header-action" aria-label="Избранное">
          <Icon name="filled-favourite" />
          <span>Избранное</span>
        </a>
        <a
          href={cartHref}
          data-hk="header-action"
          aria-label={`Корзина${cartCount > 0 ? ` (${cartCount})` : ''}`}
        >
          <Icon name="filled-cart" />
          <span>Корзина{cartCount > 0 ? ` (${cartCount})` : ''}</span>
        </a>
        <Button
          tone="ghost"
          size="icon"
          aria-label="Меню"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'cross' : 'menu'} />
        </Button>
      </div>
      <nav id={id} data-open={open} aria-label="Основная навигация">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
