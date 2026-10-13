import { Link } from "react-router-dom";

export default function ProjectCard({
  title,
  description,
  image,
  liveLink,
  githubLink,
  detailPath,
  tags = [],
  large = false,
  className = "",
}) {
  const btn =
    "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const outline = "border border-ink/25 text-ink hover:bg-ink/5";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl bg-surface ${
        large ? "md:flex-row" : ""
      } ${className}`}
    >
      {image && (
        <div className={`overflow-hidden bg-brand/10 ${large ? "md:w-3/5" : ""}`}>
          <img
            src={image}
            alt={`${title} screenshot`}
            loading="lazy"
            className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <h3
          className={`font-['Bricolage_Grotesque'] font-bold leading-tight text-ink ${
            large ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {title}
        </h3>
        <p className="flex-1 leading-relaxed text-ink/75">{description}</p>

        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t} className="rounded-full bg-wash px-3 py-1 text-sm text-ink">
                {t}
              </li>
            ))}
          </ul>
        )}

        {(detailPath || liveLink || githubLink) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {detailPath && (
              <Link
                to={detailPath}
                className={`${btn} bg-accent text-white hover:bg-[#1F3FC4]`}
              >
                Case study
              </Link>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className={`${btn} ${outline}`}>
                Live demo
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className={`${btn} ${outline}`}>
                View code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}