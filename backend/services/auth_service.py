import hashlib
import hmac
import json
from datetime import datetime, timedelta

from h11 import Request
from jwt import InvalidTokenError, encode, decode
from passlib.context import CryptContext

from backend.core.config import load_jwt_config
from backend.dto.auth_dto import LoginForm, RegisterForm
from backend.dto.user_dto import BaseUserModel
from backend.database.models.user import User
from backend.repositories.user_repository import UserRepository
from backend.services.base_service import BaseService
from backend.errors.auth_errors import (
    InvalidLoginData,
    InvalidToken,
    UserAlreadyNotRegister,
    UserAlreadyRegister,
)


class AuthService(BaseService):
    repository: UserRepository

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.__config = load_jwt_config()
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def get_user_by_email(self, email: str) -> User | None:
        user = await self.repository.get_by_attribute(self.repository.model.email, email)
        return None if not user else user[0]

    async def hash_password(self, password: str) -> str:
        return self.context.hash(password)

    async def verify_password(
        self, password: str, hashed_password: str
    ) -> bool:
        return self.context.verify(password, hashed_password)

    async def authenticate_user(self, form: LoginForm) -> User:
        user = await self.get_user_by_email(form.email)
        if not user:
            raise UserAlreadyNotRegister
        if not await self.verify_password(form.password, user.password):
            raise InvalidLoginData
        return await self.model_dump(user, BaseUserModel)

    async def create_access_token(self, email: str) -> str:
        expire = datetime.now() + timedelta(minutes=self.__config.JWT_ACCESS_TOKEN_TIME)
        data = {"exp": expire, "sub": email}
        token = encode(
            data,
            self.__config.JWT_SECRET, 
            algorithm=self.__config.JWT_ALGORITHM
        )
        return token
    
    async def create_refresh_token(self, email: str ):
        expire = datetime.now() + timedelta(days=self.__config.JWT_REFRESH_TOKEN_TIME)
        data = {"exp": expire, "sub": email}
        return encode(
            data, 
            self.__config.JWT_SECRET, 
            algorithm=self.__config.JWT_ALGORITHM
        )

    async def verify_token(self, token: str) -> str:
        if not token:
            raise InvalidToken
        try:
            payload = decode(
                token,
                self.__config.JWT_SECRET,
                algorithms=[self.__config.JWT_ALGORITHM],
            )
            email = payload.get("sub")
            if not email or not await self.get_user_by_email(email):
                raise InvalidToken
            return email
        except (InvalidTokenError, AttributeError) as e:
            raise InvalidToken

    async def check_user_exist(self, email: str) -> User:
        user = await self.get_user_by_email(email)
        if user is None:
            raise InvalidToken
        return await self.model_dump(user, BaseUserModel)

    async def register_user(self, form: RegisterForm) -> User:
        user = await self.get_user_by_email(form.email)
        if user:
            raise UserAlreadyRegister

        form.password = await self.hash_password(form.password)
        new_user = await self.repository.add_item(**form.model_dump())
        return await self.model_dump(new_user, BaseUserModel)
