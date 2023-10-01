"use client";

interface InputProps {
  label: string;
  value: string;
  disabled?: boolean;
  type: string;
  required: boolean;
  onAction: (data: any) => void;
  placeholder?: string;
  actionButtonDisabled?: boolean;
  onSubmit: () => void;
}

import React from "react";

const Input: React.FC<InputProps> = ({
  label,
  value,
  disabled,
  type,
  required,
  onAction,
  placeholder,
  actionButtonDisabled,
  onSubmit
}) => {
  return (
    <form className="w-full md:w-2/5" onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
      <div
        className="
                p-2
                bg-white 
                rounded-b-lg"
      >
        <p
          className="
                        px-2
                        py-2
                        text-lg
                        font-semibold
                    "
        >
          {label}
        </p>
        <input
          className="
                            appearance-none 
                            border-2 
                            border-gray-200 
                            rounded 
                            w-full 
                            py-4
                            px-4 
                            text-xl
                            text-gray-700 
                            leading-tight 
                            focus:outline-none 
                            focus:bg-white 
                            focus:border-purple-500
                        "
          placeholder={placeholder}
          type={type}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => onAction(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={actionButtonDisabled}
        className={`
                        m-2 
                        inline-flex 
                        items-center 
                        text-xl 
                        px-3 
                        py-2 
                        font-medium 
                        text-center 
                        text-white 
                        ${
                          !actionButtonDisabled ? "bg-rose-500" : "bg-gray-500"
                        } 
                        ${
                          !actionButtonDisabled
                            ? "focus:ring-rose-200"
                            : "bfocus:ring-gray-200"
                        } 
                        ${
                          !actionButtonDisabled
                            ? "hover:bg-rose-500"
                            : "hover:bg-gray-500"
                        } 
                        rounded 
                        focus:ring-4 
                        `}
      >
        SUBMIT
      </button>
    </form>
  );
};

export default Input;
