import ReactMarkdown from "react-markdown";

type Props = {
    role: "user" | "assistant";
    content: string;
};

export default function MessageBubble({ role, content }: Props) {
    const isUser = role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`
          max-w-lg px-5 py-3 rounded-2xl
          ${isUser
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-100"}
        `}
            >
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
