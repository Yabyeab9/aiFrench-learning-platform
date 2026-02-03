export default function ChatBubble({ role, text }: any) {
    return (
        <div className={`max-w-lg p-4 rounded-xl ${role === "user"
            ? "bg-white text-black self-end"
            : "bg-zinc-800 text-white self-start"}`}>
            {text}
        </div>
    );
}
