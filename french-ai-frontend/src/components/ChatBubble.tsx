type ChatBubbleProps = {
    role: 'user' | 'assistant' | string;
    text: string;
};

export default function ChatBubble({ role, text }: ChatBubbleProps) {
    return (
        <div className={`max-w-lg p-4 rounded-xl ${role === "user"
            ? "bg-white text-black self-end"
            : "bg-zinc-800 text-white self-start"}`}>
            {text}
        </div>
    );
}
