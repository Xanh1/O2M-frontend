"use client";

import HeaderCliente from "../components/HeaderCliente";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Importa Chart y registerables
import { promedio_calidad_por_dia } from "../hooks/service_monitoring"; // Ajusta la ruta según tu estructura de carpetas
import Link from "next/link";

Chart.register(...registerables);

export default function Home() {
  const [chartDataAire, setChartDataAire] = useState({});
  const [chartDataAgua, setChartDataAgua] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const datos = await promedio_calidad_por_dia();
      if (datos.code === 200) {
        const aireData = datos.datos.aire;
        const aguaData = datos.datos.agua;

        const labelsAire = aireData.map(
          (item) => `${item.dia}/${item.mes}/${item.año}`
        );
        const dataAire = aireData.map((item) => item.promedioCalidadDato);
        setChartDataAire({
          labels: labelsAire,
          datasets: [
            {
              label: "Calidad del Aire",
              data: dataAire,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        const labelsAgua = aguaData.map(
          (item) => `${item.dia}/${item.mes}/${item.año}`
        );
        const dataAgua = aguaData.map((item) => item.promedioCalidadDato);
        setChartDataAgua({
          labels: labelsAgua,
          datasets: [
            {
              label: "Calidad del Agua",
              data: dataAgua,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
          ],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div class="bg-container"></div>
      <main className="flex flex-col h-screen">
        <HeaderCliente />
        {/* <div className="py-20 rounded-lg mt-14">
        <h1 className="text-center mb-4">Monitoreo del Aire</h1>
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            {chartDataAire.labels && <Bar data={chartDataAire} />}
          </div>
        </div>
        <h1 className="text-center mt-6 mb-4">Monitoreo del Agua</h1>
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            {chartDataAgua.labels && <Bar data={chartDataAgua} />}
          </div>
        </div>
      </div> */}
        <main className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Predicción de Calidad de Agua y Aire
          </h1>
          <p className="text-xl mb-8 text-center max-w-xl">
            Nuestra aplicación te permite predecir la calidad del agua y del
            aire en el campus de la Universidad.
          </p>
          <Link href="/extrapolacion">
            <div className="flex space-x-4">
              <button className="btn relative block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-lg hover:transparent group py-3 px-4">
                <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                  {`Realizar Predicción  ->`}
                </span>
              </button>
            </div>
          </Link>
        </main>
      </main>
    </div>
  );
}
