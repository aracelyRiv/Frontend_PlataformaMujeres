import React, { useState } from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import EncontradasFilters from "../components/filters/EncontradasFilters";
import EncontradasCaseSection from "../components/sections/EncontradasCaseSection";

export default function Encontradas() {
  const [filters, setFilters] = useState({});
  const minEdad = 0;
  const maxEdad = 100;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={false} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex gap-8">
          <div className="w-full max-w-xs">
            <EncontradasFilters
              filters={filters}
              onChange={setFilters}
              minEdad={minEdad}
              maxEdad={maxEdad}
            />
          </div>

          <div className="flex-1">
            <EncontradasCaseSection filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}