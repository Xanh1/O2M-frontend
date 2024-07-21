"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Importa Chart y registerables
import { promedio_calidad_por_dia } from "../../hooks/service_monitoring"; // Ajusta la ruta según tu estructura de carpetas

import HeaderMenu from "../../components/HeaderMenu";
import UserSidebar from "../../components/UserSidebar";

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

        // Procesa los datos del aire
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

        // Procesa los datos del agua
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
    <div className="flex flex-col h-screen">
      <HeaderMenu />
      <div className="flex flex-1">
        <UserSidebar />
        <div className="flex-1 py-6 sm:ml-64">
          <div className="py-4 rounded-lg mt-14">
            <h1 className="text-center mb-4">Monitoreo de Calidad del Aire</h1>
            <div className="flex justify-center">
              <div className="max-w-lg w-full">
                {chartDataAire.labels && <Bar data={chartDataAire} />}
              </div>
            </div>
            <h1 className="text-center mt-6 mb-4">
              Monitoreo de Calidad del Agua
            </h1>
            <div className="flex justify-center">
              <div className="max-w-lg w-full">
                {chartDataAgua.labels && <Bar data={chartDataAgua} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

