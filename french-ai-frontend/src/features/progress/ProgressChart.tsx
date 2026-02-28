import {useLessonStore} from "../lessons/lesson.store.ts";


export default function ProgressSection() {
    const { current, questions, score } = useLessonStore();
    const total = questions.length;
    const progress = total > 0 ? Math.round(((current+1) / total) * 100) : 0;
    const accuracy = current > 0 ? Math.round((score / (current+1)) * 100) : 0;

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Lesson Progress</h3>
            <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm">Question {current+1} of {total}</p>
            <p className="text-sm">Accuracy: {accuracy}%</p>
        </div>
    );
}
