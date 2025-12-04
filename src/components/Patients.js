// src/components/Patients.js
import React, { useEffect, useState } from "react";
import { fetchPatients } from "../services/api";
import PatientTable from "./PatientTable";
import { Typography } from "@mui/material";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    (async () => {
      const p = await fetchPatients();
      setPatients(p);
    })();
  }, []);
  return (
    <div>
      <Typography variant="h4" gutterBottom>Patients</Typography>
      <PatientTable patients={patients} />
    </div>
  );
}
