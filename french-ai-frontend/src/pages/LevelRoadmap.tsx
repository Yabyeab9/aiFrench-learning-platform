import { useEffect } from "react";
import { SnakePath } from "./SnakePath.tsx";
import { useRoadmapStore } from "../features/levels/roadmap.store";

export default function LevelRoadmap() {
    const { levels, loading, loadRoadmap } = useRoadmapStore();

    useEffect(() => {
        loadRoadmap();
    }, [loadRoadmap]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-white">
                Loading roadmap...
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Level Roadmap</h3>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="text-sm text-slate-400">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-400" />
                        <span className="text-sm text-slate-400">Unlocked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-600" />
                        <span className="text-sm text-slate-400">Locked</span>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-full mx-auto py-6">
                <SnakePath levels={levels} />
            </div>
        </div>
    );
}
