import React from "react";

export default function FechaFiltro({
  modo,
  setModo,
  fecha,
  onFechaChange,
  minFecha,
  maxFecha,
  anios,
  onYearToggle,
  availableYears
}) {
  return (
    <>
      <div className="flex gap-4 my-3">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={modo === "fecha"}
            onChange={() => setModo("fecha")}
          />
          Por fecha
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={modo === "anio"}
            onChange={() => setModo("anio")}
          />
          Por año
        </label>
      </div>
      {modo === "fecha" && (
        <>
          <label className="block text-sm text-gray-700 mb-1 mt-3">Fecha:</label>
          <div className="flex gap-2 items-center mb-3">
            <input
              type="date"
              min={minFecha}
              max={maxFecha}
              value={fecha ? fecha[0] : minFecha}
              onChange={e => onFechaChange(e, 0)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--pink)]"
              style={{ minWidth: 130, width: "100%" }}
            />
            <span>a</span>
            <input
              type="date"
              min={minFecha}
              max={maxFecha}
              value={fecha ? fecha[1] : maxFecha}
              onChange={e => onFechaChange(e, 1)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--pink)]"
              style={{ minWidth: 130, width: "100%" }}
            />
          </div>
        </>
      )}
      {modo === "anio" && (
        <>
          <label className="block text-sm text-gray-700 mb-1">Año:</label>
          <div className="flex gap-4 flex-wrap mb-3">
            {availableYears.map(year => (
              <label key={year} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={anios?.includes(year)}
                  onChange={() => onYearToggle(year)}
                />
                {year}
              </label>
            ))}
          </div>
        </>
      )}
    </>
  );
}