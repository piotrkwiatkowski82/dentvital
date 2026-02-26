import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

import aiosmtplib
from jinja2 import Environment, FileSystemLoader

from app.config import settings
from app.schemas.booking import BookingCreate
from app.schemas.contact import ContactCreate

logger = logging.getLogger(__name__)

# Jinja2 template environment
templates_dir = Path(__file__).parent.parent / "templates"
jinja_env = Environment(loader=FileSystemLoader(str(templates_dir)), autoescape=True)


class EmailService:
    def __init__(self) -> None:
        self.host = settings.SMTP_HOST
        self.port = settings.SMTP_PORT
        self.username = settings.SMTP_USERNAME
        self.password = settings.SMTP_PASSWORD
        self.from_email = settings.SMTP_FROM_EMAIL
        self.clinic_email = settings.CLINIC_EMAIL
        self.use_tls = settings.SMTP_USE_TLS

    async def _send_email(self, to: str, subject: str, html_body: str) -> None:
        """Send an email via SMTP."""
        if not self.host or not self.username:
            logger.warning("SMTP not configured — skipping email send. Subject: %s", subject)
            logger.info("Email body preview:\n%s", html_body[:500])
            return

        msg = MIMEMultipart("alternative")
        msg["From"] = self.from_email
        msg["To"] = to
        msg["Subject"] = subject
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        try:
            await aiosmtplib.send(
                msg,
                hostname=self.host,
                port=self.port,
                username=self.username,
                password=self.password,
                start_tls=self.use_tls,
            )
            logger.info("Email sent successfully to %s: %s", to, subject)
        except Exception:
            logger.exception("Failed to send email to %s: %s", to, subject)

    async def send_booking_notification(self, booking: BookingCreate) -> None:
        """Send booking inquiry notification to the clinic."""
        template = jinja_env.get_template("booking_notification.html")
        html = template.render(
            service=booking.service,
            date=booking.date.strftime("%d.%m.%Y"),
            time=booking.time.strftime("%H:%M"),
            name=booking.name,
            phone=booking.phone,
            email=booking.email or "—",
        )
        subject = f"Nowa rezerwacja: {booking.service} — {booking.date.strftime('%d.%m.%Y')} {booking.time.strftime('%H:%M')}"
        await self._send_email(self.clinic_email, subject, html)

    async def send_contact_notification(self, contact: ContactCreate) -> None:
        """Send contact message notification to the clinic."""
        template = jinja_env.get_template("contact_notification.html")
        html = template.render(
            name=contact.name,
            email=contact.email,
            phone=contact.phone or "—",
            message=contact.message,
        )
        subject = f"Nowa wiadomość od: {contact.name}"
        await self._send_email(self.clinic_email, subject, html)


# Dependency
def get_email_service() -> EmailService:
    return EmailService()
