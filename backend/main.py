import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from typing import List, Dict

load_dotenv()

app = FastAPI()
router = APIRouter()

# Hardcoded path for data files (tries to get dev path and defaults to prod)
DATA_DIR = os.getenv("DATA_DIR", "/app/data")
ABOUT_FILE = os.path.join(DATA_DIR, "about.json")
PROJECTS_FILE = os.path.join(DATA_DIR, "projects.json")
SKILLS_FILE = os.path.join(DATA_DIR, "skills.json")

# Get allowed origins from environment variable, split by comma
origins = os.getenv("CORS_ORIGINS", "http://localhost:4200").split(",")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    from_email = os.getenv("SENDER_EMAIL")
    to_email = os.getenv("DESTINATION_EMAIL")

    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=f"New contact from {contact_form.name} via portfolio",
        html_content=f"""
            <p><strong>Name:</strong> {contact_form.name}</p>
            <p><strong>Email:</strong> {contact_form.email}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>{contact_form.message}</p>
        """
    )
    message.reply_to = contact_form.email

    try:
        sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sendgrid_client.send(message)
        if response.status_code >= 300:
            raise HTTPException(status_code=response.status_code, detail=response.body)
        return {"message": "Contact form submitted successfully"}
    except Exception as e:
        print(f"Error sending email with SendGrid: {e}")
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