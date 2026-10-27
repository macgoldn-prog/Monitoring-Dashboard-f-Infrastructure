# Local Infrastructure Monitoring Dashboard

A lightweight, full-stack infrastructure monitoring system that tracks local machine performance metrics (CPU, RAM, and Disk usage) in real time.

---

## 🏗️ Architecture

The system uses a **dual-service decoupled monorepo architecture**:

* **Backend (`/backend`)**: Built with **FastAPI** and Python’s **`psutil`** library to fetch real-time host metrics and expose them via a REST API endpoint (`/api/v1/metrics`). Includes CORS middleware configuration for local cross-origin communication.
* **Frontend (`/dashboard-ui`)**: Built with **Next.js** and **Tailwind CSS**, featuring polling logic to retrieve and render live system health metrics cleanly in a user interface.

---

## 🛠️ Prerequisites

* **Python**: 3.8+
* **Node.js**: v18+ & `npm`
* **OS**: macOS / Linux / Windows

---

## 🚀 Quick Start & Setup

Running the full stack requires two independent terminal sessions running side-by-side.

### 1. Start the FastAPI Backend

Open a terminal session and navigate to the backend folder:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
# macOS / Linux
python3 -m venv venv
source venv/bin/activate

# Windows (Command Prompt)
# python -m venv venv
# venv\Scripts\activate
```

Install the dependencies:

```bash
pip install fastapi uvicorn psutil
```

Run the API server:

```bash
uvicorn main:app --reload --port 8000
```

*The backend will be available at `http://localhost:8000/api/v1/metrics`.*

---

### 2. Start the Next.js Frontend

Open a **second** terminal tab/window (`Cmd + T` on macOS):

```bash
cd dashboard-ui
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

*The dashboard interface will be live at `http://localhost:3000`.*

---

## ⚙️ REST API Reference

### `GET /api/v1/metrics`

Returns current host performance statistics.

**Example Response:**
```json
{
  "cpu_percent": 18.4,
  "memory_percent": 62.1,
  "disk_percent": 45.8,
  "status": "recorded"
}
```

---

## 🔧 Troubleshooting Quick Reference

| Issue / Error | Cause | Resolution |
| :--- | :--- | :--- |
| `EADDRINUSE` (Port busy) | A process is already bound to port `8000` or `3000`. | Kill process on 8000: `lsof -ti:8000 \| xargs kill -9`<br>Kill process on 3000: `lsof -ti:3000 \| xargs kill -9` |
| `ModuleNotFoundError: main` | Terminal path is incorrect when launching Uvicorn. | Ensure your terminal is inside the `/backend` directory where `main.py` resides. |
| Dashboard stuck on *"Loading..."* | Frontend cannot reach backend or CORS block. | Verify `uvicorn` terminal displays `App startup completed` and that CORS middleware is enabled in `main.py`. |

---

## 🗺️ Roadmap & Next Stages

- [ ] **Historical Data Visualization**: Add dynamic charts using `Recharts` or `Chart.js` to plot telemetry over time.
- [ ] **Threshold Alerting**: Dynamic visual triggers (e.g., Tailwind amber/red badges when CPU > 80%).
- [ ] **Expanded Metrics**: Add monitoring for network throughput (I/O) and active system processes.
- [ ] **Containerization**: Create Dockerfiles for both services and orchestrate startup via `docker-compose.yml`.
