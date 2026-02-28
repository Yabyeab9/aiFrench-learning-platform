import { create } from "zustand";

export type User = {
    id: number;
    email: string;
    name?: string;
    level?: string;
};

export type AuthState = {
    accessToken: string | null;
    user: User | null;
    login: (token: string, user: User, remember?: boolean) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,

    login: (token, user, remember = false) => {
        if (remember) {
            localStorage.setItem("token", token);
        }
        set({ accessToken: token, user });
    },
    logout: () =>
        set({ accessToken: null, user: null }),
}));
