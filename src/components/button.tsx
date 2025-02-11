import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    as?: 'button' | 'a';
    href?: string;
    variant?: 'btn_primary' | 'btn_secondary' | 'btn_underline';
    customStyles?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           as = 'button',
                                           variant = 'btn_primary',
                                           className = '',
                                           customStyles = '',
                                           href,
                                           ...props
                                       }) => {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 text-sm rounded-full font-bold transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50';

    const variantClasses = {
        btn_primary:
            'p-4 bg-green-cb text-dark-gray-cb border-2 border-transparent hover:bg-dark-green-cb focus:border-gray-cb focus:ring-2 focus:ring-gray-cb',
        btn_secondary:
            'p-4 bg-light-gray-cb text-dark-gray-cb border-2 border-dark-gray-cb hover:bg-dark-gray-cb hover:text-light-gray-cb focus:ring-2 focus:ring-gray-cb',
        btn_underline:
            'p-2 text-dark-gray-cb underline underline-offset-8 decoration-2 hover:text-dark-green-cb focus:dark-gray-cb focus:underline-none',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${customStyles} ${className}`;

    if (as === 'a' && href) {
        return (
            <a href={href} className={combinedClasses} {...props}>
                {props.children}
            </a>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
