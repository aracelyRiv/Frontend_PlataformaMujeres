import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ userName = "Usuario" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cierre de sesión profesional
  const handleLogout = () => {
    setOpen(false);
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.clear();
      sessionStorage.clear();
      // Aquí podrías mostrar un toast: "Sesión cerrada correctamente"
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button
        aria-label="Abrir menú de usuario"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-[var(--color-primitives-gray-400)] flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-black"
      >
        {userName.charAt(0).toUpperCase()}
      </button>

      {/* Menú desplegable */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--color-background-default-default)] border border-[var(--color-border-default-default)] z-50 animate-fade-in"
          role="menu"
          aria-label="Menú de usuario"
        >
          <ul className="py-2">
            <li
              className="px-4 py-2 text-[var(--color-text-default-default)] hover:bg-[var(--color-primitives-gray-300)] cursor-pointer"
              tabIndex={0}
              role="menuitem"
              onClick={() => { setOpen(false); navigate("/perfil"); }}
            >
              Ver perfil
            </li>
            <li
              className="px-4 py-2 text-[var(--color-text-default-default)] hover:bg-[var(--color-primitives-gray-300)] cursor-pointer"
              tabIndex={0}
              role="menuitem"
              onClick={() => { setOpen(false); navigate("/mis-casos"); }}
            >
              Mis casos
            </li>
            <li
              className="px-4 py-2 text-[var(--color-text-default-default)] hover:bg-[var(--color-primitives-gray-300)] cursor-pointer"
              tabIndex={0}
              role="menuitem"
              onClick={() => { setOpen(false); navigate("/configuracion"); }}
            >
              Configuración
            </li>
            <li
              className="px-4 py-2 text-red-600 hover:bg-[var(--rosa-claro)] cursor-pointer"
              tabIndex={0}
              role="menuitem"
              onClick={handleLogout}
            >
              Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
