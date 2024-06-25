import React from "react";

const InputBox = ({ type, placeholder, label, onchange }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">
        <label>{label}</label>
      </div>
      <div className=" overflow-hidden">
        <input
          onChange={onchange}
          className="container  text-gray-500 outline-gray-500 border border-gray-400 rounded p-1"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputBox;
