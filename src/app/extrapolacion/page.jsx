"use client";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  extrapolate_data_aire,
  extrapolate_data_agua,
} from "../../hooks/service_monitoring";
import { useState } from "react";
import swal from "sweetalert";
import HeaderCliente from "@/components/HeaderCliente";

export default function Extrapolate() {
  const [result, setResult] = useState(null);
  const [tipo, setTipo] = useState("");

  // Nuevo esquema de validación
  const extrapolationSchema = Yup.object().shape({
    fecha: Yup.date()
      .required("Selecciona una fecha")
      .typeError("Fecha inválida"),
    tipo: Yup.string().required("Selecciona un tipo de dato"),
  });

  const formOptions = { resolver: yupResolver(extrapolationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      // Convertir la fecha en el formato deseado
      const date = new Date(data.fecha);
      const formattedData = {
        año: date.getFullYear(),
        mes: date.getMonth() + 1, // Los meses en JavaScript van de 0 a 11
        dia: date.getDate(),
        tipo: data.tipo,
      };

      let response;
      if (formattedData.tipo === "aire") {
        response = await extrapolate_data_aire(formattedData);
      } else if (formattedData.tipo === "agua") {
        response = await extrapolate_data_agua(formattedData);
      }
      setResult(response.datos);
      swal({
        title: "Acción Satisfactoria",
        text: "Predicción relizada con exito",
        icon: "success",
        button: "OK",
        timer: 4000,
      });
    } catch (error) {
      swal({
        title: "Error",
        text: error,
        icon: "error",
        button: "OK",
        timer: 4000,
      });
    }
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  const getAirQualityLabel = (value) => {
    if (value < 100) return "Excelente";
    if (value < 200) return "Bueno";
    if (value < 400) return "Aceptable";
    if (value < 800) return "Pobre";
    return "Deficiente";
  };

  const getAirQualityColor = (value) => {
    if (value < 100) return "bg-green-100";
    if (value < 200) return "bg-green-50";
    if (value < 400) return "bg-yellow-50";
    if (value < 800) return "bg-orange-100";
    return "bg-red-100";
  };

  const getWaterQualityLabel = (value) => {
    if (value < 300) return "Excelente";
    if (value < 600) return "Bueno";
    if (value < 900) return "Aceptable";
    if (value < 1200) return "Regular";
    return "Deficiente";
  };

  const getWaterQualityColor = (value) => {
    if (value < 300) return "bg-green-100";
    if (value < 600) return "bg-green-50";
    if (value < 900) return "bg-yellow-50";
    if (value < 1200) return "bg-orange-100";
    return "bg-red-100";
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <HeaderCliente />
      <div className="pt-20 mt-14">
        <h1 className="font-semibold text-xl">Predicciónes</h1>
      </div>
      <form className="my-8 w-1/4" onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm my-3">
          <label htmlFor="fecha" className="block text-sm font-medium mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            {...register("fecha")}
            className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="block text-red-500 text-xs pl-1 min-h-5">
            {errors.fecha?.message}
          </span>
        </div>
        <div className="min-w-sm my-3">
          <label htmlFor="tipo" className="block text-sm font-medium mb-2">
            Tipo de sensor
          </label>
          <select
            name="tipo"
            id="tipo"
            {...register("tipo")}
            className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            onChange={handleTipoChange}
          >
            <option value="">Selecciona tipo</option>
            <option value="aire">Air</option>
            <option value="agua">Water</option>
          </select>
          <span className="block text-red-500 text-xs pl-1 min-h-5">
            {errors.tipo?.message}
          </span>
        </div>

        {tipo === "aire" && (
          <div className="min-w-sm my-3 p-4 border border-gray-300 rounded-lg">
            <h2 className="pb-2 font-medium">Métrica Cálidad Aire (PPM)</h2>
            <ul className="text-sm">
              <li>Menos de 100 : Excelente</li>
              <li>100-199 : Bueno</li>
              <li>200-399 : Aceptable</li>
              <li>400-800 : Pobre</li>
              <li>Más de 800 : Deficiente</li>
            </ul>
          </div>
        )}
        {tipo === "agua" && (
          <div className="min-w-sm my-3 p-4 border border-gray-300 rounded-lg">
            <h2 className="pb-2 font-medium">Métrica Cálidad Agua (MG/L)</h2>
            <ul className="text-sm">
              <li>Menos de 300 : Excelente</li>
              <li>300-599 : Bueno</li>
              <li>600-899 : Aceptable</li>
              <li>900-1199 : Regular</li>
              <li>Más de 1200 : Deficiente</li>
            </ul>
          </div>
        )}
        <div className="my-4">
          <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2">
            <span className="w-56 h-48 rounded bg-white absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-blue-500">
              Predecir
            </span>
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-2">
          <h2 className="text-lg font-bold py-3">Resulato Predicción</h2>
          <pre className="bg-gray-50 p-4 rounded-lg">
            {JSON.stringify(result, null, 2)}
          </pre>
          {tipo === "aire" && (
            <div
              className={`mt-4 mb-10 p-2 border border-gray-100 rounded-lg ${getAirQualityColor(
                result.valorExtrapolado
              )}`}
            >
              <h3 className="text-lg font-medium">Calidad del Aire</h3>
              <p className="py-2">{`Calidad: ${getAirQualityLabel(
                result.valorExtrapolado
              )}`}</p>
            </div>
          )}
          {tipo === "agua" && (
            <div
              className={`mt-4 mb-10 p-2 border border-gray-100 rounded-lg ${getWaterQualityColor(
                result.valorExtrapolado
              )}`}
            >
              <h3 className="text-lg font-medium">Calidad del Agua</h3>
              <p>{`Calidad: ${getWaterQualityLabel(
                result.valorExtrapolado
              )}`}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
