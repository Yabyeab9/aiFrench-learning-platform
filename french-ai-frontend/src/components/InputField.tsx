import type { ReactNode, ChangeEvent } from "react";

interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    className?: string;
}

export default function InputField({
                                       label,
                                       type,
                                       placeholder,
                                       value,
                                       onChange,
                                       icon,
                                       className = "",
                                   }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full rounded-lg border-2 border-gray-300 
                        px-4 py-3 ${icon ? "pl-10" : ""}
                        focus:outline-none focus:border-blue-500 
                        focus:ring-2 focus:ring-blue-200 
                        transition-all duration-200 
                        text-gray-800 shadow-sm hover:shadow-md
                        ${className}
                    `}
                />
            </div>
        </div>
    );
}
