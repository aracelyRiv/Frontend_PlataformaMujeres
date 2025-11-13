import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";

/**
 * Componente para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, lo redirige al login
 * preservando la URL original para redirigir después del login
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirigir a inicio de sesión guardando la ubicación actual
    // Esto permite redirigir al usuario de vuelta después del login
    return <Navigate to="/inicio-sesion" state={{ from: location }} replace />;
  }

  return children;
}
