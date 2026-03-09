"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts/new", label: "New Post" },
  { href: "/admin/pull-requests", label: "Pull Requests" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-56 shrink-0 bg-mc-dark text-white flex flex-col h-screen fixed top-0 left-0">
      <div className="px-5 py-6">
        <Link href="/admin" className="text-lg font-bold tracking-tight">
          MC Admin
        </Link>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-6">
        <Link
          href="/"
          className="block px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/60 transition-colors mb-1"
        >
          View Blog
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
