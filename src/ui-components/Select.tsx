import classNames from "classnames";
import React, { ReactNode } from "react";

interface ISelectProps {
  name: string;
  label: string;
  children: ReactNode;
  errors?: any;
}

const Select = React.forwardRef<
  HTMLSelectElement,
  ISelectProps & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ onChange, onBlur, name, label, errors, children }, ref) => {
  const classing = classNames(
    "border bg-gray-100 rounded mb-1 p-2 h-11",
    {
      "border-red-500": errors?.[name],
    },
    "focus:bg-white focus:drop-shadow-sm"
  );

  return (
    <div className="flex flex-col">
      <label className="mb-2 font-bold text-sm">{label}</label>
      <select
        ref={ref}
        className={classing}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        {children}
      </select>
      {errors?.[name] && (
        <span className="text-red-400 text-xs">Este campo es requerido</span>
      )}
    </div>
  );
});

export default Select;
