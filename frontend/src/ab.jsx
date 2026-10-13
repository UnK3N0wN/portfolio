import ContactForm from "./ContactForm";

const DISPLAY = "font-['Bricolage_Grotesque']";

const TOOLKIT = [
  { label: "Languages", items: ["JavaScript", "Python", "SQL"] },
  {
    label: "Frameworks & libraries",
    items: ["React", "HTML", "Django", "Django REST Framework", "Tailwind CSS"],
  },
  { label: "Databases & tools", items: ["Postgresql", "SQLite3", "Git & GitHub", "Postman", "Docker"] },
];

const LOOKING_FOR = [
  {
    title: "Full-time and internship roles",
    text: "Software Engineer, Frontend or Backend Developer, Associate System Engineer.",
  },
  {
    title: "Collaboration",
    text: "Open-source projects, hackathons, and building production-ready apps from scratch.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <h2 className={`${DISPLAY} mb-12 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl`}>About</h2>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-ink/80">
            I'm a BCA graduate looking for an entry-level Software Engineer or Web
            Developer role. I like turning concepts into clean, functional, and
            productive software.
          </p>

          <h3 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wide text-brand">
            What I'm looking for
          </h3>
          <ul className="space-y-4">
            {LOOKING_FOR.map((item) => (
              <li key={item.title} className="border-l-2 border-[#F2C94C] pl-4">
                <p className="font-medium text-ink">{item.title}</p>
                <p className="text-sm text-ink/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand">
            Technical toolkit
          </h3>
          <dl className="space-y-6">
            {TOOLKIT.map((group) => (
              <div key={group.label}>
                <dt className="mb-2 text-sm text-ink/65">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-full bg-brand/10 px-3 py-1 text-sm text-brand">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const link =
    "rounded-full border border-ink/25 px-6 py-3 font-semibold text-ink hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className={`${DISPLAY} text-4xl font-extrabold tracking-tight text-ink sm:text-6xl`}>Contact</h2>
          <p className="mt-4 max-w-md text-lg text-ink/70">
            Send me a message here, or find me on LinkedIn or GitHub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:itsbless24@gmail.com" className={link}>
              Mail me
            </a>
            <a href="https://www.linkedin.com/in/dev-blesson24/" target="_blank" rel="noopener noreferrer" className={link}>
              LinkedIn
            </a>
            <a href="https://github.com/UnK3N0wN" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}