import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Brain,
    MessageCircle,
    Trophy,
} from "lucide-react";

export default function Sidebar() {

    const { pathname } = useLocation();

    const item = (to:string, icon:any, label:string) => {

        const active = pathname === to;

        return (
            <Link
                to={to}
                className={`
                    flex items-center gap-3
                    p-3 rounded-xl
                    transition
                    ${active
                    ? "bg-indigo-600"
                    : "hover:bg-slate-800"}
                `}
            >
                {icon}
                {label}
            </Link>
        );
    };

    return (
        <aside className="
            w-64
            bg-slate-900
            p-6
            flex
            flex-col
            gap-4
        ">
            <h1 className="text-2xl font-bold mb-6">
                AI French 🇫🇷
            </h1>

            {item("/dashboard", <Home size={20}/>, "Dashboard")}
            {item("/lesson", <Brain size={20}/>, "Lessons")}
            {item("/ai", <MessageCircle size={20}/>, "AI Tutor")}
            {item("/progress", <Trophy size={20}/>, "Progress")}

        </aside>
    );
}
