"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}

