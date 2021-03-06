import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import UserContext from "../contexts/userContext";

const Header = () => {
  const { user, role } = useContext(UserContext);
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
            Hola,{" "}
            <span className="text-primary">
              {user}{" "}
              <small className="text-dark capitalize italic">({role})</small>
            </span>
          </p>
        </div>
      </div>
      {window.location.pathname != process.env.PUBLIC_URL &&
        window.location.pathname != process.env.PUBLIC_URL + "/" && (
          <div className="w-full py-2">
            <h2 className="font-bold">
              <Link to="/" className="text-primary mr-3">
                <i className="fa fa-arrow-left"></i> Inicio
              </Link>
              Gestión de Proveedores de Ti
            </h2>
          </div>
        )}
    </div>
  );
};

export default Header;
