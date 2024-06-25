import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Warning from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center w-screen h-screen bg-blue-400">
      <div className="flex flex-col justify-items-start gap-5 shadow-md p-5 w-[400px] rounded-md shadow-slate-400 relative top-24 h-[600px] border border-gray-400 pt-10 pb-10 bg-white">
        <Heading label={"Sign Up"} />
        <SubHeading subhead={"Enter Your information to create an account"} />
        <InputBox
          onchange={(e) => {
            setFirstName(e.target.value);
          }}
          label={"First Name"}
          placeholder={"John"}
          type={"text"}
        />
        <InputBox
          onchange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          placeholder={"Doe"}
          type={"text"}
        />
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
            fetch("http://localhost:3000/api/v1/user/signup", {
              method: "POST",
              body: JSON.stringify({
                firstName,
                lastName,
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
          buttonText={"Sign Up"}
        />
        <Warning
          label={"Already have an account?"}
          navigate={"/signin"}
          btn={"Login"}
        />
      </div>
    </div>
  );
};

export default SignUp;
