"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="border border-black text-xs font-bold uppercase px-3 py-1 hover:bg-black hover:text-white"
    >
      Logout
    </button>
  );
}
