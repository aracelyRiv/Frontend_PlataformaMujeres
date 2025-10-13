// services/casesService.js
export const mockCases = [
  {
    id: 1,
    nombre: "María López",
    edad: 25,
    fechaNacimiento: "2000-05-20",
    paisNacimiento: "Perú",
    distrito: "San Martín de Porres",
    direccionHecho: "Av. Perú 123",
    fechaHecho: "2025-09-01",
    vestimenta: "Polo rojo y jeans azules",
    circunstancias: "Fue vista por última vez saliendo de su trabajo",
    observaciones: "Podría estar con una amiga",
    estatura: "1.65 m",
    colorCabello: "Castaño oscuro",
    colorOjos: "Marrones",
    contextura: "Delgada",
    tez: "Trigueña",
    senasParticulares: "Cicatriz en la ceja derecha",
    condicionMedica: "Asma",
    estado: "desaparecida",
    imagen: "https://via.placeholder.com/300x300",
  },

  {
    id: 2,
    nombre: "Juana Pérez",
    edad: 30,
    fechaNacimiento: "1995-02-10",
    paisNacimiento: "Perú",
    distrito: "Comas",
    direccionHecho: "Jr. Los Álamos 456",
    fechaHecho: "2025-09-10",
    vestimenta: "Vestido azul y sandalias",
    circunstancias: "No volvió después de salir de casa",
    observaciones: "Suele visitar el parque central",
    estatura: "1.60 m",
    colorCabello: "Negro",
    colorOjos: "Negros",
    contextura: "Mediada",
    tez: "Blanca",
    senasParticulares: "Lunar en la mejilla izquierda",
    condicionMedica: "Ninguna",
    estado: "encontrada",
    imagen: "https://via.placeholder.com/300x300",
  },

  {
    id: 3,
    nombre: "Ana Torres",
    edad: 19,
    fechaNacimiento: "2006-03-15",
    paisNacimiento: "Perú",
    distrito: "Los Olivos",
    direccionHecho: "Calle Los Cedros 987",
    fechaHecho: "2025-09-15",
    vestimenta: "Casaca negra y pantalón beige",
    circunstancias: "Fue vista por última vez en el colegio",
    observaciones: "Podría estar con compañeros de clase",
    estatura: "1.68 m",
    colorCabello: "Negro",
    colorOjos: "Marrones",
    contextura: "Delgada",
    tez: "Trigueña clara",
    senasParticulares: "Tatuaje en la muñeca derecha",
    condicionMedica: "Ninguna",
    estado: "desaparecida",
    imagen: "https://via.placeholder.com/300x300",
  },

  {
    id: 4,
    nombre: "Ana Gutierrez",
    edad: 19,
    estado: "desaparecida",
    imagen: "https://via.placeholder.com/150",
    fecha: "2025-09-15",
  },

  {
    id: 5,
    nombre: "Laura Gutierrez",
    edad: 23,
    estado: "desaparecida",
    imagen: "https://via.placeholder.com/150",
    fecha: "2025-09-15",
  },

  {
    id: 6,
    nombre: "Laura Marte",
    edad: 20,
    estado: "desaparecida",
    imagen: "https://via.placeholder.com/150",
    fecha: "2025-09-15",
  },

  {
    id: 7,
    nombre: "Fernanda Marte",
    edad: 20,
    estado: "desaparecida",
    imagen: "https://via.placeholder.com/150",
    fecha: "2025-09-15",
  },
];

// delay para simular red/servidor
const simulateDelay = (result, error = false, time = 500) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (error ? reject(result) : resolve(result)), time)
  );

//  GET: obtener todos los casos
export async function getCases() {
  return simulateDelay([...mockCases]);
}

//  GET by id
export async function getCaseById(id) {
  const found = mockCases.find((c) => c.id === Number(id));
  if (!found) {
    return simulateDelay({ message: "Caso no encontrado" }, true);
  }
  return simulateDelay(found);
}

// POST: crear nuevo caso
export async function createCase(caseData) {
  // validación de negocio: no duplicar nombre + fecha
  const exists = mockCases.some(
    (c) => c.nombre === caseData.nombre && c.fecha === caseData.fecha
  );
  if (exists) {
    return simulateDelay(
      { message: "Ya existe un caso con ese nombre y fecha." },
      true
    );
  }

  const newCase = {
    id: Date.now(),
    ...caseData,
    estado: caseData.estado || "desaparecida",
    imagen: caseData.imagen || "https://via.placeholder.com/150",
  };

  mockCases.push(newCase);

  return simulateDelay(newCase);
}

//  PUT: actualizar caso
export async function updateCase(id, caseData) {
  const index = mockCases.findIndex((c) => c.id === Number(id));
  if (index === -1) {
    return simulateDelay({ message: "Caso no encontrado" }, true);
  }

  mockCases[index] = { ...mockCases[index], ...caseData };
  return simulateDelay(mockCases[index]);
}

// DELETE: eliminar caso
export async function deleteCase(id) {
  const index = mockCases.findIndex((c) => c.id === Number(id));
  if (index === -1) {
    return simulateDelay({ message: "Caso no encontrado" }, true);
  }

  const deleted = mockCases.splice(index, 1);
  return simulateDelay(deleted[0]);
}