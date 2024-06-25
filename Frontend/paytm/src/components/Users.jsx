import React, { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="m-5 flex flex-col gap-2">
      <div className="font-bold">
        <label>Users</label>
      </div>
      <div>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          className="w-[400px] text-gray-500 outline-gray-500 border border-gray-400 rounded p-1"
          type="text"
          placeholder="Enter Users..."
        />
      </div>
      <div>
        {users.map((user) => {
          return (
            <User
              firstName={user.firstName}
              lastName={user.lastName}
              id={user._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Users;
