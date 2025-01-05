import { MouseEvent, FC } from "react";

interface ButtonProps {
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  error?: string;
  [key: string]: any;
}

const Button: FC<ButtonProps> = ({ label, disabled, className, onClick }) => {
  return (
    <button
      className={`${className} w-full rounded-md text-base font-bold disabled:bg-gray-300 hover:text-white`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
