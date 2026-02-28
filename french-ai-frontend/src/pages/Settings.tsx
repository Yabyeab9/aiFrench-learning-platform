import { useAuthStore } from "../store/auth.store";

export default function SettingsPage() {
    const user = useAuthStore(s => s.user);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Settings</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 premium-card">
                        <h3 className="text-lg font-semibold mb-2">Account</h3>
                        <p className="text-sm text-slate-400">Email: {user?.email ?? '—'}</p>
                        <p className="text-sm text-slate-400">Name: {user?.name ?? '—'}</p>
                    </div>

                    <div className="p-6 premium-card">
                        <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                        <p className="text-sm text-slate-400">Theme, notifications and learning preferences will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
