import React, { useState, useEffect } from "react";
import { getCurrentUser, updateProfileMock } from "../../services/auth";
import Card from "../ui/card";
import { User, Mail, Phone, CreditCard, Calendar, Edit2, Save, X } from "lucide-react";
import LoadingButton from "../ui/LoadingButton";

export default function PerfilSection() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setEditedData(currentUser);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(user);
    setSuccessMessage("");
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage("");
    
    try {
      // Usar función del servicio auth
      await updateProfileMock({
        nombre: editedData.nombre,
        dni: editedData.dni,
        telefono: editedData.telefono
      });
      
      setUser(editedData);
      setIsEditing(false);
      setSuccessMessage("Perfil actualizado correctamente");
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert(error.message || "Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal</p>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      <Card className="bg-white">
        {/* Avatar y botón editar */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#9a5071] to-[#c2789d] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.nombre?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.nombre}</h2>
              <p className="text-sm text-gray-500">Familiar registrado</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9a5071] to-[#c2789d] text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Edit2 className="w-4 h-4" />
              <span>Editar perfil</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
              <LoadingButton
                onClick={handleSave}
                isLoading={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </LoadingButton>
            </div>
          )}
        </div>

        {/* Información personal */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>

          {/* Nombre completo */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.nombre || ""}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a5071] focus:border-transparent"
                  placeholder="Ingresa tu nombre"
                />
              ) : (
                <p className="text-gray-800">{user.nombre || "—"}</p>
              )}
            </div>
          </div>

          {/* DNI */}
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DNI
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.dni || ""}
                  onChange={(e) => handleChange("dni", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a5071] focus:border-transparent"
                  placeholder="Ingresa tu DNI"
                  maxLength={8}
                />
              ) : (
                <p className="text-gray-800">{user.dni || "—"}</p>
              )}
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.telefono || ""}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a5071] focus:border-transparent"
                  placeholder="Ingresa tu teléfono"
                  maxLength={9}
                />
              ) : (
                <p className="text-gray-800">{user.telefono || "—"}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <p className="text-gray-800">{user.email || "—"}</p>
              {isEditing && (
                <p className="text-xs text-gray-500 mt-1">
                  El correo no puede ser modificado. Contacta con soporte si necesitas cambiarlo.
                </p>
              )}
            </div>
          </div>

          {/* Fecha de registro */}
          {user.fechaRegistro && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miembro desde
                </label>
                <p className="text-gray-800">
                  {new Date(user.fechaRegistro).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
