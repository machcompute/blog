import Link from "next/link";

interface TagPillProps {
  label: string;
  href: string;
}

export default function TagPill({ label, href }: TagPillProps) {
  return (
    <Link
      href={href}
      className="text-xs font-medium px-2.5 py-1 rounded-full bg-mc-lavender/15 text-mc-dark/70 hover:bg-mc-lavender/25 transition-colors"
    >
      {label}
    </Link>
  );
}
