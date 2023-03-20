import React from 'react'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PieProps {
  options?: ChartOptions<"pie">;
  chartData: ChartData<"pie">;
}

export default function PieChart({ chartData }: PieProps) {
  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
}
