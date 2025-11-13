import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import EstadisticasPublicasSection from "../components/sections/EstadisticasPublicasSection";

export default function EstadisticasPublicas() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <EstadisticasPublicasSection />
      </main>
      <Footer />
    </div>
  );
}
