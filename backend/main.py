import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI()
router = APIRouter()

# Get allowed origins from environment variable, split by comma
# Default to localhost for development if not set
origins = os.getenv("CORS_ORIGINS", "http://localhost:4200").split(",")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@router.post("/contact")
async def handle_contact_form(contact_form: ContactForm):
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail

    # The "from" email must be the one you verified with SendGrid
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
    # Allows you to "reply" to the person who submitted the form
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



app.include_router(router, prefix="/api")
