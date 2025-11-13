import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";
import ProfileMenu from "../ui/ProfileMenu";

const publicNavigation = [
  { label: "Inicio", to: "/" },
  { label: "Casos", to: "/desaparecidas" },
  { label: "Reconocimiento Facial", to: "/reconocimiento-facial" },
  { label: "Estadísticas", to: "/estadisticas-publicas" },
];

const privateNavigation = [
  { label: "Inicio", to: "/dashboard" },
  { label: "Mis Casos", to: "/mis-casos" },
  { label: "Avistamientos", to: "/avistamientos" },
  { label: "Mis Estadísticas", to: "/estadisticas" },
];

export default function Navbar() {
  // Detectar automáticamente si el usuario está autenticado
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(isAuthenticated());
  const navigationItems = userIsAuthenticated ? privateNavigation : publicNavigation;

  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Verificar autenticación periódicamente para reflejar cambios
  useEffect(() => {
    const checkAuth = () => {
      setUserIsAuthenticated(isAuthenticated());
    };
    
    // Verificar cada segundo si cambió la autenticación
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    const onClickOutside = (e) => {
      if (!mobileOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      const first = panelRef.current?.querySelector("a,button");
      first?.focus();
    }
  }, [mobileOpen]);

  const linkBase =
    "font-normal text-lg leading-6 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--primary-strong)]";
  const activeClass = "bg-[rgba(0,0,0,0.06)]";

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Left: logo */}
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-normal brand-text mr-4">
            Logo
          </NavLink>
        </div>

        {/* Center (desktop): links placed closer to actions (justify-end) */}
        <div className="flex-1 hidden md:flex justify-end">
          <div className="flex items-center gap-4 mr-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : ""} text-[var(--neutral-900)]`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: actions + mobile menu button */}
        <div className="flex items-center gap-3">
          {/* mobile hamburger */}
          <button
            ref={buttonRef}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden btn-dark"
            title="Abrir menú"
          >
            {mobileOpen ? (
              // X icon
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {!userIsAuthenticated ? (
            <>
              <NavLink to="/inicio-sesion" className="btn-dark hidden sm:inline-flex">
                Iniciar Sesión
              </NavLink>
              <NavLink to="/registro" className="btn-dark hidden sm:inline-flex">
                Registrarse
              </NavLink>
            </>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`md:hidden absolute left-0 right-0 bg-white border-t border-gray-100 shadow-md z-40 transition-transform origin-top ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col p-3 gap-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${isActive ? "bg-[rgba(0,0,0,0.06)]" : "hover:bg-[rgba(0,0,0,0.03)]"} font-normal text-base text-[var(--neutral-900)]`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {!userIsAuthenticated ? (
            <>
              <NavLink to="/inicio-sesion" onClick={() => setMobileOpen(false)} className="btn-dark w-full justify-center">
                Iniciar Sesión
              </NavLink>
              <NavLink to="/registro" onClick={() => setMobileOpen(false)} className="btn-dark w-full justify-center">
                Registrarse
              </NavLink>
            </>
          ) : (
            <div className="pt-2">
              <ProfileMenu />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}