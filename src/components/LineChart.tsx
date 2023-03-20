import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineProps {
  options?: ChartOptions<"line">;
  chartData: ChartData<"line">;
}

export default function LineChart({ chartData }: LineProps) {
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
