// src/components/TripStatsChart.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const TripStatsChart = ({ stats }) => {
  const labels = stats.map((entry) => entry._id);
  const dataPoints = stats.map((entry) => entry.tripCount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Trips Per Month",
        data: dataPoints,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TripStatsChart;
