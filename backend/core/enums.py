from enum import Enum


class AuthServices(str, Enum):
    VK = "vk"
    YANDEX = "yandex"
    GITHUB = "github"
    TELEGRAM = "telegram"