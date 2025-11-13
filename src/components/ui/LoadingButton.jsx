import React from "react";

export default function LoadingButton({
  children,
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#9a5071] to-[#c2789d] hover:from-[#8a4061] hover:to-[#b2688d]"}
        ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {loading ? "Cargando..." : children}
    </button>
  );
}
