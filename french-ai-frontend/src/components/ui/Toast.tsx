import { useState } from "react";

export function useToast() {
    const [message, setMessage] = useState<string | null>(null);

    function show(msg: string, ms = 3000) {
        setMessage(msg);
        setTimeout(() => setMessage(null), ms);
    }

    function Toast() {
        if (!message) return null;
        return (
            <div className="fixed bottom-6 right-6 bg-black/80 text-white px-4 py-2 rounded-xl shadow-lg">
                {message}
            </div>
        );
    }

    return { show, Toast };
}
