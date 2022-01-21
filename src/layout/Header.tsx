import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import UserContext from "../contexts/userContext";

const Header = () => {
  const { name } = useContext(UserContext);
  return (
    <div className="bg-white px-3 sticky top-0 z-10 shadow-sm mb-4">
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
      <div className="w-full py-2">
        <h2 className="text-sm font-bold">
          <Link to="/" className="text-primary mr-3">
            <i className="fa fa-arrow-left"></i> Inicio
          </Link>
          Gestión de Proveedores de Ti
        </h2>
      </div>
    </div>
  );
};

export default Header;
