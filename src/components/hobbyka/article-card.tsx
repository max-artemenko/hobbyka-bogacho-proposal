import './styles';
/** Figma 1301:52326 и 1301:54286: одна публикация в широком и узком контейнере. */
export function ArticleCard({
  title,
  description,
  date,
  image,
  href,
}: {
  title: string;
  description: string;
  date?: string;
  image: string;
  href: string;
}) {
  return (
    <article data-hk="article-card">
      <div>
        {date ? <small>{date}</small> : null}
        <h3>
          <a href={href}>{title}</a>
        </h3>
        <p>{description}</p>
      </div>
      <img src={image} alt="" loading="lazy" />
    </article>
  );
}
