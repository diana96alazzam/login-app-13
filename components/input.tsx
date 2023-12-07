import { ChangeEventHandler } from "react";

/**
 * Used to match type with min and max length of input
 */
const minMaxMap = {
  text: {
    minLength: 2,
    maxLength: 16,
  },
  email: {
    minLength: 2,
    maxLength: 320,
  },
  password: {
    minLength: 6,
    maxLength: 256,
  },
};

/**
 * Input props type
 */
type InputPropsType = {
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  pattern?: string;
};

/**
 * Input component.
 */
export function Input({
  type,
  name,
  placeholder,
  required = false,
  minLength,
  maxLength,
  onChange,
  pattern,
}: InputPropsType) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      minLength={minLength || minMaxMap[type].minLength}
      maxLength={maxLength || minMaxMap[type].maxLength}
      onChange={onChange}
      className="bg-gray-100 shadow-md rounded mb-4 p-2 text-sm"
      pattern={pattern}
    />
  );
}
