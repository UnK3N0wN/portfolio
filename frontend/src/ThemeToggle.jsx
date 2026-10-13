import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable, the choice just won't persist */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-ink/25 px-4 py-2 text-sm font-medium hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}