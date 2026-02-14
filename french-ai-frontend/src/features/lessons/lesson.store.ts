import { create } from "zustand";

interface Question {
    id: number;
    points: number;
    question: string;
    type: "mcq" | "translate";
    options?: string[];
}

interface LessonStore {
    questions: Question[];
    current: number;
    score: number;

    loadQuestions: (lessonId: number) => Promise<void>;
    answerQuestion: (answer: string) => Promise<boolean>;
    next: () => void;
    reset: () => void;
}

export const useLessonStore = create<LessonStore>((set, get) => ({
    questions: [],
    current: 0,
    score: 0,

    loadQuestions: async (lessonId: number) => {
        const token = localStorage.getItem("accessToken");

        const res = await fetch('/api/lessons/42/questions', {
            headers: { "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" }
        });


        const data: Question[] = await res.json();
        set({ questions: data, current: 0 });
    },

    answerQuestion: async (answer: string) => {
        const token = localStorage.getItem("accessToken");

        const q = get().questions[get().current];

        const res = await fetch(`/api/lessons/42/answer`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify({
                questionId: q.id,
                answer,
            }),
        });

        const correct = await res.json();

        if (correct) {
            set((s) => ({ score: s.score + q.points }));
        }

        return correct;
    },

    next: () => set((s) => ({ current: s.current + 1 })),

    reset: () => set({ questions: [], current: 0, score: 0 }),
}));
