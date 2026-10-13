import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "./useApi";
import ThemeToggle from "./ThemeToggle";

const DISPLAY = "font-['Bricolage_Grotesque']";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error } = useApi(`/api/projects/${id}/`, null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} | Blesson Reji`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  const outline = "rounded-full border border-ink/25 px-6 py-3 font-semibold hover:bg-ink/5";

  return (
    <div className="min-h-screen bg-page font-['Figtree'] text-ink">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/#projects" className="font-medium text-link hover:underline">
          Back to projects
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {loading && <div aria-busy="true" className="h-96 animate-pulse rounded-3xl bg-ink/10" />}

        {error && (
          <p role="alert" className="rounded-2xl bg-red-50 p-5 text-red-800 dark:bg-red-950/60 dark:text-red-200">
            {error.includes("404")
              ? "This project doesn't exist. Go back and pick one from the list."
              : `Couldn't load this project: ${error}.`}
          </p>
        )}

        {project && (
          <>
            <h1 className={`${DISPLAY} text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl`}>
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/75">{project.description}</p>

            {project.tech_list?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tech_list.map((t) => (
                  <li key={t} className="rounded-full bg-wash px-3.5 py-1 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {project.live_demo_link && (
                <a
                  href={project.live_demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-[#1F3FC4]"
                >
                  Live demo
                </a>
              )}
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className={outline}>
                  View code
                </a>
              )}
            </div>

            {project.image && (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="mt-12 w-full rounded-3xl object-cover shadow-xl"
              />
            )}

            <div className="mt-16 grid gap-12 md:grid-cols-2">
              {project.problem && (
                <section>
                  <h2 className={`${DISPLAY} text-3xl font-bold`}>The problem</h2>
                  <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/80">{project.problem}</p>
                </section>
              )}
              {project.approach && (
                <section>
                  <h2 className={`${DISPLAY} text-3xl font-bold`}>How I built it</h2>
                  <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/80">{project.approach}</p>
                </section>
              )}
            </div>

            {project.images?.length > 0 && (
              <section className="mt-20">
                <h2 className={`${DISPLAY} text-3xl font-bold sm:text-4xl`}>Project walkthrough</h2>
                <ol className="mt-10 space-y-20">
                  {project.images.map((img, i) => (
                    <li key={img.id}>
                      <article>
                        <div className="flex gap-5">
                          <span className={`${DISPLAY} text-4xl font-extrabold text-link`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="max-w-3xl">
                            {img.title && <h3 className={`${DISPLAY} text-2xl font-bold sm:text-3xl`}>{img.title}</h3>}
                            {img.description && (
                              <p className="mt-2 whitespace-pre-line text-lg leading-relaxed text-ink/80">
                                {img.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <img
                          src={img.image}
                          alt={img.title || `${project.title} screenshot ${i + 1}`}
                          loading="lazy"
                          className="mt-6 w-full rounded-3xl shadow-xl"
                        />
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}