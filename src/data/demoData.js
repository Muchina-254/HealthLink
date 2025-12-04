// src/data/demoData.js
export const demoPatients = [
  { patient_id: "P0001", name: "Grace Achieng", dob: "1985-05-10", gender: "F", phone: "0711000001", region: "Siaya", notes: "Hypertension" },
  { patient_id: "P0002", name: "John Otieno", dob: "1990-07-22", gender: "M", phone: "0711000002", region: "Nairobi", notes: "Diabetes" },
  { patient_id: "P0003", name: "Mary Wanjiru", dob: "1978-02-11", gender: "F", phone: "0711000003", region: "Siaya", notes: "Malaria" },
  { patient_id: "P0004", name: "Paul Mwangi", dob: "2001-12-01", gender: "M", phone: "0711000004", region: "Kisumu", notes: "Asthma" },
  { patient_id: "P0005", name: "Amina Yusuf", dob: "1969-08-05", gender: "F", phone: "0711000005", region: "Siaya", notes: "General checkup" },
  { patient_id: "P0006", name: "Peter Kamau", dob: "1982-11-30", gender: "M", phone: "0711000006", region: "Nakuru", notes: "Follow-up" }
];

export const demoOverview = {
  metrics: {
    patientsTotal: 1240,
    todaysEncounters: 32,
    avgTriageRed: 4,
    regionsWithHighestLoad: "Siaya"
  },
  lineData: [
    { date: "2025-11-01", encounters: 20 },
    { date: "2025-11-02", encounters: 25 },
    { date: "2025-11-03", encounters: 22 },
    { date: "2025-11-04", encounters: 30 },
    { date: "2025-11-05", encounters: 28 },
    { date: "2025-11-06", encounters: 35 },
    { date: "2025-11-07", encounters: 32 }
  ],
  pieData: [
    { name: "Siaya", value: 40 },
    { name: "Nairobi", value: 25 },
    { name: "Kisumu", value: 15 },
    { name: "Nakuru", value: 10 },
    { name: "Other", value: 10 }
  ]
};
