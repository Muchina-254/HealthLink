// dashboard/src/services/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// attach token if present
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("hl_token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export async function fetchOverview() {
  try {
    const res = await api.get("/overview");
    return res.data;
  } catch (e) {
    // bubble up to component which will use demo data
    console.warn("fetchOverview failed", e?.message || e);
    throw e;
  }
}

export async function fetchPatients() {
  try {
    const res = await api.get("/patients");
    return res.data;
  } catch (e) {
    console.warn("fetchPatients failed", e?.message || e);
    throw e;
  }
}

export default api;
