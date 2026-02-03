import { create } from "zustand";

export type AuthState = {
    accessToken: string | null;
    user: any | null;

    login: (token: string, user: any) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,

    login: (token, user, remember = false) => {
        if (remember) {
            localStorage.setItem("token", token);
        }
        set({
            accessToken: token,
            user,
        })
    },
    logout: () =>
        set({
            accessToken: null,
            user: null,
        }),
}));
