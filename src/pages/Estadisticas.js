import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import EstadisticasSection from "../components/sections/EstadisticasSection";

export default function Estadisticas() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <EstadisticasSection />
      </main>
      <Footer />
    </div>
  );
}
