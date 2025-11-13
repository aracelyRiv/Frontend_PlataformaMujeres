import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AvistamientoForm from "../components/forms/AvistamientoForm";

export default function ReportarAvistamiento() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={false} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <AvistamientoForm />
      </main>

      <Footer />
    </div>
  );
}