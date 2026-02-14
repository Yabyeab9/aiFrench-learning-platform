import { useLessonStore } from "./lesson.store";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function QuestionCard() {
    const  lessonId  = 1;
    const id = lessonId ? Number(lessonId) : null;

    const { loadQuestions, questions, current, answerQuestion, next } = useLessonStore();

    const [selected, setSelected] = useState("");
    const [, setResult] = useState<null | boolean>(null);

    useEffect(() => {
        if (id !== null && !isNaN(id)) {
            loadQuestions(id);
        }
    }, [id, loadQuestions]);

    const q = questions[current];

    if (!q) {
        return <LessonComplete />;
    }

    const correctSound = new Howl({ src: ["/sounds/correct.mp3"] });
    const wrongSound = new Howl({ src: ["/sounds/wrong.mp3"] });

    const submit = async () => {
        const correct = await answerQuestion(selected);
        setResult(correct);

        if (correct) {
            correctSound.play();
            setTimeout(() => {
                setSelected("");
                setResult(null);
                if (current < questions.length - 1) {
                    next(); // only advance if more questions exist
                }
            }, 900);
        } else {
            wrongSound.play();
            alert("❌ Oops! Try again.");
        }
    };


    return (
        <motion.div key={q.id} initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="bg-slate-900 p-10 rounded-3xl w-full max-w-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{q.question}</h2>

            {q.type === "mcq" && q.options?.map((opt) => (
                <button key={opt} onClick={() => setSelected(opt)}
                        className={`w-full p-4 mb-3 rounded-xl border transition ${
                            selected === opt
                                ? "bg-indigo-600 border-indigo-400"
                                : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                        }`}>
                    {opt}
                </button>
            ))}


                <input value={selected} onChange={(e) => setSelected(e.target.value)}
                       placeholder="Type answer..." className="w-full p-4 rounded-xl bg-slate-800" />


            <button onClick={submit}
                    className="mt-6 w-full p-4 rounded-xl bg-emerald-500 hover:bg-emerald-600">
                Check
            </button>
        </motion.div>
    );
}

function LessonComplete() {
    const { score, reset } = useLessonStore();
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🎉 Lesson Complete</h1>
            <p className="text-xl mb-6">Score: {score}</p>
            <button onClick={reset} className="bg-indigo-600 px-6 py-3 rounded-xl">
                Replay
            </button>
        </div>
    );
}
