from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import time

app = FastAPI(title="Vision AI API Backend")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Univision API. Go to /docs to see the interface."}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SystemStatus(BaseModel):
    stage: str
    message: str

class PipelineEvent(BaseModel):
    id: int
    timestamp: str
    message: str
    isError: bool

class DetectionResult(BaseModel):
    id: int
    label: str
    confidence: float
    box: str


def get_time():
    return time.strftime("%I:%M:%S %p")

mock_status = SystemStatus(
    stage="running",
    message="Pipeline active. YOLOv8 model loaded."
)

mock_events = [
    PipelineEvent(id=101, timestamp=get_time(), message="System initialized.", isError=False),
    PipelineEvent(id=102, timestamp=get_time(), message="Camera feed connected.", isError=False),
    PipelineEvent(id=103, timestamp=get_time(), message="Running inference...", isError=False)
]

mock_results = [
    DetectionResult(id=1, label="Tony", confidence=0.92, box="[120, 150, 250, 380]"),
    DetectionResult(id=2, label="Bucky", confidence=0.85, box="[10, 40, 100, 120]"),
    DetectionResult(id=3, label="Cap", confidence=0.64, box="[130, 180, 170, 220]")
]

@app.get("/status", response_model=SystemStatus)
def get_system_status():
    return mock_status

@app.get("/events", response_model=List[PipelineEvent])
def get_recent_events():
    return mock_events

@app.get("/detections", response_model=List[DetectionResult])
def get_current_detections():
    return mock_results