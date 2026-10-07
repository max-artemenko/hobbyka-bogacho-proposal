import './styles';
import { Icon } from './icon';
export function DocumentCard({
  title,
  description,
  href,
  download = false,
}: {
  title: string;
  description?: string;
  href: string;
  download?: boolean;
}) {
  return (
    <a data-hk="document-card" href={href} download={download || undefined}>
      <Icon name="strk_document-copy" size={28} />
      <span>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <Icon name="arrow-right" />
    </a>
  );
}
