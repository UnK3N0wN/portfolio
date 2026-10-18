import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Page not found | Blesson Reji";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center bg-page px-6 font-['Figtree'] text-ink">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-['Bricolage_Grotesque'] text-8xl font-extrabold tracking-tight">404</p>
        <p className="mt-4 text-xl text-ink/75">That page doesn't exist.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 font-semibold text-white hover:bg-[#1F3FC4]"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}