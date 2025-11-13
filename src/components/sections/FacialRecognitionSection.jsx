import React, { useState, useRef, useEffect } from "react";
import { recognizeImage } from "../../services/faceRecognition";
import Card from "../ui/card";
import { useNavigate } from "react-router-dom";
import CaseDetailSection from "../sections/CaseDetailSection";

export default function FacialRecognitionSection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); 
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const inputRef = useRef();
  const liveRef = useRef();
  const navigate = useNavigate();

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

  useEffect(() => {
    if (!result) return;
    if (liveRef.current) {
      if (result.match) liveRef.current.textContent = `Coincidencia encontrada`;
      else liveRef.current.textContent = "No se encontró coincidencia";
    }
  }, [result]);

  const validateAndSet = (f) => {
    setError("");
    setInfo("");
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!ACCEPTED.includes(f.type)) {
      setError("Formato no soportado. Usa JPG, PNG o WEBP.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("Archivo demasiado grande. Máx 5 MB.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setInfo("Imagen lista. Pulsa 'Analizar' para buscar coincidencias.");
  };

  const onChange = (e) => {
    const f = e.target.files?.[0];
    validateAndSet(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    validateAndSet(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const submit = async () => {
    if (!file) return setError("Sube una imagen primero.");
    setLoading(true);
    setError("");
    setResult(null);
    setInfo("Analizando imagen…");
    try {
      const res = await recognizeImage(file);
      setResult(res);
      if (!res.match) {
        setInfo("No se encontró coincidencia. Puedes intentar con otra foto.");
      } else {
        setInfo("");
      }
    } catch (err) {
      setError("Error al procesar la imagen. Intenta de nuevo.");
      setInfo("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReport = (caseId) => {
    // navegar al formulario de reporte, pasando la imagen ya subida y el recognitionId
    const recognitionId = result?.recognitionId || null;
    const imageData = result?.imageData || null; // la imagen en base64 capturada del reconocimiento
    navigate(`/reportar-avistamiento/${caseId}`, { 
      state: { 
        fromRecognition: true, 
        recognitionId,
        imageData // pasar la imagen capturada
      } 
    });
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-2">Reconocimiento Facial</h1>
      <p className="muted-text mb-4">
        Sube una foto clara de la persona. El sistema comparará con los casos registrados.
      </p>

      <div className="mb-4 flex gap-3 items-center text-sm">
        <div className="px-3 py-2 bg-[var(--primary-strong)] text-white rounded-full">1</div>
        <div className="flex-1">Selecciona o arrastra la imagen (JPG/PNG, máx 5 MB).</div>
        <div className="px-3 py-2 bg-[var(--primary-strong)] text-white rounded-full">2</div>
        <div className="flex-1">Pulsa "Analizar" y revisa el resultado.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Área de subida / preview */}
        <div>
          <label className="sr-only" htmlFor="face-upload">Subir imagen</label>

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="border-dashed border-2 rounded-md p-4 cursor-pointer bg-white hover:shadow-sm"
            style={{ borderColor: file ? "var(--primary-strong)" : "rgba(0,0,0,0.08)" }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.click(); }}
            aria-label="Área para arrastrar y soltar imagen"
          >
            <input
              ref={inputRef}
              id="face-upload"
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />

            {!preview ? (
              <div className="flex flex-col items-start gap-3">
                <div className="text-sm font-medium">Arrastra la imagen aquí o haz click</div>
                <div className="text-xs text-[var(--muted)]">Fotografía tipo carnet funciona mejor</div>
              </div>
            ) : (
              <div className="flex gap-4 items-start">
                <img src={preview} alt="Previsualización" className="w-36 h-40 object-cover rounded-md shadow-sm" />
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">Previsualización</div>
                  <div className="text-xs text-[var(--muted)] mb-3">Si no es la correcta, sube otra imagen.</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="btn-dark px-3 py-1 text-sm"
                      disabled={loading}
                    >
                      Cambiar
                    </button>
                    <button
                      onClick={() => { validateAndSet(null); inputRef.current.value = ""; }}
                      className="px-3 py-1 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 text-sm">
            <div className="text-xs text-[var(--muted)]">Formatos: JPG, PNG, WEBP — Máx 5 MB.</div>
            {error && <div className="text-red-600 mt-2">{error}</div>}
            {info && <div className="text-[var(--muted)] mt-2">{info}</div>}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={submit}
              className="btn-primary px-3 py-1 text-sm"
              disabled={!file || loading}
              aria-disabled={!file || loading}
            >
              {loading ? "Analizando…" : "Analizar"}
            </button>
            <button
              onClick={() => { validateAndSet(null); inputRef.current.value = ""; setResult(null); setError(""); setInfo(""); }}
              className="btn-dark px-3 py-1 text-sm"
              disabled={loading}
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Resultado breve + panel inline */}
        <div className="md:col-span-2">
          {/* panel de resultado: usa tus variables CSS para mantener consistencia de colores */}
          <div
            className="rounded-md p-4 min-h-[160px] shadow-md border border-gray-200"
            style={{ backgroundColor: "var(--rosa-claro)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium">Resultado</h3>
                <div className="text-xs text-[var(--muted)]">El sistema te avisará si hay coincidencias.</div>
              </div>

              <div className="flex flex-col items-end gap-3">
                {/* estado (badge) */}
                {loading ? (
                  <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">Analizando…</div>
                ) : result ? (
                  result.match ? (
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">Coincidencia</div>
                  ) : (
                    <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">Sin coincidencia</div>
                  )
                ) : (
                  <div className="px-3 py-1 rounded-full bg-gray-50 text-gray-700 text-sm">En espera</div>
                )}

                {/* botón Reportar visible debajo del badge — usa tu color fuerte definido */}
                {result && result.match && (
                  <button
                    onClick={() => handleReport(result.candidate.id)}
                    className="px-3 py-1 text-sm rounded-md text-white shadow-sm"
                    style={{ backgroundColor: "var(--primary-strong)" }}
                    aria-label="Reportar caso"
                  >
                    Reportar
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4">
              {!result && <div className="text-[var(--muted)]">Sube una imagen y pulsa analizar para ver resultados.</div>}

              {result && result.match && (
                <>
                  {/* el detalle del caso sigue siendo blanco y separado para destacar */}
                  <div className="mt-4">
                    {/* aquí se renderiza el CaseDetailSection/summary (sigue siendo bg-white) */}
                    <CaseDetailSection caseData={result.candidate} compact={true} hideBack={true} />
                  </div>
                </>
              )}

              {result && !result.match && (
                <div className="text-[var(--muted)]">No se encontró ninguna coincidencia en la base de datos.</div>
              )}
            </div>
          </div>

          <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" role="status" />
        </div>
      </div>
    </Card>
  );
}