import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { motion } from "framer-motion";
import { api } from "../../api/axios";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatLayout() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Bonjour 👋 I'm your AI French tutor. Ask me anything — grammar, vocabulary, pronunciation!",
        },
    ]);

    const [typing, setTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const sendMessage = async (text: string) => {
        const updated = [...messages, { role: "user" as const, content: text }];
        setMessages(updated);
        setTyping(true);

        try {
            const res = await api.post("/auth/chat", {
                message: text,
            });

            setMessages([
                ...updated,
                { role: "assistant", content: res.data.reply },
            ]);
        } catch {
            setMessages([
                ...updated,
                {
                    role: "assistant",
                    content: "⚠️ Sorry, something went wrong. Try again.",
                },
            ]);
        } finally {
            setTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <MessageBubble role={msg.role} content={msg.content} />
                    </motion.div>
                ))}

                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
            </div>

            <ChatInput onSend={sendMessage} />
        </div>
    );
}
