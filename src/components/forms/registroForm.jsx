// src/components/forms/RegistroForm.jsx
import React, { useState } from "react";
import Card from "../ui/card";
import FormInput from "../ui/formInput";
import LoadingButton from "../ui/LoadingButton";
import ErrorMessageBanner from "../ui/ErrorMessageBanner";
import Checkbox from "../ui/Checkbox";
import { registerUser } from "../../services/register";

/**
 * RegistroForm
 * Props opcionales:
 * - onSubmit: (formData) => Promise  // si quieres manejar el submit desde afuera
 * - onSuccess: (response) => void     // se ejecuta cuando el registro fue exitoso
 */
export default function RegistroForm({ onSubmit, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    privacy: false,
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.dni.trim()) newErrors.dni = "El DNI es obligatorio.";
    else if (!/^\d{7,12}$/.test(formData.dni.trim()))
      newErrors.dni = "DNI inválido (solo números, 7-12 dígitos).";

    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Formato de correo inválido.";

    if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
    else if (formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Debes confirmar la contraseña.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (!formData.terms) newErrors.terms = "Debes aceptar los términos y condiciones.";
    if (!formData.privacy) newErrors.privacy = "Debes aceptar la política de privacidad.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");
    setSuccessMessage("");
    setErrors({});

    if (!validate()) return;

    setIsLoading(true);
    try {
      // Si el parent pasa onSubmit, lo usamos (p. ej. para usar axios desde la página)
      let response;
      if (onSubmit) {
        response = await onSubmit(formData);
      } else {
        // fallback: servicio simulado
        response = await registerUser(formData);
      }

      setSuccessMessage(response?.message || "Registro exitoso.");
      setFormData({
        nombre: "",
        dni: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
        privacy: false,
      });

      if (onSuccess) onSuccess(response);
    } catch (err) {
      // err puede ser Error() o objeto con message
      const msg = err?.message || err?.data?.message || "Ocurrió un error, intenta de nuevo.";
      setGlobalError(msg);
      // si el backend devuelve campos con errores podrías mapearlos aquí:
      // if (err.fieldErrors) setErrors(err.fieldErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto" aria-live="polite">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold text-center">Registro de Familiar</h2>

        {globalError && <ErrorMessageBanner message={globalError} />}

        {successMessage && (
          <div className="w-full bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md">
            {successMessage}
          </div>
        )}

        <FormInput
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          placeholder="Ej. Ana Pérez"
        />

        <FormInput
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          error={errors.dni}
          placeholder="Solo números"
        />

        <FormInput
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="ejemplo@correo.com"
        />

        <FormInput
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Mín. 6 caracteres"
        />

        <FormInput
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Repite la contraseña"
        />

        <div className="space-y-2 mt-2">
          <Checkbox
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            label="Acepto los términos y condiciones de uso."
            error={errors.terms}
          />

          <Checkbox
            name="privacy"
            checked={formData.privacy}
            onChange={handleChange}
            label="Acepto la política de privacidad (uso de datos)."
            error={errors.privacy}
          />
        </div>

        {/* Botones: si quieres puedes reemplazar Button por LoadingButton, uso LoadingButton aquí */}
        <div className="mt-3">
          <LoadingButton type="submit" loading={isLoading} className="w-full">
            Registrarse
          </LoadingButton>
        </div>
      </form>
    </Card>
  );
}
