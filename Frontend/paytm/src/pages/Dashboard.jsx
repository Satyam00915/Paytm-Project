import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [money, setMoney] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMoney(parseInt(response.data.Balance));
      });
  }, []);
  return (
    <div>
      <AppBar />
      <Balance money={money} />
      <Users />
    </div>
  );
};

export default Dashboard;
