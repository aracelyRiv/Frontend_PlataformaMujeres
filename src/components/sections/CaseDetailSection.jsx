import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCaseById } from "../../services/cases";
import Card from "../ui/card";
import { ArrowLeft, Loader2, User, Calendar, MapPin, Activity } from "lucide-react";

export default function CaseDetailSection({ caseData: propCaseData = null, compact = false, hideBack = false }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(propCaseData);
  const [loading, setLoading] = useState(!propCaseData);

  useEffect(() => {
    if (propCaseData) {
      setCaseData(propCaseData);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCaseById(paramId);
        setCaseData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [paramId, propCaseData]);

  if (loading) {
    return (
      <div className={compact ? "flex items-center justify-center h-36" : "flex items-center justify-center h-[70vh]"}>
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-red-600 text-lg mb-3">Caso no encontrado</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Volver</button>
      </div>
    );
  }

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "—";
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-PE", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Si es modo compacto, mostrar versión simplificada
  if (compact) {
    return (
      <Card className="bg-white">
        <div className="space-y-4">
          {/* Header con nombre y estado */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-gray-800">{caseData.nombre}</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                String(caseData.estado ?? "").toLowerCase() === "encontrada" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}
            >
              {String(caseData.estado ?? "DESAPARECIDA").toUpperCase()}
            </span>
          </div>

          {/* Imagen centrada */}
          {caseData.imagen && (
            <div className="flex justify-center">
              <img
                src={caseData.imagen}
                alt={caseData.nombre}
                className="w-48 h-48 object-cover rounded-lg shadow-md border-2 border-gray-200"
              />
            </div>
          )}
          
          {/* Información del caso - COMPLETA */}
          <div className="space-y-3">
            {/* Información personal */}
            <section>
              <h4 className="text-base font-semibold text-gray-800 mb-2">Información Personal</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span><strong>Nombre completo:</strong> {caseData.nombre || "—"}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <strong>Edad:</strong> {caseData.edad ?? "—"} años
                  </div>
                  <div>
                    <strong>Fecha de nacimiento:</strong> {formatFecha(caseData.fechaNacimiento)}
                  </div>
                  <div className="col-span-2">
                    <strong>País de nacimiento:</strong> {caseData.paisNacimiento || "—"}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Datos del hecho */}
            <section>
              <h4 className="text-base font-semibold text-gray-800 mb-2">Datos del Hecho</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong>Fecha del hecho:</strong> {formatFecha(caseData.fechaHecho)}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong>Ubicación:</strong> {caseData.direccionHecho || "—"}
                    {caseData.distrito && ` - ${caseData.distrito}`}
                  </div>
                </div>

                <div>
                  <strong>Vestimenta:</strong> {caseData.vestimenta || "—"}
                </div>

                {caseData.circunstancias && (
                  <div className="pt-2 bg-gray-50 p-2 rounded-lg">
                    <strong>Circunstancias:</strong>
                    <p className="mt-1 text-gray-600">{caseData.circunstancias}</p>
                  </div>
                )}
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Características físicas */}
            <section>
              <h4 className="text-base font-semibold text-gray-800 mb-2">Características Físicas</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>
                  <strong>Estatura:</strong> {caseData.estatura ? `${caseData.estatura} m` : "—"}
                </div>
                <div>
                  <strong>Contextura:</strong> {caseData.contextura || "—"}
                </div>
                <div>
                  <strong>Color de cabello:</strong> {caseData.colorCabello || "—"}
                </div>
                <div>
                  <strong>Color de ojos:</strong> {caseData.colorOjos || "—"}
                </div>
                <div className="col-span-2">
                  <strong>Señas particulares:</strong> {caseData.senasParticulares || "—"}
                </div>
              </div>
            </section>

            {/* Condición médica */}
            {caseData.condicionMedica && (
              <>
                <hr className="border-gray-200" />
                <section>
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 text-gray-500" />
                    <div className="text-sm text-gray-700">
                      <strong>Condición médica:</strong>
                      <p className="mt-1 bg-yellow-50 p-2 rounded-lg text-gray-600">{caseData.condicionMedica}</p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Observaciones */}
            {caseData.observaciones && (
              <>
                <hr className="border-gray-200" />
                <section>
                  <h4 className="text-base font-semibold text-gray-800 mb-2">Observaciones</h4>
                  <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                    {caseData.observaciones}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Botón volver - solo si hideBack es false */}
      {!hideBack && (
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition bg-gray-100 px-3 py-1 rounded-md shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>
        </div>
      )}

      {/* Card principal */}
      <Card className="bg-white max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{caseData.nombre}</h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              String(caseData.estado ?? "").toLowerCase() === "encontrada" 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}
          >
            {String(caseData.estado ?? "DESAPARECIDA").toUpperCase()}
          </span>
        </div>

        {/* Imagen */}
        {caseData.imagen && (
          <div className="mb-6">
            <div className="w-full max-w-xs mx-auto rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 shadow-md">
              <img
                src={caseData.imagen}
                alt={caseData.nombre}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        )}

        {/* Información completa */}
        <div className="space-y-4">
          {/* Información personal */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Información Personal</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span><strong>Nombre completo:</strong> {caseData.nombre || "—"}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <strong>Edad:</strong> {caseData.edad ?? "—"} años
                </div>
                <div>
                  <strong>Fecha de nacimiento:</strong> {formatFecha(caseData.fechaNacimiento)}
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <strong>País de nacimiento:</strong> {caseData.paisNacimiento || "—"}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Datos del hecho */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Datos del Hecho</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <div>
                  <strong>Fecha del hecho:</strong> {formatFecha(caseData.fechaHecho)}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <div>
                  <strong>Ubicación:</strong> {caseData.direccionHecho || "—"}
                  {caseData.distrito && ` - ${caseData.distrito}`}
                </div>
              </div>

              <div>
                <strong>Vestimenta:</strong> {caseData.vestimenta || "—"}
              </div>

              {caseData.circunstancias && (
                <div className="pt-2 bg-gray-50 p-3 rounded-lg">
                  <strong>Circunstancias:</strong>
                  <p className="mt-1 text-gray-600">{caseData.circunstancias}</p>
                </div>
              )}
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Características físicas */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Características Físicas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <strong>Estatura:</strong> {caseData.estatura ? `${caseData.estatura} m` : "—"}
              </div>
              <div>
                <strong>Contextura:</strong> {caseData.contextura || "—"}
              </div>
              <div>
                <strong>Color de cabello:</strong> {caseData.colorCabello || "—"}
              </div>
              <div>
                <strong>Color de ojos:</strong> {caseData.colorOjos || "—"}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <strong>Señas particulares:</strong> {caseData.senasParticulares || "—"}
              </div>
            </div>
          </section>

          {caseData.condicionMedica && (
            <>
              <hr className="border-gray-200" />
              <section>
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 mt-0.5 text-gray-500" />
                  <div className="text-sm text-gray-700">
                    <strong>Condición médica:</strong>
                    <p className="mt-1 bg-yellow-50 p-3 rounded-lg text-gray-600">{caseData.condicionMedica}</p>
                  </div>
                </div>
              </section>
            </>
          )}

          {caseData.observaciones && (
            <>
              <hr className="border-gray-200" />
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Observaciones</h3>
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {caseData.observaciones}
                </div>
              </section>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}