import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarAreaProps {
  options?: ChartOptions<"polarArea">;
  chartData: ChartData<"polarArea">;
}

export default function PolarChart({ options, chartData }: PolarAreaProps) {
  return <PolarArea data={chartData} />;
}
