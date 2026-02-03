import { useAuthStore } from "../../store/auth.store";

export default function Topbar() {

    const user = useAuthStore(s => s.user);

    return (
        <header className="
            h-16
            bg-slate-900
            border-b border-slate-800
            flex
            items-center
            justify-between
            px-6
        ">

            <h2 className="font-semibold">
                Bonjour, {user?.name} 👋
            </h2>

            <div className="
                bg-indigo-600
                px-4 py-1
                rounded-xl
            ">
                Level 3
            </div>

        </header>
    );
}
