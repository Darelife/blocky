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
    <div className="monthly-cost shadow-lg p-4">
      <p className="text-3xl font-bold mb-2">Monthly Cost</p>
      <p className="text-6xl ">${count}</p>
    </div>
  );
};

export default MonthlyCost;