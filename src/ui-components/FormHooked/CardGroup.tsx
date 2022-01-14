import React, { ReactNode } from "react";

const CardGroup = (props: { children: ReactNode }) => {
  return (
    <div className="p-3 border border-primary rounded-md shadow-lg mb-4">
      {props.children}
    </div>
  );
};

export default CardGroup;
