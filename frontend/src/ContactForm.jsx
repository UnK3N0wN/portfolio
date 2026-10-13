import { useState } from "react";
import { API_URL } from "./useApi";

const field =
  "w-full rounded-xl border border-ink/20 bg-surface px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (res.status === 429) {
        throw new Error("You've sent several messages recently. Please try again in an hour.");
      }
      if (!res.ok) {
        throw new Error("Please check your name, email, and message, then try again.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Couldn't reach the server. Please try again in a moment."
          : err.message
      );
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block font-medium">
          Your name
        </label>
        <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          Your email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} maxLength={2000} className={field} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-accent px-7 py-3.5 font-semibold text-white hover:bg-[#1F3FC4] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p role="status" className="rounded-xl bg-brand/10 p-4 text-brand">
          Message sent. I'll reply by email.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800 dark:bg-red-950/60 dark:text-red-200">
          {error}
        </p>
      )}
    </form>
  );
}