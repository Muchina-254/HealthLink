import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import background from "../assets/login-bg.jpg"; // place an image here

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials. Please Check Username/Password.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={10} sx={{ p: 5, width: 350, textAlign: "center", backdropFilter: "blur(6px)" }}>
        <Typography variant="h5" sx={{ mb: 3, color: "#0B71EB", fontWeight: "bold" }}>
          HealthLink Login
        </Typography>
        <TextField fullWidth label="Username" variant="outlined" margin="normal" onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" variant="outlined" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "#0B71EB" }} onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginPage;
