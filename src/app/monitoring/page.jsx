"use client";
import { list_monitoring } from "../../hooks/service_monitoring";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import UserSidebar from "../../components/UserSidebar";
import HeaderMenu from "../../components/HeaderMenu";

export default function Monitoring() {
  const router = useRouter();
  const [persons, setPersons] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    
    const token = Cookies.get("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    list_monitoring(token)
      .then((info) => {
        if (info.code === 200) {
          setPersons(info.datos);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const format_fecha = (fecha) => {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };



  return (
    <div className="flex flex-col h-screen">
      <HeaderMenu />
      <main className="flex-1 flex">
        <UserSidebar />

        <div className="flex-1 py-6 sm:ml-64">
          <div className="py-4 px-10 rounded-lg mt-14">
            <div className="flex justify-between">
              <h1 className="font-semibold text-2xl">Monitoreo</h1>
            </div>

            <div className="my-8">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Nro
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Sensor
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Tipo
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Dato
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Fecha Inicio
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Fecha Fin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {persons &&
                    persons.map((sensor, index) => (
                      <tr key={index}>
                        <td className="p-3 text-sm text-gray-700 ">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.sensor_id.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.sensor_id.element_type.toString().split(".")[1]}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {sensor.data}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {format_fecha(sensor.start_date)}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {format_fecha(sensor.end_date)}
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
