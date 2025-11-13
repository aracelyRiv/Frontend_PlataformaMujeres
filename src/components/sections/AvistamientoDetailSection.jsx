import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAvistamientoById, updateEstadoAvistamiento } from "../../services/avistamientos";
import Card from "../ui/card";
import LoadingButton from "../ui/LoadingButton";
import { ArrowLeft, Loader2, MapPin, Calendar, User, Mail, Phone, Percent, CheckCircle, XCircle } from "lucide-react";

export default function AvistamientoDetailSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [avistamiento, setAvistamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const avData = await getAvistamientoById(id);
        setAvistamiento(avData);
      } catch (err) {
        console.error("Error cargando avistamiento:", err);
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

  if (!avistamiento) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-red-600 text-lg mb-3">Avistamiento no encontrado</p>
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

  const handleCambiarEstado = async (nuevoEstado) => {
    if (!avistamiento) return;
    
    const confirmar = window.confirm(
      `¿Estás seguro de ${nuevoEstado === "aceptado" ? "ACEPTAR" : "RECHAZAR"} este avistamiento?`
    );

    if (!confirmar) return;

    setUpdating(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      const resultado = await updateEstadoAvistamiento(id, nuevoEstado);
      setAvistamiento(resultado);
      setMensaje({
        tipo: "success",
        texto: `Avistamiento ${nuevoEstado === "aceptado" ? "aceptado" : "rechazado"} correctamente`
      });
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.message || "Error al actualizar el estado"
      });
    } finally {
      setUpdating(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      pendiente: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pendiente" },
      aceptado: { bg: "bg-green-100", text: "text-green-800", label: "Aceptado" },
      rechazado: { bg: "bg-red-100", text: "text-red-800", label: "Rechazado" }
    };
    const config = estados[estado] || estados.pendiente;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Botón volver */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition bg-gray-100 px-3 py-1 rounded-md shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>
      </div>

      {/* Card principal con toda la información */}
      <Card className="bg-white max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-gray-800">Detalle del Reconocimiento Facial</h2>
          <div className="flex items-center gap-2">
            {getEstadoBadge(avistamiento.estado || "pendiente")}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
              🤖 Reconocimiento
            </span>
          </div>
        </div>

        {/* Mensaje de éxito/error */}
        {mensaje.texto && (
          <div className={`mb-4 p-3 rounded-lg ${
            mensaje.tipo === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {mensaje.texto}
          </div>
        )}

        {/* Imagen del reconocimiento */}
        {avistamiento.recognitionImage && (
          <div className="mb-6">
            <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-purple-200 bg-gray-50 shadow-md">
              <img
                src={avistamiento.recognitionImage}
                alt="Imagen del reconocimiento facial"
                className="w-full h-64 object-contain"
              />
            </div>
            {avistamiento.recognitionScore && (
              <div className="mt-3 flex items-center justify-center gap-2 text-lg font-semibold text-purple-700">
                <Percent className="w-5 h-5" />
                <span>Coincidencia: {avistamiento.recognitionScore}%</span>
              </div>
            )}
          </div>
        )}

        {/* Datos del avistamiento */}
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Información del Avistamiento</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <div>
                  <strong>Fecha:</strong> {formatFecha(avistamiento.fechaAvistamiento)}
                  {avistamiento.hora && <span> a las {avistamiento.hora}</span>}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <div>
                  <strong>Ubicación:</strong>{" "}
                  {avistamiento.direccion || "—"}
                  {avistamiento.distrito && ` - ${avistamiento.distrito}`}
                </div>
              </div>

              <div>
                <strong>Vestimenta:</strong> {avistamiento.vestimenta || "—"}
              </div>

              <div>
                <strong>Comportamiento:</strong> {avistamiento.comportamiento || "—"}
              </div>

              {avistamiento.observaciones && (
                <div className="pt-2 bg-gray-50 p-3 rounded-lg">
                  <strong>Observaciones:</strong>
                  <p className="mt-1 text-gray-600">{avistamiento.observaciones}</p>
                </div>
              )}
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Características físicas reportadas */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Características Físicas Observadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <strong>Estatura:</strong> {avistamiento.estatura ? `${avistamiento.estatura} m` : "—"}
              </div>
              <div>
                <strong>Contextura:</strong> {avistamiento.contextura || "—"}
              </div>
              <div>
                <strong>Tez:</strong> {avistamiento.tez || "—"}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <strong>Señas particulares:</strong> {avistamiento.senasParticulares || "—"}
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Datos del reportante */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Datos del Reportante</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span><strong>Nombre:</strong> {avistamiento.nombreReportante || "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span><strong>Email:</strong> {avistamiento.email || "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span><strong>Teléfono:</strong> {avistamiento.telefono || "—"}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Botones de Aceptar/Rechazar - Solo si está pendiente */}
        {avistamiento.estado === "pendiente" && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Evaluar Avistamiento</h3>
            <p className="text-sm text-gray-600 mb-4">
              Revisa cuidadosamente la información antes de tomar una decisión. 
              Esta acción ayudará a validar la información para las autoridades.
            </p>
            <div className="flex gap-3 flex-wrap">
              <LoadingButton
                onClick={() => handleCambiarEstado("aceptado")}
                loading={updating}
                disabled={updating}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                Aceptar Avistamiento
              </LoadingButton>
              
              <LoadingButton
                onClick={() => handleCambiarEstado("rechazado")}
                loading={updating}
                disabled={updating}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <XCircle className="w-5 h-5" />
                Rechazar Avistamiento
              </LoadingButton>
            </div>
          </div>
        )}

        {/* Mensaje cuando ya fue evaluado */}
        {avistamiento.estado !== "pendiente" && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className={`p-4 rounded-lg ${
              avistamiento.estado === "aceptado" 
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <p className={`text-sm font-medium ${
                avistamiento.estado === "aceptado" ? "text-green-800" : "text-red-800"
              }`}>
                {avistamiento.estado === "aceptado" 
                  ? "✓ Este avistamiento ha sido aceptado. La información se compartirá con las autoridades correspondientes."
                  : "✗ Este avistamiento ha sido rechazado. No se procesará esta información."}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
