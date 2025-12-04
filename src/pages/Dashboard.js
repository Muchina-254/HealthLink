import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import banner from "../assets/banner-bg.jpg";

const COLORS = ["#0B71EB", "#00C49F", "#FFBB28", "#FF8042"];

const pieData = [
  { name: "Male", value: 60 },
  { name: "Female", value: 40 },
];

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          HealthLink Dashboard
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Metrics */}
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h4" color="primary">1250</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Encounters</Typography>
            <Typography variant="h4" color="primary">430</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Regions Active</Typography>
            <Typography variant="h4" color="primary">12</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Paper sx={{ p: 3, width: 400 }}>
          <Typography variant="h6" textAlign="center">Patients by Gender</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
              {pieData.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
               ))}
              </Pie>
             <Tooltip />
           </PieChart>
        </ResponsiveContainer>

        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
