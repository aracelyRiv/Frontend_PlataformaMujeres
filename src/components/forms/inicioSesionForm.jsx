import React, { useState } from "react";
import FormInput from "../ui/formInput";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../ui/card";
import ErrorMessageBanner from "../ui/ErrorMessageBanner";
import LoadingButton from "../ui/LoadingButton";
import { loginMock } from "../../services/auth";

export default function InicioSesionForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la URL de origen si existe (viene de ProtectedRoute)
  const from = location.state?.from?.pathname || "/dashboard";

  // Limpiar errores cuando el usuario escribe
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
    if (globalError) setGlobalError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
    if (globalError) setGlobalError("");
  };

  const validate = () => {
    const newErrors = {};
    
    // Validación de email
    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    } else if (emailTrimmed.length > 100) {
      newErrors.email = "El correo es demasiado largo.";
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    } else if (password.length > 50) {
      newErrors.password = "La contraseña es demasiado larga.";
    } else if (password.includes(" ")) {
      newErrors.password = "La contraseña no puede contener espacios.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");
    setErrors({});

    if (!validate()) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit({ email: email.trim(), password });
      } else {
        await loginMock({ email: email.trim(), password });
      }
      // Redirigir a la página original o a mis-casos por defecto
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err?.message || "Credenciales incorrectas. Por favor, verifica tu correo y contraseña.";
      setGlobalError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-live="polite"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Iniciar Sesión
        </h2>

        {globalError && <ErrorMessageBanner message={globalError} />}

        <FormInput
          id="email"
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="ejemplo@correo.com"
          error={errors.email}
          autoComplete="email"
          required
        />

        <FormInput
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••••"
          error={errors.password}
          autoComplete="current-password"
          required
        />

        <LoadingButton
          type="submit"
          loading={isLoading}
          className="w-full mt-2"
          aria-busy={isLoading}
        >
          Ingresar
        </LoadingButton>
      </form>
    </Card>
  );
}
