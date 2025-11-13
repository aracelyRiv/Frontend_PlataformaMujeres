import React from "react";

export default function SelectInput({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Seleccione una opción",
  error,
  ...props
}) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
          error 
            ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300 focus:ring-2 focus:ring-[#9a5071] focus:border-[#9a5071]"
        }`}
        value={value || ""}
        onChange={onChange}
        aria-label={label || "select"}
        aria-invalid={!!error}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, index) => {
          // Soporte para strings simples o objetos {value, label}
          const optValue = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          
          return (
            <option key={optValue || index} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}