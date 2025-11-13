import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Card from "../ui/card";
import LoadingButton from "../ui/LoadingButton";
import FormInput from "../ui/formInput";
import Textarea from "../ui/TextTarea";
import SelectInput from "../ui/SelectInput";
import CheckboxConModal from "../ui/CheckboxConModal";
import { distritos, contextura, tez } from "../../constants/formOptions";
import { createAvistamiento } from "../../services/avistamientos"; // Debes crear este servicio

const schema = Yup.object().shape({
  // Información del avistamiento
  distrito: Yup.string().required("El distrito es obligatorio."),
  direccion: Yup.string().required("La dirección es obligatoria."),
  fechaAvistamiento: Yup.date().required("La fecha es obligatoria.").typeError("Formato inválido."),
  hora: Yup.string().required("La hora es obligatoria."),
  vestimenta: Yup.string().required("La vestimenta es obligatoria."),
  comportamiento: Yup.string().required("El comportamiento es obligatorio."),
  observaciones: Yup.string().nullable(),

  // Características físicas
  estatura: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .min(0.5, "La estatura debe ser al menos 0.5 m")
    .max(2.5, "La estatura no puede superar 2.5 m")
    .nullable(),
  contextura: Yup.string().nullable(),
  tez: Yup.string().nullable(),
  senasParticulares: Yup.string().nullable(),
  imagen: Yup.mixed().nullable(),

  // Datos del reportante
  nombreReportante: Yup.string().required("El nombre es obligatorio."),
  email: Yup.string().email("Email inválido").required("El email es obligatorio."),
  telefono: Yup.string().required("El teléfono es obligatorio."),

  aceptar: Yup.boolean()
    .oneOf([true], "Debe aceptar los términos y condiciones.")
    .required(),
});

export default function AvistamientoForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id: casoId } = useParams();
  
  // Obtener la imagen y recognitionId desde el estado de navegación
  const imageFromRecognition = location.state?.imageData || null;
  const recognitionId = location.state?.recognitionId || null;
  const fromRecognition = location.state?.fromRecognition || false;
  
  const imagenSeleccionada = watch("imagen");

  const onSubmit = async (data) => {
    try {
      // Si viene del reconocimiento facial, usar esa imagen; si no, procesar la imagen subida
      let imagenBase64 = imageFromRecognition || "";
      
      if (!imageFromRecognition) {
        const file = data.imagen && data.imagen[0];
        if (file) {
          imagenBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
      }
      
      await createAvistamiento({
        ...data,
        casoId,
        imagen: imagenBase64,
        recognitionId, // incluir el recognitionId del reconocimiento facial
      });
      alert("¡Avistamiento reportado con éxito!");
      reset();
      navigate("/desaparecidas");
    } catch (err) {
      alert(`Error: ${err.message || "No se pudo reportar el avistamiento"}`);
    }
  };

  return (
    <Card title="Reportar Avistamiento" className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

        {/* Información del avistamiento */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold text-gray-800">
            Información del avistamiento
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Controller
              name="distrito"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Distrito *"
                  {...field}
                  error={errors.distrito?.message}
                  options={distritos}
                />
              )}
            />
            <Controller
              name="direccion"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Dirección *"
                  {...field}
                  error={errors.direccion?.message}
                  placeholder="Ej: Av. Perú 123"
                />
              )}
            />
            <Controller
              name="fechaAvistamiento"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Fecha de avistamiento *"
                  type="date"
                  {...field}
                  error={errors.fechaAvistamiento?.message}
                />
              )}
            />
            <Controller
              name="hora"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Hora *"
                  type="time"
                  {...field}
                  error={errors.hora?.message}
                />
              )}
            />
            <Controller
              name="vestimenta"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Vestimenta *"
                  {...field}
                  error={errors.vestimenta?.message}
                  placeholder="Ej: Polo azul y jeans"
                />
              )}
            />
            <Controller
              name="comportamiento"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Comportamiento *"
                  {...field}
                  error={errors.comportamiento?.message}
                  placeholder="Ej: Caminando sola, parecía desorientada"
                />
              )}
            />
          </div>
          <Controller
            name="observaciones"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Observaciones"
                {...field}
                error={errors.observaciones?.message}
                placeholder="Detalles adicionales"
              />
            )}
          />
        </fieldset>

        {/* Características físicas */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold text-gray-800">
            Características físicas
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Controller
              name="estatura"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Estatura (metros)"
                  type="number"
                  step="0.01"
                  {...field}
                  error={errors.estatura?.message}
                  placeholder="Ej: 1.65"
                />
              )}
            />
            <Controller
              name="contextura"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Contextura"
                  {...field}
                  options={contextura}
                />
              )}
            />
            <Controller
              name="tez"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Tez"
                  {...field}
                  options={tez}
                />
              )}
            />
          </div>
          <Controller
            name="senasParticulares"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Señas particulares"
                {...field}
                error={errors.senasParticulares?.message}
                placeholder="Ej: Cicatriz en la ceja derecha"
              />
            )}
          />
          
          {/* Vista previa de la imagen capturada en el reconocimiento facial */}
          {fromRecognition && imageFromRecognition && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Imagen capturada del reconocimiento facial
              </label>
              <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <img
                  src={imageFromRecognition}
                  alt="Imagen del reconocimiento"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-green-300 shadow-sm"
                />
                <div className="flex-1">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    ✓ Imagen automáticamente vinculada
                  </p>
                  <p className="text-xs text-green-700">
                    Esta imagen fue capturada durante el proceso de reconocimiento facial y se incluirá automáticamente en el reporte.
                  </p>
                </div>
              </div>
            </div>
          )}
        </fieldset>

        {/* Datos del reportante */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold text-gray-800">
            Datos del reportante
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Controller
              name="nombreReportante"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Nombre completo *"
                  {...field}
                  error={errors.nombreReportante?.message}
                  placeholder="Ej: Juan Pérez"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Email *"
                  type="email"
                  {...field}
                  error={errors.email?.message}
                  placeholder="Ej: correo@ejemplo.com"
                />
              )}
            />
            <Controller
              name="telefono"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Teléfono *"
                  {...field}
                  error={errors.telefono?.message}
                  placeholder="Ej: 999999999"
                />
              )}
            />
          </div>
        </fieldset>

        {/* Aceptar términos */}
        <Controller
          name="aceptar"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CheckboxConModal
              id="aceptar"
              checked={value}
              onChange={onChange}
              error={errors.aceptar?.message}
              label="Acepto los términos y condiciones y la política de privacidad *"
              modalContent={
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Al enviar este reporte, confirmas que la información proporcionada es verídica y autorizas su uso para fines de búsqueda y localización, conforme a la Ley N° 29733 – Ley de Protección de Datos Personales.
                  </p>
                </div>
              }
            />
          )}
        />

        {/* Botón de envío */}
        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
        >
          Guardar
        </LoadingButton>
      </form>
    </Card>
  );
}