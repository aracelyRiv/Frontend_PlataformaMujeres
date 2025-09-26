import React from "react";

export default function Checkbox({
  id,
  name,
  checked = false,
  onChange,
  label,
  error,
  className = "",
  ...props
}) {
  const errorId = error ? `${id || name}-error` : undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={id || name}
        className="flex items-start gap-3 cursor-pointer select-none"
      >
        <input
          id={id || name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className="h-4 w-4 rounded-sm border border-gray-300 focus:ring-2 focus:ring-black accent-black"
          {...props}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 mt-1 ml-6">
          {error}
        </p>
      )}
    </div>
  );
}
