import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { api } from "../api/axios";
import { useAuthStore } from "../store/auth.store";
import { motion } from "framer-motion";
import { useRoadmapStore } from "../features/levels/roadmap.store";

export default function Login() {
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");
    const loadRoadmap = useRoadmapStore((s) => s.loadRoadmap);

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("accessToken",res.data.accessToken);
        login(res.data.accessToken, res.data.user);
        // load roadmap immediately so progress UI is up-to-date
        loadRoadmap().catch(e=>console.warn("loadRoadmap after login failed", e));
        navigate("/dashboard");
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-neutral-950 text-white"
        >

        {/* LEFT SIDE – LOGIN FORM */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md">

                    <h2 className="text-4xl font-semibold tracking-tight">
                        Welcome back, learner.
                    </h2>

                    <p className="text-white/60 mt-3">
                        Your French journey continues right here.
                    </p>

                    <form className="mt-10 space-y-6">

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPwd(e.target.value)}
                        />

                        <div className="flex justify-between text-sm">
                            <Link
                                to="/forgot-password"
                                className="text-white/50 hover:text-white hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button className="w-full mt-2" onClick={handleLogin}>
                            Continue learning
                        </Button>
                    </form>

                    <p className="text-sm text-white/60 mt-8">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-white font-medium hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE – BRAND / MOTIVATION */}
            <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-700">

                <h1 className="text-5xl font-bold leading-tight">
                    Progress feels good.
                </h1>

                <p className="mt-6 text-lg text-white/80 max-w-md">
                    Every conversation makes you sharper.
                    Every mistake makes you fluent.
                </p>

                <p className="mt-10 text-sm text-white/70">
                    Let’s keep going 🇫🇷
                </p>
            </div>
        </motion.div>
    );
}
