// dashboard/src/components/ChartPanel.js
import React from "react";
import { Grid } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF0"];

export default function ChartPanel({ lineData = [], pieData = [] }) {
  const safeLine = Array.isArray(lineData) ? lineData : [];
  const safePie = Array.isArray(pieData) ? pieData : [];

  const normalizedLine = safeLine.map((d) => ({
    date: d.date ?? d.label ?? "",
    encounters: Number(d.encounters ?? d.value ?? 0),
  }));

  const normalizedPie = safePie.map((d) => ({
    name: d.name ?? d.label ?? "unknown",
    value: Number(d.value ?? d.count ?? 0),
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={normalizedLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="encounters" stroke="#0B71EB" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>

      <Grid item xs={12} md={5}>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={normalizedPie} cx="50%" cy="50%" outerRadius={100} label>
                {normalizedPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
}
