import QuestionCard from "./QuestionCard.tsx";
import ProgressBar from "./ProgressBar.tsx";
import LevelRoadmap from "../../pages/LevelRoadmap";
import { useLocation } from "react-router-dom";

export default function LessonPage() {
    const location = useLocation();
    const selectedLevel = location.state?.level;

    // If no level selected -> show roadmap centered
    if (typeof selectedLevel === 'undefined' || selectedLevel === null) {
        return (
            <div className="min-h-screen flex items-start justify-center p-8">
                <div className="w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6">Choose a level to start</h2>
                    <div className="p-6 premium-card">
                        <LevelRoadmap />
                    </div>
                </div>
            </div>
        );
    }

    // level selected -> show lesson interface with compact roadmap aside
    return (
        <div className="min-h-screen bg-transparent text-white flex p-6">
            <div className="flex-1 flex flex-col items-center justify-start">
                <div className="w-full max-w-2xl mb-6">
                    <ProgressBar />
                </div>

                <QuestionCard />
            </div>

            {/* Right column: compact roadmap (still visible for context) */}
            <aside className="w-96 ml-8 hidden lg:block">
                <div className="sticky top-6">
                    <h3 className="text-xl font-semibold mb-4">Level Roadmap</h3>
                    <LevelRoadmap />
                </div>
            </aside>
        </div>
    );
}
