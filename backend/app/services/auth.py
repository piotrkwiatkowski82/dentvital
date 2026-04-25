import hmac
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.config import settings


def verify_password(plain: str, stored: str) -> bool:
    """Constant-time comparison — prevents timing attacks."""
    return hmac.compare_digest(plain, stored)


def create_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    payload = {"sub": username, "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> str:
    """Returns username from a valid token, raises JWTError on failure."""
    payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
    username: str = payload.get("sub")
    if not username:
        raise JWTError("Missing subject")
    return username
