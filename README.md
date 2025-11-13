# 🌸 Plataforma de Mujeres Desaparecidas - Frontend

Plataforma web para el registro, búsqueda y seguimiento de casos de mujeres desaparecidas, con funcionalidad de reconocimiento facial y gestión de avistamientos.

## 📋 Características

- **Gestión de Casos**: Registro y seguimiento de casos de mujeres desaparecidas
- **Reconocimiento Facial**: Sistema de búsqueda por reconocimiento facial
- **Avistamientos**: Reportes y seguimiento de avistamientos ciudadanos
- **Estadísticas**: Visualización de datos y métricas
- **Autenticación**: Sistema de registro e inicio de sesión seguro
- **Filtros Avanzados**: Búsqueda por edad, fecha, estado y más

## 🚀 Instalación

### Requisitos Previos

- Node.js 14+ 
- npm o yarn
- Backend API ejecutándose (ver repositorio backend)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/aracelyRiv/Frontend_PlataformaMujeres.git
cd Frontend_PlataformaMujeres/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con la URL de tu backend
# REACT_APP_API_URL=http://localhost:8080/api
```

4. **Iniciar la aplicación**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── auth/         # Componentes de autenticación
│   ├── filters/      # Componentes de filtros
│   ├── forms/        # Formularios
│   ├── layout/       # Layout (navbar, footer)
│   ├── sections/     # Secciones de páginas
│   └── ui/           # Componentes UI básicos
├── constants/        # Constantes y configuraciones
├── pages/            # Páginas de la aplicación
├── services/         # Servicios de API
│   ├── auth.js           # Autenticación
│   ├── cases.js          # Casos
│   ├── avistamientos.js  # Avistamientos
│   ├── faceRecognition.js
│   └── estadisticas.js
└── styles/           # Estilos globales
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `REACT_APP_API_URL` | URL base del backend | `http://localhost:8080/api` |

## 🔗 Integración con Backend

Esta aplicación requiere el backend correspondiente. Asegúrate de:

1. Tener el backend ejecutándose
2. Configurar correctamente `REACT_APP_API_URL` en `.env`
3. Verificar que el backend esté configurado para aceptar peticiones desde `localhost:3000` (CORS)

Ver documentación del backend en: [INTEGRACION_BACKEND.md](./INTEGRACION_BACKEND.md)

## 🛠️ Tecnologías Utilizadas

- **React 19** - Librería principal
- **React Router v7** - Navegación
- **Tailwind CSS** - Estilos
- **Recharts** - Gráficos y estadísticas
- **Lucide React** - Iconos
- **React Hook Form + Yup** - Validación de formularios

## 📄 Licencia

Este proyecto es de código privado. Todos los derechos reservados.

.
