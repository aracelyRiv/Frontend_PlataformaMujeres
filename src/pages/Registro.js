
import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import RegistroForm from "../components/forms/registroForm";

export default function Registro() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* HEADER */}
      <Navbar />

      {/* MAIN */}
      <main
        role="main"
        className="flex flex-1 bg-rosa-claro justify-center items-center px-10 py-10 flex-col md:flex-row overflow-y-auto"
      >
        {/* Texto de bienvenida */}
        <section className="flex flex-col justify-center items-start gap-6 max-w-md mr-20">
          <h1 className="text-6xl font-bold text-black">¡Crea tu cuenta!</h1>
          <p className="text-lg text-gray-700">
            Este acceso es exclusivo para familiares o personas cercanas que
            reportan casos de mujeres desaparecidas.
          </p>
        </section>

        {/* Formulario */}
        <RegistroForm />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
