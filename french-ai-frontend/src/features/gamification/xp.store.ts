import { create } from "zustand";

type XPState = {
    xp: number;
    level: number;

    addXP: (amount:number)=>void;
};

export const useXPStore = create<XPState>((set,get)=>({

    xp: 0,
    level: 1,

    addXP: (amount)=>{

        const total = get().xp + amount;

        const level = Math.floor(total / 100) + 1;

        set({ xp: total, level });
    }
}));
