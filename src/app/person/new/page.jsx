"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { save_person } from "../../../hooks/service_person";
import Cookies from "js-cookie";
import Sidebar from "../../../components/Sidebar";
import Link from "next/link";
import Image from "next/image";

export default function newPerson() {
  const token = Cookies.get("token");

  const router = useRouter();

  //validación de campos
  const validationSchema = yup.object().shape({
    name: yup.string().required("Campo obligatorio"),
    dni: yup
      .string()
      .required("Campo obligatorio")
      .length(10, "El DNI debe tener 10 caracteres"),
    last_name: yup.string().required("Campo obligatorio"),
    email: yup.string().required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
  });

  //validar formulario
  const formOption = { resolver: yupResolver(validationSchema) };
  //envío de formulario
  const { register, handleSubmit, formState } = useForm(formOption);

  let { errors } = formState;

  const enviar_data = (data) => {
    save_person(data, token).then((info) => {
      if (info.code == "200") {
        swal({
          title: "INFO",
          text: "Cuenta registrada.",
          icon: "success",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
        router.push("/monitoring");
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: info.response.data.datos.error,
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
        console.log("No se pudo registrar");
        console.log(info);
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
          <h1 className="font-semilbold text-2xl text-left">Register Person</h1>
          <form
            className="my-8 flex flex-col justify-center items-center"
            onSubmit={handleSubmit(enviar_data)}
          >
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm my-4">Personal info</h1>
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
                    Last name
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    {...register("last_name")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.last_name?.message}
                  </span>
                </div>
              </div>

              <div className="w-full my-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  dni
                </label>
                <input
                  type="text"
                  name="dni"
                  id="dni"
                  {...register("dni")}
                  className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                <span className="block text-red-500 text-xs pl-1 min-h-5">
                  {errors.dni?.message}
                </span>
              </div>

              <div className="flex flex-col">
                <h1 className="font-semibold text-sm my-4">Account info</h1>

                <div className="w-full my-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.email?.message}
                  </span>
                </div>

                <div className="w-full my-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    {...register("password")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.password?.message}
                  </span>
                </div>
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
