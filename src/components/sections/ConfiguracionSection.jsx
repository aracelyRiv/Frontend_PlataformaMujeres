import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getCurrentUser, 
  logout, 
  changePasswordMock,
  updateNotificationsMock,
  deleteAccountMock,
  getNotificationPreferences
} from "../../services/auth";
import Card from "../ui/card";
import { Lock, Bell, Shield, Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import LoadingButton from "../ui/LoadingButton";

export default function ConfiguracionSection() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  // Estado para cambiar contraseña
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: "", color: "", checks: {} });

  // Estado para notificaciones
  const [notifications, setNotifications] = useState({
    emailAvistamiento: true,
    emailRecordatorios: false
  });
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Cargar preferencias al montar el componente
  useEffect(() => {
    const preferences = getNotificationPreferences();
    setNotifications(preferences);
  }, []);

  // Función para evaluar la fortaleza de la contraseña (igual que en registroForm)
  const evaluatePasswordStrength = (password) => {
    if (!password) {
      return { score: 0, text: "", color: "", checks: {} };
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

  // Manejar cambio de contraseña
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    
    // Evaluar fortaleza si es la nueva contraseña
    if (field === "newPassword") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
    
    setPasswordMessage({ type: "", text: "" });
  };

  const handleSavePassword = async () => {
    setPasswordMessage({ type: "", text: "" });

    // Validaciones (mismo formato que registroForm)
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "Completa todos los campos" });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({ type: "error", text: "La nueva contraseña debe tener al menos 8 caracteres" });
      return;
    }

    // Validar fortaleza mínima
    if (passwordStrength.score < 3) {
      setPasswordMessage({ type: "error", text: "La contraseña es muy débil. Debe tener mayúsculas, minúsculas, números y caracteres especiales" });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordMessage({ type: "error", text: "La nueva contraseña debe ser diferente a la actual" });
      return;
    }

    setIsSavingPassword(true);

    try {
      // Usar función del servicio auth
      await changePasswordMock({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      // Mostrar mensaje de éxito
      setPasswordMessage({ type: "success", text: "Contraseña actualizada correctamente" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordStrength({ score: 0, text: "", color: "", checks: {} });
      
      // Cerrar la sección después de 2 segundos para que vean el mensaje
      setTimeout(() => {
        setShowPasswordSection(false);
        setPasswordMessage({ type: "", text: "" });
      }, 2000);
    } catch (error) {
      setPasswordMessage({ type: "error", text: error.message || "Error al cambiar la contraseña" });
    } finally {
      setIsSavingPassword(false);
    }
  };

  // Manejar notificaciones
  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true);
    setNotificationMessage("");

    try {
      // Usar función del servicio auth
      await updateNotificationsMock(notifications);
      
      setNotificationMessage("Preferencias guardadas correctamente");
      setTimeout(() => setNotificationMessage(""), 3000);
    } catch (error) {
      setNotificationMessage(error.message || "Error al guardar preferencias");
    } finally {
      setIsSavingNotifications(false);
    }
  };

  // Manejar eliminación de cuenta
  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "⚠️ ADVERTENCIA: Esta acción es irreversible.\n\n" +
      "Se eliminarán:\n" +
      "• Tu información personal\n" +
      "• Todos tus casos registrados\n" +
      "• Todo el historial de avistamientos\n\n" +
      "¿Estás completamente seguro de que deseas eliminar tu cuenta?"
    );

    if (confirmation) {
      const doubleConfirmation = window.prompt(
        'Para confirmar, escribe "ELIMINAR" en mayúsculas:'
      );

      if (doubleConfirmation === "ELIMINAR") {
        try {
          // Usar función del servicio auth
          await deleteAccountMock();
          
          alert("Tu cuenta ha sido eliminada permanentemente.");
          navigate("/", { replace: true });
        } catch (error) {
          alert(error.message || "Error al eliminar la cuenta. Intenta nuevamente.");
        }
      } else {
        alert("Cancelado. Tu cuenta no ha sido eliminada.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración</h1>
        <p className="text-gray-600">Administra la seguridad y preferencias de tu cuenta</p>
      </div>

      {/* Seguridad - Cambiar contraseña */}
      <Card className="bg-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Lock className="w-6 h-6 text-[#9a5071]" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Seguridad</h2>
            <p className="text-sm text-gray-600 mb-4">
              Protege tu cuenta cambiando tu contraseña regularmente
            </p>

            {!showPasswordSection ? (
              <button
                onClick={() => setShowPasswordSection(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#9a5071] to-[#c2789d] text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Cambiar contraseña
              </button>
            ) : (
              <div className="space-y-4 mt-4">
                {/* Mensaje de estado */}
                {passwordMessage.text && (
                  <div className={`p-3 rounded-lg ${
                    passwordMessage.type === "success" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {passwordMessage.text}
                  </div>
                )}

                {/* Contraseña actual */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña actual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a5071] focus:border-transparent"
                      placeholder="Ingresa tu contraseña actual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Nueva contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a5071] focus:border-transparent"
                      placeholder="Mínimo 8 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Indicador de fortaleza */}
                  {passwordData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Fortaleza:</span>
                        <span className={`font-semibold ${passwordStrength.color}`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.score <= 2 ? "bg-red-500" :
                            passwordStrength.score === 3 ? "bg-yellow-500" :
                            passwordStrength.score === 4 ? "bg-blue-500" : "bg-green-500"
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      
                      {/* Requisitos */}
                      <div className="mt-2 space-y-1 text-xs">
                        <div className={passwordStrength.checks.length ? "text-green-600" : "text-gray-500"}>
                          {passwordStrength.checks.length ? "✓" : "○"} Mínimo 8 caracteres
                        </div>
                        <div className={passwordStrength.checks.uppercase ? "text-green-600" : "text-gray-500"}>
                          {passwordStrength.checks.uppercase ? "✓" : "○"} Una mayúscula
                        </div>
                        <div className={passwordStrength.checks.lowercase ? "text-green-600" : "text-gray-500"}>
                          {passwordStrength.checks.lowercase ? "✓" : "○"} Una minúscula
                        </div>
                        <div className={passwordStrength.checks.number ? "text-green-600" : "text-gray-500"}>
                          {passwordStrength.checks.number ? "✓" : "○"} Un número
                        </div>
                        <div className={passwordStrength.checks.special ? "text-green-600" : "text-gray-500"}>
                          {passwordStrength.checks.special ? "✓" : "○"} Un carácter especial
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a5071] focus:border-transparent"
                    placeholder="Repite la nueva contraseña"
                  />
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <LoadingButton
                    onClick={handleSavePassword}
                    isLoading={isSavingPassword}
                    className="flex-1"
                  >
                    Guardar cambios
                  </LoadingButton>
                  <button
                    onClick={() => {
                      setShowPasswordSection(false);
                      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setPasswordStrength({ score: 0, text: "", color: "", checks: {} });
                      setPasswordMessage({ type: "", text: "" });
                    }}
                    disabled={isSavingPassword}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Notificaciones */}
      <Card className="bg-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Notificaciones</h2>
            <p className="text-sm text-gray-600 mb-4">
              Gestiona cómo y cuándo quieres recibir notificaciones
            </p>

            {notificationMessage && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                {notificationMessage}
              </div>
            )}

            <div className="space-y-4">
              {/* Notificación de avistamiento */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailAvistamiento}
                  onChange={() => handleNotificationChange("emailAvistamiento")}
                  className="mt-1 w-5 h-5 text-[#9a5071] border-gray-300 rounded focus:ring-[#9a5071]"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Notificar avistamientos</p>
                  <p className="text-sm text-gray-600">Recibe un email cuando alguien reporte un avistamiento de tus casos</p>
                </div>
              </label>

              {/* Recordatorios */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailRecordatorios}
                  onChange={() => handleNotificationChange("emailRecordatorios")}
                  className="mt-1 w-5 h-5 text-[#9a5071] border-gray-300 rounded focus:ring-[#9a5071]"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Recordatorios periódicos</p>
                  <p className="text-sm text-gray-600">Recibe recordatorios semanales sobre tus casos activos</p>
                </div>
              </label>

              <LoadingButton
                onClick={handleSaveNotifications}
                isLoading={isSavingNotifications}
                className="w-full sm:w-auto"
              >
                Guardar preferencias
              </LoadingButton>
            </div>
          </div>
        </div>
      </Card>

      {/* Privacidad */}
      <Card className="bg-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Privacidad y Datos</h2>
            <p className="text-sm text-gray-600 mb-4">
              Administra tu información personal y privacidad
            </p>

            <div className="space-y-3">
              <button
                onClick={() => alert("Esta funcionalidad estará disponible próximamente")}
                className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Descargar mis datos
              </button>
              <p className="text-xs text-gray-500">
                Descarga una copia de toda tu información personal
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Zona de peligro */}
      <Card className="bg-white border-2 border-red-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Zona de Peligro</h2>
            <p className="text-sm text-gray-600 mb-4">
              Acciones irreversibles que afectan permanentemente tu cuenta
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">Eliminar cuenta permanentemente</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Esta acción eliminará tu cuenta, todos tus casos y avistamientos de forma permanente. No podrás recuperar esta información.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Eliminar mi cuenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
