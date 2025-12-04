import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const API = "http://127.0.0.1:8000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        setMsg("Login successful");
        window.location.href = "/";
      } else {
        setMsg("Login failed: " + (data.detail || "Unknown"));
      }
    } catch (err) {
      setMsg("Unable to reach server");
    }
  };

  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: "url('/login_bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
      <Paper elevation={6} sx={{ width: 360, p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>HealthLink Sign In</Typography>

        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Username" value={username} onChange={e => setUsername(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" fullWidth type="submit">Sign in</Button>
        </form>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{msg}</Typography>
      </Paper>
    </Box>
  );
}
