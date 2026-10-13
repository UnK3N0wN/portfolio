import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import useApi from "./useApi";
import About, { Contact } from "./About";
import ThemeToggle from "./ThemeToggle";

const NAME = "Blesson Reji";
const BRAND = "My Portfolio"
const DISPLAY = "font-['Bricolage_Grotesque']";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  const linkClass = (href) =>
    `font-medium underline-offset-8 hover:text-link ${
      active === href.slice(1) ? "text-link underline decoration-2" : "text-ink/75"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-page/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#home" className={`${DISPLAY} text-xl font-bold text-ink`}>
          {BRAND}
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.slice(0, 3).map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href.slice(1) ? "location" : undefined}
                className={linkClass(l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <a href="#contact" className="rounded-full bg-accent px-5 py-2 font-semibold text-white hover:bg-[#1F3FC4]">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="rounded-full border border-ink/25 px-4 py-2 text-sm font-medium"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="px-6 pb-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

/* Hero: the same project as the server sends it, and as the visitor sees it */
function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl scroll-mt-20 px-6 pb-20 pt-10 md:pt-20">
      <h1 className={`${DISPLAY} text-[clamp(3.5rem,11vw,10rem)] font-extrabold leading-[0.9] tracking-tight text-ink`}>
        {NAME}
      </h1>
      <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink/75 sm:text-2xl">
        BCA graduate building full-stack web apps with Django on the backend and React on the frontend.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="rounded-full bg-accent px-7 py-3.5 font-semibold text-white hover:bg-[#1F3FC4]">
          See my projects
        </a>
        <a href="#contact" className="rounded-full border border-ink/30 px-7 py-3.5 font-semibold hover:bg-ink/5">
          Contact me
        </a>
        <a
          href="/resume.pdf"
          download="Blesson-Reji-Resume.pdf"
          className="rounded-full border border-ink/30 px-7 py-3.5 font-semibold hover:bg-ink/5"
        >
          Download resume
        </a>
      </div>

      <div className="mt-16 grid overflow-hidden rounded-3xl shadow-xl md:grid-cols-2">
        <div className="bg-[#0C3B2E] p-6 text-[#EDF2F5] sm:p-10">
          <p className="mb-5 text-lg font-semibold">Django sends</p>
          <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-[#EDF2F5]/90">
{`GET /api/projects/?featured=true

{
  "title": "Learning Management System",
  "is_featured": true,
  "live_demo_link": "https://…",
  "github_link": "https://github.com/…"
}`}
          </pre>
        </div>
        <div className="bg-wash p-6 sm:p-10">
          <p className="mb-5 text-lg font-semibold text-ink">React shows</p>
          <div className="rounded-2xl bg-surface p-6 shadow-lg">
            <h2 className={`${DISPLAY} text-2xl font-bold text-ink`}>Learning Management System</h2>
            <p className="mt-2 text-ink/70">Courses, lessons, and progress tracking in one place.</p>
            <div className="mt-5 flex gap-3">
              <span className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white">Live demo</span>
              <span className="rounded-full border border-ink/25 px-5 py-2 text-sm font-semibold">View code</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2 className={`${DISPLAY} text-4xl font-extrabold tracking-tight text-ink sm:text-6xl`}>{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink/70">{subtitle}</p>}
    </div>
  );
}

function SectionState({ loading, error, isEmpty, emptyText, children }) {
  if (loading) {
    return (
      <div className="grid gap-8 lg:grid-cols-2" aria-busy="true">
        {[0, 1].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-3xl bg-ink/10" />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <p role="alert" className="rounded-2xl bg-red-50 p-5 text-red-800 dark:bg-red-950/60 dark:text-red-200">
        Couldn't load this section: {error}.
      </p>
    );
  }
  if (isEmpty) return <p className="text-lg text-ink/70">{emptyText}</p>;
  return children;
}

function FeaturedProjects() {
  const { data: projects, loading, error } = useApi("/api/projects/?featured=true");
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <SectionHeading title="Featured projects" subtitle="Things I've designed, built, and deployed." />
      <SectionState
        loading={loading}
        error={error}
        isEmpty={projects.length === 0}
        emptyText="No featured projects yet. Mark a project as featured in the Django admin."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              description={p.description}
              image={p.image}
              liveLink={p.live_demo_link}
              githubLink={p.github_link}
              detailPath={`/projects/${p.id}`}
              tags={p.tech_list}
              large={i === 0}
              className={i === 0 ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      </SectionState>
    </section>
  );
}

function GitHubRepos() {
  const { data: repos, loading, error } = useApi("/api/github-repos/");
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading title="More on GitHub" subtitle="Public repositories, pulled live from the GitHub API." />
      <SectionState
        loading={loading}
        error={error}
        isEmpty={repos.length === 0}
        emptyText="No public repositories found."
      >
        <ul className="divide-y divide-ink/15 border-y border-ink/15">
          {repos.map((r) => (
            <li
              key={r.id}
              className="grid gap-2 py-6 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
            >
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${DISPLAY} break-words text-xl font-bold text-ink hover:text-link sm:text-2xl`}
              >
                {r.name}
              </a>
              <p className="text-ink/70">{r.description || "No description provided."}</p>
              <p className="whitespace-nowrap text-sm text-ink/70 sm:text-right">
                {r.language || "Mixed"} · ★ {r.stargazers_count}
              </p>
            </li>
          ))}
        </ul>
      </SectionState>
    </section>
  );
}

export default function Portfolio() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView();
  }, [hash]);

  return (
    <div className="min-h-screen bg-page font-['Figtree'] text-ink">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects />
        <GitHubRepos />
        <About />
        <Contact />
      </main>
      <footer className="mx-auto max-w-7xl px-6 py-10 text-ink/60">
        © {new Date().getFullYear()} {NAME}
      </footer>
    </div>
  );
}