import Link from "next/link";

export default function HeaderMenu() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="" className="flex ms-2 md:me-24">
              <svg
                fill="#000000"
                width="32px"
                height="32px"
                viewBox="0 0 512 512"
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
                  <g id="Natural_resources_sustainability">
                    {" "}
                    <path d="M382,359.36H122.5a14,14,0,1,1,0-27.93h31.59v-17H122.5a31,31,0,1,0,0,61.93H382a13.52,13.52,0,1,1,0,27H350.81v17H382a30.52,30.52,0,1,0,0-61Z"></path>{" "}
                    <rect
                      height="17"
                      width="57.84"
                      x="265.86"
                      y="403.39"
                    ></rect>{" "}
                    <path d="M163.09,274h28.62a59.19,59.19,0,0,1,5.94-18H163.09c-29.35,0-53.62-23.4-54.1-52.17a53.07,53.07,0,0,1,53.07-54l0-9,.1,9h.07a26.71,26.71,0,0,0,5.25-.54,37.11,37.11,0,0,1,10.05,25l20.34-.57a56.64,56.64,0,0,0-13.57-36,25.61,25.61,0,0,0,2.87-6.41,69.33,69.33,0,0,1,133.12,0,25.71,25.71,0,0,0,24.92,18.6h.21a53.07,53.07,0,0,1,53.07,54,51.52,51.52,0,0,1-5,21.39,59.11,59.11,0,0,1,16.62,6.92,69.38,69.38,0,0,0,6.42-28,71.08,71.08,0,0,0-71.07-72.29h-.19a7.85,7.85,0,0,1-7.65-5.63,87.34,87.34,0,0,0-167.7,0,7.86,7.86,0,0,1-7.7,5.63h-.14A71.08,71.08,0,0,0,91,204.14C91.63,242.67,124,274,163.09,274Z"></path>{" "}
                    <path d="M366.43,229.05a54.55,54.55,0,0,0-103.78,3,11.74,11.74,0,0,1-11.38,8.43h-.1a43.24,43.24,0,0,0-43.23,44c.4,23.7,20.23,42.49,43.94,42.49H378.17c23.71,0,43.54-18.79,43.94-42.49a43.24,43.24,0,0,0-41.3-43.93,32.92,32.92,0,0,0-13.35,26.05l-18-.51A50.22,50.22,0,0,1,366.43,229.05Z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                O2M
              </span>
            </Link>
          </div>
          <div className="">
            <Link href="/person/modify">Miguel Apolo</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
