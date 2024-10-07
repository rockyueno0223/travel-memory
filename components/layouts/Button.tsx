import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?:
  ((event: React.MouseEvent<HTMLButtonElement>) => void) |
  ((event: React.MouseEvent<HTMLButtonElement>) => Promise<void>) |
  (() => void);
  type?: string;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type, style }) => {

  const baseStyles = "block text-lg border rounded";
  const normalStyles = "border-neutral-500 hover:bg-[#f0f0f0]";
  const deleteStyles = "text-red-500 border-red-500 hover:bg-red-100";
  const normalSize = "h-10 w-24";
  const countrySelectSize = "h-12 w-24"

    const buttonClasses = `${baseStyles} ${style === 'delete' ? deleteStyles : normalStyles} ${style === 'select' ? countrySelectSize : normalSize}`;

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
