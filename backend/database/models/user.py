from sqlalchemy import BigInteger, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.database.models.base import Base


class User(Base):
    __tablename__ = "users"
    
    username: Mapped[str]
    email: Mapped[str] = mapped_column(nullable=True)
    password: Mapped[str] = mapped_column(nullable=True)

