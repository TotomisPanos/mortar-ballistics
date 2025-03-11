export interface BallisticDataPoint {
  x: number;
  y: number;
  t: number;
}

export function calculateMortarTrajectory(
  velocity: number, // m/s
  angle: number, // degrees
  timeStep: number = 0.1, // seconds
  maxTime: number = 100, // seconds
  gravity: number = 9.81 // m/s^2
): BallisticDataPoint[] {
  const radians = (angle * Math.PI) / 180;
  const vX = velocity * Math.cos(radians);
  const vY = velocity * Math.sin(radians);
  
  let t = 0;
  let x = 0;
  let y = 0;
  const data: BallisticDataPoint[] = [];

  while (y >= 0 && t <= maxTime) {
    x = vX * t;
    y = vY * t - 0.5 * gravity * t * t;
    
    data.push({ x, y, t });
    t += timeStep;
  }

  return data;
}
