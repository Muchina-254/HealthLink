// dashboard/src/components/Layout.js
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function Layout({ children }) {
  const navigate = useNavigate();

  function doLogout() {
    localStorage.removeItem("hl_token");
    navigate("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          backgroundColor: "#0B71EB",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            HealthLink
          </Typography>
          <IconButton color="inherit" onClick={doLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#F7FAFF",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {/* banner image - place banner.jpg inside public/images */}
          <Box
            sx={{
              height: 160,
              m: 2,
              borderRadius: 1,
              backgroundImage: "url('/images/banner.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <List>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>

            <ListItemButton component={Link} to="/patients">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
