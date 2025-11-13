
import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import CaseDetailSection from "../components/sections/CaseDetailSection";

export default function AgregarCaso() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={isAuthenticated} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <CaseDetailSection/>
      </main>

      <Footer />
    </div>
  );
}