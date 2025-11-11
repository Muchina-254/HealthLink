import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

const API = "http://127.0.0.1:8000";

export default function Encounters() {
  const [encounters, setEncounters] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    date: "",
    temperature: "",
    heart_rate: "",
    notes: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/encounters`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setEncounters)
      .catch(console.error);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    fetch(`${API}/encounters`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        alert("Encounter added successfully!");
        handleClose();
      })
      .catch(console.error);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Patient Encounters
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        + New Encounter
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Encounter</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Patient ID"
            value={formData.patient_id}
            onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Temperature (°C)"
            value={formData.temperature}
            onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Heart Rate"
            value={formData.heart_rate}
            onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Temperature (°C)</TableCell>
            <TableCell>Heart Rate</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encounters.map((enc, i) => (
            <TableRow key={i}>
              <TableCell>{enc.patient_id}</TableCell>
              <TableCell>{enc.date}</TableCell>
              <TableCell>{enc.temperature}</TableCell>
              <TableCell>{enc.heart_rate}</TableCell>
              <TableCell>{enc.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
