"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Importa Chart y registerables
import { promedio_calidad_por_dia } from "../../hooks/service_monitoring"; // Ajusta la ruta según tu estructura de carpetas

import HeaderCliente from "../../components/HeaderCliente";

Chart.register(...registerables);

export default function Monitoring() {
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
          options: {
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          },
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
          options: {
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          },
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <HeaderCliente />
        <div className="py-4 rounded-lg mt-14">
          <h1 className="text-center font-semibold mb-4">Monitoreo del Aire</h1>
          <div className="flex justify-evenly items-center">
            <div className="max-w-lg w-full">
              {chartDataAire.labels && (
                <Bar data={chartDataAire} options={chartDataAire.options} />
              )}
            </div>
            <div className="max-w-sm my-3 p-4 border border-gray-300 rounded-lg">
              <h2 className="pb-2 font-medium">Métrica Cálidad Aire (PPM)</h2>
              <ul className="text-sm">
                <li>Menos de 100 : Excelente</li>
                <li>100-199 : Bueno</li>
                <li>200-399 : Aceptable</li>
                <li>400-800 : Pobre</li>
                <li>Más de 800 : Deficiente</li>
              </ul>
            </div>
          </div>
          <h1 className="text-center font-semibold mt-6 mb-4">
            Monitoreo del Agua
          </h1>
          <div className="flex justify-evenly items-center">
            <div className="max-w-lg w-full">
              {chartDataAgua.labels && (
                <Bar data={chartDataAgua} options={chartDataAgua.options} />
              )}
            </div>
            <div className="my-3 p-4 border border-gray-300 rounded-lg">
              <h2 className="pb-2 font-medium">Métrica Cálidad Agua (MG/L)</h2>
              <ul className="text-sm">
                <li>Menos de 300 : Excelente</li>
                <li>300-599 : Bueno</li>
                <li>600-899 : Aceptable</li>
                <li>900-1199 : Regular</li>
                <li>Más de 1200 : Deficiente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}
