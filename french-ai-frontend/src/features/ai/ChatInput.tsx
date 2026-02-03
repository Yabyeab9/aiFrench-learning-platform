import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({
                                      onSend,
                                  }: {
    onSend: (msg: string) => void;
}) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <div className="p-4 border-t border-slate-800 flex gap-3">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask your AI tutor..."
                className="
          flex-1
          bg-slate-900
          text-white
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
                onClick={handleSend}
                className="
          bg-indigo-600
          hover:bg-indigo-700
          px-4
          rounded-xl
          flex items-center
          justify-center
        "
            >
                <Send className="text-white w-5 h-5" />
            </button>
        </div>
    );
}

