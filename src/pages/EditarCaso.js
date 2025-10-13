import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import CaseEditSection from "../components/sections/CaseEditSection";

export default function EditarCaso() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={true} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <CaseEditSection />
      </main>

      <Footer />
    </div>
  );
}