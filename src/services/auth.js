// src/services/auth.js

// ==========================================
// 📌 CONFIGURACIÓN DEL BACKEND
// ==========================================
// Cambia esta URL cuando conectes con tu backend real
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// ==========================================
// 🔐 FUNCIÓN DE LOGIN REAL (para tu backend)
// ==========================================
/**
 * Función para iniciar sesión con el backend real
 * Tu backend debe:
 * 1. Recibir: { email, password } (la contraseña ya viene encriptada desde tu backend)
 * 2. Validar las credenciales en la base de datos
 * 3. Retornar: { token, user: { id, email, nombre } }
 */
export async function login({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Manejar errores HTTP
      if (response.status === 401) {
        throw new Error("Credenciales incorrectas. Verifica tu correo y contraseña.");
      } else if (response.status === 404) {
        throw new Error("Usuario no encontrado.");
      } else if (response.status >= 500) {
        throw new Error("Error en el servidor. Intenta más tarde.");
      }
      throw new Error("Error al iniciar sesión.");
    }

    const data = await response.json();
    
    // Guardar token y usuario en localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
      // Token expira en 24 horas (ajusta según tu backend)
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem("tokenExpiry", expiryTime.toString());
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    // Si es un error de red
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Verifica tu internet.");
    }
    throw error;
  }
}

// ==========================================
// 🧪 FUNCIÓN DE LOGIN MOCK (para desarrollo)
// ==========================================
/**
 * Mock de login mientras no existe backend real
 * Simula una llamada al backend que valida credenciales y retorna un token
 * 
 * ⚠️ IMPORTANTE: En tu backend REAL, la contraseña ya debe estar encriptada
 * con bcrypt o similar. El frontend NUNCA encripta contraseñas, solo las envía
 * en HTTPS para que el backend las valide contra el hash almacenado.
 */
export async function loginMock({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Credenciales de prueba
      if (email === "test@ejemplo.com" && password === "123456") {
        const mockToken = "fake-jwt-token-" + Date.now();
        const mockUser = {
          id: 1,
          nombre: "María González",
          dni: "72345678",
          telefono: "987654321",
          email: email
        };
        
        // Guardar en localStorage
        localStorage.setItem("token", mockToken);
        // Token expira en 24 horas
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        resolve({ 
          token: mockToken, 
          user: mockUser,
          message: "Inicio de sesión exitoso" 
        });
      } else {
        reject(new Error("Credenciales incorrectas. Verifica tu correo y contraseña."));
      }
    }, 1000);
  });
}

// ==========================================
// 🛠️ FUNCIONES AUXILIARES
// ==========================================

/**
 * Función para cerrar sesión
 */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("user");
  localStorage.removeItem("userNotifications");
}

/**
 * Función para verificar si el usuario está autenticado
 * Verifica que exista el token Y que sea válido (no expirado)
 */
export function isAuthenticated() {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  
  if (!token) {
    return false;
  }
  
  // Si existe fecha de expiración, verificarla
  if (tokenExpiry) {
    const now = Date.now();
    if (now > parseInt(tokenExpiry)) {
      // Token expirado, limpiar
      logout();
      return false;
    }
  }
  
  return true;
}

/**
 * Función para obtener el usuario actual
 */
export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Función para obtener el token actual (útil para requests autenticados)
 */
export function getToken() {
  return localStorage.getItem("token");
}

// ==========================================
// 👤 FUNCIONES DE PERFIL DE USUARIO
// ==========================================

/**
 * Actualizar datos del perfil (nombre, dni, teléfono)
 */
export async function updateProfile({ nombre, dni, telefono }) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({ nombre, dni, telefono })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sesión expirada. Inicia sesión nuevamente.");
      }
      throw new Error("Error al actualizar el perfil.");
    }

    const data = await response.json();
    
    // Actualizar usuario en localStorage
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Verifica tu internet.");
    }
    throw error;
  }
}

/**
 * Mock de actualizar perfil (para desarrollo)
 */
export async function updateProfileMock({ nombre, dni, telefono }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      const updatedUser = {
        ...currentUser,
        nombre,
        dni,
        telefono
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      resolve({
        user: updatedUser,
        message: "Perfil actualizado correctamente"
      });
    }, 1000);
  });
}

// ==========================================
// 🔐 FUNCIONES DE SEGURIDAD
// ==========================================

/**
 * Cambiar contraseña del usuario
 */
export async function changePassword({ currentPassword, newPassword }) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    if (!response.ok) {
      if (response.status === 401) {
        const errorData = await response.json();
        throw new Error(errorData.error || "La contraseña actual es incorrecta.");
      }
      throw new Error("Error al cambiar la contraseña.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Verifica tu internet.");
    }
    throw error;
  }
}

/**
 * Mock de cambiar contraseña (para desarrollo)
 */
export async function changePasswordMock({ currentPassword, newPassword }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular verificación de contraseña actual
      // En desarrollo, aceptamos cualquier contraseña actual
      if (currentPassword.length === 0) {
        reject(new Error("La contraseña actual es incorrecta"));
        return;
      }
      
      resolve({
        message: "Contraseña actualizada correctamente"
      });
    }, 1500);
  });
}

// ==========================================
//  FUNCIONES DE NOTIFICACIONES
// ==========================================

/**
 * Actualizar preferencias de notificaciones
 */
export async function updateNotifications({ emailAvistamiento, emailRecordatorios }) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/notifications`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({ emailAvistamiento, emailRecordatorios })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sesión expirada. Inicia sesión nuevamente.");
      }
      throw new Error("Error al actualizar las preferencias.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Verifica tu internet.");
    }
    throw error;
  }
}

/**
 * Mock de actualizar notificaciones (para desarrollo)
 */
export async function updateNotificationsMock({ emailAvistamiento, emailRecordatorios }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Guardar en localStorage
      localStorage.setItem("userNotifications", JSON.stringify({
        emailAvistamiento,
        emailRecordatorios
      }));
      
      resolve({
        message: "Preferencias guardadas correctamente"
      });
    }, 1000);
  });
}

/**
 * Obtener preferencias de notificaciones
 */
export function getNotificationPreferences() {
  const preferences = localStorage.getItem("userNotifications");
  return preferences ? JSON.parse(preferences) : {
    emailAvistamiento: true,
    emailRecordatorios: false
  };
}

// ==========================================
// 🗑️ FUNCIONES DE ELIMINACIÓN DE CUENTA
// ==========================================

/**
 * Eliminar cuenta permanentemente
 */
export async function deleteAccount() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/delete-account`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sesión expirada. Inicia sesión nuevamente.");
      }
      throw new Error("Error al eliminar la cuenta.");
    }

    // Limpiar localStorage
    logout();

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Verifica tu internet.");
    }
    throw error;
  }
}

/**
 * Mock de eliminar cuenta (para desarrollo)
 */
export async function deleteAccountMock() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simular eliminación
      logout();
      
      resolve({
        message: "Tu cuenta ha sido eliminada permanentemente"
      });
    }, 1500);
  });
}
