'use client';

import { useEffect, useState } from 'react';

interface Metrics {
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
  status: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/metrics');
        if (!res.ok) throw new Error('Failed to fetch metrics');
        const data = await res.json();
        setMetrics(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Infrastructure Monitoring Dashboard</h1>
        <p className="text-gray-400 mb-8">Stage 1 MVP — Local System Metrics</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
            Error connecting to backend: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">CPU Usage</h2>
            <p className="text-4xl font-extrabold mt-4 text-blue-400">
              {metrics ? `${metrics.cpu_percent}%` : 'Loading...'}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Memory (RAM)</h2>
            <p className="text-4xl font-extrabold mt-4 text-green-400">
              {metrics ? `${metrics.memory_percent}%` : 'Loading...'}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Disk Usage</h2>
            <p className="text-4xl font-extrabold mt-4 text-purple-400">
              {metrics ? `${metrics.disk_percent}%` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}