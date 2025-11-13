import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AvistamientosSection from "../components/sections/AvistamientosSection";

const userId = localStorage.getItem("userId") || 1;

export default function Avistamientos() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={true} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <AvistamientosSection userId={userId} />
      </main>

      <Footer />
    </div>
  );
}