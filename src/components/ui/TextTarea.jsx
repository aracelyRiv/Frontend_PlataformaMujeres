import React from "react";

export default function TextArea({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  error = "",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id || name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}