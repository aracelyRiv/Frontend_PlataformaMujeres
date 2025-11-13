import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import FacialRecognitionSection from "../components/sections/FacialRecognitionSection";

export default function ReconocimientoFacial() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <FacialRecognitionSection />
      </main>
      <Footer />
    </div>
  );
}