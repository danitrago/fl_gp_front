import React, { ReactNode } from "react";
import Header from "./Header";

type TLayoutProps = {
  children: ReactNode;
};

const Layout = (props: TLayoutProps) => {
  const { children } = props;
  return (
    <div className="bg-gray-50 h-full">
      <div className="container mx-auto px-3 pb-40">
        <Header />
        <div className="w-full py-3 mb-3">
          <h2 className="text-sm font-bold">Gestión de Proveedores de Ti</h2>
        </div>
        <div className="w-full mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Nueva Solicitud
          </h1>
        </div>
        <div className="w-full xl:w-4/5 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
