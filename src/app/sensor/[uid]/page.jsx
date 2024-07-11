"use client";

import { modify_sensor, get } from "../../../hooks/service_sensor";
import { all_element } from "../../../hooks/service_sensor";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../../components/Sidebar";

export default function EditSensor({ params }) {
  let token = Cookies.get("token");
  const router = useRouter();
  let [element, setElement] = useState(null);
  let [estado, setEstado] = useState(false);
  let [sensor, setSensor] = useState(null);

  useEffect(() => {
    if (!estado) {
      all_element(token).then((info) => {
        if (info.code === 200) {
          setElement(info.datos);
        }
      });
      setEstado(true);
    }

    if (!sensor) {
      get(token, params.uid).then((infor) => {
        if (infor.code === 200) {
          console.log(infor.datos);
          setSensor(infor.datos);
        }
      });
    }
  }, [estado, sensor, token, params.uid]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("ESCRIBA EL NOMBRE"),
    ip: Yup.string().trim().required("ESCRIBA LA IP"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { control, register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendInfo = (data) => {
    data.uid = params.uid;
    modify_sensor(data, token).then((info) => {
      if (info.code === 200) {
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
      }
    });
  };

  const logout = (e) => {
    Cookies.remoce("token");
    Cookies.remoce("usuario");
    Cookies.remoce("necesary");
  };

  if (!sensor) {
    return <div>Cargando...</div>;
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
            onClick={logout}
            className="p-2 rounded-full ease-in duration-300 hover:shadow-md hover:scale-110"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
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
                  stroke-width="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </Link>
        </aside>

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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={sensor.name}
                    {...register("name")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.name?.message}
                  </span>
                </div>

                <div className="max-w-sm my-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    IP
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={sensor.ip}
                    {...register("ip")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.ip?.message}
                  </span>
                </div>
              </div>

              <div className="my-4">
                <label className="block my-2" htmlFor="options">
                  Choose an element..
                </label>
                <select
                  className="w-full border rounded-md p-1 bg-white"
                  id="product"
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
