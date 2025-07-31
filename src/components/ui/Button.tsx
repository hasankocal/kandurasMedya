import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
}) => {
  const baseStyle = 'font-medium transition-all duration-300 flex justify-center items-center';
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2 rounded-md',
    md: 'px-6 py-2.5 rounded-md',
    lg: 'text-lg px-8 py-3 rounded-lg',
  };
  
  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm hover:shadow',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    text: 'text-primary-600 hover:text-primary-700 hover:bg-primary-50',
  };
  
  const disabledStyle = disabled 
    ? 'opacity-60 cursor-not-allowed' 
    : 'cursor-pointer';

  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyle} ${widthStyle} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;