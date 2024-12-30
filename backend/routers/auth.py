from typing import Annotated
from fastapi import APIRouter, Depends, Request, Response

from backend.dto.auth_dto import RegisterForm, LoginForm
from backend.dto.user_dto import BaseUserModel
from backend.services import AuthService
from backend.core.dependencies import (
    get_auth_service,
    get_current_user_dependency,
)


router = APIRouter()


@router.get("/current_user")
async def get_current_user(
    current_user: BaseUserModel = Depends(get_current_user_dependency),
) -> BaseUserModel:
    return current_user


@router.post("/login", status_code=200)
async def login_user(
    form: LoginForm,
    response: Response,
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
) -> BaseUserModel:
    user = await auth_service.authenticate_user(form)
    access_token = await auth_service.create_access_token(form.email)
    refresh_token = await auth_service.create_refresh_token(form.email)
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return user


@router.post("/refresh")
async def refresh_token(
    request: Request, 
    response: Response,
    auth_service: Annotated[AuthService, Depends(get_auth_service)]
):
    refresh_token = request.cookies.get("refresh_token")
    email_or_tg_id, _ = await auth_service.verify_token(refresh_token)
    access_token = await auth_service.create_access_token(email_or_tg_id)
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    

@router.delete("/logout")
async def logout_user(response: Response) -> dict[str, str]:
    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")
    return {"detail": "Вы вышли из аккаунта"}


@router.post("/register", status_code=201)
async def register_user(
    form: RegisterForm,
    response: Response,
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
) -> BaseUserModel:
    new_user = await auth_service.register_user(form)
    access_token = await auth_service.create_access_token(form.email)
    refresh_token = await auth_service.create_refresh_token(form.email)
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return new_user
