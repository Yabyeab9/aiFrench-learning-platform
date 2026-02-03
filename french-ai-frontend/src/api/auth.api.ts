import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    user: any | null;
    login: (token: string, user: any) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,

    login: (token, user) =>
        set({ accessToken: token, user }),

    logout: () =>
        set({ accessToken: null, user: null }),
}));
