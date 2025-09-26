import React from "react";
import Button from "../ui/button";
import headerimage2 from "../../assets/headerimage-2.png";

export default function Hero() {
  return (
    <main className="flex w-full items-center justify-center gap-[68px] px-6 py-[42px] bg-rosa-claro">
      {/* Texto principal */}
      <div className="flex flex-col max-w-[620px] gap-6">
        <h2 className="text-lg font-semibold text-black">
          Cada acción cuenta en el camino al reencuentro.
        </h2>

        <h1 className="text-6xl font-bold text-black">
          Plataforma para encontrarlas
        </h1>

        <p className="text-black text-[17px] leading-[27px]">
          Si eres familiar, regístrate para reportar y seguir el caso.
          <br />
          Si has visto a alguien, reporta un avistamiento de forma segura.
        </p>

        <Button className="bg-black text-white px-4 py-2 rounded-lg text-lg w-fit 
        hover:bg-[var(--color-background-neutral-default)] active:bg-[var(--color-background-neutral-default)]">
        Reportar Avistamiento
        </Button>

      </div>

      {/* Imagen */}
      <div className="relative w-[414px] h-[423px]">
        <div className="absolute top-[77px] left-[70px] w-[344px] h-[346px] bg-pink" />
        <div className="absolute top-0 left-0 w-[338px] h-[346px] bg-grey" />
        <img
          className="absolute top-[46px] left-[30px] w-[358px] h-[339px]"
          alt="Header"
          src={headerimage2}
        />
      </div>
    </main>
  );
}
