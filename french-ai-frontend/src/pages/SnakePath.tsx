import { motion } from "framer-motion";
import LevelBubble from "./LevelBubble.tsx";
import { useNavigate } from "react-router-dom";
import {useLessonStore} from "../features/lessons/lesson.store.ts";
type LevelNode = {
    level: number;
    unlocked: boolean;
    completed: boolean;
    xpRequired: number;
    userXp: number;
};



export function SnakePath({ levels }: { levels: LevelNode[] }) {
    const navigate = useNavigate();
    const loadQuestions = useLessonStore((s) => s.loadQuestions);

    const handleLevelClick = async (level: number) => {
        try {
            await loadQuestions(level);
            navigate("/lesson", { state: { level } });
        } catch (err) {
            console.error("Failed to open level", err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            {levels.map((lvl, index) => {
                const isLeft = index % 2 === 0;

                return (
                    <motion.div
                        key={lvl.level}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className={`w-full flex ${
                            isLeft ? "justify-start" : "justify-end"
                        }`}
                    >
                        <LevelBubble
                            node={lvl}
                            onClick={() => {
                                if (lvl.unlocked) {
                                    handleLevelClick(lvl.level);
                                }
                            }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
