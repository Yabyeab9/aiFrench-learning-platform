import { create } from "zustand";

interface Question {
    id: number | string;
    points: number;
    question: string;
    type: "mcq" | "translate";
    options?: string[];
}

interface LessonStore {
    questions: Question[];
    current: number;
    score: number;
    currentLessonId: number | null;
    _cache: Record<number, { questions: Question[]; cachedAt: number }>;
    canUnlockNext:()=> boolean;
    loadQuestions: (levelId: number, force?: boolean) => Promise<void>;
    answerQuestion: (answer: string) => Promise<boolean>;
    next: () => void;
    setQuestions: (q: Question[], lessonId?: number) => void;
    reset: () => void;
}

export const useLessonStore = create<LessonStore>((set, get) => ({
    questions: [],
    current: 0,
    score: 0,
    currentLessonId: null,
    _cache: {},

    loadQuestions: async (levelId: number, force = false) => {
        const TTL = 60_000; // 60s
        const cached = get()._cache[levelId];
        const now = Date.now();
        if (!force && cached && (now - cached.cachedAt) < TTL) {
            set({ questions: cached.questions, current: 0, currentLessonId: levelId });
            return;
        }
        const token = localStorage.getItem("accessToken");

        // Use the level endpoint which returns questions for a given level
        const res = await fetch(`/api/lessons/level/${levelId}`, {
            headers: { "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" }
        });


        const data: Question[] = await res.json();
        set({ questions: data, current: 0, currentLessonId: levelId, _cache: { ...get()._cache, [levelId]: { questions: data, cachedAt: Date.now() } } });
    },

    answerQuestion: async (answer: string) => {
        const token = localStorage.getItem("accessToken");

        const q = get().questions[get().current];
        const lessonId = get().currentLessonId;

        const res = await fetch(`/api/lessons/${lessonId}/answer`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify({
                questionId: q.id,
                answer,
                question: q,
                lessonId,
            }),
        });

        const correct = await res.json();

        if (correct) {
            set((s) => ({ score: s.score + 1 }));
        }

        return correct;
    },

    next: () => set((s) => ({ current: s.current + 1 })),

    reset: () => {
        // only reset the local state (current and score). Do not auto-load a hard-coded lessonId here.
        set({ current: 0, score: 0 });
        // caller should decide which lesson to load next
    },
    setQuestions: (qs: Question[], lessonId?: number) =>
        set({
            questions: qs,
            current: 0,
            score: 0,
            currentLessonId: lessonId ?? null,
        }),
    canUnlockNext: ()=>{
        const {score,questions} = get();
        return score >=Math.ceil(questions.length/2)
    }


}));
