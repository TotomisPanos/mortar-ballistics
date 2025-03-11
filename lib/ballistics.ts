export interface BallisticDataPoint {
  x: number;
  y: number;
  t: number;
}

export function calculateMortarTrajectory(
  velocity: number, // Initial velocity (m/s)
  angle: number,    // Launch angle (degrees)
  windSpeed: number = 0, // Wind speed (m/s)
  windDirection: number = 0, // Wind direction (degrees, 0 = right, 180 = left)
  gravity: number = 9.81, // Gravity (m/s²)
  airDensity: number = 1.225, // Air density (kg/m³)
  dragCoefficient: number = 0.47, // Drag coefficient (spherical projectile)
  projectileMass: number = 5, // Mass of projectile (kg)
  projectileRadius: number = 0.05, // Radius of projectile (meters)
  timeStep: number = 0.01, // Time step for simulation (seconds)
  maxTime: number = 100 // Max simulation time (seconds)
): BallisticDataPoint[] {
  const radians = (angle * Math.PI) / 180;

  // Initial velocities
  let vX = velocity * Math.cos(radians);
  let vY = velocity * Math.sin(radians);

  // Wind components
  const windRadians = (windDirection * Math.PI) / 180;
  const windX = windSpeed * Math.cos(windRadians);
  const windY = windSpeed * Math.sin(windRadians);

  let x = 0;
  let y = 0;
  let t = 0;
  const data: BallisticDataPoint[] = [];

  // Projectile cross-sectional area (A = πr²)
  const area = Math.PI * projectileRadius ** 2;

  while (y >= 0 && t <= maxTime) {
    const velocityMagnitude = Math.sqrt(vX ** 2 + vY ** 2); // Total velocity

    // Drag force magnitude: F_d = (1/2) * C_d * ρ * A * v²
    const dragForce = 0.5 * dragCoefficient * airDensity * area * velocityMagnitude ** 2;

    // Drag force components
    const dragX = (dragForce * vX) / velocityMagnitude;
    const dragY = (dragForce * vY) / velocityMagnitude;

    // Acceleration due to drag and gravity
    const aX = -dragX / projectileMass + windX; // Horizontal acceleration
    const aY = -gravity - (dragY / projectileMass) + windY; // Vertical acceleration

    // Update velocity using Euler’s method
    vX += aX * timeStep;
    vY += aY * timeStep;

    // Update position
    x += vX * timeStep;
    y += vY * timeStep;
    t += timeStep;

    data.push({ x, y, t });
  }

  return data;
}
