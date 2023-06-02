import { Bar } from 'react-chartjs-2';
import { Chart as ChartJSBar, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

ChartJSBar.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip
);

export default function Bars({ data, options }) {
    return <Bar data={data} options={options} />;
  }