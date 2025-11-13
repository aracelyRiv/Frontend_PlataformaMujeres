import React from "react";
import { useNavigate } from "react-router-dom";

export default function DesaparecidaCaseCard({ id, image, name, age, fecha, onView, onReport }) {
  const navigate = useNavigate();

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-PE");
  };

  return (
    <article className="rounded-xl overflow-hidden shadow-sm bg-[var(--card-bg)] flex flex-col">
      <div className="h-64 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          onError={(e) => { e.currentTarget.src = "/placeholder-portrait.png"; }}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold mb-1 truncate brand-text">{name}</h3>
          {age !== undefined && <p className="text-sm muted-text">Edad: {age}</p>}
          {fecha && <p className="text-sm muted-text mt-1">Fecha: {formatFecha(fecha)}</p>}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onView?.(id) ?? navigate(`/caso/${id}`)}
            className="btn-primary flex-1"
            aria-label={`Ver ${name}`}
          >
            Ver
          </button>

          {/* Mostrar "Reportar" sólo si onReport fue provisto */}
          {typeof onReport === "function" && (
            <button
              onClick={() => onReport(id)}
              className="btn-dark flex-1"
              aria-label={`Reportar ${name}`}
            >
              Reportar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}