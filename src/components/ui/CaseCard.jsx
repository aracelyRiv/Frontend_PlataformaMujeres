import React from "react";
import { useNavigate } from "react-router-dom";

export default function CaseCard({ id, image, name, age, status, fecha, onView, onEdit, onDelete }) {
  const statusColors = {
    desaparecida: "bg-[var(--color-primitives-brand-b-800)] text-[var(--color-primitives-brand-100)]",
    encontrada: "bg-[var(--x-1)] text-[var(--color-primitives-brand-100)]",
  };

const navigate = useNavigate();

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-PE");
  };

  return (
    <div className="w-72 cursor-pointer rounded-[var(--size-radius-200)] overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-[var(--color-background-default-default)] flex flex-col">
      {/* Imagen */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain object-center bg-gray-100 rounded-t-[var(--size-radius-200)]"
        />
      </div>

      {/* Info */}
      <div className="flex-1 p-[var(--size-space-400)] flex flex-col justify-between">
        <div>
          <h3 className="text-[var(--body-text-font-size)] font-semibold text-[var(--color-text-default-default)]">
            {name}
          </h3>
          {age && (
            <p className="text-[var(--body-base-font-size)] text-[var(--color-text-default-tertiary)]">
              Edad: {age}
            </p>
          )}
          {fecha && (
            <p className="text-[var(--body-base-font-size)] text-[var(--color-text-default-tertiary)]">
              Fecha: {formatFecha(fecha)}
            </p>
          )}

          {/* Estado */}
          <span
            className={`inline-block mt-[var(--size-space-200)] px-[var(--size-space-300)] py-[2px] text-xs font-medium rounded-full ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-4 gap-2">
          {/* Botón Ver */}
          <button
            onClick={() => onView(id)}
            className="flex-1 px-3 py-2 rounded-lg text-sm text-white bg-[var(--x-1)] hover:bg-[var(--x-2)] transition"
          >
            Ver
          </button>

          {/* Botón Editar */}
          <button
            onClick={() => onEdit(id)}
            className="flex-1 px-3 py-2 rounded-lg text-sm border border-[var(--color-primitives-gray-400)] text-[var(--color-primitives-gray-900)] hover:bg-[var(--color-primitives-gray-300)] transition"
          >
            Editar
          </button>

          {/* Botón Eliminar */}
          <button
            onClick={() => onDelete(id)}
            className="flex-1 px-3 py-2 rounded-lg text-sm border border-red-400 text-red-700 hover:bg-red-100 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
