import axios, { CreateAxiosDefaults } from "axios";

const baseQueryInstance: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true,
    headers: {
        ["Content-Type"]: "application/json"
    }
}


export const axiosClient = axios.create(baseQueryInstance);


axiosClient.interceptors.response.use(
    response => {
        return response
    },
    async function (error) {
        return Promise.reject(error)
    }
)