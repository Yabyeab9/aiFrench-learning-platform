import QuestionCard from "./QuestionCard.tsx";
import ProgressBar from "./ProgressBar.tsx";

export default function LessonPage() {
    return (
        <div className="
            min-h-screen
            bg-slate-950
            text-white
            flex
            flex-col
            items-center
            justify-center
            p-6
        ">
            <ProgressBar />
            <QuestionCard />
        </div>
    );
}
