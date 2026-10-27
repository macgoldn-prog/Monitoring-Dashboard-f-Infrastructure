# Monitoring-Dashboard-f-Infrastructure
Monitoring Dashboard for businesses to implement. STAGE 1

Local Infrastructure Monitoring Dashboard: Implementation User Guide
This guide outlines the architecture, setup process, and maintenance workflow for running your local full-stack infrastructure monitoring dashboard.
1. Architecture Overview
The system uses a dual-service decoupled architecture:

Backend (/backend): Built with FastAPI and Python’s psutil library to fetch live system metrics (CPU, Memory, Disk) and expose them via a REST API. CORS is enabled to allow cross-origin requests.
Frontend (/frontend or root directory): Built with Next.js and Tailwind CSS, featuring real-time polling logic to fetch and display live metrics cleanly.
2. Step-by-Step Implementation Guide
Prerequisites
Python 3.x installed
Node.js & npm installed
Step 1: Set Up the FastAPI Backend
Open a terminal tab and navigate to your backend folder:cd ~/monitoring-dashboard/backend
Create and activate a Python virtual environment:python3 -m venv venv

source venv/bin/activate

Install dependencies:pip install fastapi uvicorn psutil
Ensure your main.py includes CORS middleware:from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

import psutil

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

@app.get("/api/v1/metrics")

def get_metrics():

    return {

        "cpu_percent": psutil.cpu_percent(interval=None),

        "memory_percent": psutil.virtual_memory().percent,

        "disk_percent": psutil.disk_usage('/').percent,

        "status": "recorded"

    }

Start the backend server:uvicorn main:app --reload --port 8000
Step 2: Set Up and Run the Next.js Frontend
Open a second terminal tab (Cmd + T on macOS).
Navigate to your frontend project directory:cd ~/monitoring-dashboard/dashboard-ui
Install dependencies (if not already done):npm install
Start the development server:npm run dev
Open your browser and navigate to http://localhost:3000 to view your live dashboard.
3. Troubleshooting Quick Reference
Issue / Error
Cause
Resolution
Port Already in Use (EADDRINUSE)
A process is already running on port 8000 or 3000.
Kill port 8000: lsof -ti:8000 | xargs kill -9Kill port 3000: lsof -ti:3000 | xargs kill -9
Module Not Found (main)
Terminal execution path is incorrect.
Ensure your terminal is actively inside the backend folder where main.py lives before running Uvicorn.
Metrics stuck on "Loading..."
Frontend cannot reach backend or requests blocked.
Check that your backend terminal says App startup completed and that CORS is correctly configured in main.py.

4. Steps for the Next Stage
Now that your MVP is fully operational and pulling real-time data, here are the recommended next steps to elevate the project:

Add Historical Charts (Data Visualization)
Integrate a library like Recharts or Chart.js into your Next.js frontend to plot CPU and Memory trends over time rather than just displaying static live cards.
Implement Threshold Alerts
Add visual cues or conditional styling in Tailwind (e.g., turning metric cards red or amber when CPU usage exceeds 80%).
Expand Monitored Metrics
Update main.py to extract additional metrics from psutil, such as network I/O, disk input/output speeds, or active process counts.
Containerize with Docker Compose
Write a Dockerfile for each service and a docker-compose.yml file in the root directory so you can spin up the entire stack with a single docker compose up command.


