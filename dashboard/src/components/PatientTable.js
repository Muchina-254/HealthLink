// src/components/PatientTable.js
import React, { useState, useMemo } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, Box } from "@mui/material";

export default function PatientTable({ patients = [] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const regions = useMemo(() => {
    const r = Array.from(new Set(patients.map(p => p.region).filter(Boolean)));
    return ["All", ...r];
  }, [patients]);

  const filtered = patients.filter(p => {
    const matchesQuery = query === "" || p.name.toLowerCase().includes(query.toLowerCase()) || p.patient_id.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region === "All" || p.region === region;
    return matchesQuery && matchesRegion;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <TextField label="Search patient or ID" value={query} onChange={e => setQuery(e.target.value)} size="small" />
        <TextField select label="Region" value={region} onChange={e => setRegion(e.target.value)} size="small">
          {regions.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map(p => (
            <TableRow key={p.patient_id}>
              <TableCell>{p.patient_id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.region}</TableCell>
              <TableCell>{p.phone}</TableCell>
              <TableCell>{p.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
