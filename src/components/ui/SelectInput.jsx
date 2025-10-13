import React from "react";

export default function SelectInput({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  error = "",
  className = "",
  ...rest
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border rounded-md text-gray-800 bg-white 
          focus:outline-none focus:ring-2 focus:ring-black 
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"} 
          ${className}`}
        {...rest}
      >
        <option value="">Seleccione una opción</option>

        {options.map((opt, idx) => {
          if (typeof opt === "string") {
            return (
              <option key={idx} value={opt}>
                {opt}
              </option>
            );
          } else {
            return (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            );
          }
        })}
      </select>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}