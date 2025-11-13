import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[var(--footer-bg,#fff)] border-t"
      style={{
        borderColor: "var(--footer-border)",
        color: "var(--footer-text)",
      }}
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* reduced vertical padding and tighter gaps to lower footprint */}
      <div className="max-w-6xl mx-auto px-6 py-3 md:py-4 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-2">
        {/* Claim / Marca */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--footer-claim)" }}
          >
            Unidas por la búsqueda y la esperanza.
          </p>
        </div>

        {/* Copyright (centrado en desktop) */}
        <div className="w-full md:w-1/3 text-center">
          <p className="text-sm" style={{ color: "var(--footer-text)" }}>
            © {year} Camino al Reencuentro — Todos los derechos reservados.
          </p>
        </div>

        {/* Enlaces */}
        <nav
          aria-label="Enlaces de pie de página"
          className="w-full md:w-1/3 flex items-center justify-center md:justify-end"
        >
          <ul role="list" className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <a
                href="/terminos"
                className="px-2 py-1 rounded"
                style={{ color: "var(--footer-text)" }}
              >
                Términos
              </a>
            </li>

            <li className="text-[rgba(0,0,0,0.08)] select-none px-1" aria-hidden>
              │
            </li>

            <li>
              <a
                href="/privacidad"
                className="px-2 py-1 rounded"
                style={{ color: "var(--footer-text)" }}
              >
                Privacidad
              </a>
            </li>

            <li className="text-[rgba(0,0,0,0.08)] select-none px-1" aria-hidden>
              │
            </li>

            <li>
              <a
                href="/contacto"
                className="ml-1 inline-flex items-center gap-2 px-3 py-1 rounded-md"
                style={{
                  background: "var(--primary-strong)",
                  color: "#fff",
                }}
                aria-label="Contacto — abrir formulario de contacto"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

