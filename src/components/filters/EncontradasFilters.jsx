import React from "react";
import { paises } from "../../constants/formOptions";
import EdadRangeFilter from "./EdadRangeFilter";
import Card from "../ui/card";
import SearchInput from "../ui/SearchInput";

export default function EncontradasFilters({
  filters,
  onChange,
  minEdad = 0,
  maxEdad = 100,
}) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <Card className="mb-6 max-w-[360px] min-w-[260px]">
      <h2 className="filter-title">Filtrar casos</h2>

      <div className="mb-6 border-b pb-4" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
        <h3 className="text-sm mb-3 text-[var(--primary-strong)]">Filtros de la Persona</h3>

        <SearchInput
          value={filters.nombre || ""}
          onChange={(val) => handleChange("nombre", val)}
          placeholder="Buscar por nombre"
        />

        <EdadRangeFilter
          value={filters.edad || [minEdad, maxEdad]}
          onChange={(value) => handleChange("edad", value)}
          min={minEdad}
          max={maxEdad}
        />

        <div className="mb-3">
          <label className="block text-sm muted-text mb-1">Nacionalidad:</label>
          <select
            value={filters.nacionalidad || ""}
            onChange={(e) => handleChange("nacionalidad", e.target.value)}
            className="form-select"
          >
            <option value="">Seleccione una opción</option>
            {paises.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={() => onChange({})} className="btn-primary">
          Limpiar filtros
        </button>
      </div>
    </Card>
  );
}