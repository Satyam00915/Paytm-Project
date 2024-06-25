import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const User = ({ firstName, lastName, id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-2 m-1">
      <div className="flex flex-start gap-2">
        <div className="rounded-full bg-violet-400 w-[30px] h-[30px] text-center pt-0.5">
          {firstName.split("")[0]}
        </div>
        <div>{firstName + " " + lastName}</div>
      </div>
      <div>
        <button
          onClick={() => {
            navigate(`/send?id=${id}&name=${firstName}`);
          }}
          className="container bg-black text-white p-2 rounded pl-5 pr-5 hover:opacity-55 active:opacity-85"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default User;
