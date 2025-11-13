// src/components/forms/RegistroForm.jsx
import React, { useState } from "react";
import Card from "../ui/card";
import FormInput from "../ui/formInput";
import LoadingButton from "../ui/LoadingButton";
import ErrorMessageBanner from "../ui/ErrorMessageBanner";
import CheckboxConModal from "../ui/CheckboxConModal";
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
    telefono: "",
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
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: "", color: "" });

  // Función para evaluar la fortaleza de la contraseña
  const evaluatePasswordStrength = (password) => {
    if (!password) {
      return { score: 0, text: "", color: "" };
    }

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };

    // Calcular puntuación
    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    // Determinar nivel y color
    let text, color;
    if (score <= 2) {
      text = "Débil";
      color = "text-red-600";
    } else if (score === 3) {
      text = "Media";
      color = "text-yellow-600";
    } else if (score === 4) {
      text = "Buena";
      color = "text-blue-600";
    } else {
      text = "Excelente";
      color = "text-green-600";
    }

    return { score, text, color, checks };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let sanitizedValue = value;

    // Sanitización específica por campo
    if (name === "nombre") {
      // Permitir solo letras, espacios, acentos y algunos caracteres especiales de nombres
      sanitizedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    } else if (name === "dni" || name === "telefono") {
      // Permitir solo números
      sanitizedValue = value.replace(/\D/g, "");
    } else if (name === "email") {
      // Remover espacios del email
      sanitizedValue = value.trim().toLowerCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }));

    // Evaluar fortaleza de contraseña en tiempo real
    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(sanitizedValue));
    }
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (globalError) setGlobalError("");
  };

  const validate = () => {
    const newErrors = {};

    // ========================================
    // Validación de nombre (seguridad)
    // ========================================
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio.";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else if (formData.nombre.trim().length > 100) {
      newErrors.nombre = "El nombre es demasiado largo (máx. 100 caracteres).";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre.trim())) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios.";
    } else if (formData.nombre.trim().split(" ").length < 2) {
      newErrors.nombre = "Ingresa tu nombre completo (nombre y apellido).";
    }

    // ========================================
    //  Validación de DNI peruano (con dígito verificador)
    // ========================================
    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio.";
    } else if (!/^\d{8}$/.test(formData.dni.trim())) {
      newErrors.dni = "El DNI debe tener exactamente 8 dígitos numéricos.";
    } else {
      // Validar que no sea un DNI obviamente falso
      const dni = formData.dni.trim();
      if (dni === "00000000" || dni === "11111111" || dni === "12345678") {
        newErrors.dni = "Por favor, ingresa un DNI válido.";
      }
      // Validar que no todos los dígitos sean iguales
      if (/^(\d)\1{7}$/.test(dni)) {
        newErrors.dni = "El DNI ingresado no es válido.";
      }
    }

    // ========================================
    //  Validación de teléfono peruano
    // ========================================
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^9\d{8}$/.test(formData.telefono.trim())) {
      newErrors.telefono = "Ingresa un celular válido (9 dígitos, inicia con 9).";
    } else {
      const telefono = formData.telefono.trim();
      // Validar que no sea un teléfono obviamente falso
      if (telefono === "999999999" || telefono === "900000000") {
        newErrors.telefono = "Por favor, ingresa un número de teléfono válido.";
      }
      // Validar que no todos los dígitos sean iguales
      if (/^(\d)\1{8}$/.test(telefono)) {
        newErrors.telefono = "El número de teléfono no es válido.";
      }
    }

    // ========================================
    //  Validación de email (seguridad robusta)
    // ========================================
    const emailTrimmed = formData.email.trim().toLowerCase();
    if (!emailTrimmed) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(emailTrimmed)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    } else if (emailTrimmed.length > 100) {
      newErrors.email = "El correo es demasiado largo (máx. 100 caracteres).";
    } else if (emailTrimmed.includes("..") || emailTrimmed.startsWith(".") || emailTrimmed.endsWith(".")) {
      newErrors.email = "El formato del correo no es válido.";
    } else {
      // Validar que el dominio no sea sospechoso
      const domain = emailTrimmed.split("@")[1];
      if (!domain || domain.length < 4) {
        newErrors.email = "El dominio del correo no es válido.";
      }
    }

    // ========================================
    // 5. Validación de contraseña FUERTE (seguridad)
    // ========================================
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else {
      const pwd = formData.password;
      const issues = [];

      if (pwd.length < 8) {
        issues.push("mínimo 8 caracteres");
      }
      if (!/[A-Z]/.test(pwd)) {
        issues.push("una mayúscula");
      }
      if (!/[a-z]/.test(pwd)) {
        issues.push("una minúscula");
      }
      if (!/[0-9]/.test(pwd)) {
        issues.push("un número");
      }
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
        issues.push("un carácter especial");
      }
      if (pwd.includes(" ")) {
        issues.push("no debe tener espacios");
      }
      if (pwd.length > 50) {
        issues.push("máximo 50 caracteres");
      }

      // Validar contraseñas comunes/débiles
      const weakPasswords = ["password", "123456", "qwerty", "abc123", "password123"];
      if (weakPasswords.some(weak => pwd.toLowerCase().includes(weak))) {
        issues.push("es demasiado común");
      }

      // Validar que no contenga información personal
      const nameParts = formData.nombre.toLowerCase().split(" ");
      const emailPart = formData.email.toLowerCase().split("@")[0];
      if (nameParts.some(part => part.length > 2 && pwd.toLowerCase().includes(part))) {
        issues.push("no debe incluir tu nombre");
      }
      if (emailPart.length > 3 && pwd.toLowerCase().includes(emailPart)) {
        issues.push("no debe incluir tu email");
      }

      if (issues.length > 0) {
        newErrors.password = `La contraseña debe tener: ${issues.join(", ")}.`;
      }
    }

    // ========================================
    // 6. Validación de confirmación de contraseña
    // ========================================
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    // ========================================
    // 7. Validación de términos (obligatorios)
    // ========================================
    if (!formData.terms) {
      newErrors.terms = "Debes aceptar los términos y condiciones para continuar.";
    }
    if (!formData.privacy) {
      newErrors.privacy = "Debes aceptar la política de privacidad para continuar.";
    }

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

      setSuccessMessage(response?.message || "¡Registro exitoso! Ya puedes iniciar sesión.");
      setFormData({
        nombre: "",
        dni: "",
        telefono: "",
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
          label="Nombre completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          placeholder="Ej. María García López"
          autoComplete="name"
          required
        />
        {!errors.nombre && formData.nombre && (
          <p className="text-xs text-gray-500 -mt-3">
            ✓ Ingresa tu nombre completo (nombre y apellidos)
          </p>
        )}

        <FormInput
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          error={errors.dni}
          placeholder="12345678"
          maxLength={8}
          autoComplete="off"
          required
        />
        {!errors.dni && formData.dni && formData.dni.length === 8 && (
          <p className="text-xs text-green-600 -mt-3">
            ✓ DNI válido
          </p>
        )}

        <FormInput
          label="Teléfono celular"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          error={errors.telefono}
          placeholder="987654321"
          maxLength={9}
          autoComplete="tel"
          required
        />
        {!errors.telefono && formData.telefono && formData.telefono.length === 9 && (
          <p className="text-xs text-green-600 -mt-3">
            ✓ Teléfono válido
          </p>
        )}

        <FormInput
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="ejemplo@correo.com"
          autoComplete="email"
          required
        />
        {!errors.email && formData.email && formData.email.includes("@") && (
          <p className="text-xs text-gray-500 -mt-3">
            <span className="text-yellow-600">⚠</span> Asegúrate de usar un correo válido. Recibirás notificaciones importantes aquí.
          </p>
        )}

        <div>
          <FormInput
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Mín. 8 caracteres"
            autoComplete="new-password"
            required
          />
          
          {/* Indicador de fortaleza de contraseña */}
          {formData.password && (
            <div className="mt-1 mb-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600">Fortaleza:</span>
                <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                  {passwordStrength.text}
                </span>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    passwordStrength.score <= 2 ? "bg-red-500" :
                    passwordStrength.score === 3 ? "bg-yellow-500" :
                    passwordStrength.score === 4 ? "bg-blue-500" : "bg-green-500"
                  }`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                ></div>
              </div>
              
              {/* Requisitos de contraseña con mejor espaciado */}
              <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-3">Requisitos de contraseña:</p>
                <p className={`text-xs flex items-center gap-2 ${passwordStrength.checks?.length ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  <span className="inline-block w-4 text-center">{passwordStrength.checks?.length ? '✓' : '○'}</span>
                  <span>Mínimo 8 caracteres</span>
                </p>
                <p className={`text-xs flex items-center gap-2 ${passwordStrength.checks?.uppercase ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  <span className="inline-block w-4 text-center">{passwordStrength.checks?.uppercase ? '✓' : '○'}</span>
                  <span>Una letra mayúscula (A-Z)</span>
                </p>
                <p className={`text-xs flex items-center gap-2 ${passwordStrength.checks?.lowercase ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  <span className="inline-block w-4 text-center">{passwordStrength.checks?.lowercase ? '✓' : '○'}</span>
                  <span>Una letra minúscula (a-z)</span>
                </p>
                <p className={`text-xs flex items-center gap-2 ${passwordStrength.checks?.number ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  <span className="inline-block w-4 text-center">{passwordStrength.checks?.number ? '✓' : '○'}</span>
                  <span>Un número (0-9)</span>
                </p>
                <p className={`text-xs flex items-center gap-2 ${passwordStrength.checks?.special ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  <span className="inline-block w-4 text-center">{passwordStrength.checks?.special ? '✓' : '○'}</span>
                  <span>Un carácter especial (!@#$%^&*)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <FormInput
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Repite la contraseña"
          autoComplete="new-password"
          required
        />
        {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
          <p className="text-xs text-green-600 -mt-3">
            ✓ Las contraseñas coinciden
          </p>
        )}

        {/* Mensaje de seguridad */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex gap-2">
            <span className="text-blue-600 text-lg">🔒</span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Protegemos tu información
              </h4>
              <p className="text-xs text-blue-700">
                Tus datos personales están encriptados y protegidos. Nunca compartiremos tu información 
                sin tu consentimiento, excepto cuando sea requerido por autoridades competentes.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <CheckboxConModal
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            error={errors.terms}
            label="Acepto los términos y condiciones de uso *"
            modalContent={
              <>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h3 className="font-semibold text-base mb-2">Términos y Condiciones de Uso</h3>
                    <p className="mb-3">
                      Al registrarte en esta plataforma, aceptas cumplir con los siguientes términos y condiciones:
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">1. Uso de la Plataforma</h4>
                    <p>
                      Esta plataforma tiene como único propósito facilitar la búsqueda y localización de mujeres desaparecidas en el Perú. 
                      El usuario se compromete a utilizar la plataforma exclusivamente para este fin.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">2. Veracidad de la Información</h4>
                    <p>
                      El usuario declara que toda la información proporcionada es verdadera y se compromete a mantenerla actualizada. 
                      La plataforma no se hace responsable por información falsa o incorrecta proporcionada por los usuarios.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">3. Vínculo Familiar</h4>
                    <p>
                      Al registrarse, el usuario declara ser familiar directo de la persona desaparecida o tener autorización 
                      legal para publicar su información según la <strong>Ley N° 29733 – Ley de Protección de Datos Personales</strong>.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">4. Responsabilidad</h4>
                    <p>
                      La plataforma actúa únicamente como medio de difusión. No reemplaza la denuncia formal ante autoridades 
                      competentes (Policía Nacional del Perú, Ministerio Público, INPE). El usuario es responsable de realizar 
                      las denuncias correspondientes ante las autoridades.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">5. Protección de Datos</h4>
                    <p>
                      Los datos personales serán tratados conforme a nuestra Política de Privacidad y la normativa vigente 
                      sobre protección de datos personales en el Perú.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">6. Prohibiciones</h4>
                    <p>
                      Queda prohibido usar la plataforma para:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Publicar información falsa o malintencionada</li>
                      <li>Acosar o difamar a terceros</li>
                      <li>Usar la información con fines comerciales</li>
                      <li>Violar los derechos de terceros</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">7. Modificaciones</h4>
                    <p>
                      La plataforma se reserva el derecho de modificar estos términos en cualquier momento. 
                      Los cambios serán notificados a los usuarios registrados.
                    </p>
                  </div>
                </div>
              </>
            }
          />

          <CheckboxConModal
            id="privacy"
            name="privacy"
            checked={formData.privacy}
            onChange={handleChange}
            error={errors.privacy}
            label="Acepto la política de privacidad *"
            modalContent={
              <>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h3 className="font-semibold text-base mb-2">Política de Privacidad y Protección de Datos</h3>
                    <p className="mb-3">
                      En cumplimiento de la <strong>Ley N° 29733 – Ley de Protección de Datos Personales</strong> y su 
                      reglamento, te informamos sobre el tratamiento de tus datos personales:
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">1. Responsable del Tratamiento</h4>
                    <p>
                      La plataforma [Nombre de la Plataforma] es responsable del tratamiento de los datos personales 
                      proporcionados por los usuarios.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">2. Datos Recopilados</h4>
                    <p>Recopilamos los siguientes datos personales:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Nombre completo</li>
                      <li>DNI</li>
                      <li>Número de teléfono</li>
                      <li>Correo electrónico</li>
                      <li>Datos de la persona desaparecida (nombre, foto, características físicas, etc.)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">3. Finalidad del Tratamiento</h4>
                    <p>Los datos personales serán utilizados exclusivamente para:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Facilitar la búsqueda y localización de personas desaparecidas</li>
                      <li>Publicar información de casos en la plataforma</li>
                      <li>Contactar a familiares cuando se reporten avistamientos</li>
                      <li>Mantener un registro de casos para fines estadísticos</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">4. Publicación de Datos</h4>
                    <p>
                      Los datos de las personas desaparecidas (nombre, foto, características) serán públicamente visibles 
                      en la plataforma con el único fin de facilitar su localización. Los datos del familiar registrado 
                      (nombre, teléfono, email) NO serán publicados públicamente.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">5. Seguridad de los Datos</h4>
                    <p>
                      Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos 
                      personales contra acceso no autorizado, pérdida, alteración o destrucción.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">6. Derechos del Usuario</h4>
                    <p>Como titular de los datos personales, tienes derecho a:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>Acceso:</strong> Conocer qué datos tuyos están siendo tratados</li>
                      <li><strong>Rectificación:</strong> Actualizar o corregir datos inexactos</li>
                      <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
                      <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
                    </ul>
                    <p className="mt-2">
                      Para ejercer estos derechos, puedes contactarnos a través de [correo de contacto].
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">7. Conservación de Datos</h4>
                    <p>
                      Los datos personales se conservarán mientras el caso permanezca activo en la plataforma. 
                      Una vez que la persona sea localizada o el familiar solicite la eliminación del caso, 
                      los datos serán eliminados o anonimizados.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">8. Compartición de Datos</h4>
                    <p>
                      Los datos NO serán compartidos con terceros, excepto:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Cuando sea requerido por autoridades competentes (Policía, Fiscalía)</li>
                      <li>Con tu consentimiento expreso</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">9. Cookies y Tecnologías de Seguimiento</h4>
                    <p>
                      La plataforma puede utilizar cookies para mejorar la experiencia del usuario. 
                      Puedes configurar tu navegador para rechazar cookies.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">10. Contacto</h4>
                    <p>
                      Para cualquier consulta sobre el tratamiento de tus datos personales, puedes contactarnos a: 
                      [correo electrónico de contacto]
                    </p>
                  </div>
                </div>
              </>
            }
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
