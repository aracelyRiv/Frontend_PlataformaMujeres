// src/services/auth.js

// Mock de login mientras no existe backend real
export async function loginMock({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@ejemplo.com" && password === "123456") {
        resolve({ token: "fake-token", user: { email } });
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 1200);
  });
}
