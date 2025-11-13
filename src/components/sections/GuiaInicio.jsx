import React from "react";

export default function GuiaInicio() {
  return (
    <section className="seccion-presentacion w-full">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div
            aria-hidden
            className="hidden md:block absolute top-0 left-0 h-full w-2"
            style={{ background: "linear-gradient(180deg, var(--presentacion-accent), rgba(0,0,0,0))" }}
          />

          <div className="p-8 md:p-12 lg:pl-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Cómo puedes ayudar
            </h2>

            <p className="text-lg leading-7 text-gray-700 max-w-3xl mb-8">
               Tu participación puede hacer la diferencia. Sigue estos pasos para colaborar de forma segura y efectiva:
            </p>

            <ol className="grid gap-6">
              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-[var(--primary-strong)] text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Observa con atención</h3>
                  <p className="text-sm text-gray-600">
                    Si ves a una persona que podría estar desaparecida, no la enfrentes directamente.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-[var(--primary-strong)] text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Usa la herramienta de reconocimiento facial</h3>
                  <p className="text-sm text-gray-600">
                    Sube una foto (siempre con respeto y discreción). El sistema comparará la imagen con los casos registrados.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-[var(--primary-strong)] text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Si hay coincidencia, reporta</h3>
                  <p className="text-sm text-gray-600">
                    Se abrirá automáticamente un formulario con los datos del caso para que envíes detalles del avistamiento (lugar, hora, situación).
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-[var(--primary-strong)] text-white flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Confirma tu envío</h3>
                  <p className="text-sm text-gray-600">
                    Tu reporte será revisado por el equipo antes de alertar a las autoridades o familiares.
                  </p>
                </div>
              </li>
            </ol>

            <footer className="mt-6 text-sm text-gray-600">
              <p>
                 Toda la información es tratada con confidencialidad y conforme a la Ley N.º 29733 de Protección de Datos Personales.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}