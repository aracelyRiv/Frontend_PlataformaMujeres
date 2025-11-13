import React from "react";
import { paises, distritos } from "../../constants/formOptions";
import EdadRangeFilter from "./EdadRangeFilter";
import FechaFiltro from "./FechaFiltro";
import Card from "../ui/card";
import SearchInput from "../ui/SearchInput";

export default function DesaparecidaFilters({
  filters,
  onChange,
  minEdad = 0,
  maxEdad = 100,
  minFecha = "2023-01-01",
  maxFecha = "2025-12-31",
  availableYears = ["2023", "2024", "2025"]
}) {
  const [fechaModo, setFechaModo] = React.useState("fecha"); // "fecha" o "anio"

  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const handleFechaChange = (e, idx) => {
    const newFecha = [...(filters.fecha || [minFecha, maxFecha])];
    newFecha[idx] = e.target.value;
    handleChange("fecha", newFecha);
  };

  const handleYearToggle = (year) => {
    let selected = filters.anios || [];
    if (selected.includes(year)) {
      selected = selected.filter((y) => y !== year);
    } else {
      selected = [...selected, year];
    }
    handleChange("anios", selected);
  };

  return (
    <Card className="mb-6 max-w-[360px] min-w-[260px]">

      <h2 className="filter-title">Filtrar casos</h2>

      {/* Filtros de la Persona */}
      <div className="mb-6 border-b pb-4" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
        <h3 className="text-sm mb-3 text-[var(--primary-strong)]">Filtros de la Persona</h3>
        
        {/* Búsqueda por nombre */}
        <SearchInput
          value={filters.nombre || ""}
          onChange={(val) => handleChange("nombre", val)}
          placeholder="Buscar por nombre"
        />

        {/* Filtro por rango de edad */}
        <EdadRangeFilter
          value={filters.edad || [minEdad, maxEdad]}
          onChange={(value) => handleChange("edad", value)}
          min={minEdad}
          max={maxEdad}
        />

        {/* Nacionalidad */}
        <div className="mb-3">
          <label className="block text-sm muted-text mb-1">Nacionalidad:</label>
          <select
            value={filters.nacionalidad || ""}
            onChange={(e) => handleChange("nacionalidad", e.target.value)}
            className="form-select"
          >
            <option value="">Seleccione una opción</option>
            {paises.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros de la Desaparición */}
      <div>
        <h3 className="text-sm mb-3 text-[var(--primary-strong)]">Filtros del Caso</h3>

        {/* Distrito */}
        <div className="mb-3">
          <label className="block text-sm muted-text mb-1">Distrito:</label>
          <select
            value={filters.distrito || ""}
            onChange={(e) => handleChange("distrito", e.target.value)}
            className="form-select"
          >
            <option value="">Seleccione una opción</option>
            {distritos.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Fecha o año */}
        <FechaFiltro
          modo={fechaModo}
          setModo={setFechaModo}
          fecha={filters.fecha}
          onFechaChange={handleFechaChange}
          minFecha={minFecha}
          maxFecha={maxFecha}
          anios={filters.anios}
          onYearToggle={handleYearToggle}
          availableYears={availableYears}
        />
      </div>

      {/* Filtro de estado */}
      <div className="mb-3 mt-3">
        <label className="block text-sm muted-text mb-1">Estado:</label>
        <select
          value={filters.estado || "todos"}
          onChange={(e) => handleChange("estado", e.target.value)}
          className="form-select"
        >
          <option value="todos">Todos</option>
          <option value="desaparecida">Desaparecida</option>
          <option value="encontrada">Encontrada</option>
        </select>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="mt-4">
        <button
          onClick={() => onChange({})}
          className="btn-primary"
        >
          Limpiar filtros
        </button>
      </div>
    </Card>
  );
}
