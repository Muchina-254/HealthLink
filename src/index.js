// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#0B71EB" },
    background: { default: "#F5F8FF" },
  },
  typography: { fontFamily: "Roboto, Arial" }
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
