import './styles';
import { Icon, type IconName } from './icon';
/** Figma 836:39199. Позиционирование внизу экрана оставлено приложению. */
export function MobileNav({
  items,
}: {
  items: readonly {
    label: string;
    href: string;
    icon: IconName;
    active?: boolean;
    count?: number;
  }[];
}) {
  return (
    <nav data-hk="mobile-nav" aria-label="Навигация на телефоне">
      {items.map((item) => (
        <a
          href={item.href}
          key={item.href}
          aria-current={item.active ? 'page' : undefined}
        >
          <span>
            <Icon name={item.icon} />
            {item.count ? <sup>{item.count}</sup> : null}
          </span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
