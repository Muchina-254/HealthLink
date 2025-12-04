import React from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 220;

export default function Layout({ view, setView, children }) {
  const menuItems = [
    { name: "Overview", icon: <DashboardIcon />, key: "overview" },
    { name: "Patients", icon: <PeopleIcon />, key: "patients" },
    { name: "Encounters", icon: <EventNoteIcon />, key: "encounters" },
    { name: "Reports", icon: <AssessmentIcon />, key: "reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0077B6",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ mx: "auto", fontWeight: 600 }}>
            HealthLink
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.key}
              onClick={() => setView(item.key)}
              sx={{
                backgroundColor: view === item.key ? "#00B4D8" : "transparent",
                color: "#fff",
                "&:hover": { backgroundColor: "#0096C7" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: "auto", p: 2 }}>
          <ListItemButton onClick={handleLogout} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, bgcolor: "#F6F9FC", minHeight: "100vh" }}>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
