import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
    text?: string;
    children?: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function PrimaryButton({
                                          text,
                                          children,
                                          className = "",
                                          onClick,
                                          type = "button",
                                          disabled = false,
                                      }: ButtonProps) {
    const buttonContent = children ?? text;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full bg-gradient-to-r from-blue-600 to-red-600 
                text-white font-bold py-3 px-6 rounded-lg shadow-lg
                hover:shadow-xl hover:from-blue-700 hover:to-red-700
                transform hover:scale-105 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${className}
            `}
        >
            {buttonContent}
        </button>
    );
}
