import React from "react";

type TTitleProps = {
  title: string;
  subTitle?: string;
};

const Title = (props: TTitleProps) => {
  return (
    <>
      <h3 className={`text-lg font-bold ${!props.subTitle ? "mb-4" : ""}`}>
        {props.title}
      </h3>
      {props.subTitle && (
        <span className="text-sm mb-5 block">{props.subTitle}</span>
      )}
    </>
  );
};

export default Title;
