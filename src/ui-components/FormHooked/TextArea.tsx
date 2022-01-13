import classNames from "classnames";
import React from "react";

interface ITextAreaProps {
  name: string;
  label: string;
  errors?: any;
  cols?: 1 | 2 | 3 | 4;
}

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  ITextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ onChange, onBlur, name, label, errors, placeholder, cols }, ref) => {
  const classing = classNames(
    "border bg-gray-100 rounded mb-1 p-2 h-24",
    {
      "border-red-500": errors?.[name],
    },
    "focus:bg-white focus:drop-shadow-sm"
  );
  return (
    <div className={cols ? `lg:col-span-${cols}` : ""}>
      <div className="flex flex-col">
        <label className="mb-2 font-bold text-sm">{label}</label>
        <textarea
          ref={ref}
          className={classing}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {errors?.[name] && (
          <span className="text-red-400 text-xs">Este campo es requerido</span>
        )}
      </div>
    </div>
  );
});

export default TextArea;
