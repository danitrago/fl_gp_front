import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui-components/Button";

const EmptyTable = () => {
  return (
    <div className="pt-8 text-center">
      <p className="text-center text-8xl mb-5 text-green-300">
        <i className="fa fa-folder-open animate-pulse"></i>
      </p>
      <p className="text-center text-xl text-gray-600 mb-8">
        No hay ningún dato por aquí.
      </p>
      <Link to="/">
        <Button><i className="fa fa-arrow-left mr-2"></i> Ir al Inicio</Button>
      </Link>
    </div>
  );
};

export default EmptyTable;
