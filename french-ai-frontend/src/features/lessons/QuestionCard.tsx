import { useLessonStore } from "./lesson.store";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Howl } from "howler";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRoadmapStore } from "../levels/roadmap.store";
import { useToast } from "../../components/ui/Toast";

export default function QuestionCard() {
    const location = useLocation();
    const level = location.state?.level;
    const { loadQuestions, questions, current, answerQuestion, next } = useLessonStore();


    const [selected, setSelected] = useState("");
    const [, setResult] = useState<null | boolean>(null);
    const { show, Toast } = useToast();
    const [nextLoading, setNextLoading] = useState(false);

    useEffect(() => {
        if (typeof level === "number") {
            loadQuestions(level).catch((e) => console.warn("loadQuestions failed", e));
        }
    }, [level, loadQuestions]);

    const q = questions[current];

    if (!q) {
        return <>
            <LessonComplete nextLoading={nextLoading} setNextLoading={setNextLoading} show={show} />
            <Toast />
        </>;
    }

    const correctSound = new Howl({ src: ["/sounds/correct.mp3"] });
    const wrongSound = new Howl({ src: ["/sounds/wrong.mp3"] });

    const submit = async () => {
        if (!selected) return show?.("Select or type an answer");
        const correct = await answerQuestion(selected);
        setResult(correct);
        if (correct) {
            correctSound.play();
        } else {
            wrongSound.play();
        }
        setTimeout(() => {
            setSelected("");
            setResult(null);
            next();
        }, 900);
    };


    return (
        <motion.div key={q.id} initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-10 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-700 premium-card">
            <h2 className="text-2xl font-bold mb-6">{q.question}</h2>

            {q.type === "mcq" && q.options?.map((opt) => (
                <button key={opt} onClick={() => setSelected(opt)}
                        className={`w-full p-4 mb-3 rounded-xl border transition text-left ${
                            selected === opt
                                ? "bg-indigo-600 border-indigo-400 text-white"
                                : "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                        }`}>
                    {opt}
                </button>
            ))}


                <input value={selected} onChange={(e) => setSelected(e.target.value)}
                       placeholder="Type answer..." className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 mb-4" />


            <div className="grid grid-cols-2 gap-4 mt-4">
                <button onClick={submit}
                        className="mt-0 w-full p-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition shadow-md">
                    Check
                </button>
                <button onClick={() => { setSelected(''); setResult(null); next(); }}
                        className="mt-0 w-full p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition border border-slate-600">
                    Skip
                </button>
            </div>
        </motion.div>
    );
}

function LessonComplete({ nextLoading, setNextLoading, show }: { nextLoading?: boolean; setNextLoading?: (b:boolean)=>void; show?: (m:string)=>void }) {
     const { score, reset, questions, canUnlockNext,loadQuestions } = useLessonStore();
     const total = questions.length;
     const location = useLocation();
     const level = location.state?.level;
     const navigate = useNavigate();
     const loadRoadmap = useRoadmapStore((s) => s.loadRoadmap);
     const markCompleteAndUnlockNext = useRoadmapStore((s) => s.markCompleteAndUnlockNext);

     return (
         <div className="text-center">
             <h1 className="text-4xl font-bold mb-4">
                 {canUnlockNext() ? "🎉 Lesson Complete" : "❌ Try Again"}
             </h1>
             <p className="text-xl mb-6">
                 Score: {score} / {total}
             </p>

             {canUnlockNext() ? (
                 <button
                     disabled={nextLoading}
                     onClick={async () => {
                         setNextLoading?.(true);
                         reset();
                         const nextLevel = (typeof level === 'number' ? level : 0) + 1;
                         // optimistic UI update
                         if (typeof level === "number") markCompleteAndUnlockNext(level);
                         // inform backend to persist unlock (authoritative)
                         try {
                             const token = localStorage.getItem("accessToken");
                             // POST the nextLevel so backend unlocks the correct lesson
                             const res = await fetch(`/api/lessons/level/${nextLevel}/unlock`, {
                                 method: "POST",
                                 headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                             });
                             if (!res.ok) {
                                 console.warn("unlock API returned non-ok", res.status);
                             }
                         } catch (err) {
                             console.warn("unlock API failed", err);
                             // backend failed — still continue using optimistic state
                         }
                         await loadQuestions(nextLevel).catch(e=>console.warn(e));
                         // refresh the roadmap so the unlocked/completed state is authoritative; force bypass cache
                         await loadRoadmap(true).catch(e=>console.warn(e));
                         show?.("Unlocked! Loading next lesson...");
                         navigate("/lesson", { state: { level: nextLevel } });
                         setNextLoading?.(false);
                     }}
                     className="bg-emerald-600 px-6 py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                 >
                     {nextLoading ? 'Loading…' : 'Next Lesson'}
                 </button>
             ) : (
                 <button
                     disabled={nextLoading}
                     onClick={async () =>{
                         setNextLoading?.(true);
                         reset();
                         const currentLevel = (level ?? 0);
                         await loadQuestions(currentLevel).catch(e=>console.warn(e));
                         // ensure roadmap is fresh
                         await loadRoadmap(true).catch(e=>console.warn(e));
                         navigate("/lesson", { state: { level: currentLevel } });
                         setNextLoading?.(false);
                      }}
                     className="bg-indigo-600 px-6 py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                 >
                     {nextLoading ? 'Loading…' : 'Replay'}
                 </button>
             )}
         </div>
     );
 }
