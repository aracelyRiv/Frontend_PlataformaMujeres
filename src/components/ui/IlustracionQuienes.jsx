import React from "react";

/**
 * Ilustración SVG simple, escalable y estilizable con CSS variables.
 * Ajusta colores con --primary-strong y --rosa-claro.
 */
export default function IlustracionQuienes({ className = "w-full h-56", ariaHidden = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 360"
      fill="none"
      role={ariaHidden ? "img" : "presentation"}
      aria-hidden={ariaHidden}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--primary-strong, #7b3f50)" stopOpacity="0.12" />
          <stop offset="1" stopColor="var(--rosa-claro, #f2b8bd)" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      <rect x="16" y="16" rx="18" width="488" height="328" fill="url(#g1)" />
      <g transform="translate(56,48)" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.6">
        <path d="M0 220 C40 120, 180 100, 240 150 S420 260, 520 200" />
      </g>

      {/* Simple figurative elements */}
      <g transform="translate(80,80)">
        <circle cx="60" cy="40" r="28" fill="var(--primary-strong, #7b3f50)" opacity="0.95" />
        <rect x="28" y="88" width="120" height="72" rx="10" fill="#fff" opacity="0.6" />
      </g>

      <g transform="translate(300,120)">
        <circle cx="40" cy="36" r="24" fill="var(--rosa-claro, #f2b8bd)" opacity="0.9" />
        <rect x="12" y="84" width="96" height="56" rx="8" fill="#fff" opacity="0.6" />
      </g>

      <text x="36" y="320" fill="rgba(0,0,0,0.06)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">
        Ilustración generada — Camino al Reencuentro
      </text>
    </svg>
  );
}