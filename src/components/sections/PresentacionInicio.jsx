import React, { useState } from "react";
import IlustracionQuienes from "../ui/IlustracionQuienes";
import ilustracionSrc from "../../assets/presentacionHome.png"; // opcional: si no existe, el SVG actúa como fallback

export default function PresentacionInicio() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="seccion-presentacion w-full">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-3">
          <div aria-hidden className="hidden md:block absolute top-0 left-0 h-full w-2"
               style={{ background: "linear-gradient(180deg, var(--presentacion-accent), rgba(0,0,0,0))" }} />

          <div className="md:col-span-2 p-8 md:p-12 lg:pl-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Quiénes somos</h2>

            <p className="text-lg leading-7 text-gray-700 max-w-3xl mb-8">
              Somos una plataforma desarrollada con tecnología de inteligencia artificial y
              colaboración ciudadana, que busca apoyar la localización de mujeres desaparecidas
              mediante herramientas seguras, accesibles y centradas en las familias.
            </p>

            <dl className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(0,0,0,0.03)" }}>
                  <svg className="w-5 h-5 text-[var(--primary-strong)]" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-800">Nuestra visión</dt>
                  <dd className="mt-1 text-sm text-gray-600">
                    Ser el puente entre la tecnología, la comunidad y la esperanza.
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(0,0,0,0.03)" }}>
                  <svg className="w-5 h-5 text-[var(--primary-strong)]" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 12s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-800">Nuestra misión</dt>
                  <dd className="mt-1 text-sm text-gray-600">
                    Reunir familias mediante herramientas digitales accesibles y seguras.
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="hidden md:flex items-center justify-center p-6 md:p-8 lg:p-10 md:col-span-1 bg-[color-mix(in srgb,var(--rosa-claro) 6%, white 94%)]">
            <div className="w-full h-80 rounded-md overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 pointer-events-none opacity-85">
                <IlustracionQuienes className="w-full h-full object-cover" ariaHidden={true} />
              </div>

              {!imgError ? (
                <img
                  src={ilustracionSrc}
                  alt="Ilustración Quiénes somos — Camino al Reencuentro"
                  className="relative w-full h-80 object-contain p-4"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  width="420"
                  height="240"
                />
              ) : (
                <div className="relative w-full h-80 flex items-center justify-center" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}