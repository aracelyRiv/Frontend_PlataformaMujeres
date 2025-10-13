import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InicioSesion from "./pages/InicioSesion";
import Registro from "./pages/Registro";
import MisCasos from "./pages/MisCasos"; 
import AgregarCaso from "./pages/AgregarCaso";
import VerDetalleCaso from "./pages/VerDetalleCaso";
import EditarCaso from "./pages/EditarCaso";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/mis-casos" element={<MisCasos />} />
        <Route path="/agregar-caso" element={<AgregarCaso />} />
        <Route path="/caso/:id" element={<VerDetalleCaso />} />
        <Route path="/editar-caso/:id" element={<EditarCaso />} />
      </Routes>
    </Router>
  );
}

export default App;
