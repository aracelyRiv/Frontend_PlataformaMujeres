import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import PerfilSection from "../components/sections/PerfilSection";

export default function Perfil() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <PerfilSection />
      </main>

      <Footer />
    </div>
  );
}
