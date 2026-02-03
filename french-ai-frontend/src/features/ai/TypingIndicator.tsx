export default function TypingIndicator() {
    return (
        <div className="flex gap-2 px-4 py-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></div>
        </div>
    );
}

