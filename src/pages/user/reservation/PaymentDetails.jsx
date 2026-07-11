import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { PiCardholder } from "react-icons/pi";

const PaymentDetails = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleCardChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    setCardNumber(value);
  };

  const handleNameChange = (e) => {
    let value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardHolder(value);
    }
    
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) value = value.slice(0, 4);

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    setCvv(value);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 pt-20">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 space-y-6">

        <h2 className="text-center text-2xl font-bold">Payment Details</h2>

        <div>
          <label className="text-sm font-semibold">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardChange}
            placeholder="Card Number"
            className="w-full mt-1 border rounded-xl p-3 outline-none focus:ring-green-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Card Holder Name</label>
          <input
            type="text"
            value={cardHolder}
            onChange={handleNameChange}
            placeholder="Full Name"
            className="w-full mt-1 border rounded-xl p-3 outline-none  focus:ring-green-400"
          />
        </div>

        <div className="flex gap-3">

          <div className="flex-1">
            <label className="text-sm font-semibold">Expiry (MM/YY)</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full mt-1 border rounded-xl p-3 outline-none  focus:ring-green-400"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-semibold">CVV</label> 
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              className="w-full mt-1 border rounded-xl p-3 outline-none  focus:ring-green-400"
            />
          </div>

        </div>

        <button className="mt-6 w-full bg-[#22c55e] text-white py-3 rounded-lg font-semibold hover:bg-[#4ade80] transition-all">
          Pay Now
        </button>
        
        <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <FaLock />
          We never store your CVV.
        </p>

      </div>
    </div>
  );
};

export default PaymentDetails;