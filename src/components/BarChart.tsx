import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData, ChartOptions
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarProps {
  options?: ChartOptions<"bar">;
  chartData: ChartData<"bar">;
}

export default function LineChart({ options, chartData }: BarProps) {
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
}
