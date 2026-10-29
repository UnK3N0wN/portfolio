import { useEffect, useState } from "react";

export default function LoadingPanel({ label }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const toWaking = setTimeout(() => setStage(1), 5000);
    const toAlmost = setTimeout(() => setStage(2), 25000);
    return () => {
      clearTimeout(toWaking);
      clearTimeout(toAlmost);
    };
  }, []);

  const stages = [
    {
      title: `Loading ${label}`,
      text: "Connecting to my API. This usually takes just a moment.",
    },
    {
      title: "Waking up the server",
      text: "I host this portfolio on a free server that sleeps when idle, so the first visit can take up to a minute. Thank you for your patience.",
    },
    {
      title: "Almost there",
      text: `The server is starting up. My ${label} will appear here as soon as it's ready.`,
    },
  ];
  const current = stages[stage];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="overflow-hidden rounded-3xl bg-surface p-8 sm:p-10"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
        </span>
        <p className="text-lg font-semibold text-ink">{current.title}</p>
      </div>

      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/75">{current.text}</p>

      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <div className="loading-bar h-full w-1/3 rounded-full bg-accent" />
      </div>

      <p className="mt-6 text-ink/70">
        While you wait,{" "}
        <a href="#about" className="font-semibold text-link hover:underline">
          read a little about me
        </a>{" "}
        or{" "}
        <a href="#contact" className="font-semibold text-link hover:underline">
          get in touch
        </a>
        .
      </p>
    </div>
  );
}