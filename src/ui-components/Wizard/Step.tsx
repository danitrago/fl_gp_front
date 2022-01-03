import classNames from "classnames";
import React from "react";

export interface StepProps {
  label: string;
  status: "doing" | "done" | "pending";
}

const Step = (props: StepProps) => {
  const classContainer = classNames(
    "border-b-6 box-content text-center flex-1 transition-all duration-500 flex flex-col justify-between",
    {
      "border-primary": props.status === "doing",
      "border-gray-400": props.status === "pending",
      "border-green-500": props.status === "done",
    }
  );
  const classText = classNames(
    "font-bold text-xs lg:text-sm transition-all duration-500",
    {
      "text-primary": props.status === "doing",
      "text-gray-400": props.status === "pending",
      "text-green-500": props.status === "done",
    }
  );
  const classPoint = classNames(
    "w-4 h-4 border-4 bg-white mx-auto rounded-full translate-y-3 transition-all duration-200",
    {
      "border-primary": props.status === "doing",
      "border-gray-400": props.status === "pending",
      "border-green-500": props.status === "done",
    }
  );

  return (
    <div className={classContainer}>
      <span className={classText}>{props.label}</span>
      <div className={classPoint}></div>
    </div>
  );
};

export default Step;
