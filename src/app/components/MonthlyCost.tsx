import React, { useState } from "react";
import database from "../../app/database.json"

const MonthlyCost = () => {
  // const [count] = useState(cost);
  let count:number = 0;
  for (let i = 0; i < database.length; i++) {
    if (database[i].Interval == "Monthly") {
      count += database[i].Amount;
    } else {
      count += database[i].Amount/12;
    }
  }
  return (
    <div className="bg-black text-white w-80 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg p-4"
      style = {{
        margin: "auto",
        borderRadius: '10px',
        border: '1px solid #fff',
      }}
    >
      <p className="text-4xl font-bold mb-2">Monthly Cost</p>
      <p className="text-3xl">${count}</p>
    </div>
  );
};

export default MonthlyCost;