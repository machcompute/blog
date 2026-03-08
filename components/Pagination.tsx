"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  pageSize: number;
}

const PAGE_SIZES = [6, 9, 12];

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  pageSize,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function buildHref(page: number, size: number = pageSize): string {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (size !== 6) params.set("size", String(size));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSize = Number(e.target.value);
    router.push(buildHref(1, newSize));
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <label
          htmlFor="page-size"
          className="text-sm text-mc-gray"
        >
          Show
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={handleSizeChange}
          className="px-3 py-1.5 rounded-full border border-mc-gray/15 bg-white text-sm text-mc-dark focus:outline-none focus:border-mc-lavender/40 transition-colors cursor-pointer"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-mc-gray">per page</span>
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={buildHref(currentPage - 1)}
              className="text-sm font-medium px-4 py-2 rounded-full border border-mc-gray/15 text-mc-gray hover:text-mc-dark hover:border-mc-mint/40 transition-colors"
            >
              Previous
            </Link>
          )}
          {pages.map((page) => (
            <Link
              key={page}
              href={buildHref(page)}
              className={`text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                page === currentPage
                  ? "bg-mc-dark text-white"
                  : "text-mc-gray hover:text-mc-dark hover:bg-mc-dark/5"
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={buildHref(currentPage + 1)}
              className="text-sm font-medium px-4 py-2 rounded-full border border-mc-gray/15 text-mc-gray hover:text-mc-dark hover:border-mc-mint/40 transition-colors"
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
