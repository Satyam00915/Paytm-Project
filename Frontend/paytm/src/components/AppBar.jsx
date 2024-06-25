import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between  p-2 font-semibold rounded-md shadow-md m-3  border border-blue-300">
      <div>PayTM App</div>
      <div className="flex justify-center gap-2 items-center">
        <div>Hello</div>
        <div className="rounded-full bg-blue-300 w-[30px] h-[30px] p-1 pl-2.5">
          U
        </div>
        <div>
          <Button
            buttonText={"Log Out"}
            onclick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
