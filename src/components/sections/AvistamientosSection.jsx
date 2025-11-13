import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/card";
import AvistamientoCard from "../ui/AvistamientoCard";
import Pagination from "../ui/Pagination";
import { getCases } from "../../services/cases";
import { getAvistamientosPorCaso, deleteAvistamiento } from "../../services/avistamientos";

export default function AvistamientosSection({ userId }) {
  const navigate = useNavigate();
  const [misCasos, setMisCasos] = useState([]);
  const [selectedCasoId, setSelectedCasoId] = useState("");
  const [avistamientos, setAvistamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    // Filtra los casos por el usuario autenticado
    getCases()
      .then((cases) => {
        const propios = cases.filter((c) => String(c.userId) === String(userId));
        setMisCasos(propios);
        if (propios.length > 0) setSelectedCasoId(propios[0].id);
      })
      .catch((err) => {
        console.error("Error cargando casos:", err);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (selectedCasoId) {
      setLoading(true);
      // Obtener TODOS los avistamientos (manuales y reconocimientos faciales)
      getAvistamientosPorCaso(selectedCasoId)
        .then((avistamientosData) => {
          setAvistamientos(avistamientosData || []);
          setCurrentPage(1);
        })
        .catch((err) => {
          console.error("Error cargando avistamientos:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedCasoId]);

  // Separar y ordenar por fecha (más recientes primero)
  const avistamientosOrdenados = [...avistamientos].sort((a, b) => {
    const fechaA = new Date(a.fechaAvistamiento || a.fechaRegistro || 0);
    const fechaB = new Date(b.fechaAvistamiento || b.fechaRegistro || 0);
    return fechaB - fechaA;
  });

  // Paginación
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = avistamientosOrdenados.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(avistamientosOrdenados.length / itemsPerPage);

  const casoSeleccionado = misCasos.find(c => String(c.id) === String(selectedCasoId));

  // NOTA: Ya no hay distinción entre manuales y reconocimientos
  // TODOS son reconocimientos faciales (regla de negocio)
  const totalReconocimientos = avistamientos.length;

  const handleDelete = async (id) => {
    try {
      await deleteAvistamiento(id);
      // Recargar avistamientos
      const updated = await getAvistamientosPorCaso(selectedCasoId);
      setAvistamientos(updated || []);
      alert("Avistamiento eliminado correctamente");
    } catch (err) {
      console.error("Error eliminando avistamiento:", err);
      alert("Error al eliminar el avistamiento");
    }
  };

  return (
    <div className="w-full">
      <Card className="bg-[var(--card-bg)] p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 card-title">Reconocimientos Faciales</h1>
          <p className="muted-text">
            Todos los reportes requieren reconocimiento facial obligatorio con imagen.
          </p>
        </div>

        {loading ? (
          <div className="w-full py-12 text-center muted-text">
            Cargando reportes...
          </div>
        ) : misCasos.length === 0 ? (
          <div className="w-full py-12 text-center">
            <div className="max-w-md mx-auto">
              <p className="text-lg font-medium text-gray-700 mb-2">
                No tienes casos registrados
              </p>
              <p className="text-sm muted-text mb-6">
                Primero debes registrar un caso para poder ver sus avistamientos.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Selector de caso */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Selecciona un caso:
              </label>
              <select
                value={selectedCasoId}
                onChange={e => setSelectedCasoId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9a5071] text-sm"
              >
                {misCasos.map(caso => (
                  <option key={caso.id} value={caso.id}>
                    {caso.nombre} - Edad: {caso.edad} (ID: {caso.id})
                  </option>
                ))}
              </select>
              
              {casoSeleccionado && (
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className={`px-3 py-1 rounded-full font-semibold ${
                    String(casoSeleccionado.estado).toLowerCase() === 'encontrada'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {String(casoSeleccionado.estado || 'DESAPARECIDA').toUpperCase()}
                  </span>
                  <span className="text-purple-600 font-medium">
                    <strong>🤖 Total de reconocimientos:</strong> {totalReconocimientos}
                  </span>
                </div>
              )}
            </div>

            {/* Lista de reportes */}
            {avistamientosOrdenados.length === 0 ? (
              <div className="w-full py-12 text-center">
                <div className="max-w-md mx-auto">
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    No hay reconocimientos faciales para este caso
                  </p>
                  <p className="text-sm muted-text">
                    Los reconocimientos faciales aparecerán aquí cuando se detecten coincidencias con las imágenes subidas.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4 mt-6">
                  {currentItems.map((avistamiento) => (
                    <AvistamientoCard
                      key={avistamiento.id}
                      id={avistamiento.id}
                      tipo="reconocimiento"
                      fechaAvistamiento={avistamiento.fechaAvistamiento}
                      direccion={avistamiento.direccion}
                      distrito={avistamiento.distrito}
                      porcentaje={avistamiento.recognitionScore}
                      imagen={avistamiento.recognitionImage}
                      recognitionId={avistamiento.recognitionId}
                      onView={(id) => navigate(`/avistamiento/${id}`)}
                      onDelete={(id) => {
                        if (window.confirm('¿Seguro que deseas eliminar este reconocimiento facial?')) {
                          handleDelete(id);
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
}