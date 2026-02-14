import { motion } from "framer-motion";
import {
    Flame,
    Trophy,
    Brain,
    MessageSquare,
    ArrowRight,
} from "lucide-react";
import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { useDashboard } from "../components/userDashboard";

export default function Dashboard() {
    const { data, loading, error } = useDashboard();

    if (loading) {
        return <div className="text-white p-8">Loading dashboard…</div>;
    }

    if (error) {
        return <div className="text-red-500 p-8">{error}</div>;
    }

    if (!data) {
        return <div className="text-white p-8">No dashboard data</div>;
    }

    const {
        user,
        isNewUser,
        currentLesson,
        weeklyXp,
        focusAreas,
    } = data;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white p-8">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                        Welcome back, {user?.name ?? "there"} 👋
                    </h1>
                    <p className="text-slate-400 mt-3 text-lg">
                        Ready to become fluent today?
                    </p>
            </motion.div>

            {isNewUser && (
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-indigo-600/20 border border-indigo-500 rounded-2xl p-8 mb-10"
                >
                    <h2 className="text-2xl font-semibold mb-2">
                        Start your journey 🚀
                    </h2>
                    <p className="text-slate-300 mb-4">
                        Take a 3-minute placement test so we can personalize your learning path.
                    </p>
                    <button className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition">
                        Take Placement Test
                    </button>
                </motion.div>
            )}

            {!isNewUser && currentLesson && (
                <motion.div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 flex justify-between items-center mb-10">
                    <div>
                        <p className="text-indigo-200">Continue Lesson</p>
                        <h2 className="text-3xl font-bold mt-1">
                            {currentLesson.title}
                        </h2>
                        <p className="text-indigo-100 mt-2">
                            Progress: {currentLesson.progress}%
                        </p>
                    </div>
                    <ArrowRight size={40} />
                </motion.div>
            )}

            {user && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <Stat icon={<Trophy />} label="Level" value={user.level ?? "-"} />
                    <Stat icon={<Brain />} label="XP" value={user.xp ?? "-"} />
                    <Stat icon={<Flame />} label="Streak" value={user.streak ? `${user.streak} days` : "-"} />
                    <Stat icon={<MessageSquare />} label="Fluency" value={user.fluency ?? "-"} />
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                <motion.div
                    whileHover={{ y: -6 }}
                    className="lg:col-span-2 bg-slate-800 rounded-3xl p-8 shadow-xl"
                >
                    <h3 className="text-2xl font-semibold mb-2">
                        Practice with AI Tutor 🇫🇷
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Talk naturally and get corrections instantly.
                    </p>
                    <button className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition">
                        Start Conversation
                    </button>
                </motion.div>

                <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-xl font-semibold mb-4">
                        Focus Areas
                    </h3>
                    <ul className="space-y-3 text-slate-300">
                        {focusAreas?.map((a: any) => (
                            <li key={a.label}>
                                {a.status === "weak" && "⚠️"}
                                {a.status === "strong" && "✅"} {a.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8 mt-10 shadow-xl h-[300px]">
                <h3 className="text-xl font-semibold mb-6">
                    Weekly XP
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={weeklyXp ?? []}>
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="xp"
                            stroke="#6366f1"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function Stat({ icon, label, value }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-slate-800 p-6 rounded-2xl shadow-lg"
        >
            <div className="flex justify-between mb-3 text-indigo-400">
                {icon}
            </div>
            <p className="text-slate-400">{label}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </motion.div>
    );
}
