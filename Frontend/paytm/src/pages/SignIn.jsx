import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Warning from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-screen bg-blue-400">
      <div className="flex flex-col justify-items-start gap-5 shadow-md p-5 h-[500px] bg-white w-[400px] rounded-md shadow-slate-400 relative top-24 border border-gray-400 pt-10 pb-10">
        <Heading label={"Sign In"} />
        <SubHeading subhead={"Enter Your Credentials to access your account"} />
        <InputBox
          onchange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
          type={"text"}
        />
        <InputBox
          onchange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"*****"}
          type={"password"}
        />
        <Button
          onclick={() => {
            fetch("http://localhost:3000/api/v1/user/signin", {
              method: "POST",
              body: JSON.stringify({
                username,
                password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              response.json().then((data) => {
                if (data.token) {
                  localStorage.setItem("token", data.token);
                  navigate("/dashboard");
                } else {
                  alert(data.message);
                }
              });
            });
          }}
          buttonText={"Sign In"}
        />
        <Warning
          label={"Don't have an account?"}
          navigate={"/signup"}
          btn={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default SignIn;
