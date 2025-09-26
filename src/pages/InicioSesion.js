
import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import InicioSesionForm from "../components/forms/inicioSesionForm";

export default function InicioSesion() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* HEADER */}
      <Navbar />

      {/* MAIN */}
      <main role="main"
            className="flex flex-1 bg-rosa-claro justify-center items-center px-10 flex-col md:flex-row">
        {/* Texto de bienvenida */}
        <section className="flex flex-col items-start gap-6 max-w-md mr-20">
          <h1 className="text-6xl font-bold text-black">¡Bienvenido!</h1>
          <p className="text-lg text-gray-700">
            Si eres familiar y ya registraste un caso, accede desde aquí.
          </p>
        </section>

        {/* Formulario */}
        <InicioSesionForm />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
