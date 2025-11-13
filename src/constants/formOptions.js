// Arrays simples para retrocompatibilidad con código existente
export const paises = [
  "Perú",
  "Argentina",
  "Chile",
  "Colombia",
  "Ecuador",
  "México",
  "Bolivia",
  "Venezuela",
  "Brasil",
  "Uruguay",
  "Otro",
];

export const distritos = [
  "Ancón",
  "Ate",
  "Barranco",
  "Breña",
  "Carabayllo",
  "Chaclacayo",
  "Chorrillos",
  "Cieneguilla",
  "Comas",
  "El Agustino",
  "Independencia",
  "Jesús María",
  "La Molina",
  "La Victoria",
  "Lima",
  "Lince",
  "Los Olivos",
  "Lurigancho",
  "Lurín",
  "Magdalena del Mar",
  "Miraflores",
  "Pachacamac",
  "Pucusana",
  "Pueblo Libre",
  "Puente Piedra",
  "Punta Hermosa",
  "Punta Negra",
  "Rímac",
  "San Bartolo",
  "San Borja",
  "San Isidro",
  "San Juan de Lurigancho",
  "San Juan de Miraflores",
  "San Luis",
  "San Martín de Porres",
  "San Miguel",
  "Santa Anita",
  "Santa María del Mar",
  "Santa Rosa",
  "Santiago de Surco",
  "Surquillo",
  "Villa El Salvador",
  "Villa María del Triunfo"
];

export const contextura = ["Delgada", "Media", "Robusta"];
export const tez = ["Clara", "Morena", "Trigueña", "Oscura"];

// Versiones con formato value/label (para uso futuro más estructurado)
export const paisesOptions = paises.map(p => ({ value: p, label: p }));
export const distritosOptions = distritos.map(d => ({ value: d, label: d }));
export const contexturaOptions = contextura.map(c => ({ value: c, label: c }));
export const tezOptions = tez.map(t => ({ value: t, label: t }));

export const estadosCaso = [
  { value: "desaparecida", label: "Desaparecida" },
  { value: "encontrada", label: "Encontrada" },
];