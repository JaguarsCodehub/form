"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error ?? "Unable to authenticate.");
      }

      const redirectTo = searchParams.get("from") ?? "/admin";
      router.replace(redirectTo);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl"
      >
        <h1 className="text-2xl font-sans font-semibold tracking-tight">Admin access</h1>
        <p className="mt-2 text-sm font-sans text-zinc-500">Enter the shared password to continue.</p>

        <label className="mt-8 flex flex-col gap-2 text-sm font-sans font-medium">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-xl border border-zinc-200 px-4 py-3 text-base font-sans font-normal outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          />
        </label>

        <button
          type="submit"
          disabled={!password.trim() || status === "loading"}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-sans font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          <span className="font-sans">{status === "loading" ? "Signing in..." : "Unlock dashboard"}</span>
        </button>

        {status === "error" && message && <p className="mt-4 text-sm font-sans text-red-600">{message}</p>}
      </form>
    </div>
  );
}

