import { motion } from "framer-motion";
import { Lock, Star, CheckCircle2 } from "lucide-react";

type LevelNode = {
    level: number;
    unlocked: boolean;
    completed: boolean;
    xpRequired: number;
    userXp: number;
};

export default function LevelBubble({
                                        node,
                                        onClick,
                                    }: {
    node: LevelNode;
    onClick: () => void;
}) {
    const progress = Math.min(node.userXp / node.xpRequired, 1);

    return (
        <motion.button
            whileHover={node.unlocked ? { scale: 1.06 } : {}}
            whileTap={node.unlocked ? { scale: 0.98 } : {}}
            onClick={onClick}
            aria-label={`Level ${node.level} ${node.unlocked ? 'unlocked' : 'locked'}`}
            title={node.unlocked ? `Level ${node.level}` : `Locked — reach ${node.xpRequired} XP`}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 premium-card glass focus:outline-none focus:ring-4 focus:ring-indigo-400/30 ${
                node.completed
                    ? 'ring-4 ring-emerald-400/20 shadow-2xl'
                    : node.unlocked
                        ? 'ring-2 ring-indigo-400/10 shadow-xl'
                        : 'border-slate-700 opacity-60 pointer-events-none'
            }`}
        >
            {/* Decorative soft glow */}
            <span className={`absolute w-full h-full rounded-full -z-10 ${node.completed ? 'bg-emerald-300/6' : 'bg-gradient-to-br from-indigo-500/12 to-teal-400/8'} blur-2xl`} />

            {/* SVG progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
                <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="none" />
                <circle
                    cx="50" cy="50" r="44"
                    stroke={node.completed ? '#34d399' : node.unlocked ? '#a78bfa' : '#3b3f46'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={Math.PI * 2 * 44}
                    strokeDashoffset={(1 - progress) * Math.PI * 2 * 44}
                    style={{ transition: 'stroke-dashoffset 700ms ease, stroke 300ms' }}
                />
            </svg>

            {/* level text */}
            <div className={`text-white font-extrabold text-xl drop-shadow-sm z-10 ${node.completed ? 'text-emerald-200' : ''}`}>{node.level}</div>

            {/* top-right status icon */}
            <div className="absolute -top-2 right-0 z-20">
                {!node.unlocked && <Lock size={16} className="text-slate-400 bg-slate-900/50 p-1 rounded-md" />}
                {node.completed && <CheckCircle2 size={18} className="text-emerald-300 bg-black/20 p-1 rounded-md" />}
            </div>

            {/* bottom star when unlocked */}
            {node.unlocked && !node.completed && (
                <Star size={16} className="absolute bottom-2 text-yellow-300 z-10" />
            )}

            {/* overlay for locked state to prevent pointer events */}
            {!node.unlocked && <span className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70 rounded-full" />}
        </motion.button>
    );
}
