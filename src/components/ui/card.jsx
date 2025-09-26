// components/card.jsx
import React from "react";

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
