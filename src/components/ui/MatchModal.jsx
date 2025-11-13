import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MatchModal({ candidate }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  if (!candidate || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="bg-white p-6 rounded-md shadow-lg z-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">Coincidencia encontrada</h2>

        <div className="flex gap-4 items-center">
          {candidate.imagen && (
            <img src={candidate.imagen} alt={candidate.nombre} className="w-20 h-20 rounded-md object-cover" />
          )}
          <div>
            <div className="font-medium">{candidate.nombre}</div>
            <div className="text-sm text-[var(--muted)]">Edad: {candidate.edad ?? "N/A"}</div>
            <div className="text-sm text-[var(--muted)]">País: {candidate.paisNacimiento ?? "N/D"}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="btn-dark flex-1"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              // navegar a reporte, pasando info que viene del reconocimiento
              setOpen(false);
              navigate(`/reportar-avistamiento/${candidate.id}`, { state: { fromRecognition: true } });
            }}
            className="btn-primary flex-1"
          >
            Reportar avistamiento
          </button>
        </div>
      </div>
    </div>
  );
}