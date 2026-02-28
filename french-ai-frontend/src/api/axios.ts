import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const api = axios.create({
    baseURL: "http://localhost:9090/api",
    timeout: 8000,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        // helpful dev log
        console.error("API error:", err?.message, err?.response?.status);
        return Promise.reject(err);
    }
);
