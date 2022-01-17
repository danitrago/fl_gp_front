import React from "react";
import logo from "./assets/logo.svg";
import Wizard from "./ui-components/Wizard/Wizard";
import Request from "./pages/Request";
import UserContext from "./contexts/userContext";

function App() {
  return (
    <UserContext.Provider
      value={{
        email: "danielfmolina@comfama.com.co",
        uid: "123-456-789",
        name: "Daniel Felipe",
      }}
    >
      <div className="bg-gray-50 h-full">
        <div className="container mx-auto px-3 pb-40">
          <div className="w-full flex justify-between py-4 border-b">
            <div className="logo">
              <img src={logo} alt="Logo COMFAMA" />
            </div>
            <div>
              <span className="font-bold">Hola, Daniel</span>
            </div>
          </div>
          <div className="w-full py-3 mb-3">
            <h2 className="text-sm font-bold">Gestión de Proveedores de Ti</h2>
          </div>
          <div className="w-full mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">
              Nueva Solicitud
            </h1>
          </div>
          <div className="w-full xl:w-4/5 mx-auto">
            <Request />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
