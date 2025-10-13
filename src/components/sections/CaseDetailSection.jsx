import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCaseById } from "../../services/cases";
import Card from "../ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CaseDetailSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCaseById(id);
        setCaseData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-red-600 text-lg mb-3">Caso no encontrado</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Botón Volver */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition bg-gray-100 px-3 py-1 rounded-md shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>
      </div>

      <Card title="Detalle del Caso">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen */}
          <div className="flex flex-col items-center">
            {caseData.imagen && (
              <img
                src={caseData.imagen}
                alt={caseData.nombre}
                className="w-64 h-64 object-cover rounded-xl shadow-md"
              />
            )}
            <span
              className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold ${
                caseData.estado === "encontrada"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {caseData.estado.toUpperCase()}
            </span>
          </div>

          {/* Información detallada */}
          <div className="space-y-6">
            {/* 1. Información personal */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Información personal
              </h3>
              <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
                <p><strong>Nombre:</strong> {caseData.nombre}</p>
                <p><strong>Edad:</strong> {caseData.edad}</p>
                <p><strong>Fecha de nacimiento:</strong> {" "}
                  {caseData.fechaNacimiento
                    ? (caseData.fechaNacimiento instanceof Date
                        ? caseData.fechaNacimiento.toLocaleDateString("es-PE")
                        : new Date(caseData.fechaNacimiento).toLocaleDateString("es-PE"))
                    : "—"}
                </p>
                <p><strong>País de nacimiento:</strong> {caseData.paisNacimiento || "—"}</p>
              </div>
            </section>

            <hr className="my-4 border-gray-200" />

            {/* 2. Datos del hecho */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Datos del hecho
              </h3>
              <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
                <p><strong>Distrito:</strong> {caseData.distrito || "—"}</p>
                <p><strong>Dirección:</strong> {caseData.direccionHecho || "—"}</p>
                <p>
                  <strong>Fecha del hecho:</strong>{" "}
                  {caseData.fechaHecho
                    ? (caseData.fechaHecho instanceof Date
                        ? caseData.fechaHecho.toLocaleDateString("es-PE")
                        : new Date(caseData.fechaHecho).toLocaleDateString("es-PE"))
                    : "—"}
                </p>
                <p><strong>Vestimenta:</strong> {caseData.vestimenta || "—"}</p>
                <p className="col-span-2"><strong>Circunstancias:</strong> {caseData.circunstancias || "—"}</p>
                <p className="col-span-2 break-words max-h-24 overflow-y-auto whitespace-pre-line">
                  <strong>Otras observaciones:</strong> {caseData.observaciones || "—"}
                </p>
              </div>
            </section>

            <hr className="my-4 border-gray-200" />

            {/* 3. Características físicas */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Características físicas
              </h3>
              <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
                <p><strong>Estatura:</strong> {caseData.estatura || "—"}</p>
                <p><strong>Cabello:</strong> {caseData.colorCabello || "—"}</p>
                <p><strong>Ojos:</strong> {caseData.colorOjos || "—"}</p>
                <p><strong>Contextura:</strong> {caseData.contextura || "—"}</p>
                <p><strong>Tez:</strong> {caseData.tez || "—"}</p>
                <p className="break-words">
                  <strong>Señas particulares:</strong> {caseData.senasParticulares || "—"}
                </p>
                <p className="break-words max-h-24 overflow-y-auto whitespace-pre-line">
                  <strong>Condición médica:</strong> {caseData.condicionMedica || "—"}
                </p>
              </div>
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
}