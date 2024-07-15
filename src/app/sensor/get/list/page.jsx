"use client";

import { all_Sensor } from '@/hooks/service_sensor';  // Usando alias
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../../../components/Sidebar";

import Userbar from "../../../../components/Userbar";
import Image from "next/image";
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
    <div className="h-screen flex">
      <main className="flex-1 flex">
        <Userbar />

        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Sensors</h1>
            <Link
              href="/sensor/new"
              className="py-1 px-3 rounded-lg bg-blue-500 text-white text-sm content-center"
            >
              Add sensor
            </Link>
          </div>

          <div className="bg-gray-50 my-4 p-3 rounded-lg flex justify-between">
            <div class="flex px-2 py-2 rounded-md border-2 bg-white overflow-hidden w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="fill-gray-600 mr-3 rotate-90"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search Something..."
                class="w-full outline-none bg-white text-gray-600 text-sm"
              />
            </div>

            <select
              id="countries"
              class="w-1/5 bg-white border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a filter</option>
              <option value="US">Name</option>
              <option value="CA">status</option>
              <option value="FR">ip</option>
            </select>
          </div>

          <div className="my-2">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Name
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Type
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Status
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    IP
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Longitude
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Latitude
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody>
                {sensors && sensors.map((sensor, index) => (
                  <tr key={index}>
                    <td className="p-3 text-sm text-gray-700 ">
                      {sensor.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {sensor.element_type.toString().split('.')[1]} {/* Obtén solo el nombre después del punto */}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <span
                        className={`py-1 px-2 rounded 
                ${(sensor.status).toString() === "true"
                            ? "bg-green-50"
                            : (sensor.status).toString() === "false"
                              ? "bg-red-50"
                              : ""
                          }`}
                      >
                        {(sensor.status).toString() === "true" ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 ">{sensor.ip}</td>
                    <td className="p-3 text-sm text-gray-700 ">{sensor.longitude}</td>
                    <td className="p-3 text-sm text-gray-700 ">{sensor.latitude}</td>


                    <td>
                      <Link
                        href={'/sensor/' + sensor.uid}
                        className="border py-1 px-4 text-blue-500 text-sm rounded-lg font-semibold"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
