// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0077B6" },   // professional healthcare blue
    secondary: { main: "#00B4D8" }, // light teal
    background: {
      default: "#F5F9FC",          // light clean background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0A2239",          // dark navy for good contrast
      secondary: "#4F6D7A",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: 16 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
