from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, Dict, Any
import os
from datetime import datetime
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="Eleven Clone API",
    description="Backend API for ElevenLabs clone application",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "eleven_clone")

# Global database connection
client = None
db = None

@app.on_event("startup")
async def startup_db_client():
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    print("Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB")

# Pydantic models
class AudioResponse(BaseModel):
    language: str
    audioUrl: str
    createdAt: str
    updatedAt: str

class PersonalDetails(BaseModel):
    name: str
    age: int
    email: EmailStr

class OnboardingData(BaseModel):
    theme: str
    personalDetails: PersonalDetails
    referralSource: str
    persona: str
    pricingPlan: str

class OnboardingResponse(BaseModel):
    message: str
    userId: str
    status: str

# API Routes

@app.get("/")
async def root():
    return {"message": "Eleven Clone API is running!"}

@app.get("/api/audio", response_model=AudioResponse)
async def get_audio_url(lang: str = Query(..., description="Language code (e.g., 'english', 'arabic')")):
    """
    Get audio URL for a specific language.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    try:
        # Query the audio_urls collection
        audio_doc = await db.audio_urls.find_one({"language": lang.lower()})
        
        if not audio_doc:
            raise HTTPException(
                status_code=404, 
                detail=f"Audio URL not found for language: {lang}"
            )
        
        return AudioResponse(
            language=audio_doc["language"],
            audioUrl=audio_doc["url"],
            createdAt=audio_doc.get("createdAt", ""),
            updatedAt=audio_doc.get("updatedAt", "")
        )
    
    except Exception as e:
        print(f"Error fetching audio URL: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/onboarding", response_model=OnboardingResponse)
async def create_onboarding_profile(data: OnboardingData):
    """
    Create a new onboarding profile.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    try:
        # Prepare the document for insertion
        profile_doc = {
            "theme": data.theme,
            "personalDetails": {
                "name": data.personalDetails.name,
                "age": data.personalDetails.age,
                "email": data.personalDetails.email
            },
            "referralSource": data.referralSource,
            "persona": data.persona,
            "pricingPlan": data.pricingPlan,
            "createdAt": datetime.utcnow().isoformat(),
            "updatedAt": datetime.utcnow().isoformat()
        }
        
        # Insert into onboarding_profiles collection
        result = await db.onboarding_profiles.insert_one(profile_doc)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create profile")
        
        return OnboardingResponse(
            message="Onboarding profile created successfully",
            userId=str(result.inserted_id),
            status="success"
        )
    
    except Exception as e:
        print(f"Error creating onboarding profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/onboarding/{user_id}")
async def get_onboarding_profile(user_id: str):
    """
    Get onboarding profile by user ID.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    try:
        from bson import ObjectId
        profile = await db.onboarding_profiles.find_one({"_id": ObjectId(user_id)})
        
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Convert ObjectId to string for JSON serialization
        profile["_id"] = str(profile["_id"])
        return profile
    
    except Exception as e:
        print(f"Error fetching profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
