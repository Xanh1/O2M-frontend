"use client";

import { save_sensor, all_element } from "../../../hooks/service_sensor";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Userbar from "../../../components/Userbar";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";




function LocationMarker({ setLat, setLng }) {
  const map = useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

export default function NewSensor() {
  //const router= useRouter()
  let token = Cookies.get("token");
  let user = Cookies.get("token");
  let necesary = Cookies.get("necesary");
  let [lat, setLat] = useState(null);
  let [lng, setLng] = useState(null);
  const router = useRouter();


  let [element, setelement] = useState(null);
  let [estado, setEstado] = useState(false);
  useEffect(() => {
    if (!estado) {
      all_element(token).then((info) => {
        if (info.code == 200) {
          setelement(info.datos);
        }
      });
      setEstado(true);
    }
  }, [estado, token]);

  const validationSchema = Yup.object().shape({
    ip: Yup.string().trim().required("ESCRIBA LA IP"),
    name: Yup.string().trim().required("ESCRIBA EL NOMBRE"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { control, register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  //const router = useRouter();

  const sendInfo = (data) => {
    //data.fecha_nac = new Date(data.fecha_nac).toISOString().split('T')[0];
    data.latitude = lat; // Añade latitud y longitud al objeto de datos
    data.longitude = lng;
    //console.log(data.fecha_nac)
    data.person = necesary;
    save_sensor(data, token).then((info) => {
      if (info.code == 200) {
        console.log(info);
        swal({
          title: "CORRECTO",
          text: info.datos.tag,
          icon: "success",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        router.push("/sensor/get/list");
        router.refresh();
      } else {
        swal({
          title: "ERROR",
          text: info.datos.error,
          icon: "error",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        console.log(info);
        console.log("NO");
      }
    });
  };

  const logout = (e) => {
    Cookies.remoce("token");
    Cookies.remoce("usuario");
    Cookies.remoce("necesary");
  };


  return (
    <div className="h-screen flex">
      <main className="flex-1 flex">
        <Userbar />

        <div className="w-full flex flex-col p-4 justify-center">
          <h1 className="font-semilbold text-2xl text-left">Register Sensor</h1>
          <form
            className="my-8 flex flex-col justify-center items-center"
            onSubmit={handleSubmit(sendInfo)}
          >
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm my-4">Sensor info</h1>
              <div className="flex gap-4">
                <div className="max-w-sm my-3">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.name?.message}
                  </span>
                </div>

                <div className="max-w-sm my-3">
                  <label htmlFor="ip" className="block text-sm font-medium mb-2">
                    IP
                  </label>
                  <input
                    type="text"
                    name="ip"
                    id="ip"
                    {...register("ip")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.ip?.message}
                  </span>
                </div>
              </div>

              <div className="my-4">
                <label className="block my-2" htmlFor="element_type">
                  Choose an element..
                </label>
                <select
                  className="w-full border rounded-md p-1 bg-white"
                  id="element_type"
                  {...register("element_type")}
                >
                  {element &&
                    element.map((dato, i) => (
                      <option key={i} value={dato.key}>
                        {dato.value}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 my-4">
              <div className="max-w-sm my-3">
                <label htmlFor="latitude" className="block text-sm font-medium mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  name="latitude"
                  id="latitude"
                  {...register("latitude")}

                  value={lat || ""}
                  className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
              </div>

              <div className="max-w-sm my-3">
                <label htmlFor="longitude" className="block text-sm font-medium mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  name="longitude"
                  id="longitude"
                  {...register("longitude")}

                  value={lng || ""}
                  className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
              </div>
            </div>

            <div className="my-8 flex flex-col justify-center items-center">
              <div style={{ width: "700px", height: "300px" }}>
                <MapContainer center={[-4.03043, -79.19945]} zoom={40} style={{ width: "100%", height: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {lat && lng && <Marker position={[lat, lng]} />}
                  <LocationMarker setLat={setLat} setLng={setLng} />
                </MapContainer>
              </div>
            </div>

            <div className="my-4">
              <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2">
                <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                  Register
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
