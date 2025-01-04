import { ChangeEvent, FC } from "react";

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  [key: string]: any;
}

const Input: FC<InputProps> = ({
  label,
  className,
  placeholder,
  name,
  value,
  onChange,
  error,
  type = "text",
  ...props
}) => {
  return (
    <>
      <label className="inline-block text-gray-dark text-xs mr-4 mb-1">
        {label}
      </label>
      <input
        className={`${className} w-full h-[50px] rounded-lg p-4 border border-input text-sm focus:outline-none`}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <p className="text-xs text-red mr-1">{error}</p>}
    </>
  );
};

export default Input;
