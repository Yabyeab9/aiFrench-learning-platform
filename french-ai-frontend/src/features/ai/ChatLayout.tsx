import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { motion } from "framer-motion";

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

    const sendMessage = async (text: string) => {
        const newMessages: Message[] = [...messages, { role: "user", content: text }];
        setMessages(newMessages);

        setTyping(true);

        // 🔥 Replace with YOUR backend endpoint
        const res = await fetch("http://localhost:8080/api/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text }),
        });

        const data = await res.json();

        setTyping(false);

        setMessages([
            ...newMessages,
            { role: "assistant", content: data.reply },
        ]);
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <MessageBubble role={msg.role} content={msg.content} />
                    </motion.div>
                ))}

                {typing && <TypingIndicator />}
            </div>

            {/* Input */}
            <ChatInput onSend={sendMessage} />
        </div>
    );
}
