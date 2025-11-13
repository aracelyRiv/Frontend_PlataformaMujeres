import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ConfiguracionSection from "../components/sections/ConfiguracionSection";

export default function Configuracion() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <ConfiguracionSection />
      </main>

      <Footer />
    </div>
  );
}
