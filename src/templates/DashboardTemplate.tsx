import React, { ReactNode } from "react";
import Header from "../components/Header";

type TDashboardTemplateProps = {
  children: ReactNode;
};

const DashboardTemplate = (props: TDashboardTemplateProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 flex items-center px-3">
        <div className="w-full xl:w-4/5 mx-auto py-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
