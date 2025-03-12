# Military Mortar Ballistics Calculator

## 📌 Overview
This project is a **Next.js application** designed to **simulate and visualize mortar ballistics** with realistic physics, including:

- 🎯 **Projectile motion with air resistance**
- 🌬️ **Wind influence on trajectory**
- 🎛️ **Customizable parameters** (velocity, launch angle, wind speed/direction, projectile mass)
- 🖥️ **Dynamic DOS-style UI** with a retro military theme
- 📈 **Real-time graph updates** using Chart.js

---

## 🚀 Features
✅ **Adjustable sliders** for:
- **Initial velocity (m/s)**
- **Launch angle (°)**
- **Wind speed (m/s)**
- **Wind direction (°) with a rotating arrow indicator**
- **Projectile mass & size (coming soon)**

✅ **Fixed-axis trajectory visualization** for better analysis
✅ **Air resistance modeling** using **Newton’s Drag Equation**
✅ **Wind influence on horizontal and vertical motion**
✅ **Realistic numerical simulation using Euler’s method**

---

## 🛠️ Installation & Setup

```sh
# Clone the repository
git clone https://github.com/yourusername/mortar-ballistics.git
cd mortar-ballistics

# Install dependencies
npm install

# Run the development server
npm run dev
```

🔗 Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Ballistics Model
This app simulates **mortar projectile motion** considering:

🪂 **Forces Acting on the Projectile:**
- **Gravity** (9.81 m/s²)
- **Air drag** based on:
  - Drag coefficient (**0.47** for a sphere)
  - Air density (**1.225 kg/m³** at sea level)
  - Cross-sectional area (**πr²**)

💨 **Wind Components:**
- **Wind X-component** affects horizontal motion.
- **Wind Y-component** affects vertical lift or downward push.

🧮 **Numerical Integration:**
- **Euler’s Method** is used for realistic motion updates.

---

## 🎨 UI & Styling
🖥️ **Retro DOS-style UI** with green monochrome text
🎨 **TailwindCSS for styling**
🎛️ **Custom sliders** for smooth adjustments
⚡ **Real-time updates** with no need for a submit button
📊 **Chart.js visualization of projectile trajectory**

---

## 🔧 Upcoming Features
📌 **Projectile Mass & Size Adjustments**
📌 **Terrain Elevation Effects**
📌 **Multiple Trajectories for Comparison**
📌 **Custom Projectile Shapes with Different Drag Coefficients**

---

## 📜 License
This project is licensed under the **MIT License**.

🔥 **Developed for military simulation & educational purposes.** 🚀

