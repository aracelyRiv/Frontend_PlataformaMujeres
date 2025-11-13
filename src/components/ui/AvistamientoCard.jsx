import React from "react";
import { MapPin, Calendar, Eye, Trash2, Percent } from "lucide-react";

export default function AvistamientoCard({
  fechaAvistamiento,
  direccion,
  distrito,
  porcentaje,
  imagen,
  onView,
  onDelete,
  id
}) {
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "Sin fecha";
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-PE", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow">
      {/* Header con tipo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
            🤖 Reconocimiento Facial
          </span>
        </div>

        {porcentaje && (
          <div className="flex items-center gap-1.5 text-sm font-semibold text-purple-700">
            <Percent className="w-4 h-4" />
            <span>{porcentaje}%</span>
          </div>
        )}
      </div>

      {/* Grid con imagen y datos */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Imagen del reconocimiento facial */}
        {imagen && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-purple-200 bg-gray-100 flex-shrink-0 flex items-center justify-center">
            <img
              src={imagen}
              alt="Reconocimiento facial"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">Sin imagen</div>';
              }}
            />
          </div>
        )}

        {/* Información */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900">Fecha:</strong>{" "}
              <span>{formatFecha(fechaAvistamiento)}</span>
            </div>
          </div>

          {direccion && (
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Ubicación:</strong>{" "}
                <span>{direccion}</span>
                {distrito && <span className="text-gray-500"> - {distrito}</span>}
              </div>
            </div>
          )}

          {!direccion && distrito && (
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Distrito:</strong>{" "}
                <span>{distrito}</span>
              </div>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex sm:flex-col gap-2 sm:ml-auto">
          <button
            onClick={() => onView && onView(id)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#9a5071] to-[#c2789d] text-white hover:from-[#8a4061] hover:to-[#b2688d] transition-all shadow-sm hover:shadow-md flex-1 sm:flex-none sm:w-full"
            aria-label="Ver detalles"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
            <span>Ver</span>
          </button>

          <button
            onClick={() => onDelete && onDelete(id)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-300 text-red-700 hover:bg-red-50 transition-colors flex-1 sm:flex-none sm:w-full"
            aria-label="Eliminar"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </article>
  );
}