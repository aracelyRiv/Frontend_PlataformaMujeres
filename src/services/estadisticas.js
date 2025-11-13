// src/services/estadisticas.js
import { getCases } from './cases';
import { getAvistamientos } from './avistamientos';

/**
 * Calcular estadísticas generales de los casos y avistamientos
 * (PÚBLICAS - para todos los usuarios)
 */
export async function calcularEstadisticas() {
  try {
    const casos = await getCases();
    const avistamientos = await getAvistamientos();

    // 1. KPIs principales
    const totalCasos = casos.length;
    const desaparecidas = casos.filter(c => c.estado === 'desaparecida').length;
    const encontradas = casos.filter(c => c.estado === 'encontrada').length;
    const totalAvistamientos = avistamientos.length;

    // 2. Estado de casos (para gráfico de dona)
    const estadoCasos = [
      { name: 'Desaparecidas', value: desaparecidas, color: '#ef4444' },
      { name: 'Encontradas', value: encontradas, color: '#22c55e' }
    ];

    // 3. Casos por distrito
    const casosPorDistrito = {};
    casos.forEach(caso => {
      const distrito = caso.distrito || 'Sin distrito';
      casosPorDistrito[distrito] = (casosPorDistrito[distrito] || 0) + 1;
    });

    const distritos = Object.entries(casosPorDistrito)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // 4. Casos por rango de edad
    const rangosEdad = {
      '18-20': 0,
      '21-25': 0,
      '26-30': 0,
      '30+': 0
    };

    casos.forEach(caso => {
      const edad = caso.edad;
      if (edad >= 18 && edad <= 20) rangosEdad['18-20']++;
      else if (edad >= 21 && edad <= 25) rangosEdad['21-25']++;
      else if (edad >= 26 && edad <= 30) rangosEdad['26-30']++;
      else if (edad > 30) rangosEdad['30+']++;
    });

    const edades = Object.entries(rangosEdad).map(([name, value]) => ({
      rango: name,
      casos: value
    }));

    // 5. Casos por mes (tendencia temporal)
    const casosPorMes = {};
    casos.forEach(caso => {
      if (caso.fechaHecho) {
        const fecha = new Date(caso.fechaHecho);
        const mes = fecha.toLocaleDateString('es-PE', { month: 'short', year: 'numeric' });
        casosPorMes[mes] = (casosPorMes[mes] || 0) + 1;
      }
    });

    const tendencia = Object.entries(casosPorMes)
      .map(([mes, total]) => ({ mes, total }))
      .sort((a, b) => new Date(a.mes) - new Date(b.mes));

    // 6. Top 5 distritos con más casos
    const topDistritos = distritos.slice(0, 5);

    // 7. Últimos avistamientos
    const ultimosAvistamientos = avistamientos
      .sort((a, b) => new Date(b.fechaRegistro || b.fechaAvistamiento) - new Date(a.fechaRegistro || a.fechaAvistamiento))
      .slice(0, 5)
      .map(av => {
        const caso = casos.find(c => c.id === av.casoId);
        return {
          id: av.id,
          nombreCaso: caso?.nombre || 'Caso no encontrado',
          distrito: av.distrito,
          fecha: av.fechaAvistamiento,
          porcentaje: av.recognitionScore || 0
        };
      });

    // 8. Métricas adicionales
    const tasaResolucion = totalCasos > 0 ? ((encontradas / totalCasos) * 100).toFixed(1) : '0.0';
    const promedioAvistamientos = totalCasos > 0 ? (totalAvistamientos / totalCasos).toFixed(2) : '0.00';

    // Calcular tiempo promedio de búsqueda (casos encontrados)
    let tiempoPromedioBusqueda = 0;
    const casosEncontrados = casos.filter(c => c.estado === 'encontrada');
    if (casosEncontrados.length > 0) {
      const tiempos = casosEncontrados.map(caso => {
        const fechaInicio = new Date(caso.fechaHecho);
        // Asumimos que fue encontrada "hoy" (en producción vendrá de la BD)
        const fechaFin = new Date();
        const dias = Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
        return dias;
      });
      tiempoPromedioBusqueda = Math.round(
        tiempos.reduce((sum, dias) => sum + dias, 0) / tiempos.length
      );
    }

    return {
      kpis: {
        totalCasos,
        desaparecidas,
        encontradas,
        totalAvistamientos,
        tasaResolucion: parseFloat(tasaResolucion),
        promedioAvistamientos: parseFloat(promedioAvistamientos),
        tiempoPromedioBusqueda
      },
      estadoCasos,
      distritos,
      edades,
      tendencia,
      topDistritos,
      ultimosAvistamientos
    };
  } catch (error) {
    console.error('Error al calcular estadísticas:', error);
    throw error;
  }
}

/**
 * Calcular estadísticas PERSONALES del usuario autenticado
 * Solo incluye los casos y avistamientos del usuario
 * ENFOQUE: Métricas centradas en AVISTAMIENTOS
 * @param {number} userId - ID del usuario autenticado
 */
export async function calcularEstadisticasUsuario(userId) {
  try {
    const todosCasos = await getCases();
    const todosAvistamientos = await getAvistamientos();

    // Filtrar solo los casos del usuario
    const casos = todosCasos.filter(c => c.userId === userId);
    
    // Filtrar solo los avistamientos de los casos del usuario
    const casosIds = casos.map(c => c.id);
    const avistamientos = todosAvistamientos.filter(av => casosIds.includes(av.casoId));

    // 1. KPIs principales - ENFOQUE EN AVISTAMIENTOS
    const totalCasos = casos.length;
    const desaparecidas = casos.filter(c => c.estado === 'desaparecida').length;
    const encontradas = casos.filter(c => c.estado === 'encontrada').length;
    const totalAvistamientos = avistamientos.length;
    
    // 🔹 Avistamientos confirmados (estado = 'aceptado')
    const avistamientosConfirmados = avistamientos.filter(av => av.estado === 'aceptado').length;
    
    // 🔹 Tasa de coincidencia promedio (recognitionScore)
    const scoresValidos = avistamientos
      .filter(av => av.recognitionScore && av.recognitionScore > 0)
      .map(av => av.recognitionScore);
    const tasaCoincidenciaPromedio = scoresValidos.length > 0
      ? Math.round(scoresValidos.reduce((sum, score) => sum + score, 0) / scoresValidos.length)
      : 0;
    
    // 🔹 Distrito con más reportes
    const avistamientosPorDistrito = {};
    avistamientos.forEach(av => {
      const distrito = av.distrito || 'Sin distrito';
      avistamientosPorDistrito[distrito] = (avistamientosPorDistrito[distrito] || 0) + 1;
    });
    const distritoMasReportes = Object.entries(avistamientosPorDistrito)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const reportesEnDistritoTop = Object.entries(avistamientosPorDistrito)
      .sort((a, b) => b[1] - a[1])[0]?.[1] || 0;
    
    // 🔹 Último avistamiento registrado
    const ultimoAvistamiento = avistamientos.length > 0
      ? [...avistamientos].sort((a, b) => 
          new Date(b.fechaRegistro || b.fechaAvistamiento) - new Date(a.fechaRegistro || a.fechaAvistamiento)
        )[0]
      : null;
    const ultimaFechaAvistamiento = ultimoAvistamiento
      ? new Date(ultimoAvistamiento.fechaRegistro || ultimoAvistamiento.fechaAvistamiento)
          .toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Sin reportes';

    // 2. Estado de validación de avistamientos (para gráfico de dona/pastel)
    const avistamientosPendientes = avistamientos.filter(av => av.estado === 'pendiente').length;
    const avistamientosRechazados = avistamientos.filter(av => av.estado === 'rechazado').length;
    const estadoValidacion = [
      { name: 'Aceptados', value: avistamientosConfirmados, color: '#22c55e' },
      { name: 'Pendientes', value: avistamientosPendientes, color: '#f59e0b' },
      { name: 'Rechazados', value: avistamientosRechazados, color: '#ef4444' }
    ];

    // 3. Estado de casos (secundario - para contexto)
    const estadoCasos = [
      { name: 'Desaparecidas', value: desaparecidas, color: '#ef4444' },
      { name: 'Encontradas', value: encontradas, color: '#22c55e' }
    ];

    // 4. Avistamientos por distrito (gráfico de barras principal)
    const distritosAvistamientos = Object.entries(avistamientosPorDistrito)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // 5. Avistamientos a lo largo del tiempo (gráfico de líneas)
    const avistamientosPorFecha = {};
    const fechasOrdenadas = [];
    
    avistamientos.forEach(av => {
      if (av.fechaAvistamiento) {
        const fecha = new Date(av.fechaAvistamiento);
        const fechaKey = fecha.toISOString().split('T')[0]; // YYYY-MM-DD para ordenar
        const fechaStr = fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
        
        if (!avistamientosPorFecha[fechaKey]) {
          avistamientosPorFecha[fechaKey] = {
            fecha: fechaStr,
            total: 0,
            fechaReal: fecha
          };
          fechasOrdenadas.push(fechaKey);
        }
        avistamientosPorFecha[fechaKey].total++;
      }
    });

    const tendenciaAvistamientos = fechasOrdenadas
      .sort((a, b) => new Date(a) - new Date(b))
      .map(key => ({
        fecha: avistamientosPorFecha[key].fecha,
        total: avistamientosPorFecha[key].total
      }))
      .slice(-30); // Últimos 30 días

    // 6. Niveles de coincidencia facial (histograma)
    // Rangos ajustados: ya que el mínimo aceptado es 75%
    const rangosCoincidencia = {
      '75-80%': 0,  // Bajo (apenas cumple el umbral)
      '80-90%': 0,  // Medio (confianza moderada)
      '90-100%': 0  // Alto (muy confiable)
    };

    avistamientos.forEach(av => {
      const score = av.recognitionScore || 0;
      if (score >= 75 && score < 80) rangosCoincidencia['75-80%']++;
      else if (score >= 80 && score < 90) rangosCoincidencia['80-90%']++;
      else if (score >= 90) rangosCoincidencia['90-100%']++;
    });

    const nivelesCoincidencia = Object.entries(rangosCoincidencia).map(([rango, cantidad]) => ({
      rango,
      cantidad,
      color: rango === '90-100%' ? '#22c55e' : rango === '80-90%' ? '#f59e0b' : '#fb923c'
    }));

    // 7. Casos por distrito (información complementaria)
    const casosPorDistrito = {};
    casos.forEach(caso => {
      const distrito = caso.distrito || 'Sin distrito';
      casosPorDistrito[distrito] = (casosPorDistrito[distrito] || 0) + 1;
    });

    const distritos = Object.entries(casosPorDistrito)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // 8. Top 5 distritos con más casos del usuario
    const topDistritos = distritos.slice(0, 5);

    // 9. Últimos avistamientos de los casos del usuario (para mostrar)
    const ultimosAvistamientos = [...avistamientos]
      .sort((a, b) => new Date(b.fechaRegistro || b.fechaAvistamiento) - new Date(a.fechaRegistro || a.fechaAvistamiento))
      .slice(0, 5)
      .map(av => {
        const caso = casos.find(c => c.id === av.casoId);
        return {
          id: av.id,
          casoId: av.casoId, // AGREGAR casoId para filtrado
          nombreCaso: caso?.nombre || 'Caso no encontrado',
          distrito: av.distrito,
          fecha: av.fechaAvistamiento,
          porcentaje: av.recognitionScore || 0,
          estado: av.estado || 'pendiente'
        };
      });

    // 9b. TODOS los avistamientos completos (para filtrado)
    const todosLosAvistamientos = avistamientos.map(av => {
      const caso = casos.find(c => c.id === av.casoId);
      return {
        id: av.id,
        casoId: av.casoId,
        nombreCaso: caso?.nombre || 'Caso no encontrado',
        distrito: av.distrito,
        fecha: av.fechaAvistamiento,
        porcentaje: av.recognitionScore || 0,
        estado: av.estado || 'pendiente'
      };
    });

    // 10. Avistamientos por caso (detalle - gráfico de barras)
    const avistamientosPorCaso = casos.map(caso => {
      const numAvistamientos = avistamientos.filter(av => av.casoId === caso.id).length;
      return {
        nombre: caso.nombre,
        avistamientos: numAvistamientos,
        estado: caso.estado
      };
    }).sort((a, b) => b.avistamientos - a.avistamientos);

    // 11. Métricas adicionales
    const tasaResolucion = totalCasos > 0 ? ((encontradas / totalCasos) * 100).toFixed(1) : '0.0';
    const promedioAvistamientos = totalCasos > 0 ? (totalAvistamientos / totalCasos).toFixed(2) : '0.00';

    // Calcular tiempo promedio de búsqueda (casos encontrados del usuario)
    let tiempoPromedioBusqueda = 0;
    const casosEncontrados = casos.filter(c => c.estado === 'encontrada');
    if (casosEncontrados.length > 0) {
      const tiempos = casosEncontrados.map(caso => {
        const fechaInicio = new Date(caso.fechaHecho);
        const fechaFin = new Date();
        const dias = Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
        return dias;
      });
      tiempoPromedioBusqueda = Math.round(
        tiempos.reduce((sum, dias) => sum + dias, 0) / tiempos.length
      );
    }

    return {
      kpis: {
        // KPIs de casos (secundarios)
        totalCasos,
        desaparecidas,
        encontradas,
        tasaResolucion: parseFloat(tasaResolucion),
        tiempoPromedioBusqueda,
        
        // KPIs de avistamientos (PRINCIPALES)
        totalAvistamientos,
        avistamientosConfirmados,
        avistamientosPendientes,
        tasaCoincidenciaPromedio,
        distritoMasReportes,
        reportesEnDistritoTop,
        ultimaFechaAvistamiento,
        promedioAvistamientos: parseFloat(promedioAvistamientos)
      },
      
      // Gráficos de avistamientos (PRINCIPALES)
      estadoValidacion,
      distritosAvistamientos,
      tendenciaAvistamientos,
      nivelesCoincidencia,
      
      // Información complementaria de casos
      estadoCasos,
      distritos,
      topDistritos,
      ultimosAvistamientos,
      todosLosAvistamientos, // AGREGAR todos los avistamientos
      avistamientosPorCaso,
      casos: casos.map(c => ({ id: c.id, nombre: c.nombre, casoId: c.id })) // Lista de casos para filtro
    };
  } catch (error) {
    console.error('Error al calcular estadísticas del usuario:', error);
    throw error;
  }
}
