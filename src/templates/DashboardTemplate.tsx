import React, { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import UserContext from "../contexts/userContext";

type TDashboardTemplateProps = {
  children: ReactNode;
};

const DashboardTemplate = (props: TDashboardTemplateProps) => {
  const { children } = props;
  const { name } = useContext(UserContext);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="bg-white px-3 sticky top-0 z-10 shadow-sm">
        <div className="w-full flex justify-between py-4 border-b">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo COMFAMA" />
            </Link>
          </div>
          <div>
            <p className="font-bold">
              Hola, <span className="text-primary">{name}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex-1 flex items-center px-3">
        <div className="w-full xl:w-4/5 mx-auto py-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
