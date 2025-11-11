import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Switch, Typography, Box } from "@mui/material";
import HomeOverview from "./HomeOverview";
import Patients from "./Patients";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#00B4D8" },
      background: { default: darkMode ? "#121212" : "#f4f4f4" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            HealthLink Dashboard
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>
              Dark Mode
            </Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>
        <HomeOverview />
        <Box mt={5}>
          <Patients />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
