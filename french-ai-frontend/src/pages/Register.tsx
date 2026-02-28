import {Link, useNavigate} from "react-router-dom";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import {useState} from "react";
import {api} from "../api/axios.ts";
import { useToast } from "../components/ui/Toast";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { show } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
                level,
            });
            show?.("Account created. Please log in.");
            navigate("/login");
        } catch (err: any) {
            console.error("Registration failed:", err);
            if (err?.isAxiosError && err?.code === 'ERR_NETWORK') {
                show?.("Network error: could not reach backend. Check backend is running and CORS is enabled.");
            } else if (err?.response) {
                const msg = err.response?.data || err.response?.statusText || 'Registration failed';
                show?.(String(msg));
            } else {
                show?.("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-neutral-950 text-white"
        >
            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-600 to-purple-700">
                <h1 className="text-5xl font-bold leading-tight">
                    Learn French
                    <br />
                    the smart way 🇫🇷
                </h1>
                <p className="mt-6 text-lg text-white/80 max-w-md">
                    Practice real conversations, get instant AI feedback,
                    and grow step by step — like real life.
                </p>
                <p className="mt-12 text-sm text-white/70">
                    Built for learners. Designed for focus.
                </p>
            </div>

            {/* RIGHT SIDE – FORM */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold">Create your account</h2>
                    <p className="text-white/60 mt-2">Start learning in under a minute</p>

                    <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                        <Input
                            label="Full name"
                            value={name}
                            onChange={(n) => setName(n.target.value)}
                            placeholder="John Doe"
                            className="bg-black text-white"
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="bg-black text-white"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(p) => setPassword(p.target.value)}
                            placeholder="••••••••"
                            className="bg-black text-white"
                        />

                        {/* Modern Dropdown */}
                        <div className="relative">
                            <label className="block text-sm mb-1">Level</label>
                            <div
                                className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center"
                                onClick={() => setOpen(!open)}
                            >
                                {level}
                                <span className="ml-2">▼</span>
                            </div>

                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg z-10"
                                >
                                    {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                                        <div
                                            key={lvl}
                                            onClick={() => {
                                                setLevel(lvl);
                                                setOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
                                        >
                                            {lvl}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <Button type="submit" className="w-full mt-4" loading={loading}>
                            {loading ? 'Creating…' : 'Create account'}
                        </Button>
                    </form>

                    <p className="text-sm text-white/60 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-white font-medium hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
