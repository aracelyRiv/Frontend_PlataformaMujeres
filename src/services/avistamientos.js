// Mock de avistamientos (ejemplos)
// REGLA: Todos los avistamientos DEBEN tener recognitionId (reconocimiento facial obligatorio)
let mockAvistamientos = [
  {
    id: 1,
    casoId: 1,
    distrito: "Lima",
    direccion: "Av. Arequipa 123",
    fechaAvistamiento: "2025-09-20",
    hora: "15:30",
    vestimenta: "Polo azul y jeans",
    comportamiento: "Caminando sola",
    observaciones: "Reconocimiento facial detectado automáticamente (87% de confianza). Parecía desorientada.",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "Cicatriz en la ceja",
    imagen: "",
    nombreReportante: "Juan Pérez",
    email: "juan@mail.com",
    telefono: "999999999",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1726845900000",
    recognitionScore: 87,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-09-20T15:45:00Z"
  },
  {
    id: 2,
    casoId: 1,
    distrito: "Surco",
    direccion: "Calle Las Flores 456",
    fechaAvistamiento: "2025-09-21",
    hora: "18:00",
    vestimenta: "Casaca roja y pantalón negro",
    comportamiento: "Sentada en una banca",
    observaciones: "Reconocimiento facial detectado automáticamente (92% de confianza).",
    estatura: "1.60",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "María López",
    email: "maria@mail.com",
    telefono: "988888888",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1726932000000",
    recognitionScore: 92,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-09-21T18:10:00Z"
  },
  {
    id: 3,
    casoId: 1,
    distrito: "Miraflores",
    direccion: "Parque Kennedy",
    fechaAvistamiento: "2025-10-05",
    hora: "14:20",
    vestimenta: "Vestido amarillo",
    comportamiento: "Comprando en el mercado",
    observaciones: "Reconocimiento facial con buen nivel de confianza (78%).",
    estatura: "1.62",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Carlos Ruiz",
    email: "carlos@mail.com",
    telefono: "977777777",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1728140400000",
    recognitionScore: 78,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-05T14:30:00Z"
  },
  {
    id: 4,
    casoId: 2,
    distrito: "San Isidro",
    direccion: "Av. Javier Prado 890",
    fechaAvistamiento: "2025-10-12",
    hora: "10:15",
    vestimenta: "Jeans y chompa gris",
    comportamiento: "Esperando en paradero",
    observaciones: "Reconocimiento facial detectado (85% de confianza). Se veía tranquila.",
    estatura: "1.58",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "Tatuaje en brazo izquierdo",
    imagen: "",
    nombreReportante: "Ana García",
    email: "ana@mail.com",
    telefono: "966666666",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1728745500000",
    recognitionScore: 85,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-12T10:25:00Z"
  },
  {
    id: 5,
    casoId: 2,
    distrito: "La Molina",
    direccion: "Centro Comercial Molina Plaza",
    fechaAvistamiento: "2025-10-18",
    hora: "16:45",
    vestimenta: "Polo blanco y pantalón negro",
    comportamiento: "Caminando con otra persona",
    observaciones: "Reconocimiento facial con alta confianza (94%).",
    estatura: "1.60",
    contextura: "Media",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Pedro Sánchez",
    email: "pedro@mail.com",
    telefono: "955555555",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1729264500000",
    recognitionScore: 94,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-18T17:00:00Z"
  },
  {
    id: 7,
    casoId: 3,
    distrito: "Surco",
    direccion: "Av. Benavides 1234",
    fechaAvistamiento: "2025-11-01",
    hora: "11:00",
    vestimenta: "Vestido floreado",
    comportamiento: "Comprando en bodega",
    observaciones: "Reconocimiento facial detectado (89% de confianza).",
    estatura: "1.63",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Rosa Torres",
    email: "rosa@mail.com",
    telefono: "933333333",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730473200000",
    recognitionScore: 89,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-01T11:15:00Z"
  },
  {
    id: 8,
    casoId: 1,
    distrito: "Jesús María",
    direccion: "Campo de Marte",
    fechaAvistamiento: "2025-11-08",
    hora: "08:30",
    vestimenta: "Buzo deportivo gris",
    comportamiento: "Haciendo ejercicio",
    observaciones: "Reconocimiento facial con confianza alta (82%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Miguel Flores",
    email: "miguel@mail.com",
    telefono: "922222222",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1731077400000",
    recognitionScore: 82,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-08T08:45:00Z"
  },
  {
    id: 9,
    casoId: 2,
    distrito: "Breña",
    direccion: "Av. Arica 789",
    fechaAvistamiento: "2025-11-10",
    hora: "17:00",
    vestimenta: "Blusa rosada y jean",
    comportamiento: "Conversando con alguien",
    observaciones: "Reconocimiento facial con alta confianza (91%).",
    estatura: "1.58",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Patricia Vargas",
    email: "patricia@mail.com",
    telefono: "911111111",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1731250800000",
    recognitionScore: 91,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-10T17:15:00Z"
  },
  {
    id: 10,
    casoId: 3,
    distrito: "Lima",
    direccion: "Plaza de Armas",
    fechaAvistamiento: "2025-11-11",
    hora: "13:20",
    vestimenta: "Polo verde y pantalón beige",
    comportamiento: "Tomando fotos",
    observaciones: "Reconocimiento facial detectado (88% de confianza).",
    estatura: "1.63",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "José Ramírez",
    email: "jose@mail.com",
    telefono: "900000000",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1731337200000",
    recognitionScore: 88,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-11T13:35:00Z"
  },
  {
    id: 11,
    casoId: 1,
    distrito: "San Borja",
    direccion: "Av. Aviación 2000",
    fechaAvistamiento: "2025-10-15",
    hora: "09:00",
    vestimenta: "Chompa azul",
    comportamiento: "Caminando por el parque",
    observaciones: "Reconocimiento facial detectado (81% de confianza).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Laura Díaz",
    email: "laura@mail.com",
    telefono: "987654321",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1728991200000",
    recognitionScore: 81,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-15T09:15:00Z"
  },
  {
    id: 12,
    casoId: 2,
    distrito: "Surco",
    direccion: "Av. Primavera 500",
    fechaAvistamiento: "2025-10-20",
    hora: "16:30",
    vestimenta: "Vestido negro",
    comportamiento: "Saliendo de tienda",
    observaciones: "Reconocimiento facial con buena confianza (86%).",
    estatura: "1.58",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Roberto Castro",
    email: "roberto@mail.com",
    telefono: "976543210",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1729423800000",
    recognitionScore: 86,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-20T16:45:00Z"
  },
  {
    id: 13,
    casoId: 1,
    distrito: "Miraflores",
    direccion: "Malecón de la Reserva",
    fechaAvistamiento: "2025-10-28",
    hora: "18:00",
    vestimenta: "Casaca roja",
    comportamiento: "Mirando el mar",
    observaciones: "Reconocimiento facial con alta confianza (93%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Fernando Silva",
    email: "fernando@mail.com",
    telefono: "965432109",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730142000000",
    recognitionScore: 93,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-28T18:20:00Z"
  },
  {
    id: 14,
    casoId: 3,
    distrito: "Barranco",
    direccion: "Puente de los Suspiros",
    fechaAvistamiento: "2025-11-02",
    hora: "14:45",
    vestimenta: "Blusa blanca",
    comportamiento: "Tomando fotos",
    observaciones: "Reconocimiento facial detectado (79% de confianza).",
    estatura: "1.63",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Carmen Rojas",
    email: "carmen@mail.com",
    telefono: "954321098",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1730559900000",
    recognitionScore: 79,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-02T15:00:00Z"
  },
  {
    id: 15,
    casoId: 1,
    distrito: "San Isidro",
    direccion: "Parque El Olivar",
    fechaAvistamiento: "2025-11-05",
    hora: "10:30",
    vestimenta: "Jeans y polo blanco",
    comportamiento: "Corriendo",
    observaciones: "Reconocimiento facial con confianza (84%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Daniela Morales",
    email: "daniela@mail.com",
    telefono: "943210987",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730818200000",
    recognitionScore: 84,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-05T10:45:00Z"
  },
  {
    id: 16,
    casoId: 2,
    distrito: "Lince",
    direccion: "Av. Arequipa 3000",
    fechaAvistamiento: "2025-11-06",
    hora: "12:00",
    vestimenta: "Casaca verde",
    comportamiento: "Esperando en paradero",
    observaciones: "Reconocimiento facial con alta confianza (90%).",
    estatura: "1.58",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Javier López",
    email: "javier@mail.com",
    telefono: "932109876",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730904000000",
    recognitionScore: 90,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-06T12:15:00Z"
  },
  {
    id: 17,
    casoId: 1,
    distrito: "Pueblo Libre",
    direccion: "Av. La Marina 1500",
    fechaAvistamiento: "2025-11-09",
    hora: "15:20",
    vestimenta: "Vestido amarillo",
    comportamiento: "Comprando en mercado",
    observaciones: "Reconocimiento facial detectado (87% de confianza).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Sofía Herrera",
    email: "sofia@mail.com",
    telefono: "921098765",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1731163200000",
    recognitionScore: 87,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-09T15:35:00Z"
  },
  {
    id: 18,
    casoId: 3,
    distrito: "Lima",
    direccion: "Jr. de la Unión",
    fechaAvistamiento: "2025-10-22",
    hora: "11:00",
    vestimenta: "Polo rojo",
    comportamiento: "Mirando vitrinas",
    observaciones: "Reconocimiento facial con confianza (82%).",
    estatura: "1.63",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Marcelo Ríos",
    email: "marcelo@mail.com",
    telefono: "910987654",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1729596000000",
    recognitionScore: 82,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-22T11:20:00Z"
  },
  // Agregar más avistamientos en las mismas fechas para crear picos
  {
    id: 19,
    casoId: 1,
    distrito: "Lima",
    direccion: "Av. Tacna 200",
    fechaAvistamiento: "2025-10-20",
    hora: "14:00",
    vestimenta: "Jeans",
    comportamiento: "Caminando",
    observaciones: "Reconocimiento facial (85%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Alicia Vega",
    email: "alicia@mail.com",
    telefono: "998877665",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1729437600000",
    recognitionScore: 85,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-20T14:15:00Z"
  },
  {
    id: 20,
    casoId: 2,
    distrito: "San Isidro",
    direccion: "Canaval y Moreyra",
    fechaAvistamiento: "2025-10-28",
    hora: "10:00",
    vestimenta: "Blusa azul",
    comportamiento: "En cafetería",
    observaciones: "Reconocimiento facial (88%).",
    estatura: "1.58",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Elena Paz",
    email: "elena@mail.com",
    telefono: "987766554",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730113200000",
    recognitionScore: 88,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-10-28T10:20:00Z"
  },
  {
    id: 21,
    casoId: 1,
    distrito: "Miraflores",
    direccion: "Av. Larco 800",
    fechaAvistamiento: "2025-11-01",
    hora: "16:00",
    vestimenta: "Casaca negra",
    comportamiento: "Comprando",
    observaciones: "Reconocimiento facial (91%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Ricardo Luna",
    email: "ricardo@mail.com",
    telefono: "976655443",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730491200000",
    recognitionScore: 91,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-01T16:20:00Z"
  },
  {
    id: 22,
    casoId: 3,
    distrito: "Lima",
    direccion: "Plaza San Martín",
    fechaAvistamiento: "2025-11-01",
    hora: "17:30",
    vestimenta: "Vestido verde",
    comportamiento: "Sentada en banca",
    observaciones: "Reconocimiento facial (76%).",
    estatura: "1.63",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Víctor Salas",
    email: "victor@mail.com",
    telefono: "965544332",
    aceptar: true,
    estado: "pendiente",
    recognitionId: "rec-1730496600000",
    recognitionScore: 76,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-01T17:45:00Z"
  },
  {
    id: 23,
    casoId: 2,
    distrito: "Surco",
    direccion: "Av. El Polo",
    fechaAvistamiento: "2025-11-05",
    hora: "19:00",
    vestimenta: "Chompa gris",
    comportamiento: "Bajando de bus",
    observaciones: "Reconocimiento facial (89%).",
    estatura: "1.58",
    contextura: "Media",
    tez: "Morena",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Isabel Ramos",
    email: "isabel@mail.com",
    telefono: "954433221",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1730836800000",
    recognitionScore: 89,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-05T19:15:00Z"
  },
  {
    id: 24,
    casoId: 1,
    distrito: "San Borja",
    direccion: "Av. Javier Prado",
    fechaAvistamiento: "2025-11-08",
    hora: "11:30",
    vestimenta: "Polo blanco",
    comportamiento: "Esperando taxi",
    observaciones: "Reconocimiento facial (83%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Gustavo Ponce",
    email: "gustavo@mail.com",
    telefono: "943322110",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1731062700000",
    recognitionScore: 83,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-08T11:45:00Z"
  },
  {
    id: 25,
    casoId: 1,
    distrito: "Lince",
    direccion: "Av. Arenales",
    fechaAvistamiento: "2025-11-10",
    hora: "09:00",
    vestimenta: "Vestido rojo",
    comportamiento: "Comprando pan",
    observaciones: "Reconocimiento facial (92%).",
    estatura: "1.65",
    contextura: "Delgada",
    tez: "Clara",
    senasParticulares: "",
    imagen: "",
    nombreReportante: "Mónica Torres",
    email: "monica@mail.com",
    telefono: "932211009",
    aceptar: true,
    estado: "aceptado",
    recognitionId: "rec-1731225600000",
    recognitionScore: 92,
    recognitionImage: "https://via.placeholder.com/150",
    fechaRegistro: "2025-11-10T09:20:00Z"
  }
];

// Simula un retardo
const simulateDelay = (result, error = false, time = 500) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (error ? reject(result) : resolve(result)), time)
  );

/**
 * createAvistamiento(data)
 * - REGLA: Todos los avistamientos DEBEN tener recognitionId (reconocimiento facial obligatorio)
 * - No se permiten avistamientos manuales sin imagen
 * - Guarda imagen del reconocimiento + porcentaje + datos del formulario
 */
export async function createAvistamiento(data) {
  if (!data || !data.casoId) {
    return simulateDelay({ message: "casoId es requerido" }, true);
  }

  // VALIDACIÓN OBLIGATORIA: Debe tener recognitionId
  if (!data.recognitionId) {
    return simulateDelay({ 
      message: "No se puede crear un avistamiento sin reconocimiento facial. Debe proporcionar una imagen para el reconocimiento." 
    }, true);
  }

  const nuevo = {
    id: mockAvistamientos.length ? Math.max(...mockAvistamientos.map(a => a.id)) + 1 : 1,
    casoId: data.casoId,
    distrito: data.distrito || data.location || "",
    direccion: data.direccion || "",
    fechaAvistamiento: data.fechaAvistamiento || data.fecha || new Date().toISOString().slice(0,10),
    hora: data.hora || "",
    vestimenta: data.vestimenta || "",
    comportamiento: data.comportamiento || "",
    observaciones: data.observaciones || data.descripcion || "",
    estatura: data.estatura || "",
    contextura: data.contextura || "",
    tez: data.tez || "",
    senasParticulares: data.senasParticulares || "",
    
    // Datos del reportante
    nombreReportante: data.nombreReportante || data.reporterName || "Anónimo",
    email: data.email || data.reporterContact || null,
    telefono: data.telefono || data.phone || null,
    aceptar: Boolean(data.aceptar ?? true),
    
    // Estado del avistamiento (por defecto: pendiente)
    estado: data.estado || "pendiente", // pendiente, aceptado, rechazado
    
    // Datos del reconocimiento facial (OBLIGATORIOS)
    recognitionId: data.recognitionId, // Siempre presente
    recognitionScore: data.recognitionScore || null, // Porcentaje de coincidencia
    recognitionImage: data.recognitionImage || null, // Imagen usada en el reconocimiento
    
    // Ya no se usa campo 'imagen' separado, solo recognitionImage
    imagen: "",
    
    fechaRegistro: new Date().toISOString()
  };

  mockAvistamientos.push(nuevo);
  return simulateDelay(nuevo);
}

// Obtener todos los avistamientos
export async function getAvistamientos() {
  return simulateDelay([...mockAvistamientos]);
}

// Obtener avistamientos por casoId
// NOTA: Todos los avistamientos tienen recognitionId (regla de negocio)
export async function getAvistamientosPorCaso(casoId) {
  return simulateDelay(
    mockAvistamientos.filter((a) => String(a.casoId) === String(casoId))
  );
}

// DEPRECADO: Ya no se usan avistamientos manuales
// Todos los avistamientos requieren reconocimiento facial
export async function getAvistamientosManualesPorCaso(casoId) {
  console.warn("getAvistamientosManualesPorCaso está deprecado. Todos los avistamientos requieren reconocimiento facial.");
  return simulateDelay([]);
}

// Obtener reconocimientos faciales por casoId
// NOTA: Esta función es equivalente a getAvistamientosPorCaso ya que todos son reconocimientos
export async function getReconocimientosFacialesPorCaso(casoId) {
  return simulateDelay(
    mockAvistamientos.filter(
      (a) => String(a.casoId) === String(casoId) && a.recognitionId
    )
  );
}

// Obtener un avistamiento por id
export async function getAvistamientoById(id) {
  return simulateDelay(
    mockAvistamientos.find((a) => String(a.id) === String(id))
  );
}

// Eliminar un avistamiento
export async function deleteAvistamiento(id) {
  const index = mockAvistamientos.findIndex((a) => String(a.id) === String(id));
  if (index === -1) {
    return simulateDelay({ message: "Avistamiento no encontrado" }, true);
  }
  const deleted = mockAvistamientos.splice(index, 1);
  return simulateDelay(deleted[0]);
}

/**
 * Actualizar estado del avistamiento
 * @param {number|string} id - ID del avistamiento
 * @param {string} estado - "pendiente", "aceptado" o "rechazado"
 */
export async function updateEstadoAvistamiento(id, estado) {
  const avistamiento = mockAvistamientos.find((a) => String(a.id) === String(id));
  
  if (!avistamiento) {
    return simulateDelay({ message: "Avistamiento no encontrado" }, true);
  }

  if (!["pendiente", "aceptado", "rechazado"].includes(estado)) {
    return simulateDelay({ message: "Estado inválido. Debe ser: pendiente, aceptado o rechazado" }, true);
  }

  avistamiento.estado = estado;
  avistamiento.fechaActualizacion = new Date().toISOString();
  
  return simulateDelay({ ...avistamiento });
}

/**
 * Helper: crear un borrador de avistamiento desde un recognition/caso
 * Útil para prellenar el formulario cuando el usuario confirma desde reconocimiento.
 * - caseObj: objeto de case (id, nombre, distrito opcional...)
 * - recognitionId: id del reconocimiento (OBLIGATORIO)
 * - recognitionData: datos adicionales del reconocimiento (score, imagen)
 * 
 * REGLA: Todos los avistamientos DEBEN tener recognitionId
 */
export function buildAvistamientoFromRecognition({ caseObj, recognitionId, recognitionData = {} }) {
  if (!recognitionId) {
    throw new Error("recognitionId es obligatorio para crear un avistamiento");
  }

  return {
    casoId: caseObj?.id ?? caseObj?.caseId ?? null,
    distrito: caseObj?.distrito || "",
    direccion: "",
    fechaAvistamiento: new Date().toISOString().slice(0,10),
    hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    vestimenta: "",
    comportamiento: "",
    observaciones: recognitionData.score 
      ? `Reconocimiento facial detectado automáticamente (${Math.round(recognitionData.score * 100)}% de confianza).`
      : "",
    estatura: "",
    contextura: "",
    tez: "",
    senasParticulares: "",
    imagen: "", // No se usa, solo recognitionImage
    nombreReportante: "",
    email: "",
    telefono: "",
    aceptar: true,
    recognitionId: recognitionId,
    recognitionScore: recognitionData.score ? Math.round(recognitionData.score * 100) : null,
    recognitionImage: recognitionData.image || null
  };
}