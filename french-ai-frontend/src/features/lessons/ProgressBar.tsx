import { useLessonStore } from "./lesson.store";
import { motion } from "framer-motion";

export default function ProgressBar() {

    const { current, questions } = useLessonStore();

    const percent = ((current) / questions.length) * 100;

    return (
        <div className="w-full max-w-2xl mb-10">
            <div className="h-3 bg-slate-800 rounded-full">
                <motion.div
                    className="h-3 bg-indigo-500 rounded-full"
                    animate={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
