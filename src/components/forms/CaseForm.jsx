import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Card from "../ui/card";
import LoadingButton from "../ui/LoadingButton";
import FormInput from "../ui/formInput";
import CheckboxConModal from "../ui/CheckboxConModal";
import Textarea from "../ui/TextTarea";
import SelectInput from "../ui/SelectInput";
import { distritos, paises, contextura, tez } from "../../constants/formOptions";
import { createCase } from "../../services/cases";

const schema = Yup.object().shape({
  nombre: Yup.string().required("El nombre completo es obligatorio."),
  edad: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .min(1, "La edad debe ser al menos 1")
    .max(120, "La edad no puede superar 120")
    .required("La edad es obligatoria."),
  fechaNacimiento: Yup.date()
    .required("La fecha de nacimiento es obligatoria.")
    .typeError("Formato inválido."),
  paisNacimiento: Yup.string().required("El país de nacimiento es obligatorio."),
  distrito: Yup.string().required("El distrito es obligatorio."),
  direccionHecho: Yup.string().required("La dirección es obligatoria."),
  fechaHecho: Yup.date()
    .required("La fecha del hecho es obligatoria.")
    .typeError("Formato inválido."),
  vestimenta: Yup.string().required("La vestimenta es obligatoria."),
  circunstancias: Yup.string().required(
    "Las circunstancias de desaparición son obligatorias."
  ),
  estatura: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .min(0.5, "La estatura debe ser al menos 0.5 m")
    .max(2.5, "La estatura no puede superar 2.5 m")
    .required("La estatura es obligatoria."),
  colorCabello: Yup.string().required("El color de cabello es obligatorio."),
  colorOjos: Yup.string().required("El color de ojos es obligatorio."),
  imagen: Yup.mixed()
    .required("Debe adjuntar una imagen reciente.")
    .test("fileSize", "La imagen no debe superar 5MB", (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Solo se permiten imágenes (JPG, PNG, JPEG)", (value) => {
      if (!value || !value[0]) return false;
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      return validTypes.includes(value[0].type);
    }),
  aceptar: Yup.boolean()
    .oneOf([true], "Debe aceptar los términos para continuar.")
    .required(),

  // Opcionales
  observaciones: Yup.string().nullable(),
  senasParticulares: Yup.string().nullable(),
  condicionMedica: Yup.string().nullable(),
  contextura: Yup.string().nullable(),
  tez: Yup.string().nullable(),
});

export default function CaseForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const imagenSeleccionada = watch("imagen");

  const onSubmit = async (data) => {
    try {
      const file = data.imagen && data.imagen[0];
      let imagenBase64 = "https://via.placeholder.com/150";

      if (file) {
        imagenBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const nuevoCaso = await createCase({
        ...data,
        imagen: imagenBase64,
        estado: "desaparecida",
      });

      alert(`Caso registrado con éxito: ${nuevoCaso.nombre}`);
      reset();
      navigate("/mis-casos"); // <-- redirige a la página de casos
    } catch (err) {
      alert(`Error: ${err.message || "No se pudo registrar el caso"}`);
    }
  };

  return (
    <Card title="Registrar Caso" className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

        {/* Información personal de la víctima */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold text-gray-800">
            Información personal de la víctima
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Nombre completo *"
                  {...field}
                  error={errors.nombre?.message}
                  placeholder="Ej: Ana Torres"
                />
              )}
            />
            <Controller
              name="edad"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Edad *"
                  type="number"
                  {...field}
                  error={errors.edad?.message}
                  placeholder="Ej: 19"
                />
              )}
            />
            <Controller
              name="fechaNacimiento"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Fecha de nacimiento *"
                  type="date"
                  {...field}
                  error={errors.fechaNacimiento?.message}
                />
              )}
            />
            <Controller
              name="paisNacimiento"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="País de nacimiento *"
                  {...field}
                  error={errors.paisNacimiento?.message}
                  options={paises}
                />
              )}
            />
          </div>
        </fieldset>

        {/* Datos de la descripción del hecho */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold text-gray-800">
            Datos de la descripción del hecho
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
              name="direccionHecho"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Dirección del hecho *"
                  {...field}
                  error={errors.direccionHecho?.message}
                  placeholder="Ej: Av. Perú 123"
                />
              )}
            />
            <Controller
              name="fechaHecho"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Fecha del hecho *"
                  type="date"
                  {...field}
                  error={errors.fechaHecho?.message}
                />
              )}
            />
            <Controller
              name="vestimenta"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Vestimenta al desaparecer *"
                  {...field}
                  error={errors.vestimenta?.message}
                  placeholder="Ej: Polo rojo y jeans azules"
                />
              )}
            />
          </div>

          <Controller
            name="circunstancias"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Circunstancias de desaparición *"
                {...field}
                error={errors.circunstancias?.message}
                placeholder="Ej: Fue vista por última vez saliendo de su colegio"
              />
            )}
          />

          <Controller
            name="observaciones"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Otras observaciones"
                {...field}
                error={errors.observaciones?.message}
                placeholder="Ej: Podría estar con una amiga"
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
                  label="Estatura (metros) *"
                  type="number"
                  step="0.01"
                  {...field}
                  error={errors.estatura?.message}
                  placeholder="Ej: 1.65"
                />
              )}
            />
            <Controller
              name="colorCabello"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Color de cabello *"
                  {...field}
                  error={errors.colorCabello?.message}
                  placeholder="Ej: Castaño oscuro"
                />
              )}
            />
            <Controller
              name="colorOjos"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Color de ojos *"
                  {...field}
                  error={errors.colorOjos?.message}
                  placeholder="Ej: Marrones"
                />
              )}
            />
            <Controller
              name="contextura"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Contextura (opcional)"
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
                  label="Tez (opcional)"
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
          <Controller
            name="condicionMedica"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Condición médica"
                {...field}
                error={errors.condicionMedica?.message}
                placeholder="Ej: Asma"
              />
            )}
          />
        </fieldset>

        {/* Imagen */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold text-gray-800">Imagen</legend>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Imagen reciente *
            </label>
            <Controller
              name="imagen"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={e => field.onChange(e.target.files)}
                    className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#9a5071] file:to-[#c2789d] file:text-white hover:file:shadow-lg file:transition-all file:duration-300 file:cursor-pointer border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9a5071]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos permitidos: JPG, JPEG, PNG. Tamaño máximo: 5MB.
                  </p>
                  
                  {/* Vista previa de la imagen */}
                  {imagenSeleccionada && imagenSeleccionada[0] && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                      <div className="relative inline-block">
                        <img
                          src={URL.createObjectURL(imagenSeleccionada[0])}
                          alt="Vista previa"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                        />
                        <div className="mt-2 text-xs text-gray-600">
                          <p><strong>Nombre:</strong> {imagenSeleccionada[0].name}</p>
                          <p><strong>Tamaño:</strong> {(imagenSeleccionada[0].size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            />
            {errors.imagen && (
              <p className="text-xs text-red-600 mt-2 font-medium">
                ⚠️ {errors.imagen.message}
              </p>
            )}
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
              label="Confirmo que soy familiar, autorizo la publicación y declaro que la información es verdadera *"
              modalContent={
                <>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <h3 className="font-semibold">1. Vínculo familiar</h3>
                      <p>
                        El usuario declara ser familiar directo de la persona desaparecida y que tiene facultad para autorizar la publicación de su información, según la <strong>Ley N° 29733 – Ley de Protección de Datos Personales</strong>.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">2. Autorización de publicación</h3>
                      <p>
                        Se autoriza que los datos e imágenes ingresados sean visibles públicamente en la plataforma, exclusivamente con fines de búsqueda y localización de la persona desaparecida. Esto cumple con el derecho a la propia imagen y la <strong>Ley N° 29733</strong>.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">3. Responsabilidad sobre la información</h3>
                      <p>
                        El usuario confirma que la información ingresada es veraz y asume la responsabilidad en caso de falsedad o error en los datos proporcionados.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">4. Uso limitado de la información</h3>
                      <p>
                        La plataforma solo difunde la información con fines de búsqueda y localización y no reemplaza la denuncia formal ante autoridades competentes (Policía Nacional del Perú, Ministerio Público).
                      </p>
                    </div>
                  </div>
                </>
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
          Registrar Caso
        </LoadingButton>
      </form>
    </Card>
  );
}