import React from "react";

export default function CaseCard({ id, image, name, age, status, fecha, onView, onEdit, onDelete }) {
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-PE");
  };

  // Normalizar el estado a minúsculas para comparación
  const normalizedStatus = String(status || "desaparecida").toLowerCase();

  return (
    <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[var(--card-bg)] flex flex-col">
      {/* Imagen */}
      <div className="h-64 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          onError={(e) => { e.currentTarget.src = "/placeholder-portrait.png"; }}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Información */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold mb-1 truncate brand-text">
            {name}
          </h3>
          {age !== undefined && (
            <p className="text-sm muted-text">
              Edad: {age}
            </p>
          )}
          {fecha && (
            <p className="text-sm muted-text mt-1">
              Fecha: {formatFecha(fecha)}
            </p>
          )}

          {/* Badge de estado */}
          <span
            className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
              normalizedStatus === "encontrada"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {normalizedStatus === "encontrada" ? "ENCONTRADA" : "DESAPARECIDA"}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onView(id)}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#9a5071] to-[#c2789d] text-white hover:from-[#8a4061] hover:to-[#b2688d] transition-all shadow-sm"
            aria-label={`Ver detalles de ${name}`}
          >
            Ver
          </button>

          <button
            onClick={() => onEdit(id)}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={`Editar caso de ${name}`}
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(id)}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
            aria-label={`Eliminar caso de ${name}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
