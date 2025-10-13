import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Botón anterior */}
      <Button
        onClick={handlePrev}
        className={`flex items-center gap-1 px-3 py-2 text-[var(--body-md-regular-font-size)] text-[var(--color-text-default-default)] bg-[var(--color-primitives-neutral-100)] hover:bg-[var(--color-primitives-neutral-200)] active:bg-[var(--color-primitives-neutral-300)] disabled:opacity-50`}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
        Anterior
      </Button>

      {/* Números de página */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors
                ${
                  isActive
                    ? "bg-[var(--color-primitives-brand-800)] text-[var(--color-text-inverse-default)] border-transparent"
                    : "bg-white text-[var(--color-text-default-default)] border-[var(--color-border-default-default)] hover:bg-[var(--color-primitives-neutral-100)]"
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Botón siguiente */}
      <Button
        onClick={handleNext}
        className={`flex items-center gap-1 px-3 py-2 text-[var(--body-md-regular-font-size)] text-[var(--color-text-default-default)] bg-[var(--color-primitives-neutral-100)] hover:bg-[var(--color-primitives-neutral-200)] active:bg-[var(--color-primitives-neutral-300)] disabled:opacity-50`}
        disabled={currentPage === totalPages}
      >
        Siguiente
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
