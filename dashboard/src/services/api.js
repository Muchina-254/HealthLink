// src/services/api.js
import axios from "axios";
import { demoPatients, demoOverview } from "../data/demoData";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

// try to fetch patients; fall back to demo data if request fails
export async function fetchPatients() {
  try {
    const res = await api.get("/patients");
    // expecting array of patient documents
    return res.data;
  } catch (e) {
    return demoPatients;
  }
}

export async function fetchOverview() {
  try {
    // you may implement /overview endpoint in backend later
    const res = await api.get("/overview"); // optional
    return res.data;
  } catch (e) {
    return demoOverview;
  }
}
