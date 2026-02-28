/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    Brain,
    MessageCircle,
    Trophy,
    Settings as SettingsIcon,
    LogOut,
    User,
} from "lucide-react";
import { useAuthStore } from "../../store/auth.store";

export default function Sidebar() {

    const { pathname } = useLocation();
    const user = useAuthStore((s)=>s.user);
    const logout = useAuthStore((s)=>s.logout);
    const navigate = useNavigate();

    const item = (to:string, icon:any, label:string, state: any = undefined) => {

        const active = pathname === to;

        return (
            <Link
                to={to}
                state={state}
                className={`
                    flex items-center gap-3
                    p-3 rounded-2xl
                    transition-all duration-200
                    text-sm font-medium
                    ${active
                    ? "bg-gradient-to-r from-indigo-600 to-teal-400 text-black shadow-lg pl-4 pr-6"
                    : "hover:bg-slate-800/40 pl-4 pr-6"
                }
                `}
            >
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${active ? 'bg-white/90' : 'bg-white/5'}`}>{icon}</div>
                <span className="flex-1">{label}</span>
                {active && <div className="w-3 h-3 rounded-full bg-white/90" />}
            </Link>
        );
    };

    const handleSignOut = () => {
        try {
            // clear token + auth store
            localStorage.removeItem("accessToken");
            logout();
        } finally {
            navigate("/login");
        }
    };

    return (
        <aside className="w-72 p-6 flex flex-col gap-6 border-r border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
            {/* App brand */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white text-lg font-bold shadow-md">{user?.name?.charAt(0) ?? 'A'}</div>
                <div>
                    <h1 className="text-lg font-semibold">AI French</h1>
                    <p className="text-xs text-slate-400">Learn fast. Speak confidently.</p>
                </div>
            </div>

            {/* profile card */}
            <div className="p-4 rounded-2xl bg-slate-800/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">{user?.name?.charAt(0) ?? 'U'}</div>
                        <div>
                            <div className="text-sm font-semibold">{user?.name ?? 'Guest'}</div>
                            <div className="text-xs text-slate-400">{user?.email ?? ''}</div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-300">Lvl {user?.level ?? 1}</div>
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-3 mt-2">
                {item("/dashboard", <Home size={16}/>, "Dashboard")}
                {item("/lesson", <Brain size={16}/>, "Lessons", null)}
                {item("/ai", <MessageCircle size={16}/>, "AI Tutor")}
                {item("/progress", <Trophy size={16}/>, "Progress")}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
                <Link to="/settings" className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 transition">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5"><SettingsIcon size={16} /></div>
                    <span className="text-sm">Settings</span>
                </Link>

                <div className="flex gap-3">
                    <button onClick={() => navigate('/profile')} className="flex-1 flex items-center gap-2 bg-slate-700 px-4 py-3 rounded-2xl hover:bg-slate-600 transition">
                        <User size={16} /> Profile
                    </button>
                    <button onClick={handleSignOut} className="flex-0 flex items-center gap-2 bg-rose-600 px-4 py-3 rounded-2xl hover:bg-rose-500 transition">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
