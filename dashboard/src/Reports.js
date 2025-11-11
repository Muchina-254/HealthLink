import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";

const API = "http://127.0.0.1:8000";

export default function Reports() {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/patients`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setPatients)
      .catch(console.error);
  }, []);

  const avgTemp = (patients.reduce((sum, p) => sum + (parseFloat(p.temperature) || 0), 0) / (patients.length || 1)).toFixed(1);
  const avgHR = (patients.reduce((sum, p) => sum + (parseFloat(p.heart_rate) || 0), 0) / (patients.length || 1)).toFixed(0);

  const redCases = patients.filter(p => p.temperature > 39 || p.heart_rate > 100).length;
  const normalCases = patients.length - redCases;

  const pieData = [
    { name: "Normal", value: normalCases },
    { name: "Critical", value: redCases }
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reports & Statistics
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Vitals</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[{ name: "Vitals", Temperature: avgTemp, HeartRate: avgHR }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Temperature" fill="#2196F3" />
                  <Bar dataKey="HeartRate" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Case Distribution</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
