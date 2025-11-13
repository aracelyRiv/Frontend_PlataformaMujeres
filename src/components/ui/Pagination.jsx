import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function buildPages(total, current, maxVisible = 7) {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  const side = Math.floor((maxVisible - 3) / 2); // espacio para first, last y dos ellipsis
  let start = Math.max(2, current - side);
  let end = Math.min(total - 1, current + side);

  if (current - 1 <= side) {
    start = 2;
    end = maxVisible - 2;
  } else if (total - current <= side) {
    start = total - (maxVisible - 3);
    end = total - 1;
  }

  pages.push(1);
  if (start > 2) pages.push("left-ellipsis");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("right-ellipsis");
  pages.push(total);

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = buildPages(totalPages, currentPage, 7);

  const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <nav className="flex items-center justify-center gap-3 mt-6" aria-label="Paginación">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          p === "left-ellipsis" || p === "right-ellipsis" ? (
            <span key={p + idx} className="px-3 py-2 text-sm text-gray-500">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`min-w-[36px] h-9 px-3 flex items-center justify-center text-sm font-medium rounded-lg transition-all
                ${
                  p === currentPage
                    ? "bg-gradient-to-r from-[#9a5071] to-[#c2789d] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Página siguiente"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
