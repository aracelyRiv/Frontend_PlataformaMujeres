import React, { useState, useEffect } from "react";
import { calcularEstadisticas } from "../../services/estadisticas";
import Card from "../ui/card";
import { 
  Users, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  TrendingUp, 
  MapPin,
  Calendar,
  Percent 
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

export default function EstadisticasPublicasSection() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    setIsLoading(true);
    try {
      const data = await calcularEstadisticas(); // ← ESTADÍSTICAS PÚBLICAS
      setEstadisticas(data);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const { kpis, estadoCasos, distritos, edades, tendencia, topDistritos, ultimosAvistamientos } = estadisticas;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Estadísticas Generales</h1>
        <p className="text-gray-600">Análisis y métricas de todos los casos en la plataforma</p>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Casos */}
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Casos</p>
              <p className="text-3xl font-bold mt-1">{kpis.totalCasos}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* Desaparecidas */}
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Desaparecidas</p>
              <p className="text-3xl font-bold mt-1">{kpis.desaparecidas}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <AlertCircle className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* Encontradas */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Encontradas</p>
              <p className="text-3xl font-bold mt-1">{kpis.encontradas}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* Avistamientos */}
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avistamientos</p>
              <p className="text-3xl font-bold mt-1">{kpis.totalAvistamientos}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Eye className="w-8 h-8" />
            </div>
          </div>
        </Card>
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-l-4 border-[#9a5071]">
          <div className="flex items-center gap-3">
            <Percent className="w-8 h-8 text-[#9a5071]" />
            <div>
              <p className="text-sm text-gray-600">Tasa de Resolución</p>
              <p className="text-2xl font-bold text-gray-800">{kpis.tasaResolucion}%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-gray-800">{kpis.tiempoPromedioBusqueda} días</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Avistamientos/Caso</p>
              <p className="text-2xl font-bold text-gray-800">{kpis.promedioAvistamientos}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado de Casos - Gráfico de Dona */}
        <Card className="bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Estado de Casos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estadoCasos}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
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
          <div className="flex justify-center gap-6 mt-4">
            {estadoCasos.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Casos por Rango de Edad */}
        <Card className="bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Casos por Rango de Edad</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={edades}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rango" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="casos" fill="#9a5071" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Casos por Distrito - Barra Horizontal */}
      <Card className="bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Casos por Distrito</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={distritos} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="value" fill="#c2789d" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Tendencia Temporal */}
      {tendencia.length > 0 && (
        <Card className="bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendencia de Casos Reportados</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tendencia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#9a5071" 
                strokeWidth={2}
                dot={{ fill: '#9a5071', r: 5 }}
                activeDot={{ r: 7 }}
                name="Casos Reportados"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Top Distritos y Últimos Avistamientos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Distritos */}
        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-[#9a5071]" />
            <h2 className="text-xl font-semibold text-gray-800">Top 5 Distritos</h2>
          </div>
          <div className="space-y-3">
            {topDistritos.map((distrito, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#9a5071] text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-800">{distrito.name}</span>
                </div>
                <span className="px-3 py-1 bg-[#9a5071]/10 text-[#9a5071] rounded-full font-semibold">
                  {distrito.value} casos
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Últimos Avistamientos */}
        <Card className="bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Últimos Avistamientos</h2>
          </div>
          <div className="space-y-3">
            {ultimosAvistamientos.length > 0 ? (
              ultimosAvistamientos.map((av) => (
                <div key={av.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-gray-800">{av.nombreCaso}</p>
                    {av.porcentaje > 0 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        {av.porcentaje}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">📍 {av.distrito}</p>
                  <p className="text-xs text-gray-500 mt-1">📅 {av.fecha}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No hay avistamientos registrados</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
