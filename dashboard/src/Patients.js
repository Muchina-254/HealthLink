import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import patientsData from "./data/patients";

export default function Patients() {
  const [region, setRegion] = useState("All");

  const regions = ["All", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];

  const filteredPatients =
    region === "All"
      ? patientsData
      : patientsData.filter((p) => p.region === region);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Patient Records
        </Typography>

        <FormControl sx={{ mb: 3, minWidth: 200 }}>
          <InputLabel>Filter by Region</InputLabel>
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            label="Filter by Region"
          >
            {regions.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Blood Pressure</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Pulse</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Last Visit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>{p.region}</TableCell>
                <TableCell>{p.bloodPressure}</TableCell>
                <TableCell>{p.temperature}</TableCell>
                <TableCell>{p.pulse}</TableCell>
                <TableCell>{p.diagnosis}</TableCell>
                <TableCell>{p.lastVisit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
