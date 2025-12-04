// dashboard/src/components/Overview.js
import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Alert } from "@mui/material";
import { fetchOverview, fetchPatients } from "../services/api";
import ChartPanel from "./ChartPanel";
import PatientTable from "./PatientTable";

const demoOverview = {
  metrics: {
    patientsTotal: 125,
    todaysEncounters: 8,
    avgTriageRed: 2,
    regionsWithHighestLoad: "Siaya",
  },
  lineData: [
    { date: "2025-11-01", encounters: 5 },
    { date: "2025-11-02", encounters: 7 },
    { date: "2025-11-03", encounters: 3 },
    { date: "2025-11-04", encounters: 6 },
    { date: "2025-11-05", encounters: 8 },
  ],
  pieData: [
    { name: "Siaya", value: 40 },
    { name: "Nairobi", value: 30 },
    { name: "Kisumu", value: 20 },
    { name: "Mombasa", value: 15 },
  ],
};

const demoPatients = [
  { patient_id: "P001", name: "John Doe", region: "Siaya" },
  { patient_id: "P002", name: "Mary Wanjiru", region: "Mombasa" },
  { patient_id: "P003", name: "Kevin Otieno", region: "Kisumu" },
  { patient_id: "P004", name: "Aisha Noor", region: "Garissa" },
  { patient_id: "P005", name: "Brian Mwangi", region: "Nakuru" },
];

export default function Overview() {
  const [overview, setOverview] = useState(null);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const ov = await fetchOverview();
        if (!ov || typeof ov !== "object" || !ov.metrics) {
          setOverview(demoOverview);
        } else {
          setOverview(ov);
        }

        const p = await fetchPatients();
        if (!Array.isArray(p) || p.length === 0) setPatients(demoPatients);
        else setPatients(p);
      } catch (e) {
        setOverview(demoOverview);
        setPatients(demoPatients);
        setError("Unable to reach backend — using demo data.");
      }
    })();
  }, []);

  if (!overview) return <div style={{ padding: 20 }}>Loading overview...</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="warning">{error}</Alert>
        </Box>
      )}

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Total Patients</Typography>
            <Typography variant="h5">{overview.metrics?.patientsTotal ?? "—"}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Today's Encounters</Typography>
            <Typography variant="h5">{overview.metrics?.todaysEncounters ?? "—"}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Avg RED Triage</Typography>
            <Typography variant="h5">{overview.metrics?.avgTriageRed ?? "—"}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Top Region</Typography>
            <Typography variant="h5">{overview.metrics?.regionsWithHighestLoad ?? "—"}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <ChartPanel lineData={overview.lineData} pieData={overview.pieData} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <PatientTable patients={patients} />
      </Paper>
    </Box>
  );
}
