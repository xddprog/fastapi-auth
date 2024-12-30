from datetime import datetime
from uuid import uuid4
from pydantic import UUID4, BaseModel, Field

from backend.dto.user_dto import BaseUserModel


class RegisterForm(BaseModel):
    username: str
    password: str
    email: str


class LoginForm(BaseModel):
    email: str
    password: str
