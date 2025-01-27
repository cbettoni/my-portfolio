import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    as?: "button" | "a";
    href?: string;
    variant?: "btn_primary" | "btn_secondary" | "btn_underline";
}

const Button: React.FC<ButtonProps> = ({ variant = "btn_primary", className, ...props }) => {
    const baseClasses =
        "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50";
    const variantClasses = {
        btn_primary:
            "p-4 bg-green-cb text-light-gray-cb border-2 border-transparent hover:bg-dark-green-cb focus:border-dark-grey-cb focus:ring-4 focus:ring-dark-grey-cb",
        btn_secondary:
            "p-4 bg-green-cb text-dark-grey-cb border-2 border-dark-grey-cb hover:bg-dark-grey-cb hover:text-dark-grey-cb focus:ring-2 focus:ring-dark-grey-cb",
        btn_underline:
            "p-2 text-green-cb underline underline-offset-8 decoration-2 hover:text-dark-grey-cb focus:dark-grey-cb focus:underline-none",
    };
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className || ""}`;
    return <button className={combinedClasses} {...props} />;
};
export default Button;
