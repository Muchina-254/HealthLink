# app.py
import os
from typing import Optional, List
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, Field
from jose import jwt, JWTError

from beanie import Document, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from passlib.context import CryptContext
from dotenv import load_dotenv

# Load .env
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
JWT_SECRET = os.getenv("JWT_SECRET", "change_this_secret")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "1440"))

if not MONGODB_URI:
    raise RuntimeError("Please set MONGODB_URI in .env file (see .env.example)")

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

app = FastAPI(title="HealthLink Backend (MongoDB)")

# Allow the dashboard and mobile to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # set to your frontend origin when deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Beanie document models (MongoDB) ---
class User(Document):
    username: str
    email: Optional[EmailStr] = None
    hashed_password: str
    role: str = "user"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"

class Patient(Document):
    patient_id: str
    name: str
    dob: Optional[str] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "patients"

class Encounter(Document):
    patient_id: str
    patient_name: Optional[str]
    vitals: dict
    symptoms: List[str] = []
    triage: str
    created_by: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "encounters"

# --- Request schemas ---
class RegisterSchema(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    password: str

class LoginSchema(BaseModel):
    username: str
    password: str

class PatientCreate(BaseModel):
    patient_id: str
    name: str
    dob: Optional[str] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

class EncounterIn(BaseModel):
    patient_id: str
    vitals: dict
    symptoms: Optional[List[str]] = []

# --- Auth helpers ---
def get_password_hash(password: str):
    return pwd_ctx.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_ctx.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=JWT_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        role: str = payload.get("role", "user")
        if username is None:
            raise credentials_exception
        user = await User.find_one(User.username == username)
        if not user:
            raise credentials_exception
        return {"username": username, "role": role}
    except JWTError:
        raise credentials_exception

def admin_required(current_user = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user

# --- Startup: connect to MongoDB and initialize Beanie ---
@app.on_event("startup")
async def app_init():
    print("Connecting to MongoDB:", MONGODB_URI)
    client = AsyncIOMotorClient(MONGODB_URI)
    await init_beanie(database=client.get_default_database(), document_models=[User, Patient, Encounter])
    # Create a default admin user if none exists
    existing = await User.find_one(User.username == "admin")
    if not existing:
        # admin_user = User(username="admin", email=None, hashed_password=get_password_hash("adminpass"), role="admin")
        # await admin_user.insert()
        pass 
    
@app.get("/")
async def root():
    return {"message": "HealthLink backend running."}

# --- Authentication endpoints ---
@app.post("/auth/register")
async def register(data: RegisterSchema):
    found = await User.find_one(User.username == data.username)
    if found:
        raise HTTPException(status_code=400, detail="Username already exists")
    user = User(username=data.username, email=data.email, hashed_password=get_password_hash(data.password))
    await user.insert()
    return {"message": "User registered"}

@app.post("/auth/login")
async def login(data: LoginSchema):
    user = await User.find_one(User.username == data.username)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "role": user.role}

# --- Patients ---
@app.post("/patients", dependencies=[Depends(get_current_user)])
async def create_patient(payload: PatientCreate):
    existing = await Patient.find_one(Patient.patient_id == payload.patient_id)
    if existing:
        raise HTTPException(status_code=400, detail="Patient exists")
    p = Patient(**payload.dict())
    await p.insert()
    return p

@app.get("/patients", dependencies=[Depends(get_current_user)])
async def list_patients():
    docs = await Patient.find_all().to_list()
    return docs

@app.get("/patients/{pid}", dependencies=[Depends(get_current_user)])
async def get_patient(pid: str):
    p = await Patient.find_one(Patient.patient_id == pid)
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    return p

# ========================
# NEW: Update and Delete Patient Endpoints
# ========================

@app.put("/patients/{patient_id}")
async def update_patient(patient_id: str, updated_data: dict):
    result = await db["patients"].update_one({"patient_id": patient_id}, {"$set": updated_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"message": "Patient updated successfully"}

@app.delete("/patients/{patient_id}")
async def delete_patient(patient_id: str):
    result = await db["patients"].delete_one({"patient_id": patient_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"message": "Patient deleted successfully"}

# --- Encounters ---
@app.post("/encounters")
async def add_encounter(encounter: dict):
    await db["encounters"].insert_one(encounter)
    return {"message": "Encounter added"}
@app.get("/encounters")
async def list_encounters():
    encounters = await db["encounters"].find().to_list(100)
    return encounters
@app.post("/encounters", dependencies=[Depends(get_current_user)])
async def create_encounter(payload: EncounterIn, current_user = Depends(get_current_user)):
    vitals = payload.vitals or {}
    # parse common vitals (full hospital set)
    temp = float(vitals.get("temp", 0) or 0)
    rr = int(vitals.get("rr", 0) or 0)
    hr = int(vitals.get("hr", 0) or 0)
    spo2 = int(vitals.get("spo2", 100) or 100)
    # Simple rule-based triage (example)
    triage = "GREEN"
    if temp >= 39 or rr > 50 or spo2 < 91:
        triage = "RED"
    elif rr > 40 or temp >= 38.5 or spo2 < 95:
        triage = "YELLOW"
    # find patient name if available
    patient = await Patient.find_one(Patient.patient_id == payload.patient_id)
    patient_name = patient.name if patient else None
    enc = Encounter(
        patient_id=payload.patient_id,
        patient_name=patient_name,
        vitals=vitals,
        symptoms=payload.symptoms or [],
        triage=triage,
        created_by=current_user["username"]
    )
    await enc.insert()
    return enc

@app.get("/records", dependencies=[Depends(get_current_user)])
async def get_records():
    docs = await Encounter.find_all().sort("-created_at").to_list()
    return docs
