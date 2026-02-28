import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown } from 'lucide-react';

export default function Topbar() {
    const user = useAuthStore(s => s.user);
    const logout = useAuthStore(s => s.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="h-16 bg-gradient-to-r from-[#0f172a] to-[#020617] border-b border-slate-800 flex items-center justify-between px-6">
            <div className="flex items-center gap-6">
                <div className="hidden md:block text-sm text-slate-300">Bonjour, <span className="text-indigo-300 font-semibold">{user?.name ?? 'Learner'}</span></div>

                <div className="relative">
                    <input placeholder="Search lessons, topics..." className="pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm w-72 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                    <Search className="absolute left-3 top-2.5 text-slate-500" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button title="Notifications" className="relative p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 transition">
                    <Bell className="text-slate-300" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border border-slate-900" />
                </button>

                <div className="relative group">
                    <button className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-900/40 hover:bg-slate-800 transition">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">{user?.name?.charAt(0) ?? 'U'}</div>
                        <div className="text-left hidden sm:block">
                            <div className="text-sm font-medium">{user?.name ?? 'Guest'}</div>
                            <div className="text-xs text-slate-400">Lvl {user?.level ?? ''}</div>
                        </div>
                        <ChevronDown className="text-slate-400" />
                    </button>

                    <div className="absolute right-0 mt-2 w-44 bg-slate-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20 overflow-hidden">
                        <button className="block w-full text-left px-4 py-2 hover:bg-slate-800">Profile</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-slate-800">Settings</button>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-slate-800">Sign out</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
