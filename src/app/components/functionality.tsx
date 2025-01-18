"use client";

import React, { useState } from 'react';

const Functionality = () => {
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Currency: ${currency}, Amount: ${amount}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>
          Select Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ margin: '10px' }}>
            <option value="">--Select--</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
        </label>
        <label>
          Enter Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ margin: '10px' }}
          />
        </label>
        <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Functionality;