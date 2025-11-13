import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AvistamientoDetailSection from "../components/sections/AvistamientoDetailSection";

export default function VerDetalleAvistamiento() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={true} />

      <main className="flex-1 w-full px-6 py-8">
        <AvistamientoDetailSection />
      </main>

      <Footer />
    </div>
  );
}
