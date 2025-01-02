import { AxiosResponse } from "axios";
import { LoginUserInterface, RegisterUserInterface } from "../../schemas/auth";
import { axiosClient } from "../client/axiosClient";



export default class AuthService {
    public BASE_URL = "/auth";

    public async loginUser(loginData: LoginUserInterface): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/login`, loginData);
    }

    public async registerUser(registerData: RegisterUserInterface): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/register`, registerData);
    }

    public async authWithGithub(code: string): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/github`, {}, {params: {code: code}});
    }

    public async authWithVk(code: string): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/vk`, {}, {params: {code: code}});
    }

    public async authWithYandex(code: string): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/yandex`, {}, {params: {access_token: code}});
    }
}