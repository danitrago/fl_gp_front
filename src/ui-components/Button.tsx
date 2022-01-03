import classNames from "classnames";
import React from "react";

const Button = (props: any) => {
  const classBtn = classNames(
    "p-2 lg:p-3 bg-primary border-2 border-primary rounded-md text-white uppercase font-bold text-sm hover:bg-transparent hover:text-primary transition-bg duration-300",
    props.className
  );
  return (
    <button className={classBtn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
