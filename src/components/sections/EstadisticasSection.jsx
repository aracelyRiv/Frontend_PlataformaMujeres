import React, { useState, useEffect } from "react";
import { calcularEstadisticasUsuario } from "../../services/estadisticas";
import { getCurrentUser } from "../../services/auth";
import Card from "../ui/card";
import { 
  Users, 
  CheckCircle, 
  Eye, 
  TrendingUp, 
  MapPin,
  Calendar,
  Percent,
  CalendarClock,
  UserCheck
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function EstadisticasSection() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [casoSeleccionado, setCasoSeleccionado] = useState("todos");
  const user = getCurrentUser();
  const userId = user?.id;

  useEffect(() => {
    const cargarEstadisticas = async () => {
      setIsLoading(true);
      try {
        if (!userId) {
          throw new Error("Usuario no autenticado");
        }
        const data = await calcularEstadisticasUsuario(userId);
        setEstadisticas(data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      cargarEstadisticas();
    }
  }, [userId]); // Dependencia del ID del usuario

  // Filtrar datos por caso seleccionado - MOVER ANTES DE LOS RETURNS
  const datosFiltrados = React.useMemo(() => {
    if (!estadisticas) return null;

    const { 
      kpis,
      estadoValidacion, 
      distritosAvistamientos,
      nivelesCoincidencia,
      ultimosAvistamientos,
      todosLosAvistamientos // USAR TODOS los avistamientos para filtrado
    } = estadisticas;

    if (casoSeleccionado === "todos") {
      return {
        kpis,
        estadoValidacion,
        distritosAvistamientos,
        nivelesCoincidencia,
        ultimosAvistamientos
      };
    }
    
    // Filtrar para un caso específico usando TODOS los avistamientos
    const avistamientosCaso = todosLosAvistamientos.filter(av => String(av.casoId) === String(casoSeleccionado));
    
    // RECALCULAR KPIs para el caso específico
    const totalAvistamientosCaso = avistamientosCaso.length;
    const confirmadosCaso = avistamientosCaso.filter(av => av.estado === 'aceptado').length;
    
    // Promedio de coincidencia del caso
    const scoresValidos = avistamientosCaso
      .filter(av => av.porcentaje && av.porcentaje > 0)
      .map(av => av.porcentaje);
    const promedioCoincidenciaCaso = scoresValidos.length > 0
      ? Math.round(scoresValidos.reduce((sum, score) => sum + score, 0) / scoresValidos.length)
      : 0;
    
    // Distrito con más reportes del caso
    const distritosMapCaso = {};
    avistamientosCaso.forEach(av => {
      distritosMapCaso[av.distrito] = (distritosMapCaso[av.distrito] || 0) + 1;
    });
    const distritoTopCaso = Object.entries(distritosMapCaso)
      .sort((a, b) => b[1] - a[1])[0];
    
    // Último avistamiento del caso
    const ultimoAvCaso = avistamientosCaso.length > 0
      ? [...avistamientosCaso].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0]
      : null;
    const ultimaFechaCaso = ultimoAvCaso
      ? new Date(ultimoAvCaso.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Sin reportes';
    
    const kpisCaso = {
      totalAvistamientos: totalAvistamientosCaso,
      avistamientosConfirmados: confirmadosCaso,
      tasaCoincidenciaPromedio: promedioCoincidenciaCaso,
      distritoMasReportes: distritoTopCaso ? distritoTopCaso[0] : 'N/A',
      reportesEnDistritoTop: distritoTopCaso ? distritoTopCaso[1] : 0,
      ultimaFechaAvistamiento: ultimaFechaCaso
    };
    
    // Recalcular estado para el caso
    const estadoPorCaso = [
      { name: 'Aceptados', value: avistamientosCaso.filter(av => av.estado === 'aceptado').length, color: '#22c55e' },
      { name: 'Pendientes', value: avistamientosCaso.filter(av => av.estado === 'pendiente').length, color: '#eab308' },
      { name: 'Rechazados', value: avistamientosCaso.filter(av => av.estado === 'rechazado').length, color: '#ef4444' }
    ];

    // Recalcular distritos para el caso
    const distritosPorCaso = Object.entries(distritosMapCaso)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Mostrar últimos 5 avistamientos del caso
    const ultimosDelCaso = avistamientosCaso
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5);

    return {
      kpis: kpisCaso,
      estadoValidacion: estadoPorCaso,
      distritosAvistamientos: distritosPorCaso,
      nivelesCoincidencia,
      ultimosAvistamientos: ultimosDelCaso
    };
  }, [casoSeleccionado, estadisticas]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9a5071] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (!estadisticas) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay datos disponibles</p>
      </div>
    );
  }

  const { 
    tendenciaAvistamientos, 
    estadoCasos, 
    avistamientosPorCaso,
    casos 
  } = estadisticas;
  
  // Usar KPIs filtrados
  const kpis = datosFiltrados?.kpis || estadisticas.kpis;

  return (
    <div className="space-y-6">
      {/* Header con Filtro */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Estadísticas de Avistamientos</h1>
            <p className="text-gray-600">Seguimiento detallado de los reportes de tus casos</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filtrar por caso:</label>
            <select
              value={casoSeleccionado}
              onChange={(e) => setCasoSeleccionado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[200px]"
            >
              <option value="todos">Todos los casos</option>
              {casos && casos.map(caso => (
                <option key={caso.id} value={caso.id}>{caso.nombre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPIs Cards - ENFOCADOS EN AVISTAMIENTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 🔹 Total Avistamientos */}
        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Reportes</p>
              <p className="text-4xl font-bold mt-1">{kpis.totalAvistamientos}</p>
              <p className="text-xs text-purple-200 mt-1">Avistamientos recibidos</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Eye className="w-10 h-10" />
            </div>
          </div>
        </Card>

        {/* 🔹 Avistamientos Confirmados */}
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Confirmados</p>
              <p className="text-3xl font-bold mt-1">{kpis.avistamientosConfirmados}</p>
              <p className="text-xs text-green-200 mt-1">
                {kpis.totalAvistamientos > 0 
                  ? `${((kpis.avistamientosConfirmados / kpis.totalAvistamientos) * 100).toFixed(0)}% validados`
                  : 'Sin reportes'}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <UserCheck className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* 🔹 Tasa de Coincidencia Promedio */}
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Coincidencia</p>
              <p className="text-3xl font-bold mt-1">{kpis.tasaCoincidenciaPromedio}%</p>
              <p className="text-xs text-blue-200 mt-1">Promedio reconocimiento</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Percent className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* 🔹 Distrito con más reportes */}
        <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Zona Principal</p>
              <p className="text-xl font-bold mt-1 truncate">{kpis.distritoMasReportes}</p>
              <p className="text-xs text-orange-200 mt-1">{kpis.reportesEnDistritoTop} reportes</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <MapPin className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* 🔹 Último Avistamiento */}
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Último Reporte</p>
              <p className="text-sm font-bold mt-1">{kpis.ultimaFechaAvistamiento}</p>
              <p className="text-xs text-indigo-200 mt-1">Fecha más reciente</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <CalendarClock className="w-8 h-8" />
            </div>
          </div>
        </Card>
      </div>

      {/* Avistamientos por Distrito y Estado de Avistamientos en una fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Avistamientos por distrito */}
        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-800">Avistamientos por Distrito</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {casoSeleccionado === "todos" 
              ? "Zonas con mayor número de reportes recibidos"
              : "Zonas de avistamientos del caso seleccionado"}
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosFiltrados.distritosAvistamientos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value} reportes`, 'Total']} />
              <Bar dataKey="value" fill="#f97316" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-sm text-gray-700">
              📍 <strong>Análisis geográfico:</strong> Los distritos con más reportes indican dónde hay mayor actividad comunitaria.
            </p>
          </div>
        </Card>

        {/* Estado de Avistamientos */}
        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Estado de Avistamientos</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Clasificación de reportes: aceptados, pendientes y rechazados</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datosFiltrados.estadoValidacion}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {datosFiltrados.estadoValidacion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {datosFiltrados.estadoValidacion.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">
              💡 <strong>Interpretación:</strong> Aceptados = confirmados por ti. Pendientes = requieren revisión. 
              Rechazados = descartados como no válidos.
            </p>
          </div>
        </Card>
      </div>

      {/* Evolución de Avistamientos (Line Chart) */}
      {tendenciaAvistamientos.length > 0 && (
        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Evolución de Avistamientos</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Reportes recibidos a lo largo del tiempo (últimos 30 días)</p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={tendenciaAvistamientos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="fecha" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} reportes`, 'Total']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#9333ea" 
                strokeWidth={3}
                dot={{ fill: '#9333ea', r: 5 }}
                activeDot={{ r: 7 }}
                name="Avistamientos"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-700">
              📈 <strong>Tendencia:</strong> Los picos en fechas específicas pueden correlacionarse con actividades de difusión 
              o eventos que aumentaron la visibilidad de los casos.
            </p>
          </div>
        </Card>
      )}

      {/* Niveles de coincidencia facial - ancho completo */}
      <Card className="bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Percent className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Niveles de Coincidencia Facial</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Distribución de puntajes del reconocimiento facial</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosFiltrados.nivelesCoincidencia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rango" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} reportes`, 'Total']} />
            <Bar dataKey="cantidad" radius={[8, 8, 0, 0]}>
              {datosFiltrados.nivelesCoincidencia.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-400"></div>
            <span className="text-gray-600">Bajo (75-80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-gray-600">Medio (80-90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-gray-600">Alto (90-100%)</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
          <p className="text-sm text-gray-700">
            ✅ <strong>Recomendación:</strong> Las coincidencias superiores al 90% son muy confiables. 
            El sistema solo registra avistamientos con un mínimo del 75% de coincidencia.
          </p>
        </div>
      </Card>

      {/* Avistamientos por Caso y Últimos Avistamientos en una fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Avistamientos por Cada Caso */}
        {avistamientosPorCaso && avistamientosPorCaso.length > 0 && (
          <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Avistamientos por Cada Caso</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Detalle de cuántos reportes ha recibido cada uno de tus casos</p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={avistamientosPorCaso} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="nombre" type="category" width={150} />
              <Tooltip 
                formatter={(value) => [`${value} avistamientos`, 'Total']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}
              />
              <Bar 
                dataKey="avistamientos" 
                radius={[0, 8, 8, 0]}
              >
                {avistamientosPorCaso.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.estado === 'encontrada' ? '#22c55e' : '#9333ea'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-600"></div>
              <span className="text-gray-600">En búsqueda</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-gray-600">Encontrada</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-700">
              💡 <strong>Interpretación:</strong> Cada barra muestra cuántos avistamientos has recibido para ese caso. 
              Los casos con más avistamientos tienen mayor visibilidad en la comunidad.
            </p>
          </div>
        </Card>
        )}

        {/* Últimos Avistamientos Recibidos */}
        <Card className="bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Últimos Avistamientos Recibidos</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Los 5 reportes más recientes de tus casos</p>
        <div className="space-y-3">
          {datosFiltrados.ultimosAvistamientos.length > 0 ? (
            datosFiltrados.ultimosAvistamientos.map((av) => (
              <div key={av.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">{av.nombreCaso}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        📍 <span className="font-medium">{av.distrito}</span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        📅 {new Date(av.fecha).toLocaleDateString('es-PE', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {av.porcentaje > 0 && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        {av.porcentaje}% match
                      </span>
                    )}
                    {/* Badge según estado */}
                    {av.estado === 'aceptado' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        ✓ Aceptado
                      </span>
                    )}
                    {av.estado === 'pendiente' && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                        ⏳ Pendiente
                      </span>
                    )}
                    {av.estado === 'rechazado' && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                        ✗ Rechazado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Eye className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No hay avistamientos registrados aún</p>
              <p className="text-sm text-gray-400 mt-2">Los reportes aparecerán aquí cuando se reciban</p>
            </div>
          )}
        </div>
      </Card>
      </div>

      {/* INFORMACIÓN COMPLEMENTARIA: Estado de casos y contexto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Estado de tus Casos</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Contexto: Resumen de los casos activos</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={estadoCasos}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {estadoCasos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-3">
            {estadoCasos.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Métricas de Efectividad</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Indicadores clave del progreso</p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Tasa de Resolución</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{kpis.tasaResolucion}%</p>
                <p className="text-xs text-gray-500 mt-1">Casos resueltos exitosamente</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Tiempo Promedio</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{kpis.tiempoPromedioBusqueda} días</p>
                <p className="text-xs text-gray-500 mt-1">Desde reporte hasta resolución</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Promedio de Reportes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{kpis.promedioAvistamientos}</p>
                <p className="text-xs text-gray-500 mt-1">Avistamientos por caso</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
