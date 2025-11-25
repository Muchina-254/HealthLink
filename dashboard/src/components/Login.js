// src/components/Login.js
import React from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const navigate = useNavigate();
  function fakeLogin(){
    // in demo mode we simply store a token and redirect
    localStorage.setItem("hl_token", "demo-token");
    navigate("/");
  }
  return (
    <Box sx={{display:"flex", justifyContent:"center", mt:10}}>
      <Paper sx={{p:4, width:360}}>
        <Typography variant="h6" sx={{mb:2}}>HealthLink Login</Typography>
        <TextField label="Username" fullWidth sx={{mb:2}} />
        <TextField label="Password" type="password" fullWidth sx={{mb:2}} />
        <Button variant="contained" color="primary" fullWidth onClick={fakeLogin}>Login</Button>
      </Paper>
    </Box>
  );
}
