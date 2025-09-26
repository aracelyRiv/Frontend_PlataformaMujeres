
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InicioSesion from "./pages/InicioSesion";
import Registro from "./pages/Registro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;

