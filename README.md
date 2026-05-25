# 🚀 TrackRiders — Real-Time Fleet Tracking & Dispatch Control Center

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Material UI](https://img.shields.io/badge/Material_UI-7.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

**TrackRiders** is a high-performance, real-time dispatch dashboard and rider telemetry terminal built for logistics, food delivery, and service fleets. The platform coordinates communication between administrators at the central command center and active riders on the ground, updating telemetry, geolocations, and order assignments instantly using WebSockets.

---

## 📸 Platform Highlights

*   **⚡ Live Command Center (Admin Dashboard):** Track available, active, and on-leave fleets with visual counters.
*   **🗺️ Satellite Geo-Tracking:** Live-rendered interactive OpenStreetMap views (Leaflet + React-Leaflet) showing the real-time coordinates of riders as they move through cities.
*   **📦 Dynamic Order Dispatch:** Instantly dispatch orders to active riders complete with ID, product, delivery address, and receiver info.
*   **📱 Rider Shift Terminal:** A dedicated workspace for riders to claim shifts, view current assignments, trigger GPS pings, and mark orders as delivered.
*   **🔒 Secure Operations:** Multi-level JSON Web Token (JWT) authentication, encrypted session controls, and secure password hashing.

---

## 🛠️ Tech Stack Architecture

### Frontend (Client-side)
*   **React (v19) & Vite:** Ultra-fast hot module replacement (HMR) and optimized single-page routing.
*   **Leaflet & React-Leaflet:** High-performance, lightweight vector mapping system for location telemetry.
*   **Tailwind CSS & Material UI (MUI):** Premium, modern glassmorphism styling combined with responsive layout libraries.
*   **Framer Motion & Lucide React:** Fluid transitions, beautiful layout shifts, and pixel-perfect iconography.
*   **Socket.io-Client:** Low-latency persistent connection to receive instant position broadcasts.

### Backend (Server-side)
*   **Node.js & Express:** Modern ES modules syntax structure supporting high-throughput API requests.
*   **Socket.io:** Dedicated WebSocket host for fast, full-duplex communication channels.
*   **MongoDB & Mongoose:** Scalable document database with a specialized `2dsphere` index configured on rider location points for geospatial queries.
*   **JWT & bcryptjs:** Strong security controls guarding administrative endpoints and rider sessions.

---

## 📂 Repository Architecture

```text
TrackRiders/
├── client/                     # Vite + React Frontend Application
│   ├── src/
│   │   ├── api/                # Axios instance and API call configurations
│   │   ├── components/         # Reusable modules (e.g. MapModal.jsx Leaflet map)
│   │   ├── context/            # Global state context providers (RiderContext)
│   │   ├── pages/              # Application layouts (Dashboard, Rider Terminal, Landing)
│   │   ├── services/           # Socket connection handles & helper scripts
│   │   ├── App.jsx             # Main Router and routes definition
│   │   └── main.jsx            # React root mount point
│   ├── tailwind.config.js      # Styling framework overrides
│   ├── vite.config.js          # Vite build optimizations
│   └── package.json            # Frontend dependency manifest
│
└── server/                     # Node.js + Express Backend Engine
    ├── config/                 # Environment configs and constants
    ├── controllers/            # Route logic controllers (Auth, Rider status)
    ├── middleware/             # Route guards (Authentication validation)
    ├── models/                 # Mongoose schemas (User/Admin, Rider profiles)
    ├── routes/                 # Express REST endpoint maps
    ├── server.js               # Main WebSocket router & cluster listener
    └── package.json            # Backend dependency manifest
```

---

## 🚦 System Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and a running instance of **MongoDB** (Local or MongoDB Atlas) ready.

---

### Step 1: Configure the Server Database

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependency libraries:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `/server` directory and add your MongoDB Atlas credentials:
   ```env
   PORT=5001
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/TrackRiders?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_secret_hash_here
   ```

> [!TIP]
> **Pro-Tip for MongoDB Atlas:** Ensure your current IP is whitelisted under **Network Access** in the MongoDB Atlas dashboard to prevent connection timeouts during startup.

---

### Step 2: Configure the Client Dashboard

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify that your API connection endpoint in your pages points to `http://localhost:5001` (matching the server configuration).

---

### Step 3: Run the System

You can run both environments concurrently in separate terminals:

#### Start Backend Server
```bash
cd server
npm run dev
```
*The server will initialize its MongoDB connection and spin up the Express + Socket.io listener on port `5001`.*

#### Start Frontend Application
```bash
cd client
npm run dev
```
*The Vite development server will spin up on `http://localhost:5173`. Open this URL in your web browser.*

---

## 📡 WebSocket Real-time Protocol

TrackRiders relies on seamless real-time data sync. The following events drive the telemetry stream:

| Event Name | Source | Purpose | Payload Example |
| :--- | :--- | :--- | :--- |
| `send-location` | Rider Client | Updates current GPS coordinates to the server | `{ "riderId": "RD12", "location": { "type": "Point", "coordinates": [68.3578, 25.3960] } }` |
| `receive-location`| Server Host | Broadcasts updated positions instantly to all Admins | `{ "riderId": "RD12", "location": { "type": "Point", "coordinates": [68.3578, 25.3960] } }` |
| `disconnect` | Any Client | Safely signals disconnection of terminal from host | `(Standard connection close packet)` |

---

## 📑 Core API Reference

### Administrative Authentication (`/api/auth`)
*   `POST /api/auth/register` — Registers a new operations administrator.
*   `POST /api/auth/login` — Verifies administrator identity and yields a JWT token.
*   `GET /api/auth/me` — Fetches metadata of the currently logged-in administrator (JWT guarded).

### Fleet & Operations Management (`/api/riders`)
*   `POST /api/riders/login` — Rider shifts terminal authentication.
*   `POST /api/riders/:riderId/deliver` — Marks a rider's active order as delivered, updates status to free, and logs transaction history.
*   `GET /api/riders` — Retrieves a full directory of registered riders (JWT guarded).
*   `GET /api/riders/active` — Lists all riders currently on shift and active (JWT guarded).
*   `POST /api/riders` — Registers a new rider profile into system database (JWT guarded).
*   `PUT /api/riders/:riderId` — Edits existing profile parameters of a rider (JWT guarded).
*   `DELETE /api/riders/:riderId` — Permanently removes a rider profile from database (JWT guarded).

---

## 🛡️ License

This project is licensed under the ISC License. Feel free to clone, modify, and contribute to scaling this real-time fleet operations center!

---

*Made with ❤️ by [Moiz Malik](https://github.com/moizmalik11)*
