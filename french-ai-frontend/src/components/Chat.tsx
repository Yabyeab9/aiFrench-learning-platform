"use client";

import { useState } from "react";
import ChatBubble from "./ChatBubble.tsx";

export default function Chat() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");

    function sendMessage() {
        setMessages([...messages, { role: "user", text: input }]);
        setInput("");
    }

    return (
        <main className="min-h-screen flex flex-col p-6 gap-4">
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {messages.map((m, i) => (
                    <ChatBubble key={i} role={m.role} text={m.text} />
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-900"
                />
                <button onClick={sendMessage} className="px-6 bg-white text-black rounded-xl">
                    Send
                </button>
            </div>
        </main>
    );
}

