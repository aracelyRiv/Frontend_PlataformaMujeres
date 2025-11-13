import React from "react";
import Button from "../ui/button";
import PresentacionInicio from "./PresentacionInicio";
import GuiaInicio from "./GuiaInicio"; // <-- NUEVO
import headerimage2 from "../../assets/headerimage-2.png";

export default function HeroInicio() {
  return (
    <>
      <main className="flex w-full items-center justify-between gap-8 px-6 py-16 md:py-[64px] bg-rosa-claro">
        {/* Texto principal */}
        <div className="flex flex-col max-w-[720px] gap-6">
          <p className="text-base font-medium text-gray-800">
            Cada acción cuenta en el camino al reencuentro.
          </p>

          <h1 className="text-4xl md:text-6xl leading-tight font-extrabold text-gray-900">
            Plataforma para encontrarlas
          </h1>

          <p className="text-base md:text-lg text-gray-700 max-w-xl">
            Si eres familiar, regístrate para reportar y seguir el caso.
            <br />
            Si has visto a alguien, reporta un avistamiento de forma segura.
          </p>

          <div>
            <Button
              aria-label="Reportar avistamiento"
              className={
                "inline-flex items-center gap-3 bg-[var(--primary-strong)] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg " +
                "hover:brightness-95 active:brightness-90 transition-colors duration-150 focus:outline-none " +
                "focus:ring-4 focus:ring-[color-mix(in srgb,var(--primary-strong) 18%, white 82%)]"
              }
            >
              Reportar Avistamiento
            </Button>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative hidden md:block w-[420px] h-[420px]">
          <div className="absolute top-[86px] left-[78px] w-[344px] h-[346px] bg-[rgba(199,90,129,0.08)] rounded-sm" />
          <div className="absolute top-0 left-0 w-[338px] h-[346px] bg-white rounded-sm shadow-sm" />
          <img
            className="absolute top-[46px] left-[30px] w-[358px] h-[339px] object-cover rounded-sm"
            alt="Header"
            src={headerimage2}
          />
        </div>
      </main>

      {/* Sección "Quiénes somos" reutilizable */}
      <PresentacionInicio />

      {/* Sección "Cómo puedes ayudar" — añadida debajo */}
      <GuiaInicio />
    </>
  );
}
