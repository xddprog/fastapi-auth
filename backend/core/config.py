from environs import Env
from pydantic import BaseModel


env = Env()
env.read_env()


class DatabaseConfig(BaseModel):
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str


class JwtConfig(BaseModel):
    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_TIME: int
    JWT_REFRESH_TOKEN_TIME: int
    BOT_TOKEN: str


class RedisConfig(BaseModel):
    REDIS_HOST: str
    REDIS_PORT: int


def load_database_config() -> DatabaseConfig:
    return DatabaseConfig(
        DB_NAME=env.str("DB_NAME"),
        DB_USER=env.str("DB_USER"),
        DB_PASS=env.str("DB_PASS"),
        DB_HOST=env.str("DB_HOST"),
        DB_PORT=env.str("DB_PORT"),
    )


def load_jwt_config() -> JwtConfig:
    return JwtConfig(
        JWT_SECRET=env.str("JWT_SECRET"),
        JWT_ALGORITHM=env.str("JWT_ALGORITHM"),
        JWT_ACCESS_TOKEN_TIME=env.int("JWT_ACCESS_TOKEN_TIME"),
        JWT_REFRESH_TOKEN_TIME=env.int("JWT_REFRESH_TOKEN_TIME"),
        BOT_TOKEN=env.str("BOT_TOKEN"),
    )


def load_redis_config() -> RedisConfig:
    return RedisConfig(
        REDIS_HOST=env.str("REDIS_HOST"),
        REDIS_PORT=env.int("REDIS_PORT"),
    )
