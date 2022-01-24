import React, { ReactNode, useContext } from "react";
import Header from "../components/Header";
import UserContext from "../contexts/userContext";

type TPageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = (props: TPageTemplateProps) => {
  const { children } = props;
  return (
    <div className="bg-gray-50 h-full animate__animated animate__fadeIn">
      <Header/>
      <div className="container mx-auto px-3 pb-20">
        <div className="w-full xl:w-4/5 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;
