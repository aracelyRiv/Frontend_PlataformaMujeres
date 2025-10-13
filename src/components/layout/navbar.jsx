import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/button";
import ProfileMenu from "../ui/ProfileMenu";

// Opciones para visitantes
const publicNavigation = [
  { label: "Desaparecidas", to: "/desparecidas" },
  { label: "Encontradas", to: "/encontradas" },
  { label: "Vista General", to: "/" },
];

// Opciones para usuarios autenticados
const privateNavigation = [
  { label: "Mis Casos", to: "/mis-casos" },
  { label: "Avistamientos", to: "/avistamientos" },
  { label: "Reconocimiento Facial", to: "/reconocimiento" },
];

export default function Navbar({ isAuthenticated = false }) {
  const navigationItems = isAuthenticated ? privateNavigation : publicNavigation;

  return (
    <header className="flex w-full h-[88px] items-center justify-between px-[42px] py-6 bg-white shadow-sm">
      {/* Logo */}
      <div className="font-bold text-xl text-black">Logo</div>

      {/* Navegación */}
      <nav className="flex items-center gap-6">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="font-normal text-black text-[17px] leading-[27px] hover:opacity-70 transition-opacity"
          >
            {item.label}
          </Link>
        ))}

        {/* Acciones */}
        {!isAuthenticated ? (
          <>
            <Link to="/inicio-sesion">
              <Button className="bg-black text-white hover:bg-[var(--color-background-neutral-default)] active:bg-[var(--color-background-neutral-default)]">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/registro">
              <Button className="bg-black text-white hover:bg-[var(--color-background-neutral-default)] active:bg-[var(--color-background-neutral-default)]">
                Registrarse
              </Button>
            </Link>
          </>
        ) : (
          <ProfileMenu />
        )}
      </nav>
    </header>
  );
}
