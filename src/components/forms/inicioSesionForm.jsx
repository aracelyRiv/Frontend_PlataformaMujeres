import React, { useState } from "react";
import FormInput from "../ui/formInput";
import Card from "../ui/card";
import ErrorMessageBanner from "../ui/ErrorMessageBanner";
import LoadingButton from "../ui/LoadingButton";
import { loginMock } from "../../services/auth"; // <-- import del servicio

export default function InicioSesionForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "El email es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Formato de email inválido.";

    if (!password) newErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit({ email, password }); // cuando tengas backend real
      } else {
        await loginMock({ email, password }); // fallback local
      }
      // Aquí podrías redirigir a dashboard si todo va bien
    } catch (err) {
      setGlobalError(err?.message || "Ocurrió un error, intenta de nuevo.");
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          error={errors.email}
        />

        <FormInput
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={errors.password}
        />

        <LoadingButton
          type="submit"
          loading={isLoading}
          className="w-full"
          aria-busy={isLoading}
        >
          Ingresar
        </LoadingButton>

        <div className="text-center mt-2">
          <a
            href="#"
            className="text-sm text-gray-600 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </Card>
  );
}
