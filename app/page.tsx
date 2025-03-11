"use client";
import { useState, useEffect } from "react";
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
import { FaArrowRight } from "react-icons/fa";

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);

export default function Home() {
  const [velocity, setVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const [projectileMass, setProjectileMass] = useState(5);
  const [projectileRadius, setProjectileRadius] = useState(0.05);
  const [data, setData] = useState<BallisticDataPoint[]>([]);

  setProjectileMass(5)
  setProjectileRadius(0.05)
  
  const X_MAX = 3000;
  const Y_MAX = 1000;

  useEffect(() => {
    setData(
      calculateMortarTrajectory(
        velocity,
        angle,
        windSpeed,
        windDirection,
        9.81,
        1.225,
        0.47,
        projectileMass,
        projectileRadius
      )
    );
  }, [velocity, angle, windSpeed, windDirection, projectileMass, projectileRadius]);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 font-retro bg-dosBlack text-dosGreen">
      <h1 className="text-xl mb-4 border-b-4 border-dosBorder pb-2 text-center">
        *** MILITARY MORTAR CALCULATOR ***
      </h1>

      {/* Controls Section */}
      <div className="p-4 border-4 border-dosBorder bg-dosBlack w-full max-w-md text-dosGreen">
        {/* Velocity Slider */}
        <div className="flex flex-col mb-6">
          <label className="mb-2">INITIAL VELOCITY: {velocity} m/s</label>
          <input
            type="range"
            min="50"
            max="150"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="w-full bg-transparent appearance-none slider-thumb"
          />
        </div>

        {/* Angle Slider */}
        <div className="flex flex-col mb-6">
          <label className="mb-2">LAUNCH ANGLE: {angle}°</label>
          <input
            type="range"
            min="0"
            max="90"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full bg-transparent appearance-none slider-thumb"
          />
        </div>

        {/* Wind Speed Slider */}
        <div className="flex flex-col mb-6">
          <label className="mb-2">WIND SPEED: {windSpeed} m/s</label>
          <input
            type="range"
            min="0"
            max="50"
            value={windSpeed}
            onChange={(e) => setWindSpeed(Number(e.target.value))}
            className="w-full bg-transparent appearance-none slider-thumb"
          />
        </div>

        {/* Wind Direction Slider with Arrow */}
        <div className="flex flex-col mb-6">
          <label className="mb-2">WIND DIRECTION: {windDirection}°</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="360"
              value={windDirection}
              onChange={(e) => setWindDirection(Number(e.target.value))}
              className="w-full bg-transparent appearance-none slider-thumb"
            />
            <FaArrowRight
              className="text-dosGreen"
              style={{ transform: `rotate(${-windDirection}deg)`, transition: "transform 0.3s ease" }}
            />
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="w-full max-w-5xl h-[500px] mt-8 border-4 border-dosBorder p-4 bg-dosBlack">
        {data.length > 0 && (
          <Line
            data={{
              labels: Array.from({ length: X_MAX / 10 }, (_, i) => (i * 10).toString()),
              datasets: [
                {
                  label: "TRAJECTORY",
                  data: data.map((point) => ({ x: point.x, y: point.y })),
                  borderColor: "#33FF33",
                  borderWidth: 2,
                  pointRadius: 0,
                  fill: false,
                  tension: 0.1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "#33FF33",
                    font: { family: "'Press Start 2P'", size: 10 },
                  },
                },
              },
              scales: {
                x: {
                  type: "linear",
                  min: 0,
                  max: X_MAX,
                  ticks: {
                    color: "#33FF33",
                    font: { size: 10 },
                  },
                  grid: { color: "#00AA00" },
                },
                y: {
                  min: 0,
                  max: Y_MAX,
                  ticks: {
                    color: "#33FF33",
                    font: { size: 10 },
                  },
                  grid: { color: "#00AA00" },
                },
              },
            }}
          />
        )}
      </div>

      <p className="mt-6 text-xs border-t-4 border-dosBorder pt-2">* FOR MILITARY USE ONLY *</p>
    </div>
  );
}
