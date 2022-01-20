import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import UserContext from "../contexts/userContext";

const Header = () => {
  const { name } = useContext(UserContext);
  return (
    <div className="w-full flex justify-between py-4 border-b">
      <div className="logo">
        <img src={logo} alt="Logo COMFAMA" />
      </div>
      <div>
        <span className="font-bold">Hola, {name}</span>
      </div>
    </div>
  );
};

export default Header;
