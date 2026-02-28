/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
    Users,
    Brain,
    DollarSign
} from "lucide-react";

export default function Dashboard() {
    return (
        <div className="relative min-h-screen overflow-hidden
            bg-gradient-to-br
            from-[#0f172a]
            via-[#020617]
            to-black
            text-white">

            {/* Ambient glow */}
            <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
            <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

            <main className="relative z-10 p-10 space-y-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center"
                >
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Command Center
                        </h1>
                        <p className="text-gray-400">
                            Monitor your AI platform in real time
                        </p>
                    </div>
                </motion.div>

                {/* METRICS */}
                <section className="grid grid-cols-3 gap-8">

                    <PremiumCard
                        icon={<Users />}
                        title="Active Users"
                        value="12,421"
                        color="from-indigo-500 to-purple-500"
                    />

                    <PremiumCard
                        icon={<DollarSign />}
                        title="Revenue"
                        value="$48,240"
                        color="from-emerald-400 to-teal-500"
                    />

                    <PremiumCard
                        icon={<Brain />}
                        title="AI Requests"
                        value="1.2M"
                        color="from-pink-500 to-rose-500"
                    />

                </section>

                {/* BIG GRID */}
                <section className="grid grid-cols-5 gap-8">

                    <GlassPanel className="col-span-3 h-[420px]">
                        <h2 className="text-xl font-semibold mb-6">
                            Usage Intelligence
                        </h2>

                        <FakeChart />
                    </GlassPanel>

                    <GlassPanel className="col-span-2 h-[420px]">
                        <h2 className="text-xl font-semibold mb-6">
                            Live Activity
                        </h2>

                        <ActivityFeed />
                    </GlassPanel>

                </section>

            </main>
        </div>
    );
}

/* ---------------------------- */

function PremiumCard({ icon, title, value, color }: any) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/0"
        >
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-6">

                <div className="flex justify-between items-center mb-6">

                    <div>
                        <p className="text-gray-400 text-sm">
                            {title}
                        </p>

                        <h3 className="text-3xl font-bold mt-1">
                            {value}
                        </h3>
                    </div>

                    <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
                        {icon}
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

/* ---------------------------- */

function GlassPanel({ children, className }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`rounded-3xl
                bg-white/5
                backdrop-blur-2xl
                border border-white/10
                shadow-2xl
                p-8
                ${className}`}
        >
            {children}
        </motion.div>
    );
}

/* ---------------------------- */

function ActivityFeed() {
    const items = [
        "New user registered",
        "AI model deployed",
        "Payment received",
        "Server autoscaled",
        "New subscription"
    ];

    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                    {item}
                </motion.div>
            ))}
        </div>
    );
}

/* ---------------------------- */

function FakeChart() {
    return (
        <div className="h-full flex items-end gap-4">

            {[40, 65, 35, 80, 55, 90].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 rounded-xl bg-gradient-to-t
                        from-indigo-500
                        to-purple-500"
                />
            ))}

        </div>
    );
}
