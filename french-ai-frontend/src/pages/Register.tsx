import {Link, useNavigate} from "react-router-dom";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import {useState} from "react";
import {api} from "../api/axios.ts";

export default function Register() {
    const navigate = useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleRegister=async()=>{
         await api.post("/register",{
            name,email,password
        });
         navigate("/login");

    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-neutral-950 text-white"
        >



        {/* LEFT SIDE – BRAND / STORY */}
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

                    <h2 className="text-3xl font-semibold">
                        Create your account
                    </h2>

                    <p className="text-white/60 mt-2">
                        Start learning in under a minute
                    </p>

                    <form className="mt-8 space-y-5">

                        <Input
                            label="Full name"
                            value={name}
                            onChange={(n)=>setName(n.target.value)}
                            placeholder="John Doe"
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={p=>setPassword(p.target.value)}
                            placeholder="••••••••"
                        />

                        <Button className="w-full mt-4"
                        onClick={handleRegister()}>
                            Create account
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
