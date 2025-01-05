import { ChangeEvent, FC } from "react";

interface TextareaProps {
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  row?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  [key: string]: any;
}

const Textarea: FC<TextareaProps> = ({
  label,
  className,
  placeholder,
  name,
  value,
  row = 2,
  onChange,
  error,
  ...props
}) => {
  return (
    <>
      <label className="inline-block text-gray-dark text-xs mr-4 mb-1">
        {label}
      </label>
      <textarea
        className={`${className} w-full rounded-lg p-4 border border-input focus:outline-none`}
        placeholder={placeholder}
        name={name}
        rows={row}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <p className="text-xs text-red mr-1">{error}</p>}
    </>
  );
};

export default Textarea;
