import React, { useEffect, useState } from "react";
import DesaparecidaCaseCard from "../ui/DesaparecidaCaseCard";
import Card from "../ui/card";
import Pagination from "../ui/Pagination";
import { getCases } from "../../services/cases";
import { useNavigate } from "react-router-dom";

export default function DesaparecidasCaseSection({ filters }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCases()
      .then((data) => {
        if (!mounted) return;
        setCases(data || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError("No se pudieron cargar los casos.");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  // FILTRO AVANZADO (incluye estado si está en filters)
  const filteredCases = cases.filter((c) => {
    // Estado (opcional): "todos" | "desaparecida" | "encontrada"
    if (filters.estado && filters.estado !== "todos" && c.estado !== filters.estado) return false;
    // Nombre
    if (filters.nombre && !c.nombre?.toLowerCase().includes(filters.nombre.toLowerCase())) return false;
    // Edad (rango)
    if (filters.edad && (c.edad < filters.edad[0] || c.edad > filters.edad[1])) return false;
    // Nacionalidad
    if (filters.nacionalidad && c.paisNacimiento && c.paisNacimiento !== filters.nacionalidad) return false;
    // Distrito
    if (filters.distrito && c.distrito && c.distrito !== filters.distrito) return false;
    // Fecha (rango)
    if (filters.fecha) {
      const fechaCaso = c.fechaHecho || c.fecha;
      if (fechaCaso) {
        if (fechaCaso < filters.fecha[0] || fechaCaso > filters.fecha[1]) return false;
      }
    }
    // Año (selección múltiple)
    if (filters.anios && filters.anios.length > 0) {
      const fechaCaso = c.fechaHecho || c.fecha;
      if (fechaCaso) {
        const year = String(fechaCaso).slice(0, 4);
        if (!filters.anios.includes(year)) return false;
      }
    }
    return true;
  });

  const start = (currentPage - 1) * casesPerPage;
  const currentCases = filteredCases.slice(start, start + casesPerPage);

  return (
    <Card className="bg-[var(--card-bg)] p-6">
      <h1 className="text-2xl font-bold mb-2 card-title">Casos</h1>
      <p className="mb-6 muted-text">Lista de casos (desaparecidas y encontradas). Usa los filtros para refinar la búsqueda.</p>

      {loading ? (
        <div className="w-full py-12 text-center text-[var(--muted)]">Cargando casos...</div>
      ) : error ? (
        <div className="w-full py-6 text-center text-red-600">{error}</div>
      ) : filteredCases.length === 0 ? (
        <div className="w-full py-6 text-center text-[var(--muted)]">No hay casos para los filtros seleccionados.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-6 items-start">
            {currentCases.map((c) => (
              <DesaparecidaCaseCard
                key={c.id}
                id={c.id}
                name={c.nombre}
                age={c.edad}
                image={c.imagen}
                fecha={c.fechaHecho || c.fecha}
                onView={(id) => navigate(`/caso/${id}`)}
                /* onReport removido: en esta vista sólo hay botón "Ver" */
              />
            ))}
          </div>

          {filteredCases.length > casesPerPage && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredCases.length / casesPerPage)}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
}