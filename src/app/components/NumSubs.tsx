import React, { useState } from "react";
import database from "../../app/database.json"


export default function NumSubs() {
  const count = database.length;
  

  return (
    <div className="num-subs shadow-lg p-4">
      <p className="boldd text-3xl font-bold mb-2">Subscriptions</p>
      <p className="boldd text-6xl ">{count}</p>
    </div>
  );
};