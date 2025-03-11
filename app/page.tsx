"use client"

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { calculateMortarTrajectory, BallisticDataPoint } from "../lib/ballistics";

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);

export default function Home() {
  const [velocity, setVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [data, setData] = useState<BallisticDataPoint[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trajectory = calculateMortarTrajectory(velocity, angle);
    setData(trajectory);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mortar Ballistics Calculator</h1>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Initial Velocity (m/s):</label>
          <input
            type="number"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Launch Angle (°):</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition"
        >
          Calculate
        </button>
      </form>

      {/* Chart Display */}
      <div className="w-full max-w-2xl mt-8">
        {data.length > 0 && (
          <Line
            data={{
              labels: data.map((point) => point.x.toFixed(1)),
              datasets: [
                {
                  label: "Mortar Trajectory",
                  data: data.map((point) => point.y),
                  borderColor: "rgb(59, 130, 246)",
                  borderWidth: 2,
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    </div>
  );
}
