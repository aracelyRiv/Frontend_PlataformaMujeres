// src/components/cases/CasesSection.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/card";
import SectionHeader from "../sections/SectionHeader";
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
      <Card className="bg-[var(--color-background-default-default)] p-[var(--size-space-600)]">
        <SectionHeader
          title={title}
          subtitle={subtitle || "Aquí puedes ver, registrar y gestionar tus casos."}
          actionLabel="Agregar caso"
          onAction={() => navigate("/agregar-caso")}
        />

        {loading ? (
          <div className="w-full py-12 text-center text-[var(--color-text-default-tertiary)]">
            Cargando casos...
          </div>
        ) : error ? (
          <div className="w-full py-6 text-center text-red-600">{error}</div>
        ) : cases.length === 0 ? (
          <div className="w-full py-6 text-center text-[var(--color-text-default-tertiary)]">
            No tienes casos registrados.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {currentCases.map((c) => (
                <CaseCard
                  key={c.id}
                  id={c.id}
                  name={c.nombre}
                  age={c.edad}
                  status={c.estado ?? "Desaparecida"}
                  image={c.imagen}
                  fecha={c.fechaHecho || c.fecha}
                  onView={(id) => navigate(`/caso/${id}`)} // Navega al detalle
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