import React, { useEffect, useState } from "react";
import DesaparecidaCaseCard from "../ui/DesaparecidaCaseCard";
import Card from "../ui/card";
import Pagination from "../ui/Pagination";
import { getCases } from "../../services/cases";
import { useNavigate } from "react-router-dom";

export default function EncontradasCaseSection({ filters }) {
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
        setCases((data || []).filter((c) => c.estado === "encontrada"));
      })
      .catch(() => {
        if (!mounted) return;
        setError("No se pudieron cargar los casos.");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const filteredCases = cases.filter((c) => {
    if (filters.nombre && !c.nombre?.toLowerCase().includes(filters.nombre.toLowerCase())) return false;
    if (filters.edad && (c.edad < filters.edad[0] || c.edad > filters.edad[1])) return false;
    if (filters.nacionalidad && c.paisNacimiento && c.paisNacimiento !== filters.nacionalidad) return false;
    return true;
  });

  const start = (currentPage - 1) * casesPerPage;
  const currentCases = filteredCases.slice(start, start + casesPerPage);

  return (
    <Card className="bg-[var(--card-bg)] p-6">
      <h1 className="text-2xl font-bold mb-2 card-title">Casos de Mujeres Encontradas</h1>
      <p className="mb-6 muted-text">Aquí puedes ver los casos reportados como encontradas.</p>

      {loading ? (
        <div className="w-full py-12 text-center text-[var(--muted)]">Cargando casos...</div>
      ) : error ? (
        <div className="w-full py-6 text-center text-red-600">{error}</div>
      ) : filteredCases.length === 0 ? (
        <div className="w-full py-6 text-center text-[var(--muted)]">No hay casos encontrados.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6 items-start">
            {currentCases.map((c) => (
              <DesaparecidaCaseCard
                key={c.id}
                id={c.id}
                name={c.nombre}
                age={c.edad}
                image={c.imagen}
                fecha={c.fechaHecho || c.fecha}
                onView={(id) => navigate(`/caso/${id}`)}
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