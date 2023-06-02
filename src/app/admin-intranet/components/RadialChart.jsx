import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

const DoughnutChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

    const chartInstance = chartRef.current?.chartInstance;

    if (chartInstance) {
      chartInstance.options.plugins.legend.display = false; // Ocultar la leyenda para evitar superposición de valores
      chartInstance.update();
    }
  }, []);

  return <Doughnut ref={chartRef} data={data} options={options} />;
};

export default DoughnutChart;


