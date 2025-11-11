import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API = "http://127.0.0.1:8000";

function MetricCard({ title, value, color }) {
  return (
    <Card sx={{ background: color || "#fff", color: "#fff" }}>
      <CardContent>
        <Typography variant="subtitle2" color="inherit">{title}</Typography>
        <Typography variant="h5" color="inherit">{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default function HomeOverview() {
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    redCases: 0,
    avgTemp: 0,
    avgHeartRate: 0,
  });
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/patients`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        const total = data.length;
        const avgTemp = data.reduce((s, p) => s + (parseFloat(p.temperature) || 0), 0) / total || 0;
        const avgHR = data.reduce((s, p) => s + (parseFloat(p.heart_rate) || 0), 0) / total || 0;
        const red = data.filter(p => (p.temperature > 39 || p.heart_rate > 100)).length;

        setMetrics({
          totalPatients: total,
          redCases: red,
          avgTemp: avgTemp.toFixed(1),
          avgHeartRate: avgHR.toFixed(0),
        });

        setTrendData(
          data.map((p, i) => ({
            name: p.name,
            temp: p.temperature,
            heart: p.heart_rate,
          }))
        );
      });
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}><MetricCard title="Total Patients" value={metrics.totalPatients} color="#0B71EB" /></Grid>
        <Grid item xs={12} md={3}><MetricCard title="RED Cases" value={metrics.redCases} color="#D32F2F" /></Grid>
        <Grid item xs={12} md={3}><MetricCard title="Avg Temp (°C)" value={metrics.avgTemp} color="#0288D1" /></Grid>
        <Grid item xs={12} md={3}><MetricCard title="Avg Heart Rate" value={metrics.avgHeartRate} color="#388E3C" /></Grid>
      </Grid>

      <Box sx={{ height: 320 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Vitals Overview</Typography>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="temp" fill="#0B71EB" name="Temperature" />
            <Bar dataKey="heart" fill="#388E3C" name="Heart Rate" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}
