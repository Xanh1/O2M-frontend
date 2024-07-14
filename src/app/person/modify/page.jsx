"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { modify_person, search_person } from "../../../hooks/service_person";
import Cookies from "js-cookie";
import Sidebar from "../../../components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';

export default function modifyPerson() {
    const token = Cookies.get("token");
    const uid = Cookies.get("necesary");

    const router = useRouter();
    let [estado, setEstado] = useState(false);
    let [person, setPerson] = useState(null);

    if (!estado) {
        search_person(uid, token).then((info) => {
            if (info.code == 200) {
                setPerson(info.datos);
                console.log('datos cargados')
            }
            else {
                swal({
                    title: "Error",
                    text: info.response.data.info.error,
                    icon: "error",
                    button: "Aceptar",
                    timer: 8000,
                    closeOnEsc: true
                });
                console.log('no se pudo cargar')
            }
        });
        setEstado(true);
    }

    //validación de campos
    const validationSchema = yup.object().shape({
        name: yup.string().required("Obligatory field"),
        last_name: yup.string().required("Obligatory field"),
        email: yup.string().required("Obligatory field (end with @unl.edu.ec)"),
        password: yup.string().required("Obligatory field"),
    });

    //validar formulario
    const formOption = { resolver: yupResolver(validationSchema) };
    //envío de formulario
    const { register, handleSubmit, formState } = useForm(formOption);

    let { errors } = formState;

    const enviar_data = (data) => {
        let datos = {
            "name": data.name,
            "last_name": data.last_name,
            "email": data.email,
            "password": data.password,
            "external": uid,
        }
        modify_person(datos, token).then((info) => {
            if (info.code == "200") {
                swal({
                    title: "INFO",
                    text: "Updated Account",
                    icon: "success",
                    button: "Aceptar",
                    timer: 8000,
                    closeOnEsc: true,
                });
                router.push("/person");
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
            }
        });
    };

    const logout = (e) => {
        Cookies.remove("token");
        Cookies.remove("usuario");
        Cookies.remove("necesary");
    };

    const cancelar = () => {
        router.push("/person");
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
                    <h1 className="font-semilbold text-2xl text-left">Modify Account</h1>
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
                                        defaultValue = {person && person.name}
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
                                        defaultValue = {person && person.last_name}
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
                                    defaultValue = {person && person.dni}
                                    {...register("dni")}
                                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-gray-100"
                                    readOnly
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
                                        defaultValue = {person && person.email}
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

                        <div className="my-4 flex justify-between"> {/* Changed to flex justify-between for left and right alignment */}
                            <button
                                type="button"
                                onClick={cancelar}
                                className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2"
                            >
                                <span className="w-56 h-48 rounded bg-red-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                                    Cancelar
                                </span>
                            </button>

                            <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2 ml-4">
                                <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                                    Registrar
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
