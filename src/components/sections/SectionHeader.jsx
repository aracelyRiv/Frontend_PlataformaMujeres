import React from "react";
import Button from "../ui/button";
import { Plus } from "lucide-react";

export default function SectionHeader({ title, subtitle, onAction, actionLabel }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Bloque de títulos */}
      <div>
        <h2
          className="font-semibold text-[var(--h2-font-size)] text-[var(--color-text-default-default)]"
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-[var(--body-md-regular-font-size)] text-[var(--color-text-default-tertiary)]"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Acción opcional */}
      {onAction && (
        <Button
        onClick={onAction}
        className="flex items-center gap-1 bg-black text-white text-sm leading-none px-4 py-3 rounded-lg hover:bg-[var(--color-background-neutral-default)] active:bg-[var(--color-background-neutral-default)]"
        >
        <Plus size={14} className="shrink-0" />
        <span className="whitespace-nowrap">{actionLabel}</span>
        </Button>
      )}
    </div>
  );
}
