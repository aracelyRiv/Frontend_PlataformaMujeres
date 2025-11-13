import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";
import { getAvistamientos } from "../../services/avistamientos";
import { FileText, AlertCircle, Clock, Eye } from "lucide-react";

export default function DashboardFamiliarSection() {
  const user = getCurrentUser();
  const [stats, setStats] = useState({
    totalAvistamientos: 0,
    avistamientosPendientes: 0,
    ultimaActividad: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avistamientos = await getAvistamientos();

        // Calcular estadísticas
        const pendientes = avistamientos.filter(a => a.estado === "pendiente").length;
        
        // Última actividad
        const sortedAvistamientos = [...avistamientos]
          .sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));

        setStats({
          totalAvistamientos: avistamientos.length,
          avistamientosPendientes: pendientes,
          ultimaActividad: sortedAvistamientos[0]?.fechaRegistro || null
        });
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  const guiasPasos = [
    {
      numero: "1",
      titulo: "Registra el caso",
      descripcion: "Completa el formulario con toda la información disponible: fotos recientes, características físicas, vestimenta y circunstancias de la desaparición."
    },
    {
      numero: "2",
      titulo: "Revisa avistamientos",
      descripcion: "Ciudadanos pueden reportar avistamientos. Recibirás notificaciones y podrás revisar los reportes en la sección de Avistamientos."
    },
    {
      numero: "3",
      titulo: "Acepta o rechaza reportes",
      descripcion: "Evalúa cada avistamiento cuidadosamente. Puedes aceptar si parece legítimo o rechazar si no coincide con la información."
    },
    {
      numero: "4",
      titulo: "Usa reconocimiento facial",
      descripcion: "Si tienes fotos de cámaras de seguridad o lugares públicos, usa nuestra herramienta de reconocimiento facial para buscar coincidencias."
    },
    {
      numero: "5",
      titulo: "Mantén actualizado el caso",
      descripcion: "Puedes editar el caso en cualquier momento para agregar información nueva o marcar el caso como 'Encontrada' cuando sea necesario."
    }
  ];

  return (
    <main className="flex-1 bg-[var(--rosa-claro)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#8B5A8F] to-[#C75A81]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Bienvenido/a, {user?.nombre || "Familiar"}
          </h1>
          <p className="text-xl text-white max-w-2xl leading-relaxed">
            Desde aquí puedes gestionar tus casos, revisar avistamientos y usar nuestras herramientas para ayudar en la búsqueda.
          </p>
        </div>
      </section>

      {/* Cards de Resumen */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total de Avistamientos */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#C75A81]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Avistamientos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalAvistamientos}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#C75A81]" />
              </div>
            </div>
          </div>

          {/* Avistamientos Pendientes */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avistamientosPendientes}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            {stats.avistamientosPendientes > 0 && (
              <Link to="/avistamientos" className="text-orange-600 text-xs font-medium mt-2 inline-block hover:underline">
                Revisar ahora →
              </Link>
            )}
          </div>

          {/* Última Actividad */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Última Actividad</p>
                <p className="text-lg font-semibold text-gray-900">
                  {stats.ultimaActividad 
                    ? new Date(stats.ultimaActividad).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                    : "Sin actividad"}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guía de Uso */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-[#C75A81] text-white rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Guía para Familiares
              </h2>
              <p className="text-gray-600 text-base">Cómo usar la plataforma efectivamente</p>
            </div>
          </div>

          <div className="space-y-6">
            {guiasPasos.map((paso, index) => (
              <div key={index} className="flex items-start gap-5 pb-6 border-b border-gray-200 last:border-0">
                <div className="flex-none w-14 h-14 rounded-full bg-[#C75A81] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  {paso.numero}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-900 text-xl mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {paso.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota importante */}
          <div className="mt-10 bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-none w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold shadow-md">
                i
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2 text-lg">
                  Información Importante
                </h4>
                <p className="text-base text-blue-900 leading-relaxed">
                  Toda la información es confidencial y protegida según la Ley N.º 29733. 
                  Los avistamientos son revisados antes de compartirse con autoridades. 
                  Mantén tu información actualizada para mejorar las posibilidades de encontrar a tu familiar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
