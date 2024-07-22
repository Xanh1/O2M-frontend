import Link from "next/link";

import Cookies from "js-cookie";

export default function UserSidebar() {
  
  const logout = (e) => {
    Cookies.remove("token");
    Cookies.remove("usuario");
    Cookies.remove("necesary");
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/graphicMonitoring"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <rect x="0" fill="none" width="24" height="24"></rect>{" "}
                  <g>
                    {" "}
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2v-7h2v7zm4 0h-2V7h2v10z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <span className="ms-3">Estadisticas</span>
            </Link>
          </li>
          <li>
            <Link
              href="/sensor/get/list"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
                    d="M6 9V13M10 9V13M20 12H22M20 8L22 6M22 18L20 16M5.2 19H12.8C13.9201 19 14.4802 19 14.908 18.782C15.2843 18.5903 15.5903 18.2843 15.782 17.908C16 17.4802 16 16.9201 16 15.8V8.2C16 7.0799 16 6.51984 15.782 6.09202C15.5903 5.71569 15.2843 5.40973 14.908 5.21799C14.4802 5 13.9201 5 12.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.71569 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sensores</span>
            </Link>
          </li>
          <li>
            <Link
              href="/person"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link
              href="/monitoring"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="#000000"
                viewBox="0 0 32 32"
                version="1.1"
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
                  <title>monitor-code</title>{" "}
                  <path d="M28 1.75h-24c-1.794 0.002-3.248 1.456-3.25 3.25v16c0.002 1.794 1.456 3.248 3.25 3.25h8.011l-1.685 3.5h-4.326c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h20c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-4.229l-1.75-3.5h7.979c1.794-0.001 3.249-1.456 3.25-3.25v-16c-0.002-1.794-1.456-3.248-3.25-3.25h-0zM18.978 27.75h-5.878l1.685-3.5h2.442zM28.75 21c-0 0.414-0.336 0.75-0.75 0.75h-24c-0.414-0-0.75-0.336-0.75-0.75v-16c0.001-0.414 0.336-0.749 0.75-0.75h24c0.414 0 0.75 0.336 0.75 0.75v0zM9.711 13.229l3.229-3.692c0.192-0.219 0.309-0.507 0.309-0.823 0-0.69-0.56-1.25-1.25-1.25-0.374 0-0.71 0.165-0.939 0.425l-0.001 0.001-4 4.572c-0.192 0.219-0.31 0.507-0.31 0.823 0 0.345 0.14 0.658 0.366 0.884v0l4 4c0.226 0.226 0.539 0.366 0.884 0.366 0.69 0 1.25-0.56 1.25-1.25 0-0.345-0.14-0.658-0.366-0.884v0zM20.941 7.892c-0.23-0.263-0.567-0.427-0.941-0.427-0.691 0-1.251 0.56-1.251 1.251 0 0.316 0.117 0.605 0.31 0.825l-0.001-0.001 3.23 3.691-3.174 3.173c-0.228 0.227-0.369 0.54-0.369 0.887 0 0.691 0.56 1.251 1.251 1.251 0.347 0 0.661-0.141 0.887-0.369l4-4c0.226-0.226 0.366-0.539 0.366-0.884 0-0.316-0.117-0.605-0.311-0.825l0.001 0.001z"></path>{" "}
                </g>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Monitoreo</span>
            </Link>
          </li>
        </ul>

        <ul className="mt-auto space-y-2 font-medium">
          <li>
            <Link
              href="/session"
              className="flex font-medium items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.096"
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
              <span onClick={logout} className="flex-1 ms-3 whitespace-nowrap">
                Cerrar Sesión
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
