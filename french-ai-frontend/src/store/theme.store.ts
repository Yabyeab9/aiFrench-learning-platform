import { create } from "zustand";

type ThemeState = {
    dark: boolean;
    toggle: () => void;
    setDark: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    dark: localStorage.getItem("theme") === "dark",

    toggle: () =>
        set((state) => {
            const newDark = !state.dark;

            if (newDark) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }

            return { dark: newDark };
        }),

    setDark: (value) => {
        if (value) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        set({ dark: value });
    },
}));
