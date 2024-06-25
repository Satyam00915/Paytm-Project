import React, { useState } from "react";

import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-items-start gap-10 shadow-md p-5 w-[400px] rounded-md shadow-slate-400 relative top-24 border border-gray-400 pt-10 pb-10">
        <Heading label={"Send Money"} />
        <div className="flex flex-start gap-2 items-center">
          <div className="rounded-full bg-green-400 w-[40px] h-[40px] text-center pt-1.5">
            A
          </div>
          <div>{name}</div>
        </div>
        <InputBox
          onchange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          label={"Amount (in Rs)"}
          placeholder={"Enter amount"}
          type={"text"}
        />
        <button
          type="button"
          class="container focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            axios
              .post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount: amount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
                {
                  "Content-Type": "application/json",
                }
              )
              .then((response) => {
                alert(response.data.message);
              });
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
