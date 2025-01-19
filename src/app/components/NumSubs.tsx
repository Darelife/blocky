import React, { useState } from "react";
import database from "../../app/database.json"


export default function NumSubs() {
  const count = database.length;
  

  return (
    <div className="bg-black text-white w-80 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg p-4"
      style = {{
        margin: "auto",
        borderRadius: '10px',
        border: '1px solid #fff',
      }}
    >
      <p className="text-4xl font-bold mb-2">Subscriptions</p>
      <p className="text-3xl">{count}</p>
    </div>
  );
};