import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const user = useAuthStore(s => s.user);
    const logout = useAuthStore(s => s.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();              // clear session in store
        navigate("/login");    // redirect to login page
    };

    return (
        <header
            className="
        h-16
        bg-slate-900
        border-b border-slate-800
        flex
        items-center
        justify-between
        px-6
      "
        >
            <h2 className="font-semibold text-white">
                Bonjour, {user?.name} 👋
            </h2>

            <div className="relative group">
                <div
                    className="
            bg-indigo-600
            px-4 py-1
            rounded-xl
            cursor-pointer
            text-white
          "
                >
                    Account
                </div>

                {/* Dropdown menu */}
                <div
                    className="
            absolute
            left-0
            mt-2
            w-32
            bg-slate-800
            text-white
            rounded-lg
            shadow-lg
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-200
          "
                >
                    <button className="block w-full text-left px-4 py-2 hover:bg-slate-700">
                        Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-slate-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
