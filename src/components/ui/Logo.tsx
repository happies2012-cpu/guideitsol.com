import React from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
    variant?: 'default' | 'white' | 'dark';
}

const Logo: React.FC<LogoProps> = ({
    className = '',
    size = 'md',
    showText = true,
    variant = 'default'
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl'
    };

    const textColorClasses = {
        default: 'text-foreground',
        white: 'text-white',
        dark: 'text-gray-900'
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <img
                src="/favicon.png"
                alt="GUIDESOFT Logo"
                className={`${sizeClasses[size]} object-contain`}
            />
            {showText && (
                <span className={`font-bold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
                    GUIDESOFT
                </span>
            )}
        </div>
    );
};

export default Logo;
