import { useAuthStore } from "../store/auth.store";

export default function ProfilePage() {
    const user = useAuthStore(s => s.user);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-3xl mx-auto">
                <div className="p-6 premium-card flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold text-2xl">{user?.name?.charAt(0) ?? 'U'}</div>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name ?? 'Guest'}</h2>
                        <p className="text-sm text-slate-400">{user?.email ?? 'No email'}</p>
                        <p className="mt-2 text-sm text-slate-300">Level: {user?.level ?? 'BEGINNER'}</p>
                    </div>
                </div>

                <div className="mt-6 p-6 premium-card">
                    <h3 className="text-lg font-semibold mb-2">Learning Summary</h3>
                    <p className="text-sm text-slate-400">Progress, achievements and recent activity will be summarized here.</p>
                </div>
            </div>
        </div>
    );
}
