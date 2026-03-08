import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/tags", label: "Tags" },
  { href: "/categories", label: "Categories" },
];

const connectLinks = [
  { href: "https://scholar.google.com/citations?user=BgSpSB0AAAAJ", label: "Google Scholar" },
  { href: "https://github.com/LukasAfonso", label: "GitHub" },
  { href: "https://www.linkedin.com/in/lu%C3%ADs-carlos-casanova-afonso-8415521b2", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-mc-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="MC" width={32} height={32} />
              <span className="font-bold text-lg tracking-tight">
                Mach Computing
              </span>
            </div>
            <p className="mt-3 text-white/50 text-sm max-w-xs">
              Articles on AI/ML, algorithms, data structures, and programming.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                Connect
              </h4>
              <ul className="space-y-2">
                {connectLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/30">
          &copy; {new Date().getFullYear()} Mach Computing. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
