// dashboard/src/components/Login.js
import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function fakeLogin() {
    // Demo mode: store token and redirect
    // In production call backend /auth/login to get token
    localStorage.setItem("hl_token", "demo-token");
    navigate("/");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, width: 360, backdropFilter: "blur(4px)" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          HealthLink Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={fakeLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}
