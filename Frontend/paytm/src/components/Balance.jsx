import React from "react";

const Balance = ({ money }) => {
  return (
    <div className="flex justify-start p-2 font-semibold m-3 gap-2">
      <div>Your Balance</div>
      <div>₹{money}</div>
    </div>
  );
};

export default Balance;
