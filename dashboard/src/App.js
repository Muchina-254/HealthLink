import React, { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/encounter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patient_id: "Test001",
        vitals: { temp: 39.1, rr: 60 }
      })
    })
      .then((r) => r.json())
      .then((data) => setResult(JSON.stringify(data)))
      .catch(() => setResult("Backend not reachable"));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>HealthLink Dashboard</h1>
      <p>Test API Response:</p>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
