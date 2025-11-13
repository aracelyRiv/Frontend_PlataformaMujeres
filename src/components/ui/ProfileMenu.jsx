import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, FileText, Settings, LogOut, ChevronDown } from "lucide-react";
import { getCurrentUser, logout as authLogout } from "../../services/auth";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Obtener datos del usuario al montar el componente
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

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
      authLogout();
      // Recargar la página para limpiar completamente el estado
      window.location.href = "/";
    }
  };

  // Obtener nombre para mostrar
  const displayName = user?.nombre || "Usuario";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón de perfil mejorado */}
      <button
        aria-label="Abrir menú de usuario"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#9a5071] to-[#c2789d] text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9a5071] focus:ring-offset-2"
      >
        {/* Avatar circular */}
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
          {userInitial}
        </div>
        
        {/* Nombre de usuario */}
        <span className="text-sm hidden sm:block">{displayName}</span>
        
        {/* Icono de flecha */}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Menú desplegable mejorado */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-64 rounded-xl shadow-2xl bg-white border border-gray-200 z-50 overflow-hidden animate-fade-in"
          role="menu"
          aria-label="Menú de usuario"
        >
          {/* Header del menú */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#9a5071] to-[#c2789d] border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                {userInitial}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="text-xs text-white/80">Familiar registrado</p>
              </div>
            </div>
          </div>

          {/* Opciones del menú */}
          <ul className="py-2">
            <li>
              <button
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                tabIndex={0}
                role="menuitem"
                onClick={() => { setOpen(false); navigate("/perfil"); }}
              >
                <User className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Ver perfil</p>
                  <p className="text-xs text-gray-500">Información personal</p>
                </div>
              </button>
            </li>

            <li>
              <button
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                tabIndex={0}
                role="menuitem"
                onClick={() => { setOpen(false); navigate("/mis-casos"); }}
              >
                <FileText className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Mis casos</p>
                  <p className="text-xs text-gray-500">Casos registrados</p>
                </div>
              </button>
            </li>

            <li>
              <button
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                tabIndex={0}
                role="menuitem"
                onClick={() => { setOpen(false); navigate("/configuracion"); }}
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Configuración</p>
                  <p className="text-xs text-gray-500">Ajustes de cuenta</p>
                </div>
              </button>
            </li>

            {/* Separador */}
            <li className="my-2 border-t border-gray-100"></li>

            <li>
              <button
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-150"
                tabIndex={0}
                role="menuitem"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Cerrar sesión</p>
                  <p className="text-xs text-red-400">Salir de la cuenta</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
