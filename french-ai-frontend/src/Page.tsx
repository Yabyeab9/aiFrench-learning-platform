import { motion } from "framer-motion";
import { ArrowRight, Brain, MessageSquare, Flame, Trophy, Star } from "lucide-react";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white font-sans">
            {/* Hero Section */}
            <section className="relative text-center py-32 px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                >
                    Fluent French, Powered by AI ✨
                </motion.h1>
                <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                    Experience a premium learning journey with personalized lessons, real-time feedback, and a sleek interface designed for ambitious learners.
                </p>
                <Link to={ "/register"}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-5 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition"
                >
                    Start Your Journey <ArrowRight className="inline ml-2" />
                </motion.button>
                </Link>
                {/* Decorative Glow */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl" />
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-4 gap-10 px-12 py-20">
                <Feature icon={<Trophy />} title="Level Up" desc="Track milestones with a premium dashboard." />
                <Feature icon={<Brain />} title="Smart AI" desc="Adaptive lessons tailored to your growth." />
                <Feature icon={<Flame />} title="Elite Streaks" desc="Stay motivated with exclusive rewards." />
                <Feature icon={<MessageSquare />} title="Pro Conversations" desc="Practice naturally with instant AI corrections." />
            </section>

            {/* Premium Highlight */}
            <section className="px-12 py-20 bg-gradient-to-r from-indigo-700/30 to-purple-700/30 rounded-3xl mx-6 shadow-2xl backdrop-blur-lg">
                <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Premium?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Highlight title="Exclusive AI Tutor" desc="Get priority access to advanced AI models for deeper corrections." />
                    <Highlight title="Personalized Roadmap" desc="A tailored curriculum designed for your goals." />
                    <Highlight title="VIP Support" desc="Priority help and guidance whenever you need it." />
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-12 py-20">
                <h2 className="text-4xl font-bold mb-12 text-center">Loved by Learners Worldwide 🌍</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    <Testimonial name="Alice" text="The premium version feels like having a private tutor 24/7." />
                    <Testimonial name="Jean" text="The design is stunning, and the AI feedback is next-level." />
                    <Testimonial name="Maria" text="I’ve tried many apps, but this feels truly professional." />
                </div>
            </section>

            {/* Call to Action */}
            <footer className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 mt-16 rounded-t-3xl shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-6">About the Web</h2>
                <p className="text-slate-200 text-md mb-8 max-w-2xl mx-auto">
                    The web connects people, ideas, and opportunities across the globe.
                    It’s a space for learning, sharing, and building communities that
                    transcend boundaries.
                </p>
                <div className="flex justify-center space-x-6">
                    <a href="/about" className="text-white hover:text-yellow-300 transition">Learn More</a>
                    <a href="/contact" className="text-white hover:text-yellow-300 transition">Contact Us</a>
                    <a href="/privacy" className="text-white hover:text-yellow-300 transition">Privacy Policy</a>
                </div>
            </footer>

        </div>
    );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="bg-slate-800/70 p-8 rounded-3xl shadow-xl text-center backdrop-blur-md"
        >
            <div className="flex justify-center mb-4 text-indigo-400">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-slate-400">{desc}</p>
        </motion.div>
    );
}

function Highlight({ title, desc }: { title: string; desc: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/70 p-8 rounded-2xl shadow-lg backdrop-blur-md"
        >
            <h3 className="text-xl font-semibold mb-3 text-indigo-300">{title}</h3>
            <p className="text-slate-400">{desc}</p>
        </motion.div>
    );
}

function Testimonial({ name, text }: { name: string; text: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/70 p-8 rounded-2xl shadow-lg backdrop-blur-md"
        >
            <p className="text-slate-300 mb-4">“{text}”</p>
            <h4 className="text-indigo-400 font-semibold">- {name}</h4>
        </motion.div>
    );
}
