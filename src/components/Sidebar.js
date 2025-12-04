// src/components/Sidebar.js
import React from "react";
import { List, ListItemButton, ListItemText, Box, Typography } from "@mui/material";

function Sidebar({ currentTab, onSelect }) {
  const tabs = ["Overview", "Patients", "Encounters", "Reports", "Regional Trends"];

  return (
    <Box sx={{ width: 220, bgcolor: "#0B71EB", color: "#fff", minHeight: "100vh", p: 2 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        HealthLink
      </Typography>

      <List>
        {tabs.map((tab) => (
          <ListItemButton
            key={tab}
            selected={currentTab === tab}
            onClick={() => onSelect(tab)}
            sx={{
              color: "#fff",
              mb: 1,
              borderRadius: 1,
              backgroundColor: currentTab === tab ? "#0071C9" : "transparent",
              "&:hover": { backgroundColor: "#0062A8" },
            }}
          >
            <ListItemText primary={tab} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
