import React from "react";

const Button = ({ buttonText, onclick }) => {
  return (
    <div>
      <button
        onClick={onclick}
        className="container bg-black text-white p-2 rounded pl-5 pr-5 active:opacity-55"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
