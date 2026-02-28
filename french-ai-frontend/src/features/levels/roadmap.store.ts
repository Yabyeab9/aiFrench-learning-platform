import { create } from "zustand";

export type LevelNode = {
    level: number;
    unlocked: boolean;
    completed: boolean;
    xpRequired: number;
    userXp: number;
};

type RoadmapState = {
    levels: LevelNode[];
    loading: boolean;
    _cachedAt: number;
    loadRoadmap: (force?: boolean) => Promise<void>;
    markCompleteAndUnlockNext: (level: number) => void;
    setLevels: (levels: LevelNode[]) => void;
};

const FALLBACK_LEVELS: LevelNode[] = Array.from({ length: 6 }).map((_, i) => ({
    level: i + 1,
    unlocked: i === 0,
    completed: false,
    xpRequired: 100,
    userXp: 0,
}));

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
    levels: FALLBACK_LEVELS,
    loading: false,
    _cachedAt: 0,
    loadRoadmap: async (force = false) => {
        const TTL = 60_000; // 60s
        const now = Date.now();
        // Use cached data if recent and not forced
        if (!force) {
            const cachedAt = get()._cachedAt || 0;
            if (cachedAt && now - cachedAt < TTL) return;
        }
        set({ loading: true });
        try {
            const token = localStorage.getItem("accessToken");
            const res = await fetch(`/api/lessons/roadmap`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                console.warn("roadmap fetch returned non-ok status", res.status);
                // Do not wipe optimistic local state on backend failure — keep existing levels
                return;
            }
            const data = await res.json();
            if (Array.isArray(data) && data.length) {
                set({ levels: data, _cachedAt: Date.now() });
            } else {
                // if backend returned empty list, keep fallback
                console.warn("roadmap returned empty, keeping local state");
            }
        } catch (err) {
            console.error("loadRoadmap failed", err);
            // keep current state (fallback) so UI remains usable offline
        } finally {
            set({ loading: false });
        }
    },
    // Optimistic: mark the provided level as completed and unlock the next one
    markCompleteAndUnlockNext: (level: number) =>
        set((s) => {
            const nextLevels = s.levels.map((l) => {
                if (l.level === level) return { ...l, completed: true, userXp: l.xpRequired };
                if (l.level === level + 1) return { ...l, unlocked: true };
                return l;
            });
            try {
                localStorage.setItem("roadmap:levels", JSON.stringify(nextLevels));
            } catch (e) {
                // ignore storage errors
            }
            return { levels: nextLevels };
        }),
    setLevels: (levels: LevelNode[]) => set({ levels }),
}));
