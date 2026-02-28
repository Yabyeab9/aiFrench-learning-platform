import ProgressChart from "../features/progress/ProgressChart";
import { Suspense } from "react";
const WeeklyXpChart = (await import('../components/Chart/WeeklyXpChart')).default;
import { useRoadmapStore } from "../features/levels/roadmap.store";

export default function ProgressPage() {
    const { levels, loadRoadmap } = useRoadmapStore();

    // Ensure roadmap minimal data is loaded for stats
    loadRoadmap().catch(() => {});

    const totalLevels = levels.length;
    const completed = levels.filter(l=>l.completed).length;
    const unlocked = levels.filter(l=>l.unlocked).length;

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold">Your Progress</h1>
                        <p className="text-slate-400 mt-1">Overview of your learning journey and recent activity.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-300">Total Levels</div>
                        <div className="px-4 py-2 badge-premium">{totalLevels}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 premium-card">
                        <h3 className="text-sm text-slate-300">Levels Completed</h3>
                        <p className="text-2xl font-bold mt-2">{completed} / {totalLevels}</p>
                    </div>

                    <div className="p-6 premium-card">
                        <h3 className="text-sm text-slate-300">Levels Unlocked</h3>
                        <p className="text-2xl font-bold mt-2">{unlocked}</p>
                    </div>

                    <div className="p-6 premium-card">
                        <h3 className="text-sm text-slate-300">Next Goal</h3>
                        <p className="text-2xl font-bold mt-2">Level {unlocked + 1}</p>
                        <p className="text-sm text-slate-400 mt-2">Complete the current lessons to unlock the next level.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="p-6 premium-card">
                        <h3 className="text-lg font-semibold mb-4">Lesson Progress</h3>
                        <ProgressChart />
                    </div>

                    <div className="p-6 premium-card">
                        <h3 className="text-lg font-semibold mb-4">Weekly XP</h3>
                        <Suspense fallback={<div className="text-slate-400">Loading chart…</div>}>
                            <WeeklyXpChart data={[]} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
