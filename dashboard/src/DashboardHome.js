import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import Layout from "./Layout";
import HomeOverview from "./HomeOverview";
import Patients from "./Patients";
import Encounters from "./Encounters";
import Reports from "./Reports";

export default function DashboardHome() {
  const [view, setView] = useState("overview");

  const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };

  return (
      <Layout view={view} setView={setView}>
    <Layout title={view === "patients" ? "Patients" : "Overview"} onLogout={logout}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant={view === "overview" ? "contained" : "outlined"} onClick={() => setView("overview")}>Overview</Button>
        <Button variant={view === "patients" ? "contained" : "outlined"} onClick={() => setView("patients")}>Patients</Button>
        <Button variant={view === "encounters" ? "contained" : "outlined"} onClick={() => setView("encounters")}>Encounters</Button>
        <Button variant={view === "reports" ? "contained" : "outlined"} onClick={() => setView("reports")}>Reports</Button>
      </Stack>

      {view === "overview" && <HomeOverview />}
      {view === "patients" && <Patients />}
      {view === "encounters" && <Encounters />}
      {view === "reports" && <Reports />}
    </Layout>
  );
}
