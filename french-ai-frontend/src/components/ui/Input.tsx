type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export default function Input({ label, ...props }: Props) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`w-full rounded-xl border border-neutral-300 px-4 py-3
          text-sm outline-none focus:ring-2 focus:ring-black ${props.className ?? ""}`}
            />
        </div>
    );
}
