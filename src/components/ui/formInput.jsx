import React from "react";

export default function FormInput({
  label,
  error = "",
  className = "",
  ...props // acepta todos los props, incluidos los de RHF o controlados
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={props.id || props.name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props} // pasa todos los props, incluidos los de RHF o controlados
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
