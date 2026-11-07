import os
import json
from html import escape
from typing import Annotated, List
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, SecretStr, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict
import resend

# --- Settings ---
# Read from environment variables (bootstrap.py exports container secrets) and .env for local dev
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    resend_api_key: SecretStr
    sender_email: str
    destination_email: str
    # Defaults to the prod path; .env sets the dev path
    data_dir: str = "/app/data"
    # Comma-separated list of allowed origins
    cors_origins: Annotated[List[str], NoDecode] = ["http://localhost:4200"]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_origins(cls, value):
        return value.split(",") if isinstance(value, str) else value

settings = Settings()
resend.api_key = settings.resend_api_key.get_secret_value()

app = FastAPI()
router = APIRouter()

ABOUT_FILE = os.path.join(settings.data_dir, "about.json")
PROJECTS_FILE = os.path.join(settings.data_dir, "projects.json")
SKILLS_FILE = os.path.join(settings.data_dir, "skills.json")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class AboutMe(BaseModel):
    title: str
    summary: str

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    sourceUrl: str = ''

class Skill(BaseModel):
    name: str
    category: str

# --- API Endpoints ---
@router.post("/contact")
async def handle_contact_form(contact_form: ContactForm):
    message: resend.Emails.SendParams = {
        "from": settings.sender_email,
        "to": [settings.destination_email],
        "subject": f"New contact from {contact_form.name} via portfolio",
        "html": f"""
            <p><strong>Name:</strong> {escape(contact_form.name)}</p>
            <p><strong>Email:</strong> {escape(contact_form.email)}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>{escape(contact_form.message)}</p>
        """,
        "reply_to": contact_form.email,
    }

    try:
        resend.Emails.send(message)
        return {"message": "Contact form submitted successfully"}
    except Exception as e:
        print(f"Error sending email with Resend: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/about")
async def get_about_me() -> AboutMe:
    try:
        with open(ABOUT_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="About file not found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding about JSON.")

@router.get("/projects", response_model=List[Project])
async def get_projects() -> List[Project]:
    try:
        with open(PROJECTS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Projects file not found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding projects JSON.")

@router.get("/skills", response_model=List[Skill])
async def get_skills() -> List[Skill]:
    try:
        with open(SKILLS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Skills file not found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding skills JSON.")

# Include the custom router at the api prefix
app.include_router(router, prefix="/api")