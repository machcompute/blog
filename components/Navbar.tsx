import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/blog", label: "Blog", external: false },
  { href: "/tags", label: "Tags", external: false },
  { href: "/categories", label: "Categories", external: false },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-mc-gray/15">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="https://machcomputing.com" className="flex items-center gap-3">
            <Image src="/logo.png" alt="MC" width={36} height={36} />
            <Image
              src="/text_logo.png"
              alt="Mach Computing"
              width={160}
              height={20}
              className="hidden sm:block h-auto"
            />
          </a>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mc-gray hover:text-mc-dark transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mc-gray hover:text-mc-dark transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
