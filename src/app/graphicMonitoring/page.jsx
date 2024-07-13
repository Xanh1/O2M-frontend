"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'; // Importa Chart y registerables
import { promedio_calidad_por_dia } from "../../hooks/service_monitoring"; // Ajusta la ruta según tu estructura de carpetas

Chart.register(...registerables); // Registra todos los componentes necesarios

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
        const labelsAire = aireData.map(item => `${item.dia}/${item.mes}/${item.año}`);
        const dataAire = aireData.map(item => item.promedioCalidadDato);
        setChartDataAire({
          labels: labelsAire,
          datasets: [{
            label: 'Calidad del Aire',
            data: dataAire,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }]
        });

        // Procesa los datos del agua
        const labelsAgua = aguaData.map(item => `${item.dia}/${item.mes}/${item.año}`);
        const dataAgua = aguaData.map(item => item.promedioCalidadDato);
        setChartDataAgua({
          labels: labelsAgua,
          datasets: [{
            label: 'Calidad del Agua',
            data: dataAgua,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          }]
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Monitoreo de Calidad del Aire</h1>
      {chartDataAire.labels && <Bar data={chartDataAire} />}
      <h1>Monitoreo de Calidad del Agua</h1>
      {chartDataAgua.labels && <Bar data={chartDataAgua} />}
    </div>
  );
}
