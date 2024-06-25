import React from "react";
import { Link } from "react-router-dom";

const Warning = ({ label, navigate, btn }) => {
  return (
    <div className="flex gap-1 justify-center">
      <div className="font-semibold ">{label}</div>
      <div className="font-semibold underline ">
        <Link to={navigate}>{btn}</Link>
      </div>
    </div>
  );
};

export default Warning;
