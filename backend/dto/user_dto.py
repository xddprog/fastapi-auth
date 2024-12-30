from pydantic import BaseModel


class BaseUserModel(BaseModel):
    id: int
    username: str
    email: str | None = None
    telegram_id: int | None = None