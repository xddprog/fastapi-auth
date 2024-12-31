import { AxiosResponse } from "axios";
import { LoginUserInterface, RegisterUserInterface } from "../../schemas/auth";
import { axiosClient } from "../client/axiosClient";



export default class AuthService {
    static BASE_URL = "/auth";

    static async loginUser(loginData: LoginUserInterface): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/login`, loginData);
    }

    static async registerUser(registerData: RegisterUserInterface): Promise<AxiosResponse> {
        return axiosClient.post(`${this.BASE_URL}/register`, registerData);
    }
}