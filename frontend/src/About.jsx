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

const CONTACT = {
  email: "itsbless24@gmail.com",
  linkedin: "https://www.linkedin.com/in/dev-blesson24/",
  github: "https://github.com/UnK3N0wN/",
  location: "Bengaluru, India",
};
 
const display = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
 
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
 
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" {...strokeProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
 
const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" {...strokeProps}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
 
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
 
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
 
function ContactCard({ icon, label, value, href, newTab = true }) {
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-5 rounded-2xl bg-surface p-5 transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-link">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold uppercase tracking-wide text-ink/60">{label}</span>
        <span className="block break-words text-lg font-medium text-ink">{value}</span>
      </span>
    </a>
  );
}
 
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <h2 className={`${DISPLAY} text-4xl font-extrabold tracking-tight text-ink sm:text-6xl`}>Contact</h2>
      <p className="mt-4 max-w-xl text-lg text-ink/70">
        Tap a card to open my email, LinkedIn, GitHub, or map location, or send a message with the form.
      </p>
 
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <ContactCard
            icon={<MailIcon />}
            label="Email"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            newTab={false}
          />
          <ContactCard icon={<LinkedInIcon />} label="LinkedIn" value={display(CONTACT.linkedin)} href={CONTACT.linkedin} />
          <ContactCard icon={<GitHubIcon />} label="GitHub" value={display(CONTACT.github)} href={CONTACT.github} />
          <ContactCard
            icon={<PinIcon />}
            label="Location"
            value={CONTACT.location}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.location)}`}
          />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}