/* eslint-disable @typescript-eslint/no-explicit-any */
// button.tsx

export function Button({ children, ...props }: any) {
    return (
        <button
            {...props}
            className="w-full rounded-xl bg-black py-3 text-white
                 hover:opacity-90 transition"
        >
            {children}
        </button>
    );
}

export function Card({ children }: any) {
    return (
        <div className="rounded-2xl bg-white p-8 shadow-xl w-full max-w-md">
            {children}
        </div>
    );
}
