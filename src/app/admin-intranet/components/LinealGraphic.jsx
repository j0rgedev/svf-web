import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJSLineal,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

ChartJSLineal.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

  export function Lineals({ data, options }) {
    return <Line options={options} data={data} />;
  }
