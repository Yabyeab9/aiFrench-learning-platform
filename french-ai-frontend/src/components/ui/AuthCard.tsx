/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AuthCard({ title, children }: any) {
    return (
        <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            {children}
        </div>
    );
}
