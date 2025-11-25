// src/components/Overview.js
import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { fetchOverview, fetchPatients } from "../services/api";
import ChartPanel from "./ChartPanel";
import PatientTable from "./PatientTable";

export default function Overview() {
  const [overview, setOverview] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      const ov = await fetchOverview();
      setOverview(ov);
      const p = await fetchPatients();
      setPatients(p);
    })();
  }, []);

  if (!overview) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Overview</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Total Patients</Typography>
            <Typography variant="h5">{overview.metrics.patientsTotal}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Today's Encounters</Typography>
            <Typography variant="h5">{overview.metrics.todaysEncounters}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Avg RED Triage</Typography>
            <Typography variant="h5">{overview.metrics.avgTriageRed}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Top Region</Typography>
            <Typography variant="h5">{overview.metrics.regionsWithHighestLoad}</Typography>
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
