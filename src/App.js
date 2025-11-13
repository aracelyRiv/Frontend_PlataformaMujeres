import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import InicioSesion from "./pages/InicioSesion";
import Registro from "./pages/Registro";
import MisCasos from "./pages/MisCasos"; 
import AgregarCaso from "./pages/AgregarCaso";
import VerDetalleCaso from "./pages/VerDetalleCaso";
import EditarCaso from "./pages/EditarCaso";
import Desaparecidas from "./pages/Desaparecidas";
import ReportarAvistamiento from "./pages/ReportarAvistamiento";
import Avistamientos from "./pages/Avistamientos";
import VerDetalleAvistamiento from "./pages/VerDetalleAvistamiento";
import Encontradas from "./pages/Encontradas";
import ReconocimientoFacial from "./pages/ReconocimientoFacial";
import Perfil from "./pages/Perfil";
import Configuracion from "./pages/Configuracion";
import Estadisticas from "./pages/Estadisticas";
import EstadisticasPublicas from "./pages/EstadisticasPublicas";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/desaparecidas" element={<Desaparecidas />} />
        <Route path="/encontradas" element={<Encontradas />} />
        <Route path="/estadisticas-publicas" element={<EstadisticasPublicas />} />
        <Route path="/reconocimiento-facial" element={<ReconocimientoFacial />} />
        <Route path="/reportar-avistamiento/:id" element={<ReportarAvistamiento />} />
        
        {/* Rutas Protegidas (requieren autenticación) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/mis-casos" element={
          <ProtectedRoute>
            <MisCasos />
          </ProtectedRoute>
        } />
        <Route path="/agregar-caso" element={
          <ProtectedRoute>
            <AgregarCaso />
          </ProtectedRoute>
        } />
        <Route path="/caso/:id" element={
          <ProtectedRoute>
            <VerDetalleCaso />
          </ProtectedRoute>
        } />
        <Route path="/editar-caso/:id" element={
          <ProtectedRoute>
            <EditarCaso />
          </ProtectedRoute>
        } />
        <Route path="/avistamientos" element={
          <ProtectedRoute>
            <Avistamientos />
          </ProtectedRoute>
        } />
        <Route path="/avistamiento/:id" element={
          <ProtectedRoute>
            <VerDetalleAvistamiento />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        } />
        <Route path="/configuracion" element={
          <ProtectedRoute>
            <Configuracion />
          </ProtectedRoute>
        } />
        <Route path="/estadisticas" element={
          <ProtectedRoute>
            <Estadisticas />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
