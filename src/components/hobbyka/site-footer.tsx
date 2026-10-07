import './styles';
import { Logo } from './logo';
/** Figma 30:3283 / 539:37479. Содержимое разделов задаётся приложением. */
export function SiteFooter({
  sections,
  phone,
  email,
  logo,
  legal,
}: {
  sections: readonly {
    title: string;
    links: readonly { label: string; href: string }[];
  }[];
  phone: string;
  email: string;
  logo?: string;
  legal?: string;
}) {
  return (
    <footer data-hk="site-footer">
      <div data-hk="footer-columns">
        <div>
          {logo ? <img data-hk="logo" src={logo} alt="Хоббика" /> : <Logo />}
          <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        {sections.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            {section.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      {legal ? <small>{legal}</small> : null}
    </footer>
  );
}
