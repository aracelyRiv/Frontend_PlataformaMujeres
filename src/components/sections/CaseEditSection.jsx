import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Card from "../ui/card";
import LoadingButton from "../ui/LoadingButton";
import FormInput from "../ui/formInput";
import Textarea from "../ui/TextTarea";
import SelectInput from "../ui/SelectInput";
import { distritos, paises, contextura, tez, estadosCaso } from "../../constants/formOptions";
import { getCaseById, updateCase } from "../../services/cases";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CaseEditSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCaseById(id);

        // Formatea fechas para los inputs tipo date
        if (data.fechaNacimiento) {
          let fecha = data.fechaNacimiento;
          if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const d = new Date(fecha);
            fecha = !isNaN(d) ? d.toISOString().split("T")[0] : "";
          }
          data.fechaNacimiento = fecha;
        }
        if (data.fechaHecho) {
          let fecha = data.fechaHecho;
          if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const d = new Date(fecha);
            fecha = !isNaN(d) ? d.toISOString().split("T")[0] : "";
          }
          data.fechaHecho = fecha;
        }

        reset(data);
      } catch (err) {
        setError("No se pudo cargar el caso.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateCase(id, formData);
      alert("Caso actualizado correctamente");
      navigate("/mis-casos");
    } catch (err) {
      alert("Error al actualizar el caso");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-red-600 text-lg mb-3">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition bg-gray-100 px-3 py-1 rounded-md shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>
      </div>
      <Card title="Editar Caso">
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

          {/* Estado del caso */}
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <SelectInput
                label="Estado del caso *"
                {...field}
                error={errors.estado?.message}
                options={estadosCaso}
              />
            )}
          />

          {/* Imagen */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold text-gray-800">Imagen</legend>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Imagen del caso
              </label>
              <Controller
                name="imagen"
                control={control}
                render={({ field }) => (
                  <div>
                    {/* Vista previa de la imagen actual o nueva */}
                    {field.value && typeof field.value === "string" && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Imagen actual:</p>
                        <img
                          src={field.value}
                          alt="Imagen actual"
                          className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                        />
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          
                          // Validar tamaño (5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            alert("La imagen no debe superar 5MB");
                            return;
                          }
                          
                          // Validar tipo
                          const validTypes = ["image/jpeg", "image/jpg", "image/png"];
                          if (!validTypes.includes(file.type)) {
                            alert("Solo se permiten imágenes JPG, JPEG o PNG");
                            return;
                          }
                          
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            field.onChange(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#9a5071] file:to-[#c2789d] file:text-white hover:file:shadow-lg file:transition-all file:duration-300 file:cursor-pointer border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9a5071]"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Formatos permitidos: JPG, JPEG, PNG. Tamaño máximo: 5MB.
                    </p>
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

          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Guardar cambios
          </LoadingButton>
        </form>
      </Card>
    </div>
  );
}