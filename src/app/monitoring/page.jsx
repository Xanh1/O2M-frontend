"use client";
import Link from "next/link";
import { list_monitoring } from "../../hooks/service_monitoring";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import swal from "sweetalert";

import { useRouter } from "next/navigation";
import "./styles.css";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";

export default function Monitoring() {
  const router = useRouter();
  const [persons, setPersons] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  console.log("desde aquiii es ");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    list_monitoring(token)
      .then((info) => {
        //console.log("aqui va la info" + info.datos);
        if (info.code === 200) {
          setPersons(info.datos);
          console.log("desde aquiii es ");
          console.log("mensaje de aqui");
          console.log(info.datos);
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

  if (!isLoggedIn) {
    // Redirigir a la página de inicio de sesión si no está autenticado
    swal({
      title: "Error",
      text: "Vuelva a Iniciar Sesion",
      icon: "error",
      button: "Accept",
      timer: 8000,
      closeOnEsc: true,
    });
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/session");
    return null;
  }

  return (
    <div className="h-screen flex">
      <main className="flex-1 flex">
        <aside className="h-full flex flex-col justify-between items-center py-4 px-2">
          <Link href="" className="rounded-full">
            <Image src="/user.png" width={32} height={32} alt="A user image" />
          </Link>
          <Link
            href="/session"
            className="p-2 rounded-full ease-in duration-300 hover:shadow-md hover:scale-110"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </Link>
        </aside>

        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Sensors</h1>
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
              <option value="US">Date</option>
              <option value="CA">Sensor</option>
            </select>
          </div>

          <div className="my-2">
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
                    Type
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Data
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Start date
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    End data
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Latitude
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Longitude
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
                        {sensor.sensor_id.element_type}
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
                      <td className="p-3 text-sm text-gray-700 ">
                        {sensor.latitude}
                      </td>
                      <td className="p-3 text-sm text-gray-700 ">
                        {sensor.longitude}
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