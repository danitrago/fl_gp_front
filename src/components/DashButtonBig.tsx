import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type TDashButtonBigProps = {
  icon: string;
  link: string;
  label: string;
  external?: boolean;
};

const DashButtonBig = (props: TDashButtonBigProps) => {
  const { icon, link, label, external } = props;
  const classComp = classNames(
    "bg-gray-200 flex flex-col items-center py-8 rounded-md",
    "hover:bg-primary hover:text-white",
    "transition-all duration-300"
  );
  return external ? (
    <a href={link} target="_blank" className={classComp}>
      <i className={`fa fa-${icon} text-3xl mb-3 mt-8`}></i>
      <span className="font-bold">{label}</span>
    </a>
  ) : (
    <Link to={link} className={classComp}>
      <i className={`fa fa-${icon} text-3xl mb-3 mt-8`}></i>
      <span className="font-bold">{label}</span>
    </Link>
  );
};

export default DashButtonBig;
