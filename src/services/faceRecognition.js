import { getCases } from "./cases";

// almacenamiento local simulado de recognitions (solo para demo)
// Este servicio SOLO maneja reconocimientos faciales, NO reportes de avistamientos
const recognitions = [];

const simulateDelay = (result, error = false, time = 600) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (error ? reject(result) : resolve(result)), time)
  );

/**
 * recognizeImage(file)
 * - intenta llamar al endpoint real /api/face/recognize
 * - si falla, usa getCases() para devolver un candidato real (heurística por filename)
 * Retorno: { match: boolean, candidate: object|null, score: number, recognitionId, imageData: string }
 */
export async function recognizeImage(file) {
  const fd = new FormData();
  fd.append("image", file);

  // Convertir imagen a base64 para guardarla después
  const imageData = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

  // intento real al backend
  try {
    const res = await fetch("/api/face/recognize", {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      const data = await res.json();
      // si el API real no devuelve recognitionId, lo generamos para mantener consistencia
      if (!data.recognitionId) {
        const id = `rec-${Date.now()}`;
        recognitions.push({ 
          id, 
          createdAt: new Date().toISOString(), 
          source: "api", 
          raw: data,
          imageData 
        });
        data.recognitionId = id;
      }
      // Agregar imagen a la respuesta
      data.imageData = imageData;
      return data;
    }
    throw new Error("API returned non-ok");
  } catch (err) {
    // Fallback: simulación usando casos locales
    console.warn("Reconocimiento: fallback local (no API).", err);

    let casos = [];
    try {
      casos = await getCases();
    } catch (e) {
      console.warn("No se pudieron cargar casos para fallback:", e);
      casos = [];
    }

    // heurística: buscar coincidencia por primer nombre en filename
    const filename = (file && file.name) ? file.name.toLowerCase() : "";
    let candidate = null;
    if (filename && casos.length) {
      candidate = casos.find((c) => {
        const parts = (c.nombre || "").toLowerCase().split(/\s+/);
        return parts.some((p) => p && filename.includes(p));
      });
    }
    if (!candidate && casos.length) {
      // como demo, devolver el primer caso con alta probabilidad
      candidate = casos[0];
    }

    const match = Boolean(candidate) && Math.random() > 0.35; // control de probabilidad demo
    const score = match ? +(0.7 + Math.random() * 0.25).toFixed(2) : 0;

    // crear registro de reconocimiento simulado
    const recognitionRecord = {
      id: `rec-${Date.now()}`,
      createdAt: new Date().toISOString(),
      source: "local-mock",
      fileName: file?.name || null,
      matchedCaseId: match ? candidate.id : null,
      score,
      imageData
    };
    recognitions.push(recognitionRecord);

    return simulateDelay({
      match,
      candidate: match ? candidate : null,
      score,
      recognitionId: recognitionRecord.id,
      imageData
    });
  }
}

/**
 * getRecognitions()
 * - Devuelve el historial de reconocimientos faciales realizados
 * - Útil para auditoría y debugging
 */
export async function getRecognitions() {
  return simulateDelay([...recognitions]);
}

/**
 * getRecognitionById(recognitionId)
 * - Obtiene un reconocimiento específico por su ID
 * - Útil para vincular con avistamientos
 */
export async function getRecognitionById(recognitionId) {
  const recognition = recognitions.find(r => r.id === recognitionId);
  if (!recognition) {
    throw new Error(`Reconocimiento ${recognitionId} no encontrado`);
  }
  return simulateDelay(recognition);
}