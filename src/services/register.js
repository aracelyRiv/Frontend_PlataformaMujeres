

export async function registerUser(userData) {
  // Simulación de delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Validaciones que normalmente haría el backend
  if (userData.email === "existe@correo.com") {
    throw new Error("Este correo ya está registrado.");
  }

  if (userData.dni === "12345678") {
    throw new Error("El DNI ya está en uso.");
  }

  // Respuesta simulada
  return {
    success: true,
    message: "Usuario registrado con éxito.",
    data: {
      id: Date.now(), // simula id del backend
      nombre: userData.nombre,
      email: userData.email,
    },
  };
}

/**
 * 👉 Cuando tengas el backend listo, cambia la función así:
 *
export async function registerUser(userData) {
  const response = await fetch("https://api.midominio.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    // Captura errores HTTP (400, 500, etc.)
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar.");
  }

  return await response.json();
}
*/
