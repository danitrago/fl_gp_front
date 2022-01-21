import classNames from "classnames";
import React, { ReactNode } from "react";
import { TGlobalColors } from "../UiTypes";

type TTitleProps = {
  variant: "h1" | "h2" | "h3";
  color?: TGlobalColors;
  children?: ReactNode;
};

const Title = (props: TTitleProps) => {
  const { color = "primary" } = props;
  const classComp = classNames(`text-${color}`, {
    "ml-0 mb-7 text-3xl font-bold": props.variant == "h1",
    "mb-5 text-2xl font-bold": props.variant == "h2",
    "mb-3 text-xl": props.variant == "h3",
  });
  return <props.variant className={classComp}>{props.children}</props.variant>;
};

export default Title;
