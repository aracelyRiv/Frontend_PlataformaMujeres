
import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import CasesSection from "../components/sections/CasesSection";

export default function MisCasos() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={true} />      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <CasesSection />
      </main>

      <Footer />
    </div>
  );
}