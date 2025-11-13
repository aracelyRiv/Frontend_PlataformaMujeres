// components/card.jsx
import React from "react";

export default function Card({ title, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      {title && <h3 className="card-title mb-4">{title}</h3>}
      {children}
    </section>
  );
}
