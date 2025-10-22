from fastapi import FastAPI
from pydantic import BaseModel
import joblib, os

app = FastAPI(title="HealthLink Backend")

# Load trained AI model
MODEL_PATH = "models/model_rf.pkl"
model = joblib.load(MODEL_PATH)

# Define the data format for incoming requests
class Encounter(BaseModel):
    patient_id: str
    vitals: dict

@app.post("/encounter")
def predict_triage(data: Encounter):
    temp = data.vitals.get("temp", 0)
    rr = data.vitals.get("rr", 0)

    # Rule-based check
    if temp >= 39 or rr > 50:
        return {"triage": "RED", "reason": "High fever or fast breathing"}

    # Use AI model to predict severity
    prediction = model.predict([[temp, rr]])[0]
    triage_map = {0: "GREEN", 1: "YELLOW", 2: "RED"}
    return {"triage": triage_map.get(prediction, "GREEN")}
    
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
