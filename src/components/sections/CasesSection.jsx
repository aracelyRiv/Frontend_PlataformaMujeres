// src/components/cases/CasesSection.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/card";
import CaseCard from "../ui/CaseCard";
import Pagination from "../ui/Pagination";
import { getCases } from "../../services/cases";

export default function CasesSection({ title = "Mis Casos", subtitle }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const casesPerPage = 6;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCases()
      .then((data) => {
        if (!mounted) return;
        setCases(data || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError("No se pudieron cargar los casos.");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const start = (currentPage - 1) * casesPerPage;
  const currentCases = cases.slice(start, start + casesPerPage);

  useEffect(() => {
    const pages = Math.ceil(cases.length / casesPerPage) || 1;
    if (currentPage > pages) setCurrentPage(1);
  }, [cases, currentPage]);

  return (
    <div className="w-full">
      <Card className="bg-[var(--card-bg)] p-6">
        {/* Header similar a Desaparecidas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2 card-title">{title}</h1>
            <p className="muted-text">
              {subtitle || "Aquí puedes ver, editar y gestionar tus casos registrados."}
            </p>
          </div>
          <button
            onClick={() => navigate("/agregar-caso")}
            className="btn-primary px-6 py-2.5 whitespace-nowrap self-start sm:self-center"
          >
            + Agregar caso
          </button>
        </div>

        {loading ? (
          <div className="w-full py-12 text-center muted-text">
            Cargando casos...
          </div>
        ) : error ? (
          <div className="w-full py-6 text-center text-red-600">{error}</div>
        ) : cases.length === 0 ? (
          <div className="w-full py-12 text-center">
            <div className="max-w-md mx-auto">
              <p className="text-lg font-medium text-gray-700 mb-2">
                No tienes casos registrados
              </p>
              <p className="text-sm muted-text mb-6">
                Comienza registrando tu primer caso para ayudar en la búsqueda de personas desaparecidas.
              </p>
              <button
                onClick={() => navigate("/agregar-caso")}
                className="btn-primary px-6 py-3"
              >
                Registrar primer caso
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Grid similar a Desaparecidas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-6 items-start">
              {currentCases.map((c) => (
                <CaseCard
                  key={c.id}
                  id={c.id}
                  name={c.nombre}
                  age={c.edad}
                  status={c.estado ?? "Desaparecida"}
                  image={c.imagen}
                  fecha={c.fechaHecho || c.fecha}
                  onView={(id) => navigate(`/caso/${id}`)}
                  onEdit={(id) => navigate(`/editar-caso/${id}`)}
                  onDelete={(id) => console.log("Eliminar caso:", id)}
                />
              ))}
            </div>

            {/* Paginación (oculta si hay 1 sola página) */}
            {cases.length > casesPerPage && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(cases.length / casesPerPage)}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}