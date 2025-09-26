import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/button";

const navigationItems = [
  { label: "Desaparecidas", to: "/desparecidas" },
  { label: "Encontradas", to: "/encontradas" },
  { label: "Vista General", to: "/" },
];

export default function Navbar() {
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

        {/* Botones de autenticación */}
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
      </nav>
    </header>
  );
}