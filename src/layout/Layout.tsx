import React, { ReactNode } from "react";
import Header from "./Header";

type TLayoutProps = {
  children: ReactNode;
};

const Layout = (props: TLayoutProps) => {
  const { children } = props;
  return (
    <div className="bg-gray-50 h-full">
      <Header />
      <div className="container mx-auto px-3 pb-20">
        <div className="w-full xl:w-4/5 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
