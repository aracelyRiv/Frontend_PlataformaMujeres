import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import DesaparecidaFilters from "../components/filters/DesaparecidaFilters";
import DesaparecidasCaseSection from "../components/sections/DesaparecidasCaseSection";
import { getCases } from "../services/cases";

export default function Desaparecidas() {
  const [filters, setFilters] = useState({});
  const [minFecha, setMinFecha] = useState("2023-01-01");
  const [maxFecha, setMaxFecha] = useState("2025-12-31");
  const [availableYears, setAvailableYears] = useState(["2023", "2024", "2025"]);

  useEffect(() => {
    getCases().then((data) => {
      // Solo casos desaparecidos
      const desaparecidas = (data || []).filter(c => c.estado === "desaparecida");
      // Extraer fechas reales
      const fechas = desaparecidas
        .map(c => c.fechaHecho || c.fecha)
        .filter(Boolean)
        .sort();
      if (fechas.length) {
        setMinFecha(fechas[0]);
        setMaxFecha(fechas[fechas.length - 1]);
      }
      // Extraer años únicos
      const years = Array.from(
        new Set(
          fechas.map(f => String(f).slice(0, 4))
        )
      );
      setAvailableYears(years);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--rosa-claro)]">
      <Navbar isAuthenticated={false} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex gap-8">
          {/* Filtros a la izquierda */}
          <div className="w-full max-w-xs">
            <DesaparecidaFilters
              filters={filters}
              onChange={setFilters}
              minFecha={minFecha}
              maxFecha={maxFecha}
              availableYears={availableYears}
            />
          </div>
          {/* Lista de casos a la derecha */}
          <div className="flex-1">
            <DesaparecidasCaseSection filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}