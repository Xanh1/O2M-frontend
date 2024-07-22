"use client";

import { all_Sensor } from "@/hooks/service_sensor";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserSidebar from "../../../../components/UserSidebar";
import HeaderMenu from "../../../../components/HeaderMenu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Sensor() {
  const [sensors, setSensors] = useState(null);
  const [estado, setEstado] = useState(false);
  const router = useRouter();
  let token = Cookies.get("token");

  useEffect(() => {
    if (!estado) {
      all_Sensor(token).then((info) => {
        if (info.code === 200) {
          setSensors(info.datos);
        } else if (info.code === 401) {
          router.push("/dashboard");
        }
      });
      setEstado(true);
    }
  }, [estado, token, router]);

  return (
    <div className="flex flex-col h-screen">
      <HeaderMenu />
      <main className="flex-1 flex">
        <UserSidebar />
        <div className="flex-1 py-6 sm:ml-64">
          <div className="py-4 px-10 rounded-lg mt-14">
            <div className="flex justify-between">
              <h1 className="font-semibold text-2xl">Sensores</h1>
              <Link
                href="/sensor/new"
                className="py-1 px-3 rounded-lg bg-blue-500 text-white text-sm content-center"
              >
                Agregar sensor
              </Link>
            </div>

            <div className="my-8">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Nombre
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Tipo
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Estado
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      IP
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Longitud
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Latitud
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {sensors &&
                    sensors.map((sensor, index) => (
                      <tr key={index}>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {sensor.element_type.toString().split(".")[1]}{" "}
                          {/* Obtén solo el nombre después del punto */}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          <span
                            className={`py-1 px-2 rounded 
                          ${
                            sensor.status.toString() === "true"
                              ? "bg-green-50"
                              : sensor.status.toString() === "false"
                              ? "bg-red-50"
                              : ""
                          }`}
                          >
                            {sensor.status.toString() === "true"
                              ? "activo"
                              : "inactivo"}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.ip}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.longitude}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.latitude}
                        </td>

                        <td>
                          <Link
                            href={"/sensor/" + sensor.uid}
                            className="border py-1 px-4 text-blue-500 text-sm rounded-lg font-semibold"
                          >
                            Actualizar
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
