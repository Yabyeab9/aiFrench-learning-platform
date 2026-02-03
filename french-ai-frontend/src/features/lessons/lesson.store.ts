import { create } from "zustand";

type Question = {
    id: number;
    type: "mcq" | "translate";
    question: string;
    options?: string[];
    answer: string;
};

type LessonState = {
    questions: Question[];
    current: number;
    score: number;

    answerQuestion: (answer: string) => boolean;
    next: () => void;
    reset: () => void;
};

export const useLessonStore = create<LessonState>((set, get) => ({

    questions: [
        {
            id: 1,
            type: "mcq",
            question: "What is 'Bonjour'?",
            options: ["Hello", "Goodbye", "Thanks"],
            answer: "Hello",
        },
        {
            id: 2,
            type: "translate",
            question: "Translate: Merci",
            answer: "Thank you",
        },
    ],

    current: 0,
    score: 0,

    answerQuestion: (answer) => {

        const { questions, current, score } = get();

        const correct = questions[current].answer
            .toLowerCase()
            .trim() === answer.toLowerCase().trim();

        if (correct) {
            set({ score: score + 10 });
        }

        return correct;
    },

    next: () => set((s) => ({ current: s.current + 1 })),

    reset: () => set({ current: 0, score: 0 }),
}));
